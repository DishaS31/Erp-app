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


export default function BalanceSheet() {
  const gridRef = useRef(null);
   const navigate = useNavigate();

  /* ===== DATE ===== */
  const [fromDate, setFromDate] = useState(new Date("2026-01-01"));
  const [toDate, setToDate] = useState(new Date("2026-01-30"));
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [openAddOns, setOpenAddOns] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);
  const [viewType, setViewType] = useState("Schedules");
  const isCondensed = viewType === "Condensed";
  const isDetailed = viewType === "Detailed";

  const [format, setFormat] = useState("Horizontal");

  const isSchedule = viewType === "Schedules";
  const isVertical = format === "Vertical";



  const onCellDoubleClicked = (params) => {
  if (!params || !params.value) return;

  const field = params.colDef.field;
  const value = params.value;

  // ❌ Amount columns ignore
  if (
    field === "liabilityAmt" ||
    field === "assetAmt" ||
    field === "amount"
  ) {
    return;
  }

  // ❌ Section / Header / Total rows ignore
  if (
    params.data?.isSection ||
    params.data?.isHeader ||
    params.data?.isTotal ||
    params.data?.rowType === "TOTAL"
  ) {
    return;
  }


  if (viewType === "Condensed") return;

 
  if (field === "liability" || field === "asset" || field === "label") {
    navigate("/company/dashboard/reports/account-group-list", {
      state: {
        groupName: value.replace(/^›\s*/, ""), 
        fromDate,
        toDate,
      },
    });
  }
};


  /* ===== GRID DATA (DUMMY FOR UI) ===== */
const rowData = useMemo(() => [
  /* ================= OWNER FUND ================= */
  {
    isSection: true,
    highlight: "green",
    liability: "Owner's Fund",
    liabilityAmt: "",
    asset: "Non Current Assets",
    assetAmt: "",
  },

  {
    liability: "Capital Account",
    liabilityAmt: "₹26,38,603.74",
    asset: "Capital Work In Progress",
    assetAmt: "",
  },
  {
    liability: "Reserves & Surplus",
    liabilityAmt: "",
    asset: "Deferred Tax Assets",
    assetAmt: "",
  },

  /* ================= PROFIT / LOSS ================= */
  {
    isSection: true,
    liability: "Profit / Loss",
    liabilityAmt: "₹20,59,528.39",
    asset: "Fixed Assets",
    assetAmt: "₹8,20,550.00",
  },

  /* ================= NON CURRENT LIABILITIES ================= */
  {
    isSection: true,
    liability: "Non Current Liabilities",
    liabilityAmt: "",
    asset: "Intangible Assets",
    assetAmt: "",
  },
  {
    liability: "Deferred Tax Liabilities",
    liabilityAmt: "",
    asset: "Intangible Assets Under Development",
    assetAmt: "",
  },
  {
    liability: "Long Term Borrowings",
    liabilityAmt: "₹1,03,91,576.74",
    asset: "Long Term Loans & Advances",
    assetAmt: "₹5,50,000.00",
  },
  {
    liability: "Long Term Provisions",
    liabilityAmt: "",
    asset: "Non Current Investments",
    assetAmt: "",
  },
  {
    liability: "Other Long Term Liabilities",
    liabilityAmt: "",
    asset: "Other Non Current Assets",
    assetAmt: "",
  },

  /* ================= CURRENT LIABILITIES ================= */
  {
    isSection: true,
    liability: "Current Liabilities",
    liabilityAmt: "",
    asset: "Current Assets",
    assetAmt: "",
  },
  {
    liability: "BANK OD / OCC A/c",
    liabilityAmt: "₹12,03,121.81",
    asset: "Cash & Cash Equivalents",
    assetAmt: "-₹15,19,049.27",
  },
  {
    liability: "Duties & Taxes",
    liabilityAmt: "",
    asset: "Current Investments",
    assetAmt: "-₹7,36,000.00",
  },
  {
    liability: "Other Current Liabilities",
    liabilityAmt: "₹0.06",
    asset: "Investments",
    assetAmt: "₹8,47,968.06",
  },
  {
    liability: "Short Term Borrowings",
    liabilityAmt: "-₹392.00",
    asset: "Other Current Assets",
    assetAmt: "₹7,95,973.23",
  },
  {
    liability: "Trade Payable",
    liabilityAmt: "₹32,76,451.45",
    asset: "Reserve & Surplus Axis",
    assetAmt: "-₹0.00",
  },
  {
    liability: "HDFC 2860 (Primary Account)",
    liabilityAmt: "₹18,02,302.63",
    asset: "Reserve & Surplus BOI",
    assetAmt: "₹7,357.04",
  },
  {
    liability: "ICICI CC UPI (Primary Account)",
    liabilityAmt: "₹11,282.58",
    asset: "Short Term Loans & Advances",
    assetAmt: "",
  },

  /* ================= DIFFERENCE ================= */
  {
    isSection: true,
    liability: "",
    liabilityAmt: "",
    asset: "Difference in Opening",
    assetAmt: "₹1,39,16,336.40",
  },

  /* ================= TOTAL ================= */
  {
    isTotal: true,
    liability: "",
    liabilityAmt: "₹2,13,82,475.40",
    asset: "",
    assetAmt: "₹2,13,82,475.40",
  },
], []);


  /* ===== COLUMNS ===== */
 const columnDefs = useMemo(
  () => [
   {
  headerName: "LIABILITIES",
  field: "liability",
  flex: 1,
  cellRenderer: (p) => {
    if (!p.value) return "";

    // SECTION or TOTAL → bold, no arrow
    if (p.data?.isSection || p.data?.isTotal) {
      return (
        <span className="font-bold">
          {p.value}
        </span>
      );
    }

     if (isCondensed) {
    return <span>{p.value}</span>; // ❌ no arrow
  }

    // NORMAL ROW → arrow
    return <span>› {p.value}</span>;
  },
},

    {
      headerName: "AMT (₹)",
      field: "liabilityAmt",
      width: 160,
      cellClass: "text-right",
      headerClass: "ag-right-aligned-header",
      cellRenderer: (p) =>
        p.value ? (
             <span className={p.data?.isTotal ? "font-bold" : ""}>
                 {p.value}
            </span>

        ) : "",
    },
   {
    headerName: "ASSETS",
    field: "asset",
    flex: 1,
    cellRenderer: (p) => {
        if (!p.value) return "";

        if (p.data?.isSection || p.data?.isTotal) {
        return (
            <span className="font-bold">
            {p.value}
            </span>
        );
        }
        
         if (isCondensed) {
            return <span>{p.value}</span>; // ❌ no arrow
        }

        return <span>› {p.value}</span>;
    },
    },

    {
      headerName: "AMT (₹)",
      field: "assetAmt",
      width: 160,
      cellClass: "text-right",
      headerClass: "ag-right-aligned-header",
     cellRenderer: (p) =>
        p.value ? (
            <span className={p.data?.isTotal ? "font-bold" : ""}>
             {p.value}
            </span>

        ) : "",

    },
  ],
  []
);

const detailedColumnDefs = useMemo(() => [
  {
    headerName: "LIABILITIES",
    field: "liability",
    flex: 1,
    cellRenderer: (p) => {
      if (!p.value) return "";
      const indent = (p.data.level || 0) * 16;

      return (
        <span
          style={{ paddingLeft: indent }}
          className={p.data.rowType !== "LEDGER" ? "font-bold" : ""}
        >
          {p.data.level > 0 && "› ".repeat(p.data.level)}
          {p.value}
        </span>
      );
    },
  },
  {
    headerName: "DETAIL (₹)",
    field: "liabilityDetail",
    width: 160,
    cellClass: "text-right",
  },
  {
    headerName: "AMT (₹)",
    field: "liabilityAmt",
    width: 160,
    cellClass: "text-right",
    cellRenderer: (p) =>
      p.value ? (
        <span className={p.data.rowType === "TOTAL" ? "font-bold" : ""}>
          {p.value}
        </span>
      ) : "",
  },

  {
    headerName: "ASSETS",
    field: "asset",
    flex: 1,
    cellRenderer: (p) => {
      if (!p.value) return "";
      const indent = (p.data.level || 0) * 16;

      return (
        <span
          style={{ paddingLeft: indent }}
          className={p.data.rowType !== "LEDGER" ? "font-bold" : ""}
        >
          {p.data.level > 0 && "› ".repeat(p.data.level)}
          {p.value}
        </span>
      );
    },
  },
  {
    headerName: "DETAIL (₹)",
    field: "assetDetail",
    width: 160,
    cellClass: "text-right",
  },
  {
    headerName: "AMT (₹)",
    field: "assetAmt",
    width: 160,
    cellClass: "text-right",
    cellRenderer: (p) =>
      p.value ? (
        <span className={p.data.rowType === "TOTAL" ? "font-bold" : ""}>
          {p.value}
        </span>
      ) : "",
  },
], []);



const verticalScheduleColumnDefs = useMemo(() => [
  {
    headerName: "LIABILITIES",
    field: "label",
    flex: 1,
    cellRenderer: (p) => {
      if (!p.value) return "";

      if (p.data?.isHeader) {
        return <span className="font-extrabold">{p.value}</span>;
      }

      if (p.data?.isSection) {
        return <span className="font-bold">{p.value}</span>;
      }

      if (p.data?.isTotal) {
        return "";
      }


      return <span>› {p.value}</span>;
    },
  },
  {
    headerName: "",
    field: "amount",
    width: 180,
    cellClass: "text-right",
    cellRenderer: (p) =>
      p.value ? (
        <span className={p.data?.isTotal ? "font-bold" : ""}>
          {p.value}
        </span>
      ) : "",
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


  const condensedRowData = useMemo(() => [
  {
    isSection: true,
    liability: "Owner's Fund",
    liabilityAmt: "₹26,38,603.74",
    asset: "Non Current Assets",
    assetAmt: "₹13,70,550.00",
  },
  {
    isSection: true,
    liability: "Profit / Loss",
    liabilityAmt: "₹20,59,528.39",
    asset: "Current Assets",
    assetAmt: "₹60,95,589.00",
  },
  {
    isSection: true,
    liability: "Non Current Liabilities",
    liabilityAmt: "₹1,03,91,576.74",
    asset: "",
    assetAmt: "",
  },
  {
    isSection: true,
    liability: "Current Liabilities",
    liabilityAmt: "₹62,92,766.53",
    asset: "",
    assetAmt: "",
  },
  {
    isSection: true,
    liability: "",
    liabilityAmt: "",
    asset: "Difference in Opening",
    assetAmt: "₹1,39,16,336.40",
  },
  {
    isTotal: true,
    liability: "",
    liabilityAmt: "₹2,13,82,475.40",
    asset: "",
    assetAmt: "₹2,13,82,475.40",
  },
], []);


const detailedRowData = useMemo(() => [
  // ================= OWNER'S FUND =================
  {
    rowType: "GROUP",
    liability: "Owner's Fund",
    asset: "Non Current Assets",
  },

  {
    rowType: "GROUP",
    level: 1,
    liability: "Capital Account",
    liabilityAmt: "₹26,38,638.05",
    asset: "Capital Work In Progress",
  },
  {
    rowType: "LEDGER",
    level: 2,
    liability: "RAHUL GUPTA CAPITAL ACCOUNT",
    liabilityDetail: "₹26,38,603.74",
    
  },

  {
    rowType: "GROUP",
    level: 1,
    liability: "Reserves & Surplus",
    asset: "Deferred Tax Assets",
  },
  {
    rowType: "LEDGER",
    level: 2,
    liability: "GENERAL ADJUSTMENT ACCOUNT",
  },
  {
    rowType: "LEDGER",
    level: 2,
    liability: "Profit & Loss Appropriation",
  },

  // ================= PROFIT / LOSS =================
  {
    rowType: "GROUP",
    liability: "Profit / Loss",
    liabilityAmt: "₹26,91,638.05",
    asset: "Fixed Assets",
    assetAmt: "₹8,20,550.00",
  },
  {
    rowType: "LEDGER",
    level: 1,
    asset: "BIKE",
    assetDetail: "₹86,772.00",
  },
  {
    rowType: "LEDGER",
    level: 1,
    asset: "LAPTOP",
    assetDetail: "₹2,83,650.00",
  },
  {
    rowType: "LEDGER",
    level: 1,
    asset: "SHREDDER MACHINE",
    assetDetail: "₹3,081.00",
  },
  {
    rowType: "LEDGER",
    level: 1,
    asset: "XL6",
    assetDetail: "₹4,47,047.00",
  },

  // ================= NON CURRENT LIABILITIES =================
  {
    rowType: "GROUP",
    liability: "Non Current Liabilities",
    asset: "Long Term Loans & Advances",
    assetAmt: "₹5,50,000.00",
  },
  {
    rowType: "LEDGER",
    level: 1,
    asset: "KARAN GUPTA LOAN",
    assetDetail: "₹5,50,000.00",
  },

  // ================= CURRENT ASSETS =================
  {
    rowType: "GROUP",
    asset: "Current Assets",
  },
  {
    rowType: "GROUP",
    level: 1,
    asset: "Cash & Cash Equivalents",
    assetAmt: "-₹15,19,049.27",
  },

  // ================= DIFFERENCE =================
  {
    rowType: "GROUP",
    asset: "Difference in Opening",
    assetAmt: "₹1,42,34,507.04",
  },

  // ================= TOTAL =================
  {
    rowType: "TOTAL",
    isTotal: true,
    liabilityAmt: "₹2,17,00,646.04",
    assetAmt: "₹2,17,00,646.04",
  },
], []);

const verticalScheduleRowData = useMemo(() => [
  // ===== LIABILITIES =====

  { isSection: true, label: "Owner's Fund" },
  { label: "Capital Account", amount: "₹26,38,603.74" },
  { label: "Reserves & Surplus", amount: "" },

  { isSection: true, label: "Profit / Loss" },
  { label: "Profit / Loss", amount: "₹26,91,638.05" },

  { isSection: true, label: "Non Current Liabilities" },
  { label: "Long Term Borrowings", amount: "₹1,03,91,576.74" },

  { isSection: true, label: "Current Liabilities" },
  { label: "Trade Payable", amount: "₹32,76,451.45" },
  {
  isTotal: true,
  isLiabilityTotal: true,
  label: "",
  amount: "₹2,17,00,646.04",
},


  // ===== ASSETS =====
  { isHeader: true, isAssetHeader: true, label: "ASSETS" },

  { isSection: true, label: "Non Current Assets" },
  { label: "Fixed Assets", amount: "₹8,20,550.00" },
  { label: "Long Term Loans & Advances", amount: "₹5,50,000.00" },

  { isSection: true, label: "Current Assets" },
  { label: "Cash & Cash Equivalents", amount: "-₹15,19,049.27" },

  { isSection: true, label: "Difference in Opening",amount: "₹1,42,34,507.04" },

  // ===== TOTAL =====
  { isTotal: true, label: "", amount: "₹2,17,00,646.04" },
], []);


const verticalCondensedRowData = useMemo(() => [
  // ===== LIABILITIES =====

  { isSection: true, label: "Owner's Fund", amount: "₹26,38,603.74" },
  { isSection: true, label: "Profit / Loss", amount: "₹26,91,638.05" },
  { isSection: true, label: "Non Current Liabilities", amount: "₹1,03,91,576.74" },
  { isSection: true, label: "Current Liabilities", amount: "₹59,78,827.51" },

  // liabilities total
  { isTotal: true, label: "", amount: "₹2,17,00,646.04" },

  // ===== ASSETS =====
  { isHeader: true, isAssetHeader: true, label: "ASSETS" },

  { isSection: true, label: "Non Current Assets", amount: "₹13,70,550.00" },
  { isSection: true, label: "Current Assets", amount: "₹60,95,589.00" },
  { isSection: true, label: "Difference in Opening", amount: "-₹1,81,66,685.85" },

  // final total
  { isTotal: true, label: "", amount: "₹1,07,00,546.85" },
], []);


const verticalCondensedColumnDefs = useMemo(() => [
  {
    headerName: "LIABILITIES",
    field: "label",
    flex: 1,
    cellRenderer: (p) => {
      if (!p.value) return "";

      if (p.data?.isHeader) {
        return <span className="font-extrabold">{p.value}</span>;
      }

      if (p.data?.isSection) {
        return <span className="font-bold">{p.value}</span>;
      }

      return <span>{p.value}</span>;
    },
  },
  {
    headerName: "",
    field: "amount",
    width: 180,
    cellClass: "text-right",
    cellRenderer: (p) =>
      p.value ? (
        <span className={p.data?.isTotal ? "font-bold" : ""}>
          {p.value}
        </span>
      ) : "",
  },
], []);



const verticalDetailedRowData = useMemo(() => [
  // ===== LIABILITIES =====
 

  { isSection: true, label: "Owner's Fund" },
  { level: 1, label: "Capital Account", amount: "₹26,38,603.74" },
  { level: 2, label: "RAHUL GUPTA CAPITAL ACCOUNT", amount: "₹26,38,603.74" },

  { isSection: true, label: "Profit / Loss" },
  { level: 1, label: "Profit / Loss", amount: "₹26,91,638.05" },

  { isSection: true, label: "Non Current Liabilities" },
  { level: 1, label: "Long Term Borrowings", amount: "₹1,03,91,576.74" },
  { level: 2, label: "KOTAK HL HF39763272", amount: "₹39,56,214.36" },
  { level: 2, label: "KOTAK HL HF39763298", amount: "₹64,35,362.38" },

  { isSection: true, label: "Current Liabilities" },
  { level: 1, label: "Trade Payable", amount: "₹32,76,451.45" },

  // ---- LIABILITIES TOTAL
  {
    isTotal: true,
    label: "",
    amount: "₹2,17,00,646.04",
  },

  // ===== ASSETS =====
  { isHeader: true, isAssetHeader: true, label: "ASSETS" },

  { isSection: true, label: "Non Current Assets" },
  { level: 1, label: "Fixed Assets", amount: "₹8,20,550.00" },
  { level: 2, label: "BIKE", amount: "₹86,772.00" },
  { level: 2, label: "LAPTOP", amount: "₹2,83,650.00" },
  { level: 2, label: "SHREDDER MACHINE", amount: "₹3,081.00" },
  { level: 2, label: "XL6", amount: "₹4,47,047.00" },

  { isSection: true, label: "Current Assets" },
  { level: 1, label: "Cash & Cash Equivalents", amount: "-₹15,19,049.27" },

  { isSection: true, label: "Difference in Opening", amount: "-₹1,81,66,685.85" },

  // ---- FINAL TOTAL
  {
    isTotal: true,
    label: "",
    amount: "₹1,07,00,546.85",
  },
], []);


const verticalDetailedColumnDefs = useMemo(() => [
  {
    headerName: "LIABILITIES",
    field: "label",
    flex: 1,
    cellRenderer: (p) => {
      if (!p.value) return "";

      if (p.data?.isHeader) {
        return <span className="font-extrabold">{p.value}</span>;
      }

      if (p.data?.isSection) {
        return <span className="font-bold">{p.value}</span>;
      }

      const indent = (p.data.level || 0) * 16;

      return (
        <span style={{ paddingLeft: indent }}>
          {p.data.level ? "› ".repeat(p.data.level) : ""}
          {p.value}
        </span>
      );
    },
  },
  {
    headerName: "",
    field: "amount",
    width: 180,
    cellClass: "text-right",
    cellRenderer: (p) =>
      p.value ? (
        <span className={p.data?.isTotal ? "font-bold" : ""}>
          {p.value}
        </span>
      ) : "",
  },
], []);


  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">
      {/* ================= HEADER ================= */}
        <div className="flex justify-between items-start mb-4">
        <div>
            <h1 className="text-[28px] font-extrabold text-black">
            Balance Sheet
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

        {/* CONSOLIDATED */}
        <label className="flex items-center gap-2 font-bold text-tiny">
            <input type="checkbox" />
            Consolidated In All Branches
        </label>

        {/* FORMAT */}
        <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden h-[38px]">
            <div className="px-4 bg-[#f3f6fb] border-r text-[13px] font-bold py-2">
            Format
            </div>
            <select value={format} onChange={(e) => setFormat(e.target.value)} className="px-4 h-full outline-none text-[13px] font-bold bg-white">
            <option>Horizontal</option>
            <option>Vertical</option>
            </select>
        </div>

        {/* VIEW */}
        <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden h-[38px]">
            <div className="px-4 bg-[#f3f6fb] border-r text-[13px] font-bold py-2">
            View
            </div>
            <select value={viewType} onChange={(e) => setViewType(e.target.value)} className="px-4 h-full outline-none text-[13px] font-bold bg-white">
            <option>Schedules</option>
            <option>Condensed</option>
            <option>Detailed</option>
            </select>
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
              isVertical && isDetailed
                ? verticalDetailedRowData
                : isVertical && isCondensed
                ? verticalCondensedRowData
                : isVertical && isSchedule
                ? verticalScheduleRowData
                : isCondensed
                ? condensedRowData
                : isDetailed
                ? detailedRowData
                : rowData
            }
            columnDefs={
            isVertical && isDetailed
              ? verticalDetailedColumnDefs
              : isVertical && isCondensed
              ? verticalCondensedColumnDefs
              : isVertical && isSchedule
              ? verticalScheduleColumnDefs
              : isDetailed
              ? detailedColumnDefs
              : columnDefs
          }

          onCellDoubleClicked={onCellDoubleClicked}
          defaultColDef={defaultColDef}
          pagination={false}
          rowSelection="single"
          headerHeight={34}
          rowHeight={32}
          domLayout="autoHeight"
          animateRows

          getRowStyle={(params) => {
            if (params.data?.isAssetHeader) {
              return {
                backgroundColor: "#eef0ff",
                fontWeight: "700",
              };
            }

            if (params.data?.isTotal || params.data?.rowType === "TOTAL") {
              return {
                backgroundColor: "#eef0ff",
                fontWeight: "700",
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
            Profit &amp; Loss
            </button>

            <button className="bg-primary hover:bg-green-700 text-white text-[13px] font-semibold px-4 py-[6px] rounded-md">
            Trial Balance
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
