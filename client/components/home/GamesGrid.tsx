import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GameCard } from "@/components/GameCard";
import { Game } from "@/data/games";
import { useReducedMotion } from "@/hooks/use-mobile";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const PAGE_SIZE = 24;

interface GamesGridProps {
  games: Game[];
  featuredPredicate?: (game: Game, index: number) => boolean;
  className?: string;
}

export function GamesGrid({ games, featuredPredicate, className }: GamesGridProps) {
  const reduced = useReducedMotion();
  const { t } = useLang();
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => { setVisible(PAGE_SIZE); }, [games]);

  if (games.length === 0) return null;

  const shown = games.slice(0, visible);
  const hasMore = visible < games.length;
  const gridClass = className ?? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5";

  return (
    <div>
      {reduced ? (
        <div className={gridClass}>
          {shown.map((game, i) => (
            <GameCard key={game.name} game={game} featured={featuredPredicate?.(game, i)} />
          ))}
        </div>
      ) : (
        <motion.div
          className={gridClass}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.03 } } }}
        >
          {shown.map((game, i) => (
            <motion.div
              key={game.name}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <GameCard game={game} featured={featuredPredicate?.(game, i)} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-bold text-white/60 hover:text-white transition-all"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <ChevronDown className="w-4 h-4" />
            {t.sections.loadMore} · {games.length - visible} {t.sections.remaining}
          </button>
        </div>
      )}
    </div>
  );
}
