import { useState } from 'react';

export const useDeployment = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const simulateDeployment = (duration: number = 3000): Promise<void> => {
    setIsDeploying(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsDeploying(false);
        setIsDeployed(true);
        resolve();
      }, duration);
    });
  };

  return {
    isDeploying,
    isDeployed,
    simulateDeployment,
    resetDeployment: () => {
      setIsDeployed(false);
      setIsDeploying(false);
    }
  };
};