import CircularGallery from "./CircularGallery"
import "./certificados.scss"

import analiseMobile from "../../assets/images/certificados/analiseDados/analiseDados-mobile.webp"
import analiseTablet from "../../assets/images/certificados/analiseDados/analiseDados-tablet.webp"
import analiseDesktop from "../../assets/images/certificados/analiseDados/analiseDados-desktop.webp"

import conclusaoMobile from "../../assets/images/certificados/conclusaoCurso/conclusaoCurso-mobile.webp"
import conclusaoTablet from "../../assets/images/certificados/conclusaoCurso/conclusaoCurso-tablet.webp"
import conclusaoDesktop from "../../assets/images/certificados/conclusaoCurso/conclusaoCurso-desktop.webp"

import cssMobile from "../../assets/images/certificados/css-e-sass/cssSass-mobile.webp"
import cssTablet from "../../assets/images/certificados/css-e-sass/cssSass-tablet.webp"
import cssDesktop from "../../assets/images/certificados/css-e-sass/cssSass-desktop.webp"

import governancaMobile from "../../assets/images/certificados/governancaDados/governancaDados-mobile.webp"
import governancaTablet from "../../assets/images/certificados/governancaDados/governancaDados-tablet.webp"
import governancaDesktop from "../../assets/images/certificados/governancaDados/governancaDados-desktop.webp"

import pythonMobile from "../../assets/images/certificados/pythonCurso/python-mobile.webp"
import pythonTablet from "../../assets/images/certificados/pythonCurso/python-tablet.webp"
import pythonDesktop from "../../assets/images/certificados/pythonCurso/python-desktop.webp"

// Componente <picture>
function CertificadoPicture({ mobile, tablet, desktop, alt }) {
  return (
    <picture>
      <source srcSet={desktop} media="(min-width: 1024px)" />
      <source srcSet={tablet} media="(min-width: 768px)" />
      <img src={mobile} alt={alt} loading="lazy" width="800" height="600" />
    </picture>
  )
}

export default function Certificados() {
  const certificados = [
    {
      image: (
        <CertificadoPicture
          mobile={analiseMobile}
          tablet={analiseTablet}
          desktop={analiseDesktop}
          alt="Certificado de Análise de Dados"
        />
      ),
      text: "Análise de Dados",
    },
    {
      image: (
        <CertificadoPicture
          mobile={conclusaoMobile}
          tablet={conclusaoTablet}
          desktop={conclusaoDesktop}
          alt="Certificado de Conclusão de Curso - ADS"
        />
      ),
      text: "Conclusão ADS",
    },
    {
      image: (
        <CertificadoPicture
          mobile={cssMobile}
          tablet={cssTablet}
          desktop={cssDesktop}
          alt="Certificado de CSS e SASS"
        />
      ),
      text: "CSS & SASS",
    },
    {
      image: (
        <CertificadoPicture
          mobile={governancaMobile}
          tablet={governancaTablet}
          desktop={governancaDesktop}
          alt="Certificado de Governança de Dados"
        />
      ),
      text: "Governança de Dados",
    },
    {
      image: (
        <CertificadoPicture
          mobile={pythonMobile}
          tablet={pythonTablet}
          desktop={pythonDesktop}
          alt="Certificado de Python"
        />
      ),
      text: "Python",
    },
  ]

  return (
    <section id="certificados" className="certificados" aria-label="Certificados e cursos">
      <div className="certificados__container">
        <h2 className="certificados__title">Certificados</h2>

        <div className="certificados__carousel">
          <CircularGallery items={certificados} />
        </div>
      </div>
    </section>
  )
}