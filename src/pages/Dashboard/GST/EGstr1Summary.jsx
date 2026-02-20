import React from "react";
import { useNavigate } from "react-router-dom";

const formatINR = (v) =>
  `₹${Number(v || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;


  /* ===== ICON ===== */
const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

const IconBtn = ({ icon, tooltip }) => (
    <div className="relative group">
      <button
        type="button"
        className="p-1 hover:opacity-70 transition"
      >
        <Icon name={icon} className="text-[28px] text-black" />
      </button>

      {/* Tooltip */}
      <div
        className="
          absolute left-1/2 -translate-x-1/2 -top-10
          bg-black text-white text-[12px] px-3 py-1 rounded-md
          opacity-0 group-hover:opacity-100
          pointer-events-none whitespace-nowrap
          transition duration-200
          z-50
        "
      >
        {tooltip}

        {/* Arrow */}
        <div
          className="
            absolute left-1/2 -translate-x-1/2 top-full
            w-0 h-0
            border-l-[6px] border-l-transparent
            border-r-[6px] border-r-transparent
            border-t-[6px] border-t-black
          "
        />
      </div>
    </div>
);
export default function EGstr1Summary() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[26px] font-extrabold text-black">
            eGSTR-1 Summary
          </h1>

          <div className="italic text-[15px] mt-1">
            For: <b>Apr, 2025</b>
          </div>
        </div>

           <div className="flex items-center gap-3">
            <IconBtn icon="refresh" tooltip="Refresh" />
            <IconBtn icon="offline_bolt" tooltip="Power Q" />
            <IconBtn icon="print" tooltip="Print" />
            <IconBtn icon="download" tooltip="Download" />
            <IconBtn icon="share" tooltip="Share" />
            
        <button
          onClick={() => navigate(-1)}
          className="border border-primary text-primary px-4 py-2 rounded-md font-bold hover:bg-primary hover:text-white"
        >
          « Back
        </button>

          </div>

     
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-md border overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-8 bg-[#cfe6e2] font-bold text-[14px] px-4 py-3 border-b">
          <div>Description</div>
          <div>No. of records</div>
          <div>Document Type</div>
          <div>Value (₹)</div>
          <div>Integrated tax (₹)</div>
          <div>Central tax (₹)</div>
          <div>State/UT tax (₹)</div>
          <div>Cess (₹)</div>
        </div>

        {/* SECTION */}
        <Section title="4A-B2B REGULAR" />
        <Row />

        <Section title="4B-B2B REVERSE CHARGE" />
        <Row />

        <Section title="5-B2CL (LARGE)" />
        <Row />

        <Section title="6A-EXPORTS" />
        <Row />

        <Section title="6B-SUPPLIES MADE TO SEZ UNIT" />
        <Row />

        <Section title="14-SUPPLIES MADE THROUGH ECO" />
        <Row />

        <Section title="15-SUPPLIES U/S 9(5)" />
        <Row />

      </div>

      {/* ================= BUTTONS ================= */}
      <div className="flex justify-center gap-6 mt-10">
        <button className="bg-primary text-white px-8 py-3 rounded-md font-bold">
          DOWNLOAD (PDF)
        </button>

        <button className="bg-primary text-white px-8 py-3 rounded-md font-bold">
          GENERATE JSON (GSTR-1)
        </button>

        <button className="bg-primary text-white px-8 py-3 rounded-md font-bold">
          GENERATE JSON (IFF)
        </button>
      </div>

    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

const Section = ({ title }) => (
  <div className="px-4 py-3 font-bold text-[#1e3a8a] border-t bg-[#f7fafc]">
    {title}
  </div>
);

const Row = () => (
  <div className="grid grid-cols-8 px-4 py-3 border-t text-[14px]">
    <div>Total</div>
    <div>0</div>
    <div>Invoice</div>
    <div>₹0.00</div>
    <div>₹0.00</div>
    <div>₹0.00</div>
    <div>₹0.00</div>
    <div>₹0.00</div>
  </div>
);
