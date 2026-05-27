import { Game } from "@/data/games";
import { useEffect, useRef, useState } from "react";
import { Play, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGamePlayer } from "@/contexts/GamePlayerContext";

interface GameCardProps {
  game: Game;
  onPlay?: (game: Game) => void;
  featured?: boolean;
}

export function GameCard({ game, onPlay, featured }: GameCardProps) {
  const { playGame } = useGamePlayer();
  const handlePlay = () => (onPlay ?? playGame)(game);

  const [inView, setInView]   = useState(false);
  const [loaded, setLoaded]   = useState(false);
  const [error, setError]     = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: "120px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={cn("group game-card aspect-square", featured && "ring-1 ring-orange-500/40")}
      onClick={handlePlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handlePlay()}
    >
      {/* skeleton */}
      {(!loaded || !inView) && !error && (
        <div className="absolute inset-0 rounded-2xl animate-pulse"
          style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(217,70,239,0.1), rgba(249,115,22,0.08))" }} />
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-3"
          style={{ background: "rgba(139,92,246,0.08)" }}>
          <span className="text-3xl mb-2">🎮</span>
          <p className="text-xs font-bold text-white/60 text-center line-clamp-2">{game.name}</p>
        </div>
      ) : inView ? (
        <img
          src={game.thumbnail_url}
          alt={game.name}
          decoding="async"
          className={cn("game-card-image rounded-2xl transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      ) : null}

      {/* featured badge */}
      {featured && (
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black text-white uppercase tracking-wide"
          style={{ background: "linear-gradient(135deg, #f97316, #ef4444)" }}>
          <Zap className="w-2.5 h-2.5" /> Hot
        </div>
      )}

      {/* gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 rounded-b-2xl opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ background: "linear-gradient(to top, rgba(5,2,15,0.95) 0%, rgba(5,2,15,0.5) 50%, transparent 100%)" }} />

      {/* neon border glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.5), 0 0 30px rgba(139,92,246,0.2)" }} />

      {loaded && !error && (
        <>
          <div className="absolute inset-x-0 bottom-0 p-3 z-10">
            <h3 className="text-white font-bold text-xs sm:text-sm leading-snug line-clamp-2 drop-shadow-lg">
              {game.name}
            </h3>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform"
              style={{ background: "rgba(139,92,246,0.9)", boxShadow: "0 0 30px rgba(139,92,246,0.6)" }}>
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        </>
      )}
    </article>
  );
}
