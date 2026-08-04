import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, CheckCircle2, XCircle, ArrowRight, AlertCircle, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';
import { subscribeToRegistrations, type PlayerRegistrationRecord } from '../../firebase/firestore';
import { firebaseConfig, isFirebaseConfigured } from '../../firebase/config';
import { Button } from '../../components/ui/Button';

export const Dashboard: React.FC = () => {
  const [registrations, setRegistrations] = useState<PlayerRegistrationRecord[]>([]);
  const [syncStatus, setSyncStatus] = useState<{ firestoreConnected: boolean; error?: string }>({
    firestoreConnected: isFirebaseConfigured,
  });

  useEffect(() => {
    const unsubscribe = subscribeToRegistrations(
      (data) => setRegistrations(data),
      (status) => setSyncStatus(status)
    );
    return () => unsubscribe();
  }, []);

  const total = registrations.length;
  const pending = registrations.filter(r => r.status === 'Pending').length;
  const approved = registrations.filter(r => r.status === 'Approved').length;
  const rejected = registrations.filter(r => r.status === 'Rejected').length;

  const statCards = [
    {
      title: 'Total Registrations',
      value: total,
      icon: <Users className="h-6 w-6 text-sky-400" />,
      borderColor: 'border-sky-500/30',
      bgColor: 'bg-sky-500/10',
    },
    {
      title: 'Pending Review',
      value: pending,
      icon: <Clock className="h-6 w-6 text-amber-400" />,
      borderColor: 'border-amber-500/30',
      bgColor: 'bg-amber-500/10',
    },
    {
      title: 'Approved Players',
      value: approved,
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-400" />,
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Rejected Requests',
      value: rejected,
      icon: <XCircle className="h-6 w-6 text-rose-400" />,
      borderColor: 'border-rose-500/30',
      bgColor: 'bg-rose-500/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-white font-display">Dashboard Metrics</h1>
        <p className="text-sm text-slate-400">
          Realtime overview of player registrations from Firebase ({firebaseConfig.projectId}).
        </p>
      </div>

      {!syncStatus.firestoreConnected && (
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-100">
            <p className="font-bold">Firestore not connected</p>
            <p className="text-amber-200/80 mt-1">
              {syncStatus.error || 'Log in with your Firebase admin email/password to load mobile registrations.'}
            </p>
          </div>
        </div>
      )}

      {syncStatus.firestoreConnected && (
        <div className="glass-panel p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-center gap-2 text-xs font-mono text-emerald-300">
          <Wifi className="h-4 w-4" />
          Live sync active — registrations from all devices appear here instantly.
        </div>
      )}

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`glass-panel bg-slate-900/80 backdrop-blur-md p-6 rounded-[24px] border ${card.borderColor} shadow-xl flex items-center justify-between`}
          >
            <div>
              <p className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                {card.title}
              </p>
              <h2 className="text-4xl font-black text-white font-mono mt-2">
                {card.value}
              </h2>
            </div>
            <div className={`p-3.5 rounded-2xl ${card.bgColor} border ${card.borderColor}`}>
              {card.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Action Shortcut Card */}
      <div className="glass-panel bg-slate-900/80 p-8 rounded-[24px] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white font-display">Manage Player Registrations</h3>
          <p className="text-sm text-slate-300 max-w-xl">
            Review submitted player details, verify payment transaction UTR numbers, view payment screenshots, and approve/reject registrations in realtime.
          </p>
        </div>
        <Link to="/admin/registrations" className="shrink-0">
          <Button variant="primary" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
            View Registrations Table
          </Button>
        </Link>
      </div>
    </div>
  );
};
