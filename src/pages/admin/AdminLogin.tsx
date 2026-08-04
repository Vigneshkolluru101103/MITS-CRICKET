import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, User, Eye, EyeOff, KeyRound, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { currentUser, loading, login } = useAuth();
  const navigate = useNavigate();

  // Reset form inputs & errors on mount and location change
  useEffect(() => {
    setEmail('');
    setPassword('');
    setError('');
  }, []);

  // If already authenticated, redirect to dashboard immediately
  useEffect(() => {
    if (!loading && currentUser) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [currentUser, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email.trim(), password);
      // Clear inputs upon successful login
      setEmail('');
      setPassword('');
      navigate('/admin/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid admin credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-20">
        <div className="h-10 w-10 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-panel bg-slate-900/90 backdrop-blur-md p-8 sm:p-10 rounded-[24px] border border-slate-800 shadow-2xl space-y-6"
      >
        {/* Header Icon */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 shadow-xl shadow-[#D4AF37]/10">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <Badge variant="gold" icon={<KeyRound className="h-3.5 w-3.5" />}>
            Official Directorate Portal
          </Badge>

          <h1 className="text-3xl font-black text-white font-display tracking-tight">
            ADMIN <span className="gradient-text-gold">LOGIN</span>
          </h1>

          <p className="text-xs text-slate-400">
            Sign in with your admin credentials to access live registration data and management controls.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          {/* Hidden inputs to prevent aggressive browser password manager autofill */}
          <input type="text" name="prevent_autofill_email" style={{ display: 'none' }} tabIndex={-1} />
          <input type="password" name="prevent_autofill_password" style={{ display: 'none' }} tabIndex={-1} />

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
              Admin Email / Username
            </label>
            <div className="relative">
              <User className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="admin_login_email"
                autoComplete="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="admin_login_password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none text-sm font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
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
              {isSubmitting ? 'Authenticating...' : 'Sign In to Admin Portal'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
