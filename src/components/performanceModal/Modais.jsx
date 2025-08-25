import { useEffect, useRef, useState } from "react";
import useLockBodyScroll from "../../hooks/header/useLockBodyScroll";
import "./modais.scss";

const DESKTOP_Q = "(min-width: 768px)";

function getViewLabel() {
  if (typeof window === "undefined") return "Mobile";
  return window.matchMedia(DESKTOP_Q).matches ? "Desktop" : "Mobile";
}

export default function Modais({ open, onClose, projectTitle, performance }) {
  const [viewLabel, setViewLabel] = useState(getViewLabel());
  const closeBtnRef = useRef(null);
  const contentRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  // Bloqueia scroll do body enquanto aberto
  useLockBodyScroll(open);

  // Acessibilidade: foco inicial, trap de Tab e retorno de foco ao fechar
  useEffect(() => {
    if (!open) return;

    // guarda o elemento que tinha foco
    previouslyFocusedRef.current = document.activeElement;

    // foca o botão fechar assim que abrir
    const t = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    // trap de tab dentro do conteúdo do modal
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const root = contentRef.current;
      if (!root) return;
      const focusable = root.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", handleKeyDown);
      // devolve foco ao gatilho
      const prev = previouslyFocusedRef.current;
      if (prev && typeof prev.focus === "function") prev.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const qDesktop = window.matchMedia(DESKTOP_Q);
    const update = () => setViewLabel(getViewLabel());
    qDesktop.addEventListener ? qDesktop.addEventListener("change", update) : qDesktop.addListener(update);
    return () => {
      qDesktop.removeEventListener ? qDesktop.removeEventListener("change", update) : qDesktop.removeListener(update);
    };
  }, [open]);

  if (!open) return null;

  const hasAny = performance?.mobile || performance?.desktop;
  const altText = performance?.alt || `Relatório Lighthouse — ${projectTitle} — ${viewLabel}`;

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
      <div className="perf-modal__content" role="document" ref={contentRef}>
        <header className="perf-modal__header">
          <h3 className="perf-modal__title">{projectTitle}</h3>
          <button
            type="button"
            className="perf-modal__close"
            aria-label="Fechar"
            onClick={onClose}
            ref={closeBtnRef}
          >
            ×
          </button>
        </header>

        <div className="perf-modal__body">
          {hasAny ? (
            <picture>
              {performance?.desktop && (
                <source srcSet={performance.desktop} media={DESKTOP_Q} />
              )}
              <img
                src={performance?.mobile || performance?.desktop || ""}
                alt={altText}
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