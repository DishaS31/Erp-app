import React, { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useLocation, useNavigate } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

/* ===== ICON ===== */
const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`}>
    {name}
  </span>
);

/* ===== TOOLTIP ICON BUTTON ===== */
const IconBtn = ({ icon, tooltip }) => {
  return (
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
};

const formatINR = (value) => {
  if (!value) return "₹ 0.00";
  return `₹ ${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export default function AccountSummaryView() {
  const gridRef = useRef(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  const accountName = state?.account || "Sales Account";

  /* ================= GRID DATA ================= */
  const rowData = useMemo(
    () => [
      { month: "April", debit: 0, credit: 0, balance: 0, type: "DR." },
      { month: "May", debit: 0, credit: 0, balance: 0, type: "DR." },
      { month: "June", debit: 0, credit: 0, balance: 0, type: "DR." },
      { month: "July", debit: 0, credit: 0, balance: 0, type: "DR." },
      { month: "August", debit: 0, credit: 0, balance: 0, type: "DR." },
      { month: "September", debit: 0, credit: 0, balance: 0, type: "DR." },
      { month: "October", debit: 0, credit: 0, balance: 0, type: "DR." },
      { month: "November", debit: 0, credit: 0, balance: 0, type: "DR." },
      { month: "December", debit: 0, credit: 0, balance: 0, type: "DR." },
      { month: "January", debit: 0, credit: 0, balance: 0, type: "DR." },
      { month: "February", debit: 0, credit: 0, balance: 0, type: "DR." },
      { month: "March", debit: 0, credit: 0, balance: 0, type: "DR." },
      {
        isTotal: true,
        month: "Total",
        debit: 0,
        credit: 0,
        balance: 0,
        type: "",
      },
    ],
    []
  );

  const columnDefs = useMemo(
    () => [
      {
        headerName: "MONTH (FY: 2025-26)",
        field: "month",
        flex: 1,
      },
      {
        headerName: "DEBIT (₹)",
        field: "debit",
        flex: 1,   
        cellRenderer: (p) => (
          <span className="float-right">{formatINR(p.value)}</span>
        ),
      },
      {
        headerName: "CREDIT (₹)",
        field: "credit",
        flex: 1,
        cellRenderer: (p) => (
          <span className="float-right">{formatINR(p.value)}</span>
        ),
      },
      {
        headerName: "BALANCE (₹)",
        field: "balance",
        flex: 1,
        cellRenderer: (p) => (
          <span className="float-right">{formatINR(p.value)}</span>
        ),
      },
      {
        headerName: "",
        field: "type",
        width: 180,
      },
    ],
    []
  );

  const defaultColDef = {
    resizable: true,
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">
      {/* ================= HEADER ================= */}

<div className="flex justify-between items-start mb-5">

  {/* LEFT SIDE */}
  <div>
    <h1 className="text-[28px] font-extrabold text-[#111827]">
      Account Summary
    </h1>

    <div className="text-[15px] italic text-[#374151] mt-1">
      Account: <span className="font-semibold text-black">{accountName}</span>
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="flex flex-col items-end gap-3">

    {/* ICONS + OPENING BALANCE */}
    <div className="flex items-center gap-4">
            <IconBtn icon="offline_bolt" tooltip="Power Q" />
            <IconBtn icon="print" tooltip="Print" />
            <IconBtn icon="download" tooltip="Download" />
            <IconBtn icon="share" tooltip="Share" />
    </div>
        <div className="ml-6 text-[15px] italic text-[#374151]">
        Opening Balance:{" "}
        <span className="font-semibold text-black">₹0.00 DR</span>
      </div>

    {/* VIEW + BACK */}
    <div className="flex items-center gap-3">

      {/* View Dropdown */}
      <div className="flex items-center border border-[#cfd6e4] rounded-md overflow-hidden h-[36px] bg-white">
        <div className="px-4 py-2 bg-[#f3f6fb] border-r text-[13px] font-bold">
          View
        </div>

        <select
          className="px-4 h-full outline-none text-[13px] font-semibold bg-white"
        >
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="
          h-[36px] px-5
          border border-primary
          text-primary
          font-bold
          rounded-md
          text-[13px]
          hover:bg-primary
          hover:text-white
          transition
        "
      >
        Back
      </button>

    </div>
  </div>
</div>


      {/* ================= FILTER BAR ================= */}
      <div className="flex items-center gap-2 px-3 py-2 border bg-white text-[13px]">
        <span className="font-semibold">Filter:</span>
        <input
          placeholder="Enter your keyword"
          className="h-[30px] px-3 border rounded-md w-[240px]"
        />
        <select className="h-[30px] px-2 border rounded-md">
          <option>MONTH (FY: 2025-26)</option>
        </select>
        <select className="h-[30px] px-2 border rounded-md">
          <option>Contains</option>
        </select>
      </div>

      {/* ================= GRID ================= */}
      <div className="bg-white border border-t-0 rounded-b-md">
        <div
        className="ag-theme-alpine daybook-grid balance-grid"
        style={{
          width: "100%",
          height: "auto",
          "--ag-foreground-color": "#333",        // ✅ text color
          "--ag-header-background-color": "#f3f4fb",
          "--ag-header-foreground-color": "#111827",
          "--ag-background-color": "#ffffff",
          "--ag-border-color": "#e5e7eb",
          "--ag-row-hover-color": "#f5f5f5",
          "--ag-font-size": "13px",               // ✅ font size
          "--ag-font-family":
            '"Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
          "--ag-selected-row-background-color":
            "rgb(var(--color-primary) / 0.12)",
        }}
        >
          <AgGridReact
            ref={gridRef}
              theme="legacy"
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            domLayout="autoHeight"
            rowSelection="single"
            headerHeight={34}
            rowHeight={32}
            getRowStyle={(params) => {
              if (params.data?.isTotal) {
                return {
                  background: "#e6f0f7",
                  fontWeight: "bold",
                };
              }

              return null;
            }}
          />
        </div>
      </div>
    </div>
  );
}
