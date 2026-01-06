import React, { useMemo } from "react";
import { FaGithub, FaReact, FaJs, FaSass, FaHtml5 } from "react-icons/fa";
import { SiVite, SiSupabase } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import ChromaGrid from "./ChromaGrid";
import "./projetos.scss";

import albumFotosMobile from "../../assets/images/projetos/albumFotos/albumFotos-mobile.webp";
import albumFotosTablet from "../../assets/images/projetos/albumFotos/albumFotos-tablet.webp";
import albumFotosDesktop from "../../assets/images/projetos/albumFotos/albumFotos-desktop.webp";

import calculatorImcMobile from "../../assets/images/projetos/calculatorImc/calculatorImc-mobile.webp";
import calculatorImcTablet from "../../assets/images/projetos/calculatorImc/calculatorImc-tablet.webp";
import calculatorImcDesktop from "../../assets/images/projetos/calculatorImc/calculatorImc-desktop.webp";

import citacoesMobile from "../../assets/images/projetos/citacoes/citacoes-mobile.webp";
import citacoesTablet from "../../assets/images/projetos/citacoes/citacoes-tablet.webp";
import citacoesDesktop from "../../assets/images/projetos/citacoes/citacoes-desktop.webp";

import climaCidadesMobile from "../../assets/images/projetos/climaCidades/climaCidades-mobile.webp";
import climaCidadesTablet from "../../assets/images/projetos/climaCidades/climaCidades-tablet.webp";
import climaCidadesDesktop from "../../assets/images/projetos/climaCidades/climaCidades-desktop.webp";

import cronometroMobile from "../../assets/images/projetos/cronometro/cronometro-mobile.webp";
import cronometroTablet from "../../assets/images/projetos/cronometro/cronometro-tablet.webp";
import cronometroDesktop from "../../assets/images/projetos/cronometro/cronometro-desktop.webp";

import golfClubMobile from "../../assets/images/projetos/tiyaGolfClub/golfclub-mobile.webp";
import golfClubTablet from "../../assets/images/projetos/tiyaGolfClub/golfclub-tablet.webp";
import golfClubDesktop from "../../assets/images/projetos/tiyaGolfClub/golfclub-desktop.webp";

import telaLoginMobile from "../../assets/images/projetos/telaLogin/telaLogin-mobile.webp";
import telaLoginTablet from "../../assets/images/projetos/telaLogin/telaLogin-tablet.webp";
import telaLoginDesktop from "../../assets/images/projetos/telaLogin/telaLogin-desktop.webp";

import albumFotosPerfMobile from "../../assets/images/modalProjetos/albumFotos/albumFotosModal-mobile.jpg";
import albumFotosPerfDesktop from "../../assets/images/modalProjetos/albumFotos/albumFotosModal-desktop.jpg";

import calculadoraModalMobile from "../../assets/images/modalProjetos/calculatorImc/calculatorImcModal-mobile.jpg";
import calculadoraModalDesktop from "../../assets/images/modalProjetos/calculatorImc/calculatorImcModal-desktop.jpg";

import climaCidadesModalMobile from "../../assets/images/modalProjetos/climaCidades/climaCidadesModal-mobile.jpg";
import climaCidadesModalDesktop from "../../assets/images/modalProjetos/climaCidades/climaCidadesModal-desktop.jpg";

import cronometroModalMobile from "../../assets/images/modalProjetos/cronometro/cronometroModal-mobile.jpg";
import cronometroModalDesktop from "../../assets/images/modalProjetos/cronometro/cronometroModal-desktop.jpg";

import tiyaGolfClubModalMobile from "../../assets/images/modalProjetos/tiyaGolfClub/tiyaGolfClubModal-mobile.jpg";
import tiyaGolfClubModalDesktop from "../../assets/images/modalProjetos/tiyaGolfClub/tiyaGolfClubModal-desktop.jpg";

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
    picture: { mobile: golfClubMobile, tablet: golfClubTablet, desktop: golfClubDesktop },
    alt: "Screenshot do projeto Tiya Golf Club",
    title: "Tiya Golf Club",
    tech: ["react", "vite", "javascript", "html", "scss"],
    onlineUrl: "https://tiyagolfclub.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/tiyaGolfClub",
    performance: {
      mobile: tiyaGolfClubModalMobile,
      desktop: tiyaGolfClubModalDesktop,
      alt: "Lighthouse — Tiya Golf Club (Mobile/Desktop)",
    },
  },
  {
    /* Calculadora IMC */
    picture: { mobile: calculatorImcMobile, tablet: calculatorImcTablet, desktop: calculatorImcDesktop },
    alt: "Screenshot do projeto Calculadora IMC",
    title: "Calculadora IMC",
    tech: ["react", "vite", "javascript", "html", "scss"],
    onlineUrl: "https://calculadoradeimc.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/calculatorIMC",
    performance: {
      mobile: calculadoraModalMobile,
      desktop: calculadoraModalDesktop,
      alt: "Lighthouse — Calculadora IMC (Mobile/Desktop)",
    },
  },
  {
    /* Cronômetro */
    picture: { mobile: cronometroMobile, tablet: cronometroTablet, desktop: cronometroDesktop },
    alt: "Screenshot do projeto Cronômetro",
    title: "Cronômetro",
    tech: ["react", "vite", "javascript", "html", "scss"],
    onlineUrl: "https://cronometro.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/cronometro",
    performance: {
      mobile: cronometroModalMobile,
      desktop: cronometroModalDesktop,
      alt: "Lighthouse — Cronômetro (Mobile/Desktop)",
    },
  },
  {
    /* Clima de Cidades */
    picture: { mobile: climaCidadesMobile, tablet: climaCidadesTablet, desktop: climaCidadesDesktop },
    alt: "Screenshot do projeto Clima de Cidades",
    title: "Clima de Cidades",
    tech: ["react", "vite", "javascript", "html", "scss", "api"],
    onlineUrl: "https://climacidades.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/climaCidades",
    performance: {
      mobile: climaCidadesModalMobile,
      desktop: climaCidadesModalDesktop,
      alt: "Lighthouse — Clima de Cidades (Mobile/Desktop)",
    },
  },
  {
    /* Álbum de Fotos */
    picture: { mobile: albumFotosMobile, tablet: albumFotosTablet, desktop: albumFotosDesktop },
    alt: "Screenshot do projeto Álbum de Fotos",
    title: "Álbum de Fotos",
    tech: ["react", "vite", "javascript", "html", "scss", "supabase", "api"],
    onlineUrl: "https://albumdefotos.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/albumFotosComAPI",
    performance: {
      mobile: albumFotosPerfMobile,
      desktop: albumFotosPerfDesktop,
      alt: "Lighthouse — Álbum de Fotos (Mobile/Desktop)",
    },
  },
  {
    /* Citações */
    picture: { mobile: citacoesMobile, tablet: citacoesTablet, desktop: citacoesDesktop },
    alt: "Screenshot do projeto Citações",
    title: "Citações",
    tech: ["react", "vite", "javascript", "html", "scss"],
    onlineUrl: "https://citacoes.rafaelldev.com",
    repoUrl: "https://github.com/R4f4ell/citacoes",
  },
  {
    /* Tela de Login */
    picture: { mobile: telaLoginMobile, tablet: telaLoginTablet, desktop: telaLoginDesktop },
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