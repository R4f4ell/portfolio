import React, { useMemo } from "react";
import { FaGithub, FaReact, FaJs, FaSass } from "react-icons/fa";
import { SiVite, SiSupabase } from "react-icons/si";
import ChromaGrid from "./ChromaGrid";
import "./projetos.scss";

// Imagens
import golfclub from "../../assets/images/projetos/golfclub.png";
import calculatorImcMobile from "../../assets/images/projetos/calculatorImc/calculatorImc-mobile.webp";
import calculatorImcTablet from "../../assets/images/projetos/calculatorImc/calculatorImc-tablet.webp";
import calculatorImcDesktop from "../../assets/images/projetos/calculatorImc/calculatorImc-desktop.webp";

const TECH_ICON_MAP = {
  react: FaReact,
  vite: SiVite,
  scss: FaSass,
  supabase: SiSupabase,
  javascript: FaJs,
  js: FaJs,
  github: FaGithub,
};

const ITEMS = [
  {
    image: golfclub,
    alt: "Screenshot do projeto Tiya Golf Club",
    title: "Tiya Golf Club",
    tech: ["react", "vite", "scss", "javascript"],
    onlineUrl: "https://tiyagolfclub.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/tiyaGolfClub",
  },
  {
    picture: {
      mobile: calculatorImcMobile,
      tablet: calculatorImcTablet,
      desktop: calculatorImcDesktop,
    },
    alt: "Screenshot do projeto Calculadora IMC",
    title: "Calculadora IMC",
    tech: ["react", "vite", "scss", "supabase"],
    onlineUrl: "https://calculadoradeimc.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/calculatorIMC",
  },
  {
    title: "Cronômetro",
    alt: "Screenshot do projeto Cronômetro",
    tech: ["react", "vite", "scss"],
    onlineUrl: "",
    repoUrl: "",
  },
  {
    title: "Clima de Cidades",
    alt: "Screenshot do projeto Clima de Cidades",
    tech: ["react", "vite", "scss", "javascript"],
    onlineUrl: "",
    repoUrl: "",
  },
  {
    title: "Álbum de Fotos",
    alt: "Screenshot do projeto Álbum de Fotos",
    tech: ["react", "vite", "scss", "supabase"],
    onlineUrl: "",
    repoUrl: "",
  },
  {
    title: "Citações",
    alt: "Screenshot do projeto Citações",
    tech: ["react", "vite", "scss"],
    onlineUrl: "",
    repoUrl: "",
  },
  {
    title: "Tela de Login",
    alt: "Screenshot do projeto Tela de Login",
    tech: ["react", "vite", "scss"],
    onlineUrl: "",
    repoUrl: "",
  },
];

export default function Projetos() {
  const items = useMemo(
    () => ITEMS.map((it) => ({ ...it, tech: Array.isArray(it.tech) ? it.tech.slice(0, 4) : [] })),
    []
  );

  return (
    <section id="projects" className="projetos" aria-labelledby="projetos-titulo">
      <div className="projetos__container">
        <header className="projetos__header">
          <h2 id="projetos-titulo" className="projetos__title">Meus Projetos</h2>
        </header>
        <ChromaGrid items={items} techIconMap={TECH_ICON_MAP} className="projetos__grid" />
      </div>
    </section>
  );
}