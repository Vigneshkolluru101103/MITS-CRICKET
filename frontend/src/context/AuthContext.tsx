import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { loginWithEmail, logoutUser, onAuthChange } from '../firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Single, authoritative Firebase Auth state subscriber
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    setLoading(true);
    try {
      const user = await loginWithEmail(email, pass);
      setCurrentUser(user);
    } catch (err: any) {
      throw new Error(err.message || 'Failed to sign in. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await logoutUser();
    } catch (err) {
      console.error('Firebase signOut error:', err);
    } finally {
      // Clear all client-side storage
      localStorage.clear();
      sessionStorage.clear();

      // Reset state immediately
      setCurrentUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout }}>
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
