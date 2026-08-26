import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Brain, Zap } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function PlayCtaBanner() {
  const { t } = useLang();
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(8,145,178,0.22), transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(192,38,211,0.12), transparent 55%)",
        }}
      />
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(34,211,238,0.45), transparent)" }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(232,121,249,0.35), transparent)" }}
      />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-badge mb-6">
            <Brain className="w-4 h-4" />
            {t.cta.badge}
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 font-outfit leading-tight">
            {t.cta.title}
            <br />
            <span className="text-gradient">{t.cta.titleGradient}</span>
          </h2>
          <p className="text-lg text-white/45 mb-10 max-w-xl mx-auto">{t.cta.subtitle}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="#games" className="btn-primary px-8 py-4 text-lg">
              <Play className="w-5 h-5 fill-current" />
              {t.cta.browseAll}
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg text-white/70 hover:text-white transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(148,163,184,0.2)",
              }}
            >
              <Zap className="w-5 h-5 text-cyan-300" />
              {t.cta.exploreCategories}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
