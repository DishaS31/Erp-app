import React, { useMemo, useRef, useState, useEffect } from "react";
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

const IconBtn = ({ icon, tooltip }) => (
  <div className="relative group">
    <button type="button" className="p-1 hover:opacity-70 transition">
      <Icon name={icon} className="text-[28px] text-black" />
    </button>

    <div className="absolute left-1/2 -translate-x-1/2 -top-10
                    bg-black text-white text-[12px] px-3 py-1 rounded-md
                    opacity-0 group-hover:opacity-100
                    pointer-events-none whitespace-nowrap transition z-50">
      {tooltip}
      <div className="absolute left-1/2 -translate-x-1/2 top-full
                      w-0 h-0 border-l-[6px] border-l-transparent
                      border-r-[6px] border-r-transparent
                      border-t-[6px] border-t-black" />
    </div>
  </div>
);

export default function BillByBill() {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const [openAddOn, setOpenAddOn] = useState(false);
  const addOnRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (addOnRef.current && !addOnRef.current.contains(e.target)) {
        setOpenAddOn(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const rowData = useMemo(() => [], []);

  const columnDefs = useMemo(() => [
    {
      headerName: "",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 55,
      pinned: "left",
      suppressMenu: true,
    },
    { headerName: "BILL MASTER", field: "billMaster", flex: 2 },
    { headerName: "ACCOUNT MASTER", field: "accountMaster", flex: 2 },
    { headerName: "STATUS", field: "status", flex: 1 },
  ], []);

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-[28px] font-extrabold text-black">
          Bill By Bill
        </h1>

        <div className="flex items-center gap-3">
          <IconBtn icon="refresh" tooltip="Refresh" />
          <IconBtn icon="offline_bolt" tooltip="Power Q" />
          <IconBtn icon="print" tooltip="Print" />
          <IconBtn icon="download" tooltip="Download" />
          <IconBtn icon="share" tooltip="Share" />
        </div>
      </div>

      {/* ===== ADD ON + BACK ===== */}
      <div className="flex justify-end items-center gap-3 mb-4">

        <div className="relative" ref={addOnRef}>
          <button
            onClick={() => setOpenAddOn(!openAddOn)}
            className="h-[36px] px-5 bg-primary text-white
                       font-bold rounded-md flex items-center gap-1 text-[14px]"
          >
            Add On
            <span className="material-symbols-outlined text-[18px]">
              expand_more
            </span>
          </button>

          {openAddOn && (
            <div className="absolute right-0 mt-2 w-[200px]
                            bg-white border border-[#d6d9e0]
                            rounded-xl shadow-lg py-3 px-4 z-50">
              <button className="w-full text-left text-[14px]
                                 text-[#4b5563] font-semibold
                                 hover:text-primary transition">
                Active/Inactive
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="h-[36px] px-4 border border-primary text-primary
                     font-bold rounded-md bg-white
                     hover:bg-primary hover:text-white transition text-[14px]"
        >
          « Back
        </button>
      </div>

      {/* ===== FILTER + GRID CARD ===== */}
      <div className="bg-white border rounded-md overflow-hidden">

        {/* FILTER ROW */}
        <div className="flex items-center gap-3 px-4 py-3 border-b bg-[#f9fafb] text-[14px]">
          <span className="font-semibold">Filter:</span>

          <input
            type="text"
            placeholder="Enter your keyword"
            className="h-[32px] px-3 border border-[#d6d9e0]
                       rounded-md outline-none w-[220px]"
          />

          <select className="h-[32px] px-3 border border-[#d6d9e0] rounded-md">
            <option>BILL MASTER</option>
            <option>ACCOUNT MASTER</option>
          </select>

          <select className="h-[32px] px-3 border border-[#d6d9e0] rounded-md">
            <option>Begins With</option>
            <option>Contains</option>
            <option>Ends With</option>
          </select>
        </div>

        {/* GRID */}
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
            theme="legacy"
            rowData={rowData}
            columnDefs={columnDefs}
            headerHeight={34}
            rowHeight={32}
            domLayout="autoHeight"
            rowSelection="multiple"
            defaultColDef={{
              resizable: true,
              suppressMenu: true,
            }}
          />
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between px-4 py-2 border-t bg-white text-[14px]">
          <div className="flex items-center gap-3">
            <button className="opacity-60">«</button>
            <button className="opacity-60">‹</button>

            <span>Page</span>
            <input
              value={0}
              readOnly
              className="w-[40px] h-[26px] border text-center rounded"
            />
            <span>of 0</span>

            <button className="opacity-60">›</button>
            <button className="opacity-60">»</button>

            <select className="ml-3 h-[28px] px-2 border rounded-md font-semibold">
              <option>10</option>
            </select>
          </div>

          <div>No rows to display.</div>
        </div>

      </div>
    </div>
  );
}
