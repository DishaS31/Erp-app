import React, { useState } from "react";
import CompaniesAgGrid from "../components/CompaniesAgGrid";

const RecycleBin = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4">
      <h1 className="text-xl font-bold mb-4">Recycle Bin</h1>

      {/* ✅ GRID */}
      <CompaniesAgGrid
        filter="recycle"
        onSelectCompany={(row) => {
          setSelectedCompany(row);
        }}
      />

      {/* just for testing (optional) */}
      {selectedCompany?.comp_id && (
        <p className="mt-3 text-sm text-gray-600">
          Selected Company ID: <b>{selectedCompany.comp_id}</b>
        </p>
      )}
    </div>
  );
};

export default RecycleBin;
