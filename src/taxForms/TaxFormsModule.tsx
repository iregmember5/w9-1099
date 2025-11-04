import React, { useState } from "react";
import WelcomePage from "./pages/W9Form/WelcomePage";
import CompanyForm from "./pages/W9Form/CompanyFormPage";
import VendorRequestPage from "./pages/W9Form/VendorRequestPage";
import VendorListPage from "./pages/W9Form/VendorListPage";
import type { Company, VendorRequest } from "./types/types";
const TaxFormsModule: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    "welcome" | "company" | "vendors" | "list"
  >("welcome");
  const [company, setCompany] = useState<Company | null>(null);
  const [vendorRequests, setVendorRequests] = useState<VendorRequest[]>([]);

  const handleFormSelect = (form: string) => {
    if (form === "W9") {
      setCurrentPage("company");
    }
  };

  const handleCompanySubmit = (companyData: Company) => {
    setCompany(companyData);
    setCurrentPage("vendors");
  };

  const handleVendorsSubmit = (requests: VendorRequest[]) => {
    setVendorRequests(requests);
    setCurrentPage("list");
  };

  const handleBack = () => {
    if (currentPage === "company") {
      setCurrentPage("welcome");
    } else if (currentPage === "vendors") {
      setCurrentPage("company");
    } else if (currentPage === "list") {
      setCurrentPage("vendors");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === "welcome" && (
        <WelcomePage onSelectForm={handleFormSelect} />
      )}
      {currentPage === "company" && (
        <CompanyForm onNext={handleCompanySubmit} onBack={handleBack} />
      )}
      {currentPage === "vendors" && company && (
        <VendorRequestPage
          company={company}
          onNext={handleVendorsSubmit}
          onBack={handleBack}
        />
      )}
      {currentPage === "list" && (
        <VendorListPage requests={vendorRequests} onBack={handleBack} />
      )}
    </div>
  );
};

export default TaxFormsModule;
