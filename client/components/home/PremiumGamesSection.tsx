import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, ChevronRight, Sparkles, Play } from "lucide-react";
import { getGamesByCategory, getGameThumbnail } from "@/lib/game-utils";
import { useLang } from "@/i18n/LanguageContext";
import { useGamePlayer } from "@/contexts/GamePlayerContext";
import type { Game } from "@/data/games";

const SIDE_COUNT = 6;

function PremiumTile({
  game,
  orientation,
  featured,
  index,
}: {
  game: Game;
  orientation: "landscape" | "portrait";
  featured?: boolean;
  index: number;
}) {
  const { playGame } = useGamePlayer();
  const src = getGameThumbnail(game, orientation);

  return (
    <motion.button
      type="button"
      aria-label="Play premium game"
      onClick={() => playGame(game)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={
        featured
          ? "group relative w-full aspect-video rounded-3xl overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          : "group relative w-full aspect-[9/16] rounded-2xl overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      }
      style={{
        boxShadow: featured
          ? "0 20px 50px rgba(245,158,11,0.22), inset 0 0 0 1px rgba(251,191,36,0.35)"
          : "inset 0 0 0 1px rgba(251,191,36,0.18)",
      }}
    >
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{
          background: featured
            ? "linear-gradient(160deg, rgba(3,7,18,0.08) 0%, rgba(3,7,18,0.2) 55%, rgba(3,7,18,0.55) 100%)"
            : "linear-gradient(to top, rgba(3,7,18,0.45) 0%, transparent 50%)",
        }}
      />

      <div
        className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider text-slate-950"
        style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}
      >
        <Crown className="w-2.5 h-2.5" /> Premium
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <span
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(251,191,36,0.92)",
            boxShadow: "0 0 28px rgba(245,158,11,0.45)",
          }}
        >
          <Play className="w-5 h-5 text-slate-950 fill-slate-950 ml-0.5" />
        </span>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(251,191,36,0.55)" }}
      />
    </motion.button>
  );
}

export function PremiumGamesSection() {
  const { t } = useLang();
  const premiumGames = getGamesByCategory("Premium");
  if (premiumGames.length === 0) return null;

  const [hero, ...rest] = premiumGames;
  const side = rest.slice(0, SIDE_COUNT);

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden" id="premium">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 15% 40%, rgba(245,158,11,0.16), transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(234,179,8,0.08), transparent 50%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(251,191,36,0.55), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(251,191,36,0.25), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8 sm:mb-10">
          <div className="flex items-start gap-4">
            <div
              className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #fbbf24, #d97706)",
                boxShadow: "0 10px 32px rgba(245,158,11,0.4)",
              }}
            >
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-300/90 mb-1.5">
                <Sparkles className="w-3 h-3" /> {t.sections.premiumBadge}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">
                {t.sections.premiumTitle}
              </h2>
              <p className="text-white/45 text-sm mt-0.5 max-w-md">
                {t.sections.premiumSubtitle}
              </p>
            </div>
          </div>
          <Link
            to="/category/Premium"
            className="inline-flex items-center gap-1.5 self-start md:self-auto px-4 py-2.5 rounded-xl text-sm font-bold text-amber-100 transition-all hover:gap-2.5"
            style={{
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(251,191,36,0.35)",
            }}
          >
            {t.sections.seeAll} · {premiumGames.length}{" "}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Landscape hero + portrait strip */}
        <div className="space-y-4">
          {hero && (
            <PremiumTile
              game={hero}
              orientation="landscape"
              featured
              index={0}
            />
          )}
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {side.map((game, i) => (
              <div
                key={game.name}
                className="flex-shrink-0 w-[7.5rem] sm:w-36 snap-start"
              >
                <PremiumTile
                  game={game}
                  orientation="portrait"
                  index={i + 1}
                />
              </div>
            ))}
            <Link
              to="/category/Premium"
              className="flex-shrink-0 w-[7.5rem] sm:w-36 snap-start aspect-[9/16] rounded-2xl flex flex-col items-center justify-center gap-2 text-center px-3"
              style={{
                background: "rgba(245,158,11,0.08)",
                border: "1px dashed rgba(251,191,36,0.4)",
              }}
            >
              <Crown className="w-7 h-7 text-amber-300" />
              <span className="text-sm font-bold text-white/80">
                {t.sections.seeAll}
              </span>
              <span className="text-xs text-amber-300/80">
                +{Math.max(0, premiumGames.length - 1 - side.length)}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
