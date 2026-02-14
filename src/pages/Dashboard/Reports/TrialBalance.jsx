import React, { useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";


ModuleRegistry.registerModules([AllCommunityModule]);

/* ===== ICON ===== */
const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`}>
    {name}
  </span>
);

const formatINR = (value) => {
  if (value === null || value === undefined) return "";
  return `₹ ${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};


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


export default function TrialBalance() {
  const gridRef = useRef(null);
  const navigate = useNavigate(); 

  /* ===== DATE ===== */
  const [fromDate, setFromDate] = useState(new Date("2026-01-01"));
  const [toDate, setToDate] = useState(new Date("2026-01-30"));
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [openAddOns, setOpenAddOns] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);
  const [fixedGrid, setFixedGrid] = useState(false);
  const [consolidated, setConsolidated] = useState(false);
  const [viewBy, setViewBy] = useState("Groups");

 


  const onCellDoubleClicked = (params) => {
  if (!params || !params.value) return;

  const field = params.colDef.field;
  const value = params.value;

 
  if (params.data?.isTotal) return;


  if (field === "debit" || field === "credit") return;

  if (field === "parent") return;

  let groupName = "";

  // GROUPS view
  if (viewBy === "Groups" && field === "group") {
    groupName = value;
  }

  // ACCOUNTS view
  if (viewBy === "Accounts" && field === "account") {
    groupName = value;
  }

  // OPENING BALANCE view
  if (viewBy === "Opening Balance" && field === "account") {
    groupName = value;
  }

  if (!groupName) return;

  // ✅ NAVIGATE
  navigate("/company/dashboard/reports/account-group-list", {
    state: {
      groupName,
      fromDate,
      toDate,
    },
  });
};


  /* ===== GRID DATA (DUMMY FOR UI) ===== */
const rowData = useMemo(() => [
  { group: "Capital Account", parent: "Owner's Fund", debit: null, credit: 2638603.74 },
  { group: "Long Term Borrowings", parent: "Non Current Liabilities", debit: null, credit: 10391576.74 },
  { group: "Fixed Assets", parent: "Non Current Assets", debit: 820550.0, credit: null },
  { group: "Long Term Loans & Advances", parent: "Non Current Assets", debit: 550000.0, credit: null },
  { group: "Short Term Borrowings", parent: "Current Liabilities", debit: 392.0, credit: null },
  { group: "Trade Payable", parent: "Current Liabilities", debit: null, credit: 3276451.45 },
  { group: "Other Current Liabilities", parent: "Current Liabilities", debit: null, credit: 0.06 },
  { group: "Current Investments", parent: "Current Assets", debit: null, credit: 736000.0 },
  { group: "BANK OD / OCC A/c", parent: "Current Liabilities", debit: null, credit: 889182.79 },
  { group: "Trade Receivables", parent: "Current Assets", debit: 6699339.94, credit: null },
  { group: "Cash & Cash Equivalents", parent: "Current Assets", debit: null, credit: 1519049.27 },
  { group: "Other Current Assets", parent: "Current Assets", debit: 795973.23, credit: null },
  { group: "Investments", parent: "Current Assets", debit: 847968.06, credit: null },
  { group: "Reserve & Surplus BOI", parent: "Current Assets", debit: 7357.04, credit: null },
  { group: "Reserve & Surplus Axis", parent: "Current Assets", debit: null, credit: 0.0 },
  { group: "EXPENSES HOME", parent: "Indirect Expenses", debit: 1514011.99, credit: null },
  { group: "EXPENSES OFFICE", parent: "Indirect Expenses", debit: 3835166.60, credit: null },
  { group: "HDFC 2860 (Primary Account)", parent: "Current Liabilities", debit: null, credit: 1802302.63 },
  { group: "COMMISSION (Primary Account)", parent: "Indirect Income", debit: null, credit: 2221.28 },
  { group: "MISCELLANEOUS INCOME (Primary Account)", parent: "Indirect Income", debit: null, credit: 50181.38 },
  { group: "PROCEEDS (Primary Account)", parent: "Indirect Income", debit: null, credit: 7551018.78 },
  { group: "SAVING INTEREST (Primary Account)", parent: "Indirect Income", debit: null, credit: 98112.78 },
  { group: "SHRUTI PROCEEDS (Primary Account)", parent: "Indirect Income", debit: null, credit: 810000.0 },
  { group: "ICICI CC UPI (Primary Account)", parent: "Current Liabilities", debit: null, credit: 11282.58 },
  { group: "Other (Primary Account)", parent: "Indirect Expenses", debit: null, credit: 3461461.23 },
  { group: "Difference in Opening", parent: "", debit: 18166685.85, credit: null },

  // ✅ TOTAL ROW (EXACT)
  {
    isTotal: true,
    group: "Total",
    parent: "",
    debit: 33237444.71,
    credit: 33237444.71,
  },
], []);


  /* ===== COLUMNS ===== */
const columnDefs = useMemo(() => [
  {
    headerName: "GROUP / ACCOUNT / BSD",
    field: "group",
    flex: 1,
   cellRenderer: (p) => <span>{p.value}</span>,
  },
  {
    headerName: "PARENT",
    field: "parent",
    flex: 1,
    cellRenderer: (p) =>
      <span className="text-gray-600">{p.value}</span>,
  },
  {
    headerName: "DEBIT (₹)",
    field: "debit",
    width: 180,
    cellRenderer: (p) => (
    <span className="float-right">{formatINR(p.value)}</span>
  ),
  },
  {
    headerName: "CREDIT (₹)",
    field: "credit",
    width: 180,
    cellRenderer: (p) => (
    <span className="float-right">{formatINR(p.value)}</span>
  ),
  },
], []);


  const defaultColDef = useMemo(
    () => ({
      sortable: false,
      filter: false,
      resizable: true,
    }),
    []
  );



const accountsRowData = useMemo(() => [
  { account: "Closing Inventory", parent: "Current Assets", debit: null, credit: null },
  { account: "Inventory Difference", parent: "Profit & Loss A/C", debit: null, credit: null },

  { account: "Aicountly Interactive Services Pvt. Ltd.", parent: "Trade Receivables", debit: 7244140.03, credit: null },
  { account: "ASSET RESERVE AXIS", parent: "Reserve & Surplus Axis", debit: null, credit: 14279.48 },
  { account: "BABU RAM", parent: "Other Current Assets", debit: 50149.85, credit: null },
  { account: "BAJAJ FINERSV", parent: "Short Term Borrowings", debit: 392.0, credit: null },
  { account: "BANK CHARGES", parent: "EXPENSES OFFICE", debit: 176865.19, credit: null },
  { account: "BHARAT BHUSHAN GUPTA", parent: "Trade Receivables", debit: 83303.0, credit: null },
  { account: "BHARAT BHUSHAN GUPTAHUF", parent: "Trade Receivables", debit: null, credit: 57440.0 },
  { account: "BIKE", parent: "Fixed Assets", debit: 86772.0, credit: null },
  { account: "BIKE AND LAPTOP EMI", parent: "EMI OFFICE", debit: 90703.68, credit: null },
  { account: "BIKE REPAIR AND MAINTANCE", parent: "EXPENSES OFFICE", debit: 740.0, credit: null },
  { account: "BIOMATRIC MACHINE EMI O", parent: "EXPENSES OFFICE", debit: 12835.13, credit: null },
  { account: "BRAND CRAFTER UCO", parent: "Trade Payable", debit: null, credit: null },
  { account: "BUILDING REPAIR & MAINTENANCE O", parent: "EXPENSES OFFICE", debit: 18800.0, credit: null },
  { account: "CAFE EQUIPMENTS EMI", parent: "EXPENSES OFFICE", debit: 33295.61, credit: null },

  { account: "SUBSCRIPTION EXPENSES O", parent: "EXPENSES OFFICE", debit: 154391.90, credit: null },
  { account: "SUBSCRIPTION RESERVE AXIS", parent: "Reserve & Surplus Axis", debit: 40705.58, credit: null },
  { account: "SUSPENSE", parent: "Trade Receivables", debit: 800891.01, credit: null },
  { account: "TAX RESERVE AXIS", parent: "Reserve & Surplus Axis", debit: 20000.0, credit: null },
  { account: "TELEPHONE EXPENSES O", parent: "EXPENSES OFFICE", debit: 8830.70, credit: null },
  { account: "TELEPHONE H", parent: "EXPENSES HOME", debit: 6410.54, credit: null },
  { account: "TRAVELLING EXPENSES H", parent: "EXPENSES HOME", debit: 20785.60, credit: null },
  { account: "TRAVELLING EXPENSES O", parent: "EXPENSES OFFICE", debit: 13214.27, credit: null },
  { account: "UNIVERSAL TRADING UCO", parent: "Trade Payable", debit: null, credit: null },
  { account: "VENDOR", parent: "Trade Payable", debit: 69350.0, credit: null },
  { account: "WATER & ELECTRICITY EXPENSES H", parent: "EXPENSES HOME", debit: 26424.90, credit: null },
  { account: "WATER DISPENSER EMI", parent: "EXPENSES OFFICE", debit: 9842.05, credit: null },
  { account: "WORKFORCE CONNECT UCO", parent: "Trade Payable", debit: null, credit: 500.0 },
  { account: "XL6", parent: "Fixed Assets", debit: 447047.0, credit: null },

  { account: "Difference in Opening", parent: "", debit: 18166685.85, credit: null },

  // ✅ TOTAL (exact image value)
  {
    isTotal: true,
    account: "Total",
    parent: "",
    debit: 38104019.36,
    credit: 38104019.36,
  },
], []);


const accountsColumnDefs = useMemo(() => [
  {
    headerName: "GROUP / ACCOUNT /BSD",
    field: "account",
    flex: 1,
    cellRenderer: (p) => <span>{p.value}</span>,
  },
  {
    headerName: "PARENT",
    field: "parent",
    flex: 1,
    cellRenderer: (p) => <span className="text-gray-600">{p.value}</span>,
  },
  {
    headerName: "DEBIT (₹)",
    field: "debit",
    width: 180,
    cellRenderer: (p) => (
    <span className="float-right">{formatINR(p.value)}</span>
  ),
  },
  {
    headerName: "CREDIT (₹)",
    field: "credit",
    width: 180,
   cellRenderer: (p) => (
    <span className="float-right">{formatINR(p.value)}</span>
  ),
  },
], []);


const openingBalanceRowData = useMemo(() => [
  { account: "HDFC CC", parent: "BANK OD / OCC A/c", debit: null, credit: 1044.96 },
  { account: "HDFC OD LAS", parent: "BANK OD / OCC A/c", debit: null, credit: 816145.60 },
  { account: "ICICI CC AMAZON", parent: "BANK OD / OCC A/c", debit: null, credit: 10697.07 },
  { account: "ICICI CC MMT", parent: "BANK OD / OCC A/c", debit: 36360.45, credit: null },
  { account: "INDUSIND CC", parent: "BANK OD / OCC A/c", debit: null, credit: 26013.78 },

  { account: "RAHUL GUPTA CAPITAL ACCOUNT", parent: "Capital Account", debit: null, credit: 2605141.53 },

  { account: "Cash In Hand", parent: "Cash & Cash Equivalents", debit: null, credit: 2041620.00 },
  { account: "HDFC 0187", parent: "Cash & Cash Equivalents", debit: 235063.88, credit: null },
  { account: "ICICI 0878", parent: "Cash & Cash Equivalents", debit: 2007.85, credit: null },
  { account: "IDFC FIRST 9951", parent: "Cash & Cash Equivalents", debit: 33510.82, credit: null },
  { account: "INDUSIND BANK 71715", parent: "Cash & Cash Equivalents", debit: 3142.51, credit: null },
  { account: "KOTAK SAVING NEW", parent: "Cash & Cash Equivalents", debit: 21823.19, credit: null },
  { account: "RBL SAVING", parent: "Cash & Cash Equivalents", debit: 25498.17, credit: null },
  { account: "SBI SAVING", parent: "Cash & Cash Equivalents", debit: 4708.98, credit: null },
  { account: "SHRUTI SBI", parent: "Cash & Cash Equivalents", debit: 219200.00, credit: null },

  { account: "POST OFFICE RD", parent: "Current Investments", debit: null, credit: null },

  { account: "CORNER LINK UCO", parent: "Trade Payable", debit: 1000.00, credit: null },
  { account: "GAYATRI TRADERS UCO", parent: "Trade Payable", debit: 1000.00, credit: null },
  { account: "MODERN TRANSMISSION", parent: "Trade Payable", debit: null, credit: 606780.00 },
  { account: "ONE STEP SOLUTION UCO", parent: "Trade Payable", debit: 1000.00, credit: null },
  { account: "Rahul B Gupta & Co", parent: "Trade Payable", debit: 39147.83, credit: null },
  { account: "Shivansh Interactive Services Pvt. Ltd.", parent: "Trade Payable", debit: 354535.18, credit: null },
  { account: "SHRESD GAYATHRI FOUNDATION", parent: "Trade Payable", debit: 2000.00, credit: null },
  { account: "UNIVERSAL TRADING UCO", parent: "Trade Payable", debit: 1000.00, credit: null },
  { account: "VENDOR", parent: "Trade Payable", debit: 5550.00, credit: null },
  { account: "WORKFORCE CONNECT UCO", parent: "Trade Payable", debit: 1000.00, credit: null },

  { account: "Aicountly Interactive Services Pvt. Ltd.", parent: "Trade Receivables", debit: null, credit: 587595.97 },
  { account: "JAI RAM UTILITIES", parent: "Trade Receivables", debit: 15160.00, credit: null },
  { account: "OROBITE ROPAR", parent: "Trade Receivables", debit: 121500.00, credit: null },
  { account: "RAHUL B GUPTA CO CHD", parent: "Trade Receivables", debit: null, credit: 698657.00 },
  { account: "RAHUL GUPTA HUF", parent: "Trade Receivables", debit: null, credit: 18000.00 },
  { account: "RBGC SBI CA", parent: "Trade Receivables", debit: null, credit: 225000.00 },
  { account: "SISPL SBI", parent: "Trade Receivables", debit: 99.00, credit: null },

  { account: "Opening Stock", parent: "", debit: null, credit: null },

  // ✅ TOTAL (exact image bottom)
  {
    isTotal: true,
    account: "Total",
    parent: "",
    debit: 4887845.29,
    credit: 23054531.14,
  },
], []);


  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">
      {/* ================= HEADER ================= */}
        <div className="flex justify-between items-start mb-4">
        <div>
            <h1 className="text-[28px] font-extrabold text-black">
             Trial Balance
            </h1>
            <div className="text-[14px] italic text-[#4b5563]">
              As the end of 31-03-2026
            </div>
        </div>

        <div className="flex items-center gap-2">
            <IconBtn icon="offline_bolt" tooltip="Power Q" />
            <IconBtn icon="print" tooltip="Print" />
            <IconBtn icon="download" tooltip="Download" />
            <IconBtn icon="share" tooltip="Share" />
        </div>
        </div>


      {/* ================= DATE BAR ================= */}
      <div className="flex items-center gap-3 mb-4">
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

        <div className="ml-auto flex items-center gap-2">

        <div className="ml-auto flex items-center gap-3">

        {/* FIXED GRID */}
        <label className="flex items-center gap-2 text-[13px] font-semibold text-[#374151]">
            <input
            type="checkbox"
            checked={fixedGrid}
            onChange={(e) => setFixedGrid(e.target.checked)}
            className="accent-primary"
            />
            Fixed Grid
        </label>

        {/* CONSOLIDATED */}
        <label className="flex items-center gap-2 text-[13px] font-semibold text-[#374151]">
            <input
            type="checkbox"
            checked={consolidated}
            onChange={(e) => setConsolidated(e.target.checked)}
            className="accent-primary"
            />
            Consolidated In All Branches
        </label>

            {/* VIEW + DROPDOWN */}
            <div className="flex items-center border border-[#cfd6e4] rounded-md overflow-hidden h-[38px] bg-white">
                <div className="px-4 bg-[#f3f6fb] border-r text-[13px] font-bold py-2">
                View
                </div>

                <select
                value={viewBy}
                onChange={(e) => setViewBy(e.target.value)}
                className="px-4 h-full outline-none text-[13px] font-semibold bg-white"
                >
                <option>Groups</option>
                <option>Accounts</option>
                <option>Opening Balance</option>
                </select>
            </div>

        </div>


      {/* ADD ONS DROPDOWN */}
        <div className="relative">
        <button
            type="button"
            onClick={() => setOpenAddOns((p) => !p)}
            className="
            h-[38px] px-2
            bg-primary text-white
            font-bold text-tiny
            rounded-md
            flex items-center gap-2
            "
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
                border border-[#cfd6e4]
                rounded-md
                shadow-lg
                z-50
            "
            >
            <button
                className="
                w-full text-left
                px-4 py-3
                text-[14px]
                hover:bg-[#f3f6fb]
                "
                onClick={() => setOpenAddOns(false)}
            >
                Exclude Nil Balances
            </button>
            </div>
        )}
        </div>


        {/* BACK */}
        <button className="h-[36px] px-5 border border-primary text-primary font-bold rounded-md text-tiny">
            Back
        </button>
        </div>

      </div>


      {/* ===== GRID FILTER BAR  ===== */}
    <div className="flex items-center gap-2 px-3 py-2 border-b bg-white text-[13px]">
      <span className="font-semibold">Filter:</span>

      <input
        type="text"
        placeholder="Enter your keyword"
        className="h-[30px] px-3 border rounded-md w-[240px]"
      />

      <select className="h-[30px] px-2 border rounded-md font-semibold">
        <option>GROUP / ACCOUNT / BSD</option>
        <option>PARENT</option>
        <option>DEBIT (₹)</option>
        <option>CREDIT (₹)</option>
      </select>

      <select className="h-[30px] px-2 border rounded-md font-semibold">
        <option>Contains</option>
        <option>Begins With</option>
        <option>Ends With</option>
        <option>Does not contain</option>
        <option>Equal To</option>
        <option>Not Equal To</option>
        <option>Empty</option>
        <option>Not Empty</option>
        <option>Less Than</option>
        <option>Great Than</option>
        <option>Regex</option>
      </select>
    </div>


      {/* ================= GRID ================= */}
     <div className="bg-white border border-t-0 rounded-b-md overflow-hidden">

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
          theme="legacy"
          rowData={
              viewBy === "Accounts"
                ? accountsRowData
                : viewBy === "Opening Balance"
                ? openingBalanceRowData
                : rowData
            }

          columnDefs={
              viewBy === "Accounts" || viewBy === "Opening Balance"
                ? accountsColumnDefs
                : columnDefs
            }
          defaultColDef={defaultColDef}
          onCellDoubleClicked={onCellDoubleClicked}
          pagination={false}
          rowSelection="single"
          headerHeight={34}
          rowHeight={32}
          domLayout="autoHeight"
          animateRows
          getRowStyle={(params) => {
          if (params.data?.isTotal) {
            return {
              background: "#e6f0f7", // ✅ light blue like image
            };
          }
          return null;
        }}

        />

        </div>

       
      </div>

      {/* ================= QUICK ACCESS ================= */}
        <div className="mt-2   px-6 py-3 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
            <span className="text-[14px] font-semibold text-gray-700">
              Quick Access
            </span>

            <button className="bg-primary hover:bg-green-700 text-white text-[13px] font-semibold px-4 py-[6px] rounded-md">
             Balance Sheet
            </button>

            <button className="bg-primary hover:bg-green-700 text-white text-[13px] font-semibold px-4 py-[6px] rounded-md">
             Profit & Loss
            </button>

            <button className="bg-primary hover:bg-green-700 text-white text-[13px] font-semibold px-4 py-[6px] rounded-md">
            Trading
            </button>
        </div>

        {/* RIGHT */}
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpenDownload((p) => !p)}
                className="
                flex items-center gap-2
                bg-[#1f2937]
                text-white
                text-[13px]
                font-semibold
                px-4 py-[6px]
                rounded-md
                "
            >
                Download as
                <span className="text-[14px]">▾</span>
            </button>

            {openDownload && (
                <div
                className="
                    absolute right-0 mt-2
                    w-[160px]
                    bg-white
                    border border-[#cfd6e4]
                    rounded-md
                    shadow-lg
                    z-50
                    overflow-hidden
                "
                >
                <button
                    className="w-full text-left px-4 py-2 text-[14px] hover:bg-gray-100"
                    onClick={() => setOpenDownload(false)}
                >
                    CSV
                </button>

                <button
                    className="w-full text-left px-4 py-2 text-[14px] hover:bg-gray-100"
                    onClick={() => setOpenDownload(false)}
                >
                    Excel
                </button>

                <button
                    className="w-full text-left px-4 py-2 text-[14px] hover:bg-gray-100"
                    onClick={() => setOpenDownload(false)}
                >
                    PDF
                </button>
                </div>
            )}
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
