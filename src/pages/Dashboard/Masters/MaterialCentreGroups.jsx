import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);


const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
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

/* ===== CHECKBOX ===== */
const CheckboxCell = () => (
  <input
    type="checkbox"
    className="w-[14px] "
    onClick={(e) => e.stopPropagation()}
  />
);

const CheckboxHeader = () => (
  <div className="flex items-center justify-center h-full w-full">
    <input type="checkbox" className="w-[14px] h-[14px]" />
  </div>
);

export default function MaterialCentreGroups() {
  const navigate = useNavigate();
  const gridRef = useRef(null);


  const addOnRef = useRef(null);
const [openAddOn, setOpenAddOn] = useState(false);

/* ===== OUTSIDE CLICK CLOSE ===== */
useEffect(() => {
  const handler = (e) => {
    if (addOnRef.current && !addOnRef.current.contains(e.target)) {
      setOpenAddOn(false);
    }
  };
  document.addEventListener("mousedown", handler);
  return () => document.removeEventListener("mousedown", handler);
}, []);

  /* ===== DATA (UI SAMPLE) ===== */
  const rowData = useMemo(
    () => [
      { groupName: "General", alias: "General", primary: "YES", status: "ACTIVE" },
      { groupName: "General", alias: "General", primary: "YES", status: "ACTIVE" },
      { groupName: "General", alias: "General", primary: "YES", status: "ACTIVE" },
    ],
    []
  );

  /* ===== COLUMNS ===== */
  const columnDefs = useMemo(
    () => [
      // 🔢 NUMBER
      {
        headerName: "",
        width: 40,
        valueGetter: (p) => p.node.rowIndex + 1,
        cellClass: "flex items-center justify-center text-gray-600",
        suppressMenu: true,
      },

      // ☑ CHECKBOX
      {
        headerName: "",
        width: 45,
        headerComponent: CheckboxHeader,
        cellRenderer: CheckboxCell,
        suppressMenu: true,
        headerClass: "flex items-center justify-center",
        cellClass: "flex items-center justify-center",
      },

      { headerName: "GROUP NAME", field: "groupName", flex: 1.4 },
      { headerName: "ALIAS", field: "alias", flex: 1.2 },
      { headerName: "PRIMARY", field: "primary", width: 140 },
      { headerName: "STATUS", field: "status", width: 140 },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: false,
      filter: false,
    }),
    []
  );

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-[28px] font-extrabold text-black">
          Material Centre Groups
        </h1>
          <div className="flex items-center gap-2">
          <IconBtn icon="refresh" tooltip="Refresh" />
          <IconBtn icon="offline_bolt" tooltip="Power Q" />
          <IconBtn icon="print" tooltip="Print" />
          <IconBtn icon="download" tooltip="Download" />
          <IconBtn icon="share" tooltip="Share" />
        </div>
       
      </div>

      {/* ===== ACTION BAR ===== */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() =>
            navigate("/company/dashboard/masters/add-material-centre-group")
          }
          className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
          Add Group
        </button>

        <button
          onClick={() =>
            navigate("/company/dashboard/masters/material-centre-groups/edit/1")
          }
          className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
          Edit
        </button>

        <button className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny">
          Delete
        </button>
        <button
          onClick={() =>
            navigate("/company/dashboard/masters/material-centres")
          }
          className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
          Show Material Centres
        </button>

        <div className="ml-auto flex items-center gap-3">
          
          {/* ADD ON DROPDOWN */}
          <div className="relative" ref={addOnRef}>
            <button
              onClick={() => setOpenAddOn((p) => !p)}
              className="
                h-[36px] px-4
                bg-primary text-white font-bold
                rounded-md text-tiny
                flex items-center gap-1
                shadow-sm
              "
            >
              Add On
              <span
                className={`transition-transform duration-200 ${
                  openAddOn ? "rotate-180" : ""
                }`}
              >
                <Icon name="expand_more" className="text-[18px]" />
              </span>
            </button>

            {openAddOn && (
              <div
                className="
                  absolute right-0 mt-2 w-[220px]
                  bg-white rounded-xl
                  border border-[#e5e7eb]
                  shadow-[0_10px_25px_rgba(0,0,0,0.08)]
                  overflow-hidden
                  z-50
                  animate-[fadeIn_0.15s_ease-out]
                "
              >
                <button
                  onClick={() => {
                    setOpenAddOn(false);
                  }}
                  className="
                    w-full text-left
                    px-5 py-4
                    text-[14px] text-[#374151]
                    hover:bg-[#f3f6fb]
                    transition
                  "
                >
                  Active / Inactive
                </button>
              </div>
            )}
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="
              h-[36px] px-4 border border-primary text-primary
              font-bold rounded-md text-tiny
              bg-white hover:bg-primary hover:text-white transition
            "
          >
            « Back
          </button>
        </div>

      </div>

      {/* ===== FILTER ===== */}
      <div className="flex items-center gap-3 bg-white border border-b-0 rounded-t-md px-3 py-2">
        <span className="font-bold text-[13px]">Filter:</span>
        <input
          placeholder="Enter your keyword"
          className="h-[32px] w-[220px] px-3 border rounded-md text-[13px]"
        />
        <select className="h-[32px] px-4 border rounded-md font-semibold text-tiny">
          <option>GROUP NAME</option>
        </select>
        <select className="h-[32px] px-4 border rounded-md font-semibold text-tiny">
          <option>Contains</option>
          <option>Begins With</option>
          <option>Ends With</option>
        </select>
      </div>

      {/* ===== GRID ===== */}
      <div className="bg-white border border-t-0 rounded-b-md overflow-hidden">
        <div
           className="ag-theme-alpine  daybook-grid balance-grid units-grid"
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
            rowSelection="multiple"
            theme="legacy"
          />
        </div>

        {/* ===== PAGINATION ===== */}
        <div className="flex items-center justify-between px-4 py-2 border-t text-[14px]">
          <div className="flex items-center gap-2">
            <button className="text-xl px-2 opacity-60">«</button>
            <button className="text-xl px-2 opacity-60">‹</button>
            <span>Page</span>
            <input
              value={1}
              readOnly
              className="w-[40px] h-[26px] border text-center rounded"
            />
            <span>of 1</span>
            <button className="text-xl px-2 opacity-60">›</button>
            <button className="text-xl px-2 opacity-60">»</button>

            <select className="ml-2 h-[28px] px-2 border rounded-md font-semibold">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>

          <div>Displaying 1 to 3 of 3 items</div>
        </div>
      </div>
    </div>
  );
}
