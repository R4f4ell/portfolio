import { useEffect, useState } from "react";
import "./modais.scss";

// Regra: <768px = Mobile | >=768px = Desktop
const DESKTOP_Q = "(min-width: 768px)";

function getViewLabel() {
  if (typeof window === "undefined") return "Mobile";
  return window.matchMedia(DESKTOP_Q).matches ? "Desktop" : "Mobile";
}

export default function Modais({ open, onClose, projectTitle, performance }) {
  // performance: { mobile?: string, desktop?: string, alt?: string }
  const [viewLabel, setViewLabel] = useState(getViewLabel());

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    const qDesktop = window.matchMedia(DESKTOP_Q);
    const update = () => setViewLabel(getViewLabel());
    qDesktop.addEventListener ? qDesktop.addEventListener("change", update) : qDesktop.addListener(update);

    return () => {
      window.removeEventListener("keydown", onKey);
      qDesktop.removeEventListener ? qDesktop.removeEventListener("change", update) : qDesktop.removeListener(update);
    };
  }, [open, onClose]);

  if (!open) return null;

  const hasAny = performance?.mobile || performance?.desktop;
  const altText =
    performance?.alt || `Relatório Lighthouse — ${projectTitle} — ${viewLabel}`;

  return (
    <div
      className="perf-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} — Desempenho`}
    >
      <button
        type="button"
        className="perf-modal__backdrop"
        aria-label="Fechar"
        onClick={onClose}
      />
      <div className="perf-modal__content" role="document">
        <header className="perf-modal__header">
          {/* TÍTULO = nome do projeto clicado */}
          <h3 className="perf-modal__title">{projectTitle}</h3>
          <button
            type="button"
            className="perf-modal__close"
            aria-label="Fechar"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <div className="perf-modal__body">
          {hasAny ? (
            <picture>
              {/* Desktop (>=768px) */}
              {performance?.desktop && (
                <source srcSet={performance.desktop} media={DESKTOP_Q} />
              )}
              {/* Fallback: Mobile (<768px) */}
              <img
                src={performance?.mobile || performance?.desktop || ""}
                alt={altText}
                loading="lazy"
                decoding="async"
                className="perf-modal__img"
              />
            </picture>
          ) : (
            <p className="perf-modal__empty">Sem imagem de desempenho cadastrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}