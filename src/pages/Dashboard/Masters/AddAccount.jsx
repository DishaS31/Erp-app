import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddAccount() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6 text-black">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold">
          Add A Account
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="h-[34px] px-4 border border-primary text-primary font-semibold rounded-md text-sm bg-white hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

      {/* ================= CHECKBOX OPTIONS ================= */}
      <div className="flex gap-8 text-[14px] font-medium mb-6">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-[15px] h-[15px]" />
          Update Bill By Bill Balance
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-[15px] h-[15px]" />
          Update Sub Ledger Balance
        </label>
      </div>

      {/* ================= TWO COLUMN LAYOUT ================= */}
      <div className="grid grid-cols-2 gap-6">

        {/* ================= LEFT SIDE ================= */}
        <div className="space-y-6">

          {/* GENERAL INFO */}
          <Card title="General Info">

            <InputWithHash label="Name" required />
            <InputWithHash label="Alias" required />
            <InputWithHash label="Print Name" required />

            {/* PRIMARY */}
            <div className="grid grid-cols-[180px_1fr] items-center mb-4">
              <label className="text-[14px] font-semibold">
                Primary <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-6 text-[14px]">
                <label className="flex items-center gap-2">
                  <input type="radio" name="primary" className="w-[14px] h-[14px]" defaultChecked />
                  Yes
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="primary" className="w-[14px] h-[14px]" />
                  No
                </label>
              </div>
            </div>

            {/* PARENT GROUP (Dropdown style) */}
            <div className="grid grid-cols-[180px_1fr] items-center">
              <label className="text-[14px] font-semibold">
                Parent Group
              </label>

              <select className="h-[34px] border border-[#d1d5db] rounded-md px-3 text-[14px] bg-white">
                <option>Choose</option>
              </select>
            </div>

          </Card>

          {/* CONTACT DETAILS */}
          <Card title="Contact Details">

            <FormRow label="Email" />

            {/* CONTACT NO (two inputs side by side) */}
            <div className="grid grid-cols-[180px_1fr] mb-4">
              <label className="text-[14px] font-semibold">
                Contact No.
              </label>

              <div className="flex gap-4">
                <div className="flex-1">
                  <input className="w-full h-[34px] border border-[#d1d5db] rounded-md px-3 text-[14px]" />
                  <div className="text-[12px] mt-1 text-gray-500">Mobile No.</div>
                </div>

                <div className="flex-1">
                  <input className="w-full h-[34px] border border-[#d1d5db] rounded-md px-3 text-[14px]" />
                  <div className="text-[12px] mt-1 text-gray-500">Whatsapp No.</div>
                </div>
              </div>
            </div>

          </Card>

          {/* PAY DETAILS */}
          <Card title="Pay Details">
            <BalanceRow label="OP. Bal" />
            <BalanceRow label="P.Y. Bal" />
            <BalanceRow label="MEMO OP. Bal" />
          </Card>

          {/* OTHER TAX DETAILS */}
          <Card title="Other Tax Details">
            <FormRow label="Aadhar No" />
            <FormRow label="Pan No" />
            <FormRow label="Tan No" />
            <FormRow label="IT Jurd" />
          </Card>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="space-y-6">

          {/* ADDRESS */}
          <Card title="Address">
            <FormRow label="Address Line 1" />
            <FormRow label="Address Line 2" />
            <FormRow label="City" />
            <FormRow label="Pin Code" />
            <FormRow label="State" />
            <FormRow label="Country" />
          </Card>

          {/* GST DETAILS */}
          <Card title="GST Details">
            <FormRow label="TaxPayer Category" required />
            <FormRow label="HSN" />
            <FormRow label="GSTIN/UIN" />

            <div className="grid grid-cols-[180px_1fr] items-center">
              <label className="text-[14px] font-semibold">
                SEZ UNIT
              </label>

              <div className="flex gap-6 text-[14px]">
                <label className="flex items-center gap-2">
                  <input type="radio" name="sez" className="w-[14px] h-[14px]" />
                  Yes
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="sez" className="w-[14px] h-[14px]" defaultChecked />
                  No
                </label>
              </div>
            </div>
          </Card>

        </div>
      </div>

      {/* ================= SAVE / QUIT ================= */}
      <div className="flex justify-center gap-6 mt-8">
        <button className="px-8 h-[38px] bg-primary text-white font-bold rounded-md text-sm">
          SAVE
        </button>

        <button className="px-8 h-[38px] bg-[#2d3748] text-white font-bold rounded-md text-sm">
          QUIT
        </button>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Card = ({ title, children }) => (
  <div className="bg-white border border-[#e5e7eb] rounded-lg p-6">
    <h2 className="text-[16px] font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const FormRow = ({ label, required }) => (
  <div className="grid grid-cols-[180px_1fr] items-center mb-4">
    <label className="text-[14px] font-semibold">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    <input
      type="text"
      className="h-[34px] border border-[#d1d5db] rounded-md px-3 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#27AE60]"
    />
  </div>
);

const InputWithHash = ({ label, required }) => (
  <div className="grid grid-cols-[180px_1fr_40px] items-center mb-4">
    <label className="text-[14px] font-semibold">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    <input
      type="text"
      className="h-[34px] border border-[#d1d5db] rounded-l-md px-3 text-[14px]"
    />

    <button className="h-[34px] bg-primary text-white rounded-r-md text-[14px] font-bold">
      #
    </button>
  </div>
);

const BalanceRow = ({ label }) => (
  <div className="grid grid-cols-[180px_1fr] items-center mb-4">
    <label className="text-[14px] font-semibold">{label}</label>

    <div className="flex">
      <input
        defaultValue="0.00"
        className="flex-1 h-[34px] border border-[#d1d5db] rounded-l-md px-3 text-[14px]"
      />

      <div className="flex items-center gap-4 px-4 border border-l-0 border-[#d1d5db] rounded-r-md text-[14px]">
        <label className="flex items-center gap-1">
          <input type="radio" name={label} /> Cr.
        </label>

        <label className="flex items-center gap-1">
          <input type="radio" name={label} defaultChecked /> Dr.
        </label>
      </div>
    </div>
  </div>
);
