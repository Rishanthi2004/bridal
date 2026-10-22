'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Eye, Filter, ArrowRight } from 'lucide-react';
import { GALLERY_ITEMS } from '@/data/siteData';
import LightboxModal from '@/components/LightboxModal';
import AppointmentModal from '@/components/AppointmentModal';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedLook, setSelectedLook] = useState('');

  const categories = [
    'All',
    'South Indian',
    'North Indian',
    'Hairstyles',
    'Jewellery Close-ups',
    'Reception & Glam',
  ];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const handleOpenBooking = (lookTitle?: string) => {
    if (lookTitle) setSelectedLook(lookTitle);
    setIsAppointmentOpen(true);
  };

  return (
    <div className="bg-[#FAF7F5] min-h-screen text-[#2C1D21] font-sans pb-20">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-[#260A14] via-[#3F1021] to-[#54162C] text-white py-14 px-4 sm:px-8 border-b border-[#DFB76C]/30 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#DFB76C] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            REAL BRIDAL PORTFOLIO
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal">
            Our Work Gallery
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Browse our signature transformations, traditional South Indian Muhurtham styling, floral hair artistry, and luxury rental jewellery pairings.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-10">
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#8B2244] text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-[#EBDCD2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all border border-[#EBDCD2] bg-white"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#DFB76C]">
                  {item.category}
                </span>
                <h3 className="font-serif text-base font-bold leading-tight mt-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#FAFAF9] font-medium">
                  <Eye className="w-3.5 h-3.5 text-[#DFB76C]" />
                  <span>Preview Full Look</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-white p-8 rounded-3xl border border-[#EBDCD2] max-w-xl mx-auto space-y-3">
          <h3 className="font-serif text-2xl text-[#260A14]">Love Any of These Looks?</h3>
          <p className="text-xs text-stone-600">
            Our bridal consultants can recreate any hairstyle, makeup radiance, or jewellery combination tailored to your wedding attire.
          </p>
          <button
            onClick={() => handleOpenBooking('Custom Bridal Look')}
            className="px-8 py-3 bg-[#3F1021] hover:bg-[#54162C] text-white font-serif text-xs uppercase tracking-wider rounded-full shadow-md transition-all"
          >
            Book Look Consultation
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
        onOpenBooking={(title) => handleOpenBooking(title)}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        preselectedService={selectedLook ? `Bridal Look: ${selectedLook}` : undefined}
      />

    </div>
  );
}
