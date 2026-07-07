"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import SidebarMenu from "@/components/SidebarMenu";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import BootTerminal from "@/components/BootTerminal";
import LaptopLoadingFallback from "@/components/LaptopLoadingFallback";
import HomeContent from "@/components/HomeContent";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

// Lazy load the laptop frame experience (client-only, heavy transforms).
// While the bundle downloads, the BootTerminal intro usually covers the screen;
// the animated fallback shows on replays / slow connections instead of a blank.
const LaptopFrame = dynamic(() => import("@/components/LaptopFrame"), {
  ssr: false,
  loading: () => <LaptopLoadingFallback />,
});

export default function HomePage() {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const { level, prefersReducedMotion } = useDevicePerformance();
  const showLaptopExperience = level === "HIGH" && !prefersReducedMotion;

  return (
    <>
      <AnimatedBackground />
      <SidebarMenu onSkillSelect={(skillId) => setExpandedSkill(skillId)} />
      {showLaptopExperience ? (
        <LaptopFrame expandedSkill={expandedSkill} setExpandedSkill={setExpandedSkill} />
      ) : (
        <div className="home-fallback-wrapper">
          <HomeContent expandedSkill={expandedSkill} setExpandedSkill={setExpandedSkill} />
        </div>
      )}
      <ScrollToTopButton />
      <BootTerminal />
    </>
  );
}
