import Image from "next/image";
import "./Inicio.scss";

export function HeroSection() {
  return (
    <section className="inicio" id="inicio">
      <div className="inicioContainer">
        <div className="inicioContent">
          <h1>Desenvolvedor full stack júnior</h1>
          <p>
            Crio soluções web para transformar sua ideia em uma presença digital clara, rápida e profissional.
          </p>

          <div className="inicioActions">
            <a className="inicioButton inicioButtonPrimary" href="#projetos">
              Ver projetos
            </a>
            <a className="inicioButton inicioButtonSecondary" href="#contato">
              Entrar em contato
            </a>
          </div>

          <div className="inicioStats" aria-label="Resumo profissional">
            <div className="inicioStat">
              <span className="inicioStatNumber">3+</span>
              <span className="inicioStatLabel">Anos de Estudo</span>
            </div>
            <div className="inicioStat">
              <span className="inicioStatNumber">10+</span>
              <span className="inicioStatLabel">Projetos Práticos</span>
            </div>
            <div className="inicioStat">
              <span className="inicioStatNumber">100%</span>
              <span className="inicioStatLabel">Layout responsivo</span>
            </div>
          </div>
        </div>

        <div className="inicioVisual" aria-hidden="true">
          <span className="inicioShape inicioShapePrimary" />
          <span className="inicioShape inicioShapeSecondary" />
          <Image
            src="/images/inicio-hero.webp"
            alt=""
            width={1024}
            height={683}
            priority
          />
        </div>
      </div>
    </section>
  );
}
