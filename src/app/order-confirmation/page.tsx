import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-12 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 mx-auto bg-primary text-on-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl">check</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-primary tracking-tight">Order Confirmed</h1>
        <p className="text-secondary">
          Thank you for your order. We have received your order details.
        </p>
        <p className="text-xs text-secondary">
          Note: Orders are submitted to the Google Sheets backend as configured.
        </p>
        <Link href="/shop" className="inline-flex h-12 px-8 bg-primary text-on-primary items-center justify-center uppercase tracking-widest hover:bg-on-surface-variant transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
