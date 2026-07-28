import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'crimson' | 'cyan' | 'slate' | 'emerald';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  className,
  icon,
}) => {
  const variantStyles = {
    gold: "bg-[#C5A059]/10 text-[#E2C889] border-[#C5A059]/25 shadow-sm",
    crimson: "bg-rose-950/40 text-rose-300 border-rose-800/30 shadow-sm",
    cyan: "bg-sky-950/40 text-sky-300 border-sky-800/30 shadow-sm",
    emerald: "bg-emerald-950/40 text-emerald-300 border-emerald-800/30 shadow-sm",
    slate: "bg-slate-800/60 text-slate-300 border-slate-700/50",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px] font-medium tracking-wider",
    md: "px-3 py-1 text-xs font-semibold tracking-wider",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md font-mono uppercase",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
