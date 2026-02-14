import React, { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { useNavigate } from "react-router-dom";

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

export default function AccountGroups() {
  const navigate = useNavigate();
  const gridRef = useRef(null);

  const [filterText, setFilterText] = useState("");
  const [openAddOn, setOpenAddOn] = useState(false);
  const addOnRef = useRef(null);

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

  /* ===== GRID DATA (Screenshot based) ===== */
  const rowData = useMemo(
    () => [
      { id: 292, name: "BANK INTEREST", print: "BANK INTERSET", primary: "NO", under: "", status: "ACTIVE" },
      { id: 282, name: "BANK OD / OCC A/c", print: "BANK OD / OCC A/c", primary: "YES", under: "", status: "ACTIVE" },
      { id: 262, name: "Capital Account", print: "Capital Account", primary: "YES", under: "", status: "ACTIVE" },
      { id: 270, name: "Capital Work In Progress", print: "Capital Work In Progress", primary: "YES", under: "", status: "ACTIVE" },
      { id: 284, name: "Cash & Cash Equivalents", print: "Cash & Cash Equivalents", primary: "YES", under: "", status: "ACTIVE" },
      { id: 281, name: "Current Investments", print: "Current Investments", primary: "YES", under: "", status: "ACTIVE" },
      { id: 273, name: "Deferred Tax Assets", print: "Deferred Tax Assets", primary: "YES", under: "", status: "ACTIVE" },
      { id: 265, name: "Deferred Tax Liabilities", print: "Deferred Tax Liabilities", primary: "YES", under: "", status: "ACTIVE" },
      { id: 280, name: "Duties & Taxes", print: "Duties & Taxes", primary: "YES", under: "", status: "ACTIVE" },
      { id: 293, name: "EMI HOME", print: "EMI HOME", primary: "NO", under: "", status: "ACTIVE" },
    ],
    []
  );

  /* ===== COLUMNS ===== */
  const columnDefs = useMemo(
    () => [
      { headerName: "", checkboxSelection: true, width: 60 },
      { headerName: "Group ID", field: "id", width: 130 },
      { headerName: "Group Name", field: "name", flex: 1.4 },
      { headerName: "Print Name", field: "print", flex: 1.4 },
      { headerName: "Primary", field: "primary", width: 120 },
      { headerName: "Under", field: "under", width: 150 },
      { headerName: "Status", field: "status", width: 120 },
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
        <h1 className="text-[28px] font-extrabold text-black">Group</h1>
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
            navigate("/company/dashboard/masters/account-groups/add")
          }
          className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
          Add Group
        </button>

        <button
          onClick={() => {
            const selected = gridRef.current.api.getSelectedRows();
            if (selected.length > 0) {
              navigate(`/company/dashboard/masters/account-groups/edit/${selected[0].id}`);
            }
          }}
          className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
          Edit
        </button>

        <button className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny">Delete</button>

        <button
          onClick={() => navigate("/company/dashboard/masters/accounts")}
          className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
          Accounts
        </button>

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
        <select className="h-[32px] px-4 border rounded-md font-bold text-tiny">
          <option>Group ID</option>
          <option>Group Name</option>
          <option>Status</option>
        </select>
        <select className="h-[32px] px-4 border rounded-md font-bold text-tiny">
          <option>Contains</option>
          <option>Begins With</option>
          <option>Ends With</option>
        </select>
      </div>

      {/* ================= GRID ================= */}
      <div className="bg-white border border-t-0 rounded-b-md overflow-hidden">
        <div  className="ag-theme-alpine  daybook-grid balance-grid"
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
        }}>
          <AgGridReact
            ref={gridRef}
            theme="legacy"
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            headerHeight={34}
            rowHeight={32}
            domLayout="autoHeight"
          />
        </div>

            {/* ================= PAGINATION ================= */}
        <div className="flex items-center justify-between px-4 py-2 border-t text-[14px]">
                {/* LEFT CONTROLS */}
                <div className="flex items-center gap-2">
                    <button className="text-[20px] font-bold px-2 opacity-60 hover:opacity-100">
                    «
                    </button>

                    <button className="text-[20px] font-bold px-2 opacity-60 hover:opacity-100">
                    ‹
                    </button>

                    <span>Page</span>

                    <input
                    value={1}
                    readOnly
                    className="w-[40px] h-[26px] border text-center rounded"
                    />

                    <span>of 4</span>

                    <button className="text-[20px] font-bold px-2 opacity-60 hover:opacity-100">
                    ›
                    </button>

                    <button className="text-[20px] font-bold px-2 opacity-60 hover:opacity-100">
                    »
                    </button>

                    <select
                    className="
                        ml-2 h-[28px] px-2
                        border border-[#cfd6e4]
                        rounded-md
                        text-[14px] font-semibold
                        bg-white
                    "
                    >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    </select>
                </div>

                {/* RIGHT INFO */}
                <div>Displaying 1 to 10 of 34 items.</div>
                </div>
        </div>
    </div>
  );
}
