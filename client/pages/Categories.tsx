import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GameCard } from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { gamesData, Game } from "@/data/games";
import {
  ArrowLeft,
  Flame,
  Gamepad2,
  Puzzle,
  Swords,
  Star,
  Zap,
  Sparkles,
  ChevronRight,
  LayoutGrid,
  Play,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGamePlayer } from "@/contexts/GamePlayerContext";

type CategoryMeta = {
  icon: React.ReactNode;
  gradient: string;
  accent: string;
  description: string;
  featured?: boolean;
};

const CATEGORY_META: Record<string, CategoryMeta> = {
  "All Games": {
    icon: <Gamepad2 className="w-6 h-6" />,
    gradient: "from-violet-600 via-purple-600 to-indigo-800",
    accent: "shadow-violet-500/30",
    description: "Our full library — every game in one place",
    featured: true,
  },
  "Top 10 Games": {
    icon: <Flame className="w-6 h-6" />,
    gradient: "from-orange-500 via-red-500 to-rose-700",
    accent: "shadow-orange-500/35",
    description: "The hottest picks players love right now",
    featured: true,
  },
  Arcade: {
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-rose-500 via-pink-600 to-fuchsia-800",
    accent: "shadow-pink-500/30",
    description: "Fast reflexes, retro vibes, endless runs",
  },
  Puzzle: {
    icon: <Puzzle className="w-6 h-6" />,
    gradient: "from-cyan-500 via-blue-600 to-indigo-800",
    accent: "shadow-cyan-500/30",
    description: "Brain teasers, logic & satisfying solves",
  },
  Action: {
    icon: <Swords className="w-6 h-6" />,
    gradient: "from-red-500 via-orange-600 to-amber-700",
    accent: "shadow-red-500/30",
    description: "High-energy battles & thrilling adventures",
  },
  "Easy to Play": {
    icon: <Star className="w-6 h-6" />,
    gradient: "from-emerald-500 via-teal-600 to-cyan-800",
    accent: "shadow-emerald-500/30",
    description: "Jump in instantly — no learning curve",
  },
};

const DEFAULT_META: CategoryMeta = {
  icon: <Sparkles className="w-6 h-6" />,
  gradient: "from-indigo-500 via-violet-600 to-fuchsia-800",
  accent: "shadow-violet-500/30",
  description: "Discover something new to play",
};

function getCategoryPreviews(category: string, limit = 4): Game[] {
  return gamesData.filter((g) => g.categories.includes(category)).slice(0, limit);
}

function CategoryCard({
  name,
  meta,
  count,
  index,
  large,
}: {
  name: string;
  meta: CategoryMeta;
  count: number;
  index: number;
  large?: boolean;
}) {
  const previews = getCategoryPreviews(name, large ? 4 : 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className={cn(large && "sm:col-span-2")}
    >
      <Link
        to={`/category/${encodeURIComponent(name)}`}
        className={cn("group block h-full", large && "min-h-[280px]")}
      >
        <div
          className={cn(
            `relative overflow-hidden rounded-3xl bg-gradient-to-br ${meta.gradient} h-full`,
            "shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2",
            meta.accent,
            large ? "min-h-[280px] p-8 sm:p-10" : "min-h-[220px] p-6 sm:p-8"
          )}
        >
            {/* Decorative */}
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Preview thumbnails */}
            <div className="absolute top-4 right-4 flex -space-x-2">
              {previews.map((game, i) => (
                <div
                  key={game.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border-2 border-white/30 shadow-lg group-hover:-translate-y-1 transition-transform"
                  style={{ zIndex: previews.length - i, transitionDelay: `${i * 50}ms` }}
                >
                  <img src={game.thumbnail_url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="relative flex flex-col justify-between h-full min-h-[160px]">
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all">
                  {meta.icon}
                </div>
                <h3
                  className={cn(
                    "font-outfit font-extrabold text-white leading-tight mb-2",
                    large ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
                  )}
                >
                  {name}
                </h3>
                <p className="text-white/80 text-sm max-w-[240px] leading-relaxed">{meta.description}</p>
              </div>

              <div className="flex items-end justify-between mt-6 pt-4">
                <div>
                  <p className="text-4xl sm:text-5xl font-black text-white tabular-nums">{count}</p>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-wider">games</p>
                </div>
                <span className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/25 text-white text-sm font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Play className="w-4 h-4 fill-current" />
                  Play
                </span>
              </div>
            </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Categories() {
  const { category } = useParams<{ category?: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [localFilter, setLocalFilter] = useState("");

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    gamesData.forEach((g) => g.categories.forEach((c) => cats.add(c)));
    return Array.from(cats).sort();
  }, []);

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    allCategories.forEach((cat) => {
      stats[cat] = gamesData.filter((g) => g.categories.includes(cat)).length;
    });
    return stats;
  }, [allCategories]);

  const filteredCategories = useMemo(() => {
    if (!localFilter.trim()) return allCategories;
    const q = localFilter.toLowerCase();
    return allCategories.filter((c) => c.toLowerCase().includes(q));
  }, [allCategories, localFilter]);

  const featuredCats = useMemo(
    () => filteredCategories.filter((c) => CATEGORY_META[c]?.featured),
    [filteredCategories]
  );
  const otherCats = useMemo(
    () => filteredCategories.filter((c) => !CATEGORY_META[c]?.featured),
    [filteredCategories]
  );

  // ── hooks that depend on `category` must be called unconditionally ──
  const decoded = category ? decodeURIComponent(category) : "";
  const meta = CATEGORY_META[decoded] ?? DEFAULT_META;

  const gamesInCategory = useMemo(
    () =>
      gamesData
        .filter((g) => g.categories.includes(decoded))
        .filter((g) => g.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [decoded, searchQuery]
  );

  const relatedCategories = useMemo(
    () => allCategories.filter((c) => c !== decoded).slice(0, 5),
    [allCategories, decoded]
  );

  const { playGame } = useGamePlayer();

  if (!category) {
    return (
      <div className="page-shell mesh-bg min-h-screen">
        <Navbar onSearch={setSearchQuery} />

        {/* Hero */}
        <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 overflow-hidden">
          <div className="absolute inset-0 hero-mesh pointer-events-none" />
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-50 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 section-badge mb-5"
              >
                <LayoutGrid className="w-4 h-4 text-violet-600" />
                {allCategories.length} categories · {gamesData.length}+ games
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-outfit mb-4"
              >
                <span className="text-gray-900">Find Your </span>
                <span className="text-gradient">Perfect Game</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-lg mb-8"
              >
                Arcade thrills, brain-bending puzzles, or chill easy picks — explore by vibe.
              </motion.p>

              {/* Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative max-w-md mx-auto"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="search"
                  placeholder="Filter categories…"
                  value={localFilter}
                  onChange={(e) => setLocalFilter(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white/90 border border-violet-200/80 shadow-lg shadow-violet-500/5 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-300 text-gray-800 font-medium placeholder:text-gray-400"
                />
              </motion.div>
            </div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4"
            >
              {[
                { label: "Total Games", value: gamesData.length },
                { label: "Categories", value: allCategories.length },
                { label: "Always Free", value: "100%" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-violet-100 shadow-sm"
                >
                  <p className="text-xl font-black text-violet-600 tabular-nums">{s.value}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured categories */}
        {featuredCats.length > 0 && (
          <section className="pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <Flame className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-extrabold font-outfit text-gray-900">Featured Collections</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {featuredCats.map((cat, i) => (
                  <CategoryCard
                    key={cat}
                    name={cat}
                    meta={CATEGORY_META[cat] ?? DEFAULT_META}
                    count={categoryStats[cat]}
                    index={i}
                    large
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All categories */}
        <section className="pb-20 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <LayoutGrid className="w-5 h-5 text-violet-600" />
              <h2 className="text-xl font-extrabold font-outfit text-gray-900">All Categories</h2>
            </div>

            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {otherCats.map((cat, i) => (
                  <CategoryCard
                    key={cat}
                    name={cat}
                    meta={CATEGORY_META[cat] ?? DEFAULT_META}
                    count={categoryStats[cat]}
                    index={i + featuredCats.length}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card text-center py-16">
                <p className="text-gray-500">No categories match your search.</p>
                <Button variant="outline" className="mt-4 rounded-xl" onClick={() => setLocalFilter("")}>
                  Clear filter
                </Button>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="page-shell min-h-screen">
      <Navbar onSearch={setSearchQuery} />

      {/* Category hero */}
      <section className={`relative overflow-hidden`}>
        <div className={cn("absolute inset-0 bg-gradient-to-br", meta.gradient)} />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(255,255,255,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_100%,rgba(0,0,0,0.2),transparent_50%)]" />

        {/* Floating previews */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {getCategoryPreviews(decoded, 6).map((game, i) => (
            <motion.div
              key={game.name}
              className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/20 rotate-12"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{ y: [0, -15, 0], rotate: [12, 18, 12] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={game.thumbnail_url} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-sm mb-8 hover:bg-white/25 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Categories
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="flex items-start gap-5 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 shadow-xl">
                {meta.icon}
              </div>
              <div>
                <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-2">Category</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-outfit leading-tight">
                  {decoded}
                </h1>
                <p className="text-white/85 mt-3 text-lg max-w-lg">{meta.description}</p>
                <div className="flex flex-wrap gap-3 mt-5">
                  <span className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm text-white font-bold text-sm border border-white/20">
                    {gamesInCategory.length} games
                  </span>
                  <span className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm text-white font-bold text-sm border border-white/20 flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 fill-current" /> Instant play
                  </span>
                </div>
              </div>
            </div>

            {/* Preview strip */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide lg:max-w-md">
              {getCategoryPreviews(decoded, 5).map((game) => (
                <button
                  key={game.name}
                  type="button"
                  onClick={() => playGame(game)}
                  className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/30 shadow-xl hover:scale-105 hover:border-white transition-all"
                >
                  <img src={game.thumbnail_url} alt={game.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wave into content */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path d="M0 60V40C240 20 480 55 720 45C960 35 1200 50 1440 35V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Games grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Related categories */}
          {relatedCategories.length > 0 && (
            <div className="mb-10">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Also explore</p>
              <div className="flex flex-wrap gap-2">
                {relatedCategories.map((cat) => {
                  const m = CATEGORY_META[cat] ?? DEFAULT_META;
                  return (
                    <Link
                      key={cat}
                      to={`/category/${encodeURIComponent(cat)}`}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-br shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all",
                        m.gradient
                      )}
                    >
                      <span className="opacity-90">{m.icon}</span>
                      {cat}
                      <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-extrabold font-outfit text-gray-900">
              All {decoded} Games
            </h2>
            <p className="text-sm font-semibold text-gray-500">{gamesInCategory.length} results</p>
          </div>

          {gamesInCategory.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.03 } },
              }}
            >
              {gamesInCategory.map((game) => (
                <motion.div
                  key={game.name}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <GameCard
                    game={game}
                    featured={game.categories.includes("Top 10 Games")}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="glass-card text-center py-20 px-6">
              <span className="text-6xl block mb-4">🔍</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No games found</h3>
              <p className="text-gray-500 mb-6">Try a different search term</p>
              <Button variant="outline" className="rounded-xl border-violet-200" onClick={() => setSearchQuery("")}>
                Reset search
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
