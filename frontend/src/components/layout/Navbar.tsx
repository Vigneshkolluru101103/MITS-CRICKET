import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Trophy, UserPlus, ChevronRight, ShieldCheck, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { AdminLoginModal } from '../auth/AdminLoginModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
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

  useEffect(() => {
    const auth = localStorage.getItem('dpl_admin_auth');
    if (auth === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleAdminLogout = () => {
    localStorage.removeItem('dpl_admin_auth');
    localStorage.removeItem('dpl_admin_user');
    setIsAdminLoggedIn(false);
  };

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0d14]/90 backdrop-blur-xl border-b border-slate-800/70 py-3 shadow-2xl shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#D4AF37] text-slate-950 font-black text-xl shadow-md shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform">
              <Trophy className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-white font-display">
                  DILMAN <span className="gradient-text-gold">PREMIER LEAGUE</span>
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                Official Tournament Portal
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
                  className={`relative px-3 py-1 text-xs xl:text-sm font-medium transition-all rounded-full border ${
                    isActive
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
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link to="/admin/dashboard">
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.25)] hover:scale-105 transition-transform cursor-pointer">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    ADMIN DASHBOARD
                  </span>
                </Link>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleAdminLogout}
                  icon={<LogOut className="h-3.5 w-3.5" />}
                >
                  Logout
                </Button>
              </div>
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
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      isActive
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
                {isAdminLoggedIn ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-emerald-500/30">
                    <span className="text-xs font-mono text-emerald-300 font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" /> ADMIN LOGGED IN
                    </span>
                    <Button variant="secondary" size="sm" onClick={handleAdminLogout}>
                      Logout
                    </Button>
                  </div>
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

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={() => setIsAdminLoggedIn(true)}
      />
    </header>
  );
};
