import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WishlistProvider } from "@/context/WishlistContext";
import WishlistDrawer from "@/components/WishlistDrawer";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUXORA | Premium Bridal Makeup & Rental Jewellery Boutique",
  description: "Exquisite bridal makeup, luxury jewellery rentals, traditional South Indian & contemporary North Indian bridal looks, bespoke wedding styling.",
  keywords: "bridal makeup, rental jewellery, wedding makeup artist, bridal jewellery rental, temple jewellery, kundan jewellery, reception makeup, saree draping",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAF7F5] text-[#2C1D21] font-sans antialiased selection:bg-[#57172E] selection:text-white pb-16 lg:pb-0">
        <WishlistProvider>
          <Suspense fallback={<div className="h-20 bg-white" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <WishlistDrawer />
        </WishlistProvider>
      </body>
    </html>
  );
}
