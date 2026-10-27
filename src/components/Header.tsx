'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant">
      {/* Announcement Bar */}
      <div className="w-full bg-secondary-container/60 border-b border-outline-variant">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-1 flex items-center justify-between text-xs text-on-secondary-container tracking-wider uppercase">
          <div className="flex items-center gap-2 mx-auto md:mx-0">
            <span>COMPLIMENTARY WHITE-GLOVE DELIVERY ON ORDERS OVER ₹2,00,000</span>
            <span className="text-outline hidden sm:inline">·</span>
            <span className="text-secondary hidden sm:inline">MON–SAT 10:00–19:00 IST</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-secondary">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-primary"></span>
              ATELIER STATUS: OPEN
            </span>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="h-20 w-full">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16 h-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-8 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-headline text-xl text-primary tracking-tight font-medium uppercase group-hover:text-secondary transition-colors">
                HAVEN ATELIER
              </span>
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="py-2 uppercase tracking-wider text-sm text-primary font-medium border-b-2 border-primary">
                Home
              </Link>
              <Link href="/shop" className="py-2 text-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors">
                Shop All
              </Link>
              <Link href="/sofas" className="py-2 text-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors">
                Sofas
              </Link>
              <Link href="/beds" className="py-2 text-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors">
                Beds
              </Link>
              <Link href="/dining" className="py-2 text-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors">
                Dining
              </Link>
              <Link href="/chairs" className="py-2 text-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors">
                Chairs
              </Link>
              <Link href="/storage" className="py-2 text-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors">
                Storage
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/cart" className="flex items-center gap-2 py-2 px-4 border border-outline-variant bg-surface-container-lowest hover:border-primary transition-colors">
              <div className="relative">
                <span className="material-symbols-outlined text-xl text-primary">shopping_bag</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-on-primary text-xs flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-secondary leading-none">Bag</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
