"use client";

import { useEffect, useRef, useState } from "react";
import {
  consumeReplayPending,
  hasAutoShownBoot,
  hasSeenBoot,
  markBootActive,
  markBootAutoShown,
  markBootDismissed,
  markBootSeen,
  onBootReplay,
} from "@/lib/bootGate";
import { useLanguage } from "@/lib/LanguageContext";
import { dictionaries } from "@/languages";

/**
 * Full-screen "movie hacker terminal" intro.
 *
 * Black background, sky-blue monospace text typed out character-by-character with a
 * blinking caret (film-scene feel). Auto-plays once per browsing session
 * (tracked via sessionStorage, so closing the tab/browser replays it on the next
 * visit); afterwards it can be replayed from the navbar "Intro" button. While it
 * plays, the real homepage (LaptopFrame) mounts behind it.
 *
 * The intro text follows the active site language (which itself defaults to the
 * browser locale on first visit, then to the visitor's manual choice).
 */

// Typing speed (ms per character) and pause after a completed line.
const CHAR_MS = 26;
const LINE_PAUSE_MS = 260;
const END_HOLD_MS = 900; // hold after last line before fading out
const FADE_MS = 600;
const MAX_TERMINAL_LINES = 48;

export default function BootTerminal() {
  const { lang } = useLanguage();
  const [active, setActive] = useState(false); // whether overlay should render at all
  const [typed, setTyped] = useState<string[]>([]); // fully/partly typed lines
  const [done, setDone] = useState(false); // typing finished
  const [fading, setFading] = useState(false);
  const dismissedRef = useRef(false);

  // Lines follow the active site language.
  const lines = dictionaries[lang].boot.lines;

  const startReplay = () => {
    dismissedRef.current = false;
    markBootActive(); // re-arm the gate so the next dismiss restarts the caption
    setTyped([]);
    setDone(false);
    setFading(false);
    setActive(true);
  };

  // On mount: replay if the navbar requested it on another page. On the homepage
  // we also trigger the intro for both desktop and mobile visitors so the debut
  // experience is always available when landing on the main page.
 useEffect(() => {
  const isHomePage = typeof window !== "undefined" && window.location.pathname === "/";

  // Sayfa sert bir şekilde yenilendi mi veya tarayıcıya adres yazılarak mı girildi?
  const isHardLoad =
    typeof window !== "undefined" &&
    window.performance &&
    window.performance.getEntriesByType("navigation")[0]?.['type'] !== "navigate" 
      ? false // Eğer SPA içi geçişse veya farklı bir durumsa
      : true;

  // Navbar'dan yönlendirilen özel durum (mevcut kodundaki mantık)
  if (consumeReplayPending()) {
    startReplay();
  } 
  // Sadece ana sayfadaysak VE sayfa tarayıcı bazında ilk kez/sıfırdan yüklendiyse çalıştır
  else if (isHomePage && isHardLoad) {
    // Sayfa içi sonraki geçişlerde tetiklenmesin diye tarayıcı geçmişine (history) küçük bir bayrak bırakıyoruz
    const hasNavigatedInApp = window.history.state?.hasNavigatedInApp;
    
    if (!hasNavigatedInApp) {
      // İlk yüklenme durumunda tarayıcı state'ine bu bayrağı gömüyoruz
      window.history.replaceState({ ...window.history.state, hasNavigatedInApp: true }, "");
      markBootAutoShown();
      startReplay();
    } else {
      markBootDismissed();
    }
  } else {
    markBootDismissed();
  }
}, []);

  // Allow the navbar "Intro" button to replay the terminal on demand
  // (same-page case, terminal already mounted).
  useEffect(() => {
    return onBootReplay(() => {
      consumeReplayPending(); // clear the cross-page flag; we handle it here
      startReplay();
    });
  }, []);

  // Lock scroll while the intro is up; restored on dismiss / unmount.
  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  // Typewriter driver.
  //
  // Time-based requestAnimationFrame loop (instead of per-char setTimeout): we
  // track how much real time has elapsed and reveal as many characters as that
  // time warrants. If a frame is delayed (e.g. Three.js compiling shaders on the
  // main thread), the next frame catches up by revealing several chars at once
  // rather than dropping into a visible stutter.
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    let raf = 0;
    let lineIdx = 0;
    let charIdx = 0;
    let acc = 0; // accumulated time owed toward the next char/pause
    let last = -1;
    let firstFrame = true;
    let startTime = 0;
    const out: string[] = [];

    const step = (now: number) => {
      if (cancelled) return;
      if (firstFrame) {
        startTime = now;
        firstFrame = false;
      }
      if (now - startTime < 350) {
        raf = window.requestAnimationFrame(step);
        return;
      }

      if (last < 0) last = now;
      acc += now - last;
      last = now;

      // Reveal as many characters as the elapsed time allows this frame.
      while (acc >= 0) {
        if (lineIdx >= lines.length) {
          setTyped(out.slice(-MAX_TERMINAL_LINES));
          setDone(true);
          return;
        }

        const full = lines[lineIdx];
        if (charIdx <= full.length) {
          out[lineIdx] = full.slice(0, charIdx);
          charIdx += 1;
          acc -= full.length === 0 ? 0 : CHAR_MS;
          if (full.length === 0) {
            // Empty line: nothing to type, just move on next iteration.
            lineIdx += 1;
            charIdx = 0;
            acc -= LINE_PAUSE_MS;
          }
        } else {
          lineIdx += 1;
          charIdx = 0;
          acc -= LINE_PAUSE_MS;
        }

        if (acc < CHAR_MS && acc < LINE_PAUSE_MS) break;
      }

      setTyped(out.slice(-MAX_TERMINAL_LINES));
      raf = window.requestAnimationFrame(step);
    };

    raf = window.requestAnimationFrame(step);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
    };
  }, [active, lines]);

  // After typing completes, hold briefly then dismiss.
  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => dismiss(), END_HOLD_MS);
    return () => window.clearTimeout(t);
  }, [done]);

  const dismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    markBootSeen(); // don't auto-play again for the rest of this session
    markBootDismissed(); // let the homepage captions start typing now
    setFading(true);
    window.setTimeout(() => {
      setActive(false);
      document.body.style.overflow = "";
    }, FADE_MS);
  };

  // Allow Enter / Escape to skip as well.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  if (!active) return null;

  const displayedLines = typed.slice(-MAX_TERMINAL_LINES);
  // Index of the line currently being typed (last non-finished line) so we can
  // place the caret there. Once done, caret sits at the end.
  const caretLine = displayedLines.length - 1;

  const mono =
    'ui-monospace, SFMono-Regular, Menlo, Monaco, "Cascadia Code", "Source Code Pro", monospace';

  return (
    // Full-screen dim backdrop that centers the terminal window.
    <div
      aria-hidden
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 4vw, 40px)",
        background: "radial-gradient(ellipse at center, #070b12 0%, #000 70%)",
        cursor: "pointer",
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        willChange: "opacity",
      }}
    >
      {/* Centered terminal window. */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(720px, 100%)",
          maxHeight: "min(80vh, 560px)",
          display: "flex",
          flexDirection: "column",
          background: "rgba(6, 9, 14, 0.96)",
          border: "1px solid rgba(56,189,248,0.25)",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.6), 0 24px 80px rgba(0,0,0,0.7), 0 0 60px rgba(56,189,248,0.08)",
          cursor: "default",
        }}
      >
        {/* Title bar with traffic lights. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 14px",
            background: "rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(56,189,248,0.12)",
            flexShrink: 0,
          }}
        >
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
          <span
            style={{
              marginLeft: 8,
              color: "rgba(56,189,248,0.55)",
              fontFamily: mono,
              fontSize: "12px",
              letterSpacing: "0.04em",
            }}
          >
            {dictionaries[lang].boot.title}
          </span>
        </div>

        {/* Terminal body (scrolls if content overflows). */}
        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            overflow: "auto",
            padding: "clamp(16px, 3vw, 24px)",
            color: "#38bdf8",
            fontFamily: mono,
            fontSize: "clamp(12.5px, 1.6vw, 15px)",
            lineHeight: 1.65,
            textShadow: "0 0 6px rgba(56,189,248,0.4)",
          }}
        >
          {/* subtle CRT scanline overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.16) 3px)",
              mixBlendMode: "multiply",
            }}
          />

          <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {typed.slice(-MAX_TERMINAL_LINES).map((line, i) => {
              // Tint by line type for a code-editor feel: "#" headings read like
              // dim comments, "> "/"✓" stand out, the rest stay plain sky-blue.
              const t = line.trimStart();
              const color = t.startsWith("#")
                ? "rgba(125, 170, 210, 0.75)"
                : t.startsWith(">") || t.startsWith("✓")
                ? "#7dd3fc"
                : undefined;
              return (
                <div key={i} style={color ? { color } : undefined}>
                  {line}
                  {i === caretLine && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "0.6em",
                        marginLeft: "1px",
                        background: "#38bdf8",
                        animation: "boot-caret 1s steps(1) infinite",
                        height: "1.05em",
                        verticalAlign: "text-bottom",
                      }}
                    >
                      &nbsp;
                    </span>
                  )}
                </div>
              );
            })}
          </pre>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            dismiss();
          }}
          style={{
            position: "absolute",
            bottom: "12px",
            right: "14px",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(56,189,248,0.5)",
            color: "#38bdf8",
            fontFamily: mono,
            fontSize: "12px",
            padding: "5px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            opacity: 0.85,
          }}
        >
          {dictionaries[lang].boot.skip}
        </button>
      </div>

      <style>{`
        @keyframes boot-caret {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
