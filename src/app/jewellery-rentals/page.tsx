'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Heart, 
  Eye, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  ArrowUpDown, 
  RotateCcw,
  Diamond
} from 'lucide-react';
import { JEWELLERY_PRODUCTS, BUSINESS_INFO } from '@/data/siteData';
import { useWishlist } from '@/context/WishlistContext';

export default function JewelleryRentalsPage() {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const categories = [
    'All',
    'Bridal Sets',
    'Temple Jewellery',
    'Antique Gold',
    'Kundan & Polki',
    'Necklace Sets',
    'Earrings & Jhumkas',
    'Rings',
    'Bracelets & Bangles',
    'Pendants & Maang Tikka',
    'Waist Belts (Oddiyanam)',
  ];

  const filteredItems = useMemo(() => {
    return JEWELLERY_PRODUCTS.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = item.rentalPrice <= maxPrice;
      return matchCat && matchSearch && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.rentalPrice - b.rentalPrice;
      if (sortBy === 'price-high') return b.rentalPrice - a.rentalPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy, maxPrice]);

  return (
    <div className="bg-[#FAF7F5] min-h-screen text-[#2C1D21] font-sans">
      
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#260A14] via-[#3F1021] to-[#54162C] text-white py-14 px-4 sm:px-8 border-b border-[#DFB76C]/30">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#DFB76C] text-xs font-semibold tracking-widest uppercase">
            <Diamond className="w-3.5 h-3.5" />
            MUSEUM-GRADE BRIDAL VAULT
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal">
            Rental Jewellery Collection
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Elevate your wedding day look with certified BIS hallmarked Temple, Antique, Kundan, and Diamond jewellery sets. 100% sanitized with insured doorstep delivery.
          </p>

          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-stone-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#DFB76C]" />
              UV-C Medical Sterilization
            </span>
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-[#DFB76C]" />
              100% Refundable Security Deposit
            </span>
          </div>
        </div>
      </section>

      {/* Main Catalogue Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar Filter (Desktop) */}
          <aside className="lg:col-span-1 space-y-6 bg-white p-6 rounded-3xl border border-[#EBDCD2] shadow-xs h-fit">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h2 className="font-serif text-lg font-bold text-[#260A14] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#8B2244]" />
                Filters
              </h2>
              {(selectedCategory !== 'All' || searchQuery !== '' || maxPrice < 10000) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setMaxPrice(10000);
                  }}
                  className="text-[11px] text-[#8B2244] font-semibold hover:underline"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-stone-700 mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-[#FFF1F2] text-[#8B2244] font-bold'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#8B2244]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs uppercase font-bold tracking-wider text-stone-700">
                  Max Rental Price
                </h3>
                <span className="text-xs font-bold text-[#8B2244]">
                  ₹ {maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#8B2244] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>₹ 1,000</span>
                <span>₹ 10,000+</span>
              </div>
            </div>

            {/* Assistance banner */}
            <div className="pt-4 border-t border-stone-100 bg-[#FAF7F5] p-4 rounded-2xl text-center space-y-2">
              <p className="text-xs font-serif font-bold text-[#3F1021]">Need Custom Styling?</p>
              <p className="text-[11px] text-stone-600">Send us a photo of your bridal saree or lehenga for matched recommendations.</p>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20LUXORA,%20I%20need%20help%20matching%20jewellery%20to%20my%20saree.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#25D366] font-bold hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Ask a Stylist
              </a>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Search and Sort Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-[#EBDCD2] flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search necklace, choker, haram..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#FAF7F5] border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#8B2244]"
                />
              </div>

              {/* Sort by selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs text-stone-500 whitespace-nowrap">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-[#FAF7F5] border border-stone-200 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B2244]"
                >
                  <option value="popular">Bestsellers & Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Results counter */}
            <div className="flex items-center justify-between text-xs text-stone-500 px-1">
              <span>Showing {filteredItems.length} jewellery pieces</span>
              <span>Standard 3-Day Rental Window</span>
            </div>

            {/* Product Cards Grid */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 space-y-3">
                <p className="font-serif text-xl text-stone-700">No matching jewellery pieces found.</p>
                <p className="text-xs text-stone-500">Try adjusting your filters or search keywords.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setMaxPrice(10000);
                  }}
                  className="px-5 py-2 bg-[#8B2244] text-white text-xs font-semibold rounded-full mt-2"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => {
                  const isWishlisted = isInWishlist(item.id);
                  return (
                    <div
                      key={item.id}
                      className="group bg-white rounded-3xl overflow-hidden border border-[#EBDCD2] hover:border-[#D45B7D] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Image & Wishlist Button */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F5]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 1024px) 50vw, 33vw"
                          />

                          <button
                            onClick={() => toggleWishlist(item.id)}
                            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              isWishlisted 
                                ? 'bg-[#D45B7D] text-white shadow-md' 
                                : 'bg-white/90 text-stone-500 hover:text-[#D45B7D] hover:bg-white shadow-sm'
                            }`}
                            aria-label="Wishlist"
                          >
                            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                          </button>

                          <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/95 text-[10px] font-bold text-[#8B2244] uppercase tracking-wider">
                            {item.category}
                          </span>

                          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#260A14]/80 text-white text-[10px] font-medium backdrop-blur-xs">
                            {item.availability}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="p-5">
                          <h3 className="font-serif text-base font-bold text-[#260A14] group-hover:text-[#8B2244] transition-colors leading-snug line-clamp-1">
                            {item.name}
                          </h3>

                          <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>

                          {/* Security deposit & duration */}
                          <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 pb-2 border-b border-stone-100">
                            <span>Duration: <strong>{item.duration}</strong></span>
                            <span>Deposit: <strong>₹{item.securityDeposit}</strong></span>
                          </div>

                          {/* Price */}
                          <div className="mt-3 flex items-baseline justify-between">
                            <div>
                              <span className="text-[10px] text-stone-400 block uppercase">Rental Rate</span>
                              <span className="font-serif text-xl font-bold text-[#260A14]">
                                ₹ {item.rentalPrice.toLocaleString('en-IN')}
                              </span>
                            </div>

                            <div className="text-right">
                              <span className="text-[10px] text-stone-400 block uppercase">Retail Value</span>
                              <span className="text-xs text-stone-400 line-through">
                                ₹ {item.retailValue.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons matching reference */}
                      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                        <Link
                          href={`/jewellery-rentals/${item.id}`}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FAF7F5] border border-stone-200 text-stone-800 hover:bg-stone-100 text-xs font-semibold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Details
                        </Link>

                        <a
                          href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20LUXORA,%20I%20would%20like%20to%20rent%20the%20${encodeURIComponent(item.name)}%20(₹${item.rentalPrice})%20for%20my%20wedding.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a] text-xs font-semibold transition-colors shadow-2xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Enquire
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </section>

    </div>
  );
}
