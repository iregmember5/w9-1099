/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, AuthContextType, LoginCredentials, SignupCredentials } from '../types/auth';
import loginService from '../services/auth/login';
import registerService from '../services/auth/register';
import { simpleLogout } from '../services/auth/logout';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Export the context so it can be used in the hook
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Enhanced login with axios API integration
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const loginData = {
        username: email.toLowerCase().trim(),
        password: password.trim(),
      };

      const response = await loginService(loginData);
      
      // Store tokens in cookies
      if (response.access_token) {
        cookies.set('token', response.access_token, { path: '/' });
      }
      if (response.refresh_token) {
        cookies.set('refreshToken', response.refresh_token, { path: '/' });
      }

      // Set user data
      const userData: User = {
        firstName: response.user?.first_name || 'User',
        lastName: response.user?.last_name || '',
        email: email,
      };

      setUser(userData);
      setIsAuthenticated(true);

    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.details || 
                          error.response?.data?.message || 
                          error.message || 
                          'Login failed';
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced signup with axios API integration
  // Enhanced signup with axios API integration
// Enhanced signup with axios API integration
const signup = async (credentials: SignupCredentials): Promise<void> => {
  setLoading(true);
  try {
    console.log('🔧 Debug - AuthContext received credentials:', credentials);
    
    const signupData = {
      email: credentials.email.toLowerCase().trim(),
      password: credentials.password,
      confirmPassword: credentials.confirmPassword,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      companyName: credentials.companyName || '',
      phoneNumber: credentials.phoneNumber || '',
    };

    console.log('🔧 Debug - AuthContext sending to register service:', signupData);

    const response = await registerService(signupData);

    if (response.user || response.key) {
      const userData: User = {
        firstName: response.user?.first_name || credentials.firstName,
        lastName: response.user?.last_name || credentials.lastName,
        email: credentials.email,
      };
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store tokens if provided during registration
      if (response.access_token || response.key) {
        cookies.set('token', response.access_token || response.key, { path: '/' });
      }
      if (response.refresh_token) {
        cookies.set('refreshToken', response.refresh_token, { path: '/' });
      }
    }

  } catch (error: any) {
    console.error('Signup error:', error);
    const errorMessage = error.response?.data?.details?.password1?.[0] || 
                        error.response?.data?.details?.password2?.[0] || 
                        error.response?.data?.details?.email?.[0] || 
                        error.response?.data?.message || 
                        error.message || 
                        'Registration failed';
    throw new Error(errorMessage);
  } finally {
    setLoading(false);
  }
};
  const logout = async (): Promise<void> => {
    try {
      // Use the simplified logout that doesn't rely on data transformation
      await simpleLogout();
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, we still want to clear local state
    } finally {
      // Clear tokens from cookies
      cookies.remove('token', { path: '/' });
      cookies.remove('refreshToken', { path: '/' });
      
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};