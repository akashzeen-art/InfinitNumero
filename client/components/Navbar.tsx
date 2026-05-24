import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, Gamepad2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const navLink = (path: string, label: string, match?: boolean) => (
    <Link
      to={path}
      className={cn(
        "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
        match
          ? "text-purple-700 bg-purple-100/80"
          : "text-gray-600 hover:text-purple-700 hover:bg-purple-50/80"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-purple-100/80 shadow-sm shadow-purple-500/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.25rem]">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="gradient-brand text-white rounded-xl p-2.5 shadow-md shadow-purple-500/20 group-hover:shadow-purple-500/40 group-hover:scale-105 transition-all duration-300">
              <Gamepad2 className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className="font-outfit font-extrabold text-xl text-gradient hidden sm:block">
              InfinityPlay
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLink("/", "Home", location.pathname === "/")}
            {navLink("/categories", "Categories", location.pathname.startsWith("/categor"))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search games…"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-48 lg:w-56 h-10 bg-white/80 border-purple-100 rounded-xl focus-visible:ring-purple-500/30 focus-visible:border-purple-300"
              />
            </div>
            <Link to="/#games" className="btn-primary text-sm !py-2.5 !px-5 !rounded-xl">
              <Play className="w-4 h-4 fill-current" />
              Play Now
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2.5 rounded-xl bg-white/80 border border-purple-100 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-5 space-y-2 border-t border-purple-100/60 pt-4">
            {navLink("/", "Home", location.pathname === "/")}
            {navLink("/categories", "Categories", location.pathname.startsWith("/categor"))}
            <div className="relative pt-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search games…"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-full h-11 rounded-xl"
              />
            </div>
            <Link to="/#games" className="btn-primary w-full !rounded-xl mt-2">
              <Play className="w-4 h-4 fill-current" />
              Play Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
