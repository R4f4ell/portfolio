import { ArrowUpRight } from "lucide-react";
import "./header.scss";

export function Header() {
  return (
    <header className="header">
      <div className="headerInner">
        <a className="headerBrand" href="#inicio" aria-label="Ir para o inicio">
          <span>Portfolio</span>
        </a>

        <nav className="headerNav" aria-label="Navegacao principal">
          <a className="headerLink headerLinkActive" href="#inicio">
            Inicio
          </a>
          <a className="headerLink" href="#sobre">
            Sobre
          </a>
          <a className="headerLink" href="#habilidades">
            Habilidades
          </a>
          <a className="headerLink" href="#projetos">
            Projetos
          </a>
        </nav>

        <a className="headerContact" href="#contato">
          <span className="headerContactText">Contato</span>
          <span className="headerContactIcon" aria-hidden="true">
            <ArrowUpRight size={18} strokeWidth={2} />
          </span>
        </a>
      </div>
    </header>
  );
}
