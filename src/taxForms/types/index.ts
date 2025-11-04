// types/index.ts
export interface Company {
  id: string;
  name: string;
  dbaName?: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  email: string;
  phone?: string;
  w9TinMatch: boolean;
  autoReminders: boolean;
  reminderDays: number;
  stopAfterAttempts: number;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  accountNo?: string;
}

export interface VendorRequest {
  id: string;
  vendorName: string;
  form: string;
  issue1099: boolean;
  eDeliveryConsent: boolean;
  tinMatch: boolean;
  status: string;
  updated: string;
}

// Export all types
export * from './w9.types';
export * from './form1099.types';