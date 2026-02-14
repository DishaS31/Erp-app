import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTaxCategory() {
  const navigate = useNavigate();
  const { id } = useParams(); // future use

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Modify Tax Category
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="h-[34px] px-5 border border-primary text-primary font-semibold rounded-md text-sm bg-white hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white p-6 rounded-lg border border-[#d9dee7] w-[720px]">

        <h2 className="font-bold text-[16px] mb-6">
          General Info
        </h2>

        {/* Category Name */}
        <div className="grid grid-cols-[170px_1fr_50px] items-center gap-3 mb-4">
          <label className="text-[14px] font-semibold">
            Category Name
          </label>

          <input
            defaultValue="GST"
            className="h-[36px] border border-[#cfd6e4] rounded-md px-3 text-[14px]"
          />

          <button className="h-[36px] bg-primary text-white font-bold rounded-md">
            #
          </button>
        </div>

        {/* Category Section */}
        <div className="grid grid-cols-[170px_1fr] items-center gap-3 mb-4">
          <label className="text-[14px] font-semibold">
            Category Section
          </label>

          <input
            defaultValue="IGST"
            className="h-[36px] border border-[#cfd6e4] rounded-md px-3 text-[14px]"
          />
        </div>

        {/* Category Type */}
        <div className="grid grid-cols-[170px_1fr] items-center gap-3 mb-4">
          <label className="text-[14px] font-semibold">
            Category Type
          </label>

          <input
            defaultValue="GST Taxpayer"
            className="h-[36px] border border-[#cfd6e4] rounded-md px-3 text-[14px]"
          />
        </div>

        {/* Sub Type */}
        <div className="grid grid-cols-[170px_1fr] items-center gap-3">
          <label className="text-[14px] font-semibold">
            Sub Type
          </label>

          <input
            defaultValue="TAXABLE"
            className="h-[36px] border border-[#cfd6e4] rounded-md px-3 text-[14px]"
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-6 mt-8 ">
        <button className="px-10 h-[36px] bg-primary text-white font-bold rounded-md text-sm">
          SAVE
        </button>

        <button className="px-10 h-[36px] bg-[#2f3747] text-white font-bold rounded-md text-sm">
          QUIT
        </button>
      </div>
    </div>
  );
}
