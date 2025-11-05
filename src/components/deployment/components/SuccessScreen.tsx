import React from 'react';
import { Check, ExternalLink } from 'lucide-react';

interface SuccessScreenProps {
  title: string;
  message: string;
  url: string;
  onAction: () => void;
  actionText: string;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  title,
  message,
  url,
  onAction,
  actionText
}) => {
  return (
    <div className="text-center py-8">
      <div className="inline-flex p-4 bg-green-100 rounded-full mb-6">
        <Check className="w-16 h-16 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <p className="text-gray-600 mb-8">
        {message}
      </p>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <p className="text-sm text-gray-600 mb-2">Your website URL:</p>
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl font-bold text-green-600 hover:text-green-700 flex items-center justify-center space-x-2"
        >
          <span>{url}</span>
          <ExternalLink className="w-6 h-6" />
        </a>
      </div>

      <button
        onClick={onAction}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-green-600 hover:to-emerald-700 transition"
      >
        {actionText}
      </button>
    </div>
  );
};