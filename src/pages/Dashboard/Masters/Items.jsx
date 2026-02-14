import React, { useEffect, useMemo, useRef, useState } from "react";
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


const CheckboxCell = () => {
  return (
    <input
      type="checkbox"
      className="w-[14px] h-[14px]"
      onClick={(e) => e.stopPropagation()}
    />
  );
};

const CheckboxHeader = () => {
  return (
    <input
      type="checkbox"
      className="w-[14px] h-[14px]"
      onClick={(e) => e.stopPropagation()}
    />
  );
};


export default function Items() {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const addOnRef = useRef(null);

  const [filterText, setFilterText] = useState("");
  const [openAddOn, setOpenAddOn] = useState(false);

  // ✅ ONLY THESE CHECKBOXES
  const [showTaxCategory, setShowTaxCategory] = useState(false);
  const [showItemCategory, setShowItemCategory] = useState(false);

  /* ===== OUTSIDE CLICK (Add On) ===== */
  useEffect(() => {
    const handler = (e) => {
      if (addOnRef.current && !addOnRef.current.contains(e.target)) {
        setOpenAddOn(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ===== GRID DATA (UI SAMPLE) ===== */
const rowData = useMemo(() => [], []);


  /* ===== BASE COLUMNS ===== */
const baseColumns = useMemo(
  () => [
    {
    headerName: "",
    width: 45,
    suppressMenu: true,
    sortable: false,
    headerComponent: CheckboxHeader,   // ✅ ADD THIS
    cellRenderer: CheckboxCell,        // ✅ ROW checkbox
    headerClass: "flex justify-center items-center",
    cellClass: "flex justify-center items-center",
    },

    { headerName: "ITEM NAME", field: "name", flex: 1.4 },
    { headerName: "ITEM GROUP", field: "group", flex: 1.2 },
    { headerName: "UNIT", field: "unit", width: 160 },
    { headerName: "SKU", field: "sku", width: 160 },
    { headerName: "UPC", field: "upc", width: 160 },
  ],
  []
);




  /* ===== FINAL COLUMN DEFS (Tax / Item toggle) ===== */
const columnDefs = useMemo(() => {
  const cols = [...baseColumns];

  if (showTaxCategory) {
    cols.push({
      headerName: "TAX CATEGORY",
      field: "taxCategory",
      width: 160,
    });
  }

  if (showItemCategory) {
    cols.push({
      headerName: "ITEM CATEGORY",
      field: "itemCategory",
      width: 160,
    });
  }

  cols.push({
    headerName: "STATUS",
    field: "status",
    width: 120,
  });

  return cols;
}, [baseColumns, showTaxCategory, showItemCategory]);

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
        <h1 className="text-[28px] font-extrabold text-black">Items</h1>
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
        <button onClick={() => navigate("/company/dashboard/masters/items/add")}
          className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny">
          Add Item
        </button>
        <button  onClick={() =>
            navigate("/company/dashboard/masters/items/edit/1")
          } className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny">
          Edit
        </button>
        <button className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny">
          Delete
        </button>
        <button
        onClick={() =>
            navigate("/company/dashboard/masters/item-groups")
        }
        className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
        Item Groups
        </button>

       <button
        onClick={() =>
            navigate("/company/dashboard/masters/units")
        }
        className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
        Item Units
        </button>

        <button
        onClick={() =>
            navigate("/company/dashboard/masters/stock-category")
        }
        className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
        Stock Category
        </button>


        {/* ✅ REQUIRED CHECKBOXES */}
        <label className="flex items-center gap-2 text-[13px] font-bold ml-2">
          <input
            type="checkbox"
            checked={showTaxCategory}
            onChange={(e) => setShowTaxCategory(e.target.checked)}
          />
          Tax Category
        </label>

        <label className="flex items-center gap-2 text-[13px] font-bold">
          <input
            type="checkbox"
            checked={showItemCategory}
            onChange={(e) => setShowItemCategory(e.target.checked)}
          />
          Item Category
        </label>

        <div className="ml-auto flex items-center gap-3">
          {/* ADD ON */}
          <div className="relative" ref={addOnRef}>
            <button
              onClick={() => setOpenAddOn((p) => !p)}
              className="h-[36px] px-4 bg-primary text-white font-bold rounded-md text-tiny flex items-center gap-1"
            >
              Add On
              <Icon name="expand_more" className="text-[18px]" />
            </button>

            {openAddOn && (
              <div className="absolute right-0 mt-2 w-[200px] bg-white border rounded-md shadow-lg z-50">
                <button className="w-full text-left px-4 py-2 text-tiny hover:bg-[#f3f6fb]">
                   Active / Inactive
                </button>
              </div>
            )}
          </div>

          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="
              h-[36px] px-4 border border-primary text-primary
              font-bold rounded-md text-tiny flex items-center gap-1
              bg-white hover:bg-primary hover:text-white transition
            "
          >
            <span className="text-[16px] font-extrabold">«</span>
            Back
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
          <option>ITEM NAME</option>
          <option>ITEM GROUP</option>
          <option>SKU</option>
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
            defaultColDef={defaultColDef}
            headerHeight={34}
            rowSelection="multiple"
            rowHeight={32}
            domLayout="autoHeight"
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

          <div>Displaying ..</div>
        </div>
      </div>
    </div>
  );
}
