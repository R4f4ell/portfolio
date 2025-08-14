import './sobre.scss'

export default function SobreMim() {
  return (
    <section id="about" className="sobre-mim" aria-labelledby="sobre-mim-titulo">
      <div className="sobre-mim__container">
        <header className="sobre-mim__header">
          <h2 id="sobre-mim-titulo" className="sobre-mim__title">Sobre mim</h2>
          <p className="sobre-mim__subtitle">
            Desenvolvedor front-end com base sólida em ADS e foco em entregar interfaces modernas,
            responsivas e de alta performance.
          </p>
        </header>

        <div className="sobre-mim__content">
          <div className="sobre-mim__texto">
            <p>
              Sou desenvolvedor front-end com formação em <strong>Análise e Desenvolvimento de
              Sistemas (ADS)</strong>, especializado na criação de interfaces modernas, responsivas e de
              alta performance. Domino <strong>HTML5, CSS3, SCSS, JavaScript, React, Vite e Bootstrap</strong> para
              desenvolvimento de interfaces, além de <strong>MySQL e Supabase</strong> para gerenciamento de dados.
              No dia a dia, utilizo <strong>Git, GitHub, VS Code, Vercel</strong> e consumo <strong>APIs REST</strong> para
              integrar funcionalidades e automatizar processos.
            </p>

            <p>
              Atualmente, desenvolvo e mantenho um <strong>sistema em produção para uma clínica de
              fonoaudiologia</strong>, com <strong>integração ao Supabase</strong> e <strong>layout totalmente responsivo</strong>.
              Essa solução proporcionou <strong>redução no uso de papéis</strong>, <strong>maior organização</strong> e
              <strong> acesso rápido aos históricos de atendimentos</strong>, além de possuir <strong>estrutura
              reutilizável</strong> para outros profissionais que busquem o mesmo padrão de usabilidade.
            </p>

            <p>
              Tenho facilidade para trabalhar em equipe, mas também possuo autonomia para atuar de
              forma independente. <strong>Busco uma oportunidade na área de desenvolvimento front-end</strong>
              para aplicar minhas habilidades e contribuir em projetos reais, entregando soluções
              modernas e eficientes.
            </p>
          </div>

          <aside className="sobre-mim__stacks" aria-label="Tecnologias e ferramentas">
            <h3 className="sobre-mim__stacks-title">Tecnologias & Ferramentas</h3>
            <ul className="sobre-mim__lista" role="list">
              <li className="chip" aria-label="HTML5">HTML5</li>
              <li className="chip" aria-label="CSS3">CSS3</li>
              <li className="chip" aria-label="SCSS">SCSS</li>
              <li className="chip" aria-label="JavaScript">JavaScript</li>
              <li className="chip" aria-label="React">React</li>
              <li className="chip" aria-label="Vite">Vite</li>
              <li className="chip" aria-label="Bootstrap">Bootstrap</li>
              <li className="chip" aria-label="MySQL">MySQL</li>
              <li className="chip" aria-label="Supabase">Supabase</li>
              <li className="chip" aria-label="Git">Git</li>
              <li className="chip" aria-label="GitHub">GitHub</li>
              <li className="chip" aria-label="Visual Studio Code">VS Code</li>
              <li className="chip" aria-label="Vercel">Vercel</li>
              <li className="chip" aria-label="APIs REST">APIs REST</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}