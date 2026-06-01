import { motion } from "framer-motion";
import { History, Clock } from "lucide-react";
import { Game } from "@/data/games";
import { GameCard } from "@/components/GameCard";
import { useReducedMotion } from "@/hooks/use-mobile";
import { useLang } from "@/i18n/LanguageContext";

interface RecentlyPlayedSectionProps {
  games: Game[];
}

export function RecentlyPlayedSection({ games }: RecentlyPlayedSectionProps) {
  const reduced = useReducedMotion();
  const { t } = useLang();
  if (games.length === 0) return null;

  return (
    <section className="relative py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "0 6px 20px rgba(139,92,246,0.35)" }}>
            <History className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold font-outfit text-white">{t.sections.recentTitle}</h2>
            <p className="text-[11px] text-white/35 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" /> {t.sections.recentSubtitle}
            </p>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
          {games.slice(0, 10).map((game, i) =>
            reduced ? (
              <div key={game.name} className="flex-shrink-0 w-32 sm:w-36 snap-start">
                <GameCard game={game} />
              </div>
            ) : (
              <motion.div
                key={game.name}
                className="flex-shrink-0 w-32 sm:w-36 snap-start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GameCard game={game} />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
