import Marquee from "react-fast-marquee";
import { Braces } from "lucide-react";
import {
  SiFastapi,
  SiGit,
  SiGithub,
  SiMysql,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiSass,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import "./Habilidades.scss";

const tecnologias = [
  { nome: "React", Icone: SiReact, cor: "#61DAFB" },
  { nome: "Next.js", Icone: SiNextdotjs, cor: "#0A0F14" },
  { nome: "TypeScript", Icone: SiTypescript, cor: "#3178C6" },
  { nome: "Tailwind CSS", Icone: SiTailwindcss, cor: "#06B6D4" },
  { nome: "Sass", Icone: SiSass, cor: "#CC6699" },
  { nome: "Python", Icone: SiPython, cor: "#3776AB" },
  { nome: "FastAPI", Icone: SiFastapi, cor: "#009688" },
  { nome: "MySQL", Icone: SiMysql, cor: "#4479A1" },
  { nome: "Supabase", Icone: SiSupabase, cor: "#3FCF8E" },
  { nome: "Git", Icone: SiGit, cor: "#F05032" },
  { nome: "GitHub", Icone: SiGithub, cor: "#181717" },
  { nome: "REST API", Icone: Braces, cor: "#7C3AED" },
];

export function Habilidades() {
  return (
    <section className="habilidades" aria-label="Tecnologias">
      <div className="habilidadesContainer">
        <div className="habilidadesIntro">
          <span className="habilidadesDivider" aria-hidden="true" />
          <p>Minha stack atual</p>
          <span className="habilidadesDivider" aria-hidden="true" />
        </div>

        <div className="habilidadesMarquee">
          <Marquee
            autoFill
            gradient={false}
            pauseOnHover
            speed={34}
          >
            {tecnologias.map(({ nome, Icone, cor }) => (
              <div className="habilidadesItem" key={nome}>
                <Icone
                  aria-hidden="true"
                  className="habilidadesIcon"
                  color={cor}
                  size={26}
                />
                <span>{nome}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
