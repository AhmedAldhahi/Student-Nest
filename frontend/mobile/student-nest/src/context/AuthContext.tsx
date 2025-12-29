import React, { createContext, useContext, useState, ReactNode } from "react";
import { getMe } from "../features/auth/api/authService";

type Role = "student" | "landlord" | "landloard" | "admin"; // "landloard" is a backend typo

// Complete User type with all fields from API
export type User = {
  id: string;
  name: string;
  role: Role;
  email: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  photo?: string | null;
  createdAt?: string;
};

// Student-specific data from API
export type StudentData = {
  major?: string;
  gradateYear?: number;
  studentCardId?: string;
  universityName?: string;
  studentGovId?: string;
  verificationFile?: string;
};

// Landlord-specific data from API
export type LandlordData = {
  cliQAccount?: string;
  landloardGovId?: string;
};

type AuthContextType = {
  token: string | null;
  isLoading: boolean;
  user: User | null;
  studentData: StudentData | null;
  landlordData: LandlordData | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loginAs: (role: Role) => void;
  refreshUserProfile: () => Promise<void>;
  isStudent: boolean;
  isLandlord: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [landlordData, setLandlordData] = useState<LandlordData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to process API response and set state
  const processUserData = (userData: any) => {
    if (userData && userData.user) {
      const apiUser = userData.user;
      setUser({
        id: apiUser.userId,
        name: apiUser.name,
        email: apiUser.email,
        role: apiUser.role,
        dateOfBirth: apiUser.dateOfBirth,
        phoneNumber: apiUser.phoneNumber,
        address: apiUser.address,
        photo: apiUser.photo,
        createdAt: apiUser.createdAt,
      });

      // Set student-specific data if available
      if (apiUser.role === "student") {
        setStudentData({
          major: userData.major,
          gradateYear: userData.gradateYear,
          studentCardId: userData.studentCardId,
          universityName: userData.universityName,
          studentGovId: userData.studentGovId,
          verificationFile: userData.verificationFile,
        });
        setLandlordData(null);
      } else if (apiUser.role === "landlord" || apiUser.role === "landloard") {
        setLandlordData({
          cliQAccount: userData.cliQAccount,
          landloardGovId: userData.landloardGovId,
        });
        setStudentData(null);
      } else {
        setStudentData(null);
        setLandlordData(null);
      }
    } else {
      console.warn("Unexpected user data structure", userData);
    }
  };

  // Real login flow: set token, then fetch user
  const login = async (newToken: string) => {
    setToken(newToken);
    setIsLoading(true);
    try {
      const userData = await getMe(newToken);
      processUserData(userData);
    } catch (error) {
      console.error("Failed to load user profile during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh user profile data (e.g., after updating profile)
  const refreshUserProfile = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const userData = await getMe(token);
      processUserData(userData);
    } catch (error) {
      console.error("Failed to refresh user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setStudentData(null);
    setLandlordData(null);
    setToken(null);
  };

  // Quick role switch for testing
  const loginAs = (role: Role) => {
    const mockUsers = [
      { id: "1", name: "Student Ahmed", role: "student" as Role, email: "student@test.com" },
      { id: "2", name: "Landlord Ali", role: "landlord" as Role, email: "landlord@test.com" },
      { id: "3", name: "Admin Sara", role: "admin" as Role, email: "admin@test.com" },
    ];
    const found = mockUsers.find((u) => u.role === role);
    if (found) setUser(found);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        studentData,
        landlordData,
        login,
        logout,
        isLoading,
        loginAs,
        refreshUserProfile,
        isStudent: user?.role === "student",
        isLandlord: user?.role === "landlord" || user?.role === "landloard",
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
