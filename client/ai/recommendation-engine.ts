import { Game, gamesData } from "@/data/games";
import { AIProfile } from "./profile-engine";

const TRENDING_GAMES = new Set(
  gamesData.filter((g) => g.categories.includes("Top 10 Games")).map((g) => g.name)
);

/**
 * Scores a single game against the user's interest profile.
 * Higher = more relevant.
 */
function scoreGame(game: Game, profile: AIProfile): number {
  const { interests, recentlyPlayed } = profile;

  // Category affinity (0–100 range)
  const totalInterest = Object.values(interests).reduce((s, v) => s + v, 0) || 1;
  const categoryAffinity = game.categories
    .filter((c) => c !== "All Games")
    .reduce((sum, cat) => sum + (interests[cat] ?? 0), 0);
  const affinityScore = (categoryAffinity / totalInterest) * 100;

  // Replay bonus — games played before score higher
  const replayIndex = recentlyPlayed.indexOf(game.name);
  const replayScore = replayIndex === -1 ? 0 : Math.max(0, 20 - replayIndex * 2);

  // Trending boost
  const trendingScore = TRENDING_GAMES.has(game.name) ? 15 : 0;

  // Novelty — slightly boost games NOT recently played to encourage discovery
  const noveltyScore = replayIndex === -1 ? 8 : 0;

  return affinityScore * 0.5 + replayScore * 0.2 + trendingScore * 0.2 + noveltyScore * 0.1;
}

/** Returns top N recommended games, excluding already-shown recently played */
export function getRecommendations(profile: AIProfile, limit = 20): Game[] {
  return [...gamesData]
    .map((game) => ({ game, score: scoreGame(game, profile) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ game }) => game);
}

/** Returns games from the user's top category that they haven't played recently */
export function getBecauseYouPlayedGames(
  profile: AIProfile,
  limit = 8
): { category: string; games: Game[] } | null {
  const topEntry = Object.entries(profile.interests)
    .filter(([cat]) => cat !== "All Games")
    .sort((a, b) => b[1] - a[1])[0];

  if (!topEntry) return null;
  const [category] = topEntry;

  const games = gamesData
    .filter(
      (g) =>
        g.categories.includes(category) &&
        !profile.recentlyPlayed.slice(0, 5).includes(g.name)
    )
    .slice(0, limit);

  return games.length > 0 ? { category, games } : null;
}

/** Reorders HOME_CATEGORY_SECTIONS ids by user interest */
export function getPersonalizedCategoryOrder(
  profile: AIProfile,
  defaultOrder: string[]
): string[] {
  return [...defaultOrder].sort((a, b) => {
    const scoreA = profile.interests[a] ?? 0;
    const scoreB = profile.interests[b] ?? 0;
    return scoreB - scoreA;
  });
}
