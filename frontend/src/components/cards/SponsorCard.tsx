import React from 'react';
import { motion } from 'framer-motion';
import type { SponsorItem } from '../../data/sponsors';

interface SponsorCardProps {
  sponsor: SponsorItem;
}

export const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-900/80 backdrop-blur-md rounded-[20px] p-8 border border-slate-800/80 shadow-xl hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col items-center text-center group"
    >
      {/* Sponsor Photo */}
      <div className="w-[140px] h-[140px] rounded-[12px] overflow-hidden mb-6 border border-slate-700/60 shadow-md group-hover:border-emerald-400/50 transition-colors">
        <img
          src={sponsor.photo}
          alt={sponsor.name}
          className="w-[140px] h-[140px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Sponsor Name */}
      <h3 className="text-[24px] font-bold text-white tracking-tight font-display mb-1 group-hover:text-emerald-400 transition-colors">
        {sponsor.name}
      </h3>

      {/* Designation / Company */}
      {sponsor.designation && (
        <p className="text-[16px] text-emerald-400 font-medium mb-3">
          {sponsor.designation}
        </p>
      )}

      {/* Short Description */}
      <p className="text-[15px] leading-[1.7] text-slate-300 max-w-sm">
        {sponsor.description}
      </p>
    </motion.div>
  );
};
