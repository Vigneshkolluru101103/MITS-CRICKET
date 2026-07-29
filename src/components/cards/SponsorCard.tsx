import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { SponsorItem } from '../../data/sponsors';
import { Badge } from '../ui/Badge';
import { getOptimizedImageUrl } from '../../utils/cloudinary';

interface SponsorCardProps {
  sponsor: SponsorItem;
}

export const SponsorCard: React.FC<SponsorCardProps> = memo(({ sponsor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group glass-panel rounded-[24px] border border-slate-800/80 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#D4AF37]/40 shadow-xl hover:shadow-2xl gpu-layer"
    >
      {/* Photo Container */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
        <img
          src={getOptimizedImageUrl(sponsor.photo, 600)}
          alt={sponsor.name}
          loading="lazy"
          decoding="async"
          width={600}
          height={400}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/30 to-transparent pointer-events-none" />

        <div className="absolute top-4 left-4">
          <Badge variant="gold" icon={<Sparkles className="h-3 w-3" />}>
            OFFICIAL SPONSOR
          </Badge>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 pt-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#E2C889] transition-colors font-display">
            {sponsor.name}
          </h3>

          {sponsor.designation && (
            <p className="text-xs sm:text-sm font-semibold text-[#E2C889]/90 mt-1">
              {sponsor.designation}
            </p>
          )}

          <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
            {sponsor.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

SponsorCard.displayName = 'SponsorCard';
