'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Check, ArrowRight, ShieldCheck, Heart, Calendar, MessageCircle, Star } from 'lucide-react';
import { SERVICES, BRIDAL_PACKAGES, BUSINESS_INFO } from '@/data/siteData';
import AppointmentModal from '@/components/AppointmentModal';

export default function BridalMakeupPage() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Bridal Makeup');
  const [activeFilter, setActiveFilter] = useState<'all' | 'makeup' | 'styling' | 'prep'>('all');

  const filteredServices = activeFilter === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeFilter);

  const handleBook = (name: string) => {
    setSelectedService(name);
    setIsAppointmentOpen(true);
  };

  return (
    <div className="bg-[#FAF7F5] min-h-screen text-[#2C1D21] font-sans">
      
      {/* Header Banner */}
      <section className="relative bg-gradient-to-r from-[#3F1021] via-[#54162C] to-[#6D1C3A] text-white py-16 lg:py-24 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#DFB76C] text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              ROYAL INDIAN BRIDAL ARTISTRY
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
              Bespoke Bridal Makeup <br />
              <span className="text-[#DFB76C] italic">& Wedding Styling</span>
            </h1>
            <p className="text-stone-200 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              From traditional South Indian Muhurthams in Kanjeevaram silks to high-glamour North Indian receptions, our internationally trained artists create timeless, photogenic radiance.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => handleBook('Complete Bridal Makeup')}
                className="px-8 py-3.5 rounded-full bg-[#D45B7D] hover:bg-[#B83D63] text-white font-serif text-sm tracking-wider uppercase transition-all shadow-md"
              >
                Book Bridal Consultation
              </button>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20LUXORA,%20I%20am%20inquiring%20about%20Bridal%20Makeup%20dates.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                WhatsApp Artist
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
              <Image
                src="/images/bridal-makeup-traditional.jpg"
                alt="Bridal Makeup artistry by Luxora"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 450px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Filter Tabs */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-[#EBDCD2]">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block">OUR OFFERINGS</span>
            <h2 className="font-serif text-3xl text-[#260A14]">Signature Services & Starting Rates</h2>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-stone-200">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'makeup', label: 'Makeup Only' },
              { id: 'styling', label: 'Hair & Draping' },
              { id: 'prep', label: 'Skin Preparation' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-[#3F1021] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EBDCD2] hover:border-[#D45B7D] hover:shadow-xl transition-all flex flex-col sm:flex-row"
            >
              <div className="relative sm:w-2/5 min-h-[220px] bg-stone-100">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 300px"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#3F1021]/90 text-white text-[10px] font-semibold">
                  {service.duration}
                </span>
              </div>

              <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B2244]">
                      {service.category}
                    </span>
                    <span className="font-serif text-lg font-bold text-[#3F1021]">
                      ₹ {service.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#260A14] mt-1">{service.name}</h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">{service.description}</p>

                  <div className="mt-4 space-y-1.5">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#8B2244] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <button
                    onClick={() => handleBook(service.name)}
                    className="w-full py-2.5 rounded-full bg-[#3F1021] hover:bg-[#54162C] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    Book This Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-[#F5EFE9] border-y border-[#E8DCD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block mb-2">
              ALL-INCLUSIVE CURATED PACKAGES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#260A14]">
              Bridal Wedding Packages
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Transparent, comprehensive wedding styling packages with makeup, hair, draping, and jewellery vouchers included.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRIDAL_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-stone-100">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#260A14]">{pkg.name}</h3>
                  <p className="text-xs text-stone-500 mt-1 min-h-[32px]">{pkg.tagline}</p>

                  <div className="my-4 pt-3 border-t border-stone-100">
                    <span className="text-[10px] uppercase text-stone-400 block">Starting Rate</span>
                    <span className="font-serif text-2xl font-bold text-[#8B2244]">
                      ₹ {pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-stone-500 block">{pkg.duration}</span>
                  </div>

                  <div className="space-y-2 py-2">
                    {pkg.inclusions.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-600">
                        <Check className="w-3.5 h-3.5 text-[#8B2244] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <button
                    onClick={() => handleBook(pkg.name)}
                    className="w-full py-2.5 rounded-full bg-[#8B2244] hover:bg-[#6D1C3A] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
                  >
                    Select Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        preselectedService={selectedService}
      />
    </div>
  );
}
