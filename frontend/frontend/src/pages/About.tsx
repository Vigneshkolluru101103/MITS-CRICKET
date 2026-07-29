import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Users, MapPin, Award } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const About: React.FC = () => {
  return (
    <div className="pt-28 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="gold">Legacy & Excellence</Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight">
          ABOUT <span className="gradient-text-gold">DILMAN PREMIER LEAGUE</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Established in 2020, the DILMAN Premier League (DPL) is the premier T20 sports showcase of Dilman Institute of Technology and Science. Connecting students, alumni, and faculty in a grand celebration of athletic competition.
        </p>
      </div>

      {/* Core Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-[#C5A059]/40 transition-colors"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C5A059]/10 text-[#E2C889] border border-[#C5A059]/30">
            <Trophy className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-extrabold text-white font-display">Unrivalled Competition</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Professional league architecture incorporating auction bids, custom player kits, official umpires, and ball-by-ball CricHeroes stats tracking.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-colors"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-extrabold text-white font-display">Student & Alumni Synergy</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Bridging generations of DILMAN talent. Alumni and active undergrads compete side by side, building lifelong professional and sporting networks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-rose-500/40 transition-colors"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-extrabold text-white font-display">Sportsmanship & Discipline</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Cultivating resilience, team leadership, strategic thinking, and ethical sportsmanship beyond academic classrooms.
          </p>
        </motion.div>
      </div>

      {/* Venue Spotlight */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 lg:p-12 flex flex-col justify-between space-y-6">
            <div>
              <Badge variant="emerald" icon={<MapPin className="h-3.5 w-3.5" />}>
                Official Ground Spotlight
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 font-display">
                DILMAN Central Stadium Turf
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                Featuring a lush green outfield, professional 22-yard turf wicket, high-lumen floodlight illumination for day-night matches, digital scoreboard towers, and covered pavilion stands for 1,500+ spectators.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-500">PITCH SPECIFICATION</span>
                <p className="text-sm font-bold text-[#E2C889]">Natural Clay Turf</p>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500">LIGHTING</span>
                <p className="text-sm font-bold text-[#E2C889]">Full LED Floodlights</p>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500">SEATING CAPACITY</span>
                <p className="text-sm font-bold text-[#E2C889]">1,500 Spectators</p>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500">STREAMING</span>
                <p className="text-sm font-bold text-emerald-400">CricHeroes Live Camera</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[300px] lg:min-h-full bg-slate-900 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&auto=format&fit=crop&q=80"
              alt="DILMAN Sports Ground"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#07090e] lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </div>

      {/* Leadership Callout */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#C5A059]/30 text-center max-w-3xl mx-auto space-y-6">
        <Award className="h-10 w-10 text-[#E2C889] mx-auto" />
        <h3 className="text-2xl font-bold text-white font-display">
          "Sports builds character, discipline, and lifelong camaraderie."
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed italic">
          "DILMAN Premier League represents our commitment to holistic student development. We are proud to provide world-class facilities and a platform where students and alumni showcase their athletic excellence."
        </p>
        <div>
          <h4 className="text-base font-bold text-white">Dr. R. K. Ramesh</h4>
          <p className="text-xs font-mono text-[#E2C889]">Principal & Patron, DILMAN</p>
        </div>
      </div>
    </div>
  );
};
