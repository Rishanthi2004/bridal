import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { BUSINESS_INFO } from '@/data/siteData';

export default function Footer() {
  return (
    <footer className="bg-[#260A14] text-[#FAF7F5] pt-16 pb-8 border-t border-[#3F1021] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#54162C] to-[#8B2244] flex items-center justify-center text-[#DFB76C]">
                <svg className="w-6 h-6 fill-current text-[#DFB76C]" viewBox="0 0 24 24">
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
              <div>
                <span className="font-serif text-2xl font-bold tracking-[0.2em] text-[#FAF7F5] block leading-none">
                  LUXORA
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#DFB76C] font-semibold uppercase">
                  Jewellery & Bridal Studio
                </span>
              </div>
            </Link>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Exquisite bridal makeup and curated rental jewellery crafted with passion, precision, and timeless elegance to make your wedding unforgettable.
            </p>

            {/* Social Icons matching reference */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href={BUSINESS_INFO.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#D45B7D] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a 
                href={BUSINESS_INFO.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#D45B7D] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.598 0 9 1.582 9 4.615V8z" />
                </svg>
              </a>
              <a 
                href={BUSINESS_INFO.pinterest} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#D45B7D] transition-colors"
                aria-label="Pinterest"
              >
                <span className="text-xs font-bold">P</span>
              </a>
              <a 
                href={BUSINESS_INFO.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#D45B7D] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/bridal-makeup" className="hover:text-white transition-colors">Bridal Makeup Services</Link>
              </li>
              <li>
                <Link href="/jewellery-rentals" className="hover:text-white transition-colors">Jewellery Rental Catalogue</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">Real Brides Gallery</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Our Studio</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact & Appointments</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold mb-4">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Track Order & Return</Link>
              </li>
              <li>
                <Link href="/jewellery-rentals" className="hover:text-white transition-colors">Doorstep Delivery Policy</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Security Deposit & Refund</Link>
              </li>
              <li>
                <Link href="/contact#faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Sanitization Protocol</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Custom Fitting & Trials</Link>
              </li>
            </ul>
          </div>

          {/* Information & Payment methods */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#DFB76C] font-semibold mb-4">
              INFORMATION
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300 mb-6">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Studio Story & Heritage</Link>
              </li>
              <li>
                <Link href="/contact#location" className="hover:text-white transition-colors">Store Locator (Chennai & BLR)</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Terms & Rental Conditions</Link>
              </li>
            </ul>

            <h5 className="text-[11px] uppercase tracking-wider text-[#DFB76C] font-semibold mb-2">
              WE ACCEPT
            </h5>
            {/* Payment badges matching reference */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2 py-1 bg-white text-[#1A1F71] font-bold text-[10px] rounded tracking-tighter">
                VISA
              </span>
              <span className="px-2 py-1 bg-[#222] text-[#EB001B] font-bold text-[10px] rounded tracking-tighter">
                Mastercard
              </span>
              <span className="px-2 py-1 bg-white text-[#2B3990] font-bold text-[10px] rounded tracking-tighter">
                RuPay
              </span>
              <span className="px-2 py-1 bg-[#3F1021] border border-white/20 text-[#00BAF2] font-bold text-[10px] rounded tracking-tighter">
                UPI
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-4">
          <p>© 2026 LUXORA Jewellery & Bridal Studio. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DFB76C]" />
              100% Sanitized & Hallmarked Guarantee
            </span>
            <span>Crafted with Indian Bridal Heritage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
