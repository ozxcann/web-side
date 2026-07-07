"use client";

import { useEffect, useState } from "react";
import SidebarMenu from "@/components/SidebarMenu";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import HomeContent from "@/components/HomeContent";
import { onBootDismissed } from "@/lib/bootGate";

export default function HomePage() {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [showPageContent, setShowPageContent] = useState(false);

  useEffect(() => {
    return onBootDismissed(() => {
      setShowPageContent(true);
    });
  }, []);

  return (
    <>
      {showPageContent ? (
        <>
          <AnimatedBackground />
          <SidebarMenu onSkillSelect={(skillId) => setExpandedSkill(skillId)} />
          <div className="home-fallback-wrapper">
            <HomeContent expandedSkill={expandedSkill} setExpandedSkill={setExpandedSkill} />
          </div>
          <ScrollToTopButton />
        </>
      ) : null}
    </>
  );
}
