import "./Sobre.scss";

const sobreTimeline = [
  {
    periodo: "2022",
    titulo: "Início da formação em tecnologia",
    descricao:
      "Comecei a graduação em Análise e Desenvolvimento de Sistemas, direcionando meus estudos para desenvolvimento web e criação de aplicações full-stack.",
  },
  {
    periodo: "2023",
    titulo: "Primeiros projetos web",
    descricao:
      "Passei a desenvolver projetos com HTML, CSS, SCSS, JavaScript, TypeScript, Bootstrap e React, aplicando responsividade, organização de código e boas práticas de interface.",
  },
  {
    periodo: "2024",
    titulo: "Evolução técnica e projetos completos",
    descricao:
      "Aprofundei meus estudos em React, APIs REST, Git/GitHub, deploy com Vercel e otimização de performance, criando projetos mais estruturados e próximos de cenários reais.",
  },
  {
    periodo: "2025",
    titulo: "Formação concluída e experiência prática",
    descricao:
      "Concluí a graduação em janeiro de 2025 e desenvolvi o Sistema Ativo para uma clínica de fonoaudiologia, digitalizando rotinas manuais com uma solução web.",
  },
  {
    periodo: "Atual",
    titulo: "Desenvolvedor Full-stack Júnior",
    descricao:
      "Busco minha primeira oportunidade na área de tecnologia para aplicar meus conhecimentos em projetos reais, evoluir profissionalmente e contribuir com soluções web bem estruturadas.",
  },
];

export function Sobre() {
  return (
    <section className="sobre" id="sobre">
      <span className="sobreLine sobreLineTop" aria-hidden="true" />
      <div className="sobreContainer">
        <div className="sectionTitle">
          <h2 className="sectionTitleHeading">Sobre</h2>
          <div className="sectionTitleShape" aria-hidden="true">
            <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        <div className="sobreTimeline" aria-label="Linha do tempo profissional">
          {sobreTimeline.map((item, index) => (
            <article
              className={`sobreTimelineItem ${
                index % 2 === 0
                  ? "sobreTimelineItemLeft"
                  : "sobreTimelineItemRight"
              }`}
              key={item.periodo}
            >
              <div className="sobreTimelineContent">
                <span className="sobreTimelinePeriod">{item.periodo}</span>
                <h3>{item.titulo}</h3>
                <p>{item.descricao}</p>
              </div>
              <span className="sobreTimelineDot" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
