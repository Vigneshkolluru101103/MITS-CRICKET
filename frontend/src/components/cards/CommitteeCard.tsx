import React from 'react';
import { motion } from 'framer-motion';
import type { CommitteeMemberItem } from '../../data/committee';

interface CommitteeCardProps {
  member: CommitteeMemberItem;
}

export const CommitteeCard: React.FC<CommitteeCardProps> = ({ member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="bg-slate-900/80 backdrop-blur-md rounded-[20px] p-6 border border-slate-800/80 shadow-xl hover:border-[#C5A059]/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col items-center text-center group"
    >
      {/* Member Photo (Rounded Rectangle: 150px x 180px, radius: 12px) */}
      <div className="w-[150px] h-[180px] rounded-[12px] overflow-hidden mb-5 border border-slate-700/60 shadow-md group-hover:border-[#C5A059]/50 transition-colors">
        <img
          src={member.photo}
          alt={member.name}
          className="w-[150px] h-[180px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Member Name */}
      <h3 className="text-[22px] font-bold text-white tracking-tight font-display mb-1 group-hover:text-[#E2C889] transition-colors">
        {member.name}
      </h3>

      {/* Committee Role */}
      {member.role && (
        <p className="text-[15px] font-semibold text-[#E2C889] mb-2 tracking-wide">
          {member.role}
        </p>
      )}

      {/* Short Description */}
      {member.description && (
        <p className="text-[14px] text-slate-300 leading-relaxed max-w-[240px]">
          {member.description}
        </p>
      )}
    </motion.div>
  );
};
