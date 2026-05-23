import { gamesData, Game } from "@/data/games";
import type { LucideIcon } from "lucide-react";
import { Flame, Gamepad2, Puzzle, Swords, Star, Zap } from "lucide-react";

export function getGamesByCategory(category: string, limit?: number): Game[] {
  const list = gamesData.filter((g) => g.categories.includes(category));
  return limit ? list.slice(0, limit) : list;
}

const CATEGORY_ORDER = [
  "All Games",
  "Top 10 Games",
  "Action",
  "Arcade",
  "Easy to Play",
  "Puzzle",
];

export function getAllCategories(): string[] {
  const cats = new Set<string>();
  gamesData.forEach((g) => g.categories.forEach((c) => cats.add(c)));
  const ordered = CATEGORY_ORDER.filter((c) => cats.has(c));
  const rest = Array.from(cats)
    .filter((c) => !CATEGORY_ORDER.includes(c))
    .sort();
  return [...ordered, ...rest];
}

export type CategoryConfig = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  accentBg: string;
  path: string;
};

export const HOME_CATEGORY_SECTIONS: CategoryConfig[] = [
  {
    id: "Top 10 Games",
    label: "Top 10 Games",
    shortLabel: "Top 10",
    description: "Fan favorites everyone is playing",
    icon: Flame,
    gradient: "from-orange-500 via-red-500 to-rose-600",
    accentBg: "bg-orange-50",
    path: "/category/Top%2010%20Games",
  },
  {
    id: "Puzzle",
    label: "Puzzle Games",
    shortLabel: "Puzzle",
    description: "Brain teasers that hook you for hours",
    icon: Puzzle,
    gradient: "from-cyan-500 via-blue-600 to-indigo-700",
    accentBg: "bg-cyan-50",
    path: "/category/Puzzle",
  },
  {
    id: "Action",
    label: "Action Games",
    shortLabel: "Action",
    description: "Fast reflexes and non-stop adrenaline",
    icon: Swords,
    gradient: "from-red-500 via-orange-600 to-amber-600",
    accentBg: "bg-red-50",
    path: "/category/Action",
  },
  {
    id: "Arcade",
    label: "Arcade Classics",
    shortLabel: "Arcade",
    description: "Retro vibes and instant arcade fun",
    icon: Zap,
    gradient: "from-rose-500 via-pink-600 to-fuchsia-700",
    accentBg: "bg-pink-50",
    path: "/category/Arcade",
  },
  {
    id: "Easy to Play",
    label: "Easy to Play",
    shortLabel: "Casual",
    description: "Pick up and play in seconds",
    icon: Star,
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    accentBg: "bg-emerald-50",
    path: "/category/Easy%20to%20Play",
  },
];

export const CATEGORY_FILTER_CONFIG: Record<
  string,
  { icon: LucideIcon; gradient?: string }
> = {
  "All Games": { icon: Gamepad2 },
  "Top 10 Games": { icon: Flame },
  Arcade: { icon: Zap },
  Puzzle: { icon: Puzzle },
  Action: { icon: Swords },
  "Easy to Play": { icon: Star },
};

export function filterGames(
  games: Game[],
  searchQuery: string,
  category: string
): Game[] {
  const q = searchQuery.trim().toLowerCase();
  return games.filter((game) => {
    const matchSearch =
      !q ||
      game.name.toLowerCase().includes(q) ||
      game.categories.some((c) => c.toLowerCase().includes(q));
    const matchCat = category === "All Games" || game.categories.includes(category);
    return matchSearch && matchCat;
  });
}
