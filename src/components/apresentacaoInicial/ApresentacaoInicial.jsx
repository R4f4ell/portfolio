import React, { useCallback } from 'react'
import { Github, Linkedin } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import './apresentacaoInicial.scss'
import imgPerfil from '../../assets/images/apresentacaoInicial/imgPerfil.jpg'

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
      id="home"
      className="apresentacao-inicial"
      aria-label="Apresentação inicial do portfólio"
    >
      <div className="apresentacao-inicial__container">
        <div className="apresentacao-inicial__content" role="presentation">
          <h1 className="apresentacao-inicial__title">
            Rafael <span>Martins</span>
          </h1>

          <p className="apresentacao-inicial__desc">
            Experiente no desenvolvimento web, entregando projetos responsivos e aplicáveis,
            design funcional, usabilidade intuitiva e resultados reais.
          </p>

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

          <div className="apresentacao-inicial__social" aria-label="Redes sociais">
            <a
              href="https://github.com/R4f4ell"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="social-btn social-btn--github"
            >
              <Github size={22} aria-hidden="true" focusable="false" />
            </a>

            <a
              href="https://www.linkedin.com/in/r4f4ellmartinss"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="social-btn social-btn--linkedin"
            >
              <Linkedin size={22} aria-hidden="true" focusable="false" />
            </a>

            <a
              href="https://wa.me/75981867371"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
              className="social-btn social-btn--whatsapp"
            >
              <FaWhatsapp size={22} aria-hidden="true" focusable="false" />
            </a>
          </div>
        </div>

        <div className="apresentacao-inicial__visual">
          <img
            src={imgPerfil}
            alt="Foto de Rafael"
            className="apresentacao-inicial__foto"
            loading="lazy"
          />
        </div>

        {/* 🔽 Seta agora independente no grid */}
        <motion.div
          className="apresentacao-inicial__arrow"
          aria-hidden="true"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            fill="none"
            viewBox="0 0 24 24"
            stroke="url(#arrow-gradient)"
            strokeWidth={2}
          >
            <defs>
              <linearGradient id="arrow-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

export default ApresentacaoInicial