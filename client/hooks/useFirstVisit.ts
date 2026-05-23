const STORAGE_KEY = "play365-has-visited";

export function hasVisitedBefore(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function markAsVisited(): void {
  localStorage.setItem(STORAGE_KEY, "true");
}
