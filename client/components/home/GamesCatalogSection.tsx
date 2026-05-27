import { motion } from "framer-motion";
import { Search, LayoutGrid, Sparkles, Database } from "lucide-react";
import { gamesData } from "@/data/games";
import { useGamesFilter } from "@/hooks/useGamesFilter";
import { CategoryFilterBar } from "./CategoryFilterBar";
import { GamesGrid } from "./GamesGrid";
import { GamesEmptyState } from "./GamesEmptyState";

interface GamesCatalogSectionProps {
  searchQuery?: string;
}

export function GamesCatalogSection({ searchQuery = "" }: GamesCatalogSectionProps) {
  const { categories, selectedCategory, setSelectedCategory, filteredGames, resetFilters } = useGamesFilter(searchQuery);

  const categoryCounts = Object.fromEntries(
    categories.map((cat) => [
      cat,
      cat === "All Games" ? gamesData.length : gamesData.filter((g) => g.categories.includes(cat)).length,
    ])
  );

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden" id="games">
      {/* bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.06), transparent 60%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14"
        >
          <div className="section-badge mb-5">
            <Database className="w-4 h-4" />
            Full game library
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-white mb-3">
            Browse the{" "}
            <span className="text-gradient">Complete Collection</span>
          </h2>
          <p className="text-white/35 text-base sm:text-lg">
            {gamesData.length} free games — filter by category or search by name
          </p>
        </motion.div>

        {/* filter panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-5 sm:p-6 mb-10"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/50">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-white/70">{filteredGames.length}</span> games
              {selectedCategory !== "All Games" && (
                <span className="text-violet-400">in {selectedCategory}</span>
              )}
            </div>
            {searchQuery && (
              <div className="flex items-center gap-2 text-sm text-white/40 px-3 py-1.5 rounded-lg"
                style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
                <Search className="w-3.5 h-3.5 text-violet-400" />
                Searching: &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
          <CategoryFilterBar
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            counts={categoryCounts}
          />
        </motion.div>

        {filteredGames.length > 0 ? (
          <GamesGrid games={filteredGames} />
        ) : (
          <GamesEmptyState onReset={resetFilters} />
        )}
      </div>
    </section>
  );
}
