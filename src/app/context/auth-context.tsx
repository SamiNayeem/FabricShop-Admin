// src/context/AuthContext.tsx
"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
}

interface AuthContextProps {
  authState: AuthState;
  login: (user: { username: string }) => void;
  logout: () => void;
}

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
  const router = useRouter();

  const login = (user: { username: string }) => {
    setAuthState({
      isAuthenticated: true,
      user,
    });
    router.push('/Dashboard'); // Redirect to dashboard after login
  };

  const logout = () => {
    setAuthState(defaultAuthState);
    router.push('/Login'); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
