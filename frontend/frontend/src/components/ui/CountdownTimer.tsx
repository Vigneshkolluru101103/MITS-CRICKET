import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string;
  title?: string;
  subtitle?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  title = "COUNTDOWN TO DPL 2026 GRAND AUCTION",
  subtitle,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds },
  ];

  return (
    <div className="relative rounded-2xl glass-panel p-6 md:p-8 border border-[#C5A059]/20 text-center max-w-3xl mx-auto shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059]/5 via-transparent to-[#C5A059]/5 pointer-events-none" />

      <p className="text-[11px] font-mono font-bold tracking-widest text-[#E2C889] uppercase mb-1">
        {title}
      </p>
      {subtitle && <p className="text-xs text-slate-400 mb-6">{subtitle}</p>}

      <div className="grid grid-cols-4 gap-3 sm:gap-6">
        {units.map((unit, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              key={unit.value}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-full py-3 sm:py-5 rounded-xl bg-slate-950/80 border border-slate-800 shadow-inner flex items-center justify-center text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#E2C889] font-mono tracking-wider"
            >
              {String(unit.value).padStart(2, '0')}
            </motion.div>
            <span className="mt-2 text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
