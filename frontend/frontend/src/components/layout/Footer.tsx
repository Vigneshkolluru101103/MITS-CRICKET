import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#06080d] border-t border-slate-800/60 py-6 overflow-hidden text-slate-400">
      {/* Soft Top Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-400 text-center sm:text-left">
        <p>© {new Date().getFullYear()} DPL Premier League. All Rights Reserved.</p>
        <p className="font-medium text-slate-300">
          Designed & Developed by <span className="text-[#E2C889] font-bold font-display">Vignesh Kolluru</span>.
        </p>
      </div>
    </footer>
  );
};
