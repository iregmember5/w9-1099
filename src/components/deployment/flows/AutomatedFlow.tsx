import React, { useState } from 'react';
import { ArrowRight, Crown, Globe, Server, Shield, Rocket, Check, ExternalLink } from 'lucide-react';
import { LoadingSpinner } from '../../ui/LoadingSpinner';

interface AutomatedFlowProps {
  onBack: () => void;
}

export const AutomatedFlow: React.FC<AutomatedFlowProps> = ({ onBack }) => {
  const [domain, setDomain] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const handleCheckAvailability = () => {
    if (!domain) return;
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setIsAvailable(Math.random() > 0.3);
    }, 2000);
  };

  const handlePurchaseAndDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployed(true);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-900 mb-6 flex items-center">
          <ArrowRight className="w-5 h-5 mr-2 transform rotate-180" />
          Back to options
        </button>

        {!isDeployed ? (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
                <Crown className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Automated Premium Deployment
              </h2>
              <p className="text-gray-600">
                We handle everything - just type your desired domain
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Your Desired Domain
                </label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value.toLowerCase())}
                  placeholder="mycompany.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {isAvailable === null && (
                <button
                  onClick={handleCheckAvailability}
                  disabled={!domain || isChecking}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-4 rounded-lg hover:from-purple-600 hover:to-pink-700 transition transform hover:scale-105 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isChecking ? (
                    <>
                      <LoadingSpinner />
                      <span>Checking availability...</span>
                    </>
                  ) : (
                    <span>Check Availability</span>
                  )}
                </button>
              )}

              {isAvailable === true && (
                <div className="space-y-4">
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                    <Check className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      🎉 {domain} is available!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      We can register and deploy this domain for you automatically
                    </p>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">What happens next:</h4>
                    <div className="space-y-3">
                      {[
                        { step: '1', text: 'Domain registration ($12.99/year)', icon: Globe },
                        { step: '2', text: 'Automatic DNS configuration', icon: Server },
                        { step: '3', text: 'SSL certificate issuance', icon: Shield },
                        { step: '4', text: 'Website deployment & launch', icon: Rocket }
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div key={idx} className="flex items-center">
                            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                              {item.step}
                            </div>
                            <Icon className="w-5 h-5 text-purple-600 mr-2" />
                            <span className="text-gray-700">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Total Cost</p>
                      <p className="text-2xl font-bold text-gray-900">$41.99</p>
                      <p className="text-xs text-gray-500">First year ($12.99 domain + $29/mo plan)</p>
                    </div>
                  </div>

                  <button
                    onClick={handlePurchaseAndDeploy}
                    disabled={isDeploying}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-4 rounded-lg hover:from-purple-600 hover:to-pink-700 transition transform hover:scale-105 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isDeploying ? (
                      <>
                        <LoadingSpinner />
                        <span>Processing... {Math.floor(Math.random() * 100)}%</span>
                      </>
                    ) : (
                      <>
                        <Crown className="w-5 h-5" />
                        <span>Purchase & Deploy Automatically</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {isAvailable === false && (
                <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 text-center">
                  <div className="text-red-600 text-4xl mb-3">😞</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {domain} is already taken
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try a different domain name or variation
                  </p>
                  <button
                    onClick={() => {
                      setIsAvailable(null);
                      setDomain('');
                    }}
                    className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-600 transition"
                  >
                    Try Another Domain
                  </button>
                </div>
              )}

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 border border-purple-200">
                <div className="flex items-start">
                  <Crown className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Premium Benefits</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✨ Zero technical knowledge required</li>
                      <li>✨ Complete automation in 60 seconds</li>
                      <li>✨ 24/7 premium support included</li>
                      <li>✨ Automatic renewals & updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6">
              <Check className="w-16 h-16 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🚀 Your Site is Live!
            </h2>
            <p className="text-gray-600 mb-8">
              Everything is configured and ready to go
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-2">Your website is now live at:</p>
                <a 
                  href={`https://${domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 flex items-center justify-center space-x-2"
                >
                  <span>https://{domain}</span>
                  <ExternalLink className="w-6 h-6 text-purple-600" />
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <Check className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Domain Registered</h4>
                  <p className="text-xs text-gray-600">Valid until Nov 2026</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <Check className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">DNS Configured</h4>
                  <p className="text-xs text-gray-600">Propagated globally</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <Check className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">SSL Active</h4>
                  <p className="text-xs text-gray-600">Auto-renewing certificate</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <Check className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Site Deployed</h4>
                  <p className="text-xs text-gray-600">Ready for customization</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => window.open(`https://${domain}`, '_blank')}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Visit Site</span>
              </button>
              <button
                onClick={onBack}
                className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition"
              >
                Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};