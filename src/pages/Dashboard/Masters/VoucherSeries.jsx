import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

/* ===== ICON ===== */
const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`}>
    {name}
  </span>
);

/* ===== ICON BUTTON ===== */
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

export default function VoucherSeries() {
  const gridRef = useRef(null);
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");

  /* ===== DUMMY DATA ===== */
  const rowData = useMemo(() => [], []);

  const columnDefs = useMemo(
    () => [
         {
      headerName: "",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 120,
    },
      { headerName: "Series Name", field: "series", flex: 1.5 },
      { headerName: "Voucher Numbering", field: "numbering", flex: 1.5 },
      { headerName: "No. of Vouchers", field: "count", width: 180 },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: false,
      filter: false,
      resizable: true,
    }),
    []
  );

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-[28px] font-extrabold text-black">
          Voucher Series
        </h1>

        <div className="flex items-center gap-2">
          <IconBtn icon="refresh" tooltip="Refresh" />
          <IconBtn icon="offline_bolt" tooltip="Power Q" />
          <IconBtn icon="print" tooltip="Print" />
          <IconBtn icon="download" tooltip="Download" />
          <IconBtn icon="share" tooltip="Share" />
        </div>
      </div>

      {/* ================= ACTION BAR ================= */}
      <div className="flex items-center gap-3 mb-4">

        <button
        onClick={() => navigate("/company/dashboard/masters/voucher-series/add")}
        className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
        Add Series
        </button>


        <button
        onClick={() =>
            navigate("/company/dashboard/masters/voucher-series/edit/1")
        }
        className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
        Edit Series
        </button>


        <button className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny">
          Delete Series
        </button>

        {/* RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-3">

        {/* VOUCHER TYPE */}
        <div className="flex items-center h-[40px] bg-white border border-[#cfd6e4] rounded-md overflow-hidden w-[250px]">

        {/* Left Static Part */}
        <div className="w-[120px] h-full flex items-center justify-center bg-[#f3f6fb] border-r border-[#cfd6e4] text-[13px] font-bold text-[#31374a]">
            Voucher
        </div>

        {/* Right Select */}
        <select
            className="
            flex-1 h-full px-4
            text-[13px] font-semibold
            outline-none bg-white
            cursor-pointer text-[#31374a]
            "
            defaultValue="Contra"
        >
            <option>Contra</option>
            <option>Credit Note</option>
            <option>Debit Note</option>
            <option>Consignment Packing</option>
            <option>Journal</option>
            <option>Material In</option>
            <option>Material Out</option>
            <option>Memorandum</option>
            <option>Payment</option>
            <option>Physical Stock</option>
            <option>Purchase</option>
            <option>Purchase Order</option>
            <option>Receipt</option>
            <option>Production</option>
            <option>Stock Transfer</option>
            <option>Reverse Journal</option>
            <option>Quotation</option>
            <option>Sales</option>
            <option>Sales Order</option>
            <option>Stock Journal</option>
        </select>

        </div>


          <button
            onClick={() => navigate(-1)}
            className="
              h-[36px] px-4 border border-primary text-primary font-bold
              rounded-md text-tiny bg-white hover:bg-primary hover:text-white transition
            "
          >
            « Back
          </button>
        </div>
      </div>

      {/* ================= FILTER ================= */}
      <div className="flex items-center gap-3 bg-white border border-b-0 rounded-t-md px-3 py-2">
        <span className="font-bold text-[13px]">Filter:</span>

        <input
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Enter your keyword"
          className="h-[32px] w-[220px] px-3 border rounded-md text-[13px]"
        />

        <select className="h-[32px] px-4 border rounded-md font-semibold text-tiny">
          <option>Contains</option>
          <option>Begins With</option>
          <option>Ends With</option>
        </select>
      </div>

      {/* ================= GRID ================= */}
      <div className="bg-white border border-t-0 rounded-b-md overflow-hidden">

        <div
          className="ag-theme-alpine  daybook-grid balance-grid"
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
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            headerHeight={34}
            rowHeight={32}
            domLayout="autoHeight"
            theme="legacy"
            rowSelection="single"
          />
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex items-center justify-between px-4 py-2 border-t text-[14px]">
          <div className="flex items-center gap-2">
            <button className="text-xl px-2 opacity-60">«</button>
            <button className="text-xl px-2 opacity-60">‹</button>

            <span>Page</span>

            <input
              value={0}
              readOnly
              className="w-[40px] h-[26px] border text-center rounded"
            />

            <span>of 0</span>

            <button className="text-xl px-2 opacity-60">›</button>
            <button className="text-xl px-2 opacity-60">»</button>

            <select className="ml-2 h-[28px] px-2 border rounded-md font-semibold">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>

          <div>No rows to display.</div>
        </div>

      </div>
    </div>
  );
}
