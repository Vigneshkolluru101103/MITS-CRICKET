import React from 'react';
import { motion } from 'framer-motion';
import type { Sponsor } from '../../types';

interface SponsorCardProps {
  sponsor: Sponsor;
}

export const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group bg-slate-900/90 rounded-3xl p-8 border border-slate-800 flex flex-col items-center justify-center shadow-xl hover:border-[#00d2ff]/50 transition-all cursor-pointer"
    >
      {/* Sponsor Photo Frame */}
      <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-white/90 shadow-lg flex items-center justify-center bg-slate-950 mb-6">
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Sponsor Name */}
      <h3 className="text-2xl font-black text-[#00d2ff] tracking-wide text-center drop-shadow-[0_0_10px_rgba(0,210,255,0.4)]">
        {sponsor.name}
      </h3>
    </motion.div>
  );
};
