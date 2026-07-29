import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config';

export const uploadPaymentScreenshot = async (file: File): Promise<string> => {
  // 1. Validate file format
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file format. Only JPG, JPEG, and PNG images are allowed.');
  }

  // 2. Validate file size (Max 5 MB)
  const maxSizeBytes = 5 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error('File size exceeds the maximum limit of 5 MB.');
  }

  // 3. Generate unique filename
  const fileExt = file.name.split('.').pop() || 'png';
  const uniqueName = `payment-screenshots/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  
  const storageRef = ref(storage, uniqueName);

  // 4. Upload file & obtain download URL
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};

export const uploadGalleryPhoto = async (file: File): Promise<string> => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file format. Only images are allowed.');
  }

  const fileExt = file.name.split('.').pop() || 'jpg';
  const uniqueName = `gallery/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  
  const storageRef = ref(storage, uniqueName);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};
