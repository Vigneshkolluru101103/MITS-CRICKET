import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, UserPlus, ChevronRight, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { currentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Tournament', path: '/tournament' },
    { name: 'Register', path: '/register' },
    { name: 'History', path: '/history' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Committee', path: '/committee' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Contact', path: '/contact' },
  ];

  const isLoggedIn = !!currentUser;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#0a0d14]/90 backdrop-blur-xl border-b border-slate-800/70 py-3 shadow-2xl shadow-black/50'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/dpl_logo.jpg"
              alt="DILMAN Premier League Logo"
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover border border-[#D4AF37]/60 shadow-md shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col justify-center">
              <span className="dilman-brand-text block text-base sm:text-lg font-black tracking-wider leading-none">
                DILMAN
              </span>
              <span className="text-white block text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase mt-0.5 opacity-90">
                PREMIER LEAGUE
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel py-1.5 px-3 rounded-full border-slate-800/80">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-1 text-xs xl:text-sm font-medium transition-all rounded-full border ${isActive
                      ? 'bg-[#D4AF37] text-slate-950 font-bold border-[#D4AF37] shadow-sm'
                      : 'border-transparent text-slate-300 hover:text-white hover:border-[#D4AF37]/50'
                    }`}
                >
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoggedIn ? (
              <Link to="/admin/dashboard">
                <span className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_12px_rgba(16,185,129,0.25)] hover:scale-105 transition-transform cursor-pointer">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  ADMIN DASHBOARD
                </span>
              </Link>
            ) : (
              <Link to="/admin/login">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<ShieldCheck className="h-4 w-4 text-[#D4AF37] drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]" />}
                  className="border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                >
                  Admin Login
                </Button>
              </Link>
            )}

            <Link to="/register">
              <Button
                variant="primary"
                size="sm"
                icon={<UserPlus className="h-4 w-4" />}
              >
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-[#D4AF37]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0a0d14]/95 backdrop-blur-2xl border-b border-slate-800 px-4 pt-4 pb-6 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${isActive
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-bold'
                        : 'border-slate-800/80 text-slate-300 hover:bg-slate-900'
                      }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </Link>
                );
              })}

              <div className="pt-4 flex flex-col gap-3.5 border-t border-slate-800 mt-2">
                {isLoggedIn ? (
                  <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button
                      variant="secondary"
                      size="md"
                      icon={<ShieldCheck className="h-4 w-4 text-emerald-400" />}
                      className="w-full border-emerald-500/40 text-emerald-300"
                    >
                      Admin Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <Button
                      variant="secondary"
                      size="md"
                      icon={<ShieldCheck className="h-4 w-4 text-[#D4AF37] drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]" />}
                      className="w-full border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                    >
                      Admin Login
                    </Button>
                  </Link>
                )}

                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <Button
                    variant="primary"
                    size="md"
                    icon={<UserPlus className="h-4 w-4" />}
                    className="w-full"
                  >
                    Register as Player
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
