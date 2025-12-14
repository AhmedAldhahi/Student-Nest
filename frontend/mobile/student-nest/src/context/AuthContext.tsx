import React, { createContext, useContext, useState, ReactNode } from "react";
import { getMe } from "../features/auth/api/authService";

type Role = "student" | "landlord" | "admin";

export type User = {
  id: string;
  name: string;
  role: Role;
  email: string;
};

// ✅ Mock users for testing
const mockUsers: User[] = [
  {
    id: "1",
    name: "Student Ahmed",
    role: "student",
    email: "student@test.com",
  },
  {
    id: "2",
    name: "Landlord Ali",
    role: "landlord",
    email: "landlord@test.com",
  },
  {
    id: "3",
    name: "Admin Sara",
    role: "admin",
    email: "admin@test.com",
  },
];

type AuthContextType = {
  token: string | null;
  isLoading: boolean;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loginAs: (role: Role) => void; // 👈 helper for testing
  isStudent: boolean;
  isLandlord: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Real login flow: set token, then fetch user
  const login = async (newToken: string) => {
    setToken(newToken);
    setIsLoading(true);
    try {
      const userData = await getMe(newToken);
      // Map backend user to our User type if necessary. 
      // Assuming backend returns { id, name, email, role, ... } matching our type roughly.
      // We might need to adjust mapping if backend fields differ (e.g. _id vs id).
      // For now, usage of 'any' cast or direct assignment if types match.
      setUser(userData as User);
    } catch (error) {
      console.error("Failed to load user profile during login:", error);
      // Optional: clear token if fetch fails?
      // setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  // 👇 Quick role switch for testing (still useful for dev)
  const loginAs = (role: Role) => {
    // We can keep using mock users for "Review/Demo" mode if needed, 
    // or just remove this if we want strict real data.
    // I'll leave it but maybe disable it or keep it for the "TestRoleSwitcher" component.
    const found = mockUsers.find((u) => u.role === role);
    if (found) setUser(found);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoading,
        loginAs,
        isStudent: user?.role === "student",
        isLandlord: user?.role === "landlord", // Note: Check typo handling from backend if it returns "landloard"
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
