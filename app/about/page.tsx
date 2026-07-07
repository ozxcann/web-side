"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  User,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Target,
  Download,
  Brain,
  Sparkles,
  AlertTriangle,
  Compass,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AnimatedBackground from "@/components/AnimatedBackground";
import { openCvModal } from "@/components/CvDownloadModal";
import { useLanguage } from "@/lib/LanguageContext";
import { dictionaries } from "@/languages";

export default function AboutPage() {
  const { t, lang } = useLanguage();
  const ab = dictionaries[lang].aboutPage;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {/* Hero Section */}
        <motion.section
          variants={itemVariants}
          className="relative rounded-3xl bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-950/30 dark:to-blue-950/30 p-8 md:p-12 overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            {/* Profile Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full"
              >
                <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("aboutPage.role")}
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                SELAMİ ÖZCAN
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("aboutPage.intro")}
              </p>

              {/* CV Download */}
              <motion.button
                onClick={openCvModal}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
              >
                <Download className="w-5 h-5" />
                {t("cvModal.button")}
              </motion.button>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                    1+
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {t("aboutPage.stats.experience")}
                  </div>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                    15+
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {t("aboutPage.stats.projects")}
                  </div>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                    10+
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {t("aboutPage.stats.technologies")}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative"
            >
              <div className="relative w-full max-w-sm mx-auto">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-500 rounded-3xl blur-2xl opacity-30" />

                {/* Image container */}
                <div className="relative rounded-3xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl bg-gray-200 dark:bg-gray-800 aspect-[3/4]">
                  {/* Image */}
                  <Image
                    src="/folder/my-character.png"
                    alt="SELAMİ ÖZCAN"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Personal Profile & Managerial Competencies */}
        <motion.section
          variants={itemVariants}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-slate-700/70 dark:bg-slate-900/50 md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.16),transparent_45%)]" />
          <div className="relative space-y-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-3 shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t("aboutPage.profile.heading")}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {t("aboutPage.profile.intro")}
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-slate-50/80 p-6 shadow-sm dark:border-slate-700/70 dark:bg-slate-800/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_50%)]" />
                <div className="relative">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400">
                        {t("aboutPage.profile.summaryLabel")}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                        {t("aboutPage.profile.summaryTitle")}
                      </h3>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                      <Sparkles className="h-4 w-4" />
                      {t("aboutPage.profile.summaryBadge")}
                    </div>
                  </div>

                  <div className="relative mt-6 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-inner dark:border-slate-700/70 dark:bg-slate-900/40">
                    <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(56,189,248,0.08),transparent_45%,rgba(168,85,247,0.08))]" />
                    <div className="relative space-y-4">
                      {ab.profile.metrics.map((metric) => (
                        <div key={metric.label}>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-700 dark:text-gray-200">{metric.label}</span>
                            <span className="font-semibold text-sky-600 dark:text-sky-300">{metric.value}</span>
                          </div>
                          <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                            <div
                              className="h-2.5 rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500"
                              style={{ width: metric.percent }}
                            />
                          </div>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{metric.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    titleKey: "aboutPage.profile.strengths.title",
                    itemsKey: "aboutPage.profile.strengths.items",
                    icon: Lightbulb,
                    badgeClass: "from-emerald-500 to-teal-500",
                    textClass: "text-emerald-700 dark:text-emerald-300",
                  },
                  {
                    titleKey: "aboutPage.profile.weaknesses.title",
                    itemsKey: "aboutPage.profile.weaknesses.items",
                    icon: AlertTriangle,
                    badgeClass: "from-amber-500 to-orange-500",
                    textClass: "text-amber-700 dark:text-amber-300",
                  },
                  {
                    titleKey: "aboutPage.profile.opportunities.title",
                    itemsKey: "aboutPage.profile.opportunities.items",
                    icon: Compass,
                    badgeClass: "from-sky-500 to-blue-500",
                    textClass: "text-sky-700 dark:text-sky-300",
                  },
                  {
                    titleKey: "aboutPage.profile.threats.title",
                    itemsKey: "aboutPage.profile.threats.items",
                    icon: ShieldCheck,
                    badgeClass: "from-rose-500 to-pink-500",
                    textClass: "text-rose-700 dark:text-rose-300",
                  },
                ].map((card) => {
                  const Icon = card.icon;
                  const items = t(card.itemsKey).split("||") as string[];
                  return (
                    <div
                      key={card.titleKey}
                      className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-800/60"
                    >
                      <div className={`inline-flex rounded-xl bg-gradient-to-br ${card.badgeClass} p-2.5`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-gray-900 dark:text-white">
                        {t(card.titleKey)}
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        {items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-none ${card.textClass}`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Education */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("aboutPage.education.heading")}
            </h2>
          </div>

          <motion.div
            whileHover={{ y: -3 }}
            className="relative rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-500 transition-all shadow-lg hover:shadow-xl overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 to-blue-500" />

            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                {/* Left: Main Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-xl">
                      <GraduationCap className="w-7 h-7 text-sky-600 dark:text-sky-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {t("aboutPage.education.degree")}
                      </h3>
                      <p className="text-sky-600 dark:text-sky-400 font-semibold">
                        {t("aboutPage.education.school")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {ab.education.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 text-xs font-medium border border-sky-200 dark:border-sky-800"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{t("aboutPage.education.date")}</span>
                  </div>
                </div>

                {/* Right: Highlights */}
                <div className="md:w-72 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {t("aboutPage.education.coursesLabel")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ab.education.courses.map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 text-xs"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("aboutPage.experience.heading")}
            </h2>
          </div>

          <div className="flex flex-col-reverse gap-6">
            {/* Experience Item 1 */}
            <motion.div
              whileHover={{ x: 5 }}
              className="group relative pl-8 pb-8 border-l-2 border-gray-300 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-400 transition-colors"
            >
              <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-sky-500 dark:group-hover:bg-sky-400 border-4 border-white dark:border-gray-900 transition-colors" />

              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {t("aboutPage.experience.flo.title")}
                    </h3>
                    <p className="text-sky-600 dark:text-sky-400 font-medium">
                      {t("aboutPage.experience.flo.company")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{t("aboutPage.experience.flo.date")}</span>
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-400 mb-4 space-y-3">
                  <p>{t("aboutPage.experience.flo.summary")}</p>
                  <ul className="space-y-2 ml-4">
                    {ab.experience.flo.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="text-sky-500 mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['SQL Server', 'Business Analysis', 'UAT', 'Scrum', 'Postman'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Experience Item 2 */}
            <motion.div
              whileHover={{ x: 5 }}
              className="group relative pl-8 pb-8 border-l-2 border-gray-300 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-400 transition-colors"
            >
              <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-sky-500 dark:group-hover:bg-sky-400 border-4 border-white dark:border-gray-900 transition-colors" />

              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {t("aboutPage.experience.norm.title")}
                    </h3>
                    <p className="text-sky-600 dark:text-sky-400 font-medium">
                      {t("aboutPage.experience.norm.company")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{t("aboutPage.experience.norm.date")}</span>
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-400 mb-4 space-y-3">
                  <p>{t("aboutPage.experience.norm.summary")}</p>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-sky-300 dark:border-sky-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {t("aboutPage.experience.norm.project1Title")}
                      </h4>
                      <ul className="space-y-1.5 text-sm ml-2">
                        {ab.experience.norm.project1Bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span className="text-sky-500 mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pl-4 border-l-2 border-sky-300 dark:border-sky-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {t("aboutPage.experience.norm.project2Title")}
                      </h4>
                      <ul className="space-y-1.5 text-sm ml-2">
                        {ab.experience.norm.project2Bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span className="text-sky-500 mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Leadership', 'Event Coordination', 'Stakeholder Management', 'Communication'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Experience Item 3 */}
            {ab.experience.pusula.title && (
              <motion.div
                whileHover={{ x: 5 }}
                className="group relative pl-8 pb-8 border-l-2 border-gray-300 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-400 transition-colors"
              >
                <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-sky-500 dark:group-hover:bg-sky-400 border-4 border-white dark:border-gray-900 transition-colors" />

                <div className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {t("aboutPage.experience.pusula.title")}
                      </h3>
                      <p className="text-sky-600 dark:text-sky-400 font-medium">
                        {t("aboutPage.experience.pusula.company")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{t("aboutPage.experience.pusula.date")}</span>
                    </div>
                  </div>

                  <div className="text-gray-600 dark:text-gray-400 mb-4 space-y-3">
                    <p>{t("aboutPage.experience.pusula.summary")}</p>

                    <div className="space-y-3">
                      <div className="pl-4 border-l-2 border-sky-300 dark:border-sky-700">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {t("aboutPage.experience.pusula.project1Title")}
                        </h4>
                        <ul className="space-y-1.5 text-sm ml-2">
                          {ab.experience.pusula.project1Bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2">
                              <span className="text-sky-500 mt-0.5">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["ABP Framework", ".NET 9", "Blazor", "PostgreSQL", "Redis", "RabbitMQ", "Docker", "CI/CD"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </motion.section>

        {/* Skills */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl shadow-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("aboutPage.skills.heading")}
            </h2>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-lg space-y-8">
            {[
              {
                label: ab.skills.groups.languages,
                skills: ["C#", "Python", "JavaScript", "TypeScript", "SQL", "C / C++", "Java (Basic)"],
              },
              {
                label: ab.skills.groups.frameworks,
                skills: ["React", "Next.js", "Angular", "React Native", "Node.js", "FastAPI", "CSS"],
              },
              {
                label: ab.skills.groups.database,
                skills: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB",],
              },
              {
                label: ab.skills.groups.tools,
                skills: ["REST API", "Postman", "API Automation", "Git", "Jira", "Confluence", "Docker"],
              },
              {
                label: ab.skills.groups.personal,
                skills: [
                  "Business Analysis",
                  "Scrum & Agile",
                  "Requirements Gathering",
                  "Process Mapping",
                  "Data Analysis",
                  "Integration Testing",
                  "UAT (User Acceptance)",
                  ...ab.skills.personalSkills,
                ],
              },
            ].map((group, groupIdx) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, idx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: groupIdx * 0.05 + idx * 0.04 }}
                      className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 text-sm font-medium border border-sky-200 dark:border-sky-800"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Certificates & Military */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("aboutPage.certificates.heading")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-500 transition-all shadow-lg hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-xl">
                  <Award className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {t("aboutPage.certificates.certsTitle")}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                    {ab.certificates.certsList.map((cert) => (
                      <li key={cert}>• {cert}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-500 transition-all shadow-lg hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {t("aboutPage.certificates.militaryTitle")}
                  </h3>
                  <p className="text-sky-600 dark:text-sky-400 font-medium mb-2">
                    {t("aboutPage.certificates.militaryStatus")}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("aboutPage.certificates.militaryText")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* What I Offer */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("aboutPage.offer.heading")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: TrendingUp, ...ab.offer.cards[0] },
              { icon: Code2, ...ab.offer.cards[1] },
              { icon: Target, ...ab.offer.cards[2] },
              { icon: Briefcase, ...ab.offer.cards[3] },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 border border-sky-200 dark:border-sky-800"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl shadow-lg">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Info */}
        <motion.section
          id="contact"
          variants={itemVariants}
          className="rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 p-8 md:p-12 text-white"
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{t("aboutPage.contact.heading")}</h2>
            <p className="text-lg text-sky-100">
              {t("aboutPage.contact.text")}
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:selamiozcan.works@gmail.com"
                className="flex items-center gap-2 px-6 py-3 bg-white text-sky-600 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                <Mail className="w-5 h-5" />
                {t("aboutPage.contact.email")}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/selami-%C3%B6zcan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/ozxcann"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </motion.a>
            </div>
          </div>
        </motion.section>
      </motion.div>
      <ScrollToTopButton />
      </div>
    </>
  );
}
