'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Sparkles, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '@/data/siteData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function AppointmentModal({ isOpen, onClose, preselectedService }: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding / Muhurtham',
    eventDate: '',
    service: preselectedService || 'Bridal Makeup & Jewellery Combo',
    location: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.eventDate) {
      setError('Please provide your name, phone number, and event date.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    const message = `Hello LUXORA! I would like to book a bridal consultation.\n\n*Name:* ${formData.name || 'Not specified'}\n*Phone:* ${formData.phone || 'Not specified'}\n*Event:* ${formData.eventType}\n*Date:* ${formData.eventDate || 'Pending'}\n*Selected Service:* ${formData.service}\n*Venue/City:* ${formData.location || 'Pending'}\n*Notes:* ${formData.notes || 'None'}`;
    const url = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      eventType: 'Wedding / Muhurtham',
      eventDate: '',
      service: 'Bridal Makeup & Jewellery Combo',
      location: '',
      notes: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#FAF7F5] rounded-3xl shadow-2xl border border-[#F5EFE9] text-[#2C1D21]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-[#3F1021] text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#DFB76C]" />
            <div>
              <h3 className="font-serif text-xl tracking-wide">Book Your Bridal Experience</h3>
              <p className="text-xs text-[#FAFAF9]/80 font-sans">Complimentary Consultation & Look Customization</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-[#FAFAF9] text-[#3F1021] rounded-full flex items-center justify-center mx-auto border-2 border-[#D45B7D]">
              <CheckCircle2 className="w-10 h-10 text-[#3F1021]" />
            </div>
            <h4 className="font-serif text-2xl text-[#3F1021]">Consultation Request Received!</h4>
            <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-stone-900">{formData.name}</span>. Our senior bridal consultant will contact you at <span className="font-semibold text-stone-900">{formData.phone}</span> within 2 hours to confirm artist availability, rental fittings, and send the customized quote.
            </p>

            <div className="bg-[#FFF1F2] p-4 rounded-2xl border border-[#FAFAF9] text-left text-xs space-y-1.5 text-stone-700">
              <p><span className="font-semibold text-[#3F1021]">Service:</span> {formData.service}</p>
              <p><span className="font-semibold text-[#3F1021]">Date of Event:</span> {formData.eventDate}</p>
              <p><span className="font-semibold text-[#3F1021]">Event Type:</span> {formData.eventType}</p>
              {formData.location && <p><span className="font-semibold text-[#3F1021]">Location:</span> {formData.location}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] text-white rounded-full font-medium hover:bg-[#20ba5a] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Chat Immediately on WhatsApp
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-6 bg-stone-200 text-stone-800 rounded-full font-medium hover:bg-stone-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 font-sans">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Bride / Client Name <span className="text-[#D45B7D]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aishwarya Raman"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#D45B7D] bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Phone Number (WhatsApp) <span className="text-[#D45B7D]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#D45B7D] bg-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="bride@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#D45B7D] bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Event Date <span className="text-[#D45B7D]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#D45B7D] bg-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Event Type</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#D45B7D] bg-white text-sm"
                >
                  <option value="Wedding / Muhurtham">Wedding / Muhurtham</option>
                  <option value="Reception Banquet">Reception Banquet</option>
                  <option value="Engagement / Ring Ceremony">Engagement / Ring Ceremony</option>
                  <option value="Sangeet & Mehendi">Sangeet & Mehendi</option>
                  <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                  <option value="Jewellery Rental Only">Jewellery Rental Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Service Required</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#D45B7D] bg-white text-sm"
                >
                  <option value="Bridal Makeup & Jewellery Combo">Bridal Makeup & Jewellery Combo (Save 25%)</option>
                  <option value="Bridal Makeup Only">Bridal Makeup Only (HD / Airbrush)</option>
                  <option value="Rental Jewellery Set Only">Rental Jewellery Set Only</option>
                  <option value="Classic Bridal Package">Classic Bridal Package</option>
                  <option value="Premium Bridal Package">Premium Bridal Package</option>
                  <option value="Luxury Royal Bridal Package">Luxury Royal Bridal Package</option>
                  <option value="Engagement & Reception Combo">Engagement & Reception Combo</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.name}>{s.name} (from ₹{s.price.toLocaleString('en-IN')})</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Event City / Venue Location</label>
              <input
                type="text"
                placeholder="e.g. Indiranagar, Bengaluru or Taj Connemara, Chennai"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#D45B7D] bg-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Additional Requirements / Notes</label>
              <textarea
                rows={2}
                placeholder="Mention jewellery preferences (Temple, Antique, Polki), skin type, or bridesmaid requirements..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#D45B7D] bg-white text-sm resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-6 bg-[#3F1021] text-white rounded-full font-serif font-medium tracking-wide hover:bg-[#54162C] transition-all shadow-md hover:shadow-lg text-sm"
              >
                Submit Consultation Request
              </button>

              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="flex items-center justify-center gap-2 py-3 px-5 bg-[#25D366] text-white rounded-full text-xs font-medium hover:bg-[#20ba5a] transition-colors"
                title="Send directly to WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </button>
            </div>
            <p className="text-[11px] text-center text-stone-500">
              🔒 No advance payment needed for initial consultation. Free trial slot reservation.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
