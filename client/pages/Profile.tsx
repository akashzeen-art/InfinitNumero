import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import {
  Gamepad2, LogOut, Zap, Puzzle, Swords, Star, Flame,
  Clock, History, ChevronRight, Brain, Cpu, Activity,
  TrendingUp, Shield, Sparkles, Radio,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GameCard } from "@/components/GameCard";
import { useAuth } from "@/context/AuthContext";
import { useAIProfile } from "@/context/AIProfileContext";
import { gamesData } from "@/data/games";
import { useLang } from "@/i18n/LanguageContext";

const CAT_META: Record<string, { icon: React.ReactNode; color: string; glow: string }> = {
  Action:         { icon: <Swords className="w-4 h-4" />, color: "from-red-500 to-orange-500",   glow: "shadow-red-500/40" },
  Arcade:         { icon: <Zap    className="w-4 h-4" />, color: "from-pink-500 to-fuchsia-600", glow: "shadow-pink-500/40" },
  Puzzle:         { icon: <Puzzle className="w-4 h-4" />, color: "from-cyan-500 to-blue-600",    glow: "shadow-cyan-500/40" },
  "Easy to Play": { icon: <Star   className="w-4 h-4" />, color: "from-emerald-400 to-teal-500", glow: "shadow-emerald-500/40" },
  "Top 10 Games": { icon: <Flame  className="w-4 h-4" />, color: "from-amber-400 to-orange-500", glow: "shadow-amber-500/40" },
};

const STYLE_META: Record<string, { icon: React.ReactNode; color: string; particle: string }> = {
  competitive: { icon: <Swords   className="w-5 h-5" />, color: "from-red-500 via-orange-500 to-amber-400",    particle: "bg-red-400" },
  casual:      { icon: <Star     className="w-5 h-5" />, color: "from-emerald-400 via-teal-500 to-cyan-500",   particle: "bg-emerald-400" },
  explorer:    { icon: <Sparkles className="w-5 h-5" />, color: "from-violet-500 via-fuchsia-500 to-pink-500", particle: "bg-violet-400" },
};

function formatTime(s: number) {
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  return `${(s / 3600).toFixed(1)}h`;
}

function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };
  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

function Particle({ color, delay, x, y }: { color: string; delay: number; x: string; y: string }) {
  return (
    <motion.div
      className={`absolute w-1 h-1 rounded-full ${color} opacity-60`}
      style={{ left: x, top: y }}
      animate={{ y: [0, -40, 0], opacity: [0.6, 1, 0.6], scale: [1, 1.5, 1] }}
      transition={{ duration: 3 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function InsightChip({ text, icon }: { text: string; icon: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium backdrop-blur-sm">
      <span className="text-violet-400">{icon}</span>
      {text}
    </div>
  );
}

export default function Profile() {
  const { user, logout } = useAuth();
  const { profile } = useAIProfile();
  const { t } = useLang();
  const tilt = useTilt();
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const recentlyPlayed = profile.recentlyPlayed
    .map((n) => gamesData.find((g) => g.name === n))
    .filter(Boolean) as typeof gamesData;

  const topInterests = Object.entries(profile.interests)
    .filter(([c]) => c !== "All Games")
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxScore = topInterests[0]?.[1] ?? 1;
  const baseMeta = STYLE_META[profile.playStyle] ?? STYLE_META.explorer;
  const styleKey = profile.playStyle as "competitive" | "casual" | "explorer";
  const styleLabel = t.profile[styleKey] ?? styleKey;
  const styleDesc = t.profile[`${styleKey}Desc` as keyof typeof t.profile] as string ?? "";
  const engagementScore = Math.min(100, Math.round((profile.sessionsCount / 20) * 100));

  const aiInsights = [
    profile.sessionsCount > 0 && `${profile.sessionsCount} sessions`,
    topInterests[0] && `Top: ${topInterests[0][0]}`,
    profile.totalPlayTime > 0 && formatTime(profile.totalPlayTime),
    topInterests.length >= 3 && `${topInterests.length} genres`,
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-[#05020f] overflow-x-hidden">
      {/* bg */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(139,92,246,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(236,72,153,0.1),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">

          {/* HERO CARD */}
          <motion.div
            ref={tilt.ref}
            style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 1000 }}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden cursor-default"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 opacity-60" />
            <div className="absolute inset-[1px] rounded-3xl bg-[#0c0618]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(139,92,246,0.3),transparent_60%)] pointer-events-none" />
            {[...Array(8)].map((_, i) => (
              <Particle key={i} color={baseMeta.particle} delay={i * 0.4} x={`${10 + i * 11}%`} y={`${20 + (i % 3) * 25}%`} />
            ))}
            <div className="relative px-6 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-center gap-6">
              {/* avatar */}
              <div className="relative shrink-0">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${baseMeta.color.replace("from-","").replace(" via-",", ").replace(" to-",", ")})` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative w-20 h-20 rounded-full bg-[#0c0618] border-2 border-white/10 flex items-center justify-center m-[3px]">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${baseMeta.color} flex items-center justify-center shadow-2xl`}>
                    <Gamepad2 className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0c0618]">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                </span>
              </div>
              {/* info */}
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[10px] font-black uppercase tracking-widest mb-2">
                  <Brain className="w-3 h-3" /> {t.profile.aiActive}
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white font-outfit mb-1 truncate">{user?.msisdn}</h1>
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r ${baseMeta.color} text-white text-xs font-black shadow-lg mb-2`}>
                  {baseMeta.icon} {styleLabel}
                </div>
                <p className="text-white/40 text-xs">{styleDesc}</p>
                {aiInsights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {aiInsights.map((txt) => <InsightChip key={txt} text={txt} icon={<Cpu className="w-3 h-3" />} />)}
                  </div>
                )}
              </div>
              <button onClick={logout}
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-bold hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 transition-all">
                <LogOut className="w-4 h-4" /> {t.profile.signOut}
              </button>
            </div>
          </motion.div>

          {/* STATS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: <Gamepad2   className="w-5 h-5" />, label: t.profile.sessions,   value: profile.sessionsCount,            color: "text-violet-400",  bg: "from-violet-500/20 to-violet-600/5",  border: "border-violet-500/20" },
              { icon: <Clock      className="w-5 h-5" />, label: t.profile.playTime,   value: formatTime(profile.totalPlayTime), color: "text-fuchsia-400", bg: "from-fuchsia-500/20 to-fuchsia-600/5", border: "border-fuchsia-500/20" },
              { icon: <Activity   className="w-5 h-5" />, label: t.profile.engagement, value: `${engagementScore}%`,            color: "text-orange-400",  bg: "from-orange-500/20 to-orange-600/5",  border: "border-orange-500/20" },
              { icon: <TrendingUp className="w-5 h-5" />, label: t.profile.genres,     value: topInterests.length,              color: "text-cyan-400",    bg: "from-cyan-500/20 to-cyan-600/5",     border: "border-cyan-500/20" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.07 }}
                className={`relative rounded-2xl bg-gradient-to-br ${s.bg} border ${s.border} px-5 py-5 overflow-hidden`}>
                <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-white/3 blur-xl" />
                <div className={`${s.color} mb-2`}>{s.icon}</div>
                <p className={`text-2xl font-black tabular-nums ${s.color}`}>{s.value}</p>
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* INTEREST GRAPH */}
          {topInterests.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="rounded-3xl bg-white/[0.03] border border-white/8 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-white font-outfit">{t.profile.interestGraph}</h2>
                    <p className="text-[10px] text-white/30">{t.profile.interestSubtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/25">
                  <Radio className="w-3 h-3 text-violet-400 animate-pulse" />
                  <span className="text-[10px] font-black text-violet-400 uppercase tracking-wider">{t.profile.live}</span>
                </div>
              </div>
              <div className="px-6 py-5 space-y-4">
                {topInterests.map(([cat, score], i) => {
                  const pct = Math.round((score / maxScore) * 100);
                  const meta = CAT_META[cat];
                  return (
                    <motion.div key={cat} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                      onMouseEnter={() => setHoveredBar(cat)} onMouseLeave={() => setHoveredBar(null)} className="group cursor-default">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${meta?.color ?? "from-violet-500 to-fuchsia-500"} flex items-center justify-center text-white shadow-lg ${hoveredBar === cat ? meta?.glow ?? "" : ""} transition-shadow`}>
                            {meta?.icon ?? <Gamepad2 className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{cat}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white/50 tabular-nums">{pct}%</span>
                          {i === 0 && <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[9px] font-black uppercase">{t.profile.top}</span>}
                        </div>
                      </div>
                      <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${meta?.color ?? "from-violet-500 to-fuchsia-500"}`}
                          initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.35 + i * 0.1, ease: "easeOut" }} />
                        <motion.div className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ left: ["-10%", "110%"] }} transition={{ duration: 2, delay: 1 + i * 0.2, repeat: Infinity, repeatDelay: 3 }} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ENGAGEMENT + AI STATUS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white/[0.03] border border-white/8 px-6 py-6 flex items-center gap-5">
              <div className="relative w-20 h-20 shrink-0">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="8" />
                  <motion.circle cx="40" cy="40" r="32" fill="none" stroke="url(#engGrad)" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 32}`}
                    strokeDashoffset={2 * Math.PI * 32}
                    initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - engagementScore / 100) }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }} />
                  <defs>
                    <linearGradient id="engGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-black text-white tabular-nums">{engagementScore}%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Shield className="w-4 h-4 text-violet-400" />
                  <span className="text-sm font-extrabold text-white font-outfit">{t.profile.engagementScore}</span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  {engagementScore < 30 ? t.profile.engagementLow : engagementScore < 70 ? t.profile.engagementMid : t.profile.engagementHigh}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white/[0.03] border border-white/8 px-6 py-6">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-4 h-4 text-fuchsia-400" />
                <span className="text-sm font-extrabold text-white font-outfit">{t.profile.aiStatus}</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: t.profile.behaviorTracking,   active: true },
                  { label: t.profile.interestModeling,   active: profile.sessionsCount >= 1 },
                  { label: t.profile.recommendations,    active: profile.sessionsCount >= 3 },
                  { label: t.profile.playStyleDetection, active: profile.sessionsCount >= 3 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-white/50">{item.label}</span>
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${item.active ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-white/20 border border-white/5"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-emerald-400 animate-pulse" : "bg-white/20"}`} />
                      {item.active ? t.profile.active : t.profile.pending}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RECENTLY PLAYED */}
          {recentlyPlayed.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="rounded-3xl bg-white/[0.03] border border-white/8 px-6 py-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center">
                  <History className="w-4 h-4 text-fuchsia-400" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-white font-outfit">{t.profile.recentlyPlayed}</h2>
                  <p className="text-[10px] text-white/30">{recentlyPlayed.length} {t.profile.recentlyPlayedSub}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
                {recentlyPlayed.slice(0, 12).map((game, i) => (
                  <motion.div key={game.name} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45 + i * 0.04 }}>
                    <GameCard game={game} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* EMPTY STATE */}
          {profile.sessionsCount === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="rounded-3xl bg-white/[0.03] border border-white/8 text-center py-20 px-6">
              <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl mb-5 block">🎮</motion.div>
              <h3 className="text-xl font-black text-white mb-2 font-outfit">{t.profile.emptyTitle}</h3>
              <p className="text-white/40 mb-7 text-sm max-w-xs mx-auto">{t.profile.emptySubtitle}</p>
              <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 text-white font-bold text-sm shadow-lg shadow-violet-500/30 hover:scale-105 transition-transform">
                <ChevronRight className="w-4 h-4" /> {t.profile.startPlaying}
              </Link>
            </motion.div>
          )}

        </div>
        <Footer />
      </div>
    </div>
  );
}
