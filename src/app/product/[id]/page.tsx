'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchProducts } from '@/lib/products';
import { ProductNormalized } from '@/types';
import { useCart } from '@/context/CartContext';

function ProductContent() {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<ProductNormalized | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const products = await fetchProducts();
        const found = products.find(p => p.id === productId);
        if (found) {
          setProduct(found);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.stock <= 0) return;
    
    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      category: product.category,
      quantity: quantity,
      image: product.image,
      stock: product.stock,
      price: product.price,
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-12 text-center text-secondary">
        Loading...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-12 text-center">
        <p className="text-error mb-4">{error || 'Product not found'}</p>
        <Link href="/shop" className="text-primary underline">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-8">
      <nav className="flex items-center gap-2 text-sm text-secondary uppercase tracking-wider mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-primary">Shop</Link>
        <span>/</span>
        <span className="text-primary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square border border-outline-variant overflow-hidden bg-surface-container-low">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'; }} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-secondary">No Image</div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-sm uppercase tracking-wider text-secondary mb-2">{product.category}</div>
            <h1 className="font-display text-3xl md:text-4xl text-primary tracking-tight mb-4">{product.name}</h1>
          </div>

          <div>
            <span className={`text-sm uppercase tracking-wider ${product.stock > 0 ? 'text-primary' : 'text-error'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>

          <div className="border-t border-outline-variant pt-6">
            {typeof product.price === 'number' && (
              <div className="mb-6">
                <span className="text-2xl font-medium text-primary">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm uppercase tracking-wider text-secondary mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 border border-outline-variant hover:border-primary disabled:opacity-40"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 border border-outline-variant hover:border-primary disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="w-full h-12 bg-primary text-on-primary uppercase tracking-widest hover:bg-on-surface-variant transition-colors disabled:bg-outline disabled:cursor-not-allowed"
            >
              {added ? 'Added to Cart!' : product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            {!product.price && (
              <p className="text-xs text-error mt-3">
                Price not available from the current Google Sheets schema. Add a price column to display prices.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="max-w-[1440px] mx-auto px-4 md:px-16 py-12 text-center text-secondary">Loading...</div>}>
      <ProductContent />
    </Suspense>
  );
}
