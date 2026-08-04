import React, { memo } from 'react';
import { motion } from 'framer-motion';
import type { CommitteeMemberItem } from '../../data/committee';
import { getOptimizedImageUrl } from '../../utils/cloudinary';
import { ShieldCheck } from 'lucide-react';

interface CommitteeCardProps {
  member: CommitteeMemberItem;
}

export const CommitteeCard: React.FC<CommitteeCardProps> = memo(({ member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0a0d14]/90 backdrop-blur-xl rounded-[28px] p-6 sm:p-7 border border-slate-800/90 shadow-2xl hover:border-[#D4AF37]/60 hover:shadow-[0_10px_35px_rgba(212,175,55,0.15)] transition-all duration-300 flex flex-col group gpu-layer relative overflow-hidden"
    >
      {/* Top Ambient Glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-all" />

      {/* Header Info Banner */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
        <div>
          <span className="text-[11px] font-mono font-bold text-[#E2C889] uppercase tracking-wider block">Franchise Leader</span>
          <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight group-hover:text-[#E2C889] transition-colors mt-0.5">
            {member.teamName}
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#E2C889] text-[11px] font-mono font-extrabold flex items-center gap-1.5 shadow-sm shrink-0">
          <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span>{member.role}</span>
        </div>
      </div>

      {/* Side-by-Side Images Container */}
      <div className="grid grid-cols-2 gap-4 items-stretch my-2">
        {/* Left Side: Captain Photo */}
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-[4/5] rounded-[18px] overflow-hidden border-2 border-slate-800 group-hover:border-[#E2C889]/60 shadow-lg transition-all bg-slate-950">
            <img
              src={getOptimizedImageUrl(member.photo, 400)}
              alt={member.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* Captain Name Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-2 pt-6 text-center">
              <span className="text-xs font-black text-white font-display block uppercase tracking-wider">
                {member.name}
              </span>
              <span className="text-[10px] text-[#E2C889] font-mono font-extrabold tracking-widest block uppercase">
                CAPTAIN
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Team Logo */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full aspect-[4/5] rounded-[18px] overflow-hidden border-2 border-[#D4AF37]/40 group-hover:border-[#D4AF37] shadow-xl transition-all p-3 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/90 flex flex-col items-center justify-center text-center">
            <img
              src={getOptimizedImageUrl(member.teamLogo, 400)}
              alt={`${member.teamName} Logo`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.35)] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-1.5 text-center">
              <span className="text-[10px] text-slate-300 font-mono font-bold block uppercase tracking-widest">
                OFFICIAL LOGO
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

CommitteeCard.displayName = 'CommitteeCard';
