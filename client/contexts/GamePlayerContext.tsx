import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Game } from "@/data/games";

type GamePlayerContextValue = {
  activeGame: Game | null;
  isOpen: boolean;
  playGame: (game: Game) => void;
  closeGame: () => void;
};

const GamePlayerContext = createContext<GamePlayerContextValue | null>(null);

export function GamePlayerProvider({ children }: { children: ReactNode }) {
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const playGame = useCallback((game: Game) => {
    setActiveGame(game);
  }, []);

  const closeGame = useCallback(() => {
    setActiveGame(null);
  }, []);

  useEffect(() => {
    if (!activeGame) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeGame]);

  useEffect(() => {
    if (!activeGame) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGame();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeGame, closeGame]);

  const value = useMemo(
    () => ({
      activeGame,
      isOpen: activeGame !== null,
      playGame,
      closeGame,
    }),
    [activeGame, playGame, closeGame]
  );

  return (
    <GamePlayerContext.Provider value={value}>{children}</GamePlayerContext.Provider>
  );
}

export function useGamePlayer() {
  const ctx = useContext(GamePlayerContext);
  if (!ctx) {
    throw new Error("useGamePlayer must be used within GamePlayerProvider");
  }
  return ctx;
}
