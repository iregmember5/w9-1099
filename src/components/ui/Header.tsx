import React from 'react';
import { Globe } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-2">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Multi-Tenant CMS</h1>
              <p className="text-sm text-gray-600">Welcome, {user?.firstName}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};