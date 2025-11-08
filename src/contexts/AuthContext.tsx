/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import type { User, AuthContextType, SignupCredentials } from "../types/auth";
import loginService from "../services/auth/login";
import registerService from "../services/auth/register";
import { simpleLogout } from "../services/auth/logout";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Check for existing authentication on component mount
  useEffect(() => {
    const token = cookies.get("token");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("userData");
        cookies.remove("token", { path: "/" });
        cookies.remove("refreshToken", { path: "/" });
      }
    }
  }, []);

  // Enhanced login with axios API integration
  // Enhanced login with axios API integration
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const loginData = {
        username: email.toLowerCase().trim(),
        password: password.trim(),
      };

      const response = await loginService(loginData);

      // DEBUG: Log the entire response to see the structure
      console.log("🔍 DEBUG - Full login response:", response);
      console.log("🔍 DEBUG - User data in response:", response.user);

      // Store tokens in cookies
      if (response.access_token) {
        cookies.set("token", response.access_token, { path: "/" });
      }
      if (response.refresh_token) {
        cookies.set("refreshToken", response.refresh_token, { path: "/" });
      }

      // FIX: Use the correct property names from your API response
      const userData: User = {
        firstName:
          response.user?.firstName || response.user?.first_name || "User",
        lastName: response.user?.lastName || response.user?.last_name || "",
        email: response.user?.email || email,
      };

      console.log("✅ Extracted user data:", userData);

      // Store user data in localStorage for persistence
      localStorage.setItem("userData", JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);

      console.log("✅ Login successful - User data:", userData);
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.details ||
        error.response?.data?.message ||
        error.message ||
        "Login failed";
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced signup with axios API integration
  // Enhanced signup with axios API integration
  const signup = async (credentials: SignupCredentials): Promise<void> => {
    setLoading(true);
    try {
      console.log("🔧 Debug - AuthContext received credentials:", credentials);

      const signupData = {
        email: credentials.email.toLowerCase().trim(),
        password: credentials.password,
        confirmPassword: credentials.confirmPassword,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        companyName: credentials.companyName || "",
        phoneNumber: credentials.phoneNumber || "",
      };

      console.log(
        "🔧 Debug - AuthContext sending to register service:",
        signupData
      );

      const response = await registerService(signupData);

      // FIX: Use the correct property names from your API response
      const userData: User = {
        firstName:
          response.user?.firstName ||
          response.user?.first_name ||
          response.firstName ||
          credentials.firstName,
        lastName:
          response.user?.lastName ||
          response.user?.last_name ||
          response.lastName ||
          credentials.lastName,
        email: response.user?.email || credentials.email,
      };

      console.log("✅ Extracted user data from signup:", userData);

      // Store user data in localStorage for persistence
      localStorage.setItem("userData", JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);

      // Store tokens if provided during registration
      if (response.access_token || response.key) {
        cookies.set("token", response.access_token || response.key, {
          path: "/",
        });
      }
      if (response.refresh_token) {
        cookies.set("refreshToken", response.refresh_token, { path: "/" });
      }

      console.log("✅ Signup successful - User data:", userData);
    } catch (error: any) {
      console.error("Signup error:", error);
      const errorMessage =
        error.response?.data?.details?.password1?.[0] ||
        error.response?.data?.details?.password2?.[0] ||
        error.response?.data?.details?.email?.[0] ||
        error.response?.data?.message ||
        error.message ||
        "Registration failed";
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const logout = async (): Promise<void> => {
    try {
      await simpleLogout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear tokens from cookies
      cookies.remove("token", { path: "/" });
      cookies.remove("refreshToken", { path: "/" });

      // Clear user data from localStorage
      localStorage.removeItem("userData");

      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isAuthenticated,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
