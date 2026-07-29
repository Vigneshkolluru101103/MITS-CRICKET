import React from 'react';
import { sponsorsData } from '../data/sponsors';
import { SponsorCard } from '../components/cards/SponsorCard';

export const Sponsors: React.FC = () => {
  return (
    <div className="pt-32 pb-24 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Our <span className="text-emerald-400">Valued Sponsors</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          We sincerely thank our sponsors for supporting the DPL Premier League.
        </p>
      </div>

      {/* Responsive Sponsors Grid - 3 cards side by side in the same line */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {sponsorsData.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </div>
  );
};
