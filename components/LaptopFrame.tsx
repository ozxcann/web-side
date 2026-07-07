"use client";

import { MutableRefObject, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useTransform, motion, type MotionValue } from "framer-motion";
import { Canvas, invalidate, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, Html, useGLTF, useProgress } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { clamp01, phase } from "@/lib/anim";
import { isBootDismissed, onBootDismissed, hasSceneWarmed, markSceneWarmed } from "@/lib/bootGate";
import { useLanguage } from "@/lib/LanguageContext";
import HomeContent from "@/components/HomeContent";
import LaptopScreenContent, { LAPTOP_SCREEN_TOOLBAR_H, LAPTOP_SCREEN_PAGES, MacPreviewToolbar } from "@/components/LaptopScreenContent";

const MODEL_HQ = "/models/macbook-ultra4K.glb";
const MODEL_LQ = "/models/macbook-ultra1K.glb";
useGLTF.preload(MODEL_LQ);

const TARGET_SIZE = 14;
// Lid rest (open) is -90° X. Closing folds it forward over the keyboard: +90°.
const LID_CLOSE_OFFSET = THREE.MathUtils.degToRad(90);

// Measured display-panel center & size in the model's LOCAL space (pre-fit).
const SCREEN_CENTER = new THREE.Vector3(0, 0.127, -0.125);
const SCREEN_W = 0.351;
const SCREEN_H = 0.229;
// Measured lid hinge (world pos of "Lid_2") in model-local space.
const HINGE_LOCAL = new THREE.Vector3(0, -0.001, -0.121);

// Scroll phases: open gradually while the camera flies in, browse, then close.
const OPEN_END = 0.38;
const CLOSE_START = 0.76;
const SCREEN_WAKE_OPEN_AMOUNT = 0.34;
const SCREEN_WAKE_FADE_RANGE = 0.12;

const MIDNIGHT_BODY_COLOR = "#142037";
const MIDNIGHT_EDGE_COLOR = "#203454";
const MIDNIGHT_LOGO_COLOR = "#8fa7c7";
const MIDNIGHT_TRACKPAD_COLOR = "#2c4268";
const MIDNIGHT_TRACKPAD_TINT_COLOR = "#1a2a45";

function tuneMacbookMaterial(material: THREE.Material, objectName = "") {
  const name = material.name.toLowerCase();
  const meshName = objectName.toLowerCase();

  if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshPhysicalMaterial) {
    if (name.includes("anodized") || name.includes("aluminum")) {
      material.color.set(MIDNIGHT_BODY_COLOR);
      material.metalness = 0.92;
      material.roughness = 0.34;
      material.envMapIntensity = 1.18;
    }

    if (name.includes("apple_logo")) {
      material.color.set(MIDNIGHT_LOGO_COLOR);
      material.metalness = 0.72;
      material.roughness = 0.2;
      material.envMapIntensity = 1.45;
    }

    if (name.includes("display") || name.includes("screen") || meshName.includes("display") || meshName.includes("screen")) {
      material.color.set("#01030a");
      material.metalness = 0.02;
      material.roughness = 0.22;
      material.envMapIntensity = 0.08;
      material.transparent = false;
      material.opacity = 1;
    }

    if (name.includes("touchpad") || name.includes("trackpad") || meshName.includes("touchpad") || meshName.includes("trackpad")) {
      const isTint = name.includes("tint");
      material.color.set(isTint ? MIDNIGHT_TRACKPAD_TINT_COLOR : MIDNIGHT_TRACKPAD_COLOR);
      material.metalness = 0.72;
      material.roughness = isTint ? 0.36 : 0.2;
      material.envMapIntensity = isTint ? 0.75 : 1.05;
      material.map = null;
      material.normalMap = null;
      material.transparent = false;
      material.opacity = 1;
    }

    if (name.includes("top") || name.includes("case")) {
      material.color.lerp(new THREE.Color(MIDNIGHT_EDGE_COLOR), 0.25);
    }
  }

  return material;
}

function applyMidnightMacbookFinish(root: THREE.Object3D) {
  const materialCache = new Map<THREE.Material, THREE.Material>();

  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;

    object.castShadow = true;
    object.receiveShadow = true;

    const cloneMaterial = (material: THREE.Material) => {
      const cached = materialCache.get(material);
      if (cached) return cached;

      const next = tuneMacbookMaterial(material.clone(), object.name);
      materialCache.set(material, next);
      return next;
    };

    object.material = Array.isArray(object.material)
      ? object.material.map((material) => cloneMaterial(material))
      : cloneMaterial(object.material);
  });
}

type Props = {
  progressRef: MutableRefObject<number>;
  targetProgressRef: MutableRefObject<number>;
  innerRef: MutableRefObject<HTMLDivElement | null>;
  scrollLenRef: MutableRefObject<number>;
  modelUrl: string;
  expandedSkill?: string | null;
  setExpandedSkill?: (id: string | null) => void;
  t: (key: string) => string;
};

function CameraRig({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const { camera } = useThree();
  // Start/end: a touch farther for the product-reveal beat, then fly into screen focus.
  const a = useMemo(() => new THREE.Vector3(0, 3.05, 21.4), []);
  // End: framed on the SCREEN (not the keyboard). Pulled in closer (Z 14.2 -> 12.8)
  // so the screen fills more of the viewport. To keep the gap under the navbar as
  // the model grows, the aim point is raised a touch (5.1 -> 5.35), which drops
  // the model slightly within the frame so its top never tucks under the navbar.
  const b = useMemo(() => new THREE.Vector3(0, 5.5, 12.8), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const open = phase(progressRef.current, 0, OPEN_END);
    const closed = phase(progressRef.current, CLOSE_START, 1);
    const k = open * (1 - closed);
    tmp.lerpVectors(a, b, k);
    camera.position.copy(tmp);
    camera.lookAt(0, THREE.MathUtils.lerp(1.55, 5.35, k), 0);
  });
  return null;
}

/**
 * Caption text that types itself out character-by-character whenever it becomes
 * visible, and resets when it fades away — so it re-types each time the user
 * scrolls it back into view. `trigger` is the caption's opacity motion value;
 * crossing above 0.5 starts the typing, dropping below resets it.
 */
function TypewriterCaption({ text, trigger }: { text: string; trigger: MotionValue<number> }) {
  const [count, setCount] = useState(0); // chars currently shown
  // Gate typing behind the boot terminal: the intro caption only starts once the
  // boot screen has been dismissed, so the user watches it type after skipping.
  const [booted, setBooted] = useState(() => isBootDismissed());
  // Seed from the current opacity so the intro caption types as soon as it's
  // allowed, without needing a scroll (change events only fire on change).
  const [opacityVisible, setOpacityVisible] = useState(() => trigger.get() > 0.5);

  // When the boot terminal is dismissed (first play OR a navbar replay), restart
  // the intro caption from zero so the user always watches it type out fresh,
  // even if it had already finished before.
  useEffect(
    () =>
      onBootDismissed(() => {
        setCount(0);
        setBooted(true);
      }),
    []
  );

  useMotionValueEvent(trigger, "change", (v) => {
    const nowVisible = v > 0.5;
    setOpacityVisible((prev) => {
      if (prev === nowVisible) return prev;
      if (!nowVisible) setCount(0); // reset so it re-types next time it appears
      return nowVisible;
    });
  });

  const visible = booted && opacityVisible;

  // Drive the per-character reveal while visible.
  useEffect(() => {
    if (!visible || count >= text.length) return;
    const t = window.setTimeout(() => setCount((c) => c + 1), 45);
    return () => window.clearTimeout(t);
  }, [visible, count, text.length]);

  const done = count >= text.length;
  return (
    <>
      {text.slice(0, count)}
      <span className={`laptop-caption-caret${done ? "" : " laptop-caption-caret--solid"}`} />
    </>
  );
}

/**
 * Full-screen loading cover, rendered OUTSIDE the Canvas (sits on top of the
 * whole sticky viewport). It stays fully opaque while drei loads assets AND for
 * a short settle delay after — so any first-frame jank (shader compile, layout)
 * happens hidden behind it. Then it fades out to reveal a ready scene.
 *
 * Crucially this does NOT change when the 3D scene mounts (the Canvas mounts
 * normally so scroll measurements stay correct) — it only hides the scene while
 * it warms up.
 */
function SceneLoadingCover({ t, bg }: { t: (key: string) => string; bg: string }) {
  const { progress, active } = useProgress();
  const realPct = Math.min(100, Math.round(progress));
  // Play the 0→100 cover only on the first scene load this session. If the
  // assets are already warmed (came back from the intro or another page), open
  // instantly with no cover — just like navigating between regular pages.
  const [warmed] = useState(() => hasSceneWarmed());
  const [hidden, setHidden] = useState(warmed);
  const [fading, setFading] = useState(false);

  // Animated counter: even when assets are cached and `progress` jumps straight
  // to 100, we still play a visible 0→100 fill. `display` eases toward the real
  // progress every frame with a guaranteed minimum speed, so the sweep is always
  // perceptible (fast, but never skipped).
  const [display, setDisplay] = useState(0);
  const displayRef = useRef(0);
  const realRef = useRef(0);
  realRef.current = realPct;

  useEffect(() => {
    let raf = 0;
    let last = -1;
    const tick = (now: number) => {
      if (last < 0) last = now;
      const dt = now - last;
      last = now;
      const cur = displayRef.current;
      const target = realRef.current;
      if (cur < target) {
        // Ease toward target, but enforce a minimum rate (~100% per ~750ms) so
        // an instant load still shows the whole climb.
        const ease = (target - cur) * 0.08;
        const minStep = (dt / 750) * 100;
        const next = Math.min(target, cur + Math.max(ease, minStep));
        displayRef.current = next;
        setDisplay(next);
      }
      if (displayRef.current < 100) {
        raf = window.requestAnimationFrame(tick);
      } else {
        setDisplay(100);
      }
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const pct = Math.round(display);

  // Once the animated counter has reached 100 (and real assets are done), wait a
  // short settle delay (lets the first heavy frames render behind the cover),
  // then fade out and unmount.
  useEffect(() => {
    if (active || realPct < 100 || display < 100) return;
    const settle = window.setTimeout(() => setFading(true), 350);
    return () => window.clearTimeout(settle);
  }, [active, realPct, display]);

  useEffect(() => {
    if (!fading) return;
    const done = window.setTimeout(() => {
      setHidden(true);
      markSceneWarmed(); // next homepage mount this session opens instantly
    }, 600);
    return () => window.clearTimeout(done);
  }, [fading]);

  if (hidden) return null;

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center px-6 transition-opacity duration-[600ms] ease-out"
      style={{ backgroundColor: bg, opacity: fading ? 0 : 1 }}
    >
      {/* Soft glow pooled behind the loader for depth. */}
      <div
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.35), transparent 70%)" }}
      />

      <div className="relative flex w-full max-w-xl flex-col items-center gap-8">
        {/* Big, bold percentage. */}
        <div className="flex items-end gap-1 leading-none">
          <span className="bg-gradient-to-br from-sky-300 via-sky-400 to-blue-500 bg-clip-text text-7xl font-black tabular-nums tracking-tight text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.35)] sm:text-8xl">
            {pct}
          </span>
          <span className="mb-2 text-3xl font-bold text-sky-400/80 sm:mb-3 sm:text-4xl">%</span>
        </div>

        {/* Thick, modern fill bar with an animated shimmer sweep. */}
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-900/10 ring-1 ring-inset ring-slate-900/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)] dark:bg-white/8 dark:ring-white/10 dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]">
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 shadow-[0_0_20px_rgba(56,189,248,0.7)] transition-[width] duration-500 ease-out"
            style={{ width: `${Math.max(pct, 6)}%` }}
          >
            {/* Moving light streak across the filled portion. */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div
                className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                style={{ animation: "loader-shimmer 1.3s ease-in-out infinite" }}
              />
            </div>
          </div>
        </div>

        {/* Caption with a soft pulse so it feels alive. */}
        <span className="animate-pulse text-base font-medium tracking-wide text-slate-500 dark:text-slate-400">
          {t("laptopScreen.experience.loading")}
        </span>
      </div>

      <style>{`
        @keyframes loader-shimmer {
          0% { transform: translateX(-150%) skewX(-12deg); }
          100% { transform: translateX(450%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
}

type LaptopFrameProps = {
  expandedSkill?: string | null;
  setExpandedSkill?: (id: string | null) => void;
};

export default function LaptopFrame({ expandedSkill, setExpandedSkill }: LaptopFrameProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // `targetProgressRef` is the raw scroll position (jumps per scroll event);
  // `progressRef` is the smoothed value the scene actually renders, eased toward
  // the target every animation frame for buttery scroll-driven motion.
  const targetProgressRef = useRef(0);
  const progressRef = useRef(0);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const scrollLenRef = useRef(0);
  const { level, prefersReducedMotion } = useDevicePerformance();
  const { resolvedTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = resolvedTheme !== "light";

  const modelUrl = useMemo(() => {
    if (typeof navigator === "undefined") return MODEL_LQ;
    // @ts-expect-error deviceMemory is non-standard but widely supported
    const mem = navigator.deviceMemory as number | undefined;
    return mem && mem < 4 ? MODEL_LQ : MODEL_HQ;
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Only set the target here; the scene eases toward it inside useFrame. Kick
    // the demand loop so it keeps rendering while it catches up.
    targetProgressRef.current = v;
    invalidate();
  });

  // Visible screen height in CSS px (must match pageH in SceneWithScreen).
  const PAGE_W = 1440;
  const VISIBLE_H = Math.round((SCREEN_H / SCREEN_W) * PAGE_W);
  const VISIBLE_CONTENT_H = VISIBLE_H - LAPTOP_SCREEN_TOOLBAR_H;

  // Every time the Home page mounts (first visit, client-side nav back here, or
  // a refresh) restart the experience from the very beginning: lid closed,
  // scrolled to the top. Browsers otherwise restore the previous scroll position
  // on refresh / back-nav, which would drop the user into a half-open laptop.
  useEffect(() => {
    const prevRestoration =
      typeof history !== "undefined" ? history.scrollRestoration : undefined;
    if (typeof history !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    targetProgressRef.current = 0;
    progressRef.current = 0;
    invalidate();
    return () => {
      if (typeof history !== "undefined" && prevRestoration) {
        history.scrollRestoration = prevRestoration;
      }
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      const el = innerRef.current;
      if (el) scrollLenRef.current = Math.max(0, el.scrollHeight - VISIBLE_CONTENT_H);
    };
    measure();
    const onResize = () => window.requestAnimationFrame(measure);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => window.requestAnimationFrame(measure)) : null;
    if (ro && innerRef.current) ro.observe(innerRef.current);
    window.addEventListener("resize", onResize);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [VISIBLE_CONTENT_H]);

  // Captions only show while the lid is shut/shutting — never floating over the
  // open model. Intro fades out as soon as the lid starts lifting; outro only
  // appears once the lid has clearly begun closing again.
  const introOpacity = useTransform(scrollYProgress, [0, OPEN_END * 0.32], [1, 0]);
  const outroOpacity = useTransform(scrollYProgress, [CLOSE_START + 0.07, 0.95, 1], [0, 0.9, 1]);
  const screenHudOpacity = useTransform(scrollYProgress, [OPEN_END * 0.72, OPEN_END, CLOSE_START, CLOSE_START + 0.08], [0, 1, 1, 0]);

  if (level === "LOW" || prefersReducedMotion) {
    return <HomeContent expandedSkill={expandedSkill} setExpandedSkill={setExpandedSkill} />;
  }

  const dpr: [number, number] = level === "MEDIUM" ? [1, 1.5] : [1, 2];
  const bg = isDark ? "#0a0a0a" : "#f1f5f9";

  return (
    <div
      id="laptop-experience"
      ref={wrapperRef}
      data-open-end={OPEN_END}
      data-close-start={CLOSE_START}
      className="relative w-[100vw] left-[calc(-50vw+50%)] -mt-8 -mb-8"
      style={{ height: "620vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: bg }}>
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_78%,rgba(14,165,233,0.18),transparent_32%),radial-gradient(circle_at_18%_18%,rgba(99,102,241,0.12),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(20,184,166,0.1),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.22),transparent_18%,transparent_80%,rgba(15,23,42,0.08))] dark:bg-[radial-gradient(circle_at_50%_78%,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_18%_18%,rgba(99,102,241,0.12),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(20,184,166,0.1),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.045),transparent_18%,transparent_80%,rgba(0,0,0,0.28))]" />
        <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.18] [background-image:linear-gradient(rgba(15,23,42,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:96px_96px] dark:opacity-[0.12] dark:[background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute inset-x-8 top-8 z-20 hidden h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-70 dark:via-white/20 lg:block" />
        <div className="pointer-events-none absolute inset-x-8 bottom-8 z-20 hidden h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-70 dark:via-white/20 lg:block" />
        <Canvas
          dpr={dpr}
          camera={{ position: [-5, 9, 18], fov: 35 }}
          frameloop="demand"
          performance={{ min: 0.5 }}
          shadows={level === "HIGH"}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: isDark ? 1.0 : 1.15,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
        >
          <color attach="background" args={[bg]} />
          <hemisphereLight intensity={isDark ? 0.35 : 0.7} groundColor="#1a1a1a" />
          <ambientLight intensity={isDark ? 0.35 : 0.6} />
          <directionalLight position={[6, 10, 8]} intensity={isDark ? 1.5 : 1.9} castShadow={level === "HIGH"} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
          <directionalLight position={[-7, 6, -4]} intensity={isDark ? 0.85 : 0.55} color="#9ecbff" />
          <Suspense fallback={null}>
            <SceneWithScreen
              progressRef={progressRef}
              targetProgressRef={targetProgressRef}
              innerRef={innerRef}
              scrollLenRef={scrollLenRef}
              modelUrl={modelUrl}
              expandedSkill={expandedSkill}
              setExpandedSkill={setExpandedSkill}
              t={t}
            />
            <Environment preset={isDark ? "night" : "city"} environmentIntensity={isDark ? 0.6 : 1.0} />
            {level === "HIGH" && <ContactShadows position={[0, 0, 0]} opacity={isDark ? 0.45 : 0.32} scale={26} blur={2.2} far={6} />}
          </Suspense>
          <CameraRig progressRef={progressRef} />
        </Canvas>

        {/* Opaque cover that hides scene warm-up jank until it's ready. */}
        <SceneLoadingCover t={t} bg={bg} />

        <motion.div
          style={{ opacity: screenHudOpacity }}
          className="pointer-events-none absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 lg:block"
        >
          <div className="flex h-64 w-10 flex-col items-center gap-3 rounded-full border border-slate-300/70 bg-white/45 px-2 py-4 text-slate-500 dark:border-white/10 dark:bg-black/20 dark:text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] [writing-mode:vertical-rl]">{t("laptopScreen.experience.scroll")}</span>
            <div className="relative h-full w-px overflow-hidden rounded-full bg-slate-300 dark:bg-white/15">
              <motion.div
                style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                className="absolute inset-x-0 top-0 h-full bg-sky-500 dark:bg-sky-300"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: introOpacity }}
          className="laptop-caption pointer-events-none absolute top-[12%] left-1/2 z-20 w-full -translate-x-1/2 px-6 text-center"
        >
          <p className="laptop-caption-kicker font-mono tracking-[0.25em] text-sky-400/70">
            {t("laptopScreen.experience.scrollToOpen")}
          </p>
          <h1 className="laptop-caption-title mt-5 font-mono font-bold tracking-tight text-sky-400">
            <TypewriterCaption text={t("laptopScreen.experience.welcome")} trigger={introOpacity} />
          </h1>
        </motion.div>

        <motion.div
          style={{ opacity: outroOpacity }}
          className="laptop-caption pointer-events-none absolute top-[12%] left-1/2 z-20 w-full -translate-x-1/2 px-6 text-center"
        >
          <p className="laptop-caption-kicker font-mono tracking-[0.25em] text-sky-400/70">
            {t("laptopScreen.experience.thanks")}
          </p>
          <h2 className="laptop-caption-title mt-5 font-mono font-bold tracking-tight text-sky-400">
            <TypewriterCaption text={t("laptopScreen.experience.closing")} trigger={outroOpacity} />
          </h2>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Renders the model and mounts the screen DOM as a real CHILD of the lid object
 * (via lid.add), positioned at the measured panel in lid-local space. This makes
 * the page track the lid exactly with no mirroring or double-transform.
 */
function SceneWithScreen({ progressRef, targetProgressRef, innerRef, scrollLenRef, modelUrl, expandedSkill, setExpandedSkill, t }: Props) {
  const { scene } = useGLTF(modelUrl);
  const model = useMemo(() => {
    const cloned = scene.clone(true);
    applyMidnightMacbookFinish(cloned);
    return cloned;
  }, [scene]);

  const { fitScale, fitOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return { fitScale: TARGET_SIZE / maxDim, fitOffset: new THREE.Vector3(-center.x, -box.min.y, -center.z) };
  }, [model]);

  const lid = useMemo(() => model.getObjectByName("Lid_2"), [model]);
  const lidOpenX = useRef(0);
  const anchorRef = useRef<THREE.Group>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);
  const lastScreenY = useRef(Number.NaN);
  const pageLabelRef = useRef<HTMLParagraphElement | null>(null);
  const lastPage = useRef(0);
  // Total "pages" = number of scrollable sections inside the screen, counted
  // from the DOM so the toolbar indicator stays correct if sections change.
  const pageCountRef = useRef(LAPTOP_SCREEN_PAGES);

  useEffect(() => {
    if (lid) lidOpenX.current = lid.rotation.x;
  }, [lid]);

  useEffect(() => {
    const count = () => {
      const n = innerRef.current?.querySelectorAll("section[id]").length ?? 0;
      if (n > 0) pageCountRef.current = n;
    };
    count();
    const observer = typeof MutationObserver !== "undefined" && innerRef.current
      ? new MutationObserver(count)
      : null;
    if (observer && innerRef.current) {
      observer.observe(innerRef.current, { childList: true, subtree: true });
    }
    return () => observer?.disconnect();
  }, []);

  useFrame((_state, delta) => {
    // Frame-rate-independent smoothing: ease the rendered progress toward the
    // raw scroll target each frame. This turns the coarse, per-scroll-event
    // jumps into continuous motion (the source of the previous choppiness).
    // The exponential factor is normalized by delta so the feel is identical at
    // 60 / 120 / 144 Hz. While the two values haven't converged, keep the demand
    // loop alive so the easing actually plays out after scrolling stops.
    const target = targetProgressRef.current;
    const diff = target - progressRef.current;
    if (Math.abs(diff) > 1e-5) {
      const smoothing = 1 - Math.exp(-12 * Math.min(delta, 0.05));
      progressRef.current += diff * smoothing;
      invalidate();
    } else {
      progressRef.current = target;
    }

    const p = progressRef.current;
    const opened = phase(p, 0, OPEN_END);
    const closed = phase(p, CLOSE_START, 1);
    const openAmount = opened * (1 - closed); // 0 closed → 1 fully open
    if (lid) lid.rotation.x = lidOpenX.current + LID_CLOSE_OFFSET * (1 - openAmount);

    // Fold the screen content WITH the lid (real "wake/sleep" feel): the anchor
    // pivots about the hinge by the lid's deviation from its open pose, so it is
    // perfectly flat when fully open and tilts away as the lid closes.
    if (anchorRef.current) {
      const tilt = lid ? lid.rotation.x - lidOpenX.current : 0;
      anchorRef.current.rotation.set(tilt, 0, 0);
      // Hinge point (world): lid base, ~ (0,0,-0.121) before fit.
      const hingeY = HINGE_LOCAL.y;
      const hingeZ = HINGE_LOCAL.z;
      // Panel center relative to hinge, then rotate that offset by tilt about X.
      const dy = SCREEN_CENTER.y - hingeY;
      const dz = SCREEN_CENTER.z - hingeZ;
      const cos = Math.cos(tilt);
      const sin = Math.sin(tilt);
      const ry = dy * cos - dz * sin;
      const rz = dy * sin + dz * cos;
      anchorRef.current.position
        .set(SCREEN_CENTER.x, hingeY + ry, hingeZ + rz)
        .add(fitOffset)
        .multiplyScalar(fitScale);
      anchorRef.current.visible = openAmount > SCREEN_WAKE_OPEN_AMOUNT - 0.02;
    }

    // Keep the page off while the lid is almost flat; otherwise it reads like a
    // projected website on the laptop body. The model screen material below is
    // dark, so fast scrolls do not flash white during this wake window.
    if (fadeRef.current) {
      const vis = clamp01((openAmount - SCREEN_WAKE_OPEN_AMOUNT) / SCREEN_WAKE_FADE_RANGE);
      fadeRef.current.style.opacity = String(vis);
    }

    // Scroll the page WITHIN the screen after the open phase. During close, keep
    // the final browse position instead of snapping back to the top.
    const browse = p < OPEN_END ? 0 : clamp01((p - OPEN_END) / (CLOSE_START - OPEN_END));

    // Map browse progress to a 1..N "page" indicator in the toolbar, where N is
    // the live section count.
    const total = pageCountRef.current;
    const page = Math.min(total, 1 + Math.floor(browse * total));
    if (page !== lastPage.current && pageLabelRef.current) {
      lastPage.current = page;
      pageLabelRef.current.textContent = `${t("laptopScreen.toolbar.page")} ${page} / ${total}`;
    }

    const el = innerRef.current;
    if (el) {
      const screenY = -browse * scrollLenRef.current;
      if (Number.isNaN(lastScreenY.current) || Math.abs(screenY - lastScreenY.current) > 0.1) {
        lastScreenY.current = screenY;
        el.style.transform = `translate3d(0, ${screenY.toFixed(2)}px, 0)`;
      }
    }
  });

  // Fit the page just inside the glass (a hair of margin from the bezel).
  const INSET = 1.006;
  const PAGE_W = 1440;
  const pageH = Math.round((SCREEN_H / SCREEN_W) * PAGE_W);
  const worldPanelW = SCREEN_W * fitScale * INSET;
  const worldUnderlayW = SCREEN_W * fitScale * 0.988;
  const worldUnderlayH = SCREEN_H * fitScale * 0.982;
  // drei <Html transform>: worldWidth = PAGE_W * (distanceFactor/400).
  const distanceFactor = (400 * worldPanelW) / PAGE_W;

  return (
    <>
      <group scale={fitScale}>
        <group position={fitOffset}>
          <primitive object={model} />
        </group>
      </group>

      {/* Screen content sized via distanceFactor to match the panel width. */}
      <group ref={anchorRef}>
        <mesh position={[0, 0, 0.0015]} renderOrder={1}>
          <planeGeometry args={[worldUnderlayW, worldUnderlayH]} />
          <meshBasicMaterial color="#01030a" depthWrite={false} toneMapped={false} />
        </mesh>
        <Html
          transform
          position={[0, 0, 0.0055]}
          distanceFactor={distanceFactor}
          zIndexRange={[5, 0]}
          wrapperClass="laptop-screen-html"
          occlude={false}
        >
          <div
            ref={fadeRef}
            style={{ width: PAGE_W, height: pageH, opacity: 0, borderRadius: "44px 44px 10px 10px" }}
            className="relative overflow-hidden bg-white text-slate-950 dark:bg-[#02040a] dark:text-white"
          >
            <MacPreviewToolbar pageLabelRef={pageLabelRef} t={t} />
            <div className="absolute inset-x-0 bottom-0 overflow-hidden" style={{ top: LAPTOP_SCREEN_TOOLBAR_H }}>
              <div
                ref={innerRef}
                style={{ width: PAGE_W, transform: "translate3d(0, 0, 0)", willChange: "transform" }}
                className="laptop-screen-content overflow-x-hidden"
              >
                <LaptopScreenContent expandedSkill={expandedSkill} setExpandedSkill={setExpandedSkill} t={t} />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-30 hidden w-[34px] bg-gradient-to-r from-[#02040a] via-[#02040a]/78 to-transparent dark:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-30 hidden w-[34px] bg-gradient-to-l from-[#02040a] via-[#02040a]/78 to-transparent dark:block" />
          </div>
        </Html>
      </group>
    </>
  );
}
