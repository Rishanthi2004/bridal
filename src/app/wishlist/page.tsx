'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Trash2, MessageCircle, Eye, ArrowRight, ShieldCheck, Diamond, Sparkles } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { BUSINESS_INFO } from '@/data/siteData';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  const handleWhatsAppAll = () => {
    if (wishlistItems.length === 0) return;
    const itemsList = wishlistItems
      .map((item, idx) => `${idx + 1}. ${item.name} (Rental: ₹${item.rentalPrice}, Deposit: ₹${item.securityDeposit})`)
      .join('\n');
    const text = `Hello LUXORA! I would like to inquire about renting these saved jewellery pieces for my wedding:\n\n${itemsList}\n\nPlease check availability!`;
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const totalRental = wishlistItems.reduce((acc, curr) => acc + curr.rentalPrice, 0);
  const totalDeposit = wishlistItems.reduce((acc, curr) => acc + curr.securityDeposit, 0);

  return (
    <div className="bg-[#FAF7F5] min-h-screen text-[#2C1D21] font-sans pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#260A14] via-[#3F1021] to-[#54162C] text-white py-14 px-4 sm:px-8 border-b border-[#DFB76C]/30 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#DFB76C] text-xs font-semibold tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5 fill-current text-[#D45B7D]" />
            CURATED SELECTION
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal">
            Your Bridal Wishlist
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'jewellery piece' : 'jewellery pieces'} saved for your special celebration.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {wishlistItems.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-20 bg-white rounded-3xl p-8 border border-[#EBDCD2] shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FFF1F2] border border-[#D45B7D]/30 flex items-center justify-center text-[#D45B7D] mx-auto">
              <Heart className="w-8 h-8 stroke-1" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#260A14]">Your Wishlist is Empty</h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              Explore our jewellery collection and tap the heart icon on any necklace, choker, jhumka, or bridal set you like.
            </p>
            <div className="pt-2">
              <Link
                href="/jewellery-rentals"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B2244] hover:bg-[#6D1C3A] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm transition-all"
              >
                <span>Browse Jewellery Rentals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#EBDCD2] shadow-xs">
              <div className="text-xs text-stone-600">
                Total Estimated Rental: <strong className="text-[#8B2244] text-base font-serif font-bold">₹ {totalRental.toLocaleString('en-IN')}</strong>
                <span className="text-stone-400 ml-2">(+ ₹{totalDeposit.toLocaleString('en-IN')} refundable deposit)</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleWhatsAppAll}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enquire All on WhatsApp
                </button>

                <button
                  onClick={clearWishlist}
                  className="px-4 py-2.5 text-stone-500 hover:text-red-600 text-xs font-medium border border-stone-200 rounded-full hover:bg-stone-50 transition-colors"
                >
                  Clear Wishlist
                </button>
              </div>
            </div>

            {/* Grid of Wishlist Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#EBDCD2] hover:border-[#D45B7D] hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />

                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-red-50 text-stone-600 hover:text-red-600 flex items-center justify-center shadow-sm transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/95 text-[10px] font-bold text-[#8B2244] uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="font-serif text-base font-bold text-[#260A14] truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-3 pt-3 border-t border-stone-100 flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] uppercase text-stone-400 block">3-Day Rental</span>
                          <span className="font-serif text-lg font-bold text-[#8B2244]">
                            ₹ {item.rentalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase text-stone-400 block">Refundable Deposit</span>
                          <span className="text-xs text-stone-600 font-semibold">₹ {item.securityDeposit}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <Link
                      href={`/jewellery-rentals/${item.id}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-stone-200 text-stone-800 hover:bg-stone-100 text-xs font-semibold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Details
                    </Link>

                    <a
                      href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20LUXORA,%20I%20am%20inquiring%20about%20my%20wishlisted%20item:%20${encodeURIComponent(item.name)}%20(₹${item.rentalPrice}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold transition-colors shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Enquire
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
