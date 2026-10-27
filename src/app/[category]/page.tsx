'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchProducts } from '@/lib/products';
import { ProductNormalized } from '@/types';

function CategoryContent() {
  const params = useParams();
  const categoryParam = params.category as string;
  const category = categoryParam?.replace(/-/g, ' ') || '';
  const [products, setProducts] = useState<ProductNormalized[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        const categoryLower = category.toLowerCase().trim();
        const filtered = data.filter(p => {
          const pCat = (p.category || '').toLowerCase().trim();
          // Map various category names
          if (categoryLower === 'sofas' || categoryLower === 'sofa') {
            return pCat === 'sofa' || pCat.includes('sofa');
          }
          if (categoryLower === 'beds' || categoryLower === 'bed') {
            return pCat === 'bed' || pCat.includes('bed');
          }
          if (categoryLower === 'dining' || categoryLower === 'table') {
            return pCat === 'table' || pCat.includes('table') || pCat.includes('dining') || pCat.includes('chair');
          }
          if (categoryLower === 'chairs' || categoryLower === 'chair') {
            return pCat === 'chair' || pCat.includes('chair') || pCat === 'stool';
          }
          if (categoryLower === 'storage') {
            return pCat === 'storage' || pCat === 'wardrobe' || pCat.includes('storage') || pCat.includes('shelf') || pCat.includes('rack') || pCat.includes('wardrobe');
          }
          // Exact match or contains
          return pCat === categoryLower || pCat.includes(categoryLower) || categoryLower.includes(pCat);
        });
        setProducts(filtered);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (category) {
      loadProducts();
    }
  }, [category]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-8">
      <nav className="flex items-center gap-2 text-sm text-secondary uppercase tracking-wider mb-4">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-primary capitalize">{category}</span>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl text-primary tracking-tight mb-8 capitalize">{category === 'sofa' ? 'Sofas' : category === 'bed' ? 'Beds' : category === 'table' ? 'Dining' : category === 'chair' ? 'Chairs' : category}</h1>

      {loading && (
        <div className="text-center py-12 text-secondary">Loading...</div>
      )}
      
      {error && (
        <div className="text-center py-12 text-error">{error}</div>
      )}
      
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-12 text-secondary">No products in this category.</div>
      )}
      
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="max-w-[1440px] mx-auto px-4 md:px-16 py-12 text-center text-secondary">Loading...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
