import { TrendingGamesSection } from "./TrendingGamesSection";
import { HomeCategorySections } from "./CategoryShowcaseSection";
import { GamesCatalogSection } from "./GamesCatalogSection";

interface GamesHubProps {
  searchQuery?: string;
}

export function GamesHub({ searchQuery = "" }: GamesHubProps) {
  return (
    <>
      <TrendingGamesSection />
      <HomeCategorySections />
      <GamesCatalogSection searchQuery={searchQuery} />
    </>
  );
}
