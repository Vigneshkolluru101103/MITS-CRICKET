import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import type { Sponsor } from '../../types';
import { Badge } from '../ui/Badge';

interface SponsorCardProps {
  sponsor: Sponsor;
}

export const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor }) => {
  const tierColor = {
    TITLE: 'gold',
    POWERED_BY: 'cyan',
    GOLD: 'gold',
    SILVER: 'slate',
    PARTNER: 'emerald',
  }[sponsor.tier] as 'gold' | 'cyan' | 'slate' | 'emerald';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group glass-panel glass-card-hover rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge variant={tierColor} icon={<ShieldCheck className="h-3 w-3" />}>
            {sponsor.tier.replace('_', ' ')}
          </Badge>
          <span className="text-[10px] font-mono text-slate-500">OFFICIAL PARTNER</span>
        </div>

        <div className="h-32 w-full rounded-xl bg-slate-950/80 border border-slate-800/80 p-4 flex items-center justify-center mb-4 overflow-hidden group-hover:border-[#C5A059]/30 transition-colors">
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
          />
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-[#E2C889] transition-colors">
          {sponsor.name}
        </h3>
        
        <p className="text-xs font-semibold text-[#E2C889]/90 mt-0.5">
          {sponsor.tagline}
        </p>

        {sponsor.description && (
          <p className="text-xs text-slate-400 mt-2 line-clamp-2">
            {sponsor.description}
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-500">MPL SEASON 7</span>
        {sponsor.website && (
          <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#E2C889] hover:text-white"
          >
            <span>Visit Sponsor</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
};
