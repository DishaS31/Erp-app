import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMaterialCentreGroup() {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    primary: "yes",
    main: ""
  });

  // 🔥 Dummy Prefill Data 
  useEffect(() => {
    setFormData({
      name: "General",
      alias: "General",
      primary: "yes",
      main: ""
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated Data:", formData);
    navigate(-1);
  };

  return (
    <div className="min-h-screen px-10 py-6 text-[#31374a]">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold">
          Modify Material Centre Group
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-primary text-primary font-bold rounded-md bg-white hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

      {/* FORM */}
      <div className="max-w-[900px] space-y-6 text-[14px] font-bold">

        {/* Name */}
        <div className="flex items-center">
          <label className="w-[200px]">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
          />
        </div>

        {/* Alias */}
        <div className="flex items-center">
          <label className="w-[200px]">Alias</label>
          <input
            name="alias"
            value={formData.alias}
            onChange={handleChange}
            className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
          />
        </div>

        {/* Primary */}
        <div className="flex items-center">
          <label className="w-[200px]">Primary</label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="primary"
                value="yes"
                checked={formData.primary === "yes"}
                onChange={handleChange}
              />
              Yes
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="primary"
                value="no"
                checked={formData.primary === "no"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        {/* Main */}
        <div className="flex items-center">
          <label className="w-[200px]">Main</label>
          <select
            name="main"
            value={formData.main}
            onChange={handleChange}
            className="flex-1 h-[40px] border border-gray-300 rounded-md px-3 bg-white"
          >
            <option value="">Choose</option>
            <option value="General">General</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 pt-6 pl-[200px]">
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
