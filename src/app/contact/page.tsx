'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import { BUSINESS_INFO, FAQ_LIST } from '@/data/siteData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding / Muhurtham',
    eventDate: '',
    service: 'Bridal Makeup & Rental Jewellery Combo',
    location: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.eventDate) {
      setError('Please provide your name, phone number, and wedding date.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = `Hello LUXORA! I would like to book a bridal consultation.\nName: ${formData.name || 'Client'}\nEvent Date: ${formData.eventDate || 'Pending'}\nService: ${formData.service}\nLocation: ${formData.location || 'Pending'}`;
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-[#FAF7F5] min-h-screen text-[#2C1D21] font-sans pb-20">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-[#260A14] via-[#3F1021] to-[#54162C] text-white py-14 px-4 sm:px-8 border-b border-[#DFB76C]/30 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#DFB76C] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            WE ARE HERE FOR YOU
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal">
            Contact & Appointments
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Schedule your private bridal consultation, jewellery trial, or ask our stylists any questions about dates, packages, and custom drapes.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Studio Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBDCD2] shadow-xs space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#260A14]">
                Our Studio Boutiques
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FFF1F2] text-[#8B2244]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Chennai Studio</h3>
                    <p className="text-xs text-stone-600 mt-0.5">84, Heritage Boulevard, Usman Road, T. Nagar, Chennai - 600017</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FFF1F2] text-[#8B2244]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Bengaluru Studio</h3>
                    <p className="text-xs text-stone-600 mt-0.5">12, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru - 560038</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FFF1F2] text-[#8B2244]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Call & WhatsApp</h3>
                    <p className="text-xs text-stone-600 mt-0.5">Direct Line: {BUSINESS_INFO.phone}</p>
                    <p className="text-xs text-stone-600">WhatsApp: +91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FFF1F2] text-[#8B2244]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Email Address</h3>
                    <p className="text-xs text-stone-600 mt-0.5">{BUSINESS_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FFF1F2] text-[#8B2244]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Studio Hours</h3>
                    <p className="text-xs text-stone-600 mt-0.5">{BUSINESS_INFO.hours} (All 7 Days)</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex-1 py-3 px-4 bg-[#3F1021] text-white text-xs font-bold uppercase tracking-wider rounded-full text-center hover:bg-[#54162C] transition-colors"
                >
                  Call Now
                </a>
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 py-3 px-4 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded-full text-center hover:bg-[#20ba5a] transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Google Map Mock Card */}
            <div id="location" className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-[#EBDCD2] shadow-xs">
              <Image
                src="/images/combo-modern-elegant.jpg"
                alt="Studio interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-[#260A14]/50 flex flex-col items-center justify-center text-white text-center p-4">
                <MapPin className="w-8 h-8 text-[#DFB76C] mb-2 animate-bounce" />
                <h3 className="font-serif text-xl font-bold">Studio Map & Directions</h3>
                <p className="text-xs text-stone-200 mt-1">Valet parking available at both T. Nagar & Indiranagar boutiques.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EBDCD2] shadow-md">
              <div className="mb-6">
                <span className="text-xs uppercase font-bold tracking-widest text-[#8B2244] block">
                  FAST RESPONSE GUARANTEE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#260A14] mt-1">
                  Send Booking Enquiry
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  Tell us about your wedding date and event styling needs.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#FFF1F2] rounded-full flex items-center justify-center mx-auto text-[#8B2244]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#3F1021]">Enquiry Received!</h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    Thank you, <strong className="text-stone-900">{formData.name}</strong>. Our bridal artist team will reach out at <strong className="text-stone-900">{formData.phone}</strong> with customized proposals.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-full"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Full Name <span className="text-[#D45B7D]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B2244] bg-[#FAF7F5]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Phone Number (WhatsApp) <span className="text-[#D45B7D]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B2244] bg-[#FAF7F5]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="bride@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B2244] bg-[#FAF7F5]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Event Date <span className="text-[#D45B7D]">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B2244] bg-[#FAF7F5]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Event Type</label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B2244] bg-[#FAF7F5]"
                      >
                        <option value="Wedding / Muhurtham">Wedding / Muhurtham</option>
                        <option value="Reception Banquet">Reception Banquet</option>
                        <option value="Engagement Ceremony">Engagement Ceremony</option>
                        <option value="Sangeet / Mehendi">Sangeet / Mehendi</option>
                        <option value="Jewellery Rental Only">Jewellery Rental Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Interested Service</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B2244] bg-[#FAF7F5]"
                      >
                        <option value="Bridal Makeup & Rental Jewellery Combo">Bridal Makeup & Jewellery Combo</option>
                        <option value="Bridal Makeup Only">Bridal Makeup Only (HD / Airbrush)</option>
                        <option value="Rental Jewellery Set Only">Rental Jewellery Set Only</option>
                        <option value="Classic Bridal Package">Classic Bridal Package</option>
                        <option value="Premium Bridal Package">Premium Bridal Package</option>
                        <option value="Luxury Royal Bridal Package">Luxury Royal Bridal Package</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Event Venue or City</label>
                    <input
                      type="text"
                      placeholder="e.g. Indiranagar, Bengaluru or Taj Connemara, Chennai"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B2244] bg-[#FAF7F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Special Notes / Preferences</label>
                    <textarea
                      rows={3}
                      placeholder="Mention any skin sensitivity, jewellery preferences, or bridesmaid count..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B2244] bg-[#FAF7F5] resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-[#3F1021] hover:bg-[#54162C] text-white font-serif text-xs uppercase tracking-wider rounded-full shadow-md transition-all"
                    >
                      Submit Consultation Request
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="px-6 py-3.5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#20ba5a] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Direct WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div id="faq" className="mt-20 pt-14 border-t border-[#EBDCD2]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-serif text-3xl text-[#260A14]">
              Common Questions About Bookings & Rentals
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#EBDCD2] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-stone-900 font-serif font-bold text-base hover:text-[#8B2244]"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#8B2244]" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </section>

    </div>
  );
}
