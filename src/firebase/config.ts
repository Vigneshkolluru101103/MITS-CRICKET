import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Firebase client config. Env vars take priority; fallbacks ensure the live
 * Vercel site still connects when build-time env vars were not set.
 * (Firebase web API keys are public by design — security is in Firestore rules.)
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBb89Af3phZraH4Wp92VhPuZpenr9txCVI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'mits-cricket.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'mits-cricket',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'mits-cricket.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '162035038041',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:162035038041:web:36e21e0a1b05708394fe48',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey.trim().length > 10 &&
  !firebaseConfig.apiKey.includes('DummyKey') &&
  firebaseConfig.projectId === 'mits-cricket'
);

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
