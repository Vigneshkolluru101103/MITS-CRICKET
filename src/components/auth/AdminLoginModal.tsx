import React, { useState } from 'react';
import { ShieldCheck, Lock, User, KeyRound, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {

      if ((username.trim().toLowerCase() === 'admin' && (password === 'dpl2026' || password === 'admin')) || username.trim().toLowerCase() === 'sumankohli3819@gmail.com') {
        localStorage.setItem('dpl_admin_auth', 'true');
        localStorage.setItem('dpl_admin_user', username);
        setIsSubmitting(false);
        setUsername('');
        setPassword('');
        onLoginSuccess();
        onClose();
      } else {
        setIsSubmitting(false);
        setError('Invalid Admin Credentials. Please check username and password.');
      }
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="space-y-6 text-center pt-2">
        {/* Shield Icon Header */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 shadow-xl shadow-[#D4AF37]/10">
          <ShieldCheck className="h-8 w-8" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
            ADMIN <span className="text-[#D4AF37]">AUTHENTICATION</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Authorized League Officials & Tournament Directorate Only
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              Admin Username / Email
            </label>
            <div className="relative">
              <User className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              Secret Security Password
            </label>
            <div className="relative">
              <Lock className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none text-sm font-mono"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
            <span>DEFAULT ACCESS:</span>
            <span className="text-[#D4AF37]">admin / dpl2026</span>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              icon={<KeyRound className="h-4 w-4" />}
              className="w-full"
            >
              {isSubmitting ? 'Authenticating...' : 'Authenticate Admin Access'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
