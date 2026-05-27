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
import {
  AIProfile,
  loadProfile,
  saveProfile,
  recordGameSession,
  isProfileWarm,
} from "@/ai/profile-engine";
import { useAuth } from "@/context/AuthContext";

type AIProfileContextValue = {
  profile: AIProfile;
  isWarm: boolean;
  trackSession: (gameName: string, categories: string[], durationSeconds: number) => void;
};

const AIProfileContext = createContext<AIProfileContextValue | null>(null);

async function syncToServer(profile: AIProfile, token: string) {
  try {
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        interests: profile.interests,
        playStyle: profile.playStyle,
        totalPlayTime: profile.totalPlayTime,
        sessionsCount: profile.sessionsCount,
        recentlyPlayed: profile.recentlyPlayed,
      }),
    });
  } catch {
    // Network error — local profile is still intact
  }
}

async function logSessionToServer(gameName: string, duration: number, token: string) {
  try {
    await fetch("/api/profile/session", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ gameName, duration }),
    });
  } catch {}
}

export function AIProfileProvider({ children }: { children: ReactNode }) {
  const { token, isLoading: authLoading } = useAuth();
  const [profile, setProfile] = useState<AIProfile>(() => loadProfile());
  // Debounce server sync — don't hammer the API on every session
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When user logs in, load their server profile and merge with local
  useEffect(() => {
    if (authLoading || !token) return;
    const fetchServerProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const serverProfile = await res.json();
        setProfile((local) => {
          // Merge: take whichever has more sessions (server wins on conflict)
          const merged: AIProfile =
            serverProfile.sessionsCount >= local.sessionsCount
              ? {
                  interests: serverProfile.interests ?? {},
                  recentlyPlayed: serverProfile.recentlyPlayed ?? [],
                  totalPlayTime: serverProfile.totalPlayTime ?? 0,
                  sessionsCount: serverProfile.sessionsCount ?? 0,
                  playStyle: serverProfile.playStyle ?? "explorer",
                  lastUpdated: Date.now(),
                }
              : local;
          saveProfile(merged);
          return merged;
        });
      } catch {}
    };
    fetchServerProfile();
  }, [token, authLoading]);

  const trackSession = useCallback(
    (gameName: string, categories: string[], durationSeconds: number) => {
      if (durationSeconds < 3) return;
      setProfile((prev) => {
        const updated = recordGameSession(prev, gameName, categories, durationSeconds);
        saveProfile(updated);

        // Debounced server sync
        if (token) {
          if (syncTimer.current) clearTimeout(syncTimer.current);
          syncTimer.current = setTimeout(() => {
            syncToServer(updated, token);
            logSessionToServer(gameName, durationSeconds, token);
          }, 2000);
        }

        return updated;
      });
    },
    [token]
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
