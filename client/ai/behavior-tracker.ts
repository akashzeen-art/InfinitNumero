/**
 * Tracks a single game session.
 * Call startSession() when a game opens, stopSession() when it closes.
 * Returns duration in seconds.
 */

let sessionStart: number | null = null;
let sessionGameName: string | null = null;

export function startSession(gameName: string): void {
  sessionStart = Date.now();
  sessionGameName = gameName;
}

export function stopSession(): { gameName: string; durationSeconds: number } | null {
  if (!sessionStart || !sessionGameName) return null;
  const durationSeconds = Math.round((Date.now() - sessionStart) / 1000);
  const result = { gameName: sessionGameName, durationSeconds };
  sessionStart = null;
  sessionGameName = null;
  return result;
}
