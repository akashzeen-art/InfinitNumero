import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ChevronRight, TrendingUp } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { getGamesByCategory } from "@/lib/game-utils";
import { useReducedMotion } from "@/hooks/use-mobile";

export function TrendingGamesSection() {
  const reduced = useReducedMotion();
  const topGames = getGamesByCategory("Top 10 Games", 12);
  if (topGames.length === 0) return null;

  return (
    <section className="relative py-14 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-violet-50/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                Hot this week
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-gray-900">Trending Now</h2>
              <p className="text-gray-500 mt-1">The games everyone is playing right now</p>
            </div>
          </div>
          <Link to="/category/Top%2010%20Games" className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:gap-2 transition-all shrink-0">
            See all trending <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {topGames.map((game, i) => (
            reduced ? (
              <div key={game.name} className="flex-shrink-0 w-36 sm:w-44 snap-start">
                <div className="relative">
                  {i < 3 && (
                    <span className="absolute -top-2 -left-1 z-10 px-2 py-0.5 rounded-md bg-gradient-to-r from-orange-500 to-red-500 text-[10px] font-black text-white uppercase shadow-md">#{i + 1}</span>
                  )}
                  <GameCard game={game} featured />
                </div>
              </div>
            ) : (
              <motion.div
                key={game.name}
                className="flex-shrink-0 w-36 sm:w-44 snap-start"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="relative">
                  {i < 3 && (
                    <span className="absolute -top-2 -left-1 z-10 px-2 py-0.5 rounded-md bg-gradient-to-r from-orange-500 to-red-500 text-[10px] font-black text-white uppercase shadow-md">#{i + 1}</span>
                  )}
                  <GameCard game={game} featured />
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
