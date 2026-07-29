import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Play, CheckCircle } from 'lucide-react';
import { MatchFixturesData, PastChampionsData } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const Tournament: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fixtures' | 'rules' | 'champions'>('fixtures');

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="gold">Season 1 Championship</Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight">
          TOURNAMENT & <span className="gradient-text-gold">SCHEDULE</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          4 high-intensity T20 matches across 3 franchise teams. Explore match schedules, tournament rules, and past championship hall of fame.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="glass-panel p-1.5 rounded-2xl border border-slate-800/80 flex gap-2 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('fixtures')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === 'fixtures' ? 'bg-gradient-to-r from-[#D5B266] to-[#C59B4E] text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
              }`}
          >
            Match Fixtures & Schedule
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === 'rules' ? 'bg-gradient-to-r from-[#D5B266] to-[#C59B4E] text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
              }`}
          >
            Rules & Auction Structure
          </button>
          <button
            onClick={() => setActiveTab('champions')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === 'champions' ? 'bg-gradient-to-r from-[#D5B266] to-[#C59B4E] text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
              }`}
          >
            Past Champions Hall of Fame
          </button>
        </div>
      </div>

      {/* TAB 1: MATCH FIXTURES */}
      {activeTab === 'fixtures' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white font-display">Match Schedule Timeline</h3>
            <span className="text-xs font-mono text-slate-400">BALL-BY-BALL ON CRICHEROES</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {MatchFixturesData.map((fixture) => (
              <motion.div
                key={fixture.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-[#C5A059]/35 transition-all flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 text-[#E2C889] font-mono font-black text-base">
                    #{fixture.matchNumber}
                  </div>
                  <div>
                    <Badge variant={fixture.stage === 'FINAL' ? 'crimson' : fixture.stage === 'SEMI_FINAL' ? 'gold' : 'slate'}>
                      {fixture.stage.replace('_', ' ')}
                    </Badge>
                    <p className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-[#C5A059]" />
                      <span>{fixture.date} • {fixture.time}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 sm:gap-12 w-full md:w-auto py-2">
                  <div className="text-right">
                    <h4 className="text-lg font-bold text-white font-display">{fixture.teamA.name}</h4>
                    <span className="text-xs font-mono text-slate-400">{fixture.teamA.shortName}</span>
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#E2C889] font-bold text-xs">
                    VS
                  </div>

                  <div className="text-left">
                    <h4 className="text-lg font-bold text-white font-display">{fixture.teamB.name}</h4>
                    <span className="text-xs font-mono text-slate-400">{fixture.teamB.shortName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <span className="text-xs text-slate-400 hidden lg:inline">{fixture.venue}</span>
                  <a
                    href={fixture.cricHeroesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="cricheroes" size="sm" icon={<Play className="h-3.5 w-3.5" />}>
                      Watch Live
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: RULES & AUCTION */}
      {activeTab === 'rules' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="glass-panel p-8 rounded-3xl border border-slate-800/80 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-2xl font-bold text-white font-display">Official Rulebook Summary</h3>
              <Badge variant="gold">T20 Regulations</Badge>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#E2C889] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">🏏 Tournament Format:</strong> The league follows a T20 franchise format featuring league-stage matches followed by the grand finale.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#E2C889] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">👥 Squad Composition:</strong> Each team must register 15–18 players. The final Playing XI must be submitted before the toss and remain unchanged once the match begins.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#E2C889] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">⏱️ Match Format:</strong> League & Final: 20 Overs per Innings. Official SG white leather cricket balls will be used throughout the tournament.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#E2C889] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">🧑‍⚖️ Umpire's Decision</strong> The on-field umpire's decision is final and binding. Players must respect all decisions without argument or misconduct.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PAST CHAMPIONS */}
      {activeTab === 'champions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PastChampionsData.map((champ, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-[#C5A059]/35 transition-colors space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <Badge variant="gold" icon={<Trophy className="h-3.5 w-3.5" />}>
                  {champ.season}
                </Badge>
                <span className="text-xs font-mono text-slate-500">DILMAN CHAMPIONS</span>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400">WINNERS</span>
                <h4 className="text-2xl font-black text-[#E2C889] font-display">{champ.champion}</h4>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div>
                  <span className="text-slate-500 block">RUNNERS-UP</span>
                  <span className="text-slate-200 font-semibold">{champ.runnerUp}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">PLAYER OF LEAGUE</span>
                  <span className="text-slate-200 font-semibold">{champ.playerOfTournament}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
