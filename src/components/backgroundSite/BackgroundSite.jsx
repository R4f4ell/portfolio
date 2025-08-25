import { useMemo } from "react";
import "./backgroundSite.scss";
import useBackSite from "../../hooks/backgroundSite/useBackSite";
import { PADROES_BACKGROUND } from "../../utils/backgroundSite/backgroundSitePadroes";

export default function BackgroundSite(props) {
  const opcoes = useMemo(() => ({ ...PADROES_BACKGROUND, ...props }), [props]);
  const containerRef = useBackSite(opcoes);

  return (
    <div
      ref={containerRef}
      className={`background-site ${props.className || ""}`.trim()}
      aria-hidden="true"
    />
  );
}