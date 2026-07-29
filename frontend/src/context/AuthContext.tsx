import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { loginWithEmail, logoutUser, onAuthChange } from '../firebase/auth';

interface AuthContextType {
  currentUser: User | { email: string; uid: string } | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdminAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | { email: string; uid: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Subscribe to Firebase Auth state
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('dpl_admin_auth', 'true');
      } else {
        // Fallback: check if local demo admin session exists
        const localAuth = localStorage.getItem('dpl_admin_auth');
        if (localAuth === 'true') {
          const userEmail = localStorage.getItem('dpl_admin_user') || 'admin@mitsdpl.in';
          setCurrentUser({ email: userEmail, uid: 'local-admin-uid' });
        } else {
          setCurrentUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    setLoading(true);
    try {
      // Attempt Firebase Authentication
      const user = await loginWithEmail(email, pass);
      setCurrentUser(user);
      localStorage.setItem('dpl_admin_auth', 'true');
    } catch (err: any) {
      // Fallback for local demo admin if Firebase project credentials aren't deployed yet
      if ((email.trim().toLowerCase() === 'admin' || email === 'admin@mitsdpl.in') && (pass === 'dpl2026' || pass === 'admin')) {
        const mockUser = { email: 'admin@mitsdpl.in', uid: 'local-admin-uid' };
        setCurrentUser(mockUser);
        localStorage.setItem('dpl_admin_auth', 'true');
        localStorage.setItem('dpl_admin_user', email);
      } else {
        throw new Error(err.message || 'Failed to sign in. Please verify your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await logoutUser();
    } catch {
      // Ignore firebase logout error if local user
    } finally {
      localStorage.removeItem('dpl_admin_auth');
      localStorage.removeItem('dpl_admin_user');
      setCurrentUser(null);
      setLoading(false);
    }
  };

  const isAdminAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout, isAdminAuthenticated }}>
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
