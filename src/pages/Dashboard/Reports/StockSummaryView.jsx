import React, { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useLocation, useNavigate } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

const formatINR = (value) => {
  if (!value) return "₹ 0.00";
  return `₹ ${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

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

export default function StockSummaryView() {
  const gridRef = useRef(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  const stockItem = state?.stockItem || "Ball Pen";

  /* ================= DATA ================= */
  const rowData = useMemo(() => [
    { month: "Apr, 2025", uom: "BOX", debitQty: 0, debitAmt: 0, creditQty: 0, creditAmt: 0, balQty: 0, balVal: 0 },
    { month: "May, 2025", uom: "BOX", debitQty: 0, debitAmt: 0, creditQty: 0, creditAmt: 0, balQty: 0, balVal: 0 },
    { month: "Jun, 2025", uom: "BOX", debitQty: 0, debitAmt: 0, creditQty: 0, creditAmt: 0, balQty: 0, balVal: 0 },
    { month: "Jul, 2025", uom: "BOX", debitQty: 0, debitAmt: 0, creditQty: 0, creditAmt: 0, balQty: 0, balVal: 0 },
    { month: "Aug, 2025", uom: "BOX", debitQty: 0, debitAmt: 0, creditQty: 0, creditAmt: 0, balQty: 0, balVal: 0 },
    { month: "Sep, 2025", uom: "BOX", debitQty: 0, debitAmt: 0, creditQty: 0, creditAmt: 0, balQty: 0, balVal: 0 },
    { month: "Oct, 2025", uom: "BOX", debitQty: 0, debitAmt: 0, creditQty: 0, creditAmt: 0, balQty: 0, balVal: 0 },
    { month: "Nov, 2025", uom: "BOX", debitQty: 0, debitAmt: 0, creditQty: 0, creditAmt: 0, balQty: 0, balVal: 0 },
    { month: "Dec, 2025", uom: "BOX", debitQty: 0, debitAmt: 0, creditQty: 0, creditAmt: 0, balQty: 0, balVal: 0 },
    { month: "Jan, 2026", uom: "BOX", debitQty: 0, debitAmt: 0, creditQty: 0, creditAmt: 0, balQty: 0, balVal: 0 },
    { month: "Feb, 2026", uom: "BOX", debitQty: 0, debitAmt: 0, creditQty: 0, creditAmt: 0, balQty: 0, balVal: 0 },
    { month: "Mar, 2026", uom: "BOX", debitQty: 0, debitAmt: 0, creditQty: 0, creditAmt: 0, balQty: 0, balVal: 0 },
    {
      isTotal: true,
      month: "Total",
      uom: "",
      debitQty: 0,
      debitAmt: 0,
      creditQty: 0,
      creditAmt: 0,
      balQty: 0,
      balVal: 0,
    },
  ], []);

  const columnDefs = useMemo(() => [
    {
      headerName: "Month (FY: 2025-26)",
      field: "month",
      flex: 1.2,
    },
    {
      headerName: "UOM",
      field: "uom",
      width: 100,
    },
    {
      headerName: "Debit",
      marryChildren: true,
       headerClass: "ag-header-cell", 
      children: [
        { headerName: "Qty", field: "debitQty",  },
        {
          headerName: "Amount",
          field: "debitAmt",
     
          cellRenderer: (p) => <span className="float-right">{formatINR(p.value)}</span>,
        },
      ],
    },
    {
      headerName: "Credit",
      marryChildren: true,
       headerClass: "ag-header-cell", 
      children: [
        { headerName: "Qty", field: "creditQty", },
        {
          headerName: "Amount",
          field: "creditAmt",
          cellRenderer: (p) => <span className="float-right">{formatINR(p.value)}</span>,
        },
      ],
    },
    {
      headerName: "Balance",
      children: [
        { headerName: "Qty", field: "balQty", width: 120 },
        {
          headerName: "Value",
          field: "balVal",
          width: 150,
          cellRenderer: (p) => <span className="float-right">{formatINR(p.value)}</span>,
        },
      ],
    },
  ], []);

  const defaultColDef = {
    resizable: true,
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-1">
        <div>
          <h1 className="text-[28px] font-extrabold text-black">
            Item Summary
          </h1>
          <div className="text-[14px] italic ">
            Item: <span className="font-semibold text-black">{stockItem}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
            <IconBtn icon="offline_bolt" tooltip="Power Q" />
            <IconBtn icon="print" tooltip="Print" />
            <IconBtn icon="download" tooltip="Download" />
            <IconBtn icon="share" tooltip="Share" />

          <button
            onClick={() => navigate(-1)}
            className="ml-3 border border-primary text-primary px-5 py-1 rounded-md font-bold hover:bg-primary hover:text-white transition"
          >
            Back
          </button>
        </div>
        
      </div>
         <div className="flex justify-end mt-0">
        <button className="bg-primary text-white px-6 py-2 rounded-md font-bold text-[13px]">
          Opening Balance
        </button>
      </div>

      {/* ================= VALUATION ================= */}
      <div className="mb-4">
        <div className="inline-flex border rounded-md overflow-hidden bg-white text-black">
          <span className="px-4 py-2 bg-gray-100 font-semibold text-[13px]">
            Valuation
          </span>
          <select className="px-4 py-2 text-[13px] outline-none">
            <option>FIFO</option>
            <option>Average</option>
          </select>
        </div>
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="flex items-center gap-3 px-4 py-2 border bg-white text-[13px] rounded-t-md">
        <span className="font-semibold">Filter:</span>
        <input
          placeholder="Enter your keyword"
          className="h-[30px] px-3 border rounded-md w-[240px]"
        />
        <select className="h-[30px] px-2 border rounded-md">
          <option>Month (FY: 2025-26)</option>
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
             rowSelection="single"
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            domLayout="autoHeight"
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

      {/* ================= CLOSING BALANCE BUTTON ================= */}
      <div className="flex justify-end mt-6">
        <button className="bg-primary text-white px-6 py-2 rounded-md font-bold text-[13px]">
          Closing Balance
        </button>
      </div>

    </div>
  );
}
