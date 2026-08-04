export const uploadToCloudinary = async (file: File): Promise<string> => {
  // 1. Validate file format (JPG, JPEG, PNG, WEBP, HEIC, HEIF, etc.)
  const fileType = (file.type || '').toLowerCase();
  const fileName = (file.name || '').toLowerCase();
  const isImageMime = fileType.startsWith('image/');
  const isAllowedExt = /\.(jpg|jpeg|png|webp|heic|heif)$/i.test(fileName);

  if (fileType && !isImageMime && !isAllowedExt) {
    throw new Error('Invalid file format. Please upload an image file (JPG, PNG, WEBP, HEIC).');
  }

  // 2. Validate file size (Max 10 MB)
  const maxSizeBytes = 10 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error('File size exceeds the maximum limit of 10 MB.');
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

  // Mobile networks can be slower, allow 35s timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

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
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Cloudinary upload request timed out. Check connection or try a smaller image.');
    }
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
