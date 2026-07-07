"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import projects from "@/informationData/projects";
import { ArrowRight, FolderGit2, ChevronLeft, ChevronRight } from "lucide-react";
import ProjectPageSidebar from "@/components/ProjectPageSidebar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  // Calculate pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatedBackground />
      {/* Sidebar */}
      <ProjectPageSidebar projects={projects} />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12 w-full">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <FolderGit2 className="w-8 h-8 text-sky-600 dark:text-sky-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {t("projectsPage.title")}
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            {t("projectsPage.description")}
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="h-full rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-500 overflow-hidden transition-all duration-300 hover:shadow-xl">
                  {/* Thumbnail Image */}
                  <div className="relative w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index === 0}
                    />
                    {/* Category Badge */}
                    {project.category && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-sky-600/90 backdrop-blur-sm text-white text-xs font-medium">
                        {project.category}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3
                      className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate"
                      title={project.title}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700/50 text-xs font-medium text-gray-700 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700/50 text-xs font-medium text-gray-500 dark:text-gray-400">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* More Link */}
                    <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-medium pt-2">
                      <span className="text-sm">{t("projectsPage.more")}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center items-center gap-2 pt-8"
          >
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 1
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 dark:hover:text-sky-400 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t("projectsPage.previous")}</span>
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    currentPage === pageNumber
                      ? 'bg-sky-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 dark:hover:text-sky-400 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === totalPages
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 dark:hover:text-sky-400 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <span className="hidden sm:inline">{t("projectsPage.next")}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <FolderGit2 className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              {t("projectsPage.empty")}
            </p>
          </div>
        )}
      </motion.section>
      </div>

      <ScrollToTopButton />
    </>
  );
}
