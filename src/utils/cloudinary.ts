export const uploadToCloudinary = async (file: File): Promise<string> => {
  // 1. Validate file format (JPG, JPEG, PNG)
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.type.toLowerCase())) {
    throw new Error('Invalid file format. Only JPG, JPEG, and PNG images are allowed.');
  }

  // 2. Validate file size (Max 5 MB)
  const maxSizeBytes = 5 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error('File size exceeds the maximum limit of 5 MB.');
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'rdtxedw7';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'payments';

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary environment variables (VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET) are missing.');
  }

  // 3. Prepare FormData
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData.error?.message || `Upload failed with status code ${response.status}`;
      throw new Error(`Cloudinary Upload Error: ${errorMsg}`);
    }

    const data = await response.json();
    if (!data.secure_url) {
      throw new Error('Cloudinary response did not return a valid secure_url.');
    }

    return data.secure_url as string;
  } catch (err: any) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to Cloudinary servers. Please check your connection.');
    }
    throw err;
  }
};

/**
 * Optimizes Cloudinary image URLs with f_auto, q_auto, w_auto, dpr_auto parameters
 */
export const getOptimizedImageUrl = (url: string, width = 600): string => {
  if (!url) return '';
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},dpr_auto/`);
  }
  return url;
};
