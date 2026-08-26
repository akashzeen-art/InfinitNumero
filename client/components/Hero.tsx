import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gamesData } from "@/data/games";
import { useGamePlayer } from "@/contexts/GamePlayerContext";
import { useReducedMotion } from "@/hooks/use-mobile";
import { useLang } from "@/i18n/LanguageContext";
import { getGameName } from "@/i18n/gameNames";
import { Play, ChevronRight, Crown } from "lucide-react";

export function Hero() {
  const { playGame } = useGamePlayer();
  const reduced = useReducedMotion();
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);

  const games =
    gamesData.filter((g) => g.categories.includes("Premium")).slice(0, 6).length >= 4
      ? gamesData.filter((g) => g.categories.includes("Premium")).slice(0, 6)
      : gamesData.slice(0, 6);
  const hero = games[active];

  useEffect(() => {
    if (reduced || games.length < 2) return;
    const id = setInterval(() => setActive((p) => (p + 1) % games.length), 4500);
    return () => clearInterval(id);
  }, [games.length, reduced]);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      {/* Full-bleed hero media */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={hero?.name}
            src={hero?.thumbnail_url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,7,18,0.55) 0%, rgba(3,7,18,0.35) 35%, rgba(3,7,18,0.92) 78%, #030712 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(34,211,238,0.18), transparent 55%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="font-outfit font-extrabold text-gradient text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4">
            InfinityPlay
          </p>
          <h1
            className="font-outfit font-black text-white leading-[0.95] mb-4"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.25rem)" }}
          >
            {t.hero.headline1} {t.hero.headline2}{" "}
            <span className="text-gradient">{t.hero.headline3}</span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              type="button"
              onClick={() => hero && playGame(hero)}
              className="btn-primary px-8 py-3.5 text-base"
            >
              <Play className="w-5 h-5 fill-white" />
              {t.hero.playFree}
            </button>
            <Link
              to="/#premium"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-cyan-100/90 hover:text-white transition-all text-base"
              style={{
                border: "1px solid rgba(34,211,238,0.35)",
                background: "rgba(8,145,178,0.12)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Crown className="w-4 h-4 text-amber-300" />
              {t.sections.premiumTitle}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {hero && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => playGame(hero)}
                className="text-left group"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300/70 mb-1">
                  {t.hero.featuredGames}
                </p>
                <p className="text-white font-bold text-lg group-hover:text-cyan-200 transition-colors">
                  {getGameName(hero.name, lang)}
                </p>
              </button>
              <div className="flex gap-1.5 ml-2">
                {games.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show game ${i + 1}`}
                    onClick={() => setActive(i)}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: i === active ? 18 : 6,
                      background:
                        i === active
                          ? "linear-gradient(90deg,#22d3ee,#a78bfa)"
                          : "rgba(255,255,255,0.25)",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
