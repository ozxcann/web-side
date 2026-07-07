"use client";
import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/lib/LanguageContext";
import { showProjectsSection } from "@/lib/featureFlags";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Selami Özcan
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/ozxcann"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-sky-100 dark:hover:bg-sky-900/30 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/selami-%C3%B6zcan/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-sky-100 dark:hover:bg-sky-900/30 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:selamiozcan.works@gmail.com"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-sky-100 dark:hover:bg-sky-900/30 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#hero"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {t("footer.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {t("footer.about")}
                </Link>
              </li>
              {showProjectsSection && (
                <li>
                  <Link
                    href="/#projects"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {t("footer.projects")}
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/#blog"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {t("footer.blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{t("footer.pages")}</h4>
            <ul className="space-y-2">
              {showProjectsSection && (
                <li>
                  <Link
                    href="/projects"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {t("footer.allProjects")}
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {t("footer.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {t("footer.aboutMe")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 dark:text-gray-400">
                <a
                  href="mailto:selamiozcan.works@gmail.com"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  selamiozcan.works@gmail.com
                </a>
              </li>  
              <li className="text-sm text-gray-600 dark:text-gray-400">
                {t("footer.location")}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left text-sm text-gray-600 dark:text-gray-400">
            <p className="flex items-center justify-center gap-1.5 sm:justify-start">
              © {currentYear} Selami Özcan
            </p>
            <p className="mt-1 text-xs">
              {t("footer.threeDModel")}{" "}
              <a
                href="https://sketchfab.com/3d-models/macbook-ultra-concept"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                MacBook Ultra Concept by Ranguel
              </a>{" "}
              (CC BY)
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-sky-100 dark:hover:bg-sky-900/30 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-200"
          >
            <span className="text-sm font-medium">{t("footer.backToTop")}</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
