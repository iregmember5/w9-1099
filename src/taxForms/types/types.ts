// types.ts
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

export interface W9Form {
  name: string;
  businessName?: string;
  taxClassification:
    | "individual"
    | "c_corporation"
    | "s_corporation"
    | "partnership"
    | "trust_estate"
    | "llc"
    | "other";
  exemptPayeeCode?: string;
  fatcaCode?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  requesterName?: string;
  requesterAddress?: string;
  tinType: "ssn" | "ein";
  tinValue: string;
  signature: string;
  dateSigned: string;
}

export interface W9ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof W9Form, string>>;
}

export type W9SubmissionStatus = "draft" | "submitted" | "approved" | "rejected";

export interface Form1099 {
  payer: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    tin: string;
  };
  recipient: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    tin: string;
  };
  accountNumber?: string;
  income: number;
  federalTaxWithheld?: number;
  stateTaxWithheld?: number;
  taxYear: number;
  formType:
    | "1099-NEC"
    | "1099-MISC"
    | "1099-INT"
    | "1099-DIV"
    | "1099-B"
    | "1099-G";
  status: "draft" | "submitted" | "sent" | "approved";
  createdAt: string;
  updatedAt?: string;
}

export interface Form1099ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof Form1099, string>>;
}