import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProjectGroup() {
  const navigate = useNavigate();
  const { id } = useParams(); // future use ke liye

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Edit Project Group
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

      {/* ===== FORM CARD ===== */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl p-10 max-w-[1000px] mx-auto">

        <div className="space-y-6">

          {/* NAME */}
          <div className="grid grid-cols-[200px_1fr] items-center gap-6">
            <label className="text-[15px] font-semibold text-[#31374a]">
              Name
            </label>
            <input
              type="text"
              defaultValue="Test Group New"
              className="h-[42px] px-4 border border-[#d6d9e0]
                         rounded-md outline-none focus:border-primary"
            />
          </div>

          {/* ALIAS */}
          <div className="grid grid-cols-[200px_1fr] items-center gap-6">
            <label className="text-[15px] font-semibold text-[#31374a]">
              Alias
            </label>
            <input
              type="text"
              defaultValue="Test Group new"
              className="h-[42px] px-4 border border-[#d6d9e0]
                         rounded-md outline-none focus:border-primary"
            />
          </div>

          {/* UNDER GROUP */}
          <div className="grid grid-cols-[200px_1fr] items-center gap-6">
            <label className="text-[15px] font-semibold text-[#31374a]">
              Under Group
            </label>
            <select
              className="h-[42px] px-4 border border-[#d6d9e0]
                         rounded-md outline-none focus:border-primary"
            >
              <option>Select Group</option>
            </select>
          </div>

        </div>
      </div>

      {/* ===== BUTTONS ===== */}
      <div className="flex justify-center gap-6 mt-8">
        <button className="h-[42px] px-10 bg-primary text-white font-bold rounded-md">
          UPDATE
        </button>

        <button
          onClick={() => navigate(-1)}
          className="h-[42px] px-10 bg-[#2d3748] text-white font-bold rounded-md"
        >
          QUIT
        </button>
      </div>

    </div>
  );
}
