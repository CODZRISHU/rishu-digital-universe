import React, { createContext, useContext, useState, useEffect } from 'react';
import type { IUser, ILoginDto } from '@rishu/shared-types';
import { portfolioApi } from '../services/api';

interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (dto: ILoginDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('rishu_user');
    const token = localStorage.getItem('rishu_access_token');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.clear();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (dto: ILoginDto) => {
    const res = await portfolioApi.login(dto);
    localStorage.setItem('rishu_access_token', res.accessToken);
    localStorage.setItem('rishu_refresh_token', res.refreshToken);
    localStorage.setItem('rishu_user', JSON.stringify(res.user));
    setUser(res.user as any);
  };

  const logout = () => {
    localStorage.removeItem('rishu_access_token');
    localStorage.removeItem('rishu_refresh_token');
    localStorage.removeItem('rishu_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
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
