import "./Sobre.scss";

const sobreTimeline = [
  {
    periodo: "2022",
    titulo: "Início da graduação",
    descricao:
      "Iniciei a graduação em Análise e Desenvolvimento de Sistemas, desenvolvendo uma base em lógica de programação, software e tecnologias web.",
  },
  {
    periodo: "2023",
    titulo: "Primeiros projetos web",
    descricao:
      "Criei interfaces e páginas responsivas com HTML, CSS, JavaScript e Bootstrap, consolidando a base prática em desenvolvimento front-end.",
  },
  {
    periodo: "2024",
    titulo: "Evolução para aplicações completas",
    descricao:
      "Aprofundei meus estudos em React, TypeScript, SCSS, APIs REST e banco de dados, criando projetos mais estruturados e próximos de aplicações reais.",
  },
  {
    periodo: "Jan/2025",
    titulo: "Conclusão da graduação",
    descricao:
      "Concluí a graduação em Análise e Desenvolvimento de Sistemas, consolidando minha formação acadêmica em desenvolvimento de software.",
  },
  {
    periodo: "Set/2025",
    titulo: "Estágio em desenvolvimento full-stack",
    descricao:
      "Iniciei minha experiência como desenvolvedor full-stack, atuando em projetos web com front-end, back-end, banco de dados e versionamento com Git.",
  },
  {
    periodo: "Atual",
    titulo: "Evolução contínua",
    descricao:
      "Atualmente aprofundo meus estudos em Next.js, FastAPI, Python e testes com Postman, ampliando minha base em front-end, back-end e integração de APIs.",
  },
];

export function Sobre() {
  return (
    <section className="sobre" id="sobre">
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
