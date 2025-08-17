import React, { useMemo } from "react";
import { FaGithub, FaReact, FaJs, FaSass } from "react-icons/fa";
import { SiVite, SiSupabase } from "react-icons/si";
import ChromaGrid from "./ChromaGrid";
import "./projetos.scss";

// Imagens
import imgGolf from "../../assets/images/projetos/golfclub.png";
import imgImc from "../../assets/images/projetos/calculatorimc.png";

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
    image: imgGolf,
    alt: "Screenshot do projeto Tiya Golf Club",
    title: "Tiya Golf Club",
    tech: ["react", "vite", "scss", "javascript"],
    onlineUrl: "https://golfclub.rafaelldev.com",
    repoUrl: "https://github.com/rafaelldev/golfclub",
  },
  {
    image: imgImc,
    alt: "Screenshot do projeto Calculadora IMC",
    title: "Calculadora IMC",
    tech: ["react", "vite", "scss", "supabase"],
    onlineUrl: "https://calculatorimc.rafaelldev.com",
    repoUrl: "https://github.com/rafaelldev/calculatorimc",
  },
];

export default function Projetos() {
  const items = useMemo(
    () =>
      ITEMS.map((it) => ({
        ...it,
        tech: Array.isArray(it.tech) ? it.tech.slice(0, 4) : [],
      })),
    []
  );

  return (
    <section id="projects" className="projetos" aria-labelledby="projetos-titulo">
      <div className="projetos__container">
        <header className="projetos__header">
          <h2 id="projetos-titulo" className="projetos__title">Projetos</h2>
        </header>

        <ChromaGrid
          items={items}
          techIconMap={TECH_ICON_MAP}
          className="projetos__grid"
        />
      </div>
    </section>
  );
}