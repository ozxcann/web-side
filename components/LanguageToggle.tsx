"use client";

// LanguageToggle: TR/EN arası geçiş yapan kompakt buton.
// ThemeToggle gibi mount sonrası render edilir (hydration güvenli).

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggle, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={t("navbar.switchLanguage")}
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium">{lang.toUpperCase()}</span>
    </button>
  );
}
