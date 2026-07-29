import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Bell } from 'lucide-react';
import { AnnouncementsData } from '../data/mockData';
import type { Announcement } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const Announcements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeAnnouncement, setActiveAnnouncement] = useState<Announcement | null>(null);

  const categories = ['ALL', 'REGISTRATION', 'AUCTION', 'RULES'];

  const filteredAnnouncements = selectedCategory === 'ALL'
    ? AnnouncementsData
    : AnnouncementsData.filter(a => a.category === selectedCategory);

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="gold" icon={<Bell className="h-3.5 w-3.5" />}>Latest Press Releases</Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight">
          LEAGUE <span className="gradient-text-gold">ANNOUNCEMENTS</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Stay updated with official bulletins regarding auction dates, rule changes, live stream schedules, and trials.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex justify-center overflow-x-auto pb-2">
        <div className="glass-panel p-1.5 rounded-2xl border border-slate-800 flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#D5B266] to-[#C59B4E] text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Feed */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {filteredAnnouncements.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 hover:border-[#C5A059]/40 transition-all flex flex-col md:flex-row gap-6 items-start"
          >
            {item.coverImage && (
              <img
                src={item.coverImage}
                alt={item.title}
                className="h-44 w-full md:w-56 rounded-2xl object-cover shrink-0 border border-slate-800"
              />
            )}

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={item.isImportant ? 'crimson' : 'gold'}>
                  {item.category}
                </Badge>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-[#C5A059]" />
                  {item.date}
                </span>
                <span className="text-xs font-mono text-slate-500">• By {item.author}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-display leading-tight">
                {item.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {item.summary}
              </p>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<ArrowRight className="h-4 w-4" />}
                  onClick={() => setActiveAnnouncement(item)}
                >
                  Read Full Announcement
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal Reader */}
      <Modal
        isOpen={!!activeAnnouncement}
        onClose={() => setActiveAnnouncement(null)}
        maxWidth="2xl"
      >
        {activeAnnouncement && (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="flex items-center gap-2">
              <Badge variant="gold">{activeAnnouncement.category}</Badge>
              <span className="text-xs font-mono text-slate-400">{activeAnnouncement.date}</span>
            </div>

            <h2 className="text-2xl font-bold text-white font-display">{activeAnnouncement.title}</h2>

            <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed border-t border-slate-800 pt-4">
              {activeAnnouncement.content}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
