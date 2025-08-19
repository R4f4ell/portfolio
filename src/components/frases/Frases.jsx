import React from "react";
import "./frases.scss";

import resolvoProblemas from "../../assets/images/frases/resolvoProblemas.webp";
import aprendoRapido from "../../assets/images/frases/aprendoRapido.webp";
import focoEmPerformance from "../../assets/images/frases/focoEmPerformance.webp";
import trabalhoEmEquipe from "../../assets/images/frases/trabalhoEmEquipe.webp";
import olhoNoDetalhe from "../../assets/images/frases/olhoNoDetalhe.webp";
import autonomia from "../../assets/images/frases/autonomia.webp";
import visaoDeProduto from "../../assets/images/frases/visaoDeProduto.webp";

export default function Frases() {
  return (
    <section id="frases" className="frases" aria-label="Frases que me definem" role="region">
      <div className="frases__container">
        <div className="cards">
          {/* 1 */}
          <input type="radio" id="radio-1" name="radio-card" defaultChecked />
          <article className="card" style={{ ["--angle"]: "4deg" }}>
            <img className="card-img" src={resolvoProblemas} alt="Resolvo problemas" />
            <div className="card-data">
              <span className="card-num">1/7</span>
              <h3>Resolvo problemas</h3>
              <p>Mais que escrever código, eu entrego soluções que funcionam no dia a dia.</p>
              <div className="card-nav">
                <label htmlFor="radio-7" aria-label="Anterior">&#10094;</label>
                <label htmlFor="radio-2" aria-label="Próximo">&#10095;</label>
              </div>
            </div>
          </article>

          {/* 2 */}
          <input type="radio" id="radio-2" name="radio-card" />
          <article className="card" style={{ ["--angle"]: "-8deg" }}>
            <img className="card-img" src={aprendoRapido} alt="Aprendo rápido" />
            <div className="card-data">
              <span className="card-num">2/7</span>
              <h3>Aprendo rápido</h3>
              <p>Cada desafio vira aprendizado prático e aplicável no próximo projeto.</p>
              <div className="card-nav">
                <label htmlFor="radio-1" aria-label="Anterior">&#10094;</label>
                <label htmlFor="radio-3" aria-label="Próximo">&#10095;</label>
              </div>
            </div>
          </article>

          {/* 3 */}
          <input type="radio" id="radio-3" name="radio-card" />
          <article className="card" style={{ ["--angle"]: "-7deg" }}>
            <img className="card-img" src={focoEmPerformance} alt="Foco em performance" />
            <div className="card-data">
              <span className="card-num">3/7</span>
              <h3>Foco em performance</h3>
              <p>Sites rápidos, leves e acessíveis: ninguém gosta de esperar.</p>
              <div className="card-nav">
                <label htmlFor="radio-2" aria-label="Anterior">&#10094;</label>
                <label htmlFor="radio-4" aria-label="Próximo">&#10095;</label>
              </div>
            </div>
          </article>

          {/* 4 */}
          <input type="radio" id="radio-4" name="radio-card" />
          <article className="card" style={{ ["--angle"]: "11deg" }}>
            <img className="card-img" src={trabalhoEmEquipe} alt="Trabalho em equipe" />
            <div className="card-data">
              <span className="card-num">4/7</span>
              <h3>Trabalho em equipe</h3>
              <p>Comunicação clara e código que qualquer colega entende.</p>
              <div className="card-nav">
                <label htmlFor="radio-3" aria-label="Anterior">&#10094;</label>
                <label htmlFor="radio-5" aria-label="Próximo">&#10095;</label>
              </div>
            </div>
          </article>

          {/* 5 */}
          <input type="radio" id="radio-5" name="radio-card" />
          <article className="card" style={{ ["--angle"]: "13deg" }}>
            <img className="card-img" src={olhoNoDetalhe} alt="Olho no detalhe" />
            <div className="card-data">
              <span className="card-num">5/7</span>
              <h3>Olho no detalhe</h3>
              <p>Do alinhamento do botão à estrutura do banco, tudo importa.</p>
              <div className="card-nav">
                <label htmlFor="radio-4" aria-label="Anterior">&#10094;</label>
                <label htmlFor="radio-6" aria-label="Próximo">&#10095;</label>
              </div>
            </div>
          </article>

          {/* 6 */}
          <input type="radio" id="radio-6" name="radio-card" />
          <article className="card" style={{ ["--angle"]: "-17deg" }}>
            <img className="card-img" src={autonomia} alt="Autonomia" />
            <div className="card-data">
              <span className="card-num">6/7</span>
              <h3>Autonomia</h3>
              <p>Sei trabalhar sozinho, mas sempre pronto pra somar no time.</p>
              <div className="card-nav">
                <label htmlFor="radio-5" aria-label="Anterior">&#10094;</label>
                <label htmlFor="radio-7" aria-label="Próximo">&#10095;</label>
              </div>
            </div>
          </article>

          {/* 7 */}
          <input type="radio" id="radio-7" name="radio-card" />
          <article className="card" style={{ ["--angle"]: "20deg" }}>
            <img className="card-img" src={visaoDeProduto} alt="Visão de produto" />
            <div className="card-data">
              <span className="card-num">7/7</span>
              <h3>Visão de produto</h3>
              <p>Penso além do código: o impacto real pra quem vai usar importa.</p>
              <div className="card-nav">
                <label htmlFor="radio-6" aria-label="Anterior">&#10094;</label>
                <label htmlFor="radio-1" aria-label="Próximo">&#10095;</label>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}