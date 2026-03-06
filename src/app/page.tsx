"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "@/components/ui/LoadingScreen";
import AnimatedCursor from "@/components/ui/AnimatedCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import GitHubSection from "@/components/sections/GitHubSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

const AIAssistant = dynamic(() => import("@/components/ai/AIAssistant"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <AnimatedCursor />
      <ScrollProgress />

      <Navigation />

      <main>
        <HeroSection />
        <StorySection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <GitHubSection />
        <ContactSection />
      </main>

      <Footer />
      <AIAssistant />
    </>
  );
}
