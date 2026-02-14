import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

/* ===== ICON ===== */
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
    <input
      type="checkbox"
      className="w-[14px] h-[14px]"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
);


export default function MaterialCentres() {
  const navigate = useNavigate();
  const gridRef = useRef(null);

  /* ===== GRID DATA (UI ONLY) ===== */
  const rowData = useMemo(
    () => [
      {
        centreName: "Main",
        aliasName: "Main",
        printName: "Main",
        groupName: "General",
        status: "ACTIVE",
      },
      {
        centreName: "Main",
        aliasName: "Main",
        printName: "Main",
        groupName: "General",
        status: "ACTIVE",
      },
      {
        centreName: "Main",
        aliasName: "Main",
        printName: "Main",
        groupName: "General",
        status: "ACTIVE",
      },
    ],
    []
  );

  /* ===== COLUMNS ===== */
  const columnDefs = useMemo(
    () => [

        {
        headerName: "",
        width: 40,
        suppressMenu: true,
        sortable: false,
        valueGetter: (params) => params.node.rowIndex + 1,
        cellClass: "flex items-center justify-center text-gray-600",
        },
      {
        headerName: "",
        width: 45,
        headerComponent: CheckboxHeader,
        cellRenderer: CheckboxCell,
        sortable: false,
        suppressMenu: true,
          headerClass: "flex items-center justify-center",
  cellClass: "flex items-center justify-center",
      },
      { headerName: "CENTRE NAME", field: "centreName", flex: 1.4 },
      { headerName: "ALIAS NAME", field: "aliasName", flex: 1.2 },
      { headerName: "PRINT NAME", field: "printName", flex: 1.2 },
      { headerName: "GROUP NAME", field: "groupName", flex: 1.2 },
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

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-[28px] font-extrabold text-black">
          Material Centres
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
        onClick={() =>
          navigate("/company/dashboard/masters/add-material-centre")
        }
        className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
      >
        Add Material Centre
      </button>


      <button
        onClick={() =>
          navigate("/company/dashboard/masters/material-centres/edit")
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
            navigate("/company/dashboard/masters/material-centre-groups")
        }
        className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
        Show Groups
        </button>


        <div className="ml-auto flex items-center gap-3">
          <button className="h-[36px] px-4 bg-primary text-white font-bold rounded-md text-tiny">
            Add On
          </button>

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

      {/* ================= FILTER ================= */}
      <div className="flex items-center gap-3 bg-white border border-b-0 rounded-t-md px-3 py-2">
        <span className="font-bold text-[13px]">Filter:</span>

        <input
          placeholder="Enter your keyword"
          className="h-[32px] w-[220px] px-3 border rounded-md text-[13px]"
        />

        <select className="h-[32px] px-4 border rounded-md font-semibold text-tiny">
          <option>CENTRE NAME</option>
          <option>GROUP NAME</option>
          <option>STATUS</option>
        </select>

        <select className="h-[32px] px-4 border rounded-md font-semibold text-tiny">
          <option>Contains</option>
          <option>Begins With</option>
          <option>Ends With</option>
        </select>
      </div>

      {/* ================= GRID ================= */}
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

        {/* ================= PAGINATION ================= */}
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
