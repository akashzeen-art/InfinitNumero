import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-mobile";

function Starfield({ count = 50, seed = 0 }: { count?: number; seed?: number }) {
  const reduced = useReducedMotion();
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
            style={{ left: `${(s * 13.7) % 100}%`, top: `${(s * 19.3) % 100}%`, opacity: big ? 0.45 : 0.2 }}
          />
        ) : (
          <motion.div
            key={i}
            className={cn("absolute rounded-full bg-white", big ? "w-[3px] h-[3px]" : "w-px h-px")}
            style={{ left: `${(s * 13.7) % 100}%`, top: `${(s * 19.3) % 100}%` }}
            animate={{ opacity: [0.03, big ? 0.9 : 0.6, 0.03] }}
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
    <div className="absolute inset-0 overflow-hidden" style={{ WebkitTransform: "translateZ(0)", transform: "translateZ(0)" }}>
      {/* Base color */}
      <div className="absolute inset-0 bg-[#05020f]" />

      {/* Aurora blobs — use smaller blur on mobile to avoid iOS Safari crash */}
      <div
        className={cn("absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-violet-600/30", !reduced && "animate-aurora")}
        style={{ filter: reduced ? "blur(60px)" : "blur(100px)" }}
      />
      <div
        className={cn("absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-fuchsia-600/25", !reduced && "animate-aurora")}
        style={{ filter: reduced ? "blur(50px)" : "blur(90px)", animationDelay: !reduced ? "-5s" : undefined }}
      />
      {/* Third blob only on desktop */}
      {!reduced && (
        <div
          className="absolute top-[30%] right-[5%] w-[40%] h-[40%] rounded-full bg-orange-500/12 animate-aurora"
          style={{ filter: "blur(80px)", animationDelay: "-9s" }}
        />
      )}

      {/* Conic light rays */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 45%, transparent 0deg, rgba(139,92,246,0.9) 28deg, transparent 58deg, rgba(217,70,239,0.7) 118deg, transparent 148deg, rgba(251,146,60,0.6) 218deg, transparent 248deg)",
        }}
      />

      {/* Perspective grid floor — desktop only */}
      {!reduced && (
        <div className="absolute inset-x-0 bottom-0 h-[50%] overflow-hidden opacity-25 pointer-events-none">
          <div
            className="absolute inset-0 animate-grid-drift"
            style={{
              backgroundImage:
                "linear-gradient(rgba(167,139,250,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.2) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
              transformOrigin: "center top",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05020f] via-[#05020f]/55 to-transparent" />
        </div>
      )}

      {/* Scan-line — desktop only */}
      {!reduced && (
        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400/25 to-transparent animate-preloader-scan pointer-events-none" />
      )}

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_0%,#05020f_72%)]" />

      <div className="absolute inset-0 preloader-noise opacity-20 pointer-events-none" />
      <Starfield count={50} seed={0} />
      {!reduced && <Starfield count={30} seed={200} />}
    </div>
  );
}
