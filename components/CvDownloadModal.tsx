"use client";

import { useEffect, useState } from "react";
import { Download, X, FileText, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

// The CV "CV" button lives in two places (the 3D laptop screen — where pointer
// events are limited — and the plain fallback). Both just fire this global
// event; the modal itself is mounted once in real DOM at the page level.
const OPEN_EVENT = "open-cv-modal";

export function 
openCvModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_EVENT));
  }
}

// The four CV variants: each language (TR/EN) has a "plain" and an
// "image/visual" PDF. `variantKey` maps into the cvModal dictionary so the
// Plain/Visual label follows the active site language; `code` (TR/EN) marks
// which language the PDF itself is written in.
const OPTIONS = [
  {
    code: "TR",
    variantKey: "cvModal.plain",
    variant: "plain" as const,
    href: "/folder/SELAMI-ÖZCAN-CV-TURKCE.pdf",
    download: "SELAMI-OZCAN-CV-TR.pdf",
  },
  {
    code: "TR",
    variantKey: "cvModal.visual",
    variant: "visual" as const,
    href: "/folder/SELAMI-ÖZCAN-CV-IMG-TURKCE.pdf",
    download: "SELAMI-OZCAN-CV-IMG-TR.pdf",
  },
  {
    code: "EN",
    variantKey: "cvModal.plain",
    variant: "plain" as const,
    href: "/folder/SELAMI-ÖZCAN-CV-TURKCE.pdf",
    download: "SELAMI-OZCAN-CV-EN.pdf",
  },
  {
    code: "EN",
    variantKey: "cvModal.visual",
    variant: "visual" as const,
    href: "/folder/SELAMI-ÖZCAN-CV-IMG-TURKCE.pdf",
    download: "SELAMI-OZCAN-CV-IMG-EN.pdf",
  },
];

type Rect = { top: number; left: number; width: number; height: number };

// Read the visible laptop screen area so the modal can open "inside" it. Falls
// back to the whole viewport (plain/LOW mode where there's no 3D screen).
function getScreenRect(): Rect {
  if (typeof window === "undefined") {
    return { top: 0, left: 0, width: 0, height: 0 };
  }
  const clip = document
    .querySelector<HTMLElement>(".laptop-screen-content")
    ?.parentElement;
  if (clip) {
    const r = clip.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) {
      return { top: r.top, left: r.left, width: r.width, height: r.height };
    }
  }
  return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
}

export default function CvDownloadModal() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    const onOpen = () => {
      setRect(getScreenRect());
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Keep the overlay glued to the laptop screen as it scrolls/animates.
    const reposition = () => setRect(getScreenRect());
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", reposition, { passive: true });
    window.addEventListener("resize", reposition);
    const id = window.setInterval(reposition, 120);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", reposition);
      window.removeEventListener("resize", reposition);
      window.clearInterval(id);
    };
  }, [open]);

  if (!open || !rect) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed z-[9998] flex items-center justify-center p-4"
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        background: "rgba(2,6,15,0.55)",
        backdropFilter: "blur(2px)",
        borderRadius: 18,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0e1116]"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Download className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{t("cvModal.title")}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t("cvModal.subtitle")}</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label={t("cvModal.close")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {OPTIONS.map((opt) => {
            const Icon = opt.variant === "visual" ? ImageIcon : FileText;
            return (
              <a
                key={opt.download}
                href={opt.href}
                download={opt.download}
                onClick={() => setOpen(false)}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-4 text-center transition-colors hover:border-sky-400 hover:bg-sky-50 dark:border-white/10 dark:hover:border-sky-400/50 dark:hover:bg-sky-500/10"
              >
                <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                <span className="text-lg font-bold text-slate-900 dark:text-white">{opt.code}</span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {t(opt.variantKey)}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
