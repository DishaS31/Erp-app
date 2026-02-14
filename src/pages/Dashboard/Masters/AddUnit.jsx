import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUnit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    unitName: "",
    unitAlias: "",
    printName: "",
    uqc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    navigate(-1);
  };

  return (
    <div className="min-h-screen px-10 py-6 text-[#31374a]">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold">
          Add A Unit
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-primary text-primary font-bold rounded-md bg-white hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

      {/* FORM */}
      <div className="max-w-[1000px] space-y-6 text-[14px] font-bold">

        {/* Unit Name */}
        <div className="flex items-center">
          <label className="w-[220px]">
            Unit Name <span className="text-red-500">*</span>
          </label>
          <input
            name="unitName"
            value={formData.unitName}
            onChange={handleChange}
            className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
          />
        </div>

        {/* Unit Alias */}
        <div className="flex items-center">
          <label className="w-[220px]">
            Unit Alias <span className="text-red-500">*</span>
          </label>
          <input
            name="unitAlias"
            value={formData.unitAlias}
            onChange={handleChange}
            className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
          />
        </div>

        {/* Print Name */}
        <div className="flex items-center">
          <label className="w-[220px]">
            Print Name <span className="text-red-500">*</span>
          </label>
          <input
            name="printName"
            value={formData.printName}
            onChange={handleChange}
            className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
          />
        </div>

        {/* UQC */}
        <div className="flex items-center">
          <label className="w-[220px]">
            UQC <span className="text-[12px] font-normal text-gray-500">(For GST Returns)</span>
          </label>
          <input
            name="uqc"
            value={formData.uqc}
            onChange={handleChange}
            className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-6 pt-6 pl-[220px]">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-white font-bold rounded-md"
          >
            SAVE
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#2f3545] text-white font-bold rounded-md"
          >
            QUIT
          </button>
        </div>

      </div>
    </div>
  );
}
