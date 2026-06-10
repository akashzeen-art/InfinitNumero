import { Zap } from "lucide-react";
import { Game } from "@/data/games";
import { GameCard } from "@/components/GameCard";
import { useLang } from "@/i18n/LanguageContext";

interface BecauseYouPlayedSectionProps {
  category: string;
  games: Game[];
}

export function BecauseYouPlayedSection({ category, games }: BecauseYouPlayedSectionProps) {
  const { t } = useLang();
  if (games.length === 0) return null;

  return (
    <section className="relative py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)", boxShadow: "0 6px 20px rgba(249,115,22,0.35)" }}>
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-0.5">
              {t.sections.becauseBadge} {category}
            </p>
            <h2 className="text-lg font-extrabold font-outfit text-white">
              {t.sections.becauseTitle} {category}
            </h2>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
          {games.map((game) => (
            <div key={game.name} className="flex-shrink-0 w-36 sm:w-40 snap-start">
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
