"use client";

import { useLanguage } from "@/lib/LanguageContext";

/**
 * Shown while the heavy LaptopFrame bundle is still being downloaded/parsed
 * (the `dynamic(..., { ssr:false })` loading state, before the 3D scene even
 * mounts). The BootTerminal intro usually covers this on first visit, but on
 * replays / slow connections this animated placeholder fills the reserved
 * height instead of a blank screen.
 */
export default function LaptopLoadingFallback() {
  const { t } = useLanguage();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing laptop-shaped placeholder */}
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-[3px] border-slate-200 dark:border-white/10" />
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-sky-500 border-r-sky-500" />
        </div>
        <span className="animate-pulse text-sm font-medium text-slate-500 dark:text-slate-400">
          {t("laptopScreen.experience.loading")}
        </span>
      </div>
    </div>
  );
}
