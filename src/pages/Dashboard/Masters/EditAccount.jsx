import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAccount() {
  const navigate = useNavigate();
  const { id } = useParams(); // 👈 account id

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Update Account
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="h-[34px] px-4 border border-primary text-primary font-semibold rounded-md text-sm bg-white hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* GENERAL INFO */}
          <Card title="General Info">
            <FormRow label="Name" required defaultValue="APICAP SCIENTIFIC" />
            <FormRow label="Alias" required defaultValue="APICAP SCIENTIFIC" />
            <FormRow label="Print Name" required defaultValue="APICAP SCIENTIFIC" />

            <RadioRow label="Primary" name="primary" />

            <FormRow label="Group" defaultValue="Trade payable" />
          </Card>

          {/* CONTACT DETAILS */}
          <Card title="Contact Details">
            <FormRow label="Email" />
            <FormRow label="Mobile No." />
            <FormRow label="Whatsapp No." />
          </Card>

          {/* PAY DETAILS */}
          <Card title="Pay Details">
            <BalanceRow label="Op. Bal" />
            <BalanceRow label="P.Y. Bal" />
            <BalanceRow label="MEMO OP. Bal" />
          </Card>

          {/* OTHER TAX DETAILS */}
          <Card title="Other Tax Details">
            <FormRow label="Aadhar No" />
            <FormRow label="Pan No" defaultValue="AIFL0059O" />
            <FormRow label="Tan No" />
            <FormRow label="IT Jurd" />
          </Card>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          <Card title="Address">
            <FormRow label="Address Line 1" />
            <FormRow label="Address Line 2" />
            <FormRow label="City" />
            <FormRow label="Pin Code" />
            <FormRow label="State" />
            <FormRow label="Country" defaultValue="India" />
          </Card>

          <Card title="GST Details">
            <FormRow label="TaxPayer Category" required defaultValue="GST" />
            <FormRow label="HSN" />
            <FormRow label="GSTIN/UIN" defaultValue="19AAIFL0059O1ZO" />

            <RadioRow label="SEZ UNIT" name="sez" />
          </Card>

        </div>
      </div>

      {/* SAVE / QUIT */}
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

/* ===== CARD ===== */
const Card = ({ title, children }) => (
  <div className="bg-white border rounded-lg p-6">
    <h2 className="text-[16px] font-bold mb-4">{title}</h2>
    {children}
  </div>
);

/* ===== FORM ROW ===== */
const FormRow = ({ label, required, defaultValue }) => (
  <div className="grid grid-cols-[180px_1fr] items-center mb-4">
    <label className="text-[14px] font-semibold">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    <input
      type="text"
      defaultValue={defaultValue}
      className="h-[34px] border border-[#d1d5db] rounded-md px-3 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#27AE60]"
    />
  </div>
);

/* ===== RADIO ROW ===== */
const RadioRow = ({ label, name }) => (
  <div className="grid grid-cols-[180px_1fr] items-center mb-4">
    <label className="text-[14px] font-semibold">{label}</label>

    <div className="flex gap-6 text-[14px]">
      <label className="flex items-center gap-2">
        <input type="radio" name={name} className="w-[14px] h-[14px]" />
        Yes
      </label>

      <label className="flex items-center gap-2">
        <input type="radio" name={name} className="w-[14px] h-[14px]" defaultChecked />
        No
      </label>
    </div>
  </div>
);

/* ===== BALANCE ROW ===== */
const BalanceRow = ({ label }) => (
  <div className="grid grid-cols-[180px_1fr_auto] items-center mb-4 gap-3">
    <label className="text-[14px] font-semibold">{label}</label>

    <div className="flex items-center border rounded-md h-[34px]">
      <input
        type="text"
        defaultValue="0"
        className="flex-1 px-3 text-[14px] outline-none"
      />
      <div className="flex gap-4 px-3 text-[14px]">
        <label className="flex items-center gap-1">
          <input type="radio" name={label} /> Cr.
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name={label} defaultChecked /> Dr.
        </label>
      </div>
    </div>

    <button className="px-4 h-[34px] bg-primary text-white text-sm rounded-md font-semibold">
      Update
    </button>
  </div>
);
