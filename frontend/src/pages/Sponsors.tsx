import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { SponsorsData } from '../data/mockData';
import { SponsorCard } from '../components/cards/SponsorCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ToastContainer, type ToastMessage } from '../components/ui/Toast';

export const Sponsors: React.FC = () => {
  const [showInquiryModal, setShowInquiryModal] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', tier: 'GOLD', message: '' });

  const addToast = (type: 'success' | 'error', title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      addToast('error', 'Form Error', 'Please complete all required fields.');
      return;
    }
    setShowInquiryModal(false);
    addToast('success', 'Inquiry Received!', 'Our Sponsorship Directorate will contact your organization shortly.');
    setFormData({ name: '', company: '', email: '', phone: '', tier: 'GOLD', message: '' });
  };

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts(t => t.filter(x => x.id !== id))} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto py-4">
        <h1 className="text-4xl sm:text-6xl font-black text-[#00d2ff] font-display tracking-tight drop-shadow-[0_0_20px_rgba(0,210,255,0.4)]">
          Our Valued Sponsors
        </h1>
      </div>

      {/* Sponsors Grid (Vidya Sagar & Satish) */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SponsorsData.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>
      </div>

      {/* Sponsor Inquiry Modal */}
      <Modal
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        title="Sponsorship Partnership Inquiry"
      >
        <form onSubmit={handleInquirySubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-1">Your Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Vikram Sharma"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-1">Company / Brand Name *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. Acme Tech Corp"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-1">Work Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="vikram@acme.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 9876543210"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-1">Preferred Partnership Tier</label>
            <select
              value={formData.tier}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-[#C5A059] focus:outline-none text-sm"
            >
              <option value="TITLE">Title Sponsor</option>
              <option value="POWERED_BY">Powered By Sponsor</option>
              <option value="GOLD">Gold Partner</option>
              <option value="SILVER">Silver Partner</option>
              <option value="FOOD_BEVERAGE">Hydration / Merchandise Partner</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-1">Brief Message / Proposal</label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us how you would like to partner..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-[#C5A059] focus:outline-none text-sm"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button variant="secondary" size="md" type="button" onClick={() => setShowInquiryModal(false)}>
              Cancel
            </Button>
            <Button variant="gold" size="md" type="submit" icon={<Send className="h-4 w-4" />} glow>
              Submit Partnership Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
