// -----------------------------
// FORM 1099 TYPES
// -----------------------------

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
  createdAt: string; // ISO date
  updatedAt?: string;
}

export interface Form1099ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof Form1099, string>>;
}
