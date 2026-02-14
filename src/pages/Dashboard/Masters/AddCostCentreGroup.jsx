import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddCostCentreGroup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Add Cost Centre Group
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="h-[36px] px-4 border border-primary text-primary
                     font-bold rounded-md text-tiny bg-white
                     hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

{/* ===== FORM ===== */}
<div className="max-w-[850px]">

  {/* NAME */}
  <div className="flex items-center mb-5">
    <label className="w-[180px] font-semibold text-[15px]">
      Name <span className="text-red-500">*</span>
    </label>

    <input
      type="text"
      className="flex-1 h-[42px] px-4 border border-[#d6d9e0]
                 rounded-md bg-white text-[14px] outline-none
                 focus:border-primary"
    />
  </div>

  {/* ALIAS */}
  <div className="flex items-center mb-5">
    <label className="w-[180px] font-semibold text-[15px]">
      Alias <span className="text-red-500">*</span>
    </label>

    <input
      type="text"
      className="flex-1 h-[42px] px-4 border border-[#d6d9e0]
                 rounded-md bg-white text-[14px] outline-none
                 focus:border-primary"
    />
  </div>

  {/* UNDER */}
  <div className="flex items-center mb-8">
    <label className="w-[180px] font-semibold text-[15px]">
      Under
    </label>

    <input
      type="text"
      className="flex-1 h-[42px] px-4 border border-[#d6d9e0]
                 rounded-md bg-white text-[14px] outline-none
                 focus:border-primary"
    />
  </div>

  {/* BUTTONS */}
  <div className="flex items-center gap-4 ml-[180px]">
    <button className="h-[40px] px-8 bg-primary text-white font-bold rounded-md text-[14px]">
      SAVE
    </button>

    <button
      onClick={() => navigate(-1)}
      className="h-[40px] px-8 bg-[#2d3748] text-white font-bold rounded-md text-[14px]"
    >
      QUIT
    </button>
  </div>

</div>

    </div>
  );
}
