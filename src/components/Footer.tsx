import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-headline text-xl text-primary tracking-tight font-medium uppercase">
                HAVEN ATELIER
              </span>
            </div>
            <p className="text-sm text-secondary leading-relaxed max-w-sm">
              HAVEN Atelier creates timeless furniture grounded in architectural clarity, natural materials, and master craft.
            </p>
            <div className="pt-4 text-sm text-secondary">
              © 2025 HAVEN Atelier Inc. All rights reserved.
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-primary font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="text-secondary hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link href="/sofas" className="text-secondary hover:text-primary transition-colors">Sofas</Link></li>
              <li><Link href="/beds" className="text-secondary hover:text-primary transition-colors">Beds</Link></li>
              <li><Link href="/dining" className="text-secondary hover:text-primary transition-colors">Dining</Link></li>
              <li><Link href="/chairs" className="text-secondary hover:text-primary transition-colors">Chairs</Link></li>
              <li><Link href="/storage" className="text-secondary hover:text-primary transition-colors">Storage</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-primary font-semibold">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">White-Glove Delivery</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Material Swatches</a></li>
              <li><a href="#" className="text-secondary hover:text-primary transition-colors">Care & Maintenance</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-primary font-semibold">Studio</h4>
            <p className="text-sm text-secondary">
              Copenhagen • New York • Milan • Tokyo
            </p>
            <div className="pt-2 space-y-1">
              <span className="text-xs uppercase tracking-widest text-outline block">Business Inquiries</span>
              <p className="text-sm text-secondary">atelier@havenliving.design</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
