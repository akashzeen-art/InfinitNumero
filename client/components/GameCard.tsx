import { Game } from "@/data/games";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
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

  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLElement>(null);

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
      { rootMargin: "120px" } // start loading 120px before card enters screen
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={cn(
        "group game-card aspect-square",
        featured && "ring-2 ring-orange-400/50 shadow-orange-500/20"
      )}
      onClick={handlePlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handlePlay()}
    >
      {/* Skeleton shown until image loads */}
      {(!loaded || !inView) && !error && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-100 via-fuchsia-50 to-orange-50 animate-pulse" />
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 p-3">
          <span className="text-3xl mb-2">🎮</span>
          <p className="text-xs font-bold text-gray-700 text-center line-clamp-2">{game.name}</p>
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

      {featured && (
        <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-gradient-to-r from-orange-500 to-red-500 text-[10px] font-black text-white uppercase tracking-wide">
          Hot
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent rounded-b-2xl opacity-70 group-hover:opacity-100 transition-opacity" />

      {loaded && !error && (
        <>
          <div className="absolute inset-x-0 bottom-0 p-3 z-10">
            <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 drop-shadow-md">
              {game.name}
            </h3>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-5 h-5 text-violet-600 fill-violet-600 ml-0.5" />
            </div>
          </div>
        </>
      )}
    </article>
  );
}
