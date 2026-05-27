import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ChevronRight, TrendingUp } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { getGamesByCategory } from "@/lib/game-utils";
import { useReducedMotion } from "@/hooks/use-mobile";

interface TrendingGamesSectionProps {
  overrideGames?: ReturnType<typeof getGamesByCategory>;
}

export function TrendingGamesSection({ overrideGames }: TrendingGamesSectionProps = {}) {
  const reduced = useReducedMotion();
  const topGames = overrideGames ?? getGamesByCategory("Top 10 Games", 12);
  if (topGames.length === 0) return null;

  return (
    <section className="relative py-14 sm:py-16 overflow-hidden">
      {/* bg */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(249,115,22,0.04), transparent)" }} />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.5), transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #f97316, #ef4444)", boxShadow: "0 8px 24px rgba(249,115,22,0.4)" }}>
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-orange-400 mb-1.5">
                <TrendingUp className="w-3 h-3" /> Hot this week
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">Trending Now</h2>
              <p className="text-white/35 text-sm mt-0.5">The games everyone is playing right now</p>
            </div>
          </div>
          <Link to="/category/Top%2010%20Games"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-400 hover:text-orange-300 hover:gap-2.5 transition-all shrink-0">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* scroll row */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {topGames.map((game, i) => (
            reduced ? (
              <div key={game.name} className="flex-shrink-0 w-36 sm:w-44 snap-start">
                <div className="relative">
                  {i < 3 && (
                    <span className="absolute -top-2 -left-1 z-10 px-2 py-0.5 rounded-md text-[10px] font-black text-white uppercase shadow-md"
                      style={{ background: "linear-gradient(135deg, #f97316, #ef4444)" }}>#{i + 1}</span>
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
                    <span className="absolute -top-2 -left-1 z-10 px-2 py-0.5 rounded-md text-[10px] font-black text-white uppercase shadow-md"
                      style={{ background: "linear-gradient(135deg, #f97316, #ef4444)" }}>#{i + 1}</span>
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
