"use client";

import { useState, useEffect } from "react";
import { Menu, X, Home, Code2, User, Layers, FolderGit2, BookOpen, Mail, Blinds } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

interface MenuItem {
  id: string;
  titleKey: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarMenuProps {
  onSkillSelect?: (skillId: string) => void;
}

const menuItems: MenuItem[] = [
  {
    id: "hero",
    titleKey: "sidebar.hero",
    icon: Home,
  },
  {
    id: "tech-stack",
    titleKey: "sidebar.techStack",
    icon: Code2,
  },
  {
    id: "about",
    titleKey: "sidebar.about",
    icon: User,
  },
  {
    id: "skills",
    titleKey: "sidebar.skills",
    icon: Layers,
  },
  {
    id: "projects",
    titleKey: "sidebar.projects",
    icon: FolderGit2,
  },
  {
    id: "blog",
    titleKey: "sidebar.blog",
    icon: BookOpen,
  },
  {
    id: "contact",
    titleKey: "sidebar.contact",
    icon: Mail,
  },
];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export default function SidebarMenu({ onSkillSelect }: SidebarMenuProps = {}) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Scroll spy - active section tracking
  useEffect(() => {
    const ids = menuItems.map((item) => item.id);

    // Picks the active id given the viewport range currently being read
    // ([viewTop, viewBottom]) and the total scrollable length. Chooses the
    // section whose body overlaps the viewport center most, with hard snaps to
    // the first/last section at the scroll extremes (so Contact, which sits at
    // the very bottom, actually activates when you reach the end).
    const pick = (viewTop: number, viewBottom: number, scrollLen: number): string => {
      const EPS = 4;
      if (viewTop <= EPS) return ids[0];
      if (scrollLen > 0 && viewTop >= scrollLen - EPS) return ids[ids.length - 1];

      const center = (viewTop + viewBottom) / 2;
      let best = ids[0];
      let bestDist = Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        // Distance from the viewport center to this section's body (0 if inside).
        const dist = center < top ? top - center : center > bottom ? center - bottom : 0;
        if (dist < bestDist) {
          bestDist = dist;
          best = id;
        }
      }
      return best;
    };

    const handleScroll = () => {
      // The page can live INSIDE the 3D laptop screen, where sections scroll via
      // a translateY transform on `.laptop-screen-content` (not the window).
      const inner = document.querySelector<HTMLElement>(".laptop-screen-content");
      if (inner) {
        const clipH = inner.parentElement?.clientHeight ?? window.innerHeight;
        const m = new DOMMatrixReadOnly(getComputedStyle(inner).transform);
        const innerScroll = -m.m42; // translateY is negative while scrolling down
        const scrollLen = Math.max(0, inner.scrollHeight - clipH);

        setScrollProgress(scrollLen > 0 ? (innerScroll / scrollLen) * 100 : 0);
        setActiveSection(pick(innerScroll, innerScroll + clipH, scrollLen));
        return;
      }

      // Fallback: plain window-scrolled layout.
      const scrollLen = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollLen > 0 ? (window.scrollY / scrollLen) * 100 : 0);
      setActiveSection(pick(window.scrollY, window.scrollY + window.innerHeight, scrollLen));
    };

    window.addEventListener("scroll", handleScroll);
    // The inner panel transform updates each animation frame while open, so poll
    // it on a light interval too (scroll events alone can lag the transform).
    const poll = window.setInterval(handleScroll, 120);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearInterval(poll);
    };
  }, []);

  const getLaptopScrollTarget = (element: HTMLElement) => {
    const screenContent = element.closest<HTMLElement>(".laptop-screen-content");
    const wrapper = document.getElementById("laptop-experience");
    if (!screenContent || !wrapper) return null;

    const clip = screenContent.parentElement;
    const scrollLen = screenContent.scrollHeight - (clip?.clientHeight ?? window.innerHeight);
    const innerTop = element.offsetTop;
    const browseRatio = scrollLen > 0 ? clamp01(innerTop / scrollLen) : 0;
    const openEnd = Number(wrapper.dataset.openEnd ?? 0.32);
    const closeStart = Number(wrapper.dataset.closeStart ?? 0.82);
    const progress = openEnd + browseRatio * (closeStart - openEnd);
    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    const wrapperScrollable = wrapper.offsetHeight - window.innerHeight;

    return wrapperTop + progress * wrapperScrollable;
  };

  const scrollToSection = (id: string, skillId?: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const laptopTarget = getLaptopScrollTarget(element);
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = laptopTarget ?? elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // If there's a skillId, trigger the skill panel to open
      if (skillId && onSkillSelect) {
        setTimeout(() => onSkillSelect(skillId), 500);
      }

      if (window.innerWidth < 1024) {
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      {/* Floating Open Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed top-24 left-6 z-30 flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200/80 bg-white/80 text-gray-700 shadow-lg backdrop-blur-md transition-colors hover:text-sky-600 dark:border-white/10 dark:bg-gray-900/80 dark:text-gray-300 dark:hover:text-sky-400"
            aria-label={t("sidebar.openMenu")}
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Menu - Glassmorphism Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-24 left-6 z-40 w-80 max-h-[calc(100vh-7rem)]"
          >
            {/* Glass container */}
            <div className="flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-3xl border border-gray-200/70 bg-white/85 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/85">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200/70 px-5 py-4 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                    <Blinds className="h-4 w-4" />
                  </div>
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    {t("sidebar.navigation")}
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                  aria-label={t("sidebar.closeMenu")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items - Scrollable */}
              <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  const isHovered = hoveredItem === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <button
                        onClick={() => scrollToSection(item.id)}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="group relative w-full"
                      >
                        {/* Active indicator bar */}
                        {isActive && (
                          <motion.div
                            layoutId="activeSection"
                            className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-full bg-sky-500"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}

                        {/* Button content */}
                        <div
                          className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors duration-200 ${
                            isActive
                              ? "bg-sky-50 dark:bg-sky-500/10"
                              : isHovered
                              ? "bg-gray-100/70 dark:bg-white/5"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 ${
                                isActive
                                  ? "bg-sky-500 text-white"
                                  : "bg-gray-100 text-gray-500 group-hover:text-sky-600 dark:bg-white/5 dark:text-gray-400 dark:group-hover:text-sky-400"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>

                            <span
                              className={`text-[15px] font-medium transition-colors duration-200 ${
                                isActive
                                  ? "text-sky-700 dark:text-sky-300"
                                  : "text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white"
                              }`}
                            >
                              {t(item.titleKey)}
                            </span>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Scroll progress */}
              <div className="border-t border-gray-200/70 px-5 py-3.5 dark:border-white/10">
                <div className="relative h-1 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-sky-500"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
