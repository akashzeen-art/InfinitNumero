import { Game } from "@/data/games";
import { useEffect, useRef, useState } from "react";
import { Play, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGamePlayer } from "@/contexts/GamePlayerContext";
import { getGameThumbnail, type ThumbOrientation } from "@/lib/game-utils";

interface GameCardProps {
  game: Game;
  onPlay?: (game: Game) => void;
  featured?: boolean;
  /** square = default grids; portrait = Premium category; landscape = wide strips */
  orientation?: ThumbOrientation;
}

export function GameCard({
  game,
  onPlay,
  featured,
  orientation = "square",
}: GameCardProps) {
  const { playGame } = useGamePlayer();
  const handlePlay = () => (onPlay ?? playGame)(game);
  const thumb = getGameThumbnail(game, orientation);

  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [thumb]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={cn(
        "group game-card",
        orientation === "portrait" && "aspect-[9/16]",
        orientation === "landscape" && "aspect-video",
        orientation === "square" && "aspect-square",
        featured && "ring-1 ring-cyan-400/35"
      )}
      onClick={handlePlay}
      role="button"
      tabIndex={0}
      aria-label="Play game"
      onKeyDown={(e) => e.key === "Enter" && handlePlay()}
    >
      {(!loaded || !inView) && !error && (
        <div
          className="absolute inset-0 rounded-2xl animate-pulse"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(217,70,239,0.1), rgba(249,115,22,0.08))",
          }}
        />
      )}

      {error ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-3"
          style={{ background: "rgba(139,92,246,0.08)" }}
        >
          <Play className="w-8 h-8 text-white/40" />
        </div>
      ) : inView ? (
        <img
          src={thumb}
          alt=""
          decoding="async"
          className={cn(
            "game-card-image rounded-2xl transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      ) : null}

      {featured && (
        <div
          className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black text-white uppercase tracking-wide"
          style={{ background: "linear-gradient(135deg, #f97316, #ef4444)" }}
        >
          <Zap className="w-2.5 h-2.5" /> Hot
        </div>
      )}

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(5,2,15,0.35) 0%, transparent 45%)",
          boxShadow:
            "inset 0 0 0 1px rgba(139,92,246,0.5), 0 0 30px rgba(139,92,246,0.2)",
        }}
      />

      {loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform"
            style={{
              background: "rgba(139,92,246,0.9)",
              boxShadow: "0 0 30px rgba(139,92,246,0.6)",
            }}
          >
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
      )}
    </article>
  );
}
