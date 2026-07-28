import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Home, Tv } from 'lucide-react';
import { CricHeroesConfig } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-20 px-4 text-center">
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-rose-500/10 text-rose-500 border border-rose-500/30 shadow-2xl shadow-rose-500/20"
        >
          <ShieldAlert className="h-12 w-12" />
        </motion.div>

        <Badge variant="crimson">Error 404 • Out of Bounds</Badge>

        <h1 className="text-5xl sm:text-7xl font-black text-white font-display tracking-tight">
          WICKET <span className="gradient-text-crimson">FALLEN!</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          The pitch or delivery you are looking for does not exist or has been retired from the official match scorecard.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="gold" size="lg" icon={<Home className="h-5 w-5" />} glow className="w-full sm:w-auto">
              Return to DPL Home
            </Button>
          </Link>

          <a
            href={CricHeroesConfig.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button variant="cricheroes" size="lg" icon={<Tv className="h-5 w-5" />} className="w-full sm:w-auto">
              Watch Live on CricHeroes
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
