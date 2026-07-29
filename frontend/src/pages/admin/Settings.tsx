import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Server, Lock } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export const Settings: React.FC = () => {
  const { currentUser } = useAuth();

  const envChecklist = [
    { name: 'VITE_FIREBASE_API_KEY', status: !!import.meta.env.VITE_FIREBASE_API_KEY },
    { name: 'VITE_FIREBASE_AUTH_DOMAIN', status: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN },
    { name: 'VITE_FIREBASE_PROJECT_ID', status: !!import.meta.env.VITE_FIREBASE_PROJECT_ID },
    { name: 'VITE_FIREBASE_STORAGE_BUCKET', status: !!import.meta.env.VITE_FIREBASE_STORAGE_BUCKET },
    { name: 'VITE_FIREBASE_MESSAGING_SENDER_ID', status: !!import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID },
    { name: 'VITE_FIREBASE_APP_ID', status: !!import.meta.env.VITE_FIREBASE_APP_ID },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-black text-white font-display">System & Security Settings</h1>
        <p className="text-sm text-slate-400">
          Admin account details and Firebase infrastructure configuration.
        </p>
      </div>

      {/* Account Info */}
      <div className="glass-panel bg-slate-900/90 p-8 rounded-[24px] border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
          Admin Account Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-mono pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 block">ADMIN USER EMAIL</span>
            <span className="text-[#D4AF37] font-bold">{currentUser?.email || 'admin@mitsdpl.in'}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 block">AUTHENTICATION PROVIDER</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Lock className="h-4 w-4" /> Firebase Email & Password Auth
            </span>
          </div>
        </div>
      </div>

      {/* Firebase Environment Status */}
      <div className="glass-panel bg-slate-900/90 p-8 rounded-[24px] border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
          <Server className="h-5 w-5 text-[#D4AF37]" />
          Firebase Environment Status
        </h3>

        <div className="space-y-2 font-mono text-xs pt-2">
          {envChecklist.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">{item.name}</span>
              <Badge variant={item.status ? 'gold' : 'slate'}>
                {item.status ? 'CONFIGURED' : 'USING DEV DEFAULT'}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
