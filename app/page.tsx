"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SidebarMenu from "@/components/SidebarMenu";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import BootTerminal from "@/components/BootTerminal";
import LaptopLoadingFallback from "@/components/LaptopLoadingFallback";

const LaptopFrame = dynamic(() => import("@/components/LaptopFrame"), {
  ssr: false,
  loading: () => <LaptopLoadingFallback />,
});

export default function HomePage() {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  return (
    <>
      <AnimatedBackground />
      <SidebarMenu onSkillSelect={(skillId) => setExpandedSkill(skillId)} />
      <LaptopFrame expandedSkill={expandedSkill} setExpandedSkill={setExpandedSkill} />
      <ScrollToTopButton />
      <BootTerminal />
    </>
  );
}
