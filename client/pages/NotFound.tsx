import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#030014]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.25),transparent_65%)]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-600/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-600/15 rounded-full blur-[100px] animate-float-delayed" />

      <motion.div
        className="relative text-center px-6 max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 rounded-3xl bg-violet-500/30 blur-2xl scale-150" />
          <div className="relative w-28 h-28 rounded-3xl gradient-brand flex items-center justify-center mx-auto glow-primary">
            <span className="text-4xl font-black text-white font-outfit">404</span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-white font-outfit mb-3">Level Not Found</h1>
        <p className="text-violet-300/70 mb-8 leading-relaxed">
          This page doesn&apos;t exist in our gaming universe. Head back home and keep playing!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary !rounded-xl">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white/80 hover:bg-white/10 hover:text-white transition-all font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
