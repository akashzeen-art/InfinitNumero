import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { getGamesByCategory, HOME_CATEGORY_SECTIONS, type CategoryConfig } from "@/lib/game-utils";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-mobile";

interface CategoryShowcaseSectionProps {
  config: CategoryConfig;
  limit?: number;
  layout?: "scroll" | "grid";
}

export function CategoryShowcaseSection({ config, limit = 8, layout = "scroll" }: CategoryShowcaseSectionProps) {
  const reduced = useReducedMotion();
  const Icon = config.icon;
  const games = getGamesByCategory(config.id, limit);
  if (games.length === 0) return null;

  return (
    <section className={cn("relative overflow-hidden", config.accentBg)}>
      <div className="absolute inset-0 hero-mesh opacity-60 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 mb-10"
        >
          <div className="flex-1">
            <div
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4",
                `bg-gradient-to-r ${config.gradient} text-white shadow-md`
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {config.shortLabel}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-gray-900 mb-2">
              {config.label}
            </h2>
            <p className="text-gray-600 max-w-md">{config.description}</p>
          </div>
          <Link
            to={config.path}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white border border-gray-200 font-bold text-gray-800 shadow-sm hover:shadow-lg hover:border-violet-300 hover:text-violet-700 transition-all shrink-0"
          >
            Explore {config.shortLabel}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {layout === "scroll" ? (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {games.map((game, i) => (
              reduced ? (
                <div key={game.name} className="flex-shrink-0 w-40 sm:w-44">
                  <GameCard game={game} featured={i < 2} />
                </div>
              ) : (
                <motion.div
                  key={game.name}
                  className="flex-shrink-0 w-40 sm:w-44"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <GameCard game={game} featured={i < 2} />
                </motion.div>
              )
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {games.map((game, i) => (
              reduced ? (
                <div key={game.name}>
                  <GameCard game={game} />
                </div>
              ) : (
                <motion.div
                  key={game.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GameCard game={game} />
                </motion.div>
              )
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function HomeCategorySections() {
  return (
    <>
      {HOME_CATEGORY_SECTIONS.filter((c) => c.id !== "Top 10 Games").map((config) => (
        <CategoryShowcaseSection
          key={config.id}
          config={config}
          limit={config.id === "Puzzle" ? 10 : 8}
          layout={config.id === "Action" ? "grid" : "scroll"}
        />
      ))}
    </>
  );
}
