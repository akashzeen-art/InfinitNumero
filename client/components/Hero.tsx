import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gamesData } from "@/data/games";
import { useGamePlayer } from "@/contexts/GamePlayerContext";
import { useReducedMotion } from "@/hooks/use-mobile";
import {
  Play,
  Sparkles,
  Zap,
  Users,
  ChevronRight,
  Flame,
  Puzzle,
  Swords,
  Gamepad2,
  Star,
} from "lucide-react";

const featured = gamesData.filter((g) => g.categories.includes("Top 10 Games")).slice(0, 8);
const bentoSide = gamesData.slice(4, 10);

const CATEGORIES = [
  { label: "Arcade", icon: Zap, path: "/category/Arcade", color: "from-rose-500 to-pink-600", glow: "shadow-rose-500/30" },
  { label: "Puzzle", icon: Puzzle, path: "/category/Puzzle", color: "from-cyan-500 to-blue-600", glow: "shadow-cyan-500/30" },
  { label: "Action", icon: Swords, path: "/category/Action", color: "from-orange-500 to-red-600", glow: "shadow-orange-500/30" },
  { label: "Top 10", icon: Flame, path: "/category/Top%2010%20Games", color: "from-amber-400 to-orange-500", glow: "shadow-amber-500/30" },
];

function useCounter(target: number, start: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = Date.now();
    let f: number;
    const tick = () => {
      const p = Math.min((Date.now() - t0) / 2000, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) f = requestAnimationFrame(tick);
    };
    f = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(f);
  }, [target, start]);
  return n;
}

export function Hero() {
  const { playGame } = useGamePlayer();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [go, setGo] = useState(false);
  const games = featured.length >= 4 ? featured : gamesData.slice(0, 8);
  const hero = games[active];
  // On mobile just show the final count immediately — no RAF loop
  const count = useCounter(gamesData.length, go && !reduced);

  useEffect(() => {
    setGo(true);
    const id = setInterval(() => setActive((p) => (p + 1) % games.length), 4500);
    return () => clearInterval(id);
  }, [games.length]);

  return (
    <section className="hero-section relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-[#f5f0ff]" />
      <div className="absolute inset-0 hero-mesh" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTM5LDkyLDI0NiwwLjA4KSIvPjwvc3ZnPg==')] opacity-60" />

      {/* Animated blobs — desktop only */}
      {!reduced && (
        <>
          <motion.div
            className="absolute -top-40 right-[-10%] w-[min(800px,90vw)] h-[min(800px,90vw)] rounded-full opacity-60"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.08, 1], x: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-20%] left-[-15%] w-[min(600px,80vw)] h-[min(600px,80vw)] rounded-full opacity-50"
            style={{ background: "radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, rgba(251,146,60,0.2) 0%, transparent 70%)" }}
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </>
      )}
      {/* Static blobs on mobile */}
      {reduced && (
        <>
          <div className="absolute -top-40 right-[-10%] w-[min(600px,90vw)] h-[min(600px,90vw)] rounded-full opacity-40" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)" }} />
          <div className="absolute bottom-[-20%] left-[-15%] w-[min(400px,80vw)] h-[min(400px,80vw)] rounded-full opacity-35" style={{ background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)" }} />
        </>
      )}

      {/* Decorative rings — desktop only */}
      {!reduced && (
        <>
          <div className="absolute top-20 right-[15%] w-72 h-72 rounded-full border border-violet-300/20 hidden lg:block" />
          <div className="absolute top-28 right-[18%] w-52 h-52 rounded-full border border-fuchsia-300/15 hidden lg:block animate-spin-slow" />
        </>
      )}

      <div className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 w-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* ── Left: copy in glass card ── */}
          <motion.div
            className="lg:col-span-5 order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative rounded-[2rem] p-[1px] bg-gradient-to-br from-violet-300/80 via-fuchsia-200/50 to-orange-200/40 shadow-2xl shadow-violet-500/10">
              <div className="rounded-[2rem] bg-white/75 backdrop-blur-2xl px-6 sm:px-8 py-8 sm:py-10">
                {/* Live badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200/60 mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-bold bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-transparent">
                    {gamesData.length}+ games · Live now
                  </span>
                </div>

                <h1 className="font-outfit text-[2.75rem] sm:text-5xl xl:text-[3.5rem] font-black leading-[0.95] tracking-tight mb-5">
                  <span className="text-gray-900">Play.</span>
                  <br />
                  <span className="text-gray-900">Win.</span>
                  <br />
                  <span className="relative inline-block mt-1">
                    <span className="text-gradient animate-gradient-shift">Repeat.</span>
                    <svg className="absolute -bottom-1 left-0 w-full h-3 text-fuchsia-400/40" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <path d="M0 8 Q50 0 100 8 T200 8" stroke="currentColor" strokeWidth="4" fill="none" />
                    </svg>
                  </span>
                </h1>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-md">
                  The ultimate free gaming hub. Arcade, puzzles & action — instant play, no download.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mb-7">
                  <Link to="/#games" className="btn-primary h-13 px-8 text-base justify-center group relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Play className="w-5 h-5 fill-white relative z-10" />
                    <span className="relative z-10">Play Free Now</span>
                  </Link>
                  <Link
                    to="/categories"
                    className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-2xl border-2 border-violet-200 bg-white font-bold text-violet-700 hover:bg-violet-50 hover:border-violet-300 hover:shadow-lg transition-all"
                  >
                    Categories
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Category chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {CATEGORIES.map(({ label, icon: Icon, path, color, glow }) => (
                    <Link
                      key={path}
                      to={path}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-700 shadow-sm hover:shadow-lg ${glow} hover:-translate-y-0.5 transition-all`}
                    >
                      <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </span>
                      {label}
                    </Link>
                  ))}
                </div>

                {/* Stats bar */}
                <div className="flex items-center gap-4 sm:gap-6 pt-6 border-t border-violet-100">
                  {[
                    { icon: Gamepad2, val: `${count}+`, lbl: "Games", c: "text-violet-600" },
                    { icon: Users, val: "1M+", lbl: "Players", c: "text-fuchsia-600" },
                    { icon: Star, val: "4.9", lbl: "Rating", c: "text-amber-500" },
                  ].map(({ icon: Icon, val, lbl, c }, i) => (
                    <div key={lbl} className="flex items-center gap-2.5">
                      {i > 0 && <div className="w-px h-8 bg-violet-100 -ml-2 sm:-ml-3 hidden sm:block" />}
                      <Icon className={`w-5 h-5 ${c} shrink-0`} />
                      <div>
                        <p className={`text-xl font-black tabular-nums ${c}`}>{val}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{lbl}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: bento game grid ── */}
          <motion.div
            className="lg:col-span-7 order-1 lg:order-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="relative rounded-[2rem] p-[2px] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 shadow-2xl shadow-violet-500/25">
              <div className="rounded-[calc(2rem-2px)] bg-[#0c0618] p-3 sm:p-4 overflow-hidden">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(139,92,246,0.35),transparent_55%)] pointer-events-none rounded-[calc(2rem-2px)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_100%,rgba(236,72,153,0.2),transparent_50%)] pointer-events-none" />

                {/* Header bar */}
                <div className="relative flex items-center justify-between px-2 py-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                      <Gamepad2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">Featured Games</p>
                      <p className="text-violet-400/70 text-[10px]">Tap to play instantly</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-red-500/90 text-white text-[10px] font-black uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Live
                    </span>
                    <span className="hidden sm:flex px-2.5 py-1 rounded-lg bg-white/10 text-white/80 text-[10px] font-bold border border-white/10">
                      🏆 Trending
                    </span>
                  </div>
                </div>

                {/* Bento grid */}
                <div className="relative grid grid-cols-4 grid-rows-2 gap-2 sm:gap-3 h-[280px] sm:h-[340px] lg:h-[380px]">
                  {/* Main featured tile - spans 2x2 */}
                  <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
                    <AnimatePresence mode="wait">
                      <motion.button
                        key={hero?.name}
                        type="button"
                        onClick={() => hero && playGame(hero)}
                        className="absolute inset-0 w-full h-full text-left"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                      >
                        <img
                          src={hero?.thumbnail_url}
                          alt={hero?.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black uppercase">
                          <Flame className="w-3 h-3" /> #1 Hot
                        </div>
                        <div className="absolute bottom-0 inset-x-0 p-4">
                          <p className="text-white font-bold text-lg sm:text-xl leading-tight mb-3 line-clamp-2">
                            {hero?.name}
                          </p>
                          <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-violet-700 text-sm font-bold shadow-xl group-hover:scale-105 transition-transform">
                            <Play className="w-4 h-4 fill-current" />
                            Play Now
                          </span>
                        </div>
                      </motion.button>
                    </AnimatePresence>
                  </div>

                  {/* Side tiles */}
                  {bentoSide.slice(0, 4).map((game, i) => (
                    <motion.button
                      key={game.name}
                      type="button"
                      onClick={() => playGame(game)}
                      className="relative rounded-xl sm:rounded-2xl overflow-hidden group border border-white/10 hover:border-violet-400/50 transition-colors"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                    >
                      <img
                        src={game.thumbnail_url}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 text-violet-600 fill-violet-600 ml-0.5" />
                        </div>
                      </div>
                      <p className="absolute bottom-2 left-2 right-2 text-white text-[10px] sm:text-xs font-bold line-clamp-1 drop-shadow-lg">
                        {game.name}
                      </p>
                    </motion.button>
                  ))}
                </div>

                {/* Carousel dots */}
                <div className="relative flex justify-center gap-1.5 mt-4 pb-1">
                  {games.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === active ? "w-8 bg-gradient-to-r from-violet-400 to-fuchsia-400" : "w-1.5 bg-white/25 hover:bg-white/40"
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

                {/* Floating accent cards — desktop only */}
            {!reduced && (
              <>
                {/* <motion.div
                  className="absolute -left-4 top-1/4 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-xl border border-violet-100 text-sm font-bold text-gray-800"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-violet-500" />
                  100% Free
                </motion.div> */}
                <motion.div
                  className="absolute -right-2 bottom-1/4 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-xl border border-violet-100 text-sm font-bold text-gray-800"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                >
                  <Zap className="w-4 h-4 text-amber-500" />
                  Instant Play
                </motion.div>
              </>
            )}
          </motion.div>
        </div>

        {/* Marquee — fewer items on mobile */}
        <motion.div
          className="mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-violet-300" />
            <p className="text-xs font-bold text-violet-500 uppercase tracking-[0.25em]">Popular Now</p>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-violet-300" />
          </div>
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-violet-200 via-fuchsia-200 to-orange-200">
            <div className="relative rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
              <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              {/* Fewer items on mobile to reduce DOM + animation cost */}
              <div className="flex animate-marquee py-3.5">
                {[...gamesData.slice(0, reduced ? 10 : 20), ...gamesData.slice(0, reduced ? 10 : 20)].map((g, i) => (
                  <button
                    key={`${g.name}-${i}`}
                    type="button"
                    onClick={() => playGame(g)}
                    className="inline-flex items-center gap-2.5 mx-4 px-3 py-2 rounded-xl hover:bg-violet-50 transition-all shrink-0 group"
                  >
                    <img
                      src={g.thumbnail_url}
                      alt=""
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-violet-100 group-hover:ring-violet-300 transition-all shadow-sm"
                    />
                    <span className="text-sm font-bold text-gray-600 group-hover:text-violet-700 whitespace-nowrap">
                      {g.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none z-[1]">
        <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            d="M0 120L48 105C96 90 192 60 288 52.5C384 45 480 60 576 67.5C672 75 768 75 864 67.5C960 60 1056 45 1152 37.5C1248 30 1344 30 1392 30L1440 30V120H0Z"
            fill="url(#waveGrad)"
          />
        </svg>
      </div>
    </section>
  );
}
