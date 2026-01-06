import React, { useCallback } from "react";
import { ArrowUp } from "lucide-react";
import "./footes.scss";

export default function Footer() {
  const toTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer className="site-footer" role="contentinfo" aria-label="Rodapé do site">
      <div className="footer__container">
        <span className="footer__copy" aria-label="Direitos autorais">
          © 2025 Rafael Martins
        </span>

        <button
          type="button"
          className="footer__to-top"
          aria-label="Voltar ao topo"
          onClick={toTop}
          title="Voltar ao topo"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}