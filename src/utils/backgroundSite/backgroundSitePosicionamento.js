export const obterAncoraEDirecao = (origem, w, h) => {
  const fora = 0.2;
  switch (origem) {
    case "top-left": return { ancora: [0, -fora * h], dir: [0, 1] };
    case "top-right": return { ancora: [w, -fora * h], dir: [0, 1] };
    case "left": return { ancora: [-fora * w, 0.5 * h], dir: [1, 0] };
    case "right": return { ancora: [(1 + fora) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-left": return { ancora: [0, (1 + fora) * h], dir: [0, -1] };
    case "bottom-center": return { ancora: [0.5 * w, (1 + fora) * h], dir: [0, -1] };
    case "bottom-right": return { ancora: [w, (1 + fora) * h], dir: [0, -1] };
    default: return { ancora: [0.5 * w, -fora * h], dir: [0, 1] }; // top-center
  }
};