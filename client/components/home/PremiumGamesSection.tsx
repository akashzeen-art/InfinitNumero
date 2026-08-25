import { Link } from "react-router-dom";
import { Crown, ChevronRight, Sparkles } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { getGamesByCategory } from "@/lib/game-utils";
import { useLang } from "@/i18n/LanguageContext";

export function PremiumGamesSection() {
  const { t } = useLang();
  const premiumGames = getGamesByCategory("Premium");
  if (premiumGames.length === 0) return null;

  return (
    <section className="relative py-14 sm:py-16" id="premium">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(234,179,8,0.06), transparent 70%)" }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[280px] rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.45), transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div className="flex items-start gap-4">
            <div
              className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #eab308, #f97316)",
                boxShadow: "0 8px 24px rgba(245,158,11,0.4)",
              }}
            >
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1.5">
                <Sparkles className="w-3 h-3" /> {t.sections.premiumBadge}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">
                {t.sections.premiumTitle}
              </h2>
              <p className="text-white/35 text-sm mt-0.5">
                {premiumGames.length} {t.sections.premiumSubtitle}
              </p>
            </div>
          </div>
          <Link
            to="/category/Premium"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-400 hover:text-amber-300 hover:gap-2.5 transition-all shrink-0"
          >
            {t.sections.seeAll} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {premiumGames.map((game) => (
            <GameCard key={game.name} game={game} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
