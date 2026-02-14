import React, { useState } from "react";
import { useNavigate } from "react-router-dom";




export default function AddMaterialCentre() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    centreName: "",
    alias: "",
    printName: "",
    group: "",
    address1: "",
    address2: "",
    country: "India",
    state: "Chandigarh",
    city: "",
    pin: "",
  });

const countryStateData = {
  India: [
    "Chandigarh",
    "Punjab",
    "Haryana",
    "Delhi",
    "Himachal Pradesh",
    "Rajasthan",
    "Uttar Pradesh"
  ],
  USA: [
    "California",
    "Texas",
    "Florida",
    "New York"
  ]
};


 const handleChange = (e) => {
  const { name, value } = e.target;

  // if country changes → reset state
  if (name === "country") {
    setFormData((p) => ({
      ...p,
      country: value,
      state: ""
    }));
  } else {
    setFormData((p) => ({ ...p, [name]: value }));
  }
};


  const handleSave = () => {
    console.log(formData);
    navigate(-1);
  };

return (
  <div className="min-h-screen  px-10 py-6 text-[#31374a]">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-2">
      <h1 className="text-[28px] font-extrabold">
        Add Material Centre
      </h1>

      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 border border-primary text-primary font-bold rounded-md bg-white hover:bg-primary hover:text-white transition text-[14px]"
      >
        « Back
      </button>
    </div>

    {/* FORM CONTAINER */}
    <div className=" rounded-md p-10 py-4 max-w-[1350px]">

      <div className="grid grid-cols-2 gap-x-6 gap-y-7 text-[14px] font-bold">

        {/* ===== LEFT COLUMN ===== */}
        <div className="space-y-3">

          {/* Centre Name */}
          <div className="flex items-center">
            <label className="w-[200px] ">
              Centre Name <span className="text-red-500">*</span>
            </label>
            <input
              name="centreName"
              value={formData.centreName}
              onChange={handleChange}
              className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
            />
          </div>

          {/* Alias */}
          <div className="flex items-center">
            <label className="w-[200px] ">
              Alias <span className="text-red-500">*</span>
            </label>
            <input
              name="alias"
              value={formData.alias}
              onChange={handleChange}
              className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
            />
          </div>

          {/* Print Name */}
          <div className="flex items-center">
            <label className="w-[200px] ">
              Print Name <span className="text-red-500">*</span>
            </label>
            <input
              name="printName"
              value={formData.printName}
              onChange={handleChange}
              className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
            />
          </div>

          {/* Group */}
          <div className="flex items-center">
            <label className="w-[200px] ">
              Material Centre Group <span className="text-red-500">*</span>
            </label>
            <select
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
            >
              <option value="">Choose</option>
              <option value="General">General</option>
            </select>
          </div>

          {/* Address 1 */}
          <div className="flex items-center">
            <label className="w-[200px] ">
              Address 1
            </label>
            <input
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
            />
          </div>

          {/* Address 2 */}
          <div className="flex items-center">
            <label className="w-[200px] ">
              Address 2
            </label>
            <input
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
            />
          </div>

        </div>


        {/* ===== RIGHT COLUMN ===== */}
        <div className="space-y-3">

          {/* Country */}
          <div className="flex items-center">
            <label className="w-[200px]">
              Country <span className="text-red-500">*</span>
            </label>
           <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="flex-1 h-[40px] border border-gray-300 rounded-md px-3 bg-white"
            >
            {Object.keys(countryStateData).map((country) => (
                <option key={country} value={country}>
                {country}
                </option>
            ))}
            </select>

          </div>

          {/* State */}
          <div className="flex items-center">
            <label className="w-[200px] ">
              State <span className="text-red-500">*</span>
            </label>
            <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="flex-1 h-[40px] border border-gray-300 rounded-md px-3 bg-white"
            >
            <option value="">Select State</option>
            {countryStateData[formData.country]?.map((state) => (
                <option key={state} value={state}>
                {state}
                </option>
            ))}
            </select>

          </div>

          {/* City */}
          <div className="flex items-center">
            <label className="w-[200px] ">
              City
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
            />
          </div>

          {/* PIN */}
          <div className="flex items-center">
            <label className="w-[200px] ">
              PIN <span className="text-red-500">*</span>
            </label>
            <input
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              className="flex-1 h-[40px] border border-gray-300 rounded-md px-3"
            />
          </div>

        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-14">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-primary text-white font-bold rounded-md text-[14px] "
        >
          SAVE
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-[#2f3545] text-white font-bold rounded-md text-[14px] "
        >
          QUIT
        </button>
      </div>

    </div>
  </div>
);

}
