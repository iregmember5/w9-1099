import React from 'react';
import { Shield, Server, Rocket } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <Shield className="w-12 h-12 text-indigo-600 mb-3" />
          <h4 className="font-bold text-gray-900 mb-2">Secure & Reliable</h4>
          <p className="text-gray-600 text-sm">Enterprise-grade security with automatic SSL</p>
        </div>
        <div className="flex flex-col items-center">
          <Server className="w-12 h-12 text-indigo-600 mb-3" />
          <h4 className="font-bold text-gray-900 mb-2">99.9% Uptime</h4>
          <p className="text-gray-600 text-sm">Hosted on premium infrastructure</p>
        </div>
        <div className="flex flex-col items-center">
          <Rocket className="w-12 h-12 text-indigo-600 mb-3" />
          <h4 className="font-bold text-gray-900 mb-2">Lightning Fast</h4>
          <p className="text-gray-600 text-sm">Deploy your site in under 60 seconds</p>
        </div>
      </div>
    </div>
  );
};