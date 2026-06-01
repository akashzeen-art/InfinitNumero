import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gamesData } from "@/data/games";
import { useGamePlayer } from "@/contexts/GamePlayerContext";
import { useReducedMotion } from "@/hooks/use-mobile";
import { Play, Zap, Users, ChevronRight, Flame, Puzzle, Swords, Gamepad2, Star, Brain } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const featured = gamesData.filter((g) => g.categories.includes("Top 10 Games")).slice(0, 8);
const bentoSide = gamesData.slice(4, 10);

const CATEGORIES = [
  { label: "Arcade", icon: Zap,    path: "/category/Arcade",          color: "from-pink-500 to-fuchsia-600",  glow: "rgba(236,72,153,0.4)" },
  { label: "Puzzle", icon: Puzzle, path: "/category/Puzzle",          color: "from-cyan-500 to-blue-600",     glow: "rgba(6,182,212,0.4)" },
  { label: "Action", icon: Swords, path: "/category/Action",          color: "from-orange-500 to-red-600",    glow: "rgba(249,115,22,0.4)" },
  { label: "Top 10", icon: Flame,  path: "/category/Top%2010%20Games",color: "from-amber-400 to-orange-500",  glow: "rgba(251,191,36,0.4)" },
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
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [go, setGo] = useState(false);
  const games = featured.length >= 4 ? featured : gamesData.slice(0, 8);
  const hero = games[active];
  const count = useCounter(gamesData.length, go && !reduced);

  useEffect(() => {
    setGo(true);
    const id = setInterval(() => setActive((p) => (p + 1) % games.length), 4500);
    return () => clearInterval(id);
  }, [games.length]);

  return (
    <section className="hero-section relative min-h-[100svh] flex flex-col overflow-hidden" style={{ background: "#05020f" }}>
      {/* ── deep space bg ── */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.18), transparent 55%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 80%, rgba(236,72,153,0.1), transparent 55%)" }} />
      {/* grid */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      {/* scan line */}
      {!reduced && (
        <motion.div
          className="absolute inset-x-0 h-px pointer-events-none z-0"
          style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.4), transparent)" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 w-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">

          {/* ── LEFT: copy card ── */}
          <motion.div
            className="lg:col-span-5 order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative rounded-[2rem] p-[1px]"
              style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.6), rgba(217,70,239,0.4), rgba(249,115,22,0.3))" }}>
              <div className="rounded-[calc(2rem-1px)] px-6 sm:px-8 py-8 sm:py-10"
                style={{ background: "rgba(12,6,24,0.85)", backdropFilter: "blur(24px)" }}>

                {/* live badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6"
                  style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)" }}>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <Brain className="w-4 h-4 text-violet-400" />
                  <span className="text-sm font-bold text-violet-300">{gamesData.length}+ {t.hero.badge}</span>
                </div>

                <h1 className="font-outfit text-[2.75rem] sm:text-5xl xl:text-[3.5rem] font-black leading-[0.95] tracking-tight mb-5">
                  <span className="text-white">{t.hero.headline1}</span><br />
                  <span className="text-white">{t.hero.headline2}</span><br />
                  <span className="relative inline-block mt-1">
                    <span className="text-gradient animate-gradient-shift">{t.hero.headline3}</span>
                    <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <path d="M0 8 Q50 0 100 8 T200 8" stroke="rgba(139,92,246,0.5)" strokeWidth="3" fill="none" />
                    </svg>
                  </span>
                </h1>

                <p className="text-white/45 text-base sm:text-lg leading-relaxed mb-6 max-w-md">
                  {t.hero.subtitle}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mb-7">
                  <Link to="/#games" className="btn-primary h-13 px-8 text-base justify-center group relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Play className="w-5 h-5 fill-white relative z-10" />
                    <span className="relative z-10">{t.hero.playFree}</span>
                  </Link>
                  <Link to="/categories"
                    className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-2xl font-bold text-white/70 hover:text-white transition-all"
                    style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
                    {t.hero.categories} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* category chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {CATEGORIES.map(({ label, icon: Icon, path, color, glow }) => (
                    <Link key={path} to={path}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold text-white/70 hover:text-white transition-all hover:-translate-y-0.5"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 4px 20px ${glow}`)}
                      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                    >
                      <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </span>
                      {label}
                    </Link>
                  ))}
                </div>

                {/* stats */}
                <div className="flex items-center gap-4 sm:gap-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  {[
                    { icon: Gamepad2, val: `${count}+`, lbl: t.hero.gamesLabel,   c: "text-violet-400" },
                    { icon: Users,    val: "1M+",        lbl: t.hero.playersLabel, c: "text-fuchsia-400" },
                    { icon: Star,     val: "4.9",         lbl: t.hero.ratingLabel,  c: "text-amber-400" },
                  ].map(({ icon: Icon, val, lbl, c }, i) => (
                    <div key={lbl} className="flex items-center gap-2.5">
                      {i > 0 && <div className="w-px h-8 hidden sm:block" style={{ background: "rgba(255,255,255,0.07)" }} />}
                      <Icon className={`w-5 h-5 ${c} shrink-0`} />
                      <div>
                        <p className={`text-xl font-black tabular-nums ${c}`}>{val}</p>
                        <p className="text-[10px] font-bold text-white/25 uppercase tracking-wider">{lbl}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: bento grid ── */}
          <motion.div
            className="lg:col-span-7 order-1 lg:order-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="relative rounded-[2rem] p-[2px]"
              style={{ background: "linear-gradient(135deg, #7c3aed, #db2777, #f97316)", boxShadow: "0 24px 80px rgba(139,92,246,0.3)" }}>
              <div className="rounded-[calc(2rem-2px)] overflow-hidden p-3 sm:p-4" style={{ background: "#0c0618" }}>
                <div className="absolute inset-0 pointer-events-none rounded-[calc(2rem-2px)]"
                  style={{ background: "radial-gradient(ellipse at 20% 0%, rgba(139,92,246,0.3), transparent 55%)" }} />

                {/* header */}
                <div className="relative flex items-center justify-between px-2 py-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                      <Gamepad2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">{t.hero.featuredGames}</p>
                      <p className="text-violet-400/60 text-[10px]">{t.hero.tapToPlay}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-white text-[10px] font-black uppercase flex items-center gap-1"
                      style={{ background: "rgba(239,68,68,0.8)" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> {t.hero.live}
                    </span>
                    <span className="hidden sm:flex px-2.5 py-1 rounded-lg text-white/70 text-[10px] font-bold"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      🏆 {t.hero.trending}
                    </span>
                  </div>
                </div>

                {/* bento */}
                <div className="relative grid grid-cols-4 grid-rows-2 gap-2 sm:gap-3 h-[280px] sm:h-[340px] lg:h-[380px]">
                  {/* main tile */}
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
                        <img src={hero?.thumbnail_url} alt={hero?.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,2,15,0.95) 0%, rgba(5,2,15,0.2) 50%, transparent 100%)" }} />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-white text-[10px] font-black uppercase"
                          style={{ background: "linear-gradient(135deg, #f97316, #ef4444)" }}>
                          <Flame className="w-3 h-3" /> {t.hero.hot}
                        </div>
                        <div className="absolute bottom-0 inset-x-0 p-4">
                          <p className="text-white font-bold text-lg sm:text-xl leading-tight mb-3 line-clamp-2">{hero?.name}</p>
                          <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold shadow-xl group-hover:scale-105 transition-transform"
                            style={{ background: "rgba(139,92,246,0.9)", boxShadow: "0 4px 20px rgba(139,92,246,0.5)" }}>
                            <Play className="w-4 h-4 fill-current text-white" />
                            <span className="text-white">{t.hero.playNow}</span>
                          </span>
                        </div>
                      </motion.button>
                    </AnimatePresence>
                  </div>

                  {/* side tiles */}
                  {bentoSide.slice(0, 4).map((game, i) => (
                    <motion.button
                      key={game.name}
                      type="button"
                      onClick={() => playGame(game)}
                      className="relative rounded-xl sm:rounded-2xl overflow-hidden group"
                      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                    >
                      <img src={game.thumbnail_url} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity"
                        style={{ background: "linear-gradient(to top, rgba(5,2,15,0.9), transparent)" }} />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                          style={{ background: "rgba(139,92,246,0.9)", boxShadow: "0 0 20px rgba(139,92,246,0.6)" }}>
                          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                      <p className="absolute bottom-2 left-2 right-2 text-white text-[10px] sm:text-xs font-bold line-clamp-1 drop-shadow-lg">{game.name}</p>
                    </motion.button>
                  ))}
                </div>

                {/* dots */}
                <div className="relative flex justify-center gap-1.5 mt-4 pb-1">
                  {games.map((_, i) => (
                    <button key={i} type="button" onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8" : "w-1.5 hover:bg-white/40"}`}
                      style={i === active ? { background: "linear-gradient(to right, #8b5cf6, #d946ef)" } : { background: "rgba(255,255,255,0.2)" }}
                      aria-label={`Slide ${i + 1}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* floating badge */}
            {!reduced && (
              <motion.div
                className="absolute -right-2 bottom-1/4 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-white"
                style={{ background: "rgba(12,6,24,0.9)", border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 8px 32px rgba(139,92,246,0.2)" }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              >
                <Zap className="w-4 h-4 text-amber-400" />
                {t.hero.instantPlay}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* ── marquee ── */}
        <motion.div className="mt-12 sm:mt-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.5))" }} />
            <p className="text-xs font-bold text-violet-400 uppercase tracking-[0.25em]">{t.hero.popularNow}</p>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, rgba(139,92,246,0.5))" }} />
          </div>
          <div className="relative rounded-2xl p-[1px]"
            style={{ background: "linear-gradient(to right, rgba(139,92,246,0.4), rgba(217,70,239,0.3), rgba(249,115,22,0.3))" }}>
            <div className="relative rounded-2xl overflow-hidden" style={{ background: "rgba(12,6,24,0.8)", backdropFilter: "blur(12px)" }}>
              <div className="absolute left-0 inset-y-0 w-20 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, rgba(12,6,24,1), transparent)" }} />
              <div className="absolute right-0 inset-y-0 w-20 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, rgba(12,6,24,1), transparent)" }} />
              <div className="flex animate-marquee py-3.5">
                {[...gamesData.slice(0, reduced ? 10 : 20), ...gamesData.slice(0, reduced ? 10 : 20)].map((g, i) => (
                  <button key={`${g.name}-${i}`} type="button" onClick={() => playGame(g)}
                    className="inline-flex items-center gap-2.5 mx-4 px-3 py-2 rounded-xl transition-all shrink-0 group hover:bg-white/5">
                    <img src={g.thumbnail_url} alt="" className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10 group-hover:ring-violet-500/50 transition-all shadow-sm" />
                    <span className="text-sm font-bold text-white/40 group-hover:text-white/80 whitespace-nowrap transition-colors">{g.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
