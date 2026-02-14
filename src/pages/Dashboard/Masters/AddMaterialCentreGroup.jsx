import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddMaterialCentreGroup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    primary: "No",
    mainGroup: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving Group:", formData);
    navigate(-1);
  };

  return (
    <div className="min-h-screen px-10 py-6 text-[#31374a]">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[28px] font-extrabold">
          Add Material Centre Group
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-primary text-primary font-bold rounded-md bg-white hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

      {/* FORM */}
      <div className="max-w-[800px]">

        <div className="space-y-5 text-[14px] font-bold">

          {/* Name */}
          <div className="flex items-center">
            <label className="w-[200px]">
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
            />
          </div>

          {/* Alias */}
          <div className="flex items-center">
            <label className="w-[200px]">
              Alias
            </label>
            <input
              name="alias"
              value={formData.alias}
              onChange={handleChange}
              className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
            />
          </div>

          {/* Primary */}
          <div className="flex items-center">
            <label className="w-[200px]">
              Primary
            </label>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 font-normal">
                <input
                  type="radio"
                  name="primary"
                  value="Yes"
                  checked={formData.primary === "Yes"}
                  onChange={handleChange}
                />
                Yes
              </label>

              <label className="flex items-center gap-2 font-normal">
                <input
                  type="radio"
                  name="primary"
                  value="No"
                  checked={formData.primary === "No"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          {/* Main Group Dropdown */}
          <div className="flex items-center">
            <label className="w-[200px]">
              Main
            </label>

            <select
              name="mainGroup"
              value={formData.mainGroup}
              onChange={handleChange}
              className="flex-1 h-[40px] border border-gray-300 rounded-md px-3 bg-white"
            >
              <option value="">Choose</option>
              <option value="General">General</option>
            </select>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex gap-6 mt-10 ml-[200px]">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-white font-bold rounded-md text-[14px]"
          >
            SAVE
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#2f3545] text-white font-bold rounded-md text-[14px]"
          >
            QUIT
          </button>
        </div>

      </div>
    </div>
  );
}
