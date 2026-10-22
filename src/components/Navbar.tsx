'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  Search, 
  User, 
  Heart, 
  Menu, 
  X, 
  MapPin, 
  RotateCcw, 
  Calendar,
  Phone,
  MessageCircle,
  ShoppingBag,
  Home,
  Diamond
} from 'lucide-react';
import { BUSINESS_INFO } from '@/data/siteData';
import { useWishlist } from '@/context/WishlistContext';
import AppointmentModal from './AppointmentModal';

export default function Navbar() {
  const pathname = usePathname();
  const { wishlistCount, openDrawer } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'BRIDAL MAKEUP', href: '/bridal-makeup' },
    { name: 'RENTAL JEWELLERY', href: '/jewellery-rentals' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/jewellery-rentals?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Top Announcement Bar - hidden on mobile view */}
      <div className="hidden md:block bg-[#421122] text-[#FAF7F5] text-xs py-2 px-4 sm:px-8 border-b border-[#54162C]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left notice */}
          <div className="flex items-center gap-3 text-center md:text-left text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-stone-200">
              <ShoppingBag className="w-3.5 h-3.5 text-[#DFB76C]" />
              Free Shipping & Safe Doorstep Delivery
            </span>
            <span className="text-[#DFB76C]/40 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 text-stone-200 hidden sm:flex">
              <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
              Certified BIS Hallmarked & 100% Sanitized Jewellery
            </span>
          </div>

          {/* Right utility links */}
          <div className="flex items-center gap-5 text-[11px] sm:text-xs text-stone-300">
            <Link 
              href="/contact#location" 
              className="flex items-center gap-1 hover:text-[#DFB76C] transition-colors"
            >
              <MapPin className="w-3 h-3 text-[#DFB76C]" />
              <span className="hidden sm:inline">Studio Locator</span>
              <span className="sm:hidden">Studio</span>
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center gap-1 hover:text-[#DFB76C] transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-[#DFB76C]" />
              <span className="hidden sm:inline">Track Booking</span>
              <span className="sm:hidden">Track</span>
            </Link>
            <button 
              onClick={openDrawer} 
              className="flex items-center gap-1 hover:text-[#DFB76C] transition-colors cursor-pointer"
            >
              <Heart className="w-3 h-3 text-[#D45B7D] fill-current" />
              <span>Wishlist ({wishlistCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        className={`sticky top-0 z-40 bg-white transition-all duration-300 relative ${
          scrolled ? 'shadow-md py-2.5 sm:py-3' : 'py-3 sm:py-5 border-b border-[#F5EFE9]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-2">
          {/* Brand Logo - Luxury Floral Emblem + Serif Typography */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#3F1021] to-[#6D1C3A] flex items-center justify-center text-[#DFB76C] shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#DFB76C]" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="2.5" />
                <path d="M12 2C10.5 4.5 10.5 6.5 12 8C13.5 6.5 13.5 4.5 12 2Z" />
                <path d="M12 22C10.5 19.5 10.5 17.5 12 16C13.5 17.5 13.5 19.5 12 22Z" />
                <path d="M2 12C4.5 10.5 6.5 10.5 8 12C6.5 13.5 4.5 13.5 2 12Z" />
                <path d="M22 12C19.5 10.5 17.5 10.5 16 12C17.5 13.5 19.5 13.5 22 12Z" />
                <path d="M4.93 4.93C7.05 6.34 8.46 7.76 8.46 9.88C7.76 8.46 6.34 7.05 4.93 4.93Z" />
                <path d="M19.07 19.07C16.95 17.66 15.54 16.24 15.54 14.12C16.24 15.54 17.66 16.95 19.07 19.07Z" />
                <path d="M4.93 19.07C6.34 16.95 7.76 15.54 9.88 15.54C8.46 16.24 7.05 17.66 4.93 19.07Z" />
                <path d="M19.07 4.93C17.66 7.05 16.24 8.46 14.12 8.46C15.54 7.76 16.95 6.34 19.07 4.93Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-[0.16em] sm:tracking-[0.18em] text-[#3F1021] leading-none">
                LUXORA
              </span>
              <span className="text-[8px] sm:text-[10px] tracking-[0.22em] text-[#8B2244] font-semibold font-sans mt-0.5 uppercase">
                Bridal & Jewellery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs tracking-[0.12em] font-semibold transition-all relative py-1 ${
                    isActive 
                      ? 'text-[#8B2244]' 
                      : 'text-stone-700 hover:text-[#8B2244]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8B2244] rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Toggle */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 sm:p-2 text-stone-700 hover:text-[#8B2244] hover:bg-stone-50 rounded-full transition-colors cursor-pointer"
                aria-label="Search items"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Inline Search Bar Popup */}
              {searchOpen && (
                <div className="absolute right-0 top-12 w-72 sm:w-80 bg-white p-3 rounded-2xl shadow-xl border border-stone-200 z-50 animate-fade-in">
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search bridal set, choker, jhumkas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B2244]"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#8B2244] text-white text-xs rounded-lg hover:bg-[#6D1C3A]"
                    >
                      Search
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* User Account */}
            <Link
              href="/contact"
              className="p-2 text-stone-700 hover:text-[#8B2244] hover:bg-stone-50 rounded-full transition-colors hidden sm:block"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Button - Triggers Wishlist Drawer */}
            <button
              onClick={openDrawer}
              className="relative p-2 text-stone-700 hover:text-[#8B2244] hover:bg-stone-50 rounded-full transition-colors hidden sm:block cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-[#D45B7D] fill-current' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D45B7D] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-up">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Prominent Pink Book Appointment Button */}
            <button
              onClick={() => setIsAppointmentOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-[#D45B7D] hover:bg-[#B83D63] text-white font-medium text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden font-semibold">Book</span>
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 text-[#3F1021] bg-[#FAF7F5] border border-stone-200 hover:bg-[#FFF1F2] rounded-xl lg:hidden flex items-center gap-1 font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#8B2244]" />
              ) : (
                <Menu className="w-5 h-5 text-[#8B2244]" />
              )}
              <span className="hidden xs:inline text-[11px] text-stone-700">
                {mobileMenuOpen ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 w-full bg-white border-b border-stone-200 shadow-2xl px-6 py-6 z-50 animate-slide-down max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B2244] pb-1 border-b border-stone-100">
                Explore LUXORA
              </span>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm tracking-wider font-semibold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#FFF1F2] text-[#8B2244] font-bold'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#8B2244]" />}
                  </Link>
                );
              })}

              {/* Mobile Wishlist Access */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDrawer();
                }}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-stone-700 hover:bg-stone-50 font-semibold text-xs transition-colors cursor-pointer border border-stone-100"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#D45B7D] fill-current" />
                  <span>My Saved Wishlist</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FFF1F2] text-[#8B2244] font-bold text-[10px]">
                  {wishlistCount} items
                </span>
              </button>

              <div className="pt-4 border-t border-stone-100 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAppointmentOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#D45B7D] hover:bg-[#B83D63] text-white rounded-full font-medium text-xs tracking-wider uppercase shadow-sm transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Book Bridal Appointment
                </button>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20LUXORA,%20I%20would%20like%20to%20enquire%20about%20bridal%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full font-medium text-xs tracking-wider uppercase shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enquire on WhatsApp
                </a>

                <div className="flex justify-around pt-3 text-[11px] text-stone-500 border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#8B2244]" />
                    {BUSINESS_INFO.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8B2244]" />
                    T. Nagar & Indiranagar
                  </span>
                </div>
              </div>
            </nav>
          </div>
        )}

        {/* Backdrop overlay for mobile drawer */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-2xs"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </header>

      {/* Luxury Sticky Mobile Bottom Menu Bar (Always Accessible for Mobile Users) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 py-1.5 px-3 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors ${
            pathname === '/' ? 'text-[#8B2244] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          href="/bridal-makeup"
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors ${
            pathname === '/bridal-makeup' ? 'text-[#8B2244] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Makeup</span>
        </Link>

        <Link
          href="/jewellery-rentals"
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors ${
            pathname === '/jewellery-rentals' ? 'text-[#8B2244] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Diamond className="w-5 h-5" />
          <span>Jewellery</span>
        </Link>

        {/* Wishlist Button in Bottom Bar */}
        <button
          onClick={openDrawer}
          className="relative flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-[10px] font-semibold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-[#D45B7D] fill-current' : ''}`} />
          <span>Wishlist</span>
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 bg-[#D45B7D] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-[10px] font-semibold transition-colors cursor-pointer ${
            mobileMenuOpen ? 'text-[#8B2244] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span>Menu</span>
        </button>
      </nav>

      {/* Global Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />
    </>
  );
}
