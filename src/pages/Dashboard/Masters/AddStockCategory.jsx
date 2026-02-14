import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddStockCategory() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoryName: "",
    categoryAlias: "",
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

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold">
          Add Stock Category
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-primary text-primary font-bold rounded-md bg-white hover:bg-primary hover:text-white transition text-[14px]"
        >
          « Back
        </button>
      </div>

      {/* ===== FORM ===== */}
      <div className="max-w-[900px] space-y-6 text-[14px] font-bold">

        {/* Category Name */}
        <div className="flex items-center">
          <label className="w-[220px]">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
          />
        </div>

        {/* Category Alias */}
        <div className="flex items-center">
          <label className="w-[220px]">
            Category Alias <span className="text-red-500">*</span>
          </label>
          <input
            name="categoryAlias"
            value={formData.categoryAlias}
            onChange={handleChange}
            className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-6 pt-4 pl-[220px]">
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
