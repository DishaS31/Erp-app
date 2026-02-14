import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Add Project
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

      {/* ================= MAIN CONTAINER (CENTERED) ================= */}
      <div className="max-w-[1050px] mx-auto">

        {/* ===== GENERAL INFO CARD ===== */}
        <div className="bg-white border border-[#d6d9e0] rounded-lg p-8 mb-8">

          <div className="grid grid-cols-[160px_1fr] gap-y-6 gap-x-8">

            <label className="font-semibold text-[14px] self-center">
              Name <span className="text-red-500">*</span>
            </label>
            <input className="h-[40px] px-4 border border-[#d6d9e0] rounded-md outline-none focus:border-primary" />

            <label className="font-semibold text-[14px] self-center">
              Alias
            </label>
            <input className="h-[40px] px-4 border border-[#d6d9e0] rounded-md outline-none focus:border-primary" />

            <label className="font-semibold text-[14px] self-center">
              Print Name
            </label>
            <input className="h-[40px] px-4 border border-[#d6d9e0] rounded-md outline-none focus:border-primary" />

            <label className="font-semibold text-[14px] self-center">
              Group
            </label>
            <select className="h-[40px] px-4 border border-[#d6d9e0] rounded-md outline-none focus:border-primary">
              <option>Select Group</option>
            </select>

          </div>
        </div>

        {/* ===== LIABILITY + ASSETS CARD ===== */}
        <div className="bg-white border border-[#d6d9e0] rounded-lg p-8">

          <div className="grid grid-cols-2 gap-12">

            {/* ================= LIABILITY ================= */}
            <div>
              <h3 className="text-[18px] font-bold mb-6">Liability</h3>

              {/* OP BAL */}
              <div className="mb-5">
                <label className="block text-[14px] mb-2">Op. Balance</label>
                <div className="flex">
                  <input className="flex-1 h-[38px] px-4 border border-[#d6d9e0] rounded-l-md outline-none" />
                  <div className="flex items-center gap-4 px-4 border border-l-0 border-[#d6d9e0] h-[38px] rounded-r-md bg-[#f8f9fb]">
                    <label className="text-[14px] flex items-center gap-1">
                      <input type="radio" name="lOp" /> Cr.
                    </label>
                    <label className="text-[14px] flex items-center gap-1">
                      <input type="radio" name="lOp" defaultChecked /> Dr.
                    </label>
                  </div>
                </div>
              </div>

              {/* PY BAL */}
              <div>
                <label className="block text-[14px] mb-2">Py. Balance</label>
                <div className="flex">
                  <input className="flex-1 h-[38px] px-4 border border-[#d6d9e0] rounded-l-md outline-none" />
                  <div className="flex items-center gap-4 px-4 border border-l-0 border-[#d6d9e0] h-[38px] rounded-r-md bg-[#f8f9fb]">
                    <label className="text-[14px] flex items-center gap-1">
                      <input type="radio" name="lPy" /> Cr.
                    </label>
                    <label className="text-[14px] flex items-center gap-1">
                      <input type="radio" name="lPy" defaultChecked /> Dr.
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= ASSETS ================= */}
            <div>
              <h3 className="text-[18px] font-bold mb-6">Assets</h3>

              {/* OP BAL */}
              <div className="mb-5">
                <label className="block text-[14px] mb-2">Op. Balance</label>
                <div className="flex">
                  <input className="flex-1 h-[38px] px-4 border border-[#d6d9e0] rounded-l-md outline-none" />
                  <div className="flex items-center gap-4 px-4 border border-l-0 border-[#d6d9e0] h-[38px] rounded-r-md bg-[#f8f9fb]">
                    <label className="text-[14px] flex items-center gap-1">
                      <input type="radio" name="aOp" /> Cr.
                    </label>
                    <label className="text-[14px] flex items-center gap-1">
                      <input type="radio" name="aOp" defaultChecked /> Dr.
                    </label>
                  </div>
                </div>
              </div>

              {/* PY BAL */}
              <div>
                <label className="block text-[14px] mb-2">Py. Balance</label>
                <div className="flex">
                  <input className="flex-1 h-[38px] px-4 border border-[#d6d9e0] rounded-l-md outline-none" />
                  <div className="flex items-center gap-4 px-4 border border-l-0 border-[#d6d9e0] h-[38px] rounded-r-md bg-[#f8f9fb]">
                    <label className="text-[14px] flex items-center gap-1">
                      <input type="radio" name="aPy" /> Cr.
                    </label>
                    <label className="text-[14px] flex items-center gap-1">
                      <input type="radio" name="aPy" defaultChecked /> Dr.
                    </label>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ===== BUTTONS ===== */}
          <div className="flex justify-center gap-6 mt-10">
            <button className="h-[38px] px-8 bg-primary text-white font-bold rounded-md text-[14px]">
              SAVE
            </button>

            <button
              onClick={() => navigate(-1)}
              className="h-[38px] px-8 bg-[#2d3748] text-white font-bold rounded-md text-[14px]"
            >
              QUIT
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
