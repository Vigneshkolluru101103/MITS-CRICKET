import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { loginWithEmail, logoutUser, onAuthChange } from '../firebase/auth';
import { isFirebaseConfigured } from '../firebase/config';

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
    // Force auto-logout on page refresh
    localStorage.removeItem('dpl_admin_user');
    localStorage.removeItem('dpl_admin_auth');
    sessionStorage.removeItem('dpl_admin_user');
    sessionStorage.removeItem('dpl_admin_auth');

    if (isFirebaseConfigured) {
      logoutUser().catch(() => {});
    }

    const unsubscribe = onAuthChange((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    setLoading(true);
    const userEmail = email.trim();

    if (!userEmail || !pass) {
      setLoading(false);
      throw new Error('Email and password are required.');
    }

    try {
      const user = await loginWithEmail(userEmail, pass);
      setCurrentUser(user);
      localStorage.removeItem('dpl_admin_user');
      localStorage.removeItem('dpl_admin_auth');
    } catch (err: unknown) {
      if (!isFirebaseConfigured) {
        const mockUser = {
          uid: 'demo-admin-uid',
          email: userEmail,
          displayName: 'Admin Directorate',
        } as User;
        localStorage.setItem('dpl_admin_user', mockUser.email || 'admin@local.dev');
        localStorage.setItem('dpl_admin_auth', 'true');
        setCurrentUser(mockUser);
        return;
      }

      const message = err instanceof Error ? err.message : 'Failed to sign in. Please verify your credentials.';
      throw new Error(message);
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
      localStorage.removeItem('dpl_admin_user');
      localStorage.removeItem('dpl_admin_auth');
      sessionStorage.removeItem('dpl_admin_user');
      sessionStorage.removeItem('dpl_admin_auth');
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
