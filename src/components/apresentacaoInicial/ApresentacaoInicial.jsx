import React, { useCallback } from 'react'
import { Github, Linkedin } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import './ApresentacaoInicial.scss'

const ApresentacaoInicial = () => {
  const scrollToPortfolio = useCallback(() => {
    const el =
      document.querySelector('#portfolio') ||
      document.querySelector('[data-section="portfolio"]')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <section
      id="apresentacao-inicial"
      className="apresentacao-inicial"
      aria-label="Apresentação inicial do portfólio"
    >
      <div className="apresentacao-inicial__container">
        <header className="apresentacao-inicial__content" role="presentation">
          <h1 className="apresentacao-inicial__title">
            Rafael <span>Martins</span>
          </h1>

          <p className="apresentacao-inicial__desc">
            Experiente no desenvolvimento web, entregando projetos responsivos e aplicáveis, design funcional, usabilidade intuitiva e resultados reais.
          </p>

          {/* Botões na posição original */}
          <div className="apresentacao-inicial__actions">
            <button
              type="button"
              className="apresentacao-inicial__btn"
              onClick={scrollToPortfolio}
              aria-label="Ir para a seção de projetos"
            >
              Ver projetos
            </button>

            <a
              href="#contact"
              className="apresentacao-inicial__link"
              aria-label="Ir para a seção de contato"
            >
              Falar comigo
            </a>
          </div>

          {/* Ícones abaixo dos botões */}
          <div className="apresentacao-inicial__social">
            <a
              href="https://github.com/R4f4ell"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/r4f4ellmartinss"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://wa.me/75981867371"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <FaWhatsapp size={22} />
            </a>
          </div>
        </header>

        <div
          className="apresentacao-inicial__visual"
          aria-hidden="true"
          role="img"
        />
      </div>
    </section>
  )
}

export default ApresentacaoInicial