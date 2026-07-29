import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, UserPlus, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';
import { DILMANLeagueStats, CricHeroesConfig, AnnouncementsData, TeamsList } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CountdownTimer } from '../components/ui/CountdownTimer';
import { StatsCounter } from '../components/ui/StatsCounter';

export const Home: React.FC = () => {
  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern">
        {/* Soft Ambient Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] sm:h-[650px] sm:w-[650px] rounded-full bg-gradient-to-tr from-[#C5A059]/10 via-[#9F1239]/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">

          {/* Top Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Badge variant="gold" icon={<Sparkles className="h-3.5 w-3.5" />}>
              DILMAN Premier League 2026
            </Badge>
          </motion.div>

          {/* Main Title Header */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight font-display max-w-5xl mx-auto leading-[1.05]"
          >
            WELCOME TO THE <span className="gradient-text-gold">DPL 2026</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the biggest collegiate cricket spectacle at Madanapalle Institute of Technology & Science. Home to 3 dynamic franchises, 40+ outstanding players, an adrenaline-filled player auction, and every match streamed live in HD on CricHeroes.
          </motion.p>

          {/* Hero Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none"
          >
            <Link to="/register" className="w-full sm:w-auto">
              <Button
                variant="gold"
                size="xl"
                icon={<UserPlus className="h-5 w-5" />}
                glow
                className="w-full sm:w-auto"
              >
                Register as Player
              </Button>
            </Link>

            <a
              href={CricHeroesConfig.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="cricheroes"
                size="xl"
                icon={<ArrowRight className="h-5 w-5" />}
                className="w-full sm:w-auto"
              >
                Watch Live on CricHeroes
              </Button>
            </a>
          </motion.div>

          {/* Countdown Timer Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-14"
          >
            <CountdownTimer targetDate={DILMANLeagueStats.nextMatchDate} />
          </motion.div>
        </div>
      </section>

      {/* STATS COUNTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StatsCounter />
      </section>

      {/* FRANCHISE TEAMS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <Badge variant="cyan" className="mb-2">Franchises</Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display">
              3 Powerful <span className="gradient-text-gold">Franchise Teams</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">Competing in 10K units virtual auction for ultimate glory.</p>
          </div>

          <Link to="/tournament">
            <Button variant="outline" size="sm" icon={<ChevronRight className="h-4 w-4" />}>
              View Tournament Rules & Schedule
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TeamsList.map((team, idx) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-[#C5A059]/35 transition-all group"
            >
              <div className={`h-1.5 w-10 rounded-full bg-gradient-to-r ${team.color} mb-3 opacity-90`} />
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#E2C889]">{team.shortName}</span>
                <Trophy className="h-4 w-4 text-slate-600 group-hover:text-[#E2C889] transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#E2C889] transition-colors mt-1 font-display">
                {team.name}
              </h3>
              <p className="text-xs text-slate-400 mt-2 font-mono">
                Captain: <span className="text-slate-200">{team.captain}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUICK REGISTRATION TEASER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel-gold border border-[#C5A059]/30 p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="gold" className="mb-3">Registration Open</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                Are You Ready to Enter the <span className="gradient-text-gold">Auction Pool</span>?
              </h2>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                Join the most prestigious cricket league at Madanapalle Institute of Technology & Science. From the player auction to the championship finals, every match is an opportunity become a champion.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-200">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#E2C889]" />
                  <span>₹400 Registration fee for Active Students and ₹1000 for Alumini</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#E2C889]" />
                  <span>Individual ball-by-ball CricHeroes profile linkage</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#E2C889]" />
                  <span>Professional Tournament Experience</span>
                </li>
              </ul>

              <div className="mt-8">
                <Link to="/register">
                  <Button variant="gold" size="lg" icon={<UserPlus className="h-5 w-5" />} glow>
                    Start Registration Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-lg font-bold text-white font-display">Latest Announcement</h4>
              {AnnouncementsData.slice(0, 1).map((announcement) => (
                <div key={announcement.id} className="space-y-2">
                  <p className="text-xs font-mono text-[#E2C889]">{announcement.date} • {announcement.author}</p>
                  <h5 className="text-base font-bold text-white">{announcement.title}</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">{announcement.summary}</p>
                  <Link to="/announcements" className="inline-flex items-center gap-1 text-xs font-semibold text-[#E2C889] hover:underline pt-2">
                    <span>Read Full Announcement</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
