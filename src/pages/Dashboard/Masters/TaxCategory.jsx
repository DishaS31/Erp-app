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

export default function TaxCategory() {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const [filterText, setFilterText] = useState("");
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

  const rowData = useMemo(
    () => [
      {
        name: "GST",
        type: "GST Taxpayer",
        section: "IGST",
        rate: "",
        status: "ACTIVE",
      },
    ],
    []
  );

  const columnDefs = useMemo(
    () => [
      {
        headerName: "",
        valueGetter: "node.rowIndex + 1",
        width: 60,
        pinned: "left",
      },
      { headerName: "CATEGORY NAME", field: "name", flex: 2 },
      { headerName: "CATEGORY TYPE", field: "type", flex: 2 },
      { headerName: "SECTION", field: "section", flex: 2 },
      { headerName: "RATE", field: "rate", flex: 1 },
      { headerName: "STATUS", field: "status", flex: 1 },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-[28px] font-extrabold text-black">
          Tax Category
        </h1>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-2">
          <IconBtn icon="offline_bolt" tooltip="Power Q" />
          <IconBtn icon="print" tooltip="Print" />
          <IconBtn icon="download" tooltip="Download" />
          <IconBtn icon="share" tooltip="Share" />
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="flex items-center gap-3 mb-4">

        <button
        onClick={() => navigate("/company/dashboard/masters/tax-category/add")}
        className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
        Add Tax Category
        </button>

        <button
        onClick={() =>
            navigate("/company/dashboard/masters/tax-category/edit/1")
        }
        className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
        Edit Tax Category
        </button>



        <button className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny">
          Delete Tax Category
        </button>

        <div className="ml-auto flex items-center gap-3">

          {/* ADD ON */}
          <div className="relative" ref={addOnRef}>
            <button
              onClick={() => setOpenAddOn(!openAddOn)}
              className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny flex items-center gap-1"
            >
              Add On
              <span className="material-symbols-outlined text-[18px]">
                expand_more
              </span>
            </button>

            {openAddOn && (
              <div className="absolute right-0 mt-2 w-[220px] bg-white border border-[#d6d9e0] rounded-xl shadow-lg py-4 px-5 z-50">
                <button className="w-full text-left text-[14px] font-semibold hover:text-primary">
                  Active/Inactive
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="h-[36px] px-4 border border-primary text-primary font-bold rounded-md text-tiny bg-white hover:bg-primary hover:text-white transition"
          >
            « Back
          </button>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex items-center gap-3 bg-white border border-b-0 rounded-t-md px-3 py-2">
        <span className="font-bold text-[13px]">Filter:</span>

        <input
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Enter your keyword"
          className="h-[32px] w-[220px] px-3 border rounded-md text-[13px]"
        />

        <select className="h-[32px] px-4 border rounded-md font-semibold text-tiny">
          <option>CATEGORY NAME</option>
          <option>CATEGORY TYPE</option>
        </select>

        <select className="h-[32px] px-4 border rounded-md font-semibold text-tiny">
          <option>Contains</option>
          <option>Begins With</option>
          <option>Ends With</option>
        </select>
      </div>

      {/* GRID */}
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
            theme="legacy"
            rowData={rowData}
            columnDefs={columnDefs}
            headerHeight={34}
            rowHeight={32}
            domLayout="autoHeight"
            rowSelection="single"
          />
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between px-4 py-2 border-t bg-white text-[14px]">

          <div className="flex items-center gap-3">

            <button className="opacity-60">«</button>
            <button className="opacity-60">‹</button>

            <span>Page</span>

            <input
              value={1}
              readOnly
              className="w-[40px] h-[26px] border text-center rounded"
            />

            <span>of 1</span>

            <button className="opacity-60">›</button>
            <button className="opacity-60">»</button>

            <select className="ml-3 h-[28px] px-2 border rounded-md font-semibold">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>

          <div>
            Displaying 1 to 5 of 5 items.
          </div>
        </div>
      </div>
    </div>
  );
}
