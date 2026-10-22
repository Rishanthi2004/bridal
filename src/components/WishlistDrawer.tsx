'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Heart, MessageCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { BUSINESS_INFO } from '@/data/siteData';

export default function WishlistDrawer() {
  const { isDrawerOpen, closeDrawer, wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  const handleWhatsAppAll = () => {
    if (wishlistItems.length === 0) return;
    const itemsList = wishlistItems
      .map((item, idx) => `${idx + 1}. ${item.name} (Rental: ₹${item.rentalPrice}, Deposit: ₹${item.securityDeposit})`)
      .join('\n');
    const text = `Hello LUXORA! I would like to inquire about renting these saved jewellery pieces for my wedding:\n\n${itemsList}\n\nPlease check availability!`;
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeDrawer}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F5] shadow-2xl flex flex-col justify-between border-l border-[#EBDCD2]">
          
          {/* Header */}
          <div className="p-5 bg-[#3F1021] text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D45B7D] flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold tracking-wide">Your Bridal Wishlist</h2>
                <p className="text-[11px] text-stone-200">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'Piece' : 'Pieces'} Saved
                </p>
              </div>
            </div>

            <button
              onClick={closeDrawer}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
              aria-label="Close wishlist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body / List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {wishlistItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FFF1F2] border border-[#D45B7D]/30 flex items-center justify-center text-[#D45B7D]">
                  <Heart className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif text-xl text-[#260A14]">Your Wishlist is Empty</h3>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  Browse our exquisite bridal jewellery rental collection and tap the heart icon on pieces you love for your wedding day.
                </p>
                <Link
                  href="/jewellery-rentals"
                  onClick={closeDrawer}
                  className="px-6 py-2.5 bg-[#8B2244] hover:bg-[#6D1C3A] text-white font-serif text-xs uppercase tracking-wider rounded-full shadow-sm transition-all"
                >
                  Explore Jewellery Collection
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-200">
                  <span>Saved Rental Items</span>
                  <button
                    onClick={clearWishlist}
                    className="text-[11px] text-red-600 hover:underline font-medium"
                  >
                    Clear All
                  </button>
                </div>

                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-3 border border-[#EBDCD2] shadow-2xs hover:shadow-sm transition-all flex gap-3.5 items-center justify-between"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-bold text-[#8B2244] tracking-wider block">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-[#260A14] truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="font-bold text-sm text-[#8B2244]">
                          ₹ {item.rentalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-stone-400">/ 3 Days</span>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        Deposit: ₹{item.securityDeposit} (Refundable)
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/jewellery-rentals/${item.id}`}
                        onClick={closeDrawer}
                        className="px-2.5 py-1 bg-[#FFF1F2] hover:bg-[#8B2244] text-[#8B2244] hover:text-white rounded-md text-[10px] font-bold uppercase transition-colors"
                      >
                        Rent
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {wishlistItems.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-stone-200 space-y-3">
              <button
                onClick={handleWhatsAppAll}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Enquire All ({wishlistItems.length}) on WhatsApp
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <Link
                  href="/wishlist"
                  onClick={closeDrawer}
                  className="text-stone-700 hover:text-[#8B2244] font-semibold flex items-center gap-1"
                >
                  <span>View Full Wishlist Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={closeDrawer}
                  className="text-stone-400 hover:text-stone-700"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
