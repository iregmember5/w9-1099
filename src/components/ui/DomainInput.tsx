import React from 'react';

interface DomainInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const DomainInput: React.FC<DomainInputProps> = ({
  value,
  onChange,
  placeholder = "myawesomesite",
  className = ""
}) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
      />
      <div className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-600">
        .cms.com
      </div>
    </div>
  );
};