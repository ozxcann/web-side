import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import CvDownloadModal from "@/components/CvDownloadModal";
import { LanguageProvider } from "@/lib/LanguageContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

// SF Pro'ya en yakın font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "selami özcan | Portfolio",
  description: "Personal portfolio built with Next.js, Tailwind CSS and Framer Motion",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8">{children}</main>
            <CvDownloadModal />
          </LanguageProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
