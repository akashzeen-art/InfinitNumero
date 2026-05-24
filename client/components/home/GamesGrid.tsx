import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GameCard } from "@/components/GameCard";
import { Game } from "@/data/games";
import { useReducedMotion } from "@/hooks/use-mobile";

const PAGE_SIZE = 24;

interface GamesGridProps {
  games: Game[];
  featuredPredicate?: (game: Game, index: number) => boolean;
  className?: string;
}

export function GamesGrid({ games, featuredPredicate, className }: GamesGridProps) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Reset pagination when the game list changes (e.g. category filter)
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [games]);

  if (games.length === 0) return null;

  const shown = games.slice(0, visible);
  const hasMore = visible < games.length;

  const gridClass =
    className ??
    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5";

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
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.03 } },
          }}
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
        <div className="flex flex-col items-center gap-1.5 mt-8">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="px-8 py-3 rounded-2xl bg-white border-2 border-violet-200 text-violet-700 font-bold text-sm hover:bg-violet-50 hover:border-violet-300 hover:shadow-lg transition-all"
          >
            Load more · {games.length - visible} remaining
          </button>
        </div>
      )}
    </div>
  );
}
