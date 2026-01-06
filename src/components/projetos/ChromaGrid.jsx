import React, { useEffect, useMemo, useRef, useCallback, useState } from "react";
import { FaGithub } from "react-icons/fa";
import useRevealOnScroll from "../../hooks/projetos/useRevealOnScroll";
import "./chromaGrid.scss";

const TECH_COLOR = {
  react: "#61DAFB",
  vite: "#646CFF",
  scss: "#C76494",
  supabase: "#3ECF8E",
  javascript: "#F7DF1E",
  js: "#F7DF1E",
  html: "#E34F26",
  api: "#22D3EE",
};

function deriveThemeFromTech(tech = []) {
  const primary = (tech.find((t) => t && String(t).toLowerCase() !== "github") || "").toLowerCase();
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
        return { themeColor: derived.themeColor, borderColor: it.borderColor || derived.borderColor, gradient: it.gradient || derived.gradient, ...it };
      }),
    [items]
  );

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => { isDesktop.current = mqDesktop.matches && mqFine.matches; };
    update();
    mqDesktop.addEventListener?.("change", update);
    mqFine.addEventListener?.("change", update);
    return () => {
      mqDesktop.removeEventListener?.("change", update);
      mqFine.removeEventListener?.("change", update);
    };
  }, []);

  const rafMap = useRef(new WeakMap());
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
      const threshold = r * 0.75;
      if (dist <= threshold) li.classList.add("in-lantern");
      else li.classList.remove("in-lantern");
    });

    const title = cardEl.querySelector(".chroma-info .name");
    if (title) {
      const tRect = title.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();
      const tcx = tRect.left - cardRect.left + tRect.width / 2;
      const tcy = tRect.top - cardRect.top + tRect.height / 2;
      const dx = tcx - x;
      const dy = tcy - y;
      const dist = Math.hypot(dx, dy);
      const threshold = r * 0.75;
      if (dist <= threshold) title.classList.add("in-lantern");
      else title.classList.remove("in-lantern");
    }
  };

  const bindLanternHandlers = useCallback((cardEl) => {
    if (!cardEl) return;
    if (!isDesktop.current) return;

    const r = parseFloat(getComputedStyle(cardEl).getPropertyValue("--r-base")) || 280;
    const rect = cardEl.getBoundingClientRect();
    const startX = rect.width * 0.5;
    const startY = rect.height * 0.4;
    cardEl.style.setProperty("--cx", `${startX}px`);
    cardEl.style.setProperty("--cy", `${startY}px`);
    cardEl.dataset.hover = "0";

    const onEnter = () => { if (isDesktop.current) cardEl.dataset.hover = "1"; };
    const onLeave = () => {
      if (!isDesktop.current) return;
      cardEl.dataset.hover = "0";
      setTimeout(() => {
        cardEl.querySelectorAll(".tech-item.in-lantern").forEach((li) => li.classList.remove("in-lantern"));
        const title = cardEl.querySelector(".chroma-info .name.in-lantern");
        if (title) title.classList.remove("in-lantern");
      }, 600);
    };
    const onMove = (e) => {
      if (!isDesktop.current) return;
      const cardRect = cardEl.getBoundingClientRect();
      const x = e.clientX - cardRect.left;
      const y = e.clientY - cardRect.top;
      cardEl.style.setProperty("--cx", `${x}px`);
      cardEl.style.setProperty("--cy", `${y}px`);
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

  const IMG_W = 600;
  const IMG_H = 400;

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
          <div className="tech-top" aria-hidden="false">
            <ul className="tech-top__list" aria-label="Tecnologias usadas">
              {(c.tech || []).map((t, idx) => {
                const key = String(t).toLowerCase().trim();
                const Icon = techIconMap[key];
                const isGithub = key === "github";
                return (
                  <li
                    key={`${key}-${idx}`}
                    className={`tech-item tech-top__item${isGithub ? " tech-github" : ""}`}
                    data-key={key}
                    title={key}
                  >
                    {Icon ? <Icon aria-label={`Tecnologia: ${key}`} /> : <span className="tech-text">{key}</span>}
                  </li>
                );
              })}
            </ul>
          </div>

          <a
            href={c.onlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="chroma-img-wrapper"
            aria-label={`Abrir projeto online: ${c.title}`}
          >
            {c.picture ? (
              <picture>
                <source srcSet={c.picture.desktop} media="(min-width: 1024px)" />
                <source srcSet={c.picture.tablet} media="(min-width: 768px)" />
                <img src={c.picture.mobile} alt={c.alt || c.title} width={IMG_W} height={IMG_H} loading="lazy" />
              </picture>
            ) : (
              <img src={c.image} alt={c.alt || c.title} width={IMG_W} height={IMG_H} loading="lazy" />
            )}
          </a>

          <footer className="chroma-info">
            <div className="info-row">
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
            </div>
          </footer>

          <div className="card-overlay" aria-hidden="true" />
          <div className="card-fade" aria-hidden="true" />
        </article>
      ))}
    </div>
  );
}