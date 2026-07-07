"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Database,
  Download,
  Layout,
  Mail,
  Server,
  Sparkles,
  Zap,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import projects from "@/informationData/projects";
import posts from "@/informationData/blogs";
import Footer from "@/components/Footer";
import { openCvModal } from "@/components/CvDownloadModal";
import { useLanguage } from "@/lib/LanguageContext";

const techStack = [
  // --- Yazılım Geliştirme (Software Development) ---
  { name: "C#", color: "text-violet-600 dark:text-violet-300" },
  { name: "Python", color: "text-yellow-600 dark:text-yellow-300" },
  { name: "SQL Server", color: "text-red-600 dark:text-red-300" },
  { name: "REST API", color: "text-emerald-600 dark:text-emerald-300" },
  { name: "Postman", color: "text-orange-600 dark:text-orange-300" },
  { name: "API Automation", color: "text-pink-600 dark:text-pink-300" },
  { name: "Git", color: "text-orange-600 dark:text-orange-300" },
  { name: "Machine Learning", color: "text-indigo-600 dark:text-indigo-300" },

  // --- İş Analizi & Metodoloji (Business Analysis & Agile) ---
  { name: "Business Analysis", color: "text-emerald-600 dark:text-emerald-300" },
  { name: "Scrum & Agile", color: "text-blue-600 dark:text-blue-300" },
  { name: "Requirements Gathering", color: "text-teal-600 dark:text-teal-300" },
  { name: "Process Mapping", color: "text-sky-600 dark:text-sky-300" },
  { name: "Data Analysis", color: "text-purple-600 dark:text-purple-300" },
  { name: "Integration Testing", color: "text-amber-600 dark:text-amber-300" },
  { name: "UAT (User Acceptance)", color: "text-cyan-600 dark:text-cyan-300" },

  // --- CBS & Diğer Yetkinlikler ---
  { name: "GIS / CBS", color: "text-indigo-600 dark:text-indigo-300" },
];

const heroStats = [
  { value: "20+", labelKey: "home.hero.stats.projects" },
  { value: "BA", labelKey: "home.hero.stats.stackFocus" },
  { value: "CTIS", labelKey: "home.hero.stats.computerEng" } // CTIS (Bilişim Sistemleri ve Teknolojileri) değerine göre güncellendi
];

const skillCards = [
  {
    id: "fullstack",
    elementId: "about-fullstack",
    titleKey: "home.about.cards.fullstackTitle",
    descriptionKey: "home.about.cards.fullstackDesc",
    icon: Code2,
    accent: "from-sky-500 to-blue-600",
    text: "text-sky-700 dark:text-sky-300",
    ring: "hover:border-sky-400 dark:hover:border-sky-500",
  },
  {
    id: "database",
    elementId: "about-database",
    titleKey: "home.about.cards.databaseTitle",
    descriptionKey: "home.about.cards.databaseDesc",
    icon: Database,
    accent: "from-amber-500 to-orange-600",
    text: "text-orange-700 dark:text-orange-300",
    ring: "hover:border-orange-400 dark:hover:border-orange-500",
  },
  {
    id: "uiux",
    elementId: "about-uiux",
    titleKey: "home.about.cards.uiuxTitle",
    descriptionKey: "home.about.cards.uiuxDesc",
    icon: Layout,
    accent: "from-teal-500 to-emerald-600",
    text: "text-teal-700 dark:text-teal-300",
    ring: "hover:border-teal-400 dark:hover:border-teal-500",
  },
];
type HomeContentProps = {
  onSkillSelect?: (skillId: string) => void;
  expandedSkill?: string | null;
  setExpandedSkill?: (id: string | null) => void;
};

function SectionIntro({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/75 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200">
        <Icon className="h-4 w-4 text-sky-600 dark:text-sky-300" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function HomeContent(_props: HomeContentProps) {
  const { t, lang } = useLanguage();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-24 lg:space-y-28">
          <motion.section
            id="hero"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative isolate grid min-h-[64vh] items-center gap-12 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 px-5 py-12 shadow-[0_18px_48px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.045] dark:shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12"
          >
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(14,165,233,0.12),transparent_32%),linear-gradient(315deg,rgba(245,158,11,0.1),transparent_30%)] dark:bg-[linear-gradient(135deg,rgba(14,165,233,0.12),transparent_32%),linear-gradient(315deg,rgba(20,184,166,0.09),transparent_30%)]" />
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/90 px-4 py-2 text-sm font-semibold text-sky-800 shadow-sm dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200">
                <Sparkles className="h-4 w-4" />
                {t("home.hero.badge")}
              </div>

              <div className="space-y-5">
                <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                  Selami Özcan
                </h1>
                <p className="text-xl font-semibold text-slate-700 dark:text-slate-200 sm:text-2xl">
                  {t("home.hero.role")}
                </p>
                <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  {t("home.hero.description")}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-sky-700 dark:bg-white dark:text-slate-950 dark:hover:bg-sky-100 sm:w-auto"
                >
                  {t("home.hero.getInContact")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {/* CV download: tapping "CV" opens a language modal (works on all
                    devices). On hover-capable devices, hovering also reveals TR / EN
                    shortcuts that download directly. The shortcuts are hidden on
                    touch devices, where hover never triggers. */}
                <div className="group inline-flex w-full items-center justify-center overflow-hidden rounded-xl border border-slate-300 bg-white/70 shadow-sm dark:border-white/10 dark:bg-white/[0.06] sm:w-auto">
                  <button
                    type="button"
                    onClick={openCvModal}
                    className="flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:text-sky-700 dark:text-slate-100 dark:hover:text-sky-200 sm:w-auto"
                  >
                    <Download className="h-4 w-4" />
                    CV
                  </button>
                  <a
                    href="/folder/SELAMI-ÖZCAN-CV-TURKCE.pdf"
                    download="SELAMI-ÖZCAN-CV-TR.pdf"
                    className="hidden [@media(hover:hover)]:grid max-w-0 place-items-center overflow-hidden border-slate-300 py-3.5 text-sm font-semibold text-slate-700 opacity-0 transition-all duration-300 group-hover:max-w-[4rem] group-hover:border-l group-hover:px-4 group-hover:opacity-100 hover:text-sky-700 dark:border-white/10 dark:text-slate-200 dark:hover:text-sky-200"
                  >
                    TR
                  </a>
                  <a
                    href="/folder/SELAMI-ÖZCAN-CV-ENG.pdf"
                    download="SELAMI-ÖZCAN-CV-EN.pdf"
                    className="hidden [@media(hover:hover)]:grid max-w-0 place-items-center overflow-hidden border-slate-300 py-3.5 text-sm font-semibold text-slate-700 opacity-0 transition-all duration-300 group-hover:max-w-[4rem] group-hover:border-l group-hover:px-4 group-hover:opacity-100 hover:text-sky-700 dark:border-white/10 dark:text-slate-200 dark:hover:text-sky-200"
                  >
                    EN
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                {[
                  { href: "https://github.com/ozxcann", label: "GitHub", icon: FaGithub },
                  { href: "https://www.linkedin.com/in/selami-%C3%B6zcan/", label: "LinkedIn", icon: FaLinkedin },
                  { href: "mailto:selamiozcan.works@gmail.com", label: "Email", icon: Mail },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/75 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:border-sky-400/40 dark:hover:text-sky-200"
                      aria-label={item.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-950 p-5 text-white shadow-lg shadow-slate-950/15 dark:border-white/10">
                <div className="mb-5 flex items-center gap-2 border-b border-white/10 pb-4">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-auto text-xs font-medium text-slate-400">selami.dev</span>
                </div>
                <div className="space-y-3 font-mono text-sm leading-7">
                  <p><span className="text-sky-300">const</span> focus = <span className="text-sky-200">&quot;product quality&quot;</span>;</p>
                  <p><span className="text-sky-300">build</span>({"{ frontend, backend, ai }"});</p>
                  <p className="text-slate-400">// clean interfaces, practical systems</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {heroStats.map((stat) => (
                  <div
                    key={stat.labelKey}
                    className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.06]"
                  >
                    <p className="text-2xl font-bold text-slate-950 dark:text-white">{t(stat.valueKey)}</p>
                    <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{t(stat.labelKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <section
            id="tech-stack"
            className="overflow-hidden"
          >
            <SectionIntro
              eyebrow={t("home.techStack.eyebrow")}
              title={t("home.techStack.title")}
              description={t("home.techStack.description")}
              icon={Zap}
            />

            <div className="relative mt-12">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent dark:from-[#0a0a0a]" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent dark:from-[#0a0a0a]" />
              <div className="flex gap-3 animate-scroll">
                {[...techStack, ...techStack].map((tech, index) => (
                  <div
                    key={`${tech.name}-${index}`}
                    className="flex-shrink-0 rounded-full border border-slate-200 bg-white/85 px-5 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-white/20"
                  >
                    <span className={`whitespace-nowrap text-sm font-bold ${tech.color}`}>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="about"
            className="space-y-10"
          >
            <SectionIntro
              eyebrow={t("home.about.eyebrow")}
              title={t("home.about.title")}
              description={t("home.about.description")}
              icon={Server}
            />

            {/* Summary panel — at-a-glance profile drawn from the CV. */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.045] sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-400/12 blur-3xl dark:bg-sky-400/10" />
              <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-2xl font-black text-white shadow-lg">
                      ÖD
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Selami Özcan</h3>
                      <p className="text-base font-medium text-sky-700 dark:text-sky-300">{t("home.about.role")}</p>
                    </div>
                  </div>
                  <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-300">
                    {t("home.about.summary1")}
                  </p>
                  <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                    {t("home.about.summary2")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: t("home.about.facts.role"), value: t("home.about.facts.roleValue") },
                    { label: t("home.about.facts.education"), value: t("home.about.facts.educationValue") },
                    { label: t("home.about.facts.coreStack"), value: t("home.about.facts.coreStackValue") },
                    { label: t("home.about.facts.databases"), value: t("home.about.facts.databasesValue") },
                  ].map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                        {fact.label}
                      </p>
                      <p className="mt-2 text-lg font-bold text-slate-950 dark:text-white">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {skillCards.map((skill) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    id={skill.elementId}
                    key={skill.id}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    className={`group rounded-2xl border border-slate-200 bg-white/85 p-6 text-left shadow-sm transition hover:shadow-lg dark:border-white/10 dark:bg-white/[0.055] ${skill.ring}`}
                  >
                    <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${skill.accent} text-white shadow-lg`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white">{t(skill.titleKey)}</h3>
                    <p className="mt-3 min-h-[4.5rem] text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {t(skill.descriptionKey)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section
            id="projects"
            className="space-y-10"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/90 px-4 py-2 text-sm font-semibold text-indigo-800 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-200">
                  <Code2 className="h-4 w-4" />
                  {t("home.projects.eyebrow")}
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  {t("home.projects.title")}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  {t("home.projects.description")}
                </p>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white/75 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-100 dark:hover:border-sky-400/40 dark:hover:text-sky-200"
              >
                {t("home.projects.viewAll")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {projects.slice(0, 4).map((project, index) => (
                <article
                  key={project.slug}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white/85 shadow-sm transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.055] dark:hover:border-sky-400/30"
                >
                  <Link href={`/projects/${project.slug}`} className="block">
                    <div className="border-b border-slate-200 bg-slate-950 p-4 dark:border-white/10">
                      <div className="mb-4 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span className="ml-auto text-xs font-semibold text-slate-500">/{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="grid gap-2">
                        <div className="h-2.5 w-2/3 rounded-full bg-sky-300/70" />
                        <div className="h-2.5 w-full rounded-full bg-white/12" />
                        <div className="h-2.5 w-4/5 rounded-full bg-white/12" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                          {project.category ?? t("home.projects.defaultCategory")}
                        </span>
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-slate-950 transition group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-200">
                        {project.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {project.description}
                      </p>
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-700 dark:text-sky-300">
                        {t("home.projects.explore")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section
            id="blog"
            className="space-y-10"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-4 py-2 text-sm font-semibold text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200">
                  <Code2 className="h-4 w-4" />
                  {t("home.blog.eyebrow")}
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  {t("home.blog.title")}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  {t("home.blog.description")}
                </p>
              </div>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white/75 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-100 dark:hover:border-sky-400/40 dark:hover:text-sky-200"
              >
                {t("home.blog.viewAll")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {posts.slice(0, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.055] dark:hover:border-emerald-400/30"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-200">
                      {post.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{post.readTime}</span>
                  </div>
                  <h3 className="line-clamp-2 text-xl font-bold text-slate-950 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-200">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {new Date(post.date).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                      {t("home.blog.read")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section
            id="contact"
            className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-8 text-center text-white shadow-lg shadow-slate-950/15 dark:border-white/10 sm:p-12"
          >
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100">
                <Mail className="h-4 w-4" />
                {t("home.contact.eyebrow")}
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("home.contact.title")}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {t("home.contact.description")}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-sky-100"
                >
                  <Mail className="h-4 w-4" />
                  {t("home.contact.contactMe")}
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  {t("home.contact.learnMore")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
