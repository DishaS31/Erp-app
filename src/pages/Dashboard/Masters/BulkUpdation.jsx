import React from "react";
import { useNavigate } from "react-router-dom";

export default function BulkUpdation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* ===== TITLE ===== */}
      <h1 className="text-[30px] font-extrabold text-[#141824] mb-10">
        Bulk Updation
      </h1>

      {/* ===== STEP PROGRESS ===== */}
      <div className="relative mb-14">

        {/* Progress Line */}
        <div className="absolute top-[26px] left-0 w-full h-[2px] bg-[#2f5d93]" />

        <div className="flex justify-between relative z-10">

          {/* STEP 1 (ACTIVE) */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-[#22a000] text-white
                            flex items-center justify-center
                            text-[26px] font-extrabold shadow-md">
              1
            </div>
          </div>

          {/* STEP 2 */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-[#2f5d93] text-white
                            flex items-center justify-center
                            text-[26px] font-extrabold">
              2
            </div>
          </div>

          {/* STEP 3 */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-[#2f5d93] text-white
                            flex items-center justify-center
                            text-[26px] font-extrabold">
              3
            </div>
          </div>

        </div>
      </div>

      {/* ===== ADD MODULE CARD ===== */}
      <div className="bg-[#f8f9fb] border border-[#e3e6ef] rounded-xl p-10 max-w-[1250px]">

        <h2 className="text-[22px] font-extrabold text-[#141824] mb-10">
          Add Module
        </h2>

        <div className="grid grid-cols-4 gap-10 items-end">

          {/* MODULE */}
          <div>
            <label className="block text-[14px] font-bold text-[#3e465b] mb-2">
              Module
            </label>
            <select className="w-full h-[42px] px-4 border border-[#cbd0dd]
                               rounded-md bg-white text-[#141824]
                               font-semibold text-[14px]
                               outline-none focus:border-primary">
              <option>Vouchers</option>
              <option>Masters</option>
            </select>
          </div>

          {/* MASTER */}
          <div>
            <label className="block text-[14px] font-bold text-[#3e465b] mb-2">
              Master
            </label>
            <select className="w-full h-[42px] px-4 border border-[#cbd0dd]
                               rounded-md bg-white text-[#141824]
                               font-semibold text-[14px]
                               outline-none focus:border-primary">
              <option>Select Master</option>
            </select>
          </div>

          {/* SUB MASTER */}
          <div>
            <label className="block text-[14px] font-bold text-[#3e465b] mb-2">
              Sub Master
            </label>
            <select className="w-full h-[42px] px-4 border border-[#cbd0dd]
                               rounded-md bg-white text-[#141824]
                               font-semibold text-[14px]
                               outline-none focus:border-primary">
              <option>Select Sub Master</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end">
            <button
              className="h-[42px] px-10 bg-primary text-white
                         text-[14px] font-extrabold
                         rounded-md hover:opacity-90 transition"
            >
              Submit
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
