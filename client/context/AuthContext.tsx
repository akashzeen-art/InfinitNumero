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
const USER_KEY = "InfinityPlay-user";

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

function normalizeMsisdn(msisdn: string) {
  return msisdn.replace(/\s/g, "");
}

function isValidMsisdn(msisdn: string) {
  return /^\+?[1-9]\d{6,14}$/.test(normalizeMsisdn(msisdn));
}

/** Stable local user id from MSISDN — no database required. */
function userFromMsisdn(msisdn: string): AuthUser {
  const normalized = normalizeMsisdn(msisdn);
  const id = `local_${btoa(normalized).replace(/=+$/g, "")}`;
  return { id, msisdn: normalized };
}

function createLocalToken(user: AuthUser) {
  return `local.${btoa(JSON.stringify({ userId: user.id, msisdn: user.msisdn }))}`;
}

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed?.id || !parsed?.msisdn) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(true);

  const persistSession = (nextUser: AuthUser) => {
    const nextToken = createLocalToken(nextUser);
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const loginWithMsisdn = async (msisdn: string) => {
    if (!isValidMsisdn(msisdn)) {
      throw new Error("Invalid mobile number");
    }
    persistSession(userFromMsisdn(msisdn));
  };

  // Restore session on mount — also check for ?msisdn= in URL for silent login
  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(window.location.search);
      const urlMsisdn = params.get("msisdn");

      if (urlMsisdn && !token) {
        try {
          await loginWithMsisdn(urlMsisdn);
          params.delete("msisdn");
          const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
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

      const stored = readStoredUser();
      if (stored) {
        setUser(stored);
      } else {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      }
      setIsLoading(false);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (msisdn: string) => {
    await loginWithMsisdn(msisdn);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

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
