'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProducts } from '@/lib/products';
import { ProductNormalized } from '@/types';

export default function ShopPage() {
  const [products, setProducts] = useState<ProductNormalized[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductNormalized[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to load products from the catalog.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let result = products;
    
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm]);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-8">
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-secondary uppercase tracking-wider mb-4">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary">Shop All</span>
        </nav>
        <h1 className="font-display text-3xl md:text-4xl text-primary tracking-tight mb-2">Shop All Furniture</h1>
        <p className="text-secondary">Explore our collection of timeless architectural furniture</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-primary"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-primary"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="text-center py-12 text-secondary">Loading products...</div>
      )}
      
      {error && (
        <div className="text-center py-12 text-error">{error}</div>
      )}
      
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-12 text-secondary">No products found.</div>
      )}
      
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
