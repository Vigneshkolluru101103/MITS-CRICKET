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
      className="bg-slate-900/80 backdrop-blur-md rounded-[24px] p-7 sm:p-9 border border-slate-800/80 shadow-xl hover:border-[#C5A059]/40 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col items-center text-center group"
    >
      {/* Large Prominent Member Photo Frame (Sponsor Card Style) */}
      <div className="p-3 bg-slate-950/90 rounded-[20px] border border-slate-800 shadow-lg mb-6 group-hover:border-[#E2C889]/60 transition-colors">
        <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-[14px] overflow-hidden shadow-md">
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Member Name */}
      <h3 className="text-[22px] sm:text-[24px] font-bold text-white tracking-tight font-display mb-1 group-hover:text-[#E2C889] transition-colors">
        {member.name}
      </h3>

      {/* Committee Role */}
      {member.role && (
        <p className="text-[15px] font-semibold text-[#E2C889] tracking-wide">
          {member.role}
        </p>
      )}
    </motion.div>
  );
};
