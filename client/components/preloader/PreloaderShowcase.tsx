import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Play } from "lucide-react";
import { Game } from "@/data/games";
import { RING_GAMES } from "./constants";
import { cn } from "@/lib/utils";

interface PreloaderShowcaseProps {
  featuredGame: Game;
  progress: number;
  exiting: boolean;
}

function CircularProgress({ progress }: { progress: number }) {
  const r = 58;
  const c = 2 * Math.PI * r;
  const offset = c - (progress / 100) * c;

  return (
    <svg className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] -rotate-90" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
      <motion.circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="url(#showcaseGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={c}
        animate={{ strokeDashoffset: offset }}
        transition={{ type: "spring", stiffness: 70, damping: 18 }}
      />
      <defs>
        <linearGradient id="showcaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PreloaderShowcase({ featuredGame, progress, exiting }: PreloaderShowcaseProps) {
  const ringLit = (i: number) => progress >= ((i + 1) / RING_GAMES.length) * 75;

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[320px] sm:min-h-[380px]">
      {/* Glow behind hero card */}
      <motion.div
        className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-violet-600/25 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ring of mini games */}
      <div className="absolute size-[min(78vw,340px)] sm:size-[380px]">
        {RING_GAMES.map((game, i) => {
          const angle = (360 / RING_GAMES.length) * i - 90;
          const rad = (angle * Math.PI) / 180;
          const radius = 42;
          const x = 50 + radius * Math.cos(rad);
          const y = 50 + radius * Math.sin(rad);
          const lit = ringLit(i);

          return (
            <motion.div
              key={game.name}
              className="absolute w-11 h-11 sm:w-12 sm:h-12 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: lit ? 1 : 0.35, scale: lit ? 1 : 0.85 }}
              transition={{ delay: 0.1 + i * 0.06, type: "spring" }}
            >
              <div
                className={cn(
                  "w-full h-full rounded-xl overflow-hidden border-2 shadow-lg transition-all duration-500",
                  lit
                    ? "border-violet-400/80 shadow-violet-500/40 ring-2 ring-violet-400/25"
                    : "border-white/10 grayscale"
                )}
              >
                <img src={game.thumbnail_url} alt="" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hero featured card */}
      <motion.div
        className="relative z-10"
        animate={{ scale: exiting ? 1.2 : 1, opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-44 h-44 sm:w-52 sm:h-52">
          <CircularProgress progress={progress} />

          <div className="absolute inset-2 rounded-[1.75rem] p-[2px] bg-gradient-to-br from-violet-400 via-fuchsia-400 to-orange-400 shadow-[0_0_60px_rgba(139,92,246,0.45)]">
            <div className="relative w-full h-full rounded-[1.65rem] overflow-hidden bg-[#0c0618]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={featuredGame.name}
                  src={featuredGame.thumbnail_url}
                  alt={featuredGame.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                  transition={{ duration: 0.45 }}
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-white font-bold text-sm leading-tight line-clamp-2 drop-shadow-lg">
                  {featuredGame.name}
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-2xl"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="w-6 h-6 text-violet-600 fill-violet-600 ml-0.5" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Logo badge */}
          <motion.div
            className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c0618] border border-violet-500/40 shadow-lg"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-5 h-5 rounded-md gradient-brand flex items-center justify-center">
              <Gamepad2 className="w-3 h-3 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-black text-white tracking-wide">PLAY365</span>
          </motion.div>

          {/* Progress badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 border border-white/20 shadow-lg">
            <span className="text-xs font-black text-white tabular-nums">{progress}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
