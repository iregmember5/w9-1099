import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { isValidEmail } from '../../utils/validation';

interface SignupFormProps {
  onToggleMode: () => void;
}

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onToggleMode }) => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof SignupFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    if (apiError) setApiError('');
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
console.log('Current form data:', formData);
  console.log('firstName:', formData.firstName);
  console.log('lastName:', formData.lastName);
  console.log('email:', formData.email);
  console.log('password:', formData.password);
  console.log('confirmPassword:', formData.confirmPassword);
    try {
      console.log('🔧 Debug - Form data before sending:', formData); // Debug log
      
      // Call the actual signup API with all required data
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        companyName: '', // Optional field
        phoneNumber: '', // Optional field
        acceptTerms: formData.acceptTerms
      });
      
    } catch (error: any) {
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* API Error Display */}
      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{apiError}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={isLoading}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={isLoading}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="john@company.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password *
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Must be at least 8 characters with uppercase, lowercase, and number
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password *
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="acceptTerms"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleChange}
          disabled={isLoading}
          className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="acceptTerms" className="text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Privacy Policy
          </a>
          *
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="text-sm text-red-600">{errors.acceptTerms}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Creating Account...</span>
          </>
        ) : (
          <span>Create Account</span>
        )}
      </button>

      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
            disabled={isLoading}
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};