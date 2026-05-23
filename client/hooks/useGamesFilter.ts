import { useMemo, useState } from "react";
import { gamesData } from "@/data/games";
import { filterGames, getAllCategories } from "@/lib/game-utils";

export function useGamesFilter(externalSearch = "") {
  const [selectedCategory, setSelectedCategory] = useState("All Games");
  const categories = useMemo(() => getAllCategories(), []);

  const filteredGames = useMemo(
    () => filterGames(gamesData, externalSearch, selectedCategory),
    [externalSearch, selectedCategory]
  );

  const resetFilters = () => setSelectedCategory("All Games");

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredGames,
    resetFilters,
  };
}
