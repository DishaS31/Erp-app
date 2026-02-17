import React, { useMemo, useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

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

const DateFieldBox = ({ label, selected, onChange }) => {
  const pickerRef = useRef(null);

  return (
    <div className="flex items-center border border-[#cfd6e4] rounded-md overflow-hidden h-[38px] bg-white">
      <div className="px-3 bg-[#f3f6fb] border-r text-[13px] font-bold h-full flex items-center">
        {label}
      </div>

      <DatePicker
        ref={pickerRef}
        selected={selected}
        onChange={onChange}
        dateFormat="dd-MM-yyyy"
        className="px-3 w-[110px] outline-none text-[13px] font-bold"
      />

      <button
        type="button"
        onClick={() => pickerRef.current.setOpen(true)}
        className="px-2 border-l h-full flex items-center"
      >
        <Icon name="calendar_month" className="text-[18px]" />
      </button>
    </div>
  );
};

export default function ReceiptRegister() {
  const gridRef = useRef(null);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);


  const [fromDate, setFromDate] = useState(new Date("2026-02-01"));
  const [toDate, setToDate] = useState(new Date("2026-02-14"));
  const [fixedGrid, setFixedGrid] = useState(false);
  const [openVoucherSeries, setOpenVoucherSeries] = useState(false);
  const [openAddOns, setOpenAddOns] = useState(false);
  const [showDatePopup, setShowDatePopup] = useState(false);


  const rowData = [];

  const columnDefs = useMemo(() => [
    { headerName: "DATE", field: "date", width: 140 },
    { headerName: "ACCOUNT", field: "account", flex: 1 },
    {
      headerName: "AMOUNT",
      field: "amount",
      width: 300,
      cellClass: "text-right",
      headerClass: "ag-right-aligned-header",
    },
    { headerName: "NARRATION", field: "narration", flex: 1 },
  ], []);


  useEffect(() => {
  const close = () => {
    setOpenVoucherSeries(false);
    setOpenAddOns(false);
  };
  window.addEventListener("click", close);
  return () => window.removeEventListener("click", close);
}, []);


const onGridReady = (params) => {
  const api = params.api;

  setTotalPages(api.paginationGetTotalPages());
  setCurrentPage(api.paginationGetCurrentPage());

  api.addEventListener("paginationChanged", () => {
    setTotalPages(api.paginationGetTotalPages());
    setCurrentPage(api.paginationGetCurrentPage());
  });
};



  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-[26px] font-extrabold text-black">
            Receipt Register
        </h1>

        <div className="flex items-center gap-3 text-black">
            <IconBtn icon="refresh" tooltip=" refresh" />
            <IconBtn icon="offline_bolt" tooltip="Power Q" />
            <IconBtn icon="print" tooltip="Print" />
            <IconBtn icon="download" tooltip="Download" />
            <IconBtn icon="share" tooltip="Share" />
        </div>
      </div>

      {/* ================= DATE + FILTER BAR ================= */}
      <div className="flex items-center gap-2 mb-4">

        <DateFieldBox label="From" selected={fromDate} onChange={setFromDate} />
        <DateFieldBox label="To" selected={toDate} onChange={setToDate} />

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

        <button className="h-[38px] px-6 bg-primary text-white font-bold rounded-md text-[13px]">
          GO
        </button>

        <div className="ml-auto flex items-center gap-2">

        <div className="flex items-stretch h-[40px] border border-[#cbd5e1] rounded-md overflow-hidden bg-white">

        {/* LEFT LABEL */}
        <div className="px-3 bg-[#f1f5f9] flex items-center text-tiny  font-semibold text-[#334155] border-r border-[#cbd5e1]">
            View
        </div>

        {/* RIGHT SELECT */}
        <div className="relative flex items-center">
            <select
            className="appearance-none px-5 pr-10 h-full text-tiny  font-semibold text-[#1e293b] outline-none bg-white"
            >
            <option>Condensed</option>
            <option>Detailed</option>
            </select>

            {/* ARROW */}
            <span className="absolute right-3 pointer-events-none material-symbols-outlined text-[18px] text-gray-600">
            expand_more
            </span>
        </div>

        </div>

        <div className="flex items-stretch h-[40px] border border-[#cbd5e1] rounded-md overflow-hidden bg-white">

        <div className="px-3 bg-[#f1f5f9] flex items-center text-tiny  font-semibold text-[#334155] border-r border-[#cbd5e1]">
            Vouchers
        </div>

        <div className="relative flex items-center">
            <select
            className="appearance-none px-5 pr-5 h-full text-tiny font-semibold text-[#1e293b] outline-none bg-white"
            >
            <option>All</option>
              <option value="draft">Draft Vouchers</option>
              <option value="optional">Optional Vouchers</option>
            </select>

            <span className="absolute right-3 pointer-events-none material-symbols-outlined text-[18px] text-gray-600">
            expand_more
            </span>
        </div>

        </div>

        {/* Add Ons Dropdown */}
        <div className="relative">

        <button
            onClick={(e) => {
            e.stopPropagation();
            setOpenAddOns(!openAddOns);
            setOpenVoucherSeries(false); // optional but better UX
            }}
            className="h-[38px] px-3 bg-primary text-white font-bold rounded-md text-tiny flex items-center gap-1"
        >
            Add Ons
            <Icon name="expand_more" className="text-[18px]" />
        </button>

        {openAddOns && (
            <div
            className="
                absolute right-0 mt-2
                w-[220px]
                bg-white
                border border-[#cbd5e1]
                rounded-md
                shadow-lg
                z-50
                overflow-hidden
            "
            >
            <button className="w-full text-left px-4 py-3 text-[14px] hover:bg-[#f3f6fb]">
                Action
            </button>

            <button className="w-full text-left px-4 py-3 text-[14px] hover:bg-[#f3f6fb]">
                Another action
            </button>

            <button className="w-full text-left px-4 py-3 text-[14px] hover:bg-[#f3f6fb]">
                Something else here
            </button>
            </div>
        )}
        </div>



        {/* Voucher Series Dropdown */}
        <div className="relative">

        <button
            onClick={(e) => {
            e.stopPropagation();
            setOpenVoucherSeries(!openVoucherSeries);
            setOpenAddOns(false);
            }}

            className="h-[38px] px-4 bg-primary text-white font-bold rounded-md text-tiny flex items-center gap-1"
        >
            Voucher Series
            <Icon name="expand_more" className="text-[18px]" />
        </button>

        {openVoucherSeries && (
            <div
            className="
                absolute right-0 mt-2
                w-[220px]
                bg-white
                border border-[#cbd5e1]
                rounded-md
                shadow-lg
                z-50
                overflow-hidden
            "
            >
            <button className="w-full text-left px-4 py-3 text-[14px] hover:bg-[#f3f6fb]">
                Action
            </button>

            <button className="w-full text-left px-4 py-3 text-[14px] hover:bg-[#f3f6fb]">
                Another action
            </button>

            <button className="w-full text-left px-4 py-3 text-[14px] hover:bg-[#f3f6fb]">
                Something else here
            </button>
            </div>
        )}
        </div>


          {/* Fixed Grid */}
          <label className="flex items-center gap-2 text-tiny font-bold">
            <input
              type="checkbox"
              checked={fixedGrid}
              onChange={() => setFixedGrid(!fixedGrid)}
            />
            Fixed Grid
          </label>

          {/* Back */}
          <button className="h-[38px] px-4 border border-primary text-primary font-bold rounded-md text-[13px]">
            Back
          </button>
        </div>
      </div>

{/* ================= GRID ================= */}
<div className="bg-white border border-[#d9dee7] rounded-md overflow-hidden">

  <div
     className="ag-theme-alpine daybook-grid balance-grid"
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
    onGridReady={onGridReady}
    theme="legacy"
    columnDefs={columnDefs}
    defaultColDef={{
            sortable: false,
            filter: false,
            resizable: true,
    }}
    pagination={true}
    paginationPageSize={10}
    suppressPaginationPanel={true}   // ✅ add this
    headerHeight={36}
    rowHeight={34}
    domLayout={fixedGrid ? "normal" : "autoHeight"}
    />
  </div>
  {/* ================= CUSTOM PAGINATION ================= */}
<div className="flex items-center gap-4 px-4 py-1 bg-[#f3f4f7] border-t border-[#e5e7eb] text-[13px]">1

  <button
    onClick={() => gridRef.current.api.paginationGoToFirstPage()}
    className="text-gray-500 hover:text-black"
  >
    «
  </button>

  <button
    onClick={() => gridRef.current.api.paginationGoToPreviousPage()}
    className="text-gray-500 hover:text-black"
  >
    ‹
  </button>

  <div className="flex items-center gap-2">
    <span>Page</span>

    <input
      type="number"
      value={totalPages === 0 ? 0 : currentPage + 1}
      readOnly
      className="w-[40px] h-[26px] border rounded text-center bg-white"
    />

    <span>of {totalPages}</span>
  </div>

  <button
    onClick={() => gridRef.current.api.paginationGoToNextPage()}
    className="text-gray-500 hover:text-black"
  >
    ›
  </button>

  <button
    onClick={() => gridRef.current.api.paginationGoToLastPage()}
    className="text-gray-500 hover:text-black"
  >
    »
  </button>

  <select
    value={pageSize}
    onChange={(e) => {
      const size = Number(e.target.value);
      setPageSize(size);
      gridRef.current.api.paginationSetPageSize(size);
    }}
    className="ml-4 border h-[28px] px-2 rounded bg-white"
  >
    <option value={10}>10</option>
    <option value={25}>25</option>
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
