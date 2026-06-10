import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gamesData } from "@/data/games";
import { useGamePlayer } from "@/contexts/GamePlayerContext";
import { useReducedMotion } from "@/hooks/use-mobile";
import { useLang } from "@/i18n/LanguageContext";
import { getGameName } from "@/i18n/gameNames";
import { Play, Zap, Users, ChevronRight, Flame, Puzzle, Swords, Gamepad2, Star, Brain } from "lucide-react";

const featured = gamesData.filter((g) => g.categories.includes("Top 10 Games")).slice(0, 8);
const bentoGames = gamesData.slice(0, 6);

const CATEGORIES = [
  { label: "Arcade", icon: Zap,    path: "/category/Arcade",           color: "from-pink-500 to-fuchsia-600",  glow: "rgba(236,72,153,0.5)" },
  { label: "Puzzle", icon: Puzzle, path: "/category/Puzzle",           color: "from-cyan-500 to-blue-600",     glow: "rgba(6,182,212,0.5)" },
  { label: "Action", icon: Swords, path: "/category/Action",           color: "from-orange-500 to-red-600",    glow: "rgba(249,115,22,0.5)" },
  { label: "Top 10", icon: Flame,  path: "/category/Top%2010%20Games", color: "from-amber-400 to-orange-500",  glow: "rgba(251,191,36,0.5)" },
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
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);
  const [go, setGo] = useState(false);
  const games = featured.length >= 4 ? featured : gamesData.slice(0, 8);
  const hero = games[active];
  const count = useCounter(gamesData.length, go && !reduced);

  useEffect(() => {
    setGo(true);
    const id = setInterval(() => setActive((p) => (p + 1) % games.length), 4000);
    return () => clearInterval(id);
  }, [games.length]);

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden" style={{ background: "#05020f" }}>
      {/* ── background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 20%, rgba(139,92,246,0.2), transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 10% 80%, rgba(236,72,153,0.12), transparent 55%)" }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {!reduced && (
          <motion.div
            className="absolute inset-x-0 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.4), transparent)" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

        {/* ── TOP: centered headline ── */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* live badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
              <span className="relative rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <Brain className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-bold text-violet-300">{count}+ {t.hero.badge}</span>
          </motion.div>

          {/* headline */}
          <h1 className="font-outfit font-black tracking-tight mb-5 leading-[0.9]"
            style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}>
            <span className="text-white">{t.hero.headline1} </span>
            <span className="text-white">{t.hero.headline2} </span>
            <span className="relative inline-block">
              <span className="text-gradient animate-gradient-shift">{t.hero.headline3}</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" preserveAspectRatio="none">
                <path d="M0 8 Q75 0 150 8 T300 8" stroke="rgba(139,92,246,0.5)" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link to="/#games" className="btn-primary px-8 py-3.5 text-base group relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Play className="w-5 h-5 fill-white relative z-10" />
              <span className="relative z-10">{t.hero.playFree}</span>
            </Link>
            <Link to="/categories"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white/70 hover:text-white transition-all text-base"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
              {t.hero.categories} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* category chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map(({ label, icon: Icon, path, color, glow }) => (
              <Link key={path} to={path}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold text-white/65 hover:text-white transition-all hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 4px 20px ${glow}`)}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
                  <Icon className="w-3 h-3 text-white" />
                </span>
                {label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── BOTTOM: game showcase ── */}
        <motion.div
          className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          {/* Featured big tile */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer"
              style={{ aspectRatio: "4/3", background: "#0c0618", border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 20px 60px rgba(139,92,246,0.2)" }}
              onClick={() => hero && playGame(hero)}>
              <AnimatePresence mode="wait">
                <motion.div key={hero?.name} className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <img src={hero?.thumbnail_url} alt={hero?.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,2,15,0.95) 0%, rgba(5,2,15,0.3) 50%, transparent 100%)" }} />
                </motion.div>
              </AnimatePresence>

              {/* top badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-white text-[10px] font-black uppercase"
                  style={{ background: "linear-gradient(135deg, #f97316, #ef4444)" }}>
                  <Flame className="w-3 h-3" /> {t.hero.hot}
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-white text-[10px] font-black uppercase"
                  style={{ background: "rgba(239,68,68,0.8)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> {t.hero.live}
                </span>
              </div>

              {/* bottom info */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10">
                <p className="text-white font-black text-xl sm:text-2xl mb-3 leading-tight">
                  {getGameName(hero?.name ?? "", lang)}
                </p>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white group-hover:scale-105 transition-transform"
                    style={{ background: "rgba(139,92,246,0.9)", boxShadow: "0 4px 20px rgba(139,92,246,0.5)" }}>
                    <Play className="w-4 h-4 fill-current" /> {t.hero.playNow}
                  </span>
                </div>
              </div>

              {/* carousel dots */}
              <div className="absolute bottom-3 right-4 flex gap-1 z-10">
                {games.map((_, i) => (
                  <button key={i} type="button" onClick={(e) => { e.stopPropagation(); setActive(i); }}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? "20px" : "6px",
                      background: i === active ? "linear-gradient(to right, #8b5cf6, #d946ef)" : "rgba(255,255,255,0.3)"
                    }} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: 2x3 grid of games */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-2 sm:gap-3">
            {bentoGames.map((game, i) => (
              <motion.div key={game.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.07 }}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "1/1", border: "1px solid rgba(255,255,255,0.07)" }}
                onClick={() => playGame(game)}
              >
                <img src={game.thumbnail_url} alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(to top, rgba(5,2,15,0.9), transparent 60%)" }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(139,92,246,0.9)", boxShadow: "0 0 20px rgba(139,92,246,0.6)" }}>
                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                  </div>
                </div>
                <p className="absolute bottom-1.5 left-2 right-2 text-white text-[10px] font-bold line-clamp-1 drop-shadow-lg">
                  {getGameName(game.name, lang)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── stats bar ── */}
        <motion.div
          className="flex items-center justify-center gap-6 sm:gap-10 mt-8 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
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
        </motion.div>
      </div>

      {/* ── marquee ── */}
      <motion.div
        className="relative z-10 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-center gap-3 mb-3 px-4">
          <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.4))" }} />
          <p className="text-[10px] font-black text-violet-400 uppercase tracking-[0.3em]">{t.hero.popularNow}</p>
          <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(to left, transparent, rgba(139,92,246,0.4))" }} />
        </div>
        <div className="relative p-[1px] mx-4 rounded-2xl"
          style={{ background: "linear-gradient(to right, rgba(139,92,246,0.3), rgba(217,70,239,0.2), rgba(249,115,22,0.2))" }}>
          <div className="relative rounded-2xl overflow-hidden" style={{ background: "rgba(12,6,24,0.8)", backdropFilter: "blur(12px)" }}>
            <div className="absolute left-0 inset-y-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, rgba(12,6,24,1), transparent)" }} />
            <div className="absolute right-0 inset-y-0 w-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, rgba(12,6,24,1), transparent)" }} />
            <div className="flex animate-marquee py-3">
              {[...gamesData.slice(0, reduced ? 10 : 20), ...gamesData.slice(0, reduced ? 10 : 20)].map((g, i) => (
                <button key={`${g.name}-${i}`} type="button" onClick={() => playGame(g)}
                  className="inline-flex items-center gap-2 mx-3 px-3 py-1.5 rounded-xl transition-all shrink-0 group hover:bg-white/5">
                  <img src={g.thumbnail_url} alt="" className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10 group-hover:ring-violet-500/50 transition-all" />
                  <span className="text-xs font-bold text-white/40 group-hover:text-white/80 whitespace-nowrap transition-colors">
                    {getGameName(g.name, lang)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
