import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { subscribeToRegistrations, type PlayerRegistrationRecord } from '../../firebase/firestore';
import { Button } from '../../components/ui/Button';

export const Dashboard: React.FC = () => {
  const [registrations, setRegistrations] = useState<PlayerRegistrationRecord[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToRegistrations((data) => {
      setRegistrations(data);
    });
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
          Realtime overview of player registrations and tournament metrics from Cloud Firestore.
        </p>
      </div>

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
