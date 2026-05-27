import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { getGamesByCategory, HOME_CATEGORY_SECTIONS, type CategoryConfig } from "@/lib/game-utils";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-mobile";
import { useRecommendations } from "@/hooks/useRecommendations";

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
    <section className="relative overflow-hidden py-14 sm:py-16">
      {/* subtle bg tint */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{ background: `radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.06), transparent 60%)` }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 mb-10"
        >
          <div className="flex-1">
            <div className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 text-white",
              `bg-gradient-to-r ${config.gradient}`
            )}
              style={{ boxShadow: "0 4px 16px rgba(139,92,246,0.3)" }}>
              <Icon className="w-3.5 h-3.5" />
              {config.shortLabel}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white mb-2">{config.label}</h2>
            <p className="text-white/40 max-w-md text-sm">{config.description}</p>
          </div>
          <Link
            to={config.path}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-white/70 hover:text-white transition-all shrink-0"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Explore {config.shortLabel}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {layout === "scroll" ? (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {games.map((game, i) =>
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
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {games.map((game, i) =>
              reduced ? (
                <div key={game.name}><GameCard game={game} /></div>
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
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function HomeCategorySections({ personalizedOrder = false }: { personalizedOrder?: boolean }) {
  const { personalizedSectionOrder } = personalizedOrder
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useRecommendations()
    : { personalizedSectionOrder: null };

  const sections = HOME_CATEGORY_SECTIONS.filter((c) => c.id !== "Top 10 Games");
  const ordered = personalizedSectionOrder
    ? [...sections].sort((a, b) => personalizedSectionOrder.indexOf(a.id) - personalizedSectionOrder.indexOf(b.id))
    : sections;

  return (
    <>
      {ordered.map((config) => (
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
