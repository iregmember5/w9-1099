import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 16, 
  className = "text-current" 
}) => {
  return (
    <Loader className={`animate-spin ${className}`} size={size} />
  );
};