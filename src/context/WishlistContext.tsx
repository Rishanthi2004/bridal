'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { JEWELLERY_PRODUCTS } from '@/data/siteData';
import { JewelleryItem } from '@/types';

interface WishlistContextType {
  wishlist: string[];
  wishlistCount: number;
  wishlistItems: JewelleryItem[];
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toastMessage: string | null;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'luxora_bridal_wishlist';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load wishlist from localStorage:', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when wishlist changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage:', e);
    }
  }, [wishlist, isHydrated]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  const toggleWishlist = (id: string) => {
    const product = JEWELLERY_PRODUCTS.find((p) => p.id === id);
    const title = product ? product.name : 'Item';

    if (wishlist.includes(id)) {
      setWishlist((prev) => prev.filter((item) => item !== id));
      showToast(`Removed "${title}" from wishlist`);
    } else {
      setWishlist((prev) => [...prev, id]);
      showToast(`Added "${title}" to your wishlist ❤️`);
    }
  };

  const removeFromWishlist = (id: string) => {
    const product = JEWELLERY_PRODUCTS.find((p) => p.id === id);
    setWishlist((prev) => prev.filter((item) => item !== id));
    if (product) {
      showToast(`Removed "${product.name}" from wishlist`);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared');
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const wishlistItems = JEWELLERY_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        wishlistItems,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isDrawerOpen,
        setIsDrawerOpen,
        openDrawer,
        closeDrawer,
        toastMessage,
      }}
    >
      {children}

      {/* Floating Wishlist Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#260A14] text-[#FAF7F5] px-4 py-2.5 rounded-full shadow-xl border border-[#D45B7D]/40 text-xs font-medium flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
