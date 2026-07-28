import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { CommitteeMembersData } from '../data/mockData';
import { CommitteeCard } from '../components/cards/CommitteeCard';
import { Badge } from '../components/ui/Badge';

export const Committee: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'FACULTY', 'STUDENT_LEAD', 'DIRECTOR', 'TECHNICAL'];

  const filteredMembers = activeCategory === 'ALL'
    ? CommitteeMembersData
    : CommitteeMembersData.filter(m => m.category === activeCategory);

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="gold" icon={<Users className="h-3.5 w-3.5" />}>League Leadership</Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight">
          ORGANIZING <span className="gradient-text-gold">COMMITTEE</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Meet the dedicated team of faculty advisors, student league presidents, ground marshals, and tech leads organizing DPL Season 7.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center overflow-x-auto pb-2">
        <div className="glass-panel p-1.5 rounded-2xl border border-slate-800 flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#D5B266] to-[#C59B4E] text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? 'ALL MEMBERS' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Committee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <CommitteeCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};
