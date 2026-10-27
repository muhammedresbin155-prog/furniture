'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProducts } from '@/lib/products';
import { ProductNormalized } from '@/types';

export default function Home() {
  const [products, setProducts] = useState<ProductNormalized[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products from the catalog.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-16 py-12 border-b border-outline-variant">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-secondary-container/50 px-4 py-1 border border-outline-variant/60">
              <span className="w-1.5 h-1.5 bg-primary"></span>
              <span className="text-xs uppercase tracking-[0.2em] text-secondary">The 2025 Living Collection</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-primary leading-tight tracking-tight">
              Furniture That Feels Like Home
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-xl">
              Thoughtfully designed furniture for everyday living, crafted with sustainable solid timber, natural bouclé, and tactile stone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="h-12 px-8 bg-primary text-on-primary text-sm uppercase tracking-widest inline-flex items-center justify-center hover:bg-on-surface-variant transition-colors">
                SHOP COLLECTION
              </Link>
              <Link href="#categories" className="h-12 px-6 bg-surface-container-lowest text-primary text-sm uppercase tracking-widest inline-flex items-center justify-center gap-2 border border-outline-variant hover:border-primary transition-colors">
                <span>EXPLORE CATEGORIES</span>
                <span className="material-symbols-outlined text-lg">arrow_downward</span>
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] border border-outline-variant overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury living room"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="max-w-[1440px] mx-auto px-4 md:px-16 py-16 border-b border-outline-variant">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-secondary">Spatial Architectures</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary tracking-tight mt-1">Explore By Category</h2>
          </div>
          <Link href="/shop" className="text-sm uppercase tracking-wider text-secondary hover:text-primary transition-colors flex items-center gap-1 border-b border-outline pb-0.5 hover:border-primary">
            <span>FULL CATALOG</span>
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Sofas', path: '/sofas', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' },
            { name: 'Beds', path: '/beds', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80' },
            { name: 'Dining', path: '/dining', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80' },
            { name: 'Chairs', path: '/chairs', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80' },
            { name: 'Storage', path: '/storage', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80' },
            { name: 'All', path: '/shop', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
          ].map((cat) => (
            <Link key={cat.name} href={cat.path} className="group flex flex-col border border-outline-variant hover:border-primary transition-colors">
              <div className="aspect-[3/4] overflow-hidden bg-surface-container-low">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=800&q=80'; }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg text-primary">{cat.name}</h3>
                <span className="text-xs uppercase tracking-widest text-outline mt-2 inline-flex items-center gap-1 group-hover:text-primary">
                  Browse <span className="material-symbols-outlined text-xs">chevron_right</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products from API */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-16 py-16">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-secondary">Our Collection</span>
          <h2 className="font-display text-3xl md:text-4xl text-primary tracking-tight mt-1">Featured Pieces</h2>
        </div>
        
        {loading && (
          <div className="text-center py-12 text-secondary">Loading products...</div>
        )}
        
        {error && (
          <div className="text-center py-12 text-error">{error}</div>
        )}
        
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12 text-secondary">No products available.</div>
        )}
        
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col border border-outline-variant hover:border-primary transition-colors">
                <div className="aspect-[4/5] overflow-hidden bg-surface-container-low">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-secondary">No Image</div>
                  )}
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="text-xs uppercase tracking-wider text-secondary">{product.category}</div>
                  <h3 className="text-lg text-primary group-hover:text-secondary transition-colors">{product.name}</h3>
                  <div className="mt-auto pt-2 flex items-center justify-between">
                    {typeof product.price === 'number' ? (
                      <span className="text-sm font-medium text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                    ) : (
                      <span className="text-xs text-secondary">Price on request</span>
                    )}
                    <span className={`text-xs uppercase tracking-wider ${product.stock > 0 ? 'text-primary' : 'text-error'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <Link href="/shop" className="inline-flex items-center gap-2 h-12 px-8 border border-primary text-primary uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors">
            View All Products
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
