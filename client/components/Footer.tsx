import { ScrollLink } from "@/components/ScrollLink";
import { Gamepad2, Zap, Puzzle, Swords, Star, Brain } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLang();
  const LINKS = [
    { label: t.nav.home,       to: "/" },
    { label: t.nav.categories, to: "/categories" },
    { label: t.nav.profile,    to: "/profile" },
  ];
  const CATS = [
    { label: "Arcade",        to: "/category/Arcade",           icon: Zap,    color: "text-pink-400" },
    { label: "Puzzle",        to: "/category/Puzzle",           icon: Puzzle, color: "text-cyan-400" },
    { label: "Action",        to: "/category/Action",           icon: Swords, color: "text-red-400" },
    { label: "Easy to Play",  to: "/category/Easy%20to%20Play", icon: Star,   color: "text-emerald-400" },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-white/5" style={{ background: "#030010" }}>
      {/* grid bg */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      {/* top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* brand */}
          <div>
            <ScrollLink to="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
                <Gamepad2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-outfit font-extrabold text-xl text-gradient">InfinityPlay</span>
            </ScrollLink>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/25">
                <Brain className="w-3 h-3 text-violet-400" />
                <span className="text-[10px] font-black text-violet-400 uppercase tracking-wider">AI Powered</span>
              </div>
            </div>
          </div>

          {/* nav */}
          <div>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">{t.footer.navigate}</p>
            <ul className="space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <ScrollLink to={l.to} className="text-sm text-white/45 hover:text-violet-400 transition-colors font-medium">
                    {l.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* categories */}
          <div>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">{t.footer.categories}</p>
            <ul className="space-y-2.5">
              {CATS.map((c) => (
                <li key={c.to}>
                  <ScrollLink to={c.to} className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white/80 transition-colors font-medium group">
                    <c.icon className={`w-3.5 h-3.5 ${c.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                    {c.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} InfinityPlay. Free games, no limits.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/25 font-medium">{t.footer.status}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
