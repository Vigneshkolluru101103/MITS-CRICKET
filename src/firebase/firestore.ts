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
import { db } from './config';

export interface PlayerRegistrationRecord {
  id?: string;
  name: string;
  phone: string;
  email: string;
  branch: string;
  year: string;
  section: string;
  jerseyName: string;
  transactionId: string;
  paymentScreenshotUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt?: Timestamp | string | number | any;
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

// ----------------------------------------------------
// REGISTRATIONS FIRESTORE HELPERS
// ----------------------------------------------------
export const addRegistrationToFirestore = async (data: Omit<PlayerRegistrationRecord, 'id' | 'createdAt' | 'status'> & { status?: 'Pending' | 'Approved' | 'Rejected' }) => {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Firestore write operation timed out.')), 3500)
  );

  let docId = '';
  try {
    const regRef = collection(db, 'registrations');
    const newDoc = await Promise.race([
      addDoc(regRef, {
        ...data,
        status: data.status || 'Pending',
        createdAt: serverTimestamp(),
      }),
      timeoutPromise
    ]);
    docId = newDoc.id;
  } catch (err: any) {
    console.warn('Firestore write notice (using local fallback ID):', err.message);
    docId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  }

  // Guarantee persistence in localStorage
  try {
    const existing: PlayerRegistrationRecord[] = JSON.parse(localStorage.getItem('dpl_local_registrations') || '[]');
    const newRecord: PlayerRegistrationRecord = {
      id: docId,
      ...data,
      status: data.status || 'Pending',
      createdAt: new Date().toISOString(),
    };
    if (!existing.some(r => r.id === docId)) {
      localStorage.setItem('dpl_local_registrations', JSON.stringify([newRecord, ...existing]));
    }
  } catch (e) {
    console.error('LocalStorage write notice:', e);
  }

  return docId;
};

export const subscribeToRegistrations = (callback: (records: PlayerRegistrationRecord[]) => void) => {
  const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const list: PlayerRegistrationRecord[] = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as PlayerRegistrationRecord[];

    const local: PlayerRegistrationRecord[] = JSON.parse(localStorage.getItem('dpl_local_registrations') || '[]');
    const firestoreIds = new Set(list.map(r => r.id));
    const uniqueLocal = local.filter(r => r.id && !firestoreIds.has(r.id));
    callback([...list, ...uniqueLocal]);
  }, (error) => {
    console.warn('Firestore registrations listener notice:', error.message);
    const local: PlayerRegistrationRecord[] = JSON.parse(localStorage.getItem('dpl_local_registrations') || '[]');
    callback(local);
  });
};

export const updateRegistrationStatusInFirestore = async (id: string, status: 'Approved' | 'Rejected' | 'Pending') => {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Firestore update timed out.')), 3000)
  );

  try {
    const docRef = doc(db, 'registrations', id);
    await Promise.race([
      updateDoc(docRef, { status }),
      timeoutPromise
    ]);
  } catch (err: any) {
    console.warn('Firestore update notice:', err.message);
  }

  const local: PlayerRegistrationRecord[] = JSON.parse(localStorage.getItem('dpl_local_registrations') || '[]');
  const updated = local.map(r => r.id === id ? { ...r, status } : r);
  localStorage.setItem('dpl_local_registrations', JSON.stringify(updated));
};

export const deleteRegistrationFromFirestore = async (id: string) => {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Firestore delete timed out.')), 3000)
  );

  try {
    const docRef = doc(db, 'registrations', id);
    await Promise.race([
      deleteDoc(docRef),
      timeoutPromise
    ]);
  } catch (err: any) {
    console.warn('Firestore delete notice:', err.message);
  }

  const local: PlayerRegistrationRecord[] = JSON.parse(localStorage.getItem('dpl_local_registrations') || '[]');
  const filtered = local.filter(r => r.id !== id);
  localStorage.setItem('dpl_local_registrations', JSON.stringify(filtered));
};

// ----------------------------------------------------
// ANNOUNCEMENTS FIRESTORE HELPERS
// ----------------------------------------------------
export const subscribeToAnnouncements = (callback: (list: AnnouncementFirestoreRecord[]) => void) => {
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
