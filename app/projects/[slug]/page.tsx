"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import projects from "@/informationData/projects";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect, use } from "react";
import ProjectSidebar from "@/components/ProjectSidebar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const { t } = useLanguage();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("overview");

  if (!project) {
    notFound();
  }

  // Filter other projects
  const otherProjects = projects.filter((p) => p.slug !== project.slug);

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      if (!project.sections) return;

      // Reverse iterate to find the section that is currently visible
      const sections = [...project.sections].reverse();

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section top is above or at the middle of viewport
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section.id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [project.sections]);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  return (
    <>
      <AnimatedBackground />
      {/* Project Sidebar */}
      <ProjectSidebar
        project={project}
        otherProjects={otherProjects}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Main Content - Adjusted for sidebar */}
      <div className="max-w-7xl mx-auto space-y-24 py-12 transition-all duration-3000 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("projectDetail.backToProjects")}</span>
            </Link>
          </motion.div>

          {/* Content Area */}
          <div className="space-y-8">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </motion.div>

            {/* Title & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h1>
                {project.category && (
                  <span className="px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-medium whitespace-nowrap">
                    {project.category}
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
            </motion.div>

            {/* Action Buttons & Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 items-center"
            >
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                >
                  <FaGithub className="w-5 h-5" />
                  GitHub Repo
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
                >
                  <ExternalLink className="w-5 h-5" />
                  {t("projectDetail.liveDemo")}
                </a>
              )}
              {project.date && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 ml-auto">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">{project.date}</span>
                </div>
              )}
            </motion.div>

            {/* Technologies */}
            {project.technologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("projectDetail.technologies")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Project Sections */}
            {project.sections && project.sections.length > 0 ? (
              <div className="space-y-6">
                {project.sections.map((section, index) => (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="scroll-mt-24"
                  >
                    <div className="p-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-lg font-bold">
                          {index + 1}
                        </span>
                        {section.title}
                      </h2>
                      <div className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line text-base">
                        {section.content}
                      </div>
                    </div>
                  </motion.section>
                ))}
              </div>
            ) : (
              /* Fallback to long description if no sections */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("projectDetail.about")}
                </h2>
                <div className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                  {project.longDescription}
                </div>
              </motion.div>
            )}

            {/* Features */}
            {project.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                  {t("projectDetail.features")}
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                    >
                      <span className="text-sky-600 dark:text-sky-400 flex-shrink-0 text-base leading-5">
                        ✓
                      </span>
                      <span className="text-sm leading-5">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Carousel Gallery */}
            {project.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("projectDetail.images")}
                </h2>

                {/* Main Carousel */}
                <div className="relative group">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} screenshot ${
                        currentImageIndex + 1
                      }`}
                      fill
                      className="object-cover cursor-pointer"
                      sizes="(max-width: 1280px) 100vw, 900px"
                      onClick={() => setIsLightboxOpen(true)}
                    />

                    {/* Navigation Arrows */}
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-900 shadow-md hover:shadow-lg hover:scale-105 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-70 hover:!opacity-100 transition-all duration-300 backdrop-blur-md z-10"
                          aria-label={t("projectDetail.previousImage")}
                        >
                          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-900 shadow-md hover:shadow-lg hover:scale-105 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-70 hover:!opacity-100 transition-all duration-300 backdrop-blur-md z-10"
                          aria-label={t("projectDetail.nextImage")}
                        >
                          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  {project.images.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                      {project.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            index === currentImageIndex
                              ? "border-sky-600 dark:border-sky-400 scale-105"
                              : "border-gray-300 dark:border-gray-700 hover:border-sky-400 dark:hover:border-sky-600"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <ScrollToTopButton />

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label={t("projectDetail.closeImage")}
            onClick={(event) => {
              event.stopPropagation();
              setIsLightboxOpen(false);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-7xl w-full aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {project.images.length > 1 && (
              <>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl hover:scale-105 text-gray-900 border border-gray-300 transition-all duration-200 z-10"
                  aria-label={t("projectDetail.previousImage")}
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl hover:scale-105 text-gray-900 border border-gray-300 transition-all duration-200 z-10"
                  aria-label={t("projectDetail.nextImage")}
                >
                  <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                </button>
              </>
            )}
            <Image
              src={project.images[currentImageIndex]}
              alt={t("projectDetail.enlargedImage")}
              fill
              className="object-contain"
              sizes="100vw"
            />
            {project.images.length > 1 && (
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
