import "./backgroundSite.scss";
import useBackSite from "../../hooks/backgroundSite/useBackSite";
import { PADROES_BACKGROUND } from "../../utils/backgroundSite/backgroundSitePadroes";

export default function backgroundSite(props) {
  const opcoes = { ...PADROES_BACKGROUND, ...props };
  const containerRef = useBackSite(opcoes);

  return (
    <div
      ref={containerRef}
      className={`background-site ${props.className || ""}`.trim()}
      aria-hidden="true"
    />
  );
}