import { motion } from "framer-motion";
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
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.85, delay: exiting ? 0.08 : 0 }}
      aria-busy={!exiting}
      aria-label="Loading Play365"
    >
      <PreloaderBackground />
      {/* Top vignette for depth */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#05020f]/60 to-transparent pointer-events-none z-10" />
      <PreloaderMarquee />
      <PreloaderExit exiting={exiting} />

      {/* Center showcase */}
      <div className="relative flex-1 flex items-center justify-center min-h-0 w-full pt-14 pb-2">
        <div className="w-full max-w-lg px-4 h-full flex items-center justify-center">
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
    </motion.div>
  );
}
