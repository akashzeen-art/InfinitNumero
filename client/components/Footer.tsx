import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#030014] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="gradient-brand rounded-xl p-2 shadow-lg shadow-purple-500/20">
            <Gamepad2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-outfit font-extrabold text-lg text-white">InfinityPlay</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/categories" className="hover:text-white transition-colors">Categories</Link>
          <Link to="/category/Arcade" className="hover:text-white transition-colors">Arcade</Link>
          <Link to="/category/Puzzle" className="hover:text-white transition-colors">Puzzle</Link>
        </nav>

        <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} InfinityPlay. Free games, no limits.</p>
      </div>
    </footer>
  );
}
