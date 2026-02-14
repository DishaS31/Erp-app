import React, { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

/* ===== ICON ===== */
const Icon = ({ name }) => (
  <span className="material-symbols-outlined text-[28px] text-black">
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

/* ===== CHECKBOX CELL ===== */
const CheckboxCell = () => (
  <input
    type="checkbox"
    className="w-[14px] h-[14px]"
    onClick={(e) => e.stopPropagation()}
  />
);

export default function Units() {
  const navigate = useNavigate();
  const gridRef = useRef(null);

const rowData = useMemo(
  () => [
    { unitName: "BAG", unitAlias: "BAG", printName: "BAG", uqc: "" },
    { unitName: "BAG", unitAlias: "BAG", printName: "BAG", uqc: "BAG" },
    { unitName: "BAG", unitAlias: "BAG", printName: "BAG", uqc: "BAG" },
    { unitName: "Box", unitAlias: "Box", printName: "Box", uqc: "" },
    { unitName: "BOX", unitAlias: "BOX", printName: "BOX", uqc: "BOX" },
    { unitName: "BOX", unitAlias: "BOX", printName: "BOX", uqc: "BOX" },
    { unitName: "BOX", unitAlias: "BOX", printName: "BOX", uqc: "" },
    { unitName: "BOX", unitAlias: "BOX", printName: "BOX", uqc: "BOX" },
    { unitName: "BOX", unitAlias: "BOX", printName: "BOX", uqc: "" },
    { unitName: "BTL", unitAlias: "BTL", printName: "BTL", uqc: "" },
  ],
  []
);


  /* ===== COLUMNS (EXACT ORDER) ===== */
  const columnDefs = useMemo(
    () => [
      {
        headerName: "",
        width: 45,
        valueGetter: (p) => p.node.rowIndex + 1,
        cellClass: "flex justify-center items-center",
        sortable: false,
      },
      {
        headerName: "",
        width: 55,
        cellRenderer: CheckboxCell,
        cellClass: "flex justify-center items-center",
        sortable: false,
      },
      { headerName: "Unit Name", field: "unitName", flex: 1 },
      { headerName: "Unit Alias", field: "unitAlias", flex: 1 },
      { headerName: "Print Name", field: "printName", flex: 1 },
      { headerName: "UQC", field: "uqc", width: 160 },
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
      <div className="flex justify-between items-start mb-3">
        <h1 className="text-[28px] font-extrabold text-black">Units</h1>

        <div className="flex gap-2">
          <IconBtn icon="refresh" tooltip="Refresh" />
          <IconBtn icon="offline_bolt" tooltip="Power Q" />
          <IconBtn icon="print" tooltip="Print" />
          <IconBtn icon="download" tooltip="Download" />
          <IconBtn icon="share" tooltip="Share" />
        </div>
      </div>

      {/* ================= ACTION BAR ================= */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() =>
            navigate("/company/dashboard/masters/units/add")
          }
          className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
          Add Unit
        </button>

        <button
          onClick={() =>
            navigate("/company/dashboard/masters/units/edit/1")
          }
          className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
          Edit
        </button>

        <button className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny">
          Delete
        </button>

        <button
          onClick={() => navigate("/company/dashboard/masters/items")}
          className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
          Items
        </button>

        <button
          onClick={() => navigate("/company/dashboard/masters/item-groups")}
          className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
          Item Groups
        </button>

        {/* RIGHT SIDE */}
        <div className="ml-auto">
          <button
            onClick={() => navigate(-1)}
            className="h-[36px] px-4 border border-primary text-primary font-bold rounded-md text-tiny hover:bg-primary hover:text-white transition"
          >
            « Back
          </button>
        </div>
      </div>

      {/* ================= FILTER ================= */}
      <div className="flex items-center gap-3 bg-white border border-b-0 rounded-t-md px-3 py-2">
        <span className="font-bold text-[13px]">Filter:</span>
        <input className="h-[32px] w-[220px] px-3 border rounded-md text-[13px]" />
        <select className="h-[32px] px-4 border rounded-md text-tiny">
          <option>Unit Name</option>
        </select>
        <select className="h-[32px] px-4 border rounded-md text-tiny">
          <option>Contains</option>
        </select>
      </div>

      {/* ================= GRID ================= */}
      <div className="bg-white border border-t-0 rounded-b-md">
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
            rowHeight={32}
            headerHeight={34}
            domLayout="autoHeight"
             theme="legacy"
            rowSelection="multiple"
          />
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-between items-center px-4 py-2 border-t text-[14px]">
          <div className="flex gap-2 items-center">
            <button>«</button>
            <button>‹</button>
            <span>Page</span>
            <input value={1} readOnly className="w-[40px] border text-center" />
            <span>of 1</span>
            <button>›</button>
            <button>»</button>

            <span className="ml-4">Records per page:</span>
            <select className="border px-2">
              <option>10</option>
            </select>
          </div>

          <div>Displaying 1 to 1 of 1 items.</div>
        </div>
      </div>
    </div>
  );
}
