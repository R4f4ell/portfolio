import React, { useEffect, useMemo, useRef, useCallback } from "react";
import { FaGithub } from "react-icons/fa";
import useRevealOnScroll from "../../hooks/projetos/useRevealOnScroll";
import "./chromaGrid.scss";

const FALLBACK_THEMES = [
  { borderColor: "#3B82F6", gradient: "linear-gradient(145deg,#3B82F6,#000)" },
  { borderColor: "#10B981", gradient: "linear-gradient(160deg,#10B981,#000)" },
  { borderColor: "#F59E0B", gradient: "linear-gradient(165deg,#F59E0B,#000)" },
  { borderColor: "#EF4444", gradient: "linear-gradient(195deg,#EF4444,#000)" },
  { borderColor: "#8B5CF6", gradient: "linear-gradient(225deg,#8B5CF6,#000)" },
  { borderColor: "#06B6D4", gradient: "linear-gradient(135deg,#06B6D4,#000)" },
];

export default function ChromaGrid({
  items = [],
  className = "",
  techIconMap = {},
}) {
  const rootRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const isDesktop = useRef(false);

  const { ref: ioRef, isVisible } = useRevealOnScroll({ threshold: 0.25 });

  // Junta os dois refs (IntersectionObserver + root do grid)
  useEffect(() => {
    if (ioRef && rootRef && rootRef.current) {
      // nada extra aqui; só garantimos que ambos existam
    }
  }, [ioRef]);

  const data = useMemo(
    () =>
      (items.length
        ? items
        : []
      ).map((it, idx) => ({
        ...FALLBACK_THEMES[idx % FALLBACK_THEMES.length],
        ...it,
      })),
    [items]
  );

  // Suavização do cursor (desktop): anima --x/--y com lerp
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const mq = window.matchMedia("(min-width: 1366px)");
    const updateIsDesktop = () => (isDesktop.current = mq.matches);
    updateIsDesktop();
    mq.addEventListener?.("change", updateIsDesktop);

    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    target.current = { ...pos.current };
    el.style.setProperty("--x", `${pos.current.x}px`);
    el.style.setProperty("--y", `${pos.current.y}px`);

    const animate = () => {
      const ease = 0.15; // damping leve
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;
      el.style.setProperty("--x", `${pos.current.x}px`);
      el.style.setProperty("--y", `${pos.current.y}px`);
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      mq.removeEventListener?.("change", updateIsDesktop);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!isDesktop.current) return; // só desktop tem lanterna
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    target.current.x = e.clientX - r.left;
    target.current.y = e.clientY - r.top;
  }, []);

  const openOnline = useCallback((url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const onKeyGo = useCallback((e, url) => {
    if (!url) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <div
      ref={(node) => {
        rootRef.current = node;
        if (typeof ioRef === "function") ioRef(node);
        else if (ioRef && "current" in ioRef) ioRef.current = node;
      }}
      className={`chroma-grid ${className} ${isVisible ? "is-visible" : ""}`}
      style={{ "--r": "300px" }}
      onPointerMove={onPointerMove}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          style={{
            "--card-border": c.borderColor || "transparent",
            "--card-gradient": c.gradient,
          }}
          role="link"
          tabIndex={0}
          aria-label={`Abrir projeto: ${c.title}`}
          onClick={() => openOnline(c.onlineUrl)}
          onKeyDown={(e) => onKeyGo(e, c.onlineUrl)}
        >
          <div className="chroma-img-wrapper" aria-hidden="true">
            <img src={c.image} alt={c.alt || c.title} loading="lazy" />
          </div>

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
                return (
                  <li key={`${key}-${idx}`} className="tech-item">
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
        </article>
      ))}

      {/* Overlays controlam P&B / cor; comportamento difere por breakpoint */}
      <div className="chroma-overlay" />
      <div className="chroma-fade" />
    </div>
  );
}