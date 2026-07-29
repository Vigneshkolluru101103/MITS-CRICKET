import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';

export const History: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Gallery slider images (RED TEAM champions, captains, huddle, match action, and team squads)
  const galleryImages = [
    {
      id: 1,
      title: 'RED TEAM 2025 Champions Trophy Presentation',
      url: '/red_team_trophy_trio_2025.jpg',
    },
    {
      id: 2,
      title: 'MITS Tournament Stars & Captains 2025',
      url: '/mits_stars_group_2025.jpg',
    },
    {
      id: 3,
      title: 'RED TEAM Captain Vignesh with Trophies 2025',
      url: '/red_team_captain_trophy_2025.jpg',
    },
    {
      id: 4,
      title: 'RED TEAM 2025 Champions Celebration',
      url: '/red_team_winners_2025.jpg',
    },
    {
      id: 5,
      title: 'RED TEAM Tactical Huddle 2025',
      url: '/red_team_huddle_2025.jpg',
    },
    {
      id: 6,
      title: 'RED TEAM On-Field Match Discussion 2025',
      url: '/red_team_match_discussion_2025.jpg',
    },
    {
      id: 7,
      title: 'MITS Tournament Captains & Leaders Lineup 2025',
      url: '/mits_captains_lineup_2025.jpg',
    },
    {
      id: 8,
      title: 'MITS Captains Trio 2025',
      url: '/mits_trio_captains_2025.jpg',
    },
    {
      id: 9,
      title: 'RED TEAM 2025 Squad Pose',
      url: '/red_team_squad_2025.jpg',
    },
    {
      id: 10,
      title: 'YELLOW TEAM 2025 Squad Pose',
      url: '/yellow_team_squad_2025.jpg',
    },
    {
      id: 11,
      title: 'YELLOW TEAM Players Duo 2025',
      url: '/yellow_team_duo_2025.jpg',
    },
    {
      id: 12,
      title: 'RED TEAM Vignesh Power Lofted Shot 2025',
      url: '/vignesh_power_shot_2025.jpg',
    },
    {
      id: 13,
      title: 'RED TEAM Vignesh Cover Drive 2025',
      url: '/vignesh_frontfoot_drive_2025.jpg',
    },
    {
      id: 14,
      title: 'BLUE TEAM Openers Ricky & Sunny Walk To Pitch 2025',
      url: '/blue_team_batsmen_walking_2025.jpg',
    },
    {
      id: 15,
      title: 'MITS Captains & Special Guest Fan 2025',
      url: '/mits_captains_family_2025.jpg',
    },
    {
      id: 16,
      title: 'YELLOW TEAM Leaders Trio 2025',
      url: '/yellow_team_trio_2025.jpg',
    },
    {
      id: 17,
      title: 'YELLOW TEAM Ricky #48 Live Batting Action 2025',
      url: '/ricky_batting_action_2025.jpg',
    },
    {
      id: 18,
      title: 'YELLOW TEAM Openers Guru #83 & Yeshu #13 Walk To Pitch 2025',
      url: '/yellow_batsmen_walking_2025.jpg',
    },
    {
      id: 19,
      title: 'BLUE TEAM Mid-Pitch Tactical Strategy Chat 2025',
      url: '/blue_team_midpitch_chat_2025.jpg',
    },
    {
      id: 20,
      title: 'MITS Captain On-Field Strategy & Directing Play 2025',
      url: '/captain_field_setting_2025.jpg',
    },
    {
      id: 21,
      title: 'Batsman Milestone Celebration & Bat Raising 2025',
      url: '/batsman_raising_bat_celebration_2025.jpg',
    },
    {
      id: 22,
      title: 'Post-Match Sportsmanship Handshake & Guard of Honor 2025',
      url: '/post_match_handshake_guard_of_honor_2025.png',
    },
    {
      id: 23,
      title: 'MITS Captains & Leaders Perspective Lineup 2025',
      url: '/mits_captains_depth_lineup_2025.jpg',
    },
    {
      id: 24,
      title: 'RED TEAM Champions Leaders Trophy Pose 2025',
      url: '/red_team_duo_trophy_2025.jpg',
    },
    {
      id: 25,
      title: 'RED TEAM Key Performers with Bat & Ball 2025',
      url: '/red_team_performers_quad_2025.jpg',
    },
    {
      id: 26,
      title: 'MITS Captains & Organizers at "I ❤ MITS" Monument 2025',
      url: '/mits_captains_ilove_mits_2025.jpg',
    },
    {
      id: 27,
      title: 'Captains Trio with Champions Trophy at Campus Landmark 2025',
      url: '/mits_trio_captains_monument_2025.jpg',
    },
    {
      id: 28,
      title: 'Independence Day Cup 2025 Champions Trophy Close-Up',
      url: '/champions_trophy_close_up_2025.jpg',
    },
    {
      id: 29,
      title: 'BLUE TEAM Medal & Individual Awards Presentation Ceremony 2025',
      url: '/blue_team_medals_ceremony_2025.jpg',
    },
  ];

  const pastChampionsList = [
    {
      year: '2025',
      champion: 'MITS RED TEAM',
      championCaptain: 'VIGNESH K',
      runnerUp: 'MITS BLUE TEAM',
      runnerUpCaptain: 'MOURYA R',
    },
  ];

  const handlePrevSlide = () => {
    setCurrentSlideIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="pt-28 pb-20 space-y-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* 1. TOURNAMENT HISTORY SLIDER SECTION */}
      <div className="space-y-8 text-center">
        {/* Title Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-emerald-400 font-display tracking-tight flex items-center justify-center gap-3">
            <span className="h-8 w-1 bg-emerald-400 rounded-full inline-block" />
            <span>Tournament History</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-normal">
            Relive the most memorable moments from previous tournament
          </p>
        </div>

        {/* Full Width Image Display */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group">
          <div className="relative h-[360px] sm:h-[520px] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Ambient Blurred Backdrop to fill aspect ratio cleanly without distorting */}
                <img
                  src={galleryImages[currentSlideIndex].url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
                />

                {/* HD Sharp Main Image */}
                <img
                  src={galleryImages[currentSlideIndex].url}
                  alt={galleryImages[currentSlideIndex].title}
                  className="relative z-10 max-w-full max-h-full object-contain p-2 rounded-2xl drop-shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>

            {galleryImages.length > 1 && (
              <>
                {/* Left Navigation Arrow */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-teal-900/70 hover:bg-teal-700 text-teal-300 border border-teal-500/40 flex items-center justify-center transition-all shadow-lg cursor-pointer backdrop-blur-md"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={handleNextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-teal-900/70 hover:bg-teal-700 text-teal-300 border border-teal-500/40 flex items-center justify-center transition-all shadow-lg cursor-pointer backdrop-blur-md"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>


      {/* 2. PAST CHAMPIONS CARDS SECTION */}
      <div className="space-y-8 text-center pt-8">
        {/* Header Title */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
            Past <span className="text-emerald-400 border-b-2 border-red-500 pb-1">Champions</span>
          </h2>

          <div className="pt-2">
            <a
              href="https://chshare.link/tournament/miG8pP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/30 hover:scale-105 transition-transform cursor-pointer"
            >
              <Trophy className="h-4 w-4 text-amber-300" />
              <span>SESSION STARS →</span>
            </a>
          </div>
        </div>

        {/* Centered Single Card Grid */}
        <div className="flex justify-center">
          {pastChampionsList.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="w-full max-w-sm rounded-2xl bg-slate-900/80 border-t-2 border-t-emerald-400 border-x border-b border-slate-800 p-8 space-y-6 shadow-xl hover:border-emerald-500/50 transition-all flex flex-col items-center justify-between"
            >
              {/* Trophy Graphic */}
              <div className="flex flex-col items-center space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                  <Trophy className="h-8 w-8 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                </div>

                <h3 className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
                  {item.year}
                </h3>
              </div>

              {/* Champions Info */}
              <div className="space-y-1 w-full text-center">
                <span className="text-xs font-semibold text-slate-300 block">Champions</span>
                <h4 className="text-xl font-bold text-white tracking-wide">
                  {item.champion}
                </h4>
                <p className="text-xs font-mono text-[#E2C889] font-semibold">
                  Captain: {item.championCaptain}
                </p>
              </div>

              {/* Runner Up Info */}
              <div className="pt-4 border-t border-slate-800/80 w-full text-center space-y-1">
                <span className="text-xs text-slate-400 block">Runner-up:</span>
                <p className="text-sm font-semibold text-slate-300">
                  {item.runnerUp}
                </p>
                <p className="text-xs font-mono text-slate-400">
                  Captain: {item.runnerUpCaptain}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};
