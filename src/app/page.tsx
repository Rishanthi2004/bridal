'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Diamond, 
  Star, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  MessageCircle, 
  Phone, 
  Check, 
  Clock, 
  MapPin, 
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { 
  BUSINESS_INFO, 
  SERVICES, 
  BRIDAL_PACKAGES, 
  CATEGORIES_CIRCULAR, 
  JEWELLERY_PRODUCTS, 
  FEATURED_RENTAL_PRICING, 
  GALLERY_ITEMS, 
  TESTIMONIALS, 
  WHY_CHOOSE_US,
  FAQ_LIST 
} from '@/data/siteData';
import AppointmentModal from '@/components/AppointmentModal';
import { useWishlist } from '@/context/WishlistContext';

export default function HomePage() {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState('');

  // Jewellery section category filtering & search
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [jewellerySearch, setJewellerySearch] = useState<string>('');

  // Booking Form State on the page
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding / Muhurtham',
    eventDate: '',
    service: 'Bridal Makeup & Jewellery Combo',
    location: '',
    notes: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Mobile Bridal Packages Carousel State
  const [mobilePackageIndex, setMobilePackageIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const prevMobilePackage = () => {
    setMobilePackageIndex((prev) => (prev > 0 ? prev - 1 : BRIDAL_PACKAGES.length - 1));
  };

  const nextMobilePackage = () => {
    setMobilePackageIndex((prev) => (prev < BRIDAL_PACKAGES.length - 1 ? prev + 1 : 0));
  };

  const handlePackageTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handlePackageTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handlePackageTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      // Swiped left -> next
      nextMobilePackage();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev
      prevMobilePackage();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };



  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) setSelectedServiceForModal(serviceName);
    setIsAppointmentOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.eventDate) {
      setBookingError('Please enter your name, phone number, and event date.');
      return;
    }
    setBookingError('');
    setBookingSuccess(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello LUXORA! I am interested in booking an appointment.\n*Name:* ${bookingForm.name || 'Client'}\n*Date:* ${bookingForm.eventDate || 'TBD'}\n*Service:* ${bookingForm.service}\n*City:* ${bookingForm.location || 'Pending'}`;
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filteredJewellery = JEWELLERY_PRODUCTS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = item.name.toLowerCase().includes(jewellerySearch.toLowerCase()) || 
                          item.category.toLowerCase().includes(jewellerySearch.toLowerCase()) ||
                          item.description.toLowerCase().includes(jewellerySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAF7F5] text-[#2C1D21] font-sans overflow-hidden">
      
      {/* 1. HERO SECTION - Faithfully styled after the reference image */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F6ECE8] via-[#FAF3F0] to-[#F1E1DC] pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-[#F0E4DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 z-10 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3F1021]/5 border border-[#3F1021]/15 text-[#6D1C3A] text-xs font-semibold tracking-[0.2em] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
                CRAFTED TO CELEBRATE YOU
              </div>

              {/* Main Heading matching reference image layout */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#260A14] leading-[1.15]">
                Timeless Elegance. <br />
                <span className="text-[#C96B85] italic font-normal">Your Dream Bridal Look.</span>
              </h1>

              {/* Subheading */}
              <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Professional bridal makeup and exquisite rental jewellery to make every celebration unforgettable. From traditional muhurthams to royal evening banquets.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => handleOpenBooking('Complete Bridal Look')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#3F1021] hover:bg-[#54162C] text-white font-medium text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-95 group"
                >
                  <span>Book Your Bridal Look</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>

                <Link
                  href="/jewellery-rentals"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-[#D45B7D]/40 text-[#6D1C3A] hover:bg-[#FFF1F2] font-medium text-sm tracking-wider uppercase transition-all shadow-sm"
                >
                  Explore Jewellery
                </Link>
              </div>

              {/* Trust badges row directly below hero buttons (as in reference image) */}
              <div className="pt-8 border-t border-[#E8DCD5] grid grid-cols-3 gap-3 text-left">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-white/80 shadow-sm text-[#DFB76C]">
                    <Diamond className="w-4 h-4 text-[#8B2244]" />
                  </div>
                  <div>
                    <h2 className="text-[11px] sm:text-xs font-bold text-stone-900 leading-tight">Certified</h2>
                    <p className="text-[10px] sm:text-[11px] text-stone-500">BIS Hallmarked</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-white/80 shadow-sm text-[#8B2244]">
                    <ShieldCheck className="w-4 h-4 text-[#8B2244]" />
                  </div>
                  <div>
                    <h2 className="text-[11px] sm:text-xs font-bold text-stone-900 leading-tight">100% Secure</h2>
                    <p className="text-[10px] sm:text-[11px] text-stone-500">Hygiene Checked</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-white/80 shadow-sm text-[#8B2244]">
                    <Truck className="w-4 h-4 text-[#8B2244]" />
                  </div>
                  <div>
                    <h2 className="text-[11px] sm:text-xs font-bold text-stone-900 leading-tight">Doorstep Trial</h2>
                    <p className="text-[10px] sm:text-[11px] text-stone-500">Across South India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Column - Real Indian Bride Photography matching reference */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-lg aspect-[4/5] rounded-[36px] overflow-hidden shadow-2xl border-4 border-white/60">
                <Image
                  src="/images/bridal_hero_model_1792649033065.jpg"
                  alt="Indian bride in pink jewellery and professional bridal makeup"
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />

                {/* Floating soft gradient overlay for elegance */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#260A14]/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating luxury tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B2244]">SIGNATURE BRIDAL STYLING</span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900">Rose Gold & Pink Tourmaline Collection</h3>
                  </div>
                  <button 
                    onClick={() => handleOpenBooking('Rose Gold Bridal Look')}
                    className="px-3.5 py-1.5 rounded-full bg-[#8B2244] text-white text-xs font-medium hover:bg-[#6D1C3A] transition-colors"
                  >
                    View Look
                  </button>
                </div>
              </div>

              {/* Decorative background aura */}
              <div className="absolute -z-10 w-96 h-96 bg-[#D45B7D]/20 rounded-full blur-3xl -top-10 -right-10 pointer-events-none" />
            </div>

          </div>
        </div>
      </section>

      {/* 2. CIRCULAR CATEGORY SECTION - "Shop by Category / Find Your Perfect Piece" */}
      <section className="py-14 bg-white border-b border-[#F5EFE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Header */}
          <div className="mb-10 text-center sm:text-left">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block mb-1">
              SHOP BY CATEGORY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#260A14]">
              Find Your Perfect Piece
            </h2>
          </div>

          {/* Full Width 5-Column Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 w-full justify-items-center py-2">
            {CATEGORIES_CIRCULAR.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="group flex flex-col items-center w-full max-w-[200px] text-center"
              >
                {/* Circular image with soft pedestal effect matching reference */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-[#EBDCD2] to-[#FFF1F2] border-2 border-[#D45B7D]/20 shadow-sm group-hover:border-[#8B2244] group-hover:shadow-md transition-all duration-300">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-[#FAF7F5]">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px"
                    />
                  </div>
                </div>

                <h3 className="font-serif text-sm sm:text-base font-semibold tracking-wider text-[#260A14] mt-3 group-hover:text-[#8B2244] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] sm:text-xs text-stone-500 font-sans group-hover:underline mt-0.5">
                  Explore Now
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR BESTSELLERS SECTION - "Handpicked For You" */}
      <section className="py-16 bg-[#FAF7F5] border-b border-[#F0E4DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block mb-1">
                OUR BESTSELLERS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#260A14]">
                Handpicked For You
              </h2>
            </div>
            <Link
              href="/jewellery-rentals"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8B2244] hover:text-[#54162C] transition-colors group"
            >
              <span>VIEW ALL PRODUCTS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4 Cards Grid matching reference image layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {JEWELLERY_PRODUCTS.slice(0, 4).map((product) => {
              const isWishlisted = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#EFE5DE] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#FAF7F5]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    {/* Wishlist Heart Button matching reference */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isWishlisted 
                          ? 'bg-[#D45B7D] text-white shadow-md' 
                          : 'bg-white/90 text-stone-500 hover:text-[#D45B7D] hover:bg-white shadow-sm'
                      }`}
                      aria-label="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    {/* Category Label */}
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/95 text-[10px] font-semibold text-[#8B2244] uppercase tracking-wider backdrop-blur-xs">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-sm sm:text-base font-semibold text-[#260A14] line-clamp-1 group-hover:text-[#8B2244] transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Price row */}
                      <div className="flex items-baseline gap-2 mt-1.5">
                        <span className="font-sans font-bold text-base sm:text-lg text-[#260A14]">
                          ₹ {product.rentalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-stone-500 font-normal">
                          / {product.duration}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating matching reference */}
                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-stone-100">
                      <div className="flex items-center text-[#DFB76C]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      <Link
                        href={`/jewellery-rentals/${product.id}`}
                        className="text-xs font-semibold text-[#8B2244] hover:text-[#54162C] flex items-center gap-1"
                      >
                        Rent Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PLUM/BURGUNDY FEATURE STRIP - Matching the reference image exactly */}
      <section className="bg-[#421122] text-[#FAF7F5] py-8 border-y border-[#54162C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="p-2.5 rounded-full bg-white/10 text-[#DFB76C] flex-shrink-0">
                <Diamond className="w-5 h-5 text-[#DFB76C]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  CERTIFIED JEWELLERY
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5">
                  BIS Hallmarked & Authentic
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="p-2.5 rounded-full bg-white/10 text-[#DFB76C] flex-shrink-0">
                <Clock className="w-5 h-5 text-[#DFB76C]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  EASY RETURNS
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5">
                  100% Security Deposit Refund
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="p-2.5 rounded-full bg-white/10 text-[#DFB76C] flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#DFB76C]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  HYGIENE GUARANTEE
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5">
                  Medical UV-C Sterilized Items
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="p-2.5 rounded-full bg-white/10 text-[#DFB76C] flex-shrink-0">
                <Phone className="w-5 h-5 text-[#DFB76C]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  CUSTOMER SUPPORT
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5">
                  {BUSINESS_INFO.phone}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. OUR SERVICES & PRICES - 8 Services in 4-column desktop / 2-column mobile */}
      <section id="services" className="py-20 bg-white border-b border-[#F5EFE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block mb-2">
              BESPOKE BRIDAL MAKEUP & STYLING
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#260A14]">
              Our Services & Starting Prices
            </h2>
            <p className="text-stone-600 text-sm mt-3 leading-relaxed">
              Tailored Indian bridal artistry using international luxury cosmetic formulations, customized hair ornamentation, and authentic saree pleat architecture.
            </p>
          </div>

          {/* 8 Services Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="group bg-[#FAF7F5] rounded-2xl overflow-hidden border border-[#EBDCD2] hover:border-[#D45B7D] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#3F1021]/90 text-white text-[10px] font-semibold tracking-wider">
                      {service.duration}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#260A14] group-hover:text-[#8B2244] transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    <div className="mt-3 pt-3 border-t border-[#E8DCD5]/60 flex items-baseline justify-between">
                      <span className="text-[11px] text-stone-500 font-medium">Starting from</span>
                      <span className="font-serif font-bold text-base text-[#8B2244]">
                        ₹ {service.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => handleOpenBooking(service.name)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#D45B7D]/40 text-[#8B2244] hover:bg-[#8B2244] hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-2xs"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/bridal-makeup"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#8B2244] hover:text-[#54162C] border-b-2 border-[#8B2244] pb-1"
            >
              <span>Explore All Makeup Services & Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. SPECIAL OFFERS PROMOTIONAL BANNER - Deep Pink/Burgundy with white text */}
      <section className="bg-gradient-to-r from-[#54162C] via-[#6D1C3A] to-[#8B2244] text-white py-14 px-4 sm:px-8 border-y-2 border-[#DFB76C]/30 shadow-inner">
        <div className="max-w-5xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#DFB76C] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            EXCLUSIVE BRIDAL COMBO SAVINGS
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight">
            Your Special Day Deserves Something Extraordinary!
          </h2>

          <p className="text-sm sm:text-base text-stone-200 max-w-2xl mx-auto leading-relaxed">
            Discover exclusive bridal makeup packages and beautiful jewellery rentals for your big day. Book both together and receive an exclusive 25% savings voucher plus complimentary pre-bridal trial.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleOpenBooking('Bridal Combo Package')}
              className="px-8 py-3.5 bg-white text-[#54162C] hover:bg-[#FAF7F5] font-serif font-bold text-sm tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              View Bridal Packages
            </button>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20LUXORA,%20I%20am%20interested%20in%20the%20Bridal%20Combo%20Package%20Offer.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs font-semibold tracking-wider uppercase rounded-full transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 7. BRIDAL MAKEUP PACKAGES SECTION */}
      <section id="packages" className="py-20 bg-[#FAF7F5] border-b border-[#F0E4DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block mb-2">
              CURATED WEDDING EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#260A14]">
              Bridal Makeup Packages
            </h2>
            <p className="text-stone-600 text-sm mt-3 leading-relaxed">
              Transparent packages crafted for morning muhurthams, evening banquets, and multi-day destination weddings.
            </p>
          </div>

          {/* Mobile Only Carousel (md:hidden) */}
          <div className="md:hidden">
            <div 
              className="relative overflow-hidden w-full select-none"
              onTouchStart={handlePackageTouchStart}
              onTouchMove={handlePackageTouchMove}
              onTouchEnd={handlePackageTouchEnd}
            >
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${mobilePackageIndex * 100}%)` }}
              >
                {BRIDAL_PACKAGES.map((pkg) => (
                  <div key={pkg.id} className="w-full flex-shrink-0 px-1">
                    <div
                      className={`relative bg-white rounded-2xl p-4 border flex flex-col justify-between shadow-xs transition-all ${
                        pkg.popular 
                          ? 'border-[#8B2244] ring-1 ring-[#8B2244]/20' 
                          : 'border-stone-200'
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#8B2244] text-white text-[9px] font-bold uppercase tracking-wider z-10 shadow-xs">
                          MOST POPULAR
                        </div>
                      )}

                      <div>
                        {/* Compact image banner */}
                        <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3 bg-stone-100">
                          <Image
                            src={pkg.image}
                            alt={pkg.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 350px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-[10px] text-white font-medium">
                            {pkg.duration}
                          </span>
                        </div>

                        {/* Package Info */}
                        <div className="pb-2.5 border-b border-stone-100">
                          <h3 className="font-serif text-lg font-bold text-[#260A14] leading-tight pr-16">{pkg.name}</h3>
                          <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{pkg.tagline}</p>
                          
                          <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-[10px] text-stone-400 uppercase">Starting from</span>
                            <span className="font-serif text-2xl font-bold text-[#8B2244]">
                              ₹ {pkg.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Inclusions */}
                        <div className="py-2.5 space-y-1.5">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-stone-700">Key Inclusions:</p>
                          {pkg.inclusions.slice(0, 3).map((inc, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-stone-600">
                              <Check className="w-3.5 h-3.5 text-[#8B2244] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{inc}</span>
                            </div>
                          ))}
                          {pkg.inclusions.length > 3 && (
                            <p className="text-[10px] text-[#8B2244] font-medium pl-5">
                              + {pkg.inclusions.length - 3} more services included
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-2 border-t border-stone-100">
                        <button
                          onClick={() => handleOpenBooking(pkg.name)}
                          className={`w-full py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xs ${
                            pkg.popular
                              ? 'bg-[#8B2244] hover:bg-[#6D1C3A] text-white shadow-sm'
                              : 'bg-[#FAF7F5] hover:bg-[#8B2244] text-[#8B2244] hover:text-white border border-[#8B2244]/30'
                          }`}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Carousel Controls: Arrows + Dots */}
            <div className="flex items-center justify-between mt-4 px-2">
              <button
                onClick={prevMobilePackage}
                className="w-8 h-8 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-700 shadow-xs hover:border-[#8B2244] hover:text-[#8B2244] active:scale-95 transition-all"
                aria-label="Previous package"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {BRIDAL_PACKAGES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setMobilePackageIndex(dotIdx)}
                    className={`transition-all duration-300 rounded-full ${
                      mobilePackageIndex === dotIdx
                        ? 'w-6 h-2 bg-[#8B2244]'
                        : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={`Go to package ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextMobilePackage}
                className="w-8 h-8 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-700 shadow-xs hover:border-[#8B2244] hover:text-[#8B2244] active:scale-95 transition-all"
                aria-label="Next package"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop and Tablet Grid (hidden md:grid) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRIDAL_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                  pkg.popular 
                    ? 'border-[#8B2244] ring-2 ring-[#8B2244]/20 shadow-md' 
                    : 'border-stone-200 shadow-sm'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8B2244] text-white text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="text-center pb-5 border-b border-stone-100">
                    <h3 className="font-serif text-xl font-bold text-[#260A14]">{pkg.name}</h3>
                    <p className="text-xs text-stone-500 mt-1 min-h-[32px]">{pkg.tagline}</p>
                    
                    <div className="mt-4">
                      <span className="text-xs text-stone-400">Starting from</span>
                      <div className="font-serif text-3xl font-bold text-[#8B2244] mt-0.5">
                        ₹ {pkg.price.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[11px] text-stone-500">{pkg.duration}</span>
                    </div>
                  </div>

                  <div className="py-5 space-y-2.5">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-stone-700">What is included:</p>
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-600">
                        <Check className="w-4 h-4 text-[#8B2244] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <button
                    onClick={() => handleOpenBooking(pkg.name)}
                    className={`w-full py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-sm ${
                      pkg.popular
                        ? 'bg-[#8B2244] hover:bg-[#6D1C3A] text-white shadow-md'
                        : 'bg-[#FAF7F5] hover:bg-[#8B2244] text-[#8B2244] hover:text-white border border-[#8B2244]/30'
                    }`}
                  >
                    Select {pkg.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RENTAL JEWELLERY COLLECTION (CATALOGUE SHOWCASE) - Hidden on mobile view */}
      <section id="jewellery" className="hidden md:block py-20 bg-white border-b border-[#F5EFE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block mb-2">
              ROYAL HERITAGE & MODERN FINESSE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#260A14]">
              Rental Jewellery Collection
            </h2>
            <p className="text-stone-600 text-sm mt-3 leading-relaxed">
              Experience the grandeur of 22K gold, uncut Polki, and South Indian temple jewellery without the burden of heavy investment. Sanitized, hallmarked, and delivered safely.
            </p>
          </div>

          {/* Filter Bar & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
              {['All', 'Bridal Sets', 'Temple Jewellery', 'Kundan & Polki', 'Earrings & Jhumkas', 'Rings', 'Bracelets & Bangles', 'Waist Belts (Oddiyanam)'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? 'bg-[#8B2244] text-white shadow-xs'
                      : 'bg-[#FAF7F5] text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search jewellery..."
                value={jewellerySearch}
                onChange={(e) => setJewellerySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#FAF7F5] border border-stone-200 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-[#8B2244]"
              />
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJewellery.map((item) => (
              <div
                key={item.id}
                className="group bg-[#FAF7F5] rounded-3xl overflow-hidden border border-[#EBDCD2] hover:border-[#D45B7D] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Availability tag */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-bold text-stone-800 tracking-wider shadow-xs">
                      {item.availability}
                    </span>

                    {/* Deposit info badge */}
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#3F1021]/80 backdrop-blur-xs text-[10px] font-medium text-white shadow-xs">
                      Dep: ₹{item.securityDeposit} (Refundable)
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-[#8B2244] font-semibold mb-1">
                      <span>{item.category}</span>
                      <span className="text-stone-500 font-normal">{item.duration}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#260A14] group-hover:text-[#8B2244] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#E8DCD5] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-stone-500 block">Rental Price</span>
                        <span className="font-serif text-xl font-bold text-[#260A14]">
                          ₹ {item.rentalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wider text-stone-500 block">Retail Worth</span>
                        <span className="text-xs text-stone-500 line-through">
                          ₹ {item.retailValue.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <Link
                    href={`/jewellery-rentals/${item.id}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-stone-200 text-stone-800 hover:bg-stone-50 text-xs font-semibold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                  </Link>

                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20LUXORA,%20I%20am%20interested%20in%20renting%20the%20${encodeURIComponent(item.name)}%20(₹${item.rentalPrice}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a] text-xs font-semibold transition-colors shadow-2xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Enquire
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/jewellery-rentals"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#8B2244] text-white rounded-full font-serif text-sm tracking-wider uppercase hover:bg-[#6D1C3A] transition-all shadow-md"
            >
              <span>Explore Complete 150+ Piece Rental Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. BRIDAL JEWELLERY RENTAL PRICING (Inspired by reference image's pricing cards) */}
      <section className="py-16 bg-[#FAF7F5] border-b border-[#F0E4DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block mb-2">
              FEATURED RENTAL RATES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#260A14]">
              Bridal Jewellery Rental Pricing
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Transparent 3-day rates including sanitization, velvet display case, and full insurance coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_RENTAL_PRICING.map((plan, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-[#EBDCD2] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-stone-100">
                    <Image
                      src={plan.image}
                      alt={plan.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#8B2244] text-white text-[10px] font-bold">
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#260A14]">{plan.title}</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{plan.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100">
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-xl font-bold text-[#8B2244]">{plan.price}</span>
                    <span className="text-[11px] text-stone-500">{plan.duration}</span>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-0.5">Deposit: {plan.deposit}</p>

                  <button
                    onClick={() => handleOpenBooking(`Rental: ${plan.title}`)}
                    className="w-full mt-3 py-2 bg-[#FFF1F2] hover:bg-[#8B2244] text-[#8B2244] hover:text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Check Date Availability
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 11. ABOUT US SECTION */}
      <section id="about" className="py-20 bg-[#FAF7F5] border-b border-[#F0E4DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Bridal portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/craft-heritage.jpg"
                  alt="Artisan crafting bridal jewellery and makeup application"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 p-5 rounded-2xl bg-[#3F1021] text-white shadow-xl max-w-xs">
                <span className="font-serif text-3xl font-bold text-[#DFB76C] block leading-none">12+</span>
                <span className="text-xs uppercase tracking-wider font-semibold mt-1 block">Years of Bridal Excellence</span>
                <p className="text-[11px] text-stone-300 mt-0.5">Over 2,400+ brides styled across India</p>
              </div>
            </div>

            {/* About Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block">
                OUR BRIDAL STUDIO STORY
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#260A14] leading-tight">
                Beauty, Elegance & Bridal Perfection
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Founded with a mission to bring royal opulence to every bride, <strong className="text-[#3F1021]">LUXORA</strong> is India&apos;s premier destination combining bespoke bridal makeup artistry with an exclusive museum-grade jewellery rental vault.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-[#EBDCD2]">
                  <h3 className="font-serif text-base font-bold text-[#3F1021]">Master Makeup Artists</h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Certified in international HD & Airbrush techniques using Dior, Charlotte Tilbury, MAC, and Huda Beauty.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EBDCD2]">
                  <h3 className="font-serif text-base font-bold text-[#3F1021]">100% Medical Sanitization</h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Every piece of rental jewellery undergoes ultrasonic bath cleansing and UV-C sterilization before dispatch.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EBDCD2]">
                  <h3 className="font-serif text-base font-bold text-[#3F1021]">Custom Fitting & Draping</h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Tailored oddiyanam adjustments, necklace extension doris, and crease-resistant Kanjeevaram pleat pre-setting.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EBDCD2]">
                  <h3 className="font-serif text-base font-bold text-[#3F1021]">Pre-Wedding Trials</h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Relaxed studio sessions to test hairstyles, foundations, and jewellery harmony well before the big day.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#8B2244] hover:text-[#54162C]"
                >
                  <span>Read More About Our Studio & Heritage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. CUSTOMER REVIEWS / TESTIMONIALS */}
      <section className="py-20 bg-white border-b border-[#F5EFE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block mb-2">
              WORDS OF LOVE FROM REAL BRIDES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#260A14]">
              Customer Reviews
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Over 2,400+ delighted brides celebrated their special moments with LUXORA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-[#FAF7F5] rounded-3xl p-6 border border-[#EBDCD2] flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#DFB76C] mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    &ldquo;{test.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8DCD5] flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D45B7D]/40">
                    <Image
                      src={test.avatar}
                      alt={test.brideName}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#260A14]">{test.brideName}</h3>
                    <p className="text-[10px] text-stone-500">{test.location}</p>
                    <p className="text-[10px] text-[#8B2244] font-medium">{test.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. APPOINTMENT BOOKING & JEWELLERY ENQUIRY FORM */}
      <section id="book" className="py-20 bg-gradient-to-b from-[#FAF7F5] to-[#F5EFE9] border-b border-[#E8DCD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block mb-2">
              SECURE YOUR SPECIAL DATE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#260A14]">
              Appointment Booking & Jewellery Enquiry
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              Fill in your wedding details below. Our senior stylists will reach out within 2 hours with customized looks, availability, and transparent pricing.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#EBDCD2]">
            {bookingSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-[#FFF1F2] rounded-full flex items-center justify-center mx-auto text-[#8B2244]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl text-[#3F1021]">Enquiry Successfully Submitted!</h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-stone-900">{bookingForm.name}</span>. Our bridal styling coordinator will contact you at <span className="font-bold text-stone-900">{bookingForm.phone}</span> to schedule your consultation and trial.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3 bg-[#25D366] text-white rounded-full text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Open in WhatsApp Now
                  </button>
                  <button
                    onClick={() => {
                      setBookingSuccess(false);
                      setBookingForm({
                        name: '',
                        phone: '',
                        email: '',
                        eventType: 'Wedding / Muhurtham',
                        eventDate: '',
                        service: 'Bridal Makeup & Jewellery Combo',
                        location: '',
                        notes: '',
                      });
                    }}
                    className="px-6 py-3 bg-stone-100 text-stone-800 rounded-full text-xs font-semibold"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {bookingError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    {bookingError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Customer Name <span className="text-[#D45B7D]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8B2244]"
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
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8B2244]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="bride@domain.com"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8B2244]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Event Type
                    </label>
                    <select
                      value={bookingForm.eventType}
                      onChange={(e) => setBookingForm({ ...bookingForm, eventType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8B2244] bg-white"
                    >
                      <option value="Wedding / Muhurtham">Wedding / Muhurtham</option>
                      <option value="Reception Banquet">Reception Banquet</option>
                      <option value="Engagement Ceremony">Engagement Ceremony</option>
                      <option value="Sangeet & Mehendi">Sangeet & Mehendi</option>
                      <option value="Jewellery Rental Only">Jewellery Rental Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Event Date <span className="text-[#D45B7D]">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingForm.eventDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, eventDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8B2244]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Makeup Service or Jewellery Selection
                    </label>
                    <select
                      value={bookingForm.service}
                      onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8B2244] bg-white"
                    >
                      <option value="Bridal Makeup & Jewellery Combo">Bridal Makeup & Jewellery Combo (25% Off)</option>
                      <option value="Bridal Makeup Only">Bridal Makeup Only (HD / Airbrush)</option>
                      <option value="Rental Jewellery Set Only">Rental Jewellery Set Only</option>
                      <option value="Classic Bridal Package">Classic Bridal Package</option>
                      <option value="Premium Bridal Package">Premium Bridal Package</option>
                      <option value="Luxury Royal Bridal Package">Luxury Royal Bridal Package</option>
                      <option value="Engagement & Reception Combo">Engagement & Reception Combo</option>
                      <option value="Saree Draping & Hair Styling Only">Saree Draping & Hair Styling Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Event Location (City / Venue)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chennai, Bangalore, Coimbatore"
                      value={bookingForm.location}
                      onChange={(e) => setBookingForm({ ...bookingForm, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8B2244]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Additional Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Specify jewellery style preferences, number of bridesmaids, or skin sensitivities..."
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8B2244] resize-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#3F1021] hover:bg-[#54162C] text-white font-serif text-sm tracking-wider uppercase rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    Submit Enquiry
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enquire on WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 14. CONTACT SECTION & STUDIO LOCATIONS */}
      <section id="contact" className="py-20 bg-white border-b border-[#F5EFE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B2244] block">
                GET IN TOUCH
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#260A14]">
                Visit Our Bridal Studios
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Step into our boutique studios for private jewellery trial sessions, custom draping previews, and face-to-face consultations with our senior bridal artists.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F5] border border-[#EBDCD2]">
                  <MapPin className="w-5 h-5 text-[#8B2244] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Studio Locations</h3>
                    <p className="text-xs text-stone-600 mt-1">
                      <strong>Chennai:</strong> 84, Heritage Boulevard, Usman Road, T. Nagar
                    </p>
                    <p className="text-xs text-stone-600 mt-0.5">
                      <strong>Bengaluru:</strong> 12, 100 Feet Road, HAL 2nd Stage, Indiranagar
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F5] border border-[#EBDCD2]">
                  <Phone className="w-5 h-5 text-[#8B2244] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Phone & WhatsApp</h3>
                    <p className="text-xs text-stone-600 mt-1">
                      Call Us: <span className="font-semibold text-stone-900">{BUSINESS_INFO.phone}</span>
                    </p>
                    <p className="text-xs text-stone-600 mt-0.5">
                      WhatsApp: <span className="font-semibold text-stone-900">+91 98765 43210</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF7F5] border border-[#EBDCD2]">
                  <Clock className="w-5 h-5 text-[#8B2244] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Studio Hours</h3>
                    <p className="text-xs text-stone-600 mt-1">
                      {BUSINESS_INFO.hours} (Appointments Recommended)
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="px-5 py-2.5 rounded-full bg-[#3F1021] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#54162C] transition-colors"
                >
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20LUXORA,%20I%20would%20like%20to%20visit%20your%20studio.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#20ba5a] transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Map Placeholder & Visual */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-[#EBDCD2] shadow-sm bg-stone-100 flex items-center justify-center">
                <Image
                  src="/images/combo-modern-elegant.jpg"
                  alt="Luxora Studio Interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 650px"
                />
                <div className="absolute inset-0 bg-[#260A14]/40 flex flex-col items-center justify-center text-white p-6 text-center">
                  <MapPin className="w-8 h-8 text-[#DFB76C] mb-2 animate-bounce" />
                  <h3 className="font-serif text-2xl font-bold">LUXORA Flagship Studio</h3>
                  <p className="text-xs text-stone-200 mt-1 max-w-sm">
                    Open 7 days a week for in-person bridal consultations, jewellery trial sets & drape fittings.
                  </p>
                  <span className="mt-3 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium border border-white/30">
                    Google Maps: 4.9 ★★★★★ (480+ Reviews)
                  </span>
                </div>
              </div>

              {/* Instagram handle preview */}
              <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#EBDCD2] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B2244] to-[#DFB76C] flex items-center justify-center text-white font-bold text-xs">
                    LX
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">@luxorabridal</span>
                    <span className="text-[11px] text-stone-500">125K followers • Daily bridal inspiration & real transformations</span>
                  </div>
                </div>
                <a
                  href={BUSINESS_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-medium transition-colors"
                >
                  Follow
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 15. STAY CONNECTED NEWSLETTER - Matching the reference image exactly */}
      <section className="bg-white py-12 border-b border-[#F5EFE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#260A14]">
                Stay Connected
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                Subscribe to get special bridal package offers, free giveaways, and once-in-a-lifetime deals.
              </p>
            </div>

            <div className="w-full max-w-md">
              {newsletterSubmitted ? (
                <div className="p-3 bg-[#FFF1F2] text-[#8B2244] text-xs font-semibold rounded-xl text-center border border-[#8B2244]/20">
                  ✓ Thank you for subscribing! Check your email for an exclusive voucher.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) setNewsletterSubmitted(true);
                  }}
                  className="flex items-center rounded-xl overflow-hidden border border-stone-300 shadow-xs focus-within:ring-2 focus-within:ring-[#3F1021]"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-3 text-xs sm:text-sm bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#3F1021] hover:bg-[#54162C] text-white font-serif text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Global Modals */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        preselectedService={selectedServiceForModal}
      />

    </div>
  );
}
