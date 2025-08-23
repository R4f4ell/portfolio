import React, { useMemo } from "react";
import { FaGithub, FaReact, FaJs, FaSass, FaHtml5 } from "react-icons/fa";
import { SiVite, SiSupabase } from "react-icons/si";
import { TbApi } from "react-icons/tb";
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
  html: FaHtml5,
  api: TbApi,      // mesmo ícone usado na sessão "Sobre"
  github: FaGithub,
};

const ITEMS = [
  {
    image: golfclub,
    alt: "Screenshot do projeto Tiya Golf Club",
    title: "Tiya Golf Club",
    // React, Vite, JS, HTML, SCSS
    tech: ["react", "vite", "javascript", "html", "scss"],
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
    // React, Vite, JS, HTML, SCSS
    tech: ["react", "vite", "javascript", "html", "scss"],
    onlineUrl: "https://calculadoradeimc.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/calculatorIMC",
  },
  {
    title: "Cronômetro",
    alt: "Screenshot do projeto Cronômetro",
    // React, Vite, JS, HTML, SCSS
    tech: ["react", "vite", "javascript", "html", "scss"],
    onlineUrl: "https://cronometro.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/cronometro",
  },
  {
    title: "Clima de Cidades",
    alt: "Screenshot do projeto Clima de Cidades",
    // React, Vite, JS, HTML, SCSS + API (tempo real)
    tech: ["react", "vite", "javascript", "html", "scss", "api"],
    onlineUrl: "https://climacidades.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/climaCidades",
  },
  {
    title: "Álbum de Fotos",
    alt: "Screenshot do projeto Álbum de Fotos",
    // React, Vite, JS, HTML, SCSS + Supabase + API (Unsplash)
    tech: ["react", "vite", "javascript", "html", "scss", "supabase", "api"],
    onlineUrl: "https://albumdefotos.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/albumFotosComAPI",
  },
  {
    title: "Citações",
    alt: "Screenshot do projeto Citações",
    // React, Vite, JS, HTML, SCSS
    tech: ["react", "vite", "javascript", "html", "scss"],
    onlineUrl: "https://citacoes.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/citacoes",
  },
  {
    title: "Tela de Login",
    alt: "Screenshot do projeto Tela de Login",
    // React, Vite, JS, HTML, SCSS
    tech: ["react", "vite", "javascript", "html", "scss"],
    onlineUrl: "https://teladelogin.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/telaLogin1-comReact",
  },
];

export default function Projetos() {
  const items = useMemo(() => ITEMS, []);

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