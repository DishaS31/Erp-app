import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

const IconBtn = ({ icon, tooltip }) => (
  <div className="relative group">
    <button type="button" className="p-1">
      <Icon name={icon} className="text-[30px] text-black" />
    </button>

    <div className="
      absolute left-1/2 -translate-x-1/2 -top-9
      bg-black text-white text-[11px]
      px-2 py-1 rounded
      opacity-0 group-hover:opacity-100
      pointer-events-none
      whitespace-nowrap
    ">
      {tooltip}
    </div>
  </div>
);

const BASE_COLUMNS = [
  {
    headerName: "DATE",
    field: "date",
    minWidth: 120,
    flex: 1,
  },
  {
    headerName: "VCH TYPE",
    field: "vchType",
    minWidth: 130,
    flex: 1,
  },
  {
    headerName: "VOUCHER",
    field: "voucher",
    minWidth: 160,
    flex: 1.2,
  },
  {
    headerName: "INWARD",
    field: "inwardQty",
    minWidth: 120,
    flex: 1,
    cellClass: "text-right",
  },
  {
    headerName: "OUTWARD",
    field: "outwardQty",
    minWidth: 120,
    flex: 1,
    cellClass: "text-right",
  },
  {
    headerName: "CLOSING QTY",
    field: "closingQty",
    minWidth: 140,
    flex: 1,
    cellClass: "text-right font-bold",
  },
  {
    headerName: "UOM",
    field: "uom",
    minWidth: 90,
    flex: 0.6,
  },
  {
    headerName: "COGS",
    field: "cogs",
    minWidth: 120,
    flex: 1,
    cellClass: "text-right",
  },
];


const BRANCH_COLUMN = {
  headerName: "BRANCH",
  field: "branch",
  width: 140,
};

const MEMORANDUM_COLUMN = {
  headerName: "MEMO",
  field: "memorandum",
  width: 120,
};

const pinnedBottomRowData = [
  {
    date: "Total",
    inwardQty: "",
    outwardQty: "",
    closingQty: "",
  },
];





const DateFieldBox = ({ label, selected, onChange }) => {
  const pickerRef = useRef(null);

  return (
    <div className="flex items-center bg-white border rounded-md overflow-hidden h-[38px]">
      <div className="px-3 bg-[#f3f6fb] border-r font-bold text-[13px] py-2">
        {label}
      </div>

      <DatePicker
        ref={pickerRef}
        selected={selected}
        onChange={onChange}
        dateFormat="dd-MM-yyyy"
        className="px-3 w-[120px] outline-none text-[13px] font-bold"
      />

      <button
        type="button"
        onClick={() => pickerRef.current.setOpen(true)}
        className="px-2 border-l py-2"
      >
        <Icon name="calendar_month" />
      </button>
    </div>
  );
};


export default function StockLedger() {
    const fromRef = useRef(null);
    const toRef = useRef(null);
    const accountBoxRef = useRef(null);


  const [fromDate, setFromDate] = useState(new Date("2026-02-01"));
  const [toDate, setToDate] = useState(new Date("2026-02-06"));

  const [showDatePopup, setShowDatePopup] = useState(false);
  const [showLedger, setShowLedger] = useState(false);
  const [openAddOns, setOpenAddOns] = useState(false);
  const ledgerRowData = []; 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  const totalRecords = ledgerRowData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const goFirst = () => setCurrentPage(1);

  const goPrev = () =>
    setCurrentPage((p) => Math.max(1, p - 1));

  const goNext = () =>
    setCurrentPage((p) => Math.min(totalPages, p + 1));

  const goLast = () => setCurrentPage(totalPages);

  const pagedLedgerData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return ledgerRowData.slice(start, end);
  }, [ledgerRowData, currentPage, pageSize]);

  const [columnDefs, setColumnDefs] = useState(BASE_COLUMNS);
  const [showMemorandumCol, setShowMemorandumCol] = useState(false);
  const [showBranchCol, setShowBranchCol] = useState(false);


// 🔥 STEP 4: checkbox ke hisaab se columns add / remove
useEffect(() => {
  let cols = [...BASE_COLUMNS];

  if (showBranchCol) {
    cols.splice(3, 0, {
      headerName: "BRANCH",
      field: "branch",
      width: 140,
    });
  }

  if (showMemorandumCol) {
    cols.push({
      headerName: "MEMO",
      field: "memorandum",
      width: 120,
    });
  }

  setColumnDefs(cols);
}, [showBranchCol, showMemorandumCol]);


  
const items = [
  "Ball Pen (BOX)",
  "Notebook A4",
  "Marker Blue",
  "Register 200 Pages",
];

const [itemSearch, setItemSearch] = useState("");

const [showAccountList, setShowAccountList] = useState(false);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      accountBoxRef.current &&
      !accountBoxRef.current.contains(e.target)
    ) {
      setShowAccountList(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

  {!showLedger && (
    <>
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Stock Ledger
        </h1>

        <button className="border border-primary text-primary px-3 py-2 rounded-md font-bold text-tiny">
          &lt;&lt; Back
        </button>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="flex justify-center">
        <div className="bg-white w-[900px] rounded-xl shadow-xl p-6">

            {/* ================= TYPE / MODULE / CRITERIA ================= */}
    <div className="grid grid-cols-2 gap-6 mb-4">

    {/* LEFT COLUMN */}
    <div className="space-y-4">

        {/* Type */}
        <div>
        <label className="text-[13px] font-bold text-gray-700">Type</label>
        <select className="w-full h-[40px] border rounded-md px-3 font-semibold">
            <option>Stock Ledger</option>
            <option>Stock Summary</option>
        </select>
        </div>

        {/* Criteria */}
        <div>
        <label className="text-[13px] font-bold text-gray-700">Criteria</label>
        <select className="w-full h-[40px] border rounded-md px-3 font-semibold">
            <option>All MC</option>
            <option>MC Wise</option>
        </select>
        </div>

        {/* Item (existing – no change) */}
        <div ref={accountBoxRef} className="relative">
        <label className="text-[13px] font-bold text-gray-700">Item</label>
       <input
        value={itemSearch}
        onChange={(e) => {
            setItemSearch(e.target.value);
            setShowAccountList(true);
        }}
        onFocus={() => setShowAccountList(true)}
        onBlur={() => {
            // delay so item click register ho jaye
            setTimeout(() => setShowAccountList(false), 150);
        }}
        placeholder="Search name..."
        className="w-full h-[40px] border rounded-md px-3 font-semibold"
        />

      {showAccountList && (
          <div
                onMouseDown={(e) => e.stopPropagation()}
                className="absolute left-0 right-0 bg-white border rounded-md mt-1 max-h-[220px] overflow-y-auto shadow-lg z-40"
            >
          {items
            .filter((a) =>
              a.toLowerCase().includes(itemSearch.toLowerCase())
            )
            .map((name) => (
             <div
                key={name}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                    setItemSearch(name);
                    setShowAccountList(false);
                }}
                className="px-3 py-2 cursor-pointer hover:bg-[#eaf2ff]"
                >

                {name}
              </div>
            ))}
        </div>
      )}
    </div>
  </div>

  {/* RIGHT COLUMN */}
  <div className="space-y-4">

    {/* Module */}
    <div>
      <label className="text-[13px] font-bold text-gray-700">Module</label>
      <select className="w-full h-[40px] border rounded-md px-3 font-semibold">
        <option>Item Account</option>
      </select>
    </div>

    {/* MC */}
    <div>
      <label className="text-[13px] font-bold text-gray-700">MC</label>
      <input
        disabled
        className="w-full h-[40px] border rounded-md px-3 bg-[#f3f4f6]"
      />
    </div>

    {/* UOM */}
    <div>
      <label className="text-[13px] font-bold text-gray-700">UOM</label>
      <input
        disabled
        className="w-full h-[40px] border rounded-md px-3 bg-[#f3f4f6]"
      />
    </div>

  </div>
</div>


     

          {/* MONTH / PERIOD SECTION */}
          <div className="flex gap-6">

            {/* LEFT */}
            <div className="w-[55%]">
              <div className="grid grid-cols-4 gap-2 text-[13px] font-bold">
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
                <div className="flex-1 text-center font-bold text-[13px]">
                  FY: 2025 - 26
                </div>
                <button className="w-[36px] h-full border-l text-[22px]">›</button>
              </div>

        <div className="flex items-center gap-3">
        <label className="w-[55px] font-bold text-[16px]">From</label>

        {/* INPUT + ICON WRAPPER */}
        <div className="relative flex-1">
            <DatePicker
            ref={fromRef}
            selected={fromDate}
            onChange={setFromDate}
            dateFormat="dd-MM-yyyy"
            className="
                w-full h-[36px]
                pl-4 pr-20
                border rounded-md
                font-semibold text-[13px]
            "
            />

            {/* ICON INSIDE INPUT */}
            <button
            type="button"
            onClick={() => fromRef.current.setOpen(true)}
            className="
                absolute right-2 top-1/2
                -translate-y-1/2
                text-gray-600
            "
            >
            <Icon name="calendar_month" />
            </button>
        </div>
        </div>



        <div className="flex items-center gap-3">
        <label className="w-[55px] font-bold text-[16px]">To</label>

        {/* INPUT + ICON WRAPPER */}
        <div className="relative flex-1">
            <DatePicker
            ref={toRef}
            selected={toDate}
            onChange={setToDate}
            dateFormat="dd-MM-yyyy"
            className="
                w-full h-[36px]
                pl-4 pr-20
                border rounded-md
                font-semibold text-[13px]
            "
            />

            {/* ICON INSIDE INPUT */}
            <button
            type="button"
            onClick={() => toRef.current.setOpen(true)}
            className="
                absolute right-2 top-1/2
                -translate-y-1/2
                text-gray-600
            "
            >
            <Icon name="calendar_month" />
            </button>
        </div>
        </div>



              <div className="flex justify-end">
                <button className="h-[36px] px-4 border rounded-md font-bold bg-[#eff2f6] text-[13px]">
                  TILL DATE
                </button>
              </div>
            </div>
          </div>

          {/* GO BUTTON */}
        <button
          onClick={() => setShowLedger(true)}
          className="mt-6 w-full h-[42px] bg-[#22a300] text-white rounded-md font-extrabold"
        >
          GO
        </button>

        </div>
      </div>

   </>
  )}

  {showLedger && (
  <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">
{/* ================= LEDGER HEADER BAR ================= */}
<div className="flex justify-between items-start mb-4">
  <div>
    <h1 className="text-[28px] font-extrabold text-black">
     Item Ledger
    </h1>
  </div>

  <div className="flex items-center gap-2">
            <IconBtn icon="offline_bolt" tooltip="Power Q" />
            <IconBtn icon="print" tooltip="Print" />
            <IconBtn icon="download" tooltip="Download" />
            <IconBtn icon="share" tooltip="Share" />
        </div>

  
</div>

{/* ================= DATE BAR (SAME AS GROUP LIST) ================= */}
<div className="flex items-center gap-3 mb-4">
  <DateFieldBox label="From" selected={fromDate} onChange={setFromDate} />
  <DateFieldBox label="To" selected={toDate} onChange={setToDate} />

  <button
    type="button"
    onClick={() => setShowDatePopup(true)}
    className="h-[35px] w-[38px] flex items-center justify-center border border-primary text-primary rounded-md bg-white"
  >
    <Icon name="date_range" className="text-[20px]" />
  </button>

  <button className="h-[35px] px-6 bg-primary text-white font-bold rounded-md text-tiny">
    GO
  </button>

 {/* RIGHT SIDE CONTROLS */}
  <div className="ml-auto flex items-center gap-3">

    {/* VIEW */}
    <div className="flex items-center border rounded-md overflow-hidden h-[36px]">
      <div className="px-3 bg-[#f3f6fb] font-bold text-[13px] border-r">
        View
      </div>
      <select className="px-3 h-full text-[13px] font-semibold outline-none">
        <option>Condensed</option>
        <option>Detailed</option>
      </select>
    </div>

    

<div className="flex items-center border rounded-md overflow-hidden h-[36px]">
  <div className="px-3 bg-[#f3f6fb] font-bold text-[13px] border-r">
    Valuation
  </div>
  <select className="px-3 h-full text-[13px] font-semibold outline-none">
    <option>FIFO</option>
    <option>LIFO</option>
    <option>AVG</option>
  </select>
</div>

    {/* ADD ONS */}
    <div className="relative">
      <button
        onClick={() => setOpenAddOns(p => !p)}
        className="h-[36px] px-3 bg-primary text-white font-bold
                   rounded-md flex items-center gap-2 text-tiny"
      >
        view
        <Icon name="expand_more" className="text-[18px]" />
      </button>

      {openAddOns && (
        <div className="absolute right-0 mt-2 w-[220px]
                        bg-white border rounded-md shadow-lg z-50">
          <button className="w-full text-left px-4 py-3 hover:bg-[#f3f6fb]">
            Exclude Nil Balances
          </button>
        </div>
      )}
    </div>

    {/* VOUCHER SERIES */}
    <button
      className="h-[36px] px-3 bg-primary text-white font-bold
                 rounded-md text-tiny flex items-center gap-2"
    >
       Add Ons
      <Icon name="expand_more" className="text-[18px]" />
    </button>

    {/* BACK */}
    <button
      onClick={() => setShowLedger(false)}
      className="h-[36px] px-5 border border-primary
                 text-primary font-bold rounded-md text-[13px]"
    >
      Back
    </button>

  </div>
</div>

<div className="flex items-center gap-3 mb-4 text-[13px] font-semibold">
  <label className="flex items-center gap-2">
    <input type="checkbox" />
    Inward Rate
  </label>

  <label className="flex items-center gap-2">
    <input type="checkbox" />
    Outward Rate
  </label>

  <label className="flex items-center gap-2">
    <input type="checkbox" />
    Inward Amount
  </label>

  <label className="flex items-center gap-2">
    <input type="checkbox" />
    Outward Amount
  </label>

  <label className="flex items-center gap-2">
    <input type="checkbox" />
    Value
  </label>

  <label className="flex items-center gap-2">
    <input type="checkbox" />
    Profit
  </label>
</div>


{/* ================= ACCOUNT INFO ================= */}
<div className="flex justify-between italic mb-3 text-[15px]">
  <div>
     Item: <span className="font-bold">{itemSearch}</span>
  </div>
  <div className="flex items-center gap-3">

  <button className="px-4 py-2 bg-primary text-white font-bold rounded-md text-tiny">
    Opening Balance
  </button>
</div>

</div>

{/* ================= FILTER BAR ================= */}
<div className="flex items-center gap-3 px-3 py-2 border-b bg-white text-[13px]">
  <span className="font-semibold">Filter:</span>

  <input
    type="text"
    placeholder="Enter your keyword"
    className="h-[28px] px-3 border rounded-md w-[220px]"
  />

  <select className="h-[28px] px-2 border rounded-md font-semibold">
    <option>DATE</option>
    <option>TYPE</option>
    <option>VCH NO</option>
    <option>ACCOUNT</option>
  </select>

  <select className="h-[28px] px-2 border rounded-md font-semibold">
    <option>Contains</option>
    <option>Begins With</option>
    <option>Ends With</option>
  </select>


</div>

{/* ================= AG GRID (LEDGER) ================= */}
<div className="bg-white border rounded-b-md overflow-hidden">
  <div   className="ag-theme-alpine daybook-grid balance-grid"
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
  }}>
   <AgGridReact
   rowData={pagedLedgerData}
  theme="legacy"
  columnDefs={columnDefs}
  pinnedBottomRowData={pinnedBottomRowData}
  overlayNoRowsTemplate="No rows to display."
  domLayout="autoHeight"
  headerHeight={32}
  rowHeight={30}
  pagination={false}
  defaultColDef={{
    sortable: false,
    filter: false,
    resizable: true,
  }}
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
  {/* ================= PAGINATION ================= */}
<div className="flex items-center justify-between px-4 py-2 border-t bg-white text-[14px]">

  <div className="flex items-center gap-2">

    <button onClick={goFirst}
      className="text-[20px] font-bold px-2 opacity-60 hover:opacity-100">
      «
    </button>

    <button onClick={goPrev}
      className="text-[20px] font-bold px-2 opacity-60 hover:opacity-100">
      ‹
    </button>

    <span>Page</span>

    <input
      value={currentPage}
      readOnly
      className="w-[42px] h-[26px] border text-center rounded"
    />

    <span>of {totalPages}</span>

    <button onClick={goNext}
      className="text-[20px] font-bold px-2 opacity-60 hover:opacity-100">
      ›
    </button>

    <button onClick={goLast}
      className="text-[20px] font-bold px-2 opacity-60 hover:opacity-100">
      »
    </button>

    <select
      value={pageSize}
      onChange={(e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1);
      }}
      className="ml-2 h-[28px] px-2 border rounded-md font-semibold"
    >
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
  </div>

  <div>
    Displaying{" "}
    {totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1}
    {" "}to{" "}
    {Math.min(currentPage * pageSize, totalRecords)}
    {" "}of {totalRecords} items.
  </div>
</div>
</div>

{/* ================= TOTALS ================= */}

<div className="flex justify-end gap-4 mt-4">
  <button className="px-5 py-2 bg-primary text-white font-bold rounded-md text-tiny">
    Total Amount
  </button>

  <button className="px-5 py-2 bg-primary text-white font-bold rounded-md text-tiny">
    Closing Balance
  </button>
</div>



  </div>
)}

      {/* ================= DATE POPUP (SAME AS IMAGE) ================= */}
      {showDatePopup && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start">
          <div className="mt-[60px] w-[820px] bg-white rounded-[14px] border-2 border-primary shadow-xl px-6 py-5">

            {/* CONTENT */}
            <div className="flex gap-6">

              {/* LEFT */}
              <div className="w-[55%]">
                <div className="grid grid-cols-4 gap-2 text-[13px] font-bold">
                  {["APR","JUL","OCT","JAN","MAY","AUG","NOV","FEB","JUN","SEP","DEC","MAR"].map(m => (
                    <button key={m} className="h-[36px] bg-[#e2f6dc] rounded-md">{m}</button>
                  ))}
                  {["Q1","Q2","Q3","Q4"].map(q => (
                    <button key={q} className="h-[36px] bg-[#bfeab1] rounded-md">{q}</button>
                  ))}
                  <button className="h-[36px] bg-[#d6e8fa] rounded-md">H1</button>
                  <button className="h-[36px] bg-[#d6e8fa] rounded-md">H2</button>
                </div>

                <div className="mt-3 flex items-center gap-2 font-bold text-[13px]">
                  <input type="checkbox" />
                  <span>TILL PERIOD</span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="w-[45%] space-y-3">
                <div className="flex items-center h-[36px] border rounded-md bg-[#eff2f6]">
                  <button className="w-[36px] h-full border-r">‹</button>
                  <div className="flex-1 text-center font-bold text-[13px]">
                    FY: 2025 - 26
                  </div>
                  <button className="w-[36px] h-full border-l">›</button>
                </div>

                <div className="flex items-center gap-3">
                  <label className="w-[55px] font-bold text-[13px]">From</label>
                  <input className="flex-1 h-[36px] border rounded-md px-3" />
                </div>

                <div className="flex items-center gap-3">
                  <label className="w-[55px] font-bold text-[13px]">To</label>
                  <input className="flex-1 h-[36px] border rounded-md px-3" />
                </div>

                <div className="flex justify-end">
                  <button className="h-[36px] px-4 border rounded-md font-bold bg-[#eff2f6]">
                    TILL DATE
                  </button>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-center gap-4 mt-5">
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
