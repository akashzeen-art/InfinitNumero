import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AIProfile,
  loadProfile,
  saveProfile,
  recordGameSession,
  isProfileWarm,
} from "@/ai/profile-engine";

type AIProfileContextValue = {
  profile: AIProfile;
  isWarm: boolean;
  trackSession: (gameName: string, categories: string[], durationSeconds: number) => void;
};

const AIProfileContext = createContext<AIProfileContextValue | null>(null);

export function AIProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<AIProfile>(() => loadProfile());

  const trackSession = useCallback(
    (gameName: string, categories: string[], durationSeconds: number) => {
      if (durationSeconds < 3) return;
      setProfile((prev) => {
        const updated = recordGameSession(prev, gameName, categories, durationSeconds);
        saveProfile(updated);
        return updated;
      });
    },
    []
  );

  const value = useMemo(
    () => ({ profile, isWarm: isProfileWarm(profile), trackSession }),
    [profile, trackSession]
  );

  return <AIProfileContext.Provider value={value}>{children}</AIProfileContext.Provider>;
}

export function useAIProfile() {
  const ctx = useContext(AIProfileContext);
  if (!ctx) throw new Error("useAIProfile must be used within AIProfileProvider");
  return ctx;
}
