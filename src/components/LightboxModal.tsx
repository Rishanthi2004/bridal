'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GalleryItem } from '@/types';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onOpenBooking?: (serviceName?: string) => void;
}

export default function LightboxModal({
  items,
  currentIndex,
  onClose,
  onNavigate,
  onOpenBooking,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      }
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % items.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Left */}
      <button
        onClick={handlePrev}
        className="absolute left-4 z-20 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Navigation Right */}
      <button
        onClick={handleNext}
        className="absolute right-4 z-20 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content Container */}
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row bg-[#260A14] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Image */}
        <div className="relative flex-1 min-h-[380px] md:min-h-[520px] bg-black">
          <Image
            src={currentItem.image}
            alt={currentItem.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>

        {/* Details Panel */}
        <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-gradient-to-b from-[#3F1021] to-[#260A14] text-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold">
                {currentItem.category}
              </span>
              <span className="text-xs text-white/50">
                {currentIndex + 1} / {items.length}
              </span>
            </div>

            <h3 className="font-serif text-2xl text-white leading-snug">
              {currentItem.title}
            </h3>

            <p className="text-sm text-stone-300 leading-relaxed">
              {currentItem.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {currentItem.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-1 bg-white/10 rounded-full text-stone-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/15 space-y-3">
            <button
              onClick={() => {
                onClose();
                if (onOpenBooking) onOpenBooking(currentItem.title);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#D45B7D] hover:bg-[#B83D63] text-white rounded-full font-serif text-sm transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#DFB76C]" />
              Book This Bridal Look
            </button>
            <p className="text-[11px] text-center text-white/50">
              Customized with matched jewellery & trials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
