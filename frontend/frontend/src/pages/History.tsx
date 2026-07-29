import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy, Image as ImageIcon } from 'lucide-react';

export const History: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);

  // Gallery slider images (RED TEAM champions, captains, huddle, match action, and team squads)
  const galleryImages = [
    {
      id: 1,
      title: 'RED TEAM 2025 Champions Trophy Presentation',
      url: '/images/red_team_trophy_trio_2025.jpg',
    },
    {
      id: 2,
      title: 'MITS Tournament Stars & Captains 2025',
      url: '/images/mits_stars_group_2025.jpg',
    },
    {
      id: 3,
      title: 'RED TEAM Captain Vignesh with Trophies 2025',
      url: '/images/red_team_captain_trophy_2025.jpg',
    },
    {
      id: 4,
      title: 'RED TEAM 2025 Champions Celebration',
      url: '/images/red_team_winners_2025.jpg',
    },
    {
      id: 5,
      title: 'RED TEAM Tactical Huddle 2025',
      url: '/images/red_team_huddle_2025.jpg',
    },
    {
      id: 6,
      title: 'RED TEAM On-Field Match Discussion 2025',
      url: '/images/red_team_match_discussion_2025.jpg',
    },
    {
      id: 7,
      title: 'MITS Tournament Captains & Leaders Lineup 2025',
      url: '/images/mits_captains_lineup_2025.jpg',
    },
    {
      id: 8,
      title: 'MITS Captains Trio 2025',
      url: '/images/mits_trio_captains_2025.jpg',
    },
    {
      id: 9,
      title: 'RED TEAM 2025 Squad Pose',
      url: '/images/red_team_squad_2025.jpg',
    },
    {
      id: 10,
      title: 'YELLOW TEAM 2025 Squad Pose',
      url: '/images/yellow_team_squad_2025.jpg',
    },
    {
      id: 11,
      title: 'YELLOW TEAM Players Duo 2025',
      url: '/images/yellow_team_duo_2025.jpg',
    },
    {
      id: 12,
      title: 'RED TEAM Vignesh Power Lofted Shot 2025',
      url: '/images/vignesh_power_shot_2025.jpg',
    },
    {
      id: 13,
      title: 'RED TEAM Vignesh Cover Drive 2025',
      url: '/images/vignesh_frontfoot_drive_2025.jpg',
    },
    {
      id: 14,
      title: 'BLUE TEAM Openers Ricky & Sunny Walk To Pitch 2025',
      url: '/images/blue_team_batsmen_walking_2025.jpg',
    },
    {
      id: 15,
      title: 'MITS Captains & Special Guest Fan 2025',
      url: '/images/mits_captains_family_2025.jpg',
    },
    {
      id: 16,
      title: 'YELLOW TEAM Leaders Trio 2025',
      url: '/images/yellow_team_trio_2025.jpg',
    },
    {
      id: 17,
      title: 'YELLOW TEAM Ricky #48 Live Batting Action 2025',
      url: '/images/ricky_batting_action_2025.jpg',
    },
    {
      id: 18,
      title: 'YELLOW TEAM Openers Guru #83 & Yeshu #13 Walk To Pitch 2025',
      url: '/images/yellow_batsmen_walking_2025.jpg',
    },
    {
      id: 19,
      title: 'BLUE TEAM Mid-Pitch Tactical Strategy Chat 2025',
      url: '/images/blue_team_midpitch_chat_2025.jpg',
    },
    {
      id: 20,
      title: 'MITS Captain On-Field Strategy & Directing Play 2025',
      url: '/images/captain_field_setting_2025.jpg',
    },
    {
      id: 21,
      title: 'Batsman Milestone Celebration & Bat Raising 2025',
      url: '/images/batsman_raising_bat_celebration_2025.jpg',
    },
    {
      id: 22,
      title: 'Post-Match Sportsmanship Handshake & Guard of Honor 2025',
      url: '/images/post_match_handshake_guard_of_honor_2025.png',
    },
    {
      id: 23,
      title: 'MITS Captains & Leaders Perspective Lineup 2025',
      url: '/images/mits_captains_depth_lineup_2025.jpg',
    },
    {
      id: 24,
      title: 'RED TEAM Champions Leaders Trophy Pose 2025',
      url: '/images/red_team_duo_trophy_2025.jpg',
    },
    {
      id: 25,
      title: 'RED TEAM Key Performers with Bat & Ball 2025',
      url: '/images/red_team_performers_quad_2025.jpg',
    },
    {
      id: 26,
      title: 'MITS Captains & Organizers at "I ❤ MITS" Monument 2025',
      url: '/images/mits_captains_ilove_mits_2025.jpg',
    },
    {
      id: 27,
      title: 'Captains Trio with Champions Trophy at Campus Landmark 2025',
      url: '/images/mits_trio_captains_monument_2025.jpg',
    },
    {
      id: 28,
      title: 'Independence Day Cup 2025 Champions Trophy Close-Up',
      url: '/images/champions_trophy_close_up_2025.jpg',
    },
    {
      id: 29,
      title: 'BLUE TEAM Medal & Individual Awards Presentation Ceremony 2025',
      url: '/images/blue_team_medals_ceremony_2025.jpg',
    },
  ];

  // Preload all gallery images in browser cache for instant mobile playback
  useEffect(() => {
    galleryImages.forEach((img) => {
      const imageObj = new Image();
      imageObj.src = img.url;
      // Preload root path fallback as well
      const fallbackSrc = img.url.replace('/images/', '/');
      const fallbackObj = new Image();
      fallbackObj.src = fallbackSrc;
    });
  }, []);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

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

        {/* Full Width Image Display with Touch Swipe for Mobile */}
        <div 
          className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group touch-pan-y select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Floating Counter Pill */}
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-emerald-400 font-bold shadow-lg flex items-center gap-1.5">
            <ImageIcon className="h-3.5 w-3.5 text-emerald-400" />
            <span>{currentSlideIndex + 1} / {galleryImages.length}</span>
          </div>

          <div className="relative h-[380px] sm:h-[540px] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.35 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Ambient Blurred Backdrop to fill aspect ratio cleanly without distorting */}
                <img
                  src={galleryImages[currentSlideIndex].url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('/images/')) {
                      target.src = target.src.replace('/images/', '/');
                    }
                  }}
                />

                {/* HD Sharp Main Image */}
                <img
                  src={galleryImages[currentSlideIndex].url}
                  alt={galleryImages[currentSlideIndex].title}
                  className="relative z-10 max-w-full max-h-full object-contain p-2 rounded-2xl drop-shadow-2xl"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('/images/')) {
                      target.src = target.src.replace('/images/', '/');
                    }
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-4 text-center z-20">
              <p className="text-sm sm:text-base font-semibold text-slate-200 tracking-wide drop-shadow-md">
                {galleryImages[currentSlideIndex].title}
              </p>
            </div>

            {galleryImages.length > 1 && (
              <>
                {/* Left Navigation Arrow */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all shadow-xl cursor-pointer backdrop-blur-md z-20"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={handleNextSlide}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all shadow-xl cursor-pointer backdrop-blur-md z-20"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* 1B. ALL 29 PHOTOS GRID THUMBNAIL GALLERY (MOBILE & DESKTOP) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-emerald-400" />
              <span>Full Photo Gallery ({galleryImages.length} Photos)</span>
            </h3>
            <span className="text-xs text-slate-400">Tap thumbnail to view</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 max-h-[360px] overflow-y-auto p-2 bg-slate-950/60 rounded-2xl border border-slate-800/80 custom-scrollbar">
            {galleryImages.map((img, index) => {
              const isActive = index === currentSlideIndex;
              return (
                <button
                  key={img.id}
                  onClick={() => setCurrentSlideIndex(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                    isActive 
                      ? 'border-emerald-400 scale-95 ring-2 ring-emerald-400/40 shadow-lg' 
                      : 'border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-600'
                  }`}
                  aria-label={`View photo ${index + 1}: ${img.title}`}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.includes('/images/')) {
                        target.src = target.src.replace('/images/', '/');
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-1">
                    <span className="text-[10px] text-white font-mono font-bold">#{index + 1}</span>
                  </div>
                </button>
              );
            })}
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
