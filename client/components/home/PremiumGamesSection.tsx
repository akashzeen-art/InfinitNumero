import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, ChevronRight, Sparkles } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { getGamesByCategory } from "@/lib/game-utils";
import { useLang } from "@/i18n/LanguageContext";

const PREVIEW_COUNT = 8;

export function PremiumGamesSection() {
  const { t } = useLang();
  const premiumGames = getGamesByCategory("Premium");
  if (premiumGames.length === 0) return null;

  const preview = premiumGames.slice(0, PREVIEW_COUNT);

  return (
    <section className="relative py-14 sm:py-16" id="premium">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div className="flex items-start gap-4">
            <div
              className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #22d3ee)",
                boxShadow: "0 8px 28px rgba(245,158,11,0.35)",
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
              <p className="text-white/40 text-sm mt-0.5">
                {t.sections.premiumSubtitle}
              </p>
            </div>
          </div>
          <Link
            to="/category/Premium"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 hover:text-cyan-200 hover:gap-2.5 transition-all shrink-0"
          >
            {t.sections.seeAll} · {premiumGames.length} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {preview.map((game) => (
            <div key={game.name} className="flex-shrink-0 w-40 sm:w-44 snap-start">
              <GameCard game={game} featured />
            </div>
          ))}
          <Link
            to="/category/Premium"
            className="flex-shrink-0 w-40 sm:w-44 snap-start aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 text-center px-4 transition-all hover:-translate-y-1"
            style={{
              background: "rgba(8,145,178,0.12)",
              border: "1px dashed rgba(34,211,238,0.4)",
            }}
          >
            <Crown className="w-8 h-8 text-amber-300" />
            <span className="text-sm font-bold text-white/80">
              {t.sections.seeAll}
            </span>
            <span className="text-xs text-cyan-300/80">
              +{premiumGames.length - preview.length}
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
