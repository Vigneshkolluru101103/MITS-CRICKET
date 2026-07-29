import React, { useState, useEffect } from 'react';
import { 
  subscribeToGallery, 
  addGalleryItemToFirestore, 
  deleteGalleryItemFromFirestore, 
  type GalleryFirestoreRecord 
} from '../../firebase/firestore';
import { uploadGalleryPhoto } from '../../firebase/storage';
import { Button } from '../../components/ui/Button';
import { Upload, Trash2, Plus } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryFirestoreRecord[]>([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToGallery((data) => {
      setItems(data);
    });
    return () => unsubscribe();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    setIsUploading(true);
    try {
      const downloadUrl = await uploadGalleryPhoto(file);
      await addGalleryItemToFirestore(title.trim(), downloadUrl);
      setTitle('');
      setFile(null);
      alert('Photo added to gallery successfully!');
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this gallery photo?')) {
      await deleteGalleryItemFromFirestore(id);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white font-display">Gallery Manager</h1>
        <p className="text-sm text-slate-400">
          Upload and manage official tournament gallery photos in Cloud Firestore & Storage.
        </p>
      </div>

      {/* Upload Box */}
      <form onSubmit={handleUpload} className="glass-panel bg-slate-900/90 p-6 sm:p-8 rounded-[24px] border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
          <Upload className="h-5 w-5 text-[#D4AF37]" />
          Upload New Gallery Photo
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">Photo Title / Caption</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. DPL 2026 Grand Final Trophy Presentation"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">Image File (JPG, PNG)</label>
            <input
              type="file"
              required
              accept="image/*"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37] file:text-slate-950 text-xs font-mono"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isUploading}
            icon={<Plus className="h-4 w-4" />}
          >
            {isUploading ? 'Uploading to Firebase Storage...' : 'Add Photo to Gallery'}
          </Button>
        </div>
      </form>

      {/* Gallery Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-500 font-mono text-xs glass-panel rounded-[24px] border border-slate-800">
            No dynamic gallery photos uploaded yet. Use the form above to add photos.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="glass-panel bg-slate-900/90 rounded-[20px] border border-slate-800 overflow-hidden shadow-xl group">
              <div className="relative h-48 w-full bg-slate-950">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => item.id && handleDelete(item.id)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-rose-600/90 text-white hover:bg-rose-500 shadow-md"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-white truncate">{item.title}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
