// src/components/projetos/Projetos.jsx
import React, { useMemo } from "react";
import { FaGithub, FaReact, FaJs, FaSass, FaHtml5 } from "react-icons/fa";
import { SiVite, SiSupabase } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import ChromaGrid from "./ChromaGrid";
import "./projetos.scss";

/* Imagens dos cards (picture por projeto) */
import albumFotosMobile from "../../assets/images/projetos/albumFotos/albumFotos-mobile.webp";
import albumFotosTablet from "../../assets/images/projetos/albumFotos/albumFotos-tablet.webp";
import albumFotosDesktop from "../../assets/images/projetos/albumFotos/albumFotos-desktop.webp";

import calculatorImcMobile from "../../assets/images/projetos/calculatorImc/calculatorImc-mobile.webp";
import calculatorImcTablet from "../../assets/images/projetos/calculatorImc/calculatorImc-tablet.webp";
import calculatorImcDesktop from "../../assets/images/projetos/calculatorImc/calculatorImc-desktop.webp";

import climaCidadesMobile from "../../assets/images/projetos/climaCidades/climaCidades-mobile.webp";
import climaCidadesTablet from "../../assets/images/projetos/climaCidades/climaCidades-tablet.webp";
import climaCidadesDesktop from "../../assets/images/projetos/climaCidades/climaCidades-desktop.webp";

import golfClubMobile from "../../assets/images/projetos/tiyaGolfClub/golfclub-mobile.webp";
import golfClubTablet from "../../assets/images/projetos/tiyaGolfClub/golfclub-tablet.webp";
import golfClubDesktop from "../../assets/images/projetos/tiyaGolfClub/golfclub-desktop.webp";

import telaLoginMobile from "../../assets/images/projetos/telaLogin/telaLogin-mobile.webp";
import telaLoginTablet from "../../assets/images/projetos/telaLogin/telaLogin-tablet.webp";
import telaLoginDesktop from "../../assets/images/projetos/telaLogin/telaLogin-desktop.webp";

const TECH_ICON_MAP = {
  react: FaReact,
  vite: SiVite,
  scss: FaSass,
  supabase: SiSupabase,
  javascript: FaJs,
  js: FaJs,
  html: FaHtml5,
  api: TbApi,
  github: FaGithub,
};

const ITEMS = [
  {
    /* Tiya Golf Club */
    picture: {
      mobile: golfClubMobile,
      tablet: golfClubTablet,
      desktop: golfClubDesktop,
    },
    alt: "Screenshot do projeto Tiya Golf Club",
    title: "Tiya Golf Club",
    tech: ["react", "vite", "javascript", "html", "scss"],
    onlineUrl: "https://tiyagolfclub.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/tiyaGolfClub",
  },
  {
    /* Calculadora IMC */
    picture: {
      mobile: calculatorImcMobile,
      tablet: calculatorImcTablet,
      desktop: calculatorImcDesktop,
    },
    alt: "Screenshot do projeto Calculadora IMC",
    title: "Calculadora IMC",
    tech: ["react", "vite", "javascript", "html", "scss"],
    onlineUrl: "https://calculadoradeimc.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/calculatorIMC",
  },
  {
    /* Cronômetro (sem imagens novas por enquanto) */
    title: "Cronômetro",
    alt: "Screenshot do projeto Cronômetro",
    tech: ["react", "vite", "javascript", "html", "scss"],
    onlineUrl: "https://cronometro.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/cronometro",
  },
  {
    /* Clima de Cidades -> com <picture> */
    picture: {
      mobile: climaCidadesMobile,
      tablet: climaCidadesTablet,
      desktop: climaCidadesDesktop,
    },
    alt: "Screenshot do projeto Clima de Cidades",
    title: "Clima de Cidades",
    tech: ["react", "vite", "javascript", "html", "scss", "api"],
    onlineUrl: "https://climacidades.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/climaCidades",
  },
  {
    /* Álbum de Fotos -> com <picture> */
    picture: {
      mobile: albumFotosMobile,
      tablet: albumFotosTablet,
      desktop: albumFotosDesktop,
    },
    alt: "Screenshot do projeto Álbum de Fotos",
    title: "Álbum de Fotos",
    tech: ["react", "vite", "javascript", "html", "scss", "supabase", "api"],
    onlineUrl: "https://albumdefotos.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/albumFotosComAPI",
  },
  {
    /* Citações (sem imagens novas) */
    title: "Citações",
    alt: "Screenshot do projeto Citações",
    tech: ["react", "vite", "javascript", "html", "scss"],
    onlineUrl: "https://citacoes.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/citacoes",
  },
  {
    /* Tela de Login -> com <picture> */
    picture: {
      mobile: telaLoginMobile,
      tablet: telaLoginTablet,
      desktop: telaLoginDesktop,
    },
    alt: "Screenshot do projeto Tela de Login",
    title: "Tela de Login",
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