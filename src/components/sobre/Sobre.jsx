import { FaReact, FaJs, FaHtml5, FaSass, FaGithub } from 'react-icons/fa'
import { TbBrandVscode } from 'react-icons/tb'
import { SiVercel, SiSupabase } from 'react-icons/si'
import './sobre.scss'

export default function SobreMim() {
  return (
    <section id="about" className="sobre-mim" aria-labelledby="sobre-mim-titulo">
      <div className="sobre-mim__container">
        <header className="sobre-mim__header">
          <h2 id="sobre-mim-titulo" className="sobre-mim__title">Sobre mim</h2>
        </header>

        <div className="sobre-mim__content">
          <div className="sobre-mim__card">
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
          </div>

          <div className="sobre-mim__card sobre-mim__card--plain sobre-mim__tecnologias" aria-label="Tecnologias e ferramentas">
            <h3 className="sobre-mim__skills-title">Minhas Habilidades</h3>

            <ul className="tec-grid" role="list">
              <li className="tec-item tech--react">
                <span className="tec-icon" aria-hidden="true"><FaReact /></span>
                <span className="tec-label">React</span>
              </li>
              <li className="tec-item tech--js">
                <span className="tec-icon" aria-hidden="true"><FaJs /></span>
                <span className="tec-label">JavaScript</span>
              </li>
              <li className="tec-item tech--html">
                <span className="tec-icon" aria-hidden="true"><FaHtml5 /></span>
                <span className="tec-label">HTML5</span>
              </li>
              <li className="tec-item tech--scss">
                <span className="tec-icon" aria-hidden="true"><FaSass /></span>
                <span className="tec-label">SCSS</span>
              </li>
              <li className="tec-item tech--github">
                <span className="tec-icon" aria-hidden="true"><FaGithub /></span>
                <span className="tec-label">GitHub</span>
              </li>
              <li className="tec-item tech--vscode">
                <span className="tec-icon" aria-hidden="true"><TbBrandVscode /></span>
                <span className="tec-label">VS Code</span>
              </li>
              <li className="tec-item tech--vercel">
                <span className="tec-icon" aria-hidden="true"><SiVercel /></span>
                <span className="tec-label">Vercel</span>
              </li>
              <li className="tec-item tech--supabase">
                <span className="tec-icon" aria-hidden="true"><SiSupabase /></span>
                <span className="tec-label">Supabase</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}