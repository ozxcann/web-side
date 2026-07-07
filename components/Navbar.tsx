"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { replayBoot } from "@/lib/bootGate";

const NAV_ITEMS = [
  { href: "/", labelKey: "navbar.home" },
  { href: "/about", labelKey: "navbar.about" },
  { href: "/projects", labelKey: "navbar.projects" },
  { href: "/blog", labelKey: "navbar.blog" },
  { href: "/contact", labelKey: "navbar.contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-[#0a0a0a]/80 border-b border-gray-200 dark:border-gray-800">
      <nav className="flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 h-16">
        <Link
          href="/"
          suppressHydrationWarning={true}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Selami <span className="text-sky-600 dark:text-sky-400">Özcan</span>
          </span>
          <span className="hidden sm:block text-gray-400 dark:text-gray-600">|</span>
          <span className="hidden sm:block text-base font-medium text-gray-600 dark:text-gray-400">
            {t("navbar.role")}
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-2">
          {/* Intro: replays the boot terminal. On other pages, routes home first. */}
          <Link
            href="/"
            onClick={() => replayBoot()}
            suppressHydrationWarning={true}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 whitespace-nowrap"
          >
            <Terminal className="h-4 w-4" />
            {t("navbar.intro")}
          </Link>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const isHome = item.href === "/";
            return (
              <Link
                key={item.href}
                href={item.href}
                suppressHydrationWarning={true}
                className={`px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                  isHome && isActive
                    ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30"
                    : isHome
                    ? "text-gray-700 dark:text-gray-300 bg-gray-50/40 dark:bg-gray-700/40 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    : isActive
                    ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
          <div className="ml-3 pl-3 border-l border-gray-300 dark:border-gray-700 flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={t("navbar.toggleMenu")}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-lg">
          <div className="px-4 sm:px-8 md:px-12 py-4 space-y-1">
            {/* Intro: replays the boot terminal. On other pages, routes home first. */}
            <Link
              href="/"
              suppressHydrationWarning={true}
              onClick={() => {
                setIsOpen(false);
                replayBoot();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Terminal className="h-4 w-4" />
              {t("navbar.intro")}
            </Link>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const isHome = item.href === "/";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  suppressHydrationWarning={true}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-md text-base font-medium transition-colors duration-200 ${
                    isHome && isActive
                      ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30"
                      : isHome
                      ? "text-gray-700 dark:text-gray-300 bg-gray-50/40 dark:bg-gray-700/40 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                      : isActive
                      ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}