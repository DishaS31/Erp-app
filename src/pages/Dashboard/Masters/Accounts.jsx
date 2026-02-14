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

export default function Accounts() {
  const gridRef = useRef(null);
  const [filterText, setFilterText] = useState("");
  const [openAddOn, setOpenAddOn] = useState(false);
  const addOnRef = useRef(null);
  const navigate = useNavigate();



  useEffect(() => {
  const handleClickOutside = (e) => {
    if (addOnRef.current && !addOnRef.current.contains(e.target)) {
      setOpenAddOn(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  /* ===== GRID DATA (DUMMY UI DATA) ===== */
 const rowData = useMemo(
  () => [
    {
      id: 756,
      name: "ADV SHIVAM",
      group: "Long Term Borrowings",
      status: "ACTIVE",
      balance: "₹0.00",
      drcr: "DR.",
    },
    {
      id: 733,
      name: "Aicountly Interactive Services Pvt. Ltd.",
      group: "Trade Receivables",
      status: "ACTIVE",
      balance: "₹5,87,595.97",
      drcr: "CR.",
    },
    {
      id: 766,
      name: "AKAI KARAOKE EMI H",
      group: "EMI HOME",
      status: "ACTIVE",
      balance: "₹0.00",
      drcr: "DR.",
    },
    {
      id: 915,
      name: "ASSET RESERVE AXIS",
      group: "Reserve & Surplus Axis",
      status: "ACTIVE",
      balance: "₹32,845.74",
      drcr: "DR.",
    },
    {
      id: 839,
      name: "BABU RAM",
      group: "Other Current Assets",
      status: "ACTIVE",
      balance: "₹15,149.85",
      drcr: "DR.",
    },
    {
      id: 757,
      name: "BAJAJ FINERSV",
      group: "Short Term Borrowings",
      status: "ACTIVE",
      balance: "₹392.00",
      drcr: "DR.",
    },
    {
      id: 792,
      name: "BANK CHARGES",
      group: "EXPENSES OFFICE",
      status: "ACTIVE",
      balance: "₹0.00",
      drcr: "DR.",
    },
    {
      id: 6750,
      name: "BHARAT BHUSHAN GUPTA",
      group: "Trade Receivables",
      status: "ACTIVE",
      balance: "₹0.00",
      drcr: "DR.",
    },
    {
      id: 926,
      name: "BHARAT BHUSHAN GUPTAHUF",
      group: "Trade Receivables",
      status: "ACTIVE",
      balance: "₹0.00",
      drcr: "DR.",
    },
    {
      id: 950,
      name: "BIKE",
      group: "Fixed Assets",
      status: "ACTIVE",
      balance: "₹86,772.00",
      drcr: "DR.",
    },
  ],
  []
);


  /* ===== COLUMNS ===== */
  const columnDefs = useMemo(
    () => [
      {
        headerName: "",
        checkboxSelection: true,
        width: 60,
      },
      { headerName: "ACCOUNT ID", field: "id", width: 130 },
      {
        headerName: "ACCOUNT NAME",
        field: "name",
        flex: 1.4,
      },
      {
        headerName: "GROUP",
        field: "group",
        flex: 1.2,
      },
      {
        headerName: "STATUS",
        field: "status",
        width: 120,
      },
      {
        headerName: "BALANCE",
        field: "balance",
        width: 150,
        cellClass: "text-right",
        headerClass: "ag-right-aligned-header",
      },
      {
        headerName: "DR/CR",
        field: "drcr",
        width: 100,
      },
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
        <h1 className="text-[28px] font-extrabold text-black">Accounts</h1>
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
          onClick={() => navigate("/company/dashboard/masters/accounts/add")}
          className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
          Add Account
        </button>
        <button
          onClick={() => navigate("/company/dashboard/masters/accounts/edit/756")}
          className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
          Edit
        </button>



        <button className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny">
          Delete
        </button>

        <button
        onClick={() =>
            navigate("/company/dashboard/masters/account-groups")
        }
        className="h-[36px] px-5 bg-primary text-white font-bold rounded-md text-tiny"
        >
        Show Groups
        </button>


        <div className="ml-auto flex items-center gap-3">
            <div className="relative" ref={addOnRef}>
            <button
                type="button"
                onClick={() => setOpenAddOn((p) => !p)}
                className="
                h-[36px] px-4 bg-primary text-white font-bold
                rounded-md text-tiny flex items-center gap-1
                "
            >
                Add On
                <span className="material-symbols-outlined text-[18px]">
                expand_more
                </span>
            </button>

            {/* DROPDOWN */}
            {openAddOn && (
                <div
                className="
                    absolute right-0 mt-2 w-[200px]
                    bg-white border border-[#cfd6e4]
                    rounded-md shadow-lg z-50
                "
                >
                <button
                    className="
                    w-full text-left px-4 py-2 text-tiny
                    hover:bg-[#f3f6fb]
                    "
                    onClick={() => setOpenAddOn(false)}
                >
                    Show Nil Accounts
                </button>

                <button
                    className="
                    w-full text-left px-4 py-2 text-[14px]
                    hover:bg-[#f3f6fb]
                    "
                    onClick={() => setOpenAddOn(false)}
                >
                    Active / Inactive
                </button>
                </div>
            )}
            </div>


            <button
             className="
                h-[36px]
                px-4
                border
                border-primary
                text-primary
                font-bold
                rounded-md
                text-tiny
                flex items-center gap-1
                bg-white
                transition-all duration-200
                hover:bg-primary
                hover:text-white
            "
            >
            <span className="text-[16px] font-extrabold">«</span>
            <span>Back</span>
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
           <option>ACCOUNT NAME</option>
           <option>ACCOUNT ID</option>
           <option>GROUP</option>
           <option>STATUS</option>
           <option>BALANCE</option>
           <option>DR/CR</option>
        </select>
        <select className="h-[32px] px-4 border rounded-md font-semibold text-tiny">
            <option>Contains</option>
            <option>Begins With</option>
            <option>Ends With</option>
            <option>Does not contain</option>
            <option>Equal To</option>
            <option>Not Equal To</option>
            <option>Less Than</option>
            <option>Great Than</option>
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
            rowSelection="multiple"
            headerHeight={34}
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
            <span>of 20</span>
            <button className="text-xl px-2 opacity-60">›</button>
            <button className="text-xl px-2 opacity-60">»</button>

            <select className="ml-2 h-[28px] px-2 border rounded-md font-semibold">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>

          <div>Displaying 1 to 10 of 198 items.</div>
        </div>
      </div>
    </div>
  );
}
