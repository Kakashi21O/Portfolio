import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { GitHubSection } from "@/components/github/GitHubSection";
import { ResumeSection } from "@/components/resume/ResumeSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { FooterSection } from "@/components/footer/FooterSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <GitHubSection />
      <section id="journey">
        <AboutSection />
      </section>
      <section id="contact">
        <ResumeSection />
        <ContactSection />
      </section>
      <FooterSection />
    </div>
  );
}
