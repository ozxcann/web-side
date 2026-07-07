

// ThemeToggle: Sadece buton/dropdown komponenti, temayı değiştirir


"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ThemeToggle() {
  const { t } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  const options = [
    { value: "light", label: t("common.light"), icon: Sun },
    { value: "dark", label: t("common.dark"), icon: Moon },
  ];

  // Eğer theme "system" ise, resolvedTheme'i kullan (gerçek temayı göster)
  const displayTheme = theme === "system" ? resolvedTheme : theme;
  const currentTheme = displayTheme || "light";
  const currentOption = options.find((opt) => opt.value === currentTheme) || options[0];
  const CurrentIcon = currentOption.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={t("common.toggleTheme")}
      >
        <CurrentIcon className="h-4 w-4" />
        <span className="text-sm font-medium">{currentOption.label}</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg overflow-hidden z-50">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => {
                  setTheme(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  currentTheme === option.value
                    ? "bg-sky-500 text-white dark:bg-sky-600"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
