import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import { PRELOADER_STEPS, PRELOAD_URLS, TOTAL_GAMES } from "./constants";
import { cn } from "@/lib/utils";

interface PreloaderDockProps {
  progress: number;
  step: number;
  loadedGames: number;
  imagesLoaded: number;
  canSkip: boolean;
  exiting: boolean;
  onSkip: () => void;
}

export function PreloaderDock({
  progress,
  step,
  loadedGames,
  imagesLoaded,
  canSkip,
  exiting,
  onSkip,
}: PreloaderDockProps) {
  const CurrentIcon = PRELOADER_STEPS[step]?.icon ?? Sparkles;
  const isReady = progress >= 100;

  return (
    <motion.div
      className="relative z-20 w-full max-w-lg mx-auto px-5 pb-8 sm:pb-10 shrink-0"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: exiting ? 0 : 1, y: exiting ? 24 : 0 }}
      transition={{ duration: 0.55, delay: 0.1 }}
    >
      {/* Brand */}
      <div className="text-center mb-5">
        <motion.h1
          className="text-4xl sm:text-5xl font-black font-outfit tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: "spring" }}
        >
          <span className="text-white">Play</span>
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent animate-text-shimmer">
            365
          </span>
        </motion.h1>
        <p className="mt-2 text-sm text-violet-300/55">
          <span className="text-violet-100 font-bold tabular-nums">{loadedGames}</span>
          <span className="text-violet-500/40"> / </span>
          <span className="tabular-nums">{TOTAL_GAMES}</span> games ·{" "}
          <span className="tabular-nums text-violet-300/70">
            {imagesLoaded}/{PRELOAD_URLS.length} assets
          </span>
        </p>
      </div>

      {/* Glass dock */}
      <div className="rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 p-4 sm:p-5 shadow-[0_8px_80px_rgba(139,92,246,0.2)]">
        {/* Step pills */}
        <div className="flex gap-1.5 mb-4 overflow-x-auto scrollbar-hide pb-0.5">
          {PRELOADER_STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <div
                key={s.label}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all duration-300 shrink-0",
                  active && "bg-violet-500/25 text-violet-100 border border-violet-400/40",
                  done && !active && "bg-emerald-500/10 text-emerald-400/80 border border-emerald-500/20",
                  !active && !done && "bg-white/5 text-white/30 border border-transparent"
                )}
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* Active step + bar */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex items-center gap-2 min-w-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <CurrentIcon className="w-4 h-4 text-violet-400 shrink-0" />
              <span className="text-sm font-semibold text-white/90 truncate">
                {PRELOADER_STEPS[step].label}…
              </span>
            </motion.div>
          </AnimatePresence>
          <span
            className={cn(
              "text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0",
              isReady ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/40"
            )}
          >
            {isReady ? "Ready" : "Loading"}
          </span>
        </div>

        <div className="h-2 rounded-full bg-white/5 overflow-hidden border border-white/5">
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <div className="absolute inset-0 gradient-brand" />
            <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer-line" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isReady && !exiting && (
            <motion.p
              className="flex items-center justify-center gap-1 mt-3 text-sm font-bold text-emerald-400"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Enter the arcade <ChevronRight className="w-4 h-4" />
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-2 mt-4">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.35em] font-semibold">
          Free · Instant · No Download
        </p>
        <AnimatePresence>
          {canSkip && !exiting && progress < 100 && (
            <motion.button
              type="button"
              onClick={onSkip}
              className="text-xs font-bold text-violet-300/80 hover:text-white px-4 py-2 rounded-full border border-violet-500/30 hover:bg-violet-500/15 transition-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Skip intro →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
