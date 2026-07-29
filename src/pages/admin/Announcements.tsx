import React, { useState, useEffect } from 'react';
import { 
  subscribeToAnnouncements, 
  addAnnouncementToFirestore, 
  deleteAnnouncementFromFirestore, 
  type AnnouncementFirestoreRecord 
} from '../../firebase/firestore';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Bell, Plus, Trash2 } from 'lucide-react';

export const Announcements: React.FC = () => {
  const [items, setItems] = useState<AnnouncementFirestoreRecord[]>([]);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('REGISTRATION');
  const author = 'DPL Directorate';
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAnnouncements((data) => {
      setItems(data);
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await addAnnouncementToFirestore({
        title: title.trim(),
        summary: summary.trim() || title.trim(),
        content: content.trim(),
        category,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        author,
        isImportant: category === 'RULES' || category === 'REGISTRATION',
      });

      setTitle('');
      setSummary('');
      setContent('');
      alert('Announcement published to Firestore successfully!');
    } catch (err: any) {
      alert('Failed to publish announcement: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this announcement entry?')) {
      await deleteAnnouncementFromFirestore(id);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white font-display">Announcements Manager</h1>
        <p className="text-sm text-slate-400">
          Create and manage official press releases, rules, and announcements in Cloud Firestore.
        </p>
      </div>

      {/* New Announcement Form */}
      <form onSubmit={handleAdd} className="glass-panel bg-slate-900/90 p-6 sm:p-8 rounded-[24px] border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
          <Bell className="h-5 w-5 text-[#D4AF37]" />
          Publish New Announcement
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">Announcement Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Official Tournament Player Auction Dates"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-[#D4AF37] focus:outline-none text-sm font-mono"
            >
              <option value="REGISTRATION">REGISTRATION</option>
              <option value="AUCTION">AUCTION</option>
              <option value="RULES">RULES</option>
              <option value="GENERAL">GENERAL</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">Short Summary</label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief one-line summary..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">Full Content Text</label>
          <textarea
            required
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write the full announcement text or rules here..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none text-sm font-mono"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
            icon={<Plus className="h-4 w-4" />}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Announcement'}
          </Button>
        </div>
      </form>

      {/* Announcements Feed List */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-mono text-xs glass-panel rounded-[24px] border border-slate-800">
            No custom Firestore announcements created yet. Built-in announcements are displayed from mock data.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="glass-panel bg-slate-900/90 p-6 rounded-[20px] border border-slate-800 flex items-start justify-between gap-4 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="gold">{item.category}</Badge>
                  <span className="text-xs font-mono text-slate-400">{item.date}</span>
                </div>
                <h4 className="text-xl font-bold text-white font-display">{item.title}</h4>
                <p className="text-sm text-slate-300 line-clamp-2">{item.summary}</p>
              </div>
              <button
                onClick={() => item.id && handleDelete(item.id)}
                className="p-2.5 rounded-xl bg-rose-600/90 text-white hover:bg-rose-500 shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
