import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const TOKEN_KEY = "InfinityPlay-token";

export interface AuthUser {
  id: string;
  msisdn: string;
}

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (msisdn: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error ?? "Request failed");
  }
  return res.json();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount — also check for ?msisdn= in URL for silent login
  useEffect(() => {
    const init = async () => {
      // Auto-detect MSISDN from URL param (telecom partner redirects)
      const params = new URLSearchParams(window.location.search);
      const urlMsisdn = params.get("msisdn");

      if (urlMsisdn && !token) {
        try {
          await loginWithMsisdn(urlMsisdn);
          // Clean the URL param without reload
          params.delete("msisdn");
          const newUrl = `${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}`;
          window.history.replaceState({}, "", newUrl);
        } catch {
          // Invalid MSISDN in URL — fall through to normal flow
        }
        setIsLoading(false);
        return;
      }

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await apiFetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ id: data.id, msisdn: data.msisdn });
      } catch {
        // Token expired or invalid — clear it
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginWithMsisdn = async (msisdn: string) => {
    const data = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ msisdn }),
    });
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser({ id: data.user.id, msisdn: data.user.msisdn });
    return data;
  };

  const login = useCallback(async (msisdn: string) => {
    await loginWithMsisdn(msisdn);
  }, []);

  const logout = useCallback(async () => {
    if (token) {
      await apiFetch("/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, [token]);

  const value = useMemo(
    () => ({ user, token, isLoading, login, logout }),
    [user, token, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
