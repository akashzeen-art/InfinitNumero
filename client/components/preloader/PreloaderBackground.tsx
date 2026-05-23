import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function Starfield({ count = 80 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={cn("absolute rounded-full bg-white", i % 6 === 0 ? "w-1 h-1" : "w-px h-px")}
          style={{ left: `${(i * 13.7) % 100}%`, top: `${(i * 19.3) % 100}%` }}
          animate={{ opacity: [0.04, 0.85, 0.04] }}
          transition={{ duration: 2 + (i % 5), repeat: Infinity, delay: i * 0.03 }}
        />
      ))}
    </>
  );
}

export function PreloaderBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#05020f]" />

      {/* Aurora */}
      <div className="absolute top-[-25%] left-[-15%] w-[75%] h-[75%] rounded-full bg-violet-600/35 blur-[130px] animate-aurora" />
      <div
        className="absolute bottom-[-25%] right-[-15%] w-[65%] h-[65%] rounded-full bg-fuchsia-600/28 blur-[110px] animate-aurora"
        style={{ animationDelay: "-5s" }}
      />
      <div
        className="absolute top-[30%] right-[5%] w-[45%] h-[45%] rounded-full bg-orange-500/18 blur-[90px] animate-aurora"
        style={{ animationDelay: "-9s" }}
      />
      <div
        className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-500/12 blur-[100px] animate-aurora"
        style={{ animationDelay: "-3s" }}
      />

      {/* Light rays */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 45%, transparent 0deg, rgba(139,92,246,0.8) 30deg, transparent 60deg, rgba(217,70,239,0.6) 120deg, transparent 150deg, rgba(251,146,60,0.5) 220deg, transparent 250deg)",
        }}
      />

      {/* Grid floor */}
      <div className="absolute inset-x-0 bottom-0 h-[50%] overflow-hidden opacity-25 pointer-events-none">
        <div
          className="absolute inset-0 animate-grid-drift"
          style={{
            backgroundImage: `
              linear-gradient(rgba(167,139,250,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(167,139,250,0.2) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            transformOrigin: "center top",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05020f] via-[#05020f]/60 to-transparent" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_0%,#05020f_68%)]" />
      <div className="absolute inset-0 preloader-noise opacity-30 pointer-events-none" />
      <Starfield />
    </div>
  );
}
