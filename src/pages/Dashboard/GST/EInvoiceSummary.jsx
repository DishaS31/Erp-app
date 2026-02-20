import React, { useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { useNavigate } from "react-router-dom";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "react-datepicker/dist/react-datepicker.css";

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


/* ================= DATE FIELD ================= */
const DateFieldBox = ({ label, selected, onChange }) => {
  const pickerRef = useRef(null);

  return (
    <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden h-[38px]">
      <div className="px-4 bg-[#f3f6fb] h-full flex items-center border-r text-[13px] font-bold">
        {label}
      </div>

      <DatePicker
        ref={pickerRef}
        selected={selected}
        onChange={onChange}
        dateFormat="dd-MM-yyyy"
        className="px-4 outline-none text-[13px] font-bold w-[120px]"
      />

      <button
        type="button"
        onClick={() => pickerRef.current.setOpen(true)}
        className="px-3 h-full border-l flex items-center justify-center"
      >
        <Icon name="calendar_month" className="text-[20px]" />
      </button>
    </div>
  );
};

export default function EInvoiceSummary()
 {
  const navigate = useNavigate();
  const gridRef = useRef(null);

  const [fromDate, setFromDate] = useState(new Date("2025-04-01"));
  const [toDate, setToDate] = useState(new Date("2025-04-30"));
    const [showDatePopup, setShowDatePopup] = useState(false);
    const [openAddOn, setOpenAddOn] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);


  /* ================= GRID COLUMNS ================= */
const columnDefs = useMemo(() => [
  {
    headerName: "",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 50,
    pinned: "left",
  },
  { headerName: "DATE", field: "date", flex: 1 },
  { headerName: "EINV NO.", field: "einvNo", flex: 1 },   // ✅ changed
  { headerName: "PARTICULARS", field: "particulars", flex: 1 },
  { headerName: "VOUCHER TYPE", field: "voucherType", flex: 1 },
  { headerName: "VCH/BILL No.", field: "billNo", flex: 1 },
  { headerName: "DEBIT", field: "debit", flex: 1, cellClass: "text-right" },
  { headerName: "CREDIT", field: "credit", flex: 1, cellClass: "text-right" },
  { headerName: "E-INVOICE STATUS", field: "status", flex: 1 },  // ✅ changed
  { headerName: "E-INVOICE EXPIRY", field: "expiry", flex: 1 },  // ✅ changed
  { headerName: "ACTION", field: "action", flex: 1 },
], []);


  const rowData = useMemo(() => [], []);

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-[28px] font-extrabold text-black">
          E-INVOICE Summary
        </h1>

        <div className="flex items-center gap-3">
          <IconBtn icon="refresh" tooltip="refresh" />
            <IconBtn icon="offline_bolt" tooltip="Power Q" />
            <IconBtn icon="print" tooltip="Print" />
            <IconBtn icon="download" tooltip="Download" />
            <IconBtn icon="share" tooltip="Share" />

          <button
            onClick={() => navigate(-1)}
            className="border border-primary text-primary px-5 py-2 rounded-md font-bold hover:bg-primary hover:text-white text-[14px]"
          >
            Back
          </button>
        </div>
      </div>

      {/* ================= DATE BAR ================= */}
      <div className="flex items-center gap-2 mb-4">

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

        <button className="h-[38px] px-6 bg-primary text-white font-bold rounded-md text-tiny">
          GO
        </button>

        <div className="ml-auto flex items-center gap-2">

          <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden h-[38px]">
            <div className="px-4 bg-[#f3f6fb] border-r text-tiny font-bold py-2">
              Filter
            </div>
            <select className="px-4 h-full outline-none text-tiny font-bold bg-white">
              <option>ALL RECORDS </option>
            </select>
          </div>

          <button className="h-[38px] px-4 bg-primary text-white font-bold rounded-md text-tiny">
            Generate E-INVOICE
          </button>

            <div className="relative">
            <button
                onClick={() => {
                setOpenAddOn(!openAddOn);
                setOpenFilter(false);
                }}
                className="h-[38px] px-4 bg-primary text-white font-bold rounded-md text-tiny flex items-center gap-1"
            >
                Add On
                <span className="text-[16px]">▾</span>
            </button>

            {openAddOn && (
                <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden">
                <button className="w-full text-left px-4 py-3 hover:bg-gray-100 text-tiny text-gray-600">
                    Download Json
                </button>
                </div>
            )}
            </div>


            <div className="relative">
            <button
                onClick={() => {
                setOpenFilter(!openFilter);
                setOpenAddOn(false);
                }}
                className="h-[38px] px-4 bg-primary text-white font-bold rounded-md text-tiny flex items-center gap-1"
            >
                Voucher Series
                <span className="text-[16px]">▾</span>
            </button>

            {openFilter && (
                <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden">
                <button className="w-full text-left px-4 py-3 hover:bg-gray-100 text-tiny text-gray-600">
                    Action
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-100 text-tiny text-gray-600 border-t">
                    Another action
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-gray-100 text-tiny text-gray-600 border-t">
                    Something else here
                </button>
                </div>
            )}
            </div>


          <label className="flex items-center gap-2 text-tiny font-bold">
            <input type="checkbox" />
            Fixed Grid
          </label>

        </div>
      </div>

      {/* ================= GRID ================= */}
      <div className="bg-white border rounded-md overflow-hidden">

        {/* ================= GRID FILTER BAR ================= */}
        <div className="bg-[#f3f4fb] border border-b-0 px-4 py-2 flex items-center gap-2 text-tiny font-bold">
        
        <span>Filter:</span>

        <input
            type="text"
            placeholder="Enter your keyword"
            className="h-[30px] px-3 border rounded-md font-normal"
        />

        <select className="h-[30px] px-3 border rounded-md font-normal">
            <option>DATE</option>
            <option>EINV NO.</option>
            <option>PARTICULARS</option>
        </select>

        <select className="h-[30px] px-3 border rounded-md font-normal">
            <option>Contains</option>
            <option>Equals</option>
            <option>Starts With</option>
        </select>

        </div>


        <div
          className="ag-theme-alpine daybook-grid"
          style={{
            width: "100%",
            height: "350px",
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
        pagination={true}
        paginationPageSize={10}
        suppressPaginationPanel={true}
        rowSelection="multiple"
        headerHeight={34}
        rowHeight={32}
        />

        </div>
                {/* ================= CUSTOM PAGINATION ================= */}
        <div className="flex items-center gap-3 px-4 py-2 border-t bg-[#f3f4fb] text-[13px]">

        <button
            onClick={() => gridRef.current.api.paginationGoToFirstPage()}
            className="px-2"
        >
            «
        </button>

        <button
            onClick={() => gridRef.current.api.paginationGoToPreviousPage()}
            className="px-2"
        >
            ‹
        </button>

        <span>
            Page{" "}
            <span className="px-2 py-1 border bg-white rounded">
            {gridRef.current?.api?.paginationGetCurrentPage() + 1 || 1}
            </span>{" "}
            of{" "}
            {gridRef.current?.api?.paginationGetTotalPages() || 1}
        </span>

        <button
            onClick={() => gridRef.current.api.paginationGoToNextPage()}
            className="px-2"
        >
            ›
        </button>

        <button
            onClick={() => gridRef.current.api.paginationGoToLastPage()}
            className="px-2"
        >
            »
        </button>

        <select
            className="ml-3 border px-2 py-1 rounded"
            onChange={(e) =>
            gridRef.current.api.paginationSetPageSize(Number(e.target.value))
            }
        >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
        </select>

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
                className="px-8 py-2 bg-[#1aa10a] text-white rounded-md font-bold"
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
