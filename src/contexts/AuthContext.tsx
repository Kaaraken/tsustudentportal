import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { API_URL } from "@/config";

interface AuthState {
  token: string | null;
  studentName: string;
  studentId: string;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (studentId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    token: null,
    studentName: "",
    studentId: "",
    isAuthenticated: false,
  });

  const login = useCallback(async (studentId: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Invalid TSU credentials");
    }

    const data = await res.json();
    setState({
      token: data.token,
      studentName: data.studentName || studentId,
      studentId: data.studentId || studentId,
      isAuthenticated: true,
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      if (state.token) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${state.token}` },
        });
      }
    } catch {
      // ignore logout errors
    }
    setState({ token: null, studentName: "", studentId: "", isAuthenticated: false });
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
