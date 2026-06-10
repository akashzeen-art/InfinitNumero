import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Brain, Zap } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function PlayCtaBanner() {
  const { t } = useLang();
  return (
    <section className="relative py-20 sm:py-28">
      {/* bg */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0c0618 0%, #1a0533 40%, #0c0618 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.25), transparent 55%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(236,72,153,0.15), transparent 55%)" }} />
      {/* grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      {/* top/bottom borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold text-violet-300"
            style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
            <Brain className="w-4 h-4" />
            {t.cta.badge}
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 font-outfit leading-tight">
            {t.cta.title}
            <br />
            <span className="text-gradient">{t.cta.titleGradient}</span>
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            {t.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="#games"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)", boxShadow: "0 8px 32px rgba(139,92,246,0.5)" }}
            >
              <Play className="w-5 h-5 fill-current" />
              {t.cta.browseAll}
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg text-white/70 hover:text-white transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <Zap className="w-5 h-5" />
              {t.cta.exploreCategories}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
