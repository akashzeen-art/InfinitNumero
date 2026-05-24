import { PreloaderBackground } from "./PreloaderBackground";
import { PreloaderMarquee } from "./PreloaderMarquee";
import { PreloaderShowcase } from "./PreloaderShowcase";
import { PreloaderDock } from "./PreloaderDock";
import { PreloaderExit } from "./PreloaderExit";
import { usePreloaderProgress } from "./usePreloaderProgress";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const {
    progress,
    step,
    exiting,
    canSkip,
    imagesLoaded,
    loadedGames,
    featuredGame,
    handleSkip,
  } = usePreloaderProgress(onComplete);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col overflow-hidden"
      style={{
        opacity: exiting ? 0 : 1,
        transition: exiting ? "opacity 0.85s ease 0.08s" : "opacity 0.4s ease",
        // Force GPU layer on iOS so fixed+blur works
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
      }}
      aria-busy={!exiting}
      aria-label="Loading"
    >
      <PreloaderBackground />
      {/* Top vignette for depth */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#05020f]/60 to-transparent pointer-events-none z-10" />
      <PreloaderMarquee />
      <PreloaderExit exiting={exiting} />

      {/* Center showcase */}
      <div className="relative flex-1 flex items-center justify-center w-full pt-16 pb-2" style={{ minHeight: 0 }}>
        <div className="w-full max-w-lg px-4 flex items-center justify-center">
          <PreloaderShowcase featuredGame={featuredGame} progress={progress} exiting={exiting} />
        </div>
      </div>

      <PreloaderDock
        progress={progress}
        step={step}
        loadedGames={loadedGames}
        imagesLoaded={imagesLoaded}
        exiting={exiting}
      />
    </div>
  );
}
