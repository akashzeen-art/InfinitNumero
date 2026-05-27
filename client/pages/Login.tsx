import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, ArrowRight, Loader2, Smartphone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
];

export default function Login() {
  const { login } = useAuth();
  const [countryCode, setCountryCode] = useState("+91");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = number.replace(/\D/g, "");
    if (digits.length < 7) {
      setError("Enter a valid mobile number");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await login(`${countryCode}${digits}`);
    } catch (err: any) {
      setError(err.message ?? "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05020f] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 flex items-center justify-center shadow-2xl shadow-violet-500/40 mb-4">
            <Gamepad2 className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-extrabold text-white font-outfit">InfinityPlay</h1>
          <p className="text-sm text-white/50 mt-1">Your AI-powered gaming hub</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-1">
            <Smartphone className="w-4 h-4 text-violet-400" />
            <h2 className="text-base font-bold text-white">Enter your mobile number</h2>
          </div>
          <p className="text-xs text-white/40 mb-5">No password needed. Just your number.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="shrink-0 h-12 px-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-gray-900">
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                placeholder="9876543210"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="flex-1 h-12 px-4 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
                autoFocus
                inputMode="tel"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 font-medium px-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:pointer-events-none"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Continue to Play
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-[10px] text-white/25 text-center mt-4 leading-relaxed">
            By continuing you agree to our terms. Your number is used only for your gaming profile.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
