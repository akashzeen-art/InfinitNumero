import { Game, gamesData } from "@/data/games";

const STORAGE_KEY = "InfinityPlay-play-counts";

type PlayCounts = Record<string, number>;

function loadPlayCounts(): PlayCounts {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePlayCounts(counts: PlayCounts): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
  } catch {}
}

export function incrementPlayCount(gameName: string): void {
  const counts = loadPlayCounts();
  counts[gameName] = (counts[gameName] ?? 0) + 1;
  savePlayCounts(counts);
}

export function getDynamicTrending(limit = 12): Game[] {
  const counts = loadPlayCounts();
  const topGames = gamesData.filter((g) => g.categories.includes("Top 10 Games"));

  // If no local play data yet, fall back to static Top 10
  const hasData = Object.keys(counts).length > 0;
  if (!hasData) return topGames.slice(0, limit);

  return [...gamesData]
    .map((game) => {
      const plays = counts[game.name] ?? 0;
      const isTop10 = game.categories.includes("Top 10 Games") ? 1 : 0;
      const trendScore = plays * 0.7 + isTop10 * 0.3 * 10;
      return { game, trendScore };
    })
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, limit)
    .map(({ game }) => game);
}
