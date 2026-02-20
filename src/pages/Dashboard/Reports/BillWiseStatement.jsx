import React, { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

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
/* ================= FIELD ================= */
const DateFieldBox = ({ label, selected, onChange }) => {
  const pickerRef = useRef(null);

  return (
    <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden h-[38px]">
      {/* LABEL */}
      <div className="px-4 bg-[#f3f6fb] h-full flex items-center border-r text-[13px] font-bold">
        {label}
      </div>

      {/* DATE PICKER */}
      <DatePicker
        ref={pickerRef}
        selected={selected}
        onChange={onChange}
        dateFormat="dd-MM-yyyy"
        className="px-4 outline-none text-[13px] font-bold w-[120px]"
      />

      {/* CALENDAR ICON (OPENS PICKER) */}
      <button
        type="button"
        onClick={() => pickerRef.current.setOpen(true)}
        className="px-3 h-full border-l flex items-center justify-center"
      >
        <Icon name="calendar_month" className="text-[20px] text-black" />
      </button>
    </div>
  );
};

export default function BillWiseStatement() {
  const navigate = useNavigate();
  const gridRef = useRef(null);



  const [fromDate, setFromDate] = useState(new Date("2026-01-01"));
  const [toDate, setToDate] = useState(new Date("2026-01-30"));
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [openVoucherSeries, setOpenVoucherSeries] = useState(false);
  const [openAddOns, setOpenAddOns] = useState(false);

const columnDefs = [
  {
    headerName: "REF. NO",
    field: "ref",
    width: 120,
  },
  {
    headerName: "ACCOUNT",
    field: "account",
    flex: 1.6,
  },
  {
    headerName: "AMOUNT RECEIVABLE",
    field: "receivable",
    width: 170,
    cellClass: "text-right",
    headerClass: "ag-right-aligned-header",
  },
  {
    headerName: "AMOUNT PAYABLE",
    field: "payable",
    width: 170,
    cellClass: "text-right",
    headerClass: "ag-right-aligned-header",
  },
  {
    headerName: "DUE DATE",
    field: "dueDate",
    width: 150,
  },
  {
    headerName: "OVERDUE DAYS",
    field: "overdue",
    width: 150,
    cellClass: "text-right",
  },
];

const rowData = [
  {
    ref: "UNDEFINED",
    account: "NAV PIZZA CORNER PVT LTD FAZILKA BRANCH",
    receivable: "0",
    payable: "0",
    dueDate: "2023-04-01",
    overdue: "1056",
  },
  {
    ref: "UNDEFINED",
    account: "SHRI GANPATI ENTERPRISES BHAWNA",
    receivable: "0",
    payable: "0",
    dueDate: "2023-04-01",
    overdue: "1056",
  },
  {
    ref: "UNDEFINED",
    account: "ANGLAR PVT LTD",
    receivable: "2313990.00",
    payable: "0",
    dueDate: "2023-04-01",
    overdue: "1056",
  },
    {
    ref: "UNDEFINED",
    account: "NAV PIZZA CORNER PVT LTD FAZILKA BRANCH",
    receivable: "0",
    payable: "0",
    dueDate: "2023-04-01",
    overdue: "1056",
  },
    {
    ref: "UNDEFINED",
    account: "ANGLAR PVT LTD",
    receivable: "2313990.00",
    payable: "0",
    dueDate: "2023-04-01",
    overdue: "1056",
  },
    {
    ref: "UNDEFINED",
    account: "NAV PIZZA CORNER PVT LTD FAZILKA BRANCH",
    receivable: "0",
    payable: "0",
    dueDate: "2023-04-01",
    overdue: "1056",
  },
];

const pinnedBottomRowData = [
  {
    ref: "Total",
    account: "",
    receivable: "₹ 28,02,132.00 DR",
    payable: "₹ 3,03,732.00 CR",
    dueDate: "",
    overdue: "",
  },
];

return (
  <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">

    {/* ================= HEADER ================= */}
    <div className="flex justify-between items-start mb-4">
      <h1 className="text-[28px] font-extrabold text-black">
        Bill Wise Statement
      </h1>

      <div className="flex items-center gap-2">
          <IconBtn icon="refresh" tooltip="Refresh" />
          <IconBtn icon="offline_bolt" tooltip="Power Q" />
          <IconBtn icon="print" tooltip="Print" />
          <IconBtn icon="download" tooltip="Download" />
          <IconBtn icon="share" tooltip="Share" />
      </div>
    </div>

    {/* ================= DATE BAR ================= */}
    <div className="flex items-center gap-3 mb-4">

        {/* ================= DATE BAR ================= */}
      <div className="flex items-center gap-3">
       <DateFieldBox
        label="From"
        selected={fromDate}
        onChange={setFromDate}
      />

      <DateFieldBox
        label="To"
        selected={toDate}
        onChange={setToDate}
      />

     <button
        type="button"
        onClick={() => setShowDatePopup(true)}
        className="
          h-[35px] w-[38px]
          flex items-center justify-center
          border border-primary
          text-primary
          rounded-md
          bg-white
        "
      >
        <Icon name="date_range" className="text-[20px]" />
      </button>


        <button className="h-[35px] px-6 bg-primary text-white font-bold rounded-md text-tiny">
          GO
        </button>

      
      </div>

      <div className="ml-auto flex items-center gap-3 relative">

        {/* FIXED GRID */}
        <label className="flex items-center gap-2 font-bold text-[13px]">
          <input type="checkbox" />
          Fixed Grid
        </label>

        {/* ================= ADD ONS ================= */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setOpenAddOns((p) => !p);
              setOpenVoucherSeries(false);
            }}
            className="h-[35px] px-4 bg-primary text-white font-bold rounded-md text-tiny flex items-center gap-1"
          >
            Add Ons
            <Icon name="expand_more" className="text-[18px]" />
          </button>

          {openAddOns && (
            <div className="absolute right-0 mt-2 w-[200px] bg-white border border-[#d1d5db] rounded-md shadow-lg z-50">
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 text-tiny">
                Exclude Nil Balances
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 text-tiny">
                Exclude Nil Transactions
              </button>
            </div>
          )}
        </div>

        {/* ================= VOUCHER SERIES ================= */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setOpenVoucherSeries((p) => !p);
              setOpenAddOns(false);
            }}
            className="h-[35px] px-4 bg-primary text-white font-bold rounded-md text-tiny flex items-center gap-1"
          >
            Voucher Series
            <Icon name="expand_more" className="text-[18px]" />
          </button>

          {openVoucherSeries && (
            <div className="absolute right-0 mt-2 w-[200px] bg-white border border-[#d1d5db] rounded-md shadow-lg z-50">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-tiny">
                Action
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-tiny">
                Another action
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-tiny">
                Something else here
              </button>
            </div>
          )}
        </div>

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="h-[35px] px-4 border border-primary text-primary font-bold rounded-md text-tiny"
        >
          Back
        </button>
      </div>
    </div>

    {/* ================= FILTER ================= */}
    <div className="flex items-center gap-3 bg-white border border-b-0 rounded-t-md px-3 py-2">
      <span className="font-bold text-[13px]">Filter:</span>

      <input
        type="text"
        placeholder="Enter your keyword"
        className="h-[32px] w-[220px] px-3 border rounded-md text-[13px]"
      />

      <select className="h-[32px] px-4 border rounded-md font-bold text-tiny">
        <option>Begins With</option>
        <option>Contains</option>
        <option>Ends With</option>
      </select>
    </div>

    {/* ================= GRID ================= */}
    <div className="bg-white border border-t-0 rounded-b-md overflow-hidden">

      <div
        className="ag-theme-alpine daybook-grid"
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
           rowSelection="single"
          pinnedBottomRowData={pinnedBottomRowData}
          defaultColDef={{
            resizable: true,
            sortable: false,
            filter: false,
          }}
          domLayout="autoHeight"
          headerHeight={34}
          rowHeight={34}
                getRowStyle={(params) => {
            if (params.node.rowPinned === "bottom") {
            return {
                background: "#e6f0f7",
                fontWeight: "700",
            };
            }
            return null;
        }}
        />
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-t text-[14px]">
        <div className="flex items-center gap-3">
          <button className="opacity-50">«</button>
          <button className="opacity-50">‹</button>
          <span>
            Page <b>1</b> of <b>2</b>
          </span>
          <button>›</button>
          <button>»</button>

          <select className="border px-2 py-1 rounded">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>

        <div>
        Displaying 1 to 10 of 2834 items.
        </div>
      </div>

    </div>



       {showDatePopup && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start">
          <div
            className="
              mt-[60px]
              w-[820px]
              bg-white
              rounded-[14px]
              border-2 border-primary
              shadow-xl
              animate-date-popup
              px-6 py-5
            "
          >
            {/* CONTENT */}
            <div className="flex gap-6 items-start">

              {/* LEFT */}
              <div className="w-[55%]">
                <div className="grid grid-cols-4 gap-2 text-tiny font-bold text-black">
                  {["APR","JUL","OCT","JAN","MAY","AUG","NOV","FEB","JUN","SEP","DEC","MAR"].map(m => (
                    <button key={m} className="h-[36px] bg-[#e2f6dc] rounded-md">
                      {m}
                    </button>
                  ))}
                  {["Q1","Q2","Q3","Q4"].map(q => (
                    <button key={q} className="h-[36px] bg-[#bfeab1] rounded-md">
                      {q}
                    </button>
                  ))}
                  <button className="h-[36px] bg-[#d6e8fa] rounded-md">H1</button>
                  <button className="h-[36px] bg-[#d6e8fa] rounded-md">H2</button>
                </div>

                <div className="mt-3 flex items-center gap-2 text-[13px] font-bold">
                  <input type="checkbox" />
                  <span>TILL PERIOD</span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="w-[45%] space-y-3">
                <div className="flex items-center h-[36px] border rounded-md bg-[#eff2f6]">
                  <button className="w-[36px] h-full border-r text-[22px]">‹</button>
                  <div className="flex-1 text-center font-bold text-tiny text-black">FY: 2025 - 26</div>
                  <button className="w-[36px] h-full border-l text-[22px]">›</button>
                </div>

                <div className="flex items-center gap-3">
                  <label className="w-[55px] font-bold text-black">From</label>
                  <input
                    value="01-01-2026"
                    readOnly
                    className="flex-1 h-[36px] px-3 border rounded-md font-semibold text-tiny"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="w-[55px] font-bold text-black">To</label>
                  <input
                    value="31-03-2026"
                    readOnly
                    className="flex-1 h-[36px] px-3 border rounded-md font-semibold text-tiny"
                  />
                </div>

                <div className="flex justify-end">
                  <button className="h-[36px] px-4 border rounded-md font-bold bg-[#eff2f6] text-tiny text-black">
                    TILL DATE
                  </button>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowDatePopup(false)}
                className="px-8 py-2 bg-primary text-white rounded-md font-bold"
              >
                GO
              </button>
              <button
                onClick={() => setShowDatePopup(false)}
                className="px-8 py-2 bg-[#2f3542] text-white rounded-md font-bold"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}

  </div>
);
}
