import { motion } from "framer-motion";
import { Search, LayoutGrid, Sparkles } from "lucide-react";
import { gamesData } from "@/data/games";
import { useGamesFilter } from "@/hooks/useGamesFilter";
import { CategoryFilterBar } from "./CategoryFilterBar";
import { GamesGrid } from "./GamesGrid";
import { GamesEmptyState } from "./GamesEmptyState";

interface GamesCatalogSectionProps {
  searchQuery?: string;
}

export function GamesCatalogSection({ searchQuery = "" }: GamesCatalogSectionProps) {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredGames,
    resetFilters,
  } = useGamesFilter(searchQuery);

  const categoryCounts = Object.fromEntries(
    categories.map((cat) => [
      cat,
      cat === "All Games"
        ? gamesData.length
        : gamesData.filter((g) => g.categories.includes(cat)).length,
    ])
  );

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden" id="games">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50/40 via-white to-white pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 section-badge mb-5">
            <LayoutGrid className="w-4 h-4 text-violet-600" />
            Full game library
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-outfit text-gray-900 mb-3">
            Browse the{" "}
            <span className="text-gradient">Complete Collection</span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg">
            {gamesData.length} free games — filter by category or search by name
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-violet-100 bg-white/80 backdrop-blur-sm shadow-xl shadow-violet-500/5 p-5 sm:p-6 mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <Sparkles className="w-4 h-4 text-violet-500" />
              {filteredGames.length} games
              {selectedCategory !== "All Games" && (
                <span className="text-violet-600">in {selectedCategory}</span>
              )}
            </div>
            {searchQuery && (
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-violet-50 px-3 py-1.5 rounded-lg">
                <Search className="w-3.5 h-3.5 text-violet-500" />
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
          <GamesEmptyState
            onReset={() => {
              resetFilters();
            }}
          />
        )}
      </div>
    </section>
  );
}
