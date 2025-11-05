import React, { useState } from 'react';
import { DEPLOYMENT_OPTIONS } from '../../constants/deploymentOptions';
import { Header } from '../ui/Header';
import { DeploymentCard } from './components/DeploymentCard';
import { TrustIndicators } from './components/TrustIndicators';
import { SubdomainFlow } from './flows/SubdomainFlow';
import { CustomDomainFlow } from './flows/CustomDomainFlow';
import { AutomatedFlow } from './flows/AutomatedFlow';

export const DeploymentOptions: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (selectedOption === 'subdomain') {
    return <SubdomainFlow onBack={() => setSelectedOption(null)} />;
  }

  if (selectedOption === 'custom') {
    return <CustomDomainFlow onBack={() => setSelectedOption(null)} />;
  }

  if (selectedOption === 'automated') {
    return <AutomatedFlow onBack={() => setSelectedOption(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Deployment Method
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect option for your needs. From free subdomains to fully automated premium deployments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {DEPLOYMENT_OPTIONS.map((option) => (
            <DeploymentCard
              key={option.id}
              option={option}
              onSelect={setSelectedOption}
            />
          ))}
        </div>

        <TrustIndicators />
      </main>
    </div>
  );
};