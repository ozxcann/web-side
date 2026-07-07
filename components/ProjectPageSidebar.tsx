"use client";

import { useState, useEffect } from "react";
import { Menu, X, FolderGit2, Dock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Project } from "@/informationData/projects";
import { useLanguage } from "@/lib/LanguageContext";

interface ProjectPageSidebarProps {
  projects: Project[];
}

export default function ProjectPageSidebar({ projects }: ProjectPageSidebarProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const pathname = usePathname();

  // Get current project slug from pathname
  const currentSlug = pathname?.split("/projects/")[1] || null;

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
                      <Dock className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                      {t("projectsPage.sidebarTitle")}
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

              {/* Projects List - Scrollable */}
              <div className="overflow-y-auto px-4 py-3 space-y-2 max-h-[60vh]">
                {projects.map((project, index) => {
                  const isActive = currentSlug === project.slug;
                  const isHovered = hoveredProject === project.slug;

                  return (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            setIsOpen(false);
                          }
                        }}
                        onMouseEnter={() => setHoveredProject(project.slug)}
                        onMouseLeave={() => setHoveredProject(null)}
                        className="block relative group"
                      >
                        {/* Active indicator bar */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              layoutId="activeProject"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-sky-500 to-blue-500 rounded-full"
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                        </AnimatePresence>

                        <div
                          className={`px-4 py-3 rounded-2xl transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30 shadow-lg shadow-sky-500/20"
                              : isHovered
                              ? "bg-gray-50 dark:bg-gray-800/50"
                              : "hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className="relative mt-0.5 flex-shrink-0">
                              {isActive && (
                                <motion.div
                                  layoutId="projectIconGlow"
                                  className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg blur-md opacity-50"
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                              <div
                                className={`relative p-2 rounded-lg transition-all duration-300 ${
                                  isActive
                                    ? "bg-gradient-to-br from-sky-500 to-blue-500 shadow-lg"
                                    : "bg-gray-100 dark:bg-gray-800"
                                }`}
                              >
                                <FolderGit2
                                  className={`w-4 h-4 transition-all duration-300 ${
                                    isActive
                                      ? "text-white"
                                      : "text-gray-600 dark:text-gray-400 group-hover:text-sky-600 dark:group-hover:text-sky-400"
                                  }`}
                                />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3
                                className={`font-semibold text-sm mb-1 truncate transition-all duration-300 ${
                                  isActive
                                    ? "text-sky-700 dark:text-sky-300"
                                    : "text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400"
                                }`}
                                title={project.title}
                              >
                                {project.title}
                              </h3>
                              <p
                                className={`text-xs line-clamp-2 transition-all duration-300 ${
                                  isActive
                                    ? "text-sky-600/80 dark:text-sky-400/80"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {project.description}
                              </p>

                              {/* Category Badge */}
                              {project.category && (
                                <div className="mt-2">
                                  <span
                                    className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium transition-all duration-300 ${
                                      isActive
                                        ? "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                    }`}
                                  >
                                    {project.category}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Project Count Footer */}
              <div className="relative px-6 py-3 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {t("projectsPage.totalProjects")}
                  </span>
                  <span className="text-xs font-bold bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
                    {projects.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
