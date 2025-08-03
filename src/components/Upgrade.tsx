import React from 'react';
import { Zap, Crown, Lock, TrendingUp, BarChart3, Globe, Smartphone, X } from 'lucide-react';

const ProUpgradeModal = ({ onClose, onUpgrade }) => {
  const proFeatures = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Detailed insights and custom reports'
    },
    {
      icon: Globe,
      title: 'Custom Domains',
      description: 'Use your own branded short links'
    },
    {
      icon: TrendingUp,
      title: 'Unlimited Links',
      description: 'Create as many short links as you need'
    },
    {
      icon: Smartphone,
      title: 'API Access',
      description: 'Integrate with your apps and workflows'
    }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-md flex items-center justify-center z-50 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/3 rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Modal Container */}
      <div className="relative max-w-2xl w-full mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-purple-600/10 rounded-3xl blur-xl"></div>
        
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Lock className="h-16 w-16 text-amber-400 drop-shadow-lg" />
                <div className="absolute -top-2 -right-2">
                  <Crown className="h-8 w-8 text-yellow-400 drop-shadow-lg animate-bounce" />
                </div>
                <div className="absolute inset-0 h-16 w-16 bg-amber-400/20 rounded-full blur-2xl animate-pulse"></div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-3">
              Pro Feature Locked
            </h2>
            
            <p className="text-white/70 text-lg max-w-md mx-auto">
              This feature is exclusive to LinkSpark Pro users. Upgrade now to unlock advanced analytics and premium tools.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {proFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-white/10 flex-shrink-0">
                        <Icon className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                        <p className="text-sm text-white/60">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-full px-4 py-2 mb-4">
              <Crown className="h-5 w-5 text-amber-400" />
              <span className="text-amber-400 font-semibold">Limited Time Offer</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-white/60 text-2xl line-through">$19</span>
              <span className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">$9</span>
              <span className="text-white/70 text-xl">/month</span>
            </div>
            
            <p className="text-white/60 text-sm">
              50% off for the first 3 months
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onUpgrade}
              className="flex-1 relative group px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-2xl font-bold text-lg transition-all duration-300 ease-out hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <Crown className="h-5 w-5" />
                <span>Upgrade to Pro</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </button>
            
            <button
              onClick={onClose}
              className="flex-1 relative group px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-semibold text-lg transition-all duration-300 ease-out hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <span className="relative z-10">Maybe Later</span>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-6 mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <Zap className="h-4 w-4 text-green-400" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <Crown className="h-4 w-4 text-amber-400" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <Lock className="h-4 w-4 text-blue-400" />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProUpgradeModal;