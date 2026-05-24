import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-mobile";

function Starfield({ count = 60, seed = 0 }: { count?: number; seed?: number }) {
  const reduced = useReducedMotion();
  // On mobile render fewer, static stars
  const actualCount = reduced ? Math.floor(count / 3) : count;

  return (
    <>
      {Array.from({ length: actualCount }).map((_, i) => {
        const s = i + seed;
        const big = s % 7 === 0;
        return reduced ? (
          <div
            key={i}
            className={cn("absolute rounded-full bg-white", big ? "w-[3px] h-[3px]" : "w-px h-px")}
            style={{ left: `${(s * 13.7) % 100}%`, top: `${(s * 19.3) % 100}%`, opacity: big ? 0.5 : 0.25 }}
          />
        ) : (
          <motion.div
            key={i}
            className={cn("absolute rounded-full bg-white", big ? "w-[3px] h-[3px]" : "w-px h-px")}
            style={{ left: `${(s * 13.7) % 100}%`, top: `${(s * 19.3) % 100}%` }}
            animate={{ opacity: [0.03, big ? 1 : 0.7, 0.03] }}
            transition={{ duration: 2.5 + (s % 5), repeat: Infinity, delay: s * 0.025 }}
          />
        );
      })}
    </>
  );
}

export function PreloaderBackground() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#05020f]" />

      {/* Aurora blobs — static on mobile, animated on desktop */}
      <div className={cn("absolute top-[-25%] left-[-15%] w-[75%] h-[75%] rounded-full bg-violet-600/35 blur-[130px]", !reduced && "animate-aurora")} />
      <div className={cn("absolute bottom-[-25%] right-[-15%] w-[65%] h-[65%] rounded-full bg-fuchsia-600/28 blur-[110px]", !reduced && "animate-aurora")} style={!reduced ? { animationDelay: "-5s" } : undefined} />
      <div className={cn("absolute top-[30%] right-[5%] w-[45%] h-[45%] rounded-full bg-orange-500/15 blur-[90px]", !reduced && "animate-aurora")} style={!reduced ? { animationDelay: "-9s" } : undefined} />
      {/* Only render extra blobs on desktop */}
      {!reduced && (
        <>
          <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[100px] animate-aurora" style={{ animationDelay: "-3s" }} />
          <div className="absolute top-[10%] left-[35%] w-[35%] h-[35%] rounded-full bg-indigo-600/20 blur-[120px] animate-aurora" style={{ animationDelay: "-7s" }} />
        </>
      )}

      {/* Conic light rays */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 45%, transparent 0deg, rgba(139,92,246,0.9) 28deg, transparent 58deg, rgba(217,70,239,0.7) 118deg, transparent 148deg, rgba(251,146,60,0.6) 218deg, transparent 248deg)",
        }}
      />

      {/* Perspective grid floor — skip on mobile */}
      {!reduced && (
        <div className="absolute inset-x-0 bottom-0 h-[52%] overflow-hidden opacity-30 pointer-events-none">
          <div
            className="absolute inset-0 animate-grid-drift"
            style={{
              backgroundImage:
                "linear-gradient(rgba(167,139,250,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.25) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
              transformOrigin: "center top",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05020f] via-[#05020f]/55 to-transparent" />
        </div>
      )}

      {/* Scan-line sweep — desktop only */}
      {!reduced && (
        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400/30 to-transparent animate-preloader-scan pointer-events-none" />
      )}

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_0%,#05020f_70%)]" />

      <div className="absolute inset-0 preloader-noise opacity-25 pointer-events-none" />
      <Starfield count={70} seed={0} />
      {!reduced && <Starfield count={40} seed={200} />}
    </div>
  );
}
