"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, MessageSquare, Workflow, Linkedin, Github, ShieldCheck, Download } from "lucide-react";
import { useState } from "react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AnimatedBackground from "@/components/AnimatedBackground";
import { openCvModal } from "@/components/CvDownloadModal";
import { useLanguage } from "@/lib/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create mailto link with form data
    const mailtoLink = `mailto:selamiozcan.works@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `${formData.message}\n\n---\n${t("contactPage.form.mailFrom")}: ${formData.name}\nEmail: ${formData.email}`
    )}`;

    // Open user's default email client
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-4">
            <MessageSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span className="text-sm font-medium text-sky-700 dark:text-sky-300">
              {t("contactPage.badge")}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {t("contactPage.title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("contactPage.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            {/* Email Card */}
            <motion.a
              href="mailto:selamiozcan.works@gmail.com"
              whileHover={{ y: -5 }}
              className="block p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 border border-sky-200 dark:border-sky-800 hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t("contactPage.cards.email")}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                    selamiozcan.works@gmail.com
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Location Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 border border-sky-200 dark:border-sky-800 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t("contactPage.cards.location")}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("contactPage.cards.locationValue")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Work Preferences Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 border border-sky-200 dark:border-sky-800 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl shadow-lg">
                  <Workflow className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t("contactPage.cards.work")}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("contactPage.cards.workValue")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Military Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 border border-sky-200 dark:border-sky-800 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t("contactPage.cards.military")}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("contactPage.cards.militaryValue")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">{t("contactPage.cards.social")}</h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/ozxcann"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                >
                  <div className="p-2 bg-gray-900 dark:bg-gray-700 rounded-lg group-hover:scale-110 transition-transform">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">GitHub</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">github.com/ozxcann</p>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/selami-%C3%B6zcan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                >
                  <div className="p-2 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">LinkedIn</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Selami Özcan</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* CV Download */}
            <motion.button
              variants={itemVariants}
              onClick={openCvModal}
              whileHover={{ y: -5 }}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Download className="w-5 h-5" />
              {t("cvModal.button")}
            </motion.button>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {t("contactPage.form.title")}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("contactPage.form.subtitle")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contactPage.form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      placeholder={t("contactPage.form.namePlaceholder")}
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contactPage.form.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      placeholder={t("contactPage.form.emailPlaceholder")}
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contactPage.form.subject")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder={t("contactPage.form.subjectPlaceholder")}
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contactPage.form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
                    placeholder={t("contactPage.form.messagePlaceholder")}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {t("contactPage.form.submit")}
                </motion.button>
              </form>

              <div className="mt-6 p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800">
                <p className="text-center text-sm text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>
                    <strong>{t("contactPage.form.howItWorksTitle")}</strong>
                    {t("contactPage.form.howItWorksText")}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Banner */}
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-2xl bg-gradient-to-r from-sky-500/10 to-blue-500/10 border border-sky-200 dark:border-sky-800"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-sky-500/20 rounded-xl">
              <MessageSquare className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                {t("contactPage.banner.title")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("contactPage.banner.text")}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <ScrollToTopButton />
      </div>
    </>
  );
}
