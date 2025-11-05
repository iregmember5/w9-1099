import { Zap, Globe, Crown } from 'lucide-react';
import type { DeploymentOption } from '../types/auth';

export const DEPLOYMENT_OPTIONS: DeploymentOption[] = [
  {
    id: 'subdomain',
    icon: Zap,
    title: 'Free Subdomain',
    price: '',
    description: 'Get started instantly with a free subdomain',
    features: [
      'Instant deployment',
      'yoursite.cms.com subdomain',
      'SSL certificate included',
      'Perfect for testing & demos',
      'No setup required'
    ],
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    buttonText: 'Deploy Now - Free'
  },
  {
    id: 'custom',
    icon: Globe,
    title: 'Connect Your Domain',
    price: '',
    description: 'Bring your own domain and connect it',
    features: [
      'Use your own domain',
      'DNS configuration guide',
      'Free SSL certificate',
      'Full branding control',
      'Professional appearance'
    ],
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    buttonText: 'Connect Domain'
  },
  {
    id: 'automated',
    icon: Crown,
    title: 'Automated Premium',
    price: '',
    description: 'We handle everything - just pick your domain',
    features: [
      'Automatic domain registration',
      'Instant DNS configuration',
      'Zero technical setup',
      'Auto SSL renewal',
      'Premium support'
    ],
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    buttonText: 'Get Premium',
    badge: 'Most Popular'
  }
];