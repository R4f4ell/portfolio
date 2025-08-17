import React, { useEffect, useMemo, useRef, useCallback } from "react";
import { FaGithub } from "react-icons/fa";
import useRevealOnScroll from "../../hooks/projetos/useRevealOnScroll";
import "./chromaGrid.scss";

// Paleta por tecnologia (predominância)
const TECH_COLOR = {
  react: "#61DAFB",
  vite: "#646CFF",
  scss: "#C76494",
  supabase: "#3ECF8E",
  javascript: "#F7DF1E",
  js: "#F7DF1E",
};

function deriveThemeFromTech(tech = []) {
  const primary = (tech.find((t) => t && t.toLowerCase() !== "github") || "").toLowerCase();
  const color = TECH_COLOR[primary] || "#3B82F6";
  const gradient = `linear-gradient(145deg, ${color}, #000)`;
  return { borderColor: color, gradient, themeColor: color };
}

export default function ChromaGrid({
  items = [],
  className = "",
  techIconMap = {},
}) {
  const gridRef = useRef(null);
  const isDesktop = useRef(false);

  const { ref: ioRef, isVisible } = useRevealOnScroll({ threshold: 0.25 });

  const data = useMemo(
    () =>
      (items.length ? items : []).map((it) => {
        const derived = deriveThemeFromTech(it.tech);
        return {
          themeColor: derived.themeColor,
          borderColor: it.borderColor || derived.borderColor,
          gradient: it.gradient || derived.gradient,
          ...it,
        };
      }),
    [items]
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1366px)");
    const update = () => (isDesktop.current = mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // --- Lantern helpers (marca ícones "dentro da lanterna" pra receber cor nativa)
  const rafMap = useRef(new WeakMap()); // por card

  const updateIconInLantern = (cardEl, x, y, r) => {
    const items = cardEl.querySelectorAll(".tech-item");
    items.forEach((li) => {
      const rect = li.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();
      const cx = rect.left - cardRect.left + rect.width / 2;
      const cy = rect.top - cardRect.top + rect.height / 2;
      const dx = cx - x;
      const dy = cy - y;
      const dist = Math.hypot(dx, dy);
      // margem de tolerância pra ficar agradável
      const threshold = r * 0.75;
      if (dist <= threshold) li.classList.add("in-lantern");
      else li.classList.remove("in-lantern");
    });
  };

  const bindLanternHandlers = useCallback((cardEl) => {
    if (!cardEl) return;

    // posição inicial (sem lanterna visível)
    const r = parseFloat(getComputedStyle(cardEl).getPropertyValue("--r-base")) || 280;
    const rect = cardEl.getBoundingClientRect();
    const startX = rect.width * 0.5;
    const startY = rect.height * 0.4;
    cardEl.style.setProperty("--cx", `${startX}px`);
    cardEl.style.setProperty("--cy", `${startY}px`);
    cardEl.dataset.hover = "0"; // P&B total

    const onEnter = () => {
      if (!isDesktop.current) return;
      cardEl.dataset.hover = "1"; // ativa lanterna (raio > 0)
    };

    const onLeave = () => {
      if (!isDesktop.current) return;
      cardEl.dataset.hover = "0"; // volta ao P&B total
      // sumiço suave: zera a marcação dos ícones após o fade
      const clearIcons = () => {
        const items = cardEl.querySelectorAll(".tech-item.in-lantern");
        items.forEach((li) => li.classList.remove("in-lantern"));
      };
      // aguarda o fim do fade (<= 600ms definido no SCSS)
      setTimeout(clearIcons, 600);
    };

    const onMove = (e) => {
      if (!isDesktop.current) return;
      const cardRect = cardEl.getBoundingClientRect();
      const x = e.clientX - cardRect.left;
      const y = e.clientY - cardRect.top;

      cardEl.style.setProperty("--cx", `${x}px`);
      cardEl.style.setProperty("--cy", `${y}px`);

      // throttle por rAF por card
      if (rafMap.current.get(cardEl)) return;
      const rafId = requestAnimationFrame(() => {
        updateIconInLantern(cardEl, x, y, r);
        rafMap.current.delete(cardEl);
      });
      rafMap.current.set(cardEl, rafId);
    };

    cardEl.addEventListener("pointerenter", onEnter);
    cardEl.addEventListener("pointerleave", onLeave);
    cardEl.addEventListener("pointermove", onMove);

    return () => {
      cardEl.removeEventListener("pointerenter", onEnter);
      cardEl.removeEventListener("pointerleave", onLeave);
      cardEl.removeEventListener("pointermove", onMove);
      const rafId = rafMap.current.get(cardEl);
      if (rafId) cancelAnimationFrame(rafId);
      rafMap.current.delete(cardEl);
    };
  }, []);

  return (
    <div
      ref={(node) => {
        gridRef.current = node;
        if (typeof ioRef === "function") ioRef(node);
        else if (ioRef && "current" in ioRef) ioRef.current = node;
      }}
      className={`chroma-grid ${className} ${isVisible ? "is-visible" : ""}`}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          ref={bindLanternHandlers}
          style={{
            "--card-border": c.borderColor || "transparent",
            "--card-gradient": c.gradient,
            "--theme-color": c.themeColor || c.borderColor || "#3B82F6",
          }}
          aria-label={`Projeto: ${c.title}`}
        >
          {/* SOMENTE a imagem é link */}
          <a
            href={c.onlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="chroma-img-wrapper"
            aria-label={`Abrir projeto online: ${c.title}`}
          >
            <img src={c.image} alt={c.alt || c.title} loading="lazy" />
          </a>

          <footer className="chroma-info">
            <h3 className="name" title={c.title}>{c.title}</h3>

            {c.repoUrl && (
              <a
                href={c.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-link"
                aria-label={`Código no GitHub: ${c.title}`}
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub aria-hidden="true" />
              </a>
            )}

            <ul className="tech-list" aria-label="Tecnologias usadas">
              {(c.tech || []).map((t, idx) => {
                const key = String(t).toLowerCase().trim();
                const Icon = techIconMap[key];
                const isGithub = key === "github";
                return (
                  <li
                    key={`${key}-${idx}`}
                    className={`tech-item${isGithub ? " tech-github" : ""}`}
                    data-key={key}
                    title={key}
                  >
                    {Icon ? (
                      <Icon aria-label={`Tecnologia: ${key}`} />
                    ) : (
                      <span className="tech-text" aria-label={`Tecnologia: ${key}`}>
                        {key}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </footer>

          {/* Overlays P&B e clareamento — por card */}
          <div className="card-overlay" aria-hidden="true" />
          <div className="card-fade" aria-hidden="true" />
        </article>
      ))}
    </div>
  );
}