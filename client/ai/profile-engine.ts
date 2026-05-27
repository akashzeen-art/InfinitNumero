export type PlayStyle = "casual" | "competitive" | "explorer";

export interface AIProfile {
  interests: Record<string, number>;
  recentlyPlayed: string[]; // game names, most recent first
  totalPlayTime: number; // seconds
  sessionsCount: number;
  playStyle: PlayStyle;
  lastUpdated: number;
}

const STORAGE_KEY = "InfinityPlay-ai-profile";
const MAX_RECENTLY_PLAYED = 20;

export function getDefaultProfile(): AIProfile {
  return {
    interests: {},
    recentlyPlayed: [],
    totalPlayTime: 0,
    sessionsCount: 0,
    playStyle: "explorer",
    lastUpdated: Date.now(),
  };
}

export function loadProfile(): AIProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProfile();
    return { ...getDefaultProfile(), ...JSON.parse(raw) };
  } catch {
    return getDefaultProfile();
  }
}

export function saveProfile(profile: AIProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...profile, lastUpdated: Date.now() }));
  } catch {
    // localStorage unavailable — fail silently
  }
}

export function recordGameSession(
  profile: AIProfile,
  gameName: string,
  categories: string[],
  durationSeconds: number
): AIProfile {
  const updated = { ...profile };
  const weight = Math.min(durationSeconds / 30, 5);
  const updatedInterests = { ...updated.interests };

  for (const cat of categories) {
    if (cat === "All Games") continue;
    updatedInterests[cat] = (updatedInterests[cat] ?? 0) + weight * 10;
    // Slight decay on other categories to keep scores relative
    for (const key of Object.keys(updatedInterests)) {
      if (key !== cat) updatedInterests[key] *= 0.98;
    }
  }
  updated.interests = updatedInterests;

  updated.recentlyPlayed = [
    gameName,
    ...updated.recentlyPlayed.filter((n) => n !== gameName),
  ].slice(0, MAX_RECENTLY_PLAYED);

  updated.totalPlayTime += durationSeconds;
  updated.sessionsCount += 1;
  updated.playStyle = detectPlayStyle(updated);

  return updated;
}

function detectPlayStyle(profile: AIProfile): PlayStyle {
  const { interests, sessionsCount, totalPlayTime } = profile;
  if (sessionsCount < 3) return "explorer";

  const avgSession = totalPlayTime / sessionsCount;
  const topCats = Object.entries(interests)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([cat]) => cat);

  const uniqueCategories = Object.keys(interests).length;
  if (uniqueCategories >= 4) return "explorer";
  if (topCats.some((c) => c === "Action" || c === "Arcade") && avgSession < 120)
    return "competitive";
  if (topCats.some((c) => c === "Easy to Play" || c === "Puzzle") && avgSession > 60)
    return "casual";
  return "explorer";
}

export function isProfileWarm(profile: AIProfile): boolean {
  return profile.sessionsCount >= 3;
}
