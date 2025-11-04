// -----------------------------
// W-9 FORM TYPES
// -----------------------------

export interface W9Form {
  name: string; // Individual or business name
  businessName?: string; // DBA name
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

  signature: string; // base64 image or text signature
  dateSigned: string; // ISO date string
}

export interface W9ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof W9Form, string>>;
}

export type W9SubmissionStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "rejected";
