import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gamesData } from "@/data/games";
import { useGamePlayer } from "@/contexts/GamePlayerContext";
import { useReducedMotion } from "@/hooks/use-mobile";
import { useLang } from "@/i18n/LanguageContext";
import { getGameThumbnail, getGamesByCategory } from "@/lib/game-utils";
import { Play, ChevronRight, Crown } from "lucide-react";

export function Hero() {
  const { playGame } = useGamePlayer();
  const reduced = useReducedMotion();
  const { t } = useLang();
  const [active, setActive] = useState(0);

  const premium = getGamesByCategory("Premium").slice(0, 6);
  const games = premium.length >= 4 ? premium : gamesData.slice(0, 6);
  const hero = games[active];
  const heroSrc = hero ? getGameThumbnail(hero, "landscape") : "";

  useEffect(() => {
    if (reduced || games.length < 2) return;
    const id = setInterval(() => setActive((p) => (p + 1) % games.length), 5200);
    return () => clearInterval(id);
  }, [games.length, reduced]);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      {/* Full-bleed rotating landscape art */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={hero?.name}
            src={heroSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{
              opacity: 1,
              scale: reduced ? 1 : 1.04,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 5.2, ease: "linear" },
            }}
          />
        </AnimatePresence>

        {/* Depth overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,7,18,0.45) 0%, rgba(3,7,18,0.2) 32%, rgba(3,7,18,0.55) 62%, rgba(3,7,18,0.97) 88%, #030712 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 75% 35%, rgba(34,211,238,0.22), transparent 58%), radial-gradient(ellipse 50% 40% at 15% 70%, rgba(167,139,250,0.14), transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(3,7,18,0.55) 100%)",
          }}
        />
        {/* Soft film grain feel */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <motion.p
            className="font-outfit font-extrabold text-gradient text-5xl sm:text-6xl md:text-7xl tracking-tight mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            style={{
              textShadow: "0 0 60px rgba(34,211,238,0.35)",
            }}
          >
            InfinityPlay
          </motion.p>

          <motion.h1
            className="font-outfit font-black text-white leading-[0.95] mb-5"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)" }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7 }}
          >
            {t.hero.headline1} {t.hero.headline2}{" "}
            <span className="text-gradient">{t.hero.headline3}</span>
          </motion.h1>

          <motion.p
            className="text-white/60 text-base sm:text-lg max-w-md mb-9 leading-relaxed"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.65 }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.65 }}
          >
            <button
              type="button"
              onClick={() => hero && playGame(hero)}
              className="btn-primary px-8 py-3.5 text-base shadow-lg shadow-cyan-500/20"
            >
              <Play className="w-5 h-5 fill-white" />
              {t.hero.playFree}
            </button>
            <Link
              to="/#premium"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-cyan-100/90 hover:text-white transition-all text-base hover:border-cyan-300/50"
              style={{
                border: "1px solid rgba(34,211,238,0.35)",
                background: "rgba(8,145,178,0.14)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Crown className="w-4 h-4 text-amber-300" />
              {t.sections.premiumTitle}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
