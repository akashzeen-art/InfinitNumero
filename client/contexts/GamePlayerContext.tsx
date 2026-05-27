import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Game } from "@/data/games";
import { startSession, stopSession } from "@/ai/behavior-tracker";
import { incrementPlayCount } from "@/ai/trending-engine";
import { useAIProfile } from "@/context/AIProfileContext";

type GamePlayerContextValue = {
  activeGame: Game | null;
  isOpen: boolean;
  playGame: (game: Game) => void;
  closeGame: () => void;
};

const GamePlayerContext = createContext<GamePlayerContextValue | null>(null);

export function GamePlayerProvider({ children }: { children: ReactNode }) {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const activeGameRef = useRef<Game | null>(null);
  const { trackSession } = useAIProfile();

  const playGame = useCallback((game: Game) => {
    activeGameRef.current = game;
    startSession(game.name);
    incrementPlayCount(game.name);
    setActiveGame(game);
  }, []);

  const closeGame = useCallback(() => {
    const session = stopSession();
    if (session && activeGameRef.current) {
      trackSession(
        activeGameRef.current.name,
        activeGameRef.current.categories,
        session.durationSeconds
      );
    }
    activeGameRef.current = null;
    setActiveGame(null);
  }, [trackSession]);

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
