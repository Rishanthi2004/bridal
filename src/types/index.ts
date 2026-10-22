export interface Service {
  id: string;
  name: string;
  category: 'makeup' | 'styling' | 'prep';
  shortDesc: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  features: string[];
}

export interface BridalPackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  popular?: boolean;
  image: string;
  inclusions: string[];
  duration: string;
  idealFor: string;
}

export interface JewelleryItem {
  id: string;
  name: string;
  category: 'Bridal Sets' | 'Temple Jewellery' | 'Antique Gold' | 'Kundan & Polki' | 'Necklace Sets' | 'Earrings & Jhumkas' | 'Rings' | 'Bracelets & Bangles' | 'Pendants & Maang Tikka' | 'Waist Belts (Oddiyanam)';
  rentalPrice: number; // 3-day rental in ₹
  retailValue: number;
  securityDeposit: number;
  duration: string; // e.g. "3 Days Rental"
  availability: 'Available' | 'Reserved' | 'Few Left';
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImages?: string[];
  description: string;
  specifications: {
    material: string;
    plating: string;
    stones: string;
    weight: string;
    careInstructions: string;
  };
  includes: string[];
  bestseller?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'South Indian' | 'North Indian' | 'Hairstyles' | 'Jewellery Close-ups' | 'Reception & Glam';
  image: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  brideName: string;
  weddingDate: string;
  location: string;
  avatar: string;
  rating: number;
  service: string;
  comment: string;
}
