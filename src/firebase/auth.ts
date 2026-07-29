import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  setPersistence,
  browserLocalPersistence,
  type User 
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

// Ensure standard browser local persistence only if Firebase is configured with a valid API key
if (isFirebaseConfigured) {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn('Firebase persistence warning:', err);
  });
}

export const loginWithEmail = async (email: string, pass: string): Promise<User> => {
  if (!isFirebaseConfigured) {
    throw new Error('auth/api-key-not-valid');
  }
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  return userCredential.user;
};

export const logoutUser = async (): Promise<void> => {
  if (!isFirebaseConfigured) {
    return;
  }
  await signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  if (!isFirebaseConfigured) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};
