import { Link } from "react-router-dom";
import { Gamepad2, Heart } from "lucide-react";

const links = {
  categories: [
    { label: "Arcade", path: "/category/Arcade" },
    { label: "Puzzle", path: "/category/Puzzle" },
    { label: "Action", path: "/category/Action" },
    { label: "Top 10", path: "/category/Top%2010%20Games" },
  ],
  explore: [
    { label: "All Games", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: "Easy to Play", path: "/category/Easy%20to%20Play" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-[#030014] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.2),transparent_60%)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="gradient-brand rounded-xl p-2.5 shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-outfit font-extrabold text-2xl bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                Play365
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your ultimate free gaming hub. Play instantly in your browser — no downloads, no limits.
            </p>
          </div>

          <div>
            <h5 className="font-outfit font-bold text-violet-300 mb-4">Categories</h5>
            <ul className="space-y-2.5">
              {links.categories.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-outfit font-bold text-violet-300 mb-4">Explore</h5>
            <ul className="space-y-2.5">
              {links.explore.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-outfit font-bold text-violet-300 mb-4">Community</h5>
            <p className="text-gray-500 text-sm mb-4">Join gamers worldwide</p>
            <div className="flex flex-wrap gap-2">
              {["Twitter", "Discord", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:bg-white/10 hover:border-violet-500/40 transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Play365. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-gray-600">
            Made with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> for gamers
          </p>
        </div>
      </div>
    </footer>
  );
}
