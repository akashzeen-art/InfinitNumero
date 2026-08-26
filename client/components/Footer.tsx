import { ScrollLink } from "@/components/ScrollLink";
import { Gamepad2, Brain } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLang();
  const LINKS = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.categories, to: "/categories" },
    { label: t.nav.profile, to: "/profile" },
  ];

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{ borderColor: "rgba(148,163,184,0.12)", background: "rgba(2,6,23,0.65)" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(34,211,238,0.5), transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
          <div>
            <ScrollLink to="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/40 transition-shadow">
                <Gamepad2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-outfit font-extrabold text-xl text-gradient">InfinityPlay</span>
            </ScrollLink>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.25)" }}
              >
                <Brain className="w-3 h-3 text-cyan-300" />
                <span className="text-[10px] font-black text-cyan-300 uppercase tracking-wider">
                  AI Powered
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">
              {t.footer.navigate}
            </p>
            <ul className="space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <ScrollLink
                    to={l.to}
                    className="text-sm text-white/45 hover:text-cyan-300 transition-colors font-medium"
                  >
                    {l.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(148,163,184,0.1)" }}
        >
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} InfinityPlay. Free games, no limits.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/30 font-medium">{t.footer.status}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
