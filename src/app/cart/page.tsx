'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
  const total = getCartTotal();
  const count = getCartCount();

  if (items.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-12 text-center">
        <h1 className="font-display text-3xl text-primary mb-4">Your Cart is Empty</h1>
        <p className="text-secondary mb-8">Discover furniture that makes your space feel like home.</p>
        <Link href="/shop" className="inline-flex h-12 px-8 bg-primary text-on-primary items-center justify-center uppercase tracking-widest hover:bg-on-surface-variant transition-colors">
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <nav className="flex items-center gap-2 text-sm text-secondary uppercase tracking-wider mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-primary">Your Cart</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl text-primary tracking-tight">Your Cart</h1>
          <p className="text-secondary mt-2">{count} {count === 1 ? 'Item' : 'Items'} in Cart</p>
        </div>
        <button onClick={clearCart} className="text-sm uppercase tracking-wider text-secondary hover:text-error transition-colors">
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex flex-col sm:flex-row gap-4 p-4 border border-outline-variant">
              <div className="w-full sm:w-32 h-40 bg-surface-container-low overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80'; }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-secondary text-xs">No Image</div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-secondary mb-1">{item.category}</div>
                  <h3 className="text-lg text-primary mb-2">{item.name}</h3>
                  <p className="text-xs text-secondary">Product ID: {item.productId}</p>
                  {typeof item.price === 'number' && (
                    <p className="text-sm text-primary mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 border border-outline-variant hover:border-primary"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="w-8 h-8 border border-outline-variant hover:border-primary disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.productId)} className="text-sm text-secondary hover:text-error">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="border border-outline-variant p-6 sticky top-32">
            <h2 className="text-lg uppercase tracking-wider text-primary mb-6 pb-4 border-b border-outline-variant">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-secondary">
                <span>Items ({count})</span>
                <span>{total > 0 ? `₹${total.toLocaleString('en-IN')}` : (items.some(i => typeof i.price === 'number') ? 'N/A' : 'Price not available')}</span>
              </div>
            </div>
            <div className="pt-4 border-t border-outline-variant mb-6">
              <div className="flex justify-between text-sm text-primary font-medium mb-2">
                <span>Total</span>
                <span>{total > 0 ? `₹${total.toLocaleString('en-IN')}` : '—'}</span>
              </div>
              <p className="text-xs text-secondary">
                {items.some(i => typeof i.price === 'number') 
                  ? 'Prices displayed from Google Sheets catalog.' 
                  : 'Prices not available from the current Google Sheets schema.'}
              </p>
            </div>
            <Link href="/checkout" className="w-full h-12 bg-primary text-on-primary flex items-center justify-center uppercase tracking-widest hover:bg-on-surface-variant transition-colors mb-4">
              Proceed to Checkout
            </Link>
            <Link href="/shop" className="w-full h-12 border border-outline-variant text-primary flex items-center justify-center uppercase tracking-widest hover:border-primary transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
