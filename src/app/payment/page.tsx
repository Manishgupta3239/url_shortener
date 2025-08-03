'use client';

import { useEffect } from 'react';
import { Crown, Lock, TrendingUp, BarChart3, Globe, Smartphone } from 'lucide-react';

export default function PaymentPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const createOrder = async () => {
    const res = await fetch('/api/razorpay/order', {
      method: 'POST',
      body: JSON.stringify({ amount: 100 }),
    });

    return res.json();
  };

  const openRazorpay = async () => {
    const order = await createOrder();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: 'INR',
      name: 'LinkSpark Premium',
      description: 'Upgrade to Pro Plan',
      order_id: order.id,
      handler: async function (response) {
        const verifyRes = await fetch('/api/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(response),
        });

        const result = await verifyRes.json();
        if (result.success) window.location.href='/dashboard';
        else alert('❌ Payment Verification Failed');
      },
      theme: {
        color: '#f59e0b',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const proFeatures = [
    { icon: BarChart3, title: 'Advanced Analytics' },
    { icon: Globe, title: 'Custom Domains' },
    { icon: TrendingUp, title: 'Unlimited Links' },
    { icon: Smartphone, title: 'API Access' },
  ];

  return (
    <div className="w-full flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-[calc(100vh-66px)]">
      <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-xl">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center mb-2">
            <div className="relative">
              <Lock className="h-10 w-10 text-amber-400" />
              <div className="absolute -top-1 -right-1">
                <Crown className="h-5 w-5 text-yellow-400 animate-bounce" />
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Pro Feature Locked
          </h2>
          <p className="text-white/70 text-sm mt-1">
            This feature is exclusive to Pro users. Upgrade now to unlock it!
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {proFeatures.map(({ icon: Icon, title }, i) => (
            <div key={i} className="flex items-center space-x-2 text-white/80 text-sm">
              <Icon className="h-4 w-4 text-cyan-400" />
              <span>{title}</span>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="text-center mb-4">
          <span className="text-amber-400 font-semibold text-sm">Now only ₹100 (one-time)</span>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={openRazorpay}
            className="w-full px-5 py-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold rounded-xl hover:scale-[1.02] transition"
          >
            Pay & Upgrade to Pro
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-white/40 mt-4 text-center">100% secure payment via Razorpay</p>
      </div>
    </div>
  );
}
