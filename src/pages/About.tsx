import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Target,
  Sparkles,
  ShieldCheck,
  Shirt,
  CircleDot,
  Award,
  Users,
  Compass,
  Flame
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
      title: 'ICC Rules Compliant',
      desc: 'Follows official ICC match guidelines & regulations.',
    },
    {
      icon: <CircleDot className="h-5 w-5 text-rose-400" />,
      title: 'White Leather Ball',
      desc: 'Matches played with standard professional white leather balls.',
    },
    {
      icon: <Trophy className="h-5 w-5 text-[#E2C889]" />,
      title: 'Official Player Auction',
      desc: 'Exciting auction process for team formations.',
    },
    {
      icon: <Shirt className="h-5 w-5 text-cyan-400" />,
      title: 'Free Player Jerseys',
      desc: 'Customized high-quality jerseys provided for all registered players.',
    },
  ];

  const missionPoints = [
    {
      emoji: '🏏',
      icon: <Flame className="h-5 w-5 text-amber-400" />,
      title: 'Promote MITS Talent',
      description: 'Promote MITS cricket talent.',
    },
    {
      emoji: '🤝',
      icon: <Users className="h-5 w-5 text-emerald-400" />,
      title: 'Fair Play & Teamwork',
      description: 'Encourage fair play and teamwork.',
    },
    {
      emoji: '🎯',
      icon: <Target className="h-5 w-5 text-cyan-400" />,
      title: 'Professional Auction Tournaments',
      description: 'Organize professional auction-based tournaments.',
    },
    {
      emoji: '🌟',
      icon: <Award className="h-5 w-5 text-[#E2C889]" />,
      title: 'Unforgettable Experiences',
      description: 'Create unforgettable cricket experiences for MITS players.',
    },
  ];

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8"
      >
        {/* Left Circular DPL Logo (Desktop) */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:flex shrink-0 items-center justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-600 opacity-30 blur-sm" />
            <img
              src="/dpl_logo.jpg"
              alt="DPL Official Logo"
              className="relative h-36 w-36 xl:h-44 xl:w-44 rounded-full object-cover border-2 border-[#D4AF37]/60 shadow-xl shadow-amber-500/10 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </motion.div>

        {/* Centered Text Content */}
        <div className="text-center max-w-2xl mx-auto space-y-3 shrink">
          <Badge variant="gold" icon={<Sparkles className="h-3.5 w-3.5" />}>
            OFFICIAL MITS CRICKET LEAGUE
          </Badge>
          <h1 className="font-black font-display text-center">
            <span className="text-slate-400 text-xs sm:text-base font-bold tracking-widest uppercase block mb-1">ABOUT</span>
            <span className="dilman-brand-text block text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-wider leading-none">DILMAN</span>
            <span className="text-white block text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-[0.18em] sm:tracking-[0.2em] uppercase mt-1 sm:mt-2">PREMIER LEAGUE</span>
          </h1>
        </div>

        {/* Right Circular Profile Picture (Desktop) */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:flex shrink-0 items-center justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-600 opacity-30 blur-sm" />
            <img
              src="/dilman_profile.jpg"
              alt="DILMAN Profile"
              className="relative h-36 w-36 xl:h-44 xl:w-44 rounded-full object-cover border-2 border-[#D4AF37]/60 shadow-xl shadow-amber-500/10 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </motion.div>

        {/* Mobile & Tablet Only (< lg): Side-by-Side Row of Both Circular Images */}
        <div className="flex lg:hidden flex-row items-center justify-center gap-6 sm:gap-10 mt-2 w-full">
          <div className="relative shrink-0">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-600 opacity-30 blur-sm" />
            <img
              src="/dpl_logo.jpg"
              alt="DPL Official Logo"
              className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-2 border-[#D4AF37]/60 shadow-xl shadow-amber-500/10"
            />
          </div>
          <div className="relative shrink-0">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-600 opacity-30 blur-sm" />
            <img
              src="/dilman_profile.jpg"
              alt="DILMAN Profile"
              className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-2 border-[#D4AF37]/60 shadow-xl shadow-amber-500/10"
            />
          </div>
        </div>
      </motion.div>

      {/* Main Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8 hover:border-[#C5A059]/40 transition-all shadow-2xl relative overflow-hidden"
      >
        {/* Background glow elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            The Pinnacle of <span className="text-[#E2C889]">MITS Cricket</span>
          </h2>

          <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            <p>
              <strong className="text-white">DILMAN Premier League (DPL)</strong> is an exclusive auction-based cricket tournament conducted only for MITS Cricket players. The league is designed to provide a professional and competitive platform where MITS cricketers can showcase their talent, compete at a high level, and enjoy a well-organized tournament experience.
            </p>
            <p>
              DPL follows <strong className="text-emerald-400">ICC rules</strong>, uses <strong className="text-[#E2C889]">white leather ball matches</strong>, and features an <strong className="text-cyan-400">official player auction</strong> with <strong className="text-rose-400">free jerseys and attractive Prizes,Trophies and Cricket Equipment.</strong> The tournament is committed to maintaining fairness, discipline, and sportsmanship throughout the competition.
            </p>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors flex items-start space-x-3"
            >
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Vision & Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 glass-panel p-8 sm:p-10 rounded-3xl border border-[#C5A059]/30 flex flex-col justify-between space-y-6 relative overflow-hidden bg-gradient-to-br from-[#0c1018] via-[#07090e] to-[#0c1018]"
        >
          <div className="space-y-4 relative z-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C5A059]/10 text-[#E2C889] border border-[#C5A059]/30">
              <Compass className="h-7 w-7" />
            </div>

            <div>
              <span className="text-xs font-mono text-[#E2C889] tracking-wider uppercase">Strategic Outlook</span>
              <h3 className="text-3xl font-black text-white font-display mt-1">Our Vision</h3>
            </div>

            <p className="text-slate-200 text-lg leading-relaxed font-medium pt-2">
              "To become the most prestigious and professionally managed cricket league exclusively for the MITS Cricket Community."
            </p>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[#E2C889]">EXCLUSIVELY MITS</span>
            <span className="font-mono text-emerald-400">EXCELLENCE DRIVEN</span>
          </div>
        </motion.div>

        {/* Mission Cards Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-4 flex flex-col justify-between"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white font-display">Our Mission</h3>
              <p className="text-xs text-slate-400">The core principles driving every DPL tournament</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {missionPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-5 rounded-2xl border border-slate-800/90 hover:border-emerald-500/40 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl" role="img" aria-label={point.title}>
                    {point.emoji}
                  </span>
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    {point.icon}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                    {point.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
