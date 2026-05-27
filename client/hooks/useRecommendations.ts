import { useMemo } from "react";
import { useAIProfile } from "@/context/AIProfileContext";
import { gamesData } from "@/data/games";
import {
  getRecommendations,
  getBecauseYouPlayedGames,
  getPersonalizedCategoryOrder,
} from "@/ai/recommendation-engine";
import { getDynamicTrending } from "@/ai/trending-engine";
import { HOME_CATEGORY_SECTIONS } from "@/lib/game-utils";

export function useRecommendations() {
  const { profile, isWarm } = useAIProfile();

  const recommendations = useMemo(
    () => (isWarm ? getRecommendations(profile, 20) : []),
    [profile, isWarm]
  );

  const recentlyPlayed = useMemo(
    () =>
      profile.recentlyPlayed
        .map((name) => gamesData.find((g) => g.name === name))
        .filter(Boolean) as typeof gamesData,
    [profile.recentlyPlayed]
  );

  const becauseYouPlayed = useMemo(
    () => (isWarm ? getBecauseYouPlayedGames(profile, 8) : null),
    [profile, isWarm]
  );

  const trendingGames = useMemo(() => getDynamicTrending(12), [profile.sessionsCount]);

  const personalizedSectionOrder = useMemo(() => {
    const defaultOrder = HOME_CATEGORY_SECTIONS.filter((s) => s.id !== "Top 10 Games").map(
      (s) => s.id
    );
    return isWarm ? getPersonalizedCategoryOrder(profile, defaultOrder) : defaultOrder;
  }, [profile, isWarm]);

  return {
    recommendations,
    recentlyPlayed,
    becauseYouPlayed,
    trendingGames,
    personalizedSectionOrder,
    isWarm,
    playStyle: profile.playStyle,
    topInterest: Object.entries(profile.interests).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null,
  };
}
