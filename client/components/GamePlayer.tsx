import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Loader2, X } from "lucide-react";
import { useGamePlayer } from "@/contexts/GamePlayerContext";
import { cn } from "@/lib/utils";

export function GamePlayer() {
  const { activeGame, isOpen, closeGame } = useGamePlayer();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeGame) setLoading(true);
  }, [activeGame]);

  return (
    <AnimatePresence>
      {isOpen && activeGame && (
        <motion.div
          key={activeGame.name}
          className="fixed inset-0 z-[200] flex flex-col bg-gray-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Playing ${activeGame.name}`}
        >
          <header className="shrink-0 flex items-center gap-3 px-3 sm:px-5 h-14 sm:h-16 border-b border-white/10 bg-gray-950/95 backdrop-blur-md">
            <button
              type="button"
              onClick={closeGame}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Back to games"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h2 className="text-sm sm:text-base font-bold text-white truncate">
                {activeGame.name}
              </h2>
            </div>

            <button
              type="button"
              onClick={closeGame}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-white bg-white/10 hover:bg-red-500/90 hover:scale-105 transition-all"
              aria-label="Close game"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          <div className="relative flex-1 min-h-0 bg-black">
            {loading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gray-950">
                <Loader2 className="w-10 h-10 text-violet-400 animate-spin" />
                <p className="text-sm text-white/60 font-medium">Loading game…</p>
              </div>
            )}
            <iframe
              key={activeGame.game_url}
              src={activeGame.game_url}
              title={activeGame.name}
              className={cn(
                "w-full h-full border-0",
                loading ? "opacity-0" : "opacity-100"
              )}
              allow="fullscreen; autoplay; gamepad"
              allowFullScreen
              onLoad={() => setLoading(false)}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
