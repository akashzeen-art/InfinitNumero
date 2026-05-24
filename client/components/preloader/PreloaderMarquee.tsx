import { MARQUEE_GAMES } from "./constants";
import { useReducedMotion } from "@/hooks/use-mobile";

function TickerRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`flex gap-5 w-max ${reverse ? "animate-preloader-ticker-reverse" : "animate-preloader-ticker"}`}>
      {MARQUEE_GAMES.map((g, i) => (
        <div key={`${g.name}-${i}`} className="flex items-center gap-2 shrink-0">
          <img
            src={g.thumbnail_url}
            alt=""
            className="w-7 h-7 rounded-lg object-cover border border-white/10 shadow-sm"
          />
          <span className="text-[9px] font-bold text-violet-300/80 uppercase tracking-[0.2em]">
            {g.name}
          </span>
          <span className="text-violet-600/40 text-[8px]">✦</span>
        </div>
      ))}
    </div>
  );
}

export function PreloaderMarquee() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute top-0 inset-x-0 pointer-events-none z-10">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#05020f] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#05020f] to-transparent z-10" />

      <div className="py-2.5 overflow-hidden opacity-55 border-b border-white/[0.04]">
        <TickerRow />
      </div>
      {/* Second row only on desktop */}
      {!reduced && (
        <div className="py-2 overflow-hidden opacity-30">
          <TickerRow reverse />
        </div>
      )}
    </div>
  );
}
