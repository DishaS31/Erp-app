import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddVoucherSeries() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Voucher Series
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="h-[36px] px-5 border border-primary text-primary font-bold rounded-md text-tiny bg-white hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white border rounded-md p-8 w-full max-w-[1000px]">

        <h2 className="text-[16px] font-bold mb-6">General Info</h2>

        {/* SERIES NAME */}
        <FormRow label="Series Name" required />

        {/* DEFAULT BANK */}
        <FormSelect label="Default Bank" placeholder="Choose" />

        {/* VOUCHER TYPE */}
        <FormSelect label="Voucher Type" required />

        {/* VOUCHER NUMBERING */}
        <div className="grid grid-cols-[220px_1fr] items-center mb-6">
          <label className="text-[14px] font-semibold">
            Voucher Numbering <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center gap-8 text-[14px] font-semibold">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="numbering" />
              Automatic
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="numbering" />
              Manual
            </label>
          </div>
        </div>

        {/* SAVE / QUIT */}
        <div className="flex justify-center gap-6 mt-8">
          <button className="px-8 h-[38px] bg-primary text-white font-bold rounded-md text-tiny">
            SAVE
          </button>

          <button className="px-8 h-[38px] bg-[#2d3748] text-white font-bold rounded-md text-tiny">
            QUIT
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const FormRow = ({ label, required }) => (
  <div className="grid grid-cols-[220px_1fr] items-center mb-6">
    <label className="text-[14px] font-semibold">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    <input
      type="text"
      className="h-[36px] border border-[#d1d5db] rounded-md px-4 text-[14px] focus:outline-none focus:ring-1 focus:ring-primary"
    />
  </div>
);

const FormSelect = ({ label, required, placeholder }) => (
  <div className="grid grid-cols-[220px_1fr] items-center mb-6">
    <label className="text-[14px] font-semibold">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    <select
      className="h-[36px] border border-[#d1d5db] rounded-md px-4 text-[14px] bg-white focus:outline-none focus:ring-1 focus:ring-primary"
      defaultValue=""
    >
      <option value="" disabled>
        {placeholder || "Select"}
      </option>
    </select>
  </div>
);
