import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/inicio/Inicio";
import { AboutSection } from "@/components/sections/sobre/Sobre";
import { SkillsSection } from "@/components/sections/habilidades/Habilidades";
import { ProjectsSection } from "@/components/sections/projetos/Projetos";
import { ContactSection } from "@/components/sections/contato/Contato";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
