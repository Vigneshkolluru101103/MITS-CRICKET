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
  const regRef = collection(db, 'registrations');
  const newDoc = await addDoc(regRef, {
    ...data,
    status: data.status || 'Pending',
    createdAt: serverTimestamp(),
  });
  return newDoc.id;
};

export const subscribeToRegistrations = (callback: (records: PlayerRegistrationRecord[]) => void) => {
  const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const list: PlayerRegistrationRecord[] = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as PlayerRegistrationRecord[];
    callback(list);
  }, (error) => {
    console.warn('Firestore registrations listener notice:', error.message);
    callback([]);
  });
};

export const updateRegistrationStatusInFirestore = async (id: string, status: 'Approved' | 'Rejected' | 'Pending') => {
  const docRef = doc(db, 'registrations', id);
  await updateDoc(docRef, { status });
};

export const deleteRegistrationFromFirestore = async (id: string) => {
  const docRef = doc(db, 'registrations', id);
  await deleteDoc(docRef);
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
