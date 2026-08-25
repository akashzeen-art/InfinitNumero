import { useRecommendations } from "@/hooks/useRecommendations";
import { PremiumGamesSection } from "./PremiumGamesSection";
import { TrendingGamesSection } from "./TrendingGamesSection";
import { HomeCategorySections } from "./CategoryShowcaseSection";
import { GamesCatalogSection } from "./GamesCatalogSection";
import { RecentlyPlayedSection } from "./RecentlyPlayedSection";
import { RecommendedGamesSection } from "./RecommendedGamesSection";
import { BecauseYouPlayedSection } from "./BecauseYouPlayedSection";

interface GamesHubProps {
  searchQuery?: string;
}

export function GamesHub({ searchQuery = "" }: GamesHubProps) {
  const {
    isWarm,
    recommendations,
    recentlyPlayed,
    becauseYouPlayed,
    trendingGames,
    playStyle,
  } = useRecommendations();

  if (!isWarm) {
    return (
      <>
        <PremiumGamesSection />
        <TrendingGamesSection overrideGames={trendingGames} />
        <HomeCategorySections />
        <GamesCatalogSection searchQuery={searchQuery} />
      </>
    );
  }

  return (
    <>
      <PremiumGamesSection />
      {recentlyPlayed.length > 0 && <RecentlyPlayedSection games={recentlyPlayed} />}
      <RecommendedGamesSection games={recommendations} playStyle={playStyle} />
      {becauseYouPlayed && (
        <BecauseYouPlayedSection
          category={becauseYouPlayed.category}
          games={becauseYouPlayed.games}
        />
      )}
      <TrendingGamesSection overrideGames={trendingGames} />
      <HomeCategorySections personalizedOrder={true} />
      <GamesCatalogSection searchQuery={searchQuery} />
    </>
  );
}
