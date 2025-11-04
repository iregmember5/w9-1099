import React, { useState, useRef, useEffect } from "react";
import { Download, Search, ChevronDown, Mail } from "lucide-react";
import { HiOutlineArrowLeft } from "react-icons/hi";

// Types
interface VendorRequest {
  id: string;
  vendorName: string;
  form: string;
  issue1099: boolean;
  eDeliveryConsent: boolean;
  tinMatch: boolean;
  status: string;
  updated: string;
}

// Download dropdown options
const downloadOptions = [
  { id: "all-csv", label: "All Forms (CSV)" },
  { id: "all-pdf", label: "All Forms in one PDF" },
  { id: "separate-pdfs", label: "All Forms in Separate PDFs" },
  { id: "pdf-tins-hidden", label: "All Forms in one PDF TINs Hidden" },
  {
    id: "separate-pdfs-tins-hidden",
    label: "All Forms in Separate PDFs TINs Hidden",
  },
];

// Dropdown Component
const DropdownMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  options: { id: string; label: string }[];
  onSelect: (id: string) => void;
}> = ({ isOpen, onClose, options, onSelect }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-1 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
    >
      <div className="py-1">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              onSelect(option.id);
              onClose();
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Page 4: Vendor List Page
const VendorListPage: React.FC<{
  requests: VendorRequest[];
  onBack: () => void;
}> = ({ requests, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const handleDownloadSelect = (optionId: string) => {
    console.log("Download option selected:", optionId);

    // Implement download logic based on option
    switch (optionId) {
      case "all-csv":
        downloadAsCSV();
        break;
      case "all-pdf":
        downloadAllFormsOnePDF();
        break;
      case "separate-pdfs":
        downloadSeparatePDFs();
        break;
      case "pdf-tins-hidden":
        downloadAllFormsOnePDFTINsHidden();
        break;
      case "separate-pdfs-tins-hidden":
        downloadSeparatePDFsTINsHidden();
        break;
      default:
        console.log("Unknown option");
    }
  };

  const downloadAsCSV = () => {
    const headers = ["Vendor Name", "Form", "Status", "Updated"];
    const rows = requests.map((req) => [
      req.vendorName,
      req.form,
      req.status,
      req.updated,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vendor-forms-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const downloadAllFormsOnePDF = () => {
    alert(
      "Downloading all forms in one PDF...\nThis would generate a single PDF with all vendor forms."
    );
  };

  const downloadSeparatePDFs = () => {
    alert(
      "Downloading all forms as separate PDFs...\nThis would generate individual PDF files for each vendor."
    );
  };

  const downloadAllFormsOnePDFTINsHidden = () => {
    alert(
      "Downloading all forms in one PDF with TINs hidden...\nThis would generate a single PDF with TIN information redacted."
    );
  };

  const downloadSeparatePDFsTINsHidden = () => {
    alert(
      "Downloading all forms as separate PDFs with TINs hidden...\nThis would generate individual PDFs with TIN information redacted."
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="text-primary font-semibold mb-4 hover:text-primary/80 flex items-center gap-1"
        >
          <HiOutlineArrowLeft /> Back
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex gap-2">
            <div className="bg-orange-500/90 text-white px-3 py-1 rounded text-xs">
              W-9
            </div>
          </div>
          <h1 className="text-xl font-semibold">Company Name</h1>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search by Vendor name, email, reference ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-500 rounded w-96 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <button className="p-2 border border-gray-500 rounded hover:bg-gray-50">
                  <Search size={18} />
                </button>
              </div>
              <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded text-sm font-medium">
                <Mail size={16} className="inline mr-2" />1 Sent W-9 request
              </div>
            </div>
          </div>

          <div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                    <div className="flex items-center gap-2">Vendor Name</div>
                  </th>
                  <th className="px-4 py-3 text-center">
                    <button className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded">
                      Delete
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                    Form
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                    Issue 1099
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                    E-delivery Consent
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                    TIN Match
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                    <div className="flex items-center gap-2">Status</div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                    <div className="flex items-center gap-2">Updated</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <a href="#" className="text-blue-600 hover:underline">
                        {request.vendorName}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 py-3 text-sm">{request.form}</td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">
                      <span className="text-sm">{request.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {request.updated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex justify-end fixed right-6 top-24 space-y-4">
          <div className="py-1 flex gap-2">
            <button className="bg-primary text-white font-semibold border border-blue-600 px-4 py-2 rounded hover:bg-primary/80 flex items-center justify-between">
              <Mail size={16} />
              <span className="flex-1 text-left ml-2">Request Forms</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsDownloadOpen(!isDownloadOpen)}
                className="bg-white border border-gray-500 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 flex items-center justify-between"
              >
                <Download size={16} />
                <span className="flex-1 text-left ml-2 mr-4">Downloads</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isDownloadOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <DropdownMenu
                isOpen={isDownloadOpen}
                onClose={() => setIsDownloadOpen(false)}
                options={downloadOptions}
                onSelect={handleDownloadSelect}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorListPage;
