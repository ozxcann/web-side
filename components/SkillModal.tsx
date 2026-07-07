"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, Code, FolderGit2 } from "lucide-react";
import { SkillDetail } from "@/informationData/skills";
import { useLanguage } from "@/lib/LanguageContext";

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: SkillDetail | null;
}

export default function SkillModal({ isOpen, onClose, skill }: SkillModalProps) {
  const { t } = useLanguage();

  if (!skill) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-600 dark:to-blue-700 px-6 py-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {skill.title}
                    </h2>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                      aria-label={t("skillModal.close")}
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  <p className="mt-3 text-sky-50 text-base sm:text-lg">
                    {skill.description}
                  </p>
                </div>

                {/* Content */}
                <div className="px-6 py-8 space-y-8 max-h-[70vh] overflow-y-auto">
                  {/* Experiences */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {t("skillModal.experience")}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {skill.experiences.map((exp, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                        >
                          <h4 className="font-semibold text-sky-600 dark:text-sky-400 mb-2">
                            {exp.title}
                          </h4>
                          <ul className="space-y-1.5">
                            {exp.details.map((detail, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                              >
                                <span className="text-sky-500 dark:text-sky-400 mt-1.5">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  {/* Technologies */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <Code className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {t("skillModal.technologies")}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech, index) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="px-3 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-medium border border-sky-200 dark:border-sky-800"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </section>

                  {/* Projects */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <FolderGit2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {t("skillModal.relatedProjects")}
                      </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {skill.projects.map((project, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 border border-gray-200 dark:border-gray-700"
                        >
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {project.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {project.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-colors"
                  >
                    {t("skillModal.close")}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
