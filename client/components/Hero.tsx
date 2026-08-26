import { useState, useEffect, useMemo, useRef, type TouchEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gamesData } from "@/data/games";
import { useGamePlayer } from "@/contexts/GamePlayerContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLang } from "@/i18n/LanguageContext";
import { getGameThumbnail, getGamesByCategory } from "@/lib/game-utils";
import { Play, ChevronRight, Crown } from "lucide-react";

const SLIDE_MS = 4500;

export function Hero() {
  const { playGame } = useGamePlayer();
  const isMobile = useIsMobile();
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const games = useMemo(() => {
    const premium = getGamesByCategory("Premium").slice(0, 8);
    return premium.length >= 4 ? premium : gamesData.slice(0, 6);
  }, []);

  const orientation = isMobile ? "portrait" : "landscape";
  const hero = games[active] ?? games[0];
  const heroSrc = hero ? getGameThumbnail(hero, orientation) : "";

  // Prefers-reduced-motion only (do NOT pause autoplay on mobile)
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);
    const onChange = () => setPrefersReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Pause when tab is hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Keep index valid if list length changes
  useEffect(() => {
    setActive((i) => (games.length ? i % games.length : 0));
  }, [games.length]);

  // Auto-advance slider
  useEffect(() => {
    if (prefersReduced || paused || games.length < 2) return;
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % games.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [games.length, prefersReduced, paused]);

  // Preload next slide (portrait + landscape so orientation swaps stay smooth)
  useEffect(() => {
    if (games.length < 2) return;
    const next = games[(active + 1) % games.length];
    const urls = [
      getGameThumbnail(next, "portrait"),
      getGameThumbnail(next, "landscape"),
    ];
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [active, games]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current == null || games.length < 2) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 48) return;
    setActive((p) =>
      dx < 0 ? (p + 1) % games.length : (p - 1 + games.length) % games.length
    );
  };

  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Full-bleed rotating art — portrait on mobile, landscape on desktop */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={`${hero?.name}-${orientation}`}
            src={heroSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{
              opacity: 1,
              scale: prefersReduced ? 1 : 1.05,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.7, ease: "easeInOut" },
              scale: { duration: SLIDE_MS / 1000, ease: "linear" },
            }}
          />
        </AnimatePresence>

        <div
          className="absolute inset-0"
          style={{
            background: isMobile
              ? "linear-gradient(180deg, rgba(3,7,18,0.35) 0%, rgba(3,7,18,0.15) 28%, rgba(3,7,18,0.55) 58%, rgba(3,7,18,0.96) 86%, #030712 100%)"
              : "linear-gradient(180deg, rgba(3,7,18,0.45) 0%, rgba(3,7,18,0.2) 32%, rgba(3,7,18,0.55) 62%, rgba(3,7,18,0.97) 88%, #030712 100%)",
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
            style={{ textShadow: "0 0 60px rgba(34,211,238,0.35)" }}
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

          {/* Progress dots — visual only, no game names */}
          {games.length > 1 && (
            <div
              className="flex items-center gap-1.5 mt-8"
              aria-hidden="true"
            >
              {games.map((g, i) => (
                <button
                  key={g.name}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setActive(i)}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 22 : 7,
                    background:
                      i === active
                        ? "linear-gradient(90deg,#22d3ee,#a78bfa)"
                        : "rgba(255,255,255,0.28)",
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
