import BackgroundSite from "./components/backgroundSite/BackgroundSite";
import Header from "./components/header/Header";

export default function App() {
  return (
    <>
      <BackgroundSite
        raysOrigin="top-center"
        raysColor="#ffffff"
        saturation={0}
        intensity={1.35}
        rayLength={1.3}
        fadeDistance={1.4}
        followMouse
        mouseInfluence={0.4}
        noiseAmount={0.1}
        distortion={0.05}
        dprMax={2}
      />
      <Header />
      {/* restante do app */}
    </>
  );
}