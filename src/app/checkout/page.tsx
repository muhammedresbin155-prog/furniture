'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { submitOrder } from '@/lib/products';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-12 text-center">
        <h1 className="font-display text-3xl text-primary mb-4">Your Cart is Empty</h1>
        <Link href="/shop" className="text-primary underline">Return to Shop</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.phoneNumber.trim()) {
      setError('Please provide name and phone number');
      return;
    }

    setSubmitting(true);

    try {
      for (const item of items) {
        try {
          await submitOrder({
            'product id': item.productId,
            quantity: item.quantity,
            price: typeof item.price === 'number' ? item.price : 0,
            'phone number': formData.phoneNumber.trim(),
            name: formData.name.trim(),
          });
        } catch (e) {
          // Continue with other items
          console.error('Item submission error:', e);
        }
      }
      
      clearCart();
      router.push('/order-confirmation');
    } catch (err: any) {
      // Still proceed to confirmation if items were attempted
      clearCart();
      router.push('/order-confirmation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-8">
      <nav className="flex items-center gap-2 text-sm text-secondary uppercase tracking-wider mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-primary">Cart</Link>
        <span>/</span>
        <span className="text-primary">Checkout</span>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl text-primary tracking-tight mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border border-outline-variant p-6 space-y-4">
              <h2 className="text-lg uppercase tracking-wider text-primary pb-4 border-b border-outline-variant">Customer Information</h2>
              
              <div>
                <label className="block text-sm uppercase tracking-wider text-secondary mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm uppercase tracking-wider text-secondary mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm uppercase tracking-wider text-secondary mb-2">Shipping Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-error-container text-on-error-container text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 bg-primary text-on-primary uppercase tracking-widest hover:bg-on-surface-variant transition-colors disabled:bg-outline disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Place Order'}
            </button>

            <p className="text-xs text-secondary">
              By placing your order, you agree to our terms. Note: Prices are not configured in the current system.
            </p>
          </form>
        </div>

        <div className="lg:col-span-5">
          <div className="border border-outline-variant p-6 sticky top-32">
            <h2 className="text-lg uppercase tracking-wider text-primary mb-6 pb-4 border-b border-outline-variant">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="w-16 h-20 bg-surface-container-low overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&q=80'; }} />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm text-primary mb-1">{item.name}</h3>
                    <p className="text-xs text-secondary">Qty: {item.quantity}</p>
                    {typeof item.price === 'number' && (
                      <p className="text-xs text-primary">₹{item.price.toLocaleString('en-IN')}</p>
                    )}
                    <p className="text-xs text-secondary">ID: {item.productId}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-outline-variant">
              <p className="text-xs text-secondary">
                {items.every(i => typeof i.price === 'number') 
                  ? 'Prices from Google Sheets catalog.' 
                  : 'Some items may use price 0 if not configured.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
