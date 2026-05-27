import { motion } from "framer-motion";
import { Brain, Cpu } from "lucide-react";
import { Game } from "@/data/games";
import { GameCard } from "@/components/GameCard";
import { useReducedMotion } from "@/hooks/use-mobile";

interface RecommendedGamesSectionProps {
  games: Game[];
  playStyle: string;
}

const STYLE_LABEL: Record<string, string> = {
  competitive: "Tuned for your competitive style",
  casual:      "Curated for your relaxed sessions",
  explorer:    "Handpicked across your interests",
};

export function RecommendedGamesSection({ games, playStyle }: RecommendedGamesSectionProps) {
  const reduced = useReducedMotion();
  if (games.length === 0) return null;

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      {/* bg glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.08), transparent 60%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-start gap-4 mb-8"
        >
          <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #db2777, #f97316)", boxShadow: "0 8px 24px rgba(139,92,246,0.4)" }}>
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", color: "#c4b5fd" }}>
                <Cpu className="w-3 h-3" /> AI Recommended
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">Picked For You</h2>
            <p className="text-white/35 text-sm mt-0.5">{STYLE_LABEL[playStyle] ?? "Based on your play history"}</p>
          </div>
        </motion.div>

        {/* scroll row */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {games.map((game, i) =>
            reduced ? (
              <div key={game.name} className="flex-shrink-0 w-36 sm:w-44 snap-start">
                <GameCard game={game} />
              </div>
            ) : (
              <motion.div
                key={game.name}
                className="flex-shrink-0 w-36 sm:w-44 snap-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
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
