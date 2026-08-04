import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  type Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

export interface PlayerRegistrationRecord {
  id?: string;
  name: string;
  phone: string;
  email: string;
  branch: string;
  year: string;
  section?: string;
  jerseyName: string;
  transactionId: string;
  paymentScreenshotUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  category?: 'STUDENT' | 'ALUMNI';
  rollNo?: string;
  department?: string;
  batchYear?: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  tshirtSize?: string;
  createdAt?: Timestamp | string | number | any;
}

export interface RegistrationSaveResult {
  id: string;
  savedToFirestore: boolean;
  savedLocally: boolean;
  error?: string;
}

export interface GalleryFirestoreRecord {
  id?: string;
  title: string;
  url: string;
  createdAt?: any;
}

export interface AnnouncementFirestoreRecord {
  id?: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  author: string;
  isImportant?: boolean;
  coverImage?: string;
  createdAt?: any;
}

const LOCAL_REGISTRATIONS_KEY = 'dpl_local_registrations';
export const REGISTRATIONS_UPDATED_EVENT = 'dpl-registrations-updated';

/** Firestore rejects large docs; never persist base64 data URLs. */
const sanitizeScreenshotUrl = (url: string): string =>
  url.startsWith('data:') ? '' : url;

const sanitizeRegistrationData = (
  data: Record<string, any>
) => {
  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      sanitized[key] = value;
    }
  }
  if (sanitized.paymentScreenshotUrl) {
    sanitized.paymentScreenshotUrl = sanitizeScreenshotUrl(sanitized.paymentScreenshotUrl);
  }
  return sanitized;
};

const getLocalRegistrations = (): PlayerRegistrationRecord[] => {
  try {
    const records: PlayerRegistrationRecord[] = JSON.parse(localStorage.getItem(LOCAL_REGISTRATIONS_KEY) || '[]');
    return records.map(r => ({
      ...r,
      paymentScreenshotUrl: sanitizeScreenshotUrl(r.paymentScreenshotUrl || ''),
    }));
  } catch {
    return [];
  }
};

const saveLocalRegistrations = (records: PlayerRegistrationRecord[]): boolean => {
  try {
    localStorage.setItem(LOCAL_REGISTRATIONS_KEY, JSON.stringify(records));
    window.dispatchEvent(new Event(REGISTRATIONS_UPDATED_EVENT));
    return true;
  } catch (e) {
    console.error('LocalStorage write failed:', e);
    return false;
  }
};

const mergeRegistrations = (
  firestoreRecords: PlayerRegistrationRecord[],
  localRecords: PlayerRegistrationRecord[]
): PlayerRegistrationRecord[] => {
  const firestoreIds = new Set(firestoreRecords.map(r => r.id));
  const uniqueLocal = localRecords.filter(r => r.id && !firestoreIds.has(r.id));
  return [...firestoreRecords, ...uniqueLocal];
};

// ----------------------------------------------------
// REGISTRATIONS FIRESTORE HELPERS
// ----------------------------------------------------
export const addRegistrationToFirestore = async (
  data: Omit<PlayerRegistrationRecord, 'id' | 'createdAt' | 'status'> & { status?: 'Pending' | 'Approved' | 'Rejected' }
): Promise<RegistrationSaveResult> => {
  const newStatus = data.status || 'Pending';
  const sanitized = sanitizeRegistrationData(data);
  let docId = '';
  let savedToFirestore = false;
  let firestoreError: string | undefined;

  if (isFirebaseConfigured) {
    try {
      const regRef = collection(db, 'registrations');
      const newDoc = await addDoc(regRef, {
        ...sanitized,
        status: newStatus,
        createdAt: serverTimestamp(),
      });
      docId = newDoc.id;
      savedToFirestore = true;
    } catch (err: unknown) {
      const firebaseErr = err as { code?: string; message?: string };
      firestoreError =
        firebaseErr.code === 'permission-denied'
          ? 'Firestore permission denied. Check your Firestore Security Rules in Firebase Console.'
          : firebaseErr.message || 'Unknown Firestore error';
      console.error('Firestore registration write failed:', err);
      docId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    }
  } else {
    firestoreError = 'Firebase is not configured. Add VITE_FIREBASE_* variables to your .env file.';
    docId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  }

  const newRecord: PlayerRegistrationRecord = {
    id: docId,
    ...(sanitized as PlayerRegistrationRecord),
    status: newStatus,
    createdAt: new Date().toISOString(),
  };

  let savedLocally = false;
  try {
    const existing = getLocalRegistrations();
    if (!existing.some(r => r.id === docId)) {
      savedLocally = saveLocalRegistrations([newRecord, ...existing]);
    } else {
      savedLocally = true;
    }
  } catch (e) {
    console.error('LocalStorage registration save failed:', e);
  }

  return {
    id: docId,
    savedToFirestore,
    savedLocally,
    error: savedToFirestore ? undefined : firestoreError,
  };
};

export const subscribeToRegistrations = (
  callback: (records: PlayerRegistrationRecord[]) => void,
  onStatus?: (status: { firestoreConnected: boolean; error?: string }) => void
) => {
  const publish = (records: PlayerRegistrationRecord[]) => callback(records);

  const publishMerged = (firestoreRecords: PlayerRegistrationRecord[]) => {
    const local = getLocalRegistrations();
    const combined = mergeRegistrations(firestoreRecords, local);
    saveLocalRegistrations(combined);
    publish(combined);
  };

  const publishLocalOnly = () => publish(getLocalRegistrations());

  publishLocalOnly();

  const onLocalUpdate = () => publishLocalOnly();
  window.addEventListener(REGISTRATIONS_UPDATED_EVENT, onLocalUpdate);

  if (!isFirebaseConfigured) {
    onStatus?.({ firestoreConnected: false, error: 'Firebase is not configured.' });
    return () => {
      window.removeEventListener(REGISTRATIONS_UPDATED_EVENT, onLocalUpdate);
    };
  }

  const colRef = collection(db, 'registrations');

  const unsubscribe = onSnapshot(
    colRef,
    (snapshot) => {
      onStatus?.({ firestoreConnected: true });
      const list: PlayerRegistrationRecord[] = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as PlayerRegistrationRecord[];

      // Client-side sort by createdAt
      list.sort((a, b) => {
        const timeA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt || 0).getTime();
        const timeB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt || 0).getTime();
        return timeB - timeA;
      });

      publishMerged(list);
    },
    (err) => {
      const firebaseErr = err as { code?: string; message?: string };
      console.error('Firestore registrations listener failed:', err);
      onStatus?.({
        firestoreConnected: false,
        error:
          firebaseErr.code === 'permission-denied'
            ? 'Sign in with a Firebase admin account or adjust rules to view registrations.'
            : firebaseErr.message || 'Could not connect to Firestore.',
      });
      publishLocalOnly();
    }
  );

  return () => {
    unsubscribe();
    window.removeEventListener(REGISTRATIONS_UPDATED_EVENT, onLocalUpdate);
  };
};

export const updateRegistrationStatusInFirestore = async (id: string, status: 'Approved' | 'Rejected' | 'Pending') => {
  if (isFirebaseConfigured && !id.startsWith('reg_')) {
    try {
      const docRef = doc(db, 'registrations', id);
      await updateDoc(docRef, { status });
    } catch (err) {
      console.error('Firestore status update failed:', err);
    }
  }

  try {
    const local = getLocalRegistrations();
    const updated = local.map(r => r.id === id ? { ...r, status } : r);
    saveLocalRegistrations(updated);
  } catch (e) {
    console.error('LocalStorage status update failed:', e);
  }
};

export const deleteRegistrationFromFirestore = async (id: string) => {
  if (isFirebaseConfigured && !id.startsWith('reg_')) {
    try {
      const docRef = doc(db, 'registrations', id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('Firestore delete failed:', err);
    }
  }

  try {
    const local = getLocalRegistrations();
    saveLocalRegistrations(local.filter(r => r.id !== id));
  } catch (e) {
    console.error('LocalStorage delete failed:', e);
  }
};

// ----------------------------------------------------
// ANNOUNCEMENTS FIRESTORE HELPERS
// ----------------------------------------------------
export const subscribeToAnnouncements = (callback: (list: AnnouncementFirestoreRecord[]) => void) => {
  if (!isFirebaseConfigured) {
    callback([]);
    return () => {};
  }

  const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as AnnouncementFirestoreRecord[];
    callback(list);
  }, () => callback([]));
};

export const addAnnouncementToFirestore = async (item: Omit<AnnouncementFirestoreRecord, 'id'>) => {
  const colRef = collection(db, 'announcements');
  await addDoc(colRef, { ...item, createdAt: serverTimestamp() });
};

export const deleteAnnouncementFromFirestore = async (id: string) => {
  await deleteDoc(doc(db, 'announcements', id));
};

// ----------------------------------------------------
// GALLERY FIRESTORE HELPERS
// ----------------------------------------------------
export const subscribeToGallery = (callback: (list: GalleryFirestoreRecord[]) => void) => {
  if (!isFirebaseConfigured) {
    callback([]);
    return () => {};
  }

  const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as GalleryFirestoreRecord[];
    callback(list);
  }, () => callback([]));
};

export const addGalleryItemToFirestore = async (title: string, url: string) => {
  const colRef = collection(db, 'gallery');
  await addDoc(colRef, { title, url, createdAt: serverTimestamp() });
};

export const deleteGalleryItemFromFirestore = async (id: string) => {
  await deleteDoc(doc(db, 'gallery', id));
};
