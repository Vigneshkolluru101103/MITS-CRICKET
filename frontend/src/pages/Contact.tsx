import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ToastContainer, type ToastMessage } from '../components/ui/Toast';

export const Contact: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Query', message: '' });

  const addToast = (type: 'success' | 'error', title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('error', 'Validation Error', 'Please complete all required fields.');
      return;
    }
    addToast('success', 'Message Sent!', 'Our Sports Helpdesk team will reply within 24 hours.');
    setFormData({ name: '', email: '', subject: 'General Query', message: '' });
  };

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts(t => t.filter(x => x.id !== id))} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="gold" icon={<Mail className="h-3.5 w-3.5" />}>Get In Touch</Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight">
          CONTACT <span className="gradient-text-gold">HELPDESK</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Have questions regarding registration, auction rules, or sponsorship packages? Contact the DILMAN Sports Committee.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Contact Form */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-2xl font-bold text-white font-display">Send Us a Direct Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="your name"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your email@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">Subject Category</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-[#C5A059] focus:outline-none text-sm cursor-pointer"
              >
                <option value="General Query" className="bg-slate-900 text-white">General Query</option>
                <option value="Player Registration Help" className="bg-slate-900 text-white">Player Registration Help</option>
                <option value="Auction & Rules Clarification" className="bg-slate-900 text-white">Auction & Rules Clarification</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">Your Message *</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your query details here..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
              />
            </div>

            <Button variant="gold" size="lg" type="submit" icon={<Send className="h-4 w-4" />} glow className="w-full">
              Send Message
            </Button>
          </form>
        </div>

        {/* Location & Info Card */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white font-display">DILMAN Sports Directorate</h3>

            <div className="space-y-6 text-sm text-slate-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-[#C5A059] shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <strong className="text-white block text-base font-display mb-1">Stadium Venue Location:</strong>
                  <span className="text-slate-300 leading-relaxed block">
                    MITS COLLEGE GROUND, Madanapalle Institute of Technology and Science, Kadiri road, Angallu, 517326.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-[#C5A059] shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <strong className="text-white block text-base font-display mb-1">Email Helpdesk:</strong>
                  <a href="mailto:sumankohli3819@gmail.com" className="text-[#E2C889] hover:underline font-mono">
                    sumankohli3819@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-[#C5A059] shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <strong className="text-white block text-base font-display mb-1">Helpline Numbers:</strong>
                  <span className="text-slate-200 font-mono">+91 6380526866</span> (Organizer)
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>MITS DPL 2026</span>
            <span className="text-emerald-400">SUPPORT HELPDESK</span>
          </div>
        </div>
      </div>
    </div>
  );
};
