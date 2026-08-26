import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, ArrowRight, Loader2, Smartphone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/i18n/LanguageContext";
import { CosmicBackground } from "@/components/CosmicBackground";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
];

export default function Login() {
  const { login } = useAuth();
  const { t } = useLang();
  const [countryCode, setCountryCode] = useState("+91");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = number.replace(/\D/g, "");
    if (digits.length < 7) {
      setError(t.login.invalidNumber);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await login(`${countryCode}${digits}`);
    } catch (err: any) {
      setError(err.message ?? t.login.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell min-h-[100svh] flex items-center justify-center px-4 py-8 sm:py-10 relative overflow-hidden">
      <CosmicBackground />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-[22rem] mx-auto"
      >
        {/* Brand */}
        <div className="flex flex-col items-center text-center mb-7">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl gradient-brand flex items-center justify-center shadow-xl shadow-cyan-500/25 mb-3.5">
            <Gamepad2 className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-extrabold text-gradient font-outfit leading-none">
            InfinityPlay
          </h1>
          <p className="text-sm text-white/50 mt-2 px-2">{t.login.subtitle}</p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl border border-white/10 backdrop-blur-xl p-5 sm:p-6 shadow-2xl overflow-hidden"
          style={{ background: "rgba(10,16,32,0.82)" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Smartphone className="w-4 h-4 text-cyan-300 shrink-0" />
            <h2 className="text-[15px] sm:text-base font-bold text-white leading-snug">
              {t.login.title}
            </h2>
          </div>
          <p className="text-xs text-white/45 mb-5 leading-relaxed">{t.login.noPassword}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Unified phone row — equal height, no overflowing focus ring */}
            <div
              className="flex items-stretch w-full rounded-2xl border transition-colors overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.06)",
                borderColor: focused
                  ? "rgba(34,211,238,0.55)"
                  : error
                    ? "rgba(248,113,113,0.55)"
                    : "rgba(255,255,255,0.14)",
                boxShadow: focused ? "0 0 0 3px rgba(34,211,238,0.18)" : "none",
              }}
            >
              <label className="sr-only" htmlFor="login-country">
                Country code
              </label>
              <select
                id="login-country"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="shrink-0 w-[5.75rem] h-12 pl-2.5 pr-1 bg-transparent text-white text-sm font-bold outline-none cursor-pointer appearance-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.45)' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.45rem center",
                }}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>

              <div className="w-px self-stretch my-2.5 bg-white/15 shrink-0" />

              <label className="sr-only" htmlFor="login-phone">
                Phone number
              </label>
              <input
                id="login-phone"
                type="tel"
                placeholder="9876543210"
                value={number}
                onChange={(e) => setNumber(e.target.value.replace(/[^\d\s]/g, ""))}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="min-w-0 flex-1 h-12 px-3 bg-transparent text-white placeholder:text-white/35 font-medium text-sm outline-none"
                autoFocus
                inputMode="numeric"
                autoComplete="tel-national"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 font-medium px-0.5">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-12 text-sm rounded-2xl disabled:opacity-60 disabled:pointer-events-none"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {t.login.continue}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-[10px] text-white/35 text-center mt-4 leading-relaxed px-1">
            {t.login.terms}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
