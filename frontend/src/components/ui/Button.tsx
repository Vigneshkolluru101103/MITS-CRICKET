import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'gold' | 'secondary' | 'outline' | 'ghost' | 'crimson' | 'cricheroes';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className,
  glow = false,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer overflow-hidden tracking-wide";
  
  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
    xl: "text-base sm:text-lg px-7 py-3.5 gap-3 font-semibold",
  };

  const variantStyles = {
    gold: "bg-gradient-to-r from-[#D5B266] via-[#C59B4E] to-[#B58A3E] text-slate-950 hover:brightness-105 shadow-md shadow-[#C59B4E]/15 border border-[#E2C889]/30 font-semibold",
    primary: "bg-slate-800 hover:bg-slate-700 text-white shadow-md border border-slate-700/60",
    crimson: "bg-gradient-to-r from-[#9F1239] to-[#881337] text-white hover:from-[#881337] hover:to-[#701A75] shadow-md border border-rose-500/20",
    cricheroes: "bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 shadow-md font-semibold",
    secondary: "bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 border border-slate-800 shadow-sm",
    outline: "border border-[#C5A059]/40 text-[#E2C889] hover:bg-[#C5A059]/10 hover:border-[#C5A059]/60",
    ghost: "text-slate-300 hover:text-white hover:bg-white/5",
  };

  const glowEffect = glow ? "shadow-[0_0_20px_rgba(197,160,89,0.2)]" : "";

  return (
    <motion.button
      whileHover={{ scale: 1.015, translateY: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], glowEffect, className)}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </motion.button>
  );
};
