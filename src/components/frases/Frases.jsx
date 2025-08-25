import React, { Fragment } from "react";
import "./frases.scss";

import aprendoRapido from "../../assets/images/frases/aprendoRapido.webp";
import autonomia from "../../assets/images/frases/autonomia.webp";
import focoEmPerformance from "../../assets/images/frases/focoEmPerformance.webp";
import olhoNoDetalhe from "../../assets/images/frases/olhoNoDetalhe.webp";
import resolvoProblemas from "../../assets/images/frases/resolvoProblemas.webp";
import trabalhoEmEquipe from "../../assets/images/frases/trabalhoEmEquipe.webp";
import visaoDeProduto from "../../assets/images/frases/visaoDeProduto.webp";

const FRASES = [
  {
    img: resolvoProblemas,
    alt: "Resolvo problemas",
    titulo: "Resolvo problemas",
    texto: "Mais que escrever código, eu entrego soluções que funcionam no dia a dia.",
    angulo: "4deg",
  },
  {
    img: aprendoRapido,
    alt: "Aprendo rápido",
    titulo: "Aprendo rápido",
    texto: "Cada desafio vira aprendizado prático e aplicável no próximo projeto.",
    angulo: "-8deg",
  },
  {
    img: focoEmPerformance,
    alt: "Foco em performance",
    titulo: "Foco em performance",
    texto: "Sites rápidos, leves e acessíveis: ninguém gosta de esperar.",
    angulo: "-7deg",
  },
  {
    img: trabalhoEmEquipe,
    alt: "Trabalho em equipe",
    titulo: "Trabalho em equipe",
    texto: "Comunicação clara e código que qualquer colega entende.",
    angulo: "11deg",
  },
  {
    img: olhoNoDetalhe,
    alt: "Olho no detalhe",
    titulo: "Olho no detalhe",
    texto: "Do alinhamento do botão à estrutura do banco, tudo importa.",
    angulo: "13deg",
  },
  {
    img: autonomia,
    alt: "Autonomia",
    titulo: "Autonomia",
    texto: "Sei trabalhar sozinho, mas sempre pronto pra somar no time.",
    angulo: "-17deg",
  },
  {
    img: visaoDeProduto,
    alt: "Visão de produto",
    titulo: "Visão de produto",
    texto: "Penso além do código: o impacto real pra quem vai usar importa.",
    angulo: "20deg",
  },
];

export default function Frases() {
  return (
    <section id="quotes" className="frases" aria-label="Frases que me definem" role="region">
      <div className="frases__container">
        <div className="cards">
          {FRASES.map((f, idx) => {
            const i = idx + 1;
            const prev = idx === 0 ? FRASES.length : i - 1;
            const next = idx === FRASES.length - 1 ? 1 : i + 1;
            return (
              <Fragment key={i}>
                <input type="radio" id={`radio-${i}`} name="radio-card" defaultChecked={i === 1} />
                <article className="card" style={{ ["--angle"]: f.angulo }}>
                  <img className="card-img" src={f.img} alt={f.alt} />
                  <div className="card-data">
                    <span className="card-num">{i}/{FRASES.length}</span>
                    <h3>{f.titulo}</h3>
                    <p>{f.texto}</p>
                    <div className="card-nav">
                      <label htmlFor={`radio-${prev}`} aria-label="Anterior">&#10094;</label>
                      <label htmlFor={`radio-${next}`} aria-label="Próximo">&#10095;</label>
                    </div>
                  </div>
                </article>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}