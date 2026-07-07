"use client";

import { useState, useEffect } from "react";
import { Menu, X, FolderGit2, List, SquareMenu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/informationData/projects";
import { useLanguage } from "@/lib/LanguageContext";

interface ProjectSidebarProps {
  project: Project;
  otherProjects: Project[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export default function ProjectSidebar({
  project,
  otherProjects,
  activeSection,
  onSectionClick,
}: ProjectSidebarProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Desktop'ta otomatik aç, mobile'da kapalı kalsın
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // İlk yüklemede kontrol et
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    // Mobile'da sidebar'ı kapat
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Open Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed top-24 left-6 z-30 group"
            aria-label={t("projectSidebar.openMenu")}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

              {/* Button */}
              <div className="relative px-4 py-3 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
              </div>
            </div>
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
            data-scroll-locked="true"
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
            data-scroll-locked="true"
            className="fixed top-28 left-6 w-80 z-40 max-h-[calc(100vh-9rem)]"
          >
            {/* Glass container */}
            <div className="rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden flex flex-col">
              {/* Header with gradient */}
              <div className="relative px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-500/10" />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl shadow-lg">
                      <SquareMenu className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                      {t("projectSidebar.title")}
                    </span>
                  </div>

                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all"
                    aria-label={t("projectSidebar.closeMenu")}
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </motion.button>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="overflow-y-auto px-4 py-3 space-y-4 max-h-[60vh]">
                {/* Project Sections Navigation */}
                {project.sections && project.sections.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                      <List className="w-3.5 h-3.5" />
                      {t("projectSidebar.contents")}
                    </h3>
                    <div className="space-y-1">
                      {project.sections.map((section, index) => {
                        const isActive = activeSection === section.id;
                        const isHovered = hoveredSection === section.id;

                        return (
                          <motion.button
                            key={section.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleSectionClick(section.id)}
                            onMouseEnter={() => setHoveredSection(section.id)}
                            onMouseLeave={() => setHoveredSection(null)}
                            className="w-full relative group"
                          >
                            {/* Active indicator bar */}
                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  layoutId="activeProjectSection"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-sky-500 to-blue-500 rounded-full"
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                            </AnimatePresence>

                            <div
                              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                                isActive
                                  ? "bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30 shadow-lg shadow-sky-500/20"
                                  : isHovered
                                  ? "bg-gray-50 dark:bg-gray-800/50"
                                  : "hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                              }`}
                            >
                              {/* Number badge */}
                              <div className="relative">
                                {isActive && (
                                  <motion.div
                                    layoutId="numberGlow"
                                    className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full blur-md opacity-50"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                  />
                                )}
                                <span
                                  className={`relative text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    isActive
                                      ? "bg-gradient-to-br from-sky-500 to-blue-500 text-white shadow-lg"
                                      : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                  }`}
                                >
                                  {index + 1}
                                </span>
                              </div>

                              <span
                                className={`text-sm font-medium truncate transition-all duration-300 ${
                                  isActive
                                    ? "text-sky-700 dark:text-sky-300"
                                    : "text-gray-700 dark:text-gray-300 group-hover:text-sky-600 dark:group-hover:text-sky-400"
                                }`}
                                title={section.title}
                              >
                                {section.title}
                              </span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Divider */}
                {project.sections && project.sections.length > 0 && otherProjects.length > 0 && (
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-white/80 dark:bg-gray-900/80 text-xs text-gray-400">
                        •••
                      </span>
                    </div>
                  </div>
                )}

                {/* Other Projects */}
                {otherProjects.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                      <FolderGit2 className="w-3.5 h-3.5" />
                      {t("projectSidebar.otherProjects")}
                    </h3>
                    <div className="space-y-3">
                      {otherProjects.map((otherProject, idx) => (
                        <motion.div
                          key={otherProject.slug}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Link
                            href={`/projects/${otherProject.slug}`}
                            onClick={() => {
                              if (window.innerWidth < 1024) {
                                setIsOpen(false);
                              }
                            }}
                            className="block group"
                          >
                            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-3 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300">
                              <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800">
                                <Image
                                  src={otherProject.thumbnail}
                                  alt={otherProject.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                  sizes="280px"
                                />
                                {/* Overlay gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                              <h4
                                className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate mb-1"
                                title={otherProject.title}
                              >
                                {otherProject.title}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                {otherProject.description}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Progress Indicator */}
              <div className="relative px-6 py-3 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${scrollProgress}%` }}
                    transition={{ duration: 0.1 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
