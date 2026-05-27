import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Game } from "@/data/games";
import { GameCard } from "@/components/GameCard";
import { useReducedMotion } from "@/hooks/use-mobile";

interface BecauseYouPlayedSectionProps {
  category: string;
  games: Game[];
}

export function BecauseYouPlayedSection({ category, games }: BecauseYouPlayedSectionProps) {
  const reduced = useReducedMotion();
  if (games.length === 0) return null;

  return (
    <section className="relative py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)", boxShadow: "0 6px 20px rgba(249,115,22,0.35)" }}>
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-0.5">
              Because you love {category}
            </p>
            <h2 className="text-lg font-extrabold font-outfit text-white">More {category} Games</h2>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
          {games.map((game, i) =>
            reduced ? (
              <div key={game.name} className="flex-shrink-0 w-36 sm:w-40 snap-start">
                <GameCard game={game} />
              </div>
            ) : (
              <motion.div
                key={game.name}
                className="flex-shrink-0 w-36 sm:w-40 snap-start"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
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
