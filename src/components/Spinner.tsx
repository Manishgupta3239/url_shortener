import React from 'react';
import { Zap } from 'lucide-react';

const AuthSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Main spinner */}
      <div className="relative w-16 h-16">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin">
          <div className="absolute inset-1 bg-transparent rounded-full"></div>
        </div>

        {/* Middle rotating ring */}
        <div className="absolute inset-1 w-14 h-14 rounded-full border-4 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}>
          <div className="absolute inset-1 bg-transparent rounded-full"></div>
        </div>

        {/* Inner pulsing circle with logo */}
        <div className="absolute inset-2 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 backdrop-blur-xl border border-white/10 animate-pulse flex items-center justify-center">
          <Zap className="h-6 w-6 text-cyan-400 drop-shadow-lg" />
        </div>

        {/* Orbiting dots */}
        <div className="absolute inset-0 w-16 h-16 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthSpinner;