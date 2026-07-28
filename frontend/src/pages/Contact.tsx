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
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-2xl font-bold text-white font-display">Send Us a Direct Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Arjun Das"
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
                placeholder="arjun@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">Subject Category</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-[#C5A059] focus:outline-none text-sm"
              >
                <option value="General Query">General Query</option>
                <option value="Player Registration Help">Player Registration Help</option>
                <option value="Auction & Rules Clarification">Auction & Rules Clarification</option>
                <option value="Sponsorship & Brand Partnership">Sponsorship & Brand Partnership</option>
                <option value="Media & Press Accreditation">Media & Press Accreditation</option>
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
        <div className="space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-2xl font-bold text-white font-display">DILMAN Sports Directorate</h3>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#C5A059] shrink-0 mt-1" />
                <div>
                  <strong className="text-white block">Stadium Venue Location:</strong>
                  DILMAN Central Sports Stadium, Dilman Institute of Technology and Science, Varikoli, Puthencruz, Ernakulam, Kerala 682308
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#C5A059] shrink-0" />
                <div>
                  <strong className="text-white block">Email Helpdesk:</strong>
                  <a href="mailto:dpl@dilman.ac.in" className="text-[#E2C889] hover:underline">dpl@dilman.ac.in</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#C5A059] shrink-0" />
                <div>
                  <strong className="text-white block">Helpline Numbers:</strong>
                  +91 98765 43210 (Sports Director) / +91 94470 12345 (League Convener)
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Visual Placeholder */}
          <div className="relative h-64 w-full rounded-3xl overflow-hidden glass-panel border border-slate-800 bg-slate-900 flex items-center justify-center text-center p-6">
            <div className="space-y-2">
              <MapPin className="h-8 w-8 text-[#C5A059] mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-white">DILMAN Central Stadium Turf</h4>
              <p className="text-xs text-slate-400">Varikoli, Ernakulam, Kerala 682308</p>
              <Badge variant="gold" size="sm">GPS Verified Grounds</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
