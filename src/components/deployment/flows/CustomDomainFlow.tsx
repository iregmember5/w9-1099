import React, { useState } from 'react';
import { ArrowRight, Globe, Check, ExternalLink } from 'lucide-react';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
interface CustomDomainFlowProps {
  onBack: () => void;
}

export const CustomDomainFlow: React.FC<CustomDomainFlowProps> = ({ onBack }) => {
  const [domain, setDomain] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [step, setStep] = useState<'input' | 'instructions' | 'verifying' | 'success'>('input');

  const handleCheckDomain = () => {
    if (!domain) return;
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setStep('instructions');
    }, 2000);
  };

  const handleVerify = () => {
    setStep('verifying');
    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-900 mb-6 flex items-center">
          <ArrowRight className="w-5 h-5 mr-2 transform rotate-180" />
          Back to options
        </button>

        {step === 'input' && (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
                <Globe className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Connect Your Domain
              </h2>
              <p className="text-gray-600">
                Enter your domain name to get started
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Domain Name
                </label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value.toLowerCase())}
                  placeholder="school.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleCheckDomain}
                disabled={!domain || isChecking}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition transform hover:scale-105 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isChecking ? (
                  <>
                    <LoadingSpinner />
                    <span>Checking domain...</span>
                  </>
                ) : (
                  <span>Continue</span>
                )}
              </button>
            </div>
          </>
        )}

        {step === 'instructions' && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                DNS Configuration
              </h2>
              <p className="text-gray-600">
                Add these DNS records to your domain registrar
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">A Record</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Type:</p>
                    <p className="font-mono font-semibold">A</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Name:</p>
                    <p className="font-mono font-semibold">@</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Value:</p>
                    <p className="font-mono font-semibold">185.199.108.153</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">CNAME Record</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Type:</p>
                    <p className="font-mono font-semibold">CNAME</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Name:</p>
                    <p className="font-mono font-semibold">www</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Value:</p>
                    <p className="font-mono font-semibold">cms-platform.com</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleVerify}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition transform hover:scale-105"
            >
              I've Added the Records - Verify Now
            </button>
          </>
        )}

        {step === 'verifying' && (
          <div className="text-center py-12">
            <LoadingSpinner size={64} className="text-blue-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying DNS Records
            </h3>
            <p className="text-gray-600">
              This may take a few moments...
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <div className="inline-flex p-4 bg-blue-100 rounded-full mb-6">
              <Check className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 Domain Connected!
            </h2>
            <p className="text-gray-600 mb-8">
              Your website is now live at {domain}
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <a 
                href={`https://${domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center space-x-2"
              >
                <span>https://{domain}</span>
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>

            <button
              onClick={onBack}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition"
            >
              Manage Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};