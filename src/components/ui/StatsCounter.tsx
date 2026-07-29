import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Trophy, Calendar } from 'lucide-react';
import { DILMANLeagueStats } from '../../data/mockData';

export const StatsCounter: React.FC = () => {
  const stats = [
    {
      icon: <Users className="h-5 w-5 text-[#E2C889]" />,
      value: `${DILMANLeagueStats.totalPlayersRegistered}+`,
      label: 'Registered Players',
      sublabel: 'Active Students & Alumini',
      glow: 'group-hover:border-[#C5A059]/30',
    },
    {
      icon: <Shield className="h-5 w-5 text-sky-400" />,
      value: `${DILMANLeagueStats.participatingTeams}`,
      label: 'Franchise Teams',
      sublabel: 'Professional Players',
      glow: 'group-hover:border-sky-500/30',
    },
    {
      icon: <Trophy className="h-5 w-5 text-[#E2C889]" />,
      value: DILMANLeagueStats.auctionCap,
      label: 'League Value',
      sublabel: 'Trophies, Jerseys, Equipment and More!',
      glow: 'group-hover:border-[#C5A059]/30',
    },
    {
      icon: <Calendar className="h-5 w-5 text-emerald-400" />,
      value: `${DILMANLeagueStats.totalMatches}`,
      label: 'Total Matches',
      sublabel: 'T20 Format',
      glow: 'group-hover:border-emerald-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.08 }}
          className={`group glass-panel glass-card-hover p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between ${stat.glow}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              {stat.icon}
            </div>
            <span className="text-[11px] font-mono font-medium text-slate-500">SEASON 1</span>
          </div>

          <div>
            <h4 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-mono mb-1">
              {stat.value}
            </h4>
            <p className="text-sm font-semibold text-slate-200">{stat.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{stat.sublabel}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
