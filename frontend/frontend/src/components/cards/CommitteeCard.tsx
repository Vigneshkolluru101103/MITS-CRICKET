import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Share2 } from 'lucide-react';
import type { CommitteeMember } from '../../types';
import { Badge } from '../ui/Badge';

interface CommitteeCardProps {
  member: CommitteeMember;
}

export const CommitteeCard: React.FC<CommitteeCardProps> = ({ member }) => {
  const categoryBadge = {
    FACULTY: { label: 'Faculty Coordinator', variant: 'crimson' as const },
    STUDENT_LEAD: { label: 'Student Lead', variant: 'gold' as const },
    DIRECTOR: { label: 'League Director', variant: 'cyan' as const },
    TECHNICAL: { label: 'Tech & Media Lead', variant: 'emerald' as const },
  }[member.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group glass-panel rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#C5A059]/30 shadow-lg"
    >
      <div className="relative h-64 w-full overflow-hidden bg-slate-950">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/20 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <Badge variant={categoryBadge.variant}>
            {categoryBadge.label}
          </Badge>
        </div>

        {member.batch && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-mono font-bold text-[#E2C889]">
            {member.batch}
          </div>
        )}
      </div>

      <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-[#E2C889] transition-colors font-display">
            {member.name}
          </h3>
          <p className="text-xs font-semibold text-[#E2C889]/90 mt-0.5">
            {member.role}
          </p>

          {member.department && (
            <p className="text-xs text-slate-400 font-mono mt-1">
              {member.department}
            </p>
          )}

          <p className="text-xs text-slate-300 mt-3 leading-relaxed line-clamp-3">
            {member.bio}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-3">
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#E2C889] hover:border-[#C5A059]/40 transition-colors"
              aria-label="LinkedIn"
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
          {member.socials.instagram && (
            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#E2C889] hover:border-[#C5A059]/40 transition-colors"
              aria-label="Social"
            >
              <Share2 className="h-4 w-4" />
            </a>
          )}
          {member.socials.email && (
            <a
              href={`mailto:${member.socials.email}`}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#E2C889] hover:border-[#C5A059]/40 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
