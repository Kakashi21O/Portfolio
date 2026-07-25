import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { TechStackSection } from "@/components/tech-stack/TechStackSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { GitHubSection } from "@/components/github/GitHubSection";
import { TimelineSection } from "@/components/timeline/TimelineSection";
import { ResumeSection } from "@/components/resume/ResumeSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { FooterSection } from "@/components/footer/FooterSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <TechStackSection />
      <ProjectsSection />
      <GitHubSection />
      <TimelineSection />
      <ResumeSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
