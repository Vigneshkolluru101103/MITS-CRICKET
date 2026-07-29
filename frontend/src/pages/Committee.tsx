import React from 'react';
import { committeeData } from '../data/committee';
import { CommitteeCard } from '../components/cards/CommitteeCard';

export const Committee: React.FC = () => {
  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Student <span className="text-emerald-400">Committee</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Meet the dedicated students working together to organize and manage the MITS Premier League.
        </p>
      </div>

      {/* Clean Responsive Grid (Desktop: 4-5 cards, Tablet: 2-3 cards, Mobile: 1-2 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {committeeData.map((member) => (
          <CommitteeCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};
