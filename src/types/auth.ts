import type { ComponentType } from 'react';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName?: string; // Make optional
  phoneNumber?: string; // Make optional
  acceptTerms: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading?: boolean;
}

export interface DeploymentOption {
  id: string;
  icon: ComponentType<any>;
  title: string;
  price: string;
  description: string;
  features: string[];
  color: string;
  bgColor: string;
  borderColor: string;
  buttonText: string;
  badge?: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  status: string;
  message?: string;
  details?: any;
}

export interface LoginResponse {
  access_token?: string;
  refresh_token?: string;
  user?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface SignupResponse {
  user?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  access_token?: string;
  refresh_token?: string;
}