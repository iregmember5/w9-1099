import React, { useState } from "react";

import {

  Download,

  Delete,

} from "lucide-react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import type { Company, Vendor, VendorRequest } from "../../types/types";
// Page 3: Vendor Request Page
const VendorRequestPage: React.FC<{
  company: Company;
  onNext: (vendors: VendorRequest[]) => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const [vendors, setVendors] = useState<Vendor[]>([
    { id: "1", name: "", email: "", accountNo: "" },
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const addVendorRow = () => {
    setVendors([
      ...vendors,
      { id: Date.now().toString(), name: "", email: "", accountNo: "" },
    ]);
  };

  const handleVenderDelete = (id: string) => {
    setVendors(vendors.filter((v) => v.id !== id));
  };

  const updateVendor = (id: string, field: keyof Vendor, value: string) => {
    setVendors(
      vendors.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSendRequests = () => {
    const requests: VendorRequest[] = vendors
      .filter((v) => v.name && v.email)
      .map((v) => ({
        id: v.id,
        vendorName: v.name,
        form: "W-9",
        issue1099: false,
        eDeliveryConsent: false,
        tinMatch: false,
        status: "Requested",
        updated: new Date().toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        }),
      }));
    onNext(requests);
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
          <div className="bg-orange-500/90 text-white px-4 py-2 rounded text-sm font-semibold">
            W-9
          </div>
          <h1 className="text-xl font-semibold">Company Name</h1>
        </div>

        {/* <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 bg-white border-b-2 border-teal-500/90 font-medium">
            W-9
          </button>
          <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-50">
            W-4
          </button>
          <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-50">
            W-8BEN
          </button>
          <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-50">
            W-8BEN-E
          </button>
          <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-50">
            W-8IMY
          </button>
        </div> */}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Manual Entry */}
          <div className="lg:col-span-2">
            <div className="bg-orange-500/90 text-white px-6 py-3 rounded-t-lg">
              <h2 className="text-lg font-semibold text-white">
                Request a Few Vendor W-9s
              </h2>
            </div>
            <div className="bg-white rounded-b-lg shadow p-6">
              <div className="space-y-4">
                {vendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="grid grid-cols-3 gap-3 items-center relative border border-gray-200 rounded-lg p-3 hover:shadow-sm"
                  >
                    {/* Vendor Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Vendor Name
                      </label>
                      <input
                        type="text"
                        value={vendor.name}
                        onChange={(e) =>
                          updateVendor(vendor.id, "name", e.target.value)
                        }
                        className="w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter Vendor Name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={vendor.email}
                        onChange={(e) =>
                          updateVendor(vendor.id, "email", e.target.value)
                        }
                        className="w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter Email"
                      />
                    </div>

                    {/* Account Number + Delete */}
                    <div className="flex items-end justify-between gap-2 relative">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Account No. (optional)
                        </label>
                        <input
                          type="text"
                          value={vendor.accountNo}
                          onChange={(e) =>
                            updateVendor(vendor.id, "accountNo", e.target.value)
                          }
                          className="w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Enter Account No."
                        />
                      </div>

                      <button
                        onClick={() => handleVenderDelete(vendor.id)}
                        className="text-red-500 hover:text-red-600 transition p-2 -top-2 absolute -right-1"
                        title="Delete Vendor"
                      >
                        <Delete size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                {vendors.length && (
                  <button
                    onClick={addVendorRow}
                    className="mt-6 px-6 py-2 rounded hover:bg-orange-500/90 hover:text-white font-medium border border-orange-500/90 mx-2"
                  >
                    + Add another vendor
                  </button>
                )}

                <button
                  onClick={handleSendRequests}
                  className="mt-6 bg-primary text-white px-6 py-2 rounded hover:bg-primary/80 font-medium"
                >
                  Send Requests
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - CSV Upload & API */}
          <div className="space-y-6">
            {/* CSV Upload */}
            <div>
              <div className="bg-orange-500/90 text-white px-6 py-3 rounded-t-lg">
                <h2 className="text-lg font-semibold text-white">
                  Request Many Vendor W-9s
                </h2>
              </div>
              <div className="bg-white rounded-b-lg shadow p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                      1
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 mb-2">
                        Download and use this CSV template:
                      </p>
                      <button className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/80 flex items-center gap-2">
                        <Download size={16} />
                        W-9 CSV Template
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                      2
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 mb-2">
                        Add vendors to the file, <strong>Save</strong> locally,
                        then <strong>click Select File</strong> below.
                      </p>
                      <div className="flex gap-2">
                        <label className="flex-1">
                          <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          <div className="border border-gray-500/90 rounded px-3 py-2 text-sm cursor-pointer hover:bg-gray-50">
                            {selectedFile ? selectedFile.name : "None selected"}
                          </div>
                        </label>
                        <button className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/80">
                          Import CSV
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* API Section */}
            {/* <div>
              <div className="bg-blue-600 text-white px-6 py-3 rounded-t-lg">
                <h2 className="text-lg font-semibold">
                  Collect W-9s on Your Website
                </h2>
              </div>
              <div className="bg-white rounded-b-lg shadow p-6">
                <p className="text-sm text-gray-700 mb-3">
                  To{" "}
                  <a href="#" className="text-blue-600">
                    create your Form Request
                  </a>
                  , use:
                </p>
                <div className="bg-gray-900 text-green-500/90 p-4 rounded text-xs font-mono overflow-x-auto relative">
                  <pre>{`{
                    "data": {
                        "type": "form_request",
                        "attributes": {
                        "form_type": "W-9",
                        "company_id": 382186682,
                        "reference_id": "YOUR_ID"
                        }
                    }
                    }`}</pre>
                  <button className="absolute top-2 right-2 bg-blue-500/90 text-white p-2 rounded hover:bg-blue-600">
                    <Download size={14} />
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Read our{" "}
                  <a href="#" className="text-blue-600">
                    API Quick Start
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600">
                    W-9 Collection Guide
                  </a>{" "}
                  to learn more.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRequestPage;

