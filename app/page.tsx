"use client";

import { useState } from "react";
import SidebarMenu from "@/components/SidebarMenu";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import BootTerminal from "@/components/BootTerminal";
import HomeContent from "@/components/HomeContent";

export default function HomePage() {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  return (
    <>
      <AnimatedBackground />
      <SidebarMenu onSkillSelect={(skillId) => setExpandedSkill(skillId)} />
      <div className="home-fallback-wrapper">
        <HomeContent expandedSkill={expandedSkill} setExpandedSkill={setExpandedSkill} />
      </div>
      <ScrollToTopButton />
      <BootTerminal />
    </>
  );
}
