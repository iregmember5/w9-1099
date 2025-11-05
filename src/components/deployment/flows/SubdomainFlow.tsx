import React, { useState } from 'react';
import { ArrowRight, Zap, Rocket, Check, ExternalLink } from 'lucide-react';
import { useDeployment } from '../../../hooks/useDeployment';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { DomainInput } from '../../ui/DomainInput';
import { sanitizeSubdomain, generateSubdomainUrl } from '../../../utils/domainUtils';

interface SubdomainFlowProps {
  onBack: () => void;
}

export const SubdomainFlow: React.FC<SubdomainFlowProps> = ({ onBack }) => {
  const [subdomain, setSubdomain] = useState('');
  const { isDeploying, isDeployed, simulateDeployment } = useDeployment();
  const [deployedUrl, setDeployedUrl] = useState('');

  const handleDeploy = async () => {
    if (!subdomain) return;
    
    const url = generateSubdomainUrl(subdomain);
    setDeployedUrl(url);
    await simulateDeployment(3000);
  };

  const handleSubdomainChange = (value: string) => {
    setSubdomain(sanitizeSubdomain(value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-900 mb-6 flex items-center">
          <ArrowRight className="w-5 h-5 mr-2 transform rotate-180" />
          Back to options
        </button>

        {!isDeployed ? (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4">
                <Zap className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Your Free Subdomain
              </h2>
              <p className="text-gray-600">
                Choose a unique subdomain and deploy instantly
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Your Subdomain
                </label>
                <DomainInput
                  value={subdomain}
                  onChange={handleSubdomainChange}
                  placeholder="myawesomesite"
                />
                {subdomain && (
                  <p className="mt-2 text-sm text-gray-600">
                    Your site will be available at: <span className="font-semibold text-green-600">
                      {subdomain}.cms.com
                    </span>
                  </p>
                )}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
                <ul className="space-y-2">
                  {['Instant deployment', 'Free SSL certificate', 'Unlimited bandwidth', 'No credit card required'].map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleDeploy}
                disabled={!subdomain || isDeploying}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isDeploying ? (
                  <>
                    <LoadingSpinner />
                    <span>Deploying...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    <span>Deploy Now - Free</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex p-4 bg-green-100 rounded-full mb-6">
              <Check className="w-16 h-16 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 Deployment Successful!
            </h2>
            <p className="text-gray-600 mb-8">
              Your website is now live and accessible
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Your website URL:</p>
              <a 
                href={deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold text-green-600 hover:text-green-700 flex items-center justify-center space-x-2"
              >
                <span>{deployedUrl}</span>
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>

            <button
              onClick={onBack}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-green-600 hover:to-emerald-700 transition"
            >
              Create Another Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};