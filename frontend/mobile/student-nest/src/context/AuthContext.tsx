import React, { createContext, useContext, useState, ReactNode } from "react";

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
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loginAs: (role: Role) => void; // 👈 helper for testing
  isStudent: boolean;
  isLandlord: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  // 👇 Quick role switch for testing
  const loginAs = (role: Role) => {
    const found = mockUsers.find((u) => u.role === role);
    if (found) setUser(found);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loginAs,
        isStudent: user?.role === "student",
        isLandlord: user?.role === "landlord",
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
