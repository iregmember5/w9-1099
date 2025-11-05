import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { DeploymentOption } from '../../../types/auth';

interface DeploymentCardProps {
  option: DeploymentOption;
  onSelect: (id: string) => void;
}

export const DeploymentCard: React.FC<DeploymentCardProps> = ({ option, onSelect }) => {
  const Icon = option.icon;

  return (
    <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${option.borderColor} overflow-hidden`}>
      {option.badge && (
        <div className="absolute top-4 right-4">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {option.badge}
          </span>
        </div>
      )}

      <div className={`${option.bgColor} p-6`}>
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${option.color} mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{option.title}</h3>
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {option.price}
        </div>
        <p className="text-gray-600">{option.description}</p>
      </div>

      <div className="p-6">
        <ul className="space-y-3 mb-6">
          {option.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onSelect(option.id)}
          className={`w-full bg-gradient-to-r ${option.color} text-white font-semibold py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105 flex items-center justify-center space-x-2`}
        >
          <span>{option.buttonText}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};