import { motion } from "framer-motion";
import { GameCard } from "@/components/GameCard";
import { Game } from "@/data/games";
import { useReducedMotion } from "@/hooks/use-mobile";

interface GamesGridProps {
  games: Game[];
  featuredPredicate?: (game: Game, index: number) => boolean;
  className?: string;
}

export function GamesGrid({ games, featuredPredicate, className }: GamesGridProps) {
  const reduced = useReducedMotion();
  if (games.length === 0) return null;

  const gridClass = className ?? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5";

  // On mobile skip stagger entirely — just render cards directly
  if (reduced) {
    return (
      <div className={gridClass}>
        {games.map((game, i) => (
          <GameCard key={game.name} game={game} featured={featuredPredicate?.(game, i)} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={gridClass}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04 } },
      }}
    >
      {games.map((game, i) => (
        <motion.div
          key={game.name}
          variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
        >
          <GameCard game={game} featured={featuredPredicate?.(game, i)} />
        </motion.div>
      ))}
    </motion.div>
  );
}
