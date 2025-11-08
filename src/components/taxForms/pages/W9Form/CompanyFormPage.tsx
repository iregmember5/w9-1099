// import React, { useState } from "react";
// import { HiOutlineArrowLeft } from "react-icons/hi";

// // Page 2: Company Form
// const CompanyForm: React.FC<{
//   onNext: (company: Company) => void;
//   onBack: () => void;
// }> = ({ onNext, onBack }) => {
//   const [company, setCompany] = useState<Partial<Company>>({
//     country: "US - United States",
//     w9TinMatch: true,
//     autoReminders: true,
//     reminderDays: 4,
//     stopAfterAttempts: 3,
//   });
//   const [showImport, setShowImport] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (company.name && company.ein && company.email) {
//       onNext(company as Company);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         <button
//           onClick={onBack}
//           className="text-primary font-semibold mb-4 hover:text-primary/80 flex items-center gap-1"
//         >
//           <HiOutlineArrowLeft /> Back
//         </button>

//         <div className="flex items-center gap-4 mb-6">
//           <div className="flex gap-2">
//             <div className="bg-orange-500 text-white px-4 py-2 rounded">
//               W-9 Details
//             </div>
//             {/* <div className="bg-ring-orange-500 text-white px-4 py-2 rounded">
//               Track W-4
//             </div>
//             <div className="bg-blue-500 text-white px-4 py-2 rounded">
//               Track W-8
//             </div> */}
//           </div>
//           <h1 className="text-2xl font-semibold">Company Requesting W-9</h1>
//         </div>

//         {showImport && (
//           <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
//             <p className="text-sm text-gray-700">
//               If you manage W-9 requests for many companies, you can import all
//               the companies at once.
//             </p>
//             <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
//               Use CSV Import
//             </button>
//           </div>
//         )}

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">New Company In</h2>
//             <button
//               onClick={() => setShowImport(!showImport)}
//               className="text-sm text-primary hover:text-primary/80"
//             >
//               + Reference ID ⓘ
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Company Name
//               </label>
//               <input
//                 type="text"
//                 value={company.name || ""}
//                 onChange={(e) =>
//                   setCompany({ ...company, name: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Company DBA Name (Optional)
//               </label>
//               <input
//                 type="text"
//                 value={company.dbaName || ""}
//                 onChange={(e) =>
//                   setCompany({ ...company, dbaName: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Company EIN
//               </label>
//               <input
//                 type="text"
//                 value={company.ein || ""}
//                 onChange={(e) =>
//                   setCompany({ ...company, ein: e.target.value })
//                 }
//                 className="w-1/3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Street Address
//               </label>
//               <input
//                 type="text"
//                 value={company.address || ""}
//                 onChange={(e) =>
//                   setCompany({ ...company, address: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
//               />
//             </div>

//             <div className="grid grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   value={company.city || ""}
//                   onChange={(e) =>
//                     setCompany({ ...company, city: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   State
//                 </label>
//                 <select
//                   value={company.state || ""}
//                   onChange={(e) =>
//                     setCompany({ ...company, state: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
//                 >
//                   <option>Choose...</option>
//                   <option value="CA">California</option>
//                   <option value="NY">New York</option>
//                   <option value="TX">Texas</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   ZIP Code
//                 </label>
//                 <input
//                   type="text"
//                   value={company.zipCode || ""}
//                   onChange={(e) =>
//                     setCompany({ ...company, zipCode: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Country
//               </label>
//               <select
//                 value={company.country}
//                 onChange={(e) =>
//                   setCompany({ ...company, country: e.target.value })
//                 }
//                 className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
//               >
//                 <option>US - United States</option>
//               </select>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email (for Inquiries by Vendors/Employees)
//                 </label>
//                 <input
//                   type="email"
//                   value={company.email || ""}
//                   onChange={(e) =>
//                     setCompany({ ...company, email: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
//                   placeholder="bellarustmaster786@gmail.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1 ">
//                   Phone
//                 </label>
//                 <input
//                   type="tel"
//                   value={company.phone || ""}
//                   onChange={(e) =>
//                     setCompany({ ...company, phone: e.target.value })
//                   }
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
//                 />
//               </div>
//             </div>

//             <div className="border-t pt-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 W-9 TIN Match
//               </label>
//               <p className="text-xs text-gray-600 mb-3">
//                 To enable "automated validation of your vendors' name and SSN or
//                 EIN, mark the authorizations box below.
//               </p>
//               <label className="flex items-start gap-2">
//                 <input
//                   type="checkbox"
//                   checked={company.w9TinMatch}
//                   onChange={(e) =>
//                     setCompany({ ...company, w9TinMatch: e.target.checked })
//                   }
//                   className="mt-1"
//                 />
//                 <span className="text-xs text-gray-700">
//                   I authorize Track1099 to perform vendors with TIN Matching on
//                   all vendor W-9 forms requested by this company and I affirm
//                   that I have the authority to do so. This company only requests
//                   W-9 forms from vendors to whom the company expects to issue a
//                   1099 or DIV, INT, MISC, OID NEC, K-8 and/or PATR.
//                 </span>
//               </label>
//             </div>

//             {/* <div className="border-t pt-4">
//               <label className="flex items-center gap-2 mb-3">
//                 <input
//                   type="checkbox"
//                   checked={company.autoReminders}
//                   onChange={(e) =>
//                     setCompany({ ...company, autoReminders: e.target.checked })
//                   }
//                 />
//                 <span className="text-sm font-medium">
//                   Turn on automatic reminders for requests that are unfinished.
//                 </span>
//               </label>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs text-gray-600 mb-1">
//                     Send reminder every X days.
//                   </label>
//                   <input
//                     type="number"
//                     value={company.reminderDays}
//                     onChange={(e) =>
//                       setCompany({
//                         ...company,
//                         reminderDays: parseInt(e.target.value),
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs text-gray-600 mb-1">
//                     Stop sending reminders after X attempts.
//                   </label>
//                   <input
//                     type="number"
//                     value={company.stopAfterAttempts}
//                     onChange={(e) =>
//                       setCompany({
//                         ...company,
//                         stopAfterAttempts: parseInt(e.target.value),
//                       })
//                     }
//                     className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
//                   />
//                 </div>
//               </div>
//             </div> */}

//             <div className="flex justify-end pt-4">
//               <button
//                 type="submit"
//                 className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80 font-medium"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyForm;

// CompanyForm.tsx
import React, { useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import type { Company } from "../../types/types";

// Page 2: Company Form
const CompanyForm: React.FC<{
  onNext: (company: Company) => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const [company, setCompany] = useState<Partial<Company>>({
    country: "US - United States",
    w9TinMatch: true,
    autoReminders: true,
    reminderDays: 4,
    stopAfterAttempts: 3,
  });
  const [showImport, setShowImport] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (company.name && company.ein && company.email) {
      onNext({
        id: Date.now().toString(),
        name: company.name,
        ein: company.ein,
        email: company.email,
        address: company.address || "",
        city: company.city || "",
        state: company.state || "",
        zipCode: company.zipCode || "",
        country: company.country || "US - United States",
        w9TinMatch: company.w9TinMatch || true,
        autoReminders: company.autoReminders || true,
        reminderDays: company.reminderDays || 4,
        stopAfterAttempts: company.stopAfterAttempts || 3,
        ...company,
      } as Company);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="text-primary font-semibold mb-4 hover:text-primary/80 flex items-center gap-1"
        >
          <HiOutlineArrowLeft /> Back
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex gap-2">
            <div className="bg-orange-500 text-white px-4 py-2 rounded">
              W-9 Details
            </div>
          </div>
          <h1 className="text-2xl font-semibold">Company Requesting W-9</h1>
        </div>

        {showImport && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-sm text-gray-700">
              If you manage W-9 requests for many companies, you can import all
              the companies at once.
            </p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
              Use CSV Import
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">New Company In</h2>
            <button
              onClick={() => setShowImport(!showImport)}
              className="text-sm text-primary hover:text-primary/80"
            >
              + Reference ID ⓘ
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={company.name || ""}
                onChange={(e) =>
                  setCompany({ ...company, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company DBA Name (Optional)
              </label>
              <input
                type="text"
                value={company.dbaName || ""}
                onChange={(e) =>
                  setCompany({ ...company, dbaName: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company EIN
              </label>
              <input
                type="text"
                value={company.ein || ""}
                onChange={(e) =>
                  setCompany({ ...company, ein: e.target.value })
                }
                className="w-1/3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={company.address || ""}
                onChange={(e) =>
                  setCompany({ ...company, address: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={company.city || ""}
                  onChange={(e) =>
                    setCompany({ ...company, city: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  value={company.state || ""}
                  onChange={(e) =>
                    setCompany({ ...company, state: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option>Choose...</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={company.zipCode || ""}
                  onChange={(e) =>
                    setCompany({ ...company, zipCode: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                value={company.country}
                onChange={(e) =>
                  setCompany({ ...company, country: e.target.value })
                }
                className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option>US - United States</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (for Inquiries by Vendors/Employees)
                </label>
                <input
                  type="email"
                  value={company.email || ""}
                  onChange={(e) =>
                    setCompany({ ...company, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ">
                  Phone
                </label>
                <input
                  type="tel"
                  value={company.phone || ""}
                  onChange={(e) =>
                    setCompany({ ...company, phone: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                W-9 TIN Match
              </label>
              <p className="text-xs text-gray-600 mb-3">
                To enable "automated validation of your vendors' name and SSN or
                EIN, mark the authorizations box below.
              </p>
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={company.w9TinMatch}
                  onChange={(e) =>
                    setCompany({ ...company, w9TinMatch: e.target.checked })
                  }
                  className="mt-1"
                />
                <span className="text-xs text-gray-700">
                  I authorize Track1099 to perform vendors with TIN Matching on
                  all vendor W-9 forms requested by this company and I affirm
                  that I have the authority to do so. This company only requests
                  W-9 forms from vendors to whom the company expects to issue a
                  1099 or DIV, INT, MISC, OID NEC, K-8 and/or PATR.
                </span>
              </label>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80 font-medium"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
