import { useEffect, useMemo, useRef } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";
import { VERT, FRAG } from "../../utils/backgroundSite/backgroundSiteShaders";
import { hexParaRgb } from "../../utils/backgroundSite/backgroundSiteCores";
import { obterAncoraEDirecao } from "../../utils/backgroundSite/backgroundSitePosicionamento";
import { PADROES_BACKGROUND } from "../../utils/backgroundSite/backgroundSitePadroes";

export default function useBackSite(opcoes = {}) {
  const opts = { ...PADROES_BACKGROUND, ...opcoes };

  const containerRef = useRef(null);
  const uniformsRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseSuaveRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(null);

  const uniformsIniciais = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      rayPos: { value: [0, 0] },
      rayDir: { value: [0, 1] },
      raysColor: { value: hexParaRgb(opts.raysColor) },
      raysSpeed: { value: opts.raysSpeed },
      lightSpread: { value: opts.lightSpread },
      rayLength: { value: opts.rayLength },
      pulsating: { value: opts.pulsating ? 1.0 : 0.0 },
      fadeDistance: { value: opts.fadeDistance },
      saturation: { value: opts.saturation },
      mousePos: { value: [0.5, 0.5] },
      mouseInfluence: { value: opts.mouseInfluence },
      noiseAmount: { value: opts.noiseAmount },
      distortion: { value: opts.distortion },
      intensity: { value: opts.intensity },
    }),
    []
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, opts.dprMax),
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    rendererRef.current = renderer;

    const gl = renderer.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    el.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex: VERT, fragment: FRAG, uniforms: uniformsIniciais });
    const mesh = new Mesh(gl, { geometry, program });
    meshRef.current = mesh;
    uniformsRef.current = uniformsIniciais;

    const atualizarTamanho = () => {
      if (!rendererRef.current || !containerRef.current) return;
      rendererRef.current.dpr = Math.min(window.devicePixelRatio || 1, opts.dprMax);

      const wCSS = containerRef.current.clientWidth;
      const hCSS = containerRef.current.clientHeight;
      rendererRef.current.setSize(wCSS, hCSS);

      const dpr = rendererRef.current.dpr;
      const w = wCSS * dpr;
      const h = hCSS * dpr;

      uniformsRef.current.iResolution.value = [w, h];

      const { ancora, dir } = obterAncoraEDirecao(opts.raysOrigin, w, h);
      uniformsRef.current.rayPos.value = ancora;
      uniformsRef.current.rayDir.value = dir;
    };

    const loop = (t) => {
      const r = rendererRef.current;
      const u = uniformsRef.current;
      const m = meshRef.current;
      if (!r || !u || !m) return;

      u.iTime.value = t * 0.001;

      if (opts.followMouse && u.mouseInfluence.value > 0.0) {
        const s = 0.92;
        mouseSuaveRef.current.x = mouseSuaveRef.current.x * s + mouseRef.current.x * (1 - s);
        mouseSuaveRef.current.y = mouseSuaveRef.current.y * s + mouseRef.current.y * (1 - s);
        u.mousePos.value = [mouseSuaveRef.current.x, mouseSuaveRef.current.y];
      }

      try {
        r.render({ scene: m });
      } catch (err) {
        console.warn("WebGL rendering error:", err);
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const onMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    window.addEventListener("resize", atualizarTamanho);
    if (opts.followMouse) window.addEventListener("mousemove", onMouseMove);

    atualizarTamanho();
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", atualizarTamanho);
      if (opts.followMouse) window.removeEventListener("mousemove", onMouseMove);

      try {
        const lose = gl.getExtension("WEBGL_lose_context");
        if (lose) lose.loseContext();
      } catch {}
      if (gl.canvas && gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
      rendererRef.current = null;
      uniformsRef.current = null;
      meshRef.current = null;
    };
  }, []);

  useEffect(() => {
    const u = uniformsRef.current;
    const r = rendererRef.current;
    const el = containerRef.current;
    if (!u || !r || !el) return;

    u.raysColor.value = hexParaRgb(opcoes.raysColor ?? PADROES_BACKGROUND.raysColor);
    u.raysSpeed.value = opcoes.raysSpeed ?? PADROES_BACKGROUND.raysSpeed;
    u.lightSpread.value = opcoes.lightSpread ?? PADROES_BACKGROUND.lightSpread;
    u.rayLength.value = opcoes.rayLength ?? PADROES_BACKGROUND.rayLength;
    u.pulsating.value = (opcoes.pulsating ?? PADROES_BACKGROUND.pulsating) ? 1.0 : 0.0;
    u.fadeDistance.value = opcoes.fadeDistance ?? PADROES_BACKGROUND.fadeDistance;
    u.saturation.value = opcoes.saturation ?? PADROES_BACKGROUND.saturation;
    u.mouseInfluence.value = opcoes.mouseInfluence ?? PADROES_BACKGROUND.mouseInfluence;
    u.noiseAmount.value = opcoes.noiseAmount ?? PADROES_BACKGROUND.noiseAmount;
    u.distortion.value = opcoes.distortion ?? PADROES_BACKGROUND.distortion;
    u.intensity.value = opcoes.intensity ?? PADROES_BACKGROUND.intensity;

    const wCSS = el.clientWidth;
    const hCSS = el.clientHeight;
    const dpr = r.dpr;
    const { ancora, dir } = obterAncoraEDirecao(
      opcoes.raysOrigin ?? PADROES_BACKGROUND.raysOrigin,
      wCSS * dpr,
      hCSS * dpr
    );
    u.rayPos.value = ancora;
    u.rayDir.value = dir;
  }, [opcoes]);

  return containerRef;
}