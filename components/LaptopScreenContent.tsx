"use client";

import Link from "next/link";
import {
  ArrowRight,
  BoxSelect,
  ChevronDown,
  Code2,
  Database,
  Download,
  Info,
  Layout,
  Mail,
  PanelLeft,
  PenLine,
  Search,
  Share,
  Square,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import projects from "@/informationData/projects";
import posts from "@/informationData/blogs";
import { openCvModal } from "@/components/CvDownloadModal";

const techStack = [
  // --- Yazılım Geliştirme (Software Development) ---
  "C#",
  "Python",
  "SQL Server",
  "REST API",
  "Postman",
  "API Automation",
  "Git",
  "Machine Learning",

  // --- İş Analizi & Metodoloji (Business Analysis & Agile) ---
  "Business Analysis",
  "Scrum & Agile",
  "Requirements Gathering",
  "Process Mapping",
  "Data Analysis",
  "Integration Testing",
  "UAT (User Acceptance)",

  // --- CBS & Diğer Yetkinlikler ---
  "GIS / CBS",
];

const skills = [
  {
    id: "fullstack",
    elementId: "about-fullstack",
    titleKey: "laptopScreen.skills.cards.fullstackTitle",
    descriptionKey: "laptopScreen.skills.cards.fullstackDesc",
    icon: Code2,
  },
  {
    id: "database",
    elementId: "about-database",
    titleKey: "laptopScreen.skills.cards.databaseTitle",
    descriptionKey: "laptopScreen.skills.cards.databaseDesc",
    icon: Database,
  },
  {
    id: "uiux",
    elementId: "about-uiux",
    titleKey: "laptopScreen.skills.cards.uiuxTitle",
    descriptionKey: "laptopScreen.skills.cards.uiuxDesc",
    icon: Layout,
  },
];

const toolbarGroups = [
  [ZoomOut, Search, ZoomIn],
  [PenLine, ChevronDown],
  [BoxSelect, Square],
  [Info, Share],
];

const annotationTools = ["AI", "□", "▣", "⌁", "∿", "▢", "≡", "Aa"];
export const LAPTOP_SCREEN_TOOLBAR_H = 118;

type LaptopScreenContentProps = {
  expandedSkill?: string | null;
  setExpandedSkill?: (id: string | null) => void;
  t: (key: string) => string;
};

// Each section is a full-screen "slide" inside the laptop. Because the page is
// rendered small inside the 3D panel, everything is sized large and high
// contrast so it stays readable from a distance.
const SLIDE_MIN_H = 812; // ≈ visible screen height (pageH − toolbar)

function Slide({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className="flex flex-col justify-center"
      style={{ minHeight: SLIDE_MIN_H, paddingTop: 120, paddingBottom: 120 }}
    >
      {children}
    </section>
  );
}

function SectionHeader({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center gap-4 text-2xl font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        <span className="tabular-nums text-sky-600 dark:text-sky-400">{index}</span>
        <span className="h-px w-12 bg-slate-300 dark:bg-white/20" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-6xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-6 max-w-3xl text-3xl leading-snug text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}

// Total "pages" shown in the toolbar — matches the number of scrollable slides
// (hero, tech-stack, about, skills, projects, blog, contact). Counted live from
// the DOM at runtime, this is just the initial value.
export const LAPTOP_SCREEN_PAGES = 7;

export function MacPreviewToolbar({
  pageLabelRef,
  t,
}: {
  pageLabelRef?: React.Ref<HTMLParagraphElement>;
  t: (key: string) => string;
}) {
  return (
    <header className="relative z-20 border-b border-black/20 bg-[#303741] text-white shadow-[0_14px_42px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#252b34]">
      <div className="flex h-[4.65rem] items-center gap-5 px-7">
        <div className="flex items-center gap-3">
          <span className="h-4 w-4 rounded-full bg-[#ff5f57]" />
          <span className="h-4 w-4 rounded-full bg-[#ffbd2e]" />
          <span className="h-4 w-4 rounded-full bg-[#28c840]" />
        </div>

        <div className="flex h-10 items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 text-slate-200 shadow-inner shadow-white/5">
          <PanelLeft className="h-5 w-5" />
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-xl font-black leading-tight text-white">{t("laptopScreen.toolbar.previewTitle")}</p>
          <p ref={pageLabelRef} className="mt-1 text-sm font-semibold text-slate-300">
            {t("laptopScreen.toolbar.page")} 1 / {LAPTOP_SCREEN_PAGES}
          </p>
        </div>

        <nav className="hidden items-center gap-4 lg:flex" aria-label={t("laptopScreen.toolbar.tools")}>
          {toolbarGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex h-10 items-center gap-3 rounded-full border border-white/12 bg-black/14 px-4 text-slate-200 shadow-inner shadow-white/5"
            >
              {group.map((Icon, iconIndex) => (
                <Icon key={`${groupIndex}-${iconIndex}`} className="h-5 w-5" strokeWidth={2.1} />
              ))}
            </div>
          ))}
        </nav>

        <div className="hidden h-10 w-64 items-center gap-3 rounded-full border border-white/12 bg-black/18 px-4 text-slate-400 shadow-[inset_0_1px_8px_rgba(255,255,255,0.04)] xl:flex">
          <Search className="h-5 w-5" />
          <span className="text-base font-semibold">{t("laptopScreen.toolbar.search")}</span>
        </div>
      </div>

      <div className="flex h-11 items-center gap-6 border-t border-white/10 px-7 text-slate-300">
        {annotationTools.map((tool) => (
          <span key={tool} className="text-lg font-semibold leading-none text-slate-300/90">
            {tool}
          </span>
        ))}
        <span className="h-5 w-px bg-white/14" />
        <span className="h-4 w-7 rounded-sm border border-slate-300/70" />
        <span className="h-4 w-4 rounded-sm border border-slate-300/80 bg-black/35" />
        <span className="text-base font-semibold text-slate-300">Aa</span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </div>
    </header>
  );
}

export default function LaptopScreenContent({ t }: LaptopScreenContentProps) {
  return (
    <div className="relative isolate overflow-hidden bg-white text-slate-950 dark:bg-[#08090c] dark:text-white">
      <main className="mx-auto max-w-[1180px] px-12">
        <div>
          <Slide id="hero">
            <p className="text-2xl font-medium uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
              {t("laptopScreen.hero.role")}
            </p>
            <h1 className="mt-6 text-8xl font-semibold leading-[0.98] tracking-tight text-slate-900 dark:text-white">
              Selami Özcan
            </h1>
            <p className="mt-8 max-w-3xl text-3xl leading-snug text-slate-600 dark:text-slate-300">
              {t("laptopScreen.hero.description")}
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2.5 rounded-xl bg-slate-900 px-7 py-4 text-xl font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                {t("laptopScreen.hero.getInContact")}
                <ArrowRight className="h-6 w-6" />
              </Link>

              {/* CV download: "CV" opens a language modal; hovering also reveals
                  TR / EN shortcuts that download directly. */}
              <div className="group inline-flex items-center overflow-hidden rounded-xl border-2 border-slate-300 dark:border-white/20">
                <button
                  type="button"
                  onClick={openCvModal}
                  className="flex items-center gap-2.5 px-6 py-4 text-xl font-medium text-slate-800 transition-colors hover:text-sky-700 dark:text-slate-100 dark:hover:text-sky-300"
                >
                  <Download className="h-6 w-6" />
                  CV
                </button>
                <a
                  href="/folder/SELAMI-ÖZCAN-CV-TURKCE.pdf"
                  download="SELAMI-ÖZCAN-CV-TR.pdf"
                  className="grid max-w-0 place-items-center overflow-hidden border-slate-300 py-4 text-xl font-medium text-slate-700 opacity-0 transition-all duration-300 group-hover:max-w-[5rem] group-hover:border-l-2 group-hover:px-5 group-hover:opacity-100 hover:bg-slate-100 hover:text-sky-700 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-sky-300"
                >
                  TR
                </a>
                <a
                  href="/folder/SELAMI-ÖZCAN-CV-ENG.pdf"
                  download="SELAMI-ÖZCAN-CV-EN.pdf"
                  className="grid max-w-0 place-items-center overflow-hidden border-slate-300 py-4 text-xl font-medium text-slate-700 opacity-0 transition-all duration-300 group-hover:max-w-[5rem] group-hover:border-l-2 group-hover:px-5 group-hover:opacity-100 hover:bg-slate-100 hover:text-sky-700 dark:border-white/20 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-sky-300"
                >
                  EN
                </a>
              </div>
            </div>
          </Slide>

          <Slide id="tech-stack">
            <SectionHeader
              index="02"
              eyebrow={t("laptopScreen.techStack.eyebrow")}
              title={t("laptopScreen.techStack.title")}
              description={t("laptopScreen.techStack.description")}
            />
            <div className="mt-14 flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span key={tech} className="rounded-lg border border-slate-200 px-5 py-3 text-2xl font-medium text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-700 dark:border-white/10 dark:text-slate-200 dark:hover:border-sky-400/50 dark:hover:text-sky-300">
                  {tech}
                </span>
              ))}
            </div>
          </Slide>

          {/* About is split across two slides so each stays readable. */}
          <Slide id="about">
            <SectionHeader
              index="03"
              eyebrow={t("laptopScreen.about.eyebrow")}
              title={t("laptopScreen.about.title")}
              description={t("laptopScreen.about.description")}
            />
            <div className="mt-14 grid gap-10 lg:grid-cols-2">
              <p className="text-3xl leading-snug text-slate-600 dark:text-slate-300">
                {t("laptopScreen.about.summary")}
              </p>
              <div className="border-t-2 border-slate-200 dark:border-white/15">
                {[
                  { label: t("laptopScreen.about.facts.role"), value: t("laptopScreen.about.facts.roleValue") },
                  { label: t("laptopScreen.about.facts.education"), value: t("laptopScreen.about.facts.educationValue") },
                  { label: t("laptopScreen.about.facts.coreStack"), value: t("laptopScreen.about.facts.coreStackValue") },
                  { label: t("laptopScreen.about.facts.databases"), value: t("laptopScreen.about.facts.databasesValue") },
                ].map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-6 border-b-2 border-slate-200 py-5 dark:border-white/15"
                  >
                    <span className="text-xl font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      {fact.label}
                    </span>
                    <span className="text-right text-2xl font-semibold text-slate-900 dark:text-white">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Slide>

          <Slide id="skills">
            <div className="mb-6 flex items-center gap-4 text-2xl font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              <span className="tabular-nums text-sky-600 dark:text-sky-400">04</span>
              <span className="h-px w-12 bg-slate-300 dark:bg-white/20" />
              <span>{t("laptopScreen.skills.eyebrow")}</span>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-200 dark:border-white/15 dark:bg-white/15 md:grid-cols-3">
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    id={skill.elementId}
                    key={skill.id}
                    className="bg-white p-10 text-left dark:bg-[#08090c]"
                  >
                    <Icon className="h-12 w-12 text-sky-600 dark:text-sky-400" />
                    {/* Reserve two lines so single-line titles (UI/UX Design)
                        keep their description aligned with the other cards. */}
                    <h3 className="mt-8 flex min-h-[5.5rem] items-start text-4xl font-semibold leading-tight text-slate-900 dark:text-white">
                      {t(skill.titleKey)}
                    </h3>
                    <p className="mt-4 text-2xl leading-snug text-slate-600 dark:text-slate-300">{t(skill.descriptionKey)}</p>
                  </div>
                );
              })}
            </div>
          </Slide>

          <Slide id="projects">
            <SectionHeader
              index="05"
              eyebrow={t("laptopScreen.projects.eyebrow")}
              title={t("laptopScreen.projects.title")}
              description={t("laptopScreen.projects.description")}
            />
            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-200 dark:border-white/15 dark:bg-white/15 md:grid-cols-2">
              {projects.slice(0, 4).map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col bg-white p-9 transition-colors hover:bg-slate-50 dark:bg-[#08090c] dark:hover:bg-white/[0.03]"
                >
                  <div className="mb-5 flex items-center gap-3 text-xl font-medium text-slate-400 dark:text-slate-500">
                    <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    <span>/</span>
                    <span className="uppercase tracking-[0.1em]">{project.category ?? t("laptopScreen.projects.defaultCategory")}</span>
                  </div>
                  <h3 className="text-3xl font-semibold text-slate-900 transition-colors group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300">
                    {project.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-xl leading-snug text-slate-600 dark:text-slate-300">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-lg font-medium text-slate-400 dark:text-slate-500">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </Slide>

          <Slide id="blog">
            <SectionHeader
              index="06"
              eyebrow={t("laptopScreen.blog.eyebrow")}
              title={t("laptopScreen.blog.title")}
              description={t("laptopScreen.blog.description")}
            />
            <div className="mt-12 border-t-2 border-slate-200 dark:border-white/15">
              {posts.slice(0, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-baseline gap-8 border-b-2 border-slate-200 py-7 dark:border-white/15"
                >
                  <span className="hidden w-44 shrink-0 text-xl font-medium uppercase tracking-[0.1em] text-sky-600 dark:text-sky-400 sm:block">
                    {post.category}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 text-3xl font-semibold text-slate-900 transition-colors group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-1 text-xl text-slate-500 dark:text-slate-400">{post.excerpt}</p>
                  </div>
                  <span className="hidden shrink-0 text-xl text-slate-400 dark:text-slate-500 sm:block">{post.readTime}</span>
                  <ArrowRight className="h-7 w-7 shrink-0 text-slate-300 transition-colors group-hover:text-sky-600 dark:text-slate-600 dark:group-hover:text-sky-400" />
                </Link>
              ))}
            </div>
          </Slide>

          <Slide id="contact">
            <p className="text-2xl font-medium uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">{t("laptopScreen.contact.eyebrow")}</p>
            <h2 className="mt-6 max-w-4xl text-7xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {t("laptopScreen.contact.title")}
            </h2>
            <p className="mt-8 max-w-3xl text-3xl leading-snug text-slate-600 dark:text-slate-300">
              {t("laptopScreen.contact.description")}
            </p>
            <Link href="/contact" className="mt-12 inline-flex w-fit items-center gap-3 self-start rounded-xl bg-slate-900 px-8 py-5 text-2xl font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
              <Mail className="h-7 w-7" />
              {t("laptopScreen.contact.contactMe")}
            </Link>
          </Slide>
        </div>
      </main>
      <footer className="border-t-2 border-slate-200 px-10 py-10 text-center text-xl font-medium text-slate-500 dark:border-white/15 dark:text-slate-400">
        {t("laptopScreen.footer")}
      </footer>
    </div>
  );
}
