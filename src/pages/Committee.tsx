import React from 'react';
import { committeeData } from '../data/committee';
import { CommitteeCard } from '../components/cards/CommitteeCard';
import { Badge } from '../components/ui/Badge';
import { Trophy } from 'lucide-react';

export const Committee: React.FC = () => {
  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="gold" icon={<Trophy className="h-3.5 w-3.5" />}>
          FRANCHISE LEADERSHIP
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
          Team <span className="gradient-text-gold">Captains & Logos</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Official franchise team logos and team captains leading the DILMAN Premier League 2026.
        </p>
      </div>

      {/* Clean Responsive Grid - 3 cards side by side */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {committeeData.map((member) => (
            <CommitteeCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};
