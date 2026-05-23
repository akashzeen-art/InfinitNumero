import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

export function PlayCtaBanner() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 gradient-brand" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent_45%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSIjZmZmIiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjxwYXRoIGQ9Ik0gNjBMNjAgNjBoNjBIMTYgNjBoMTZoMTYiLz48L3N2Zz4=')] opacity-30" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-bold mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            100% free forever
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 font-outfit">
            Ready to play?
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-xl mx-auto">
            Hundreds of games waiting for you. No signup, no download — jump in and start playing instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="#games"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-violet-700 font-bold text-lg shadow-2xl hover:scale-105 transition-transform"
            >
              <Play className="w-5 h-5 fill-current" />
              Browse All Games
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/40 text-white font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Explore Categories
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
