import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Inicio } from "@/components/sections/inicio/Inicio";
import { Sobre } from "@/components/sections/sobre/Sobre";
import { Habilidades } from "@/components/sections/habilidades/Habilidades";
import { Projetos } from "@/components/sections/projetos/Projetos";
import { Contato } from "@/components/sections/contato/Contato";
import "./page.scss";

export default function Home() {
  return (
    <>
      <div className="pageBackground" />
      <Header />
      <main className="pageContent">
        <Inicio />
        <Sobre />
        <Habilidades />
        <Projetos />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
