import { Flame, Gamepad2, Puzzle, Sparkles, Zap } from "lucide-react";
import { gamesData } from "@/data/games";

export const PRELOADER_STEPS = [
  { label: "Powering up", icon: Gamepad2 },
  { label: "Loading worlds", icon: Sparkles },
  { label: "Caching games", icon: Zap },
  { label: "Almost ready", icon: Puzzle },
  { label: "Let's play", icon: Flame },
] as const;

export const MIN_DISPLAY_MS = 3400;
export const PRELOAD_URLS = gamesData.slice(0, 32).map((g) => g.thumbnail_url);
export const TOTAL_GAMES = gamesData.length;

export const FEATURED_GAMES = gamesData
  .filter((g) => g.categories.includes("Top 10 Games"))
  .slice(0, 10);

export const RING_GAMES =
  FEATURED_GAMES.length >= 8
    ? FEATURED_GAMES.slice(0, 8)
    : gamesData.slice(0, 8);

export const MARQUEE_GAMES = [...gamesData.slice(0, 8), ...gamesData.slice(0, 8)];
