import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  setPersistence,
  inMemoryPersistence,
  type User 
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

// Use inMemoryPersistence so page refresh automatically logs out admin
if (isFirebaseConfigured) {
  setPersistence(auth, inMemoryPersistence).catch((err) => {
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
