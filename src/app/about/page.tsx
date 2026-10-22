'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Award, Heart, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '@/data/siteData';
import AppointmentModal from '@/components/AppointmentModal';

export default function AboutPage() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  return (
    <div className="bg-[#FAF7F5] min-h-screen text-[#2C1D21] font-sans pb-20">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-[#260A14] via-[#3F1021] to-[#54162C] text-white py-16 px-4 sm:px-8 border-b border-[#DFB76C]/30 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#DFB76C] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            OUR PHILOSOPHY & HERITAGE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal">
            Beauty, Elegance & Bridal Perfection
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Crafting magnificent bridal transformations and curating museum-grade rental jewellery since 2014.
          </p>
        </div>
      </section>

      {/* Main Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/craft-heritage.jpg"
                alt="Jewellery master crafting wedding set"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 550px"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-4 sm:left-6 p-5 rounded-2xl bg-[#3F1021] text-white shadow-xl max-w-xs">
              <span className="font-serif text-3xl font-bold text-[#DFB76C]">2,400+</span>
              <p className="text-xs text-stone-200 mt-1">Weddings & receptions styled across South & North India.</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block">
              THE LUXORA STORY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#260A14] leading-tight">
              Honouring Indian Bridal Traditions with Contemporary Artistry
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Every Indian bride envisions a regal wedding day where she looks and feels like royalty. However, investing lakhs of rupees in heavy bridal jewellery that may only be worn once often creates unnecessary financial strain.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              <strong>LUXORA</strong> was established to bridge this dream. We pair award-winning HD & Airbrush bridal makeup with an authentic rental collection of 22K gold plated Temple, Antique, Kundan, and Polki jewellery. Every piece is curated from traditional artisan clusters in Jaipur, Chennai, and Hyderabad.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#3F1021]">Bespoke Trials</h3>
                <p className="text-xs text-stone-500 mt-1">Pre-wedding look testing and saree pleat alignment.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#3F1021]">100% Sanitization</h3>
                <p className="text-xs text-stone-500 mt-1">Medical ultrasonic cleaning and UV sterilization.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsAppointmentOpen(true)}
                className="px-8 py-3.5 bg-[#8B2244] hover:bg-[#6D1C3A] text-white font-serif text-xs uppercase tracking-wider rounded-full shadow-md transition-all"
              >
                Schedule Studio Visit
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="bg-white py-16 border-y border-[#EBDCD2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block mb-2">
              WHY BRIDES TRUST US
            </span>
            <h2 className="font-serif text-3xl text-[#260A14]">Our Four Pillars of Quality</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Medical Grade Sanitization',
                desc: 'All jewellery pieces undergo ultrasonic micro-bubble baths and medical UV-C light sterilization before packaging in sealed velvet cases.',
              },
              {
                icon: Award,
                title: 'Certified BIS Hallmark',
                desc: 'Authentic 22K and 24K gold flash micro-plating with authentic Kemp, CZ, and semi-precious tourmaline stones.',
              },
              {
                icon: Users,
                title: 'Dedicated Senior Stylists',
                desc: 'Artists with over 8+ years of bridal experience who travel directly to your venue with complete professional lighting & vanity setup.',
              },
              {
                icon: Heart,
                title: 'No-Stress Deposit Refund',
                desc: 'Zero-hassle security deposit refunds processed directly to your UPI / bank account within 24 hours of inspection.',
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="p-6 rounded-3xl bg-[#FAF7F5] border border-[#EBDCD2] space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFF1F2] text-[#8B2244] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-stone-900">{pillar.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />
    </div>
  );
}
