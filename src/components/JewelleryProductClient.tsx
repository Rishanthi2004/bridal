'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  RotateCcw, 
  MessageCircle, 
  Check, 
  Heart, 
  ArrowLeft, 
  Calendar,
  Share2,
  Diamond,
  Star,
  CheckCircle2
} from 'lucide-react';
import { JEWELLERY_PRODUCTS, BUSINESS_INFO } from '@/data/siteData';
import { JewelleryItem } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import AppointmentModal from '@/components/AppointmentModal';

export default function JewelleryProductClient({ product }: { product: JewelleryItem }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [rentalDuration, setRentalDuration] = useState<'3-days' | '5-days' | '7-days'>('3-days');
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Price calculations based on duration
  const multiplier = rentalDuration === '3-days' ? 1 : rentalDuration === '5-days' ? 1.4 : 1.8;
  const currentRentalPrice = Math.round(product.rentalPrice * multiplier);

  const imagesList = [product.image, ...(product.secondaryImages || [])];

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppBooking = () => {
    const text = `Hello LUXORA! I would like to book a rental for *${product.name}* (ID: ${product.id}).\n*Selected Duration:* ${rentalDuration}\n*Calculated Rental Price:* ₹${currentRentalPrice}\n*Refundable Deposit:* ₹${product.securityDeposit}\nPlease let me know date availability!`;
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const relatedProducts = JEWELLERY_PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="bg-[#FAF7F5] min-h-screen text-[#2C1D21] font-sans pb-20">
      
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-stone-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#8B2244]">Home</Link>
            <span>/</span>
            <Link href="/jewellery-rentals" className="hover:text-[#8B2244]">Rental Jewellery</Link>
            <span>/</span>
            <span className="text-stone-900 font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </div>

          <Link
            href="/jewellery-rentals"
            className="flex items-center gap-1 text-[#8B2244] font-semibold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Catalogue
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#EBDCD2] shadow-sm">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 650px"
              />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-white/95 text-xs font-bold text-[#8B2244] shadow-xs">
                  {product.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#260A14] text-white text-xs font-medium">
                  {product.availability}
                </span>
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-stone-700 shadow-sm transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    wishlisted 
                      ? 'bg-[#D45B7D] text-white shadow-md' 
                      : 'bg-white/90 hover:bg-white text-stone-700 shadow-sm'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {copied && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#260A14] text-white text-xs shadow-lg animate-fade-in">
                  Link copied to clipboard!
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {imagesList.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImage === img ? 'border-[#8B2244] ring-2 ring-[#8B2244]/20' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} view ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Hygiene & Trust Promises */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-[#EBDCD2] text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8B2244] shrink-0" />
                <span>UV-C Sterilized</span>
              </div>
              <div className="flex items-center gap-2">
                <Diamond className="w-4 h-4 text-[#8B2244] shrink-0" />
                <span>BIS Hallmarked</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#8B2244] shrink-0" />
                <span>Instant Deposit Refund</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBDCD2] shadow-sm space-y-5">
              <div>
                <div className="flex items-center gap-2 text-stone-500 text-xs">
                  <div className="flex items-center text-[#DFB76C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span>({product.reviewCount} verified bridal rentals)</span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#260A14] mt-2">
                  {product.name}
                </h1>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price Calculation Box */}
              <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#E8DCD5] space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-medium text-stone-600">Rental Fee:</span>
                  <div className="text-right">
                    <span className="font-serif text-3xl font-bold text-[#8B2244]">
                      ₹ {currentRentalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-stone-500 block">
                      Retail Market Worth: <s className="text-stone-400">₹ {product.retailValue.toLocaleString('en-IN')}</s>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs text-stone-600">
                  <span>Refundable Security Deposit:</span>
                  <span className="font-semibold text-stone-900">₹ {product.securityDeposit.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Rental Duration Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Select Rental Duration:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '3-days', label: '3 Days', desc: 'Standard Wedding' },
                    { id: '5-days', label: '5 Days', desc: 'Multi-Event' },
                    { id: '7-days', label: '7 Days', desc: 'Destination' },
                  ].map((dur) => (
                    <button
                      key={dur.id}
                      onClick={() => setRentalDuration(dur.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        rentalDuration === dur.id
                          ? 'border-[#8B2244] bg-[#FFF1F2] text-[#8B2244] font-bold shadow-xs'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="block text-xs font-semibold">{dur.label}</span>
                      <span className="block text-[10px] text-stone-500 mt-0.5">{dur.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setIsAppointmentOpen(true)}
                  className="w-full py-3.5 bg-[#3F1021] hover:bg-[#54162C] text-white font-serif text-sm tracking-wider uppercase rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  Reserve For Wedding Date
                </button>

                <button
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Instant WhatsApp Availability Check
                </button>
              </div>

              <p className="text-[11px] text-center text-stone-500">
                🔒 Deposit is 100% refunded to your account within 24 hours of safe return.
              </p>
            </div>

            {/* Included in this set */}
            <div className="bg-white p-6 rounded-3xl border border-[#EBDCD2] space-y-3">
              <h3 className="font-serif text-base font-bold text-[#260A14]">
                Included in This Jewellery Set:
              </h3>
              <div className="space-y-2">
                {product.includes?.map((inc: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-[#8B2244] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white p-6 rounded-3xl border border-[#EBDCD2] space-y-3">
              <h3 className="font-serif text-base font-bold text-[#260A14]">
                Craftsmanship & Specifications:
              </h3>
              <div className="space-y-2 text-xs text-stone-600">
                <p><strong>Base Metal:</strong> {product.specifications.material}</p>
                <p><strong>Plating:</strong> {product.specifications.plating}</p>
                <p><strong>Stones Used:</strong> {product.specifications.stones}</p>
                <p><strong>Total Weight:</strong> {product.specifications.weight}</p>
                <p><strong>Care Note:</strong> {product.specifications.careInstructions}</p>
              </div>
            </div>

          </div>

        </div>

        {/* Related Jewellery */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#EBDCD2]">
            <h2 className="font-serif text-2xl font-bold text-[#260A14] mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map(rel => (
                <Link
                  key={rel.id}
                  href={`/jewellery-rentals/${rel.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#EBDCD2] hover:shadow-md transition-all p-4 flex gap-4 items-center"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                    <Image src={rel.image} alt={rel.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-stone-900 group-hover:text-[#8B2244] transition-colors line-clamp-1">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-stone-500">{rel.duration}</p>
                    <p className="font-serif font-bold text-sm text-[#8B2244] mt-1">₹ {rel.rentalPrice.toLocaleString('en-IN')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        preselectedService={`Jewellery Rental: ${product.name}`}
      />
    </div>
  );
}
