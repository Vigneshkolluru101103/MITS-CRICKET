import React from 'react';

export const PageSkeleton: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-20 px-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-10 w-10 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin" />
        <p className="text-xs font-mono text-slate-400 tracking-widest uppercase animate-pulse">
          Loading Page...
        </p>
      </div>
    </div>
  );
};
