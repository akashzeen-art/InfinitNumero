import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, Gamepad2, Play, User, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/translations";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
];

export function Navbar({ onSearch }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLang();
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowUserMenu(false);
    setShowLangMenu(false);
  }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setShowLangMenu(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const avatarLabel = user?.msisdn?.slice(-4) ?? "??";
  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

  const navLink = (path: string, label: string, match?: boolean) => (
    <Link
      to={path}
      className={cn(
        "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
        match
          ? "text-violet-400 bg-violet-500/15"
          : "text-white/60 hover:text-white hover:bg-white/8"
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
          ? "backdrop-blur-xl border-b shadow-sm"
          : "bg-transparent"
      )}
      style={isScrolled ? { background: "rgba(5,2,15,0.85)", borderColor: "rgba(139,92,246,0.2)" } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.25rem]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="gradient-brand text-white rounded-xl p-2.5 shadow-md shadow-violet-500/30 group-hover:shadow-violet-500/50 group-hover:scale-105 transition-all duration-300">
              <Gamepad2 className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className="font-outfit font-extrabold text-xl text-gradient hidden sm:block">
              InfinityPlay
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLink("/", t.nav.home, location.pathname === "/")}
            {navLink("/categories", t.nav.categories, location.pathname.startsWith("/categor"))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input
                type="search"
                placeholder={t.nav.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-48 lg:w-56 h-10 rounded-xl text-white placeholder:text-white/30 focus-visible:ring-violet-500/30"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>

            {/* Language dropdown */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setShowLangMenu((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-white/70 hover:text-white transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <span>{currentLang.flag}</span>
                <span className="hidden lg:block">{currentLang.label}</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showLangMenu && "rotate-180")} />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 top-12 w-40 rounded-2xl overflow-hidden z-50 shadow-2xl"
                  style={{ background: "rgba(12,6,24,0.97)", border: "1px solid rgba(139,92,246,0.3)" }}>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors",
                        lang === l.code ? "text-violet-400 bg-violet-500/15" : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span className="text-base">{l.flag}</span>
                      {l.label}
                      {lang === l.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Play Now */}
            <Link to="/#games" className="btn-primary text-sm !py-2.5 !px-5 !rounded-xl">
              <Play className="w-4 h-4 fill-current" />
              {t.nav.playNow}
            </Link>

            {/* User avatar */}
            {user && (
              <div className="relative" ref={userRef}>
                <button
                  type="button"
                  onClick={() => setShowUserMenu((v) => !v)}
                  className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white text-xs font-black shadow-md shadow-violet-500/30 hover:scale-105 transition-transform"
                  aria-label="User menu"
                >
                  {avatarLabel}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-12 w-48 rounded-2xl overflow-hidden z-50 shadow-2xl"
                    style={{ background: "rgba(12,6,24,0.97)", border: "1px solid rgba(139,92,246,0.3)" }}>
                    <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="text-xs text-white/30 font-medium">{t.nav.signedInAs}</p>
                      <p className="text-sm font-bold text-white truncate">{user.msisdn}</p>
                    </div>
                    <Link to="/profile"
                      className="flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                      <User className="w-4 h-4" />
                      {t.nav.profile}
                    </Link>
                    <button type="button" onClick={logout}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors">
                      <LogOut className="w-4 h-4" />
                      {t.nav.signOut}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2.5 rounded-xl text-white/70"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-5 space-y-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {navLink("/", t.nav.home, location.pathname === "/")}
            {navLink("/categories", t.nav.categories, location.pathname.startsWith("/categor"))}
            {user && navLink("/profile", t.nav.profile, location.pathname === "/profile")}

            {/* Mobile search */}
            <div className="relative pt-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input
                type="search"
                placeholder={t.nav.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-full h-11 rounded-xl text-white placeholder:text-white/30"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>

            {/* Mobile language switcher */}
            <div className="flex gap-2 pt-1">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all",
                    lang === l.code ? "text-white" : "text-white/40"
                  )}
                  style={lang === l.code
                    ? { background: "linear-gradient(135deg, #7c3aed, #db2777)", border: "1px solid rgba(139,92,246,0.5)" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }
                  }
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>

            <Link to="/#games" className="btn-primary w-full !rounded-xl mt-2">
              <Play className="w-4 h-4 fill-current" />
              {t.nav.playNow}
            </Link>

            {user && (
              <button type="button" onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-400 transition-colors"
                style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.05)" }}>
                <LogOut className="w-4 h-4" />
                {t.nav.signOut}
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
