"use client";

import { useEffect, useState } from "react";
import { CircleArrowUp } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const SCROLL_TRIGGER = 300;

export default function ScrollToTopButton() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_TRIGGER);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("common.scrollToTop")}
      className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg transition-all hover:scale-105 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:bg-sky-600 dark:hover:bg-sky-700"
    >
      <CircleArrowUp className="h-6 w-6" />
    </button>
  );
}
