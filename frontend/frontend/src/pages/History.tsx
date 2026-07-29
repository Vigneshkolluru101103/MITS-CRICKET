import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';

export const History: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Gallery slider images (RED TEAM winners, squad, captain portrait, and BLUE TEAM runners-up)
  const galleryImages = [
    {
      id: 1,
      title: 'RED TEAM 2025 Champions Celebration',
      url: '/red_team_winners_2025.jpg',
    },
    {
      id: 2,
      title: 'RED TEAM 2025 Squad Pose',
      url: '/red_team_squad_2025.jpg',
    },

    {
      id: 4,
      title: 'BLUE TEAM 2025 Runners-Up Squad',
      url: '/blue_team_runners_2025.jpg',
    },
  ];

  const pastChampionsList = [
    {
      year: '2025',
      champion: 'RED TEAM',
      championCaptain: 'VIGNESH K',
      runnerUp: 'BLUE TEAM',
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
            Relive the most memorable moments from previous tournaments
          </p>
        </div>

        {/* Full Width Image Display */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group">
          <div className="relative h-[320px] sm:h-[480px] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlideIndex}
                src={galleryImages[currentSlideIndex].url}
                alt={galleryImages[currentSlideIndex].title}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
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
                  Capt: {item.championCaptain}
                </p>
              </div>

              {/* Runner Up Info */}
              <div className="pt-4 border-t border-slate-800/80 w-full text-center space-y-1">
                <span className="text-xs text-slate-400 block">Runner-up:</span>
                <p className="text-sm font-semibold text-slate-300">
                  {item.runnerUp}
                </p>
                <p className="text-xs font-mono text-slate-400">
                  Capt: {item.runnerUpCaptain}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};
