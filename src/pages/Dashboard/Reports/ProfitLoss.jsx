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


export default function ProfitLoss() {
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

  // ❌ Amount cells ignore
  if (field === "debitAmt" || field === "creditAmt") return;

  // ❌ Section / spacer rows ignore
  if (params.data?.isSection || params.data?.isSpacer) return;

  // ❌ Total rows ignore (Net Profit etc.)
  if (params.data?.isTotal) return;

  // ✅ Sirf Debit / Credit text par double click
  if (field === "debit" || field === "credit") {
    navigate("/company/dashboard/reports/account-group-list", {
      state: {
        groupName: value,
        fromDate,
        toDate,
      },
    });
  }
};



  /* ===== GRID DATA (DUMMY FOR UI) ===== */
const rowData = useMemo(() => [
  // ===== OPENING =====
  {
    isSection: true,
    isHighlight: true,
    debit: "Opening Stock",
    debitAmt: "",
    credit: "Sales",
    creditAmt: "",
  },
  {
    debit: "Purchase",
    debitAmt: "",
    credit: "Direct Income",
    creditAmt: "",
  },
  {
    debit: "Direct Expenses",
    debitAmt: "",
    credit: "Closing Stock",
    creditAmt: "",
  },

  // ===== GROSS =====
  {
    debit: "Gross Profit C/F",
    debitAmt: "",
    credit: "Gross Loss C/F",
    creditAmt: "",
  },

  
  {
    debit: "Gross Loss B/D",
    debitAmt: "",
    credit: "Gross Profit B/D",
    creditAmt: "",
  },

  // ===== INDIRECT =====
  {
    isSection: true,
    debit: "Indirect Expenses",
    credit: "Indirect Income",
  },

  {
    debit: "› EMI HOME",
    debitAmt: "₹2,23,447.48",
    credit: "› COMMISSION (Primary Account)",
    creditAmt: "₹2,221.28",
  },
  {
    debit: "› EMI OFFICE",
    debitAmt: "₹2,47,270.10",
    credit: "› MISCELLANEOUS INCOME (Primary Account)",
    creditAmt: "₹50,181.38",
  },
  {
    debit: "› EXPENSES HOME",
    debitAmt: "₹15,14,011.99",
    credit: "› PROCEEDS (Primary Account)",
    creditAmt: "₹75,51,018.78",
  },
  {
    debit: "› EXPENSES OFFICE",
    debitAmt: "₹38,35,166.60",
    credit: "› SAVING INTEREST (Primary Account)",
    creditAmt: "₹98,112.78",
  },
  {
    debit: "› GST PAID A/C (Primary Account)",
    debitAmt: "",
    credit: "› SHRUTI PROCEEDS (Primary Account)",
    creditAmt: "₹8,10,000.00",
  },

  // ===== NET =====
  {
    isTotal: true,
    debit: "Net Profit C/D",
    debitAmt: "₹26,91,638.05",
    credit: "Net Loss C/D",
    creditAmt: "",
  },
], []);


  /* ===== COLUMNS ===== */
const columnDefs = useMemo(() => [
  {
    headerName: "DEBITS",
    field: "debit",
    flex: 1,
    cellRenderer: (p) => {
    if (!p.value) return "";

    const boldDebit = [
        "Opening Stock",
        "Purchase",
        "Direct Expenses",
        "Indirect Expenses",
        "Net Profit C/D",
    ];

    if (p.data?.isSection || boldDebit.includes(p.value)) {
        return <span className="font-bold">{p.value}</span>;
    }

    return <span>{p.value}</span>;
    }
  },
  {
    headerName: "AMT (₹)",
    field: "debitAmt",
    width: 160,
    cellClass: "text-right",
    cellRenderer: (p) =>
      p.value ? <span>{p.value}</span> : "",
  },
  {
    headerName: "CREDITS",
    field: "credit",
    flex: 1,
    cellRenderer: (p) => {
        if (!p.value) return "";

        const boldCredit = [
            "Sales",
            "Direct Income",
            "Closing Stock",
            "Indirect Income",
            "Net Loss C/D",
        ];

        if (p.data?.isSection || boldCredit.includes(p.value)) {
            return <span className="font-bold">{p.value}</span>;
        }

        return <span>{p.value}</span>;
        },

  },
  {
    headerName: "AMT (₹)",
    field: "creditAmt",
    width: 160,
    cellClass: "text-right",
    cellRenderer: (p) =>
      p.value ? <span>{p.value}</span> : "",
  },
], []);


const detailedColumnDefs = useMemo(() => [
  {
    headerName: "DEBITS",
    field: "debit",
    flex: 1,
    cellRenderer: (p) => {
    if (!p.value) return "";

    const val = p.value.trim();

    // DOUBLE ARROW »» → child → NOT bold
    if (val.startsWith("»»")) {
        return <span>{val}</span>;
    }

    // SINGLE ARROW » → main ledger → BOLD
    if (val.startsWith("»")) {
        return <span className="font-bold">{val}</span>;
    }

    // SECTION HEADINGS → BOLD
    if (
        p.data?.isSection ||
        [
        "Opening Stock",
        "Purchase",
        "Direct Expenses",
        "Indirect Expenses",
        "Net Profit C/D",
        "Net Loss C/D",
        ].includes(val)
    ) {
        return <span className="font-bold">{val}</span>;
    }

    return <span>{val}</span>;
    },

  },
  {
    headerName: "DETAIL (₹)",
    field: "debitDetail",
    width: 180,
    cellClass: "text-right",
  },
  {
    headerName: "AMT (₹)",
    field: "debitAmt",
    width: 160,
    cellClass: "text-right",
  },

  {
    headerName: "CREDITS",
    field: "credit",
    flex: 1,
    cellRenderer: (p) => {
    if (!p.value) return "";

    const val = p.value;

    // italic Primary Account
    if (val.includes("(Primary Account)")) {
        const [name] = val.split(" (");
        return (
        <span>
            {name} <i className="opacity-80">(Primary Account)</i>
        </span>
        );
    }

    if (
        p.data?.isSection ||
        [
        "Sales",
        "Direct Income",
        "Closing Stock",
        "Indirect Income",
        "Net Loss C/D",
        "Net Profit C/D",
        ].includes(val)
    ) {
        return <span className="font-bold">{val}</span>;
    }

    return <span>{val}</span>;
    },

  },
  {
    headerName: "DETAIL (₹)",
    field: "creditDetail",
    width: 180,
    cellClass: "text-right",
  },
  {
    headerName: "AMT (₹)",
    field: "creditAmt",
    width: 160,
    cellClass: "text-right",
  },
], []);


const plCondensedRowData = useMemo(() => [
  // ===== OPENING (GREEN) =====
  {
    isSection: true,
    debit: "Opening Stock",
    credit: "Sales",
  },

  {
    debit: "Direct Expenses",
    credit: "Direct Income",
  },

  {
    debit: "Purchase",
    credit: "Closing Stock",
  },

  // ===== GROSS =====
  {
    debit: "Gross Profit C/F",
    credit: "Gross Loss C/F",
  },

  // 💜 spacer row
  {
    isSpacer: true,
  },

  {
    debit: "Gross Loss B/D",
    credit: "Gross Profit B/D",
  },

  // ===== INDIRECT (GREEN) =====
{
  isSection: true,
  debit: "Indirect Expenses",
  debitAmt: "₹18,87,717.36",
  credit: "Indirect Income",
  creditAmt: "₹85,11,534.22",
},


  // ===== NET =====
  {
    isTotal: true,
    debit: "Net Profit C/D",
    debitAmt: "₹66,23,816.86",
    credit: "Net Loss C/D",
    creditAmt: "",
  },
], []);


const verticalScheduleColumnDefs = useMemo(() => [
  {
    headerName: "",
    field: "label",
    flex: 1,
    cellRenderer: (p) => {
      if (!p.value) return "";

      // SECTION HEADERS (CREDITS / DEBITS)
      if (p.data?.isHeader) {
        return <span className="font-bold uppercase">{p.value}</span>;
      }

      // MAIN HEADINGS
      if (p.data?.isBold) {
        return <span className="font-bold">{p.value}</span>;
      }

      // Primary Account italic
      if (p.value.includes("(Primary Account)")) {
        const [name] = p.value.split(" (");
        return (
          <span>
            {name} <i>(Primary Account)</i>
          </span>
        );
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
      p.value ? <span>{p.value}</span> : "",
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


const detailedRowData = useMemo(() => [
  // ===== OPENING =====
  {
    isSection: true,
    debit: "Opening Stock",
    credit: "Sales",
  },
  {
    debit: "Purchase",
    credit: "Direct Income",
  },
  {
    debit: "Direct Expenses",
    credit: "Closing Stock",
  },

  // ===== GROSS =====
  {
    debit: "Gross Profit C/F",
    credit: "Gross Loss C/F",
  },
  {
    debit: "Gross Loss B/D",
    credit: "Gross Profit B/D",
  },

  // ===== INDIRECT =====
  {
    isSection: true,
    debit: "Indirect Expenses",
    credit: "Indirect Income",
  },

  {
    debit: "» EMI HOME",
    debitAmt: "₹2,23,447.48",
    credit: "» COMMISSION (Primary Account)",
    creditAmt: "₹2,221.28",
  },
  {
    debit: "»» AKAI KARAOKE EMI H",
    credit: "» MISCELLANEOUS INCOME (Primary Account)",
    creditAmt: "₹50,181.38",
  },
  {
    debit: "»» CC TV HOME EMI",
    credit: "» PROCEEDS (Primary Account)",
    creditAmt: "₹75,51,018.78",
  },
  {
    debit: "»» CLOUD NINE EMI H",
    debitDetail: "₹55,984.48",
    credit: "» SAVING INTEREST (Primary Account)",
    creditAmt: "₹98,112.78",
  },
  {
    debit: "»» CREDIT CARD LOAN EMI",
    credit: "» SHRUTI PROCEEDS (Primary Account)",
    creditAmt: "₹8,10,000.00",
  },

  // ===== NET =====
  {
    isTotal: true,
    debit: "Net Profit C/D",
    debitAmt: "₹26,91,638.05",
    credit: "Net Loss C/D",
  },
], []);


const verticalScheduleRowData = useMemo(() => [
  // ===== CREDITS =====
  { isHeader: true, label: "CREDITS" },

  { isBold: true, label: "Closing Stock" },
  { label: "Gross Loss C/F" },

  // ===== DEBITS =====
  { isHeader: true, label: "DEBITS" },

  { isBold: true, label: "Opening Stock" },
  { isBold: true, label: "Purchase" },
  { isBold: true, label: "Direct Expenses" },
  { label: "Gross Profit C/F" },

  // ===== CREDITS =====
  { isHeader: true, label: "CREDITS" },

  { isBold: true, label: "Sales" },
  { isBold: true, label: "Direct Income" },
  { isBold: true, label: "Indirect Income" },

  { label: "» COMMISSION (Primary Account)", amount: "₹2,221.28" },
  { label: "» MISCELLANEOUS INCOME (Primary Account)", amount: "₹50,181.38" },
  { label: "» PROCEEDS (Primary Account)", amount: "₹75,51,018.78" },
  { label: "» SAVING INTEREST (Primary Account)", amount: "₹98,112.78" },
  { label: "» SHRUTI PROCEEDS (Primary Account)", amount: "₹8,10,000.00" },

  { isBold: true, label: "Net Loss C/D" },

  // ===== DEBITS =====
  { isHeader: true, label: "DEBITS" },

  { isBold: true, label: "Indirect Expenses" },

  { label: "» EXPENSES HOME", amount: "₹15,14,011.99" },
  { label: "» EXPENSES OFFICE", amount: "₹38,35,166.60" },
  { label: "» GST PAID A/C (Primary Account)" },
  { label: "» JAGTAR SINGH DVR REIMBURSEMENT (Primary Account)" },
  { label: "» Other (Primary Account)" },

  // ===== NET PROFIT (GREEN) =====
  {
    isTotal: true,
    isNetProfit: true,
    label: "Net Profit C/D",
    amount: "₹31,62,355.63",
  },
], []);


const verticalCondensedRowData = useMemo(() => [
  // ===== CREDITS =====
  { isHeader: true, label: "CREDITS" },

  { isBold: true, label: "Sales", amount: "₹0.00" },
  { isBold: true, label: "Direct Income", amount: "₹0.00" },
  { isBold: true, label: "Closing Stock", amount: "₹0.00" },
  { label: "Gross Loss C/F", amount: "₹0.00" },

  // ===== DEBITS =====
  { isHeader: true, label: "DEBITS" },

  { isBold: true, label: "Opening Stock", amount: "₹0.00" },
  { isBold: true, label: "Direct Expenses", amount: "₹0.00" },
  { isBold: true, label: "Purchase", amount: "₹0.00" },
  { label: "Gross Profit C/F", amount: "₹0.00" },

  // ===== CREDITS =====
  { isHeader: true, label: "CREDITS" },

  { isBold: true, label: "Indirect Income", amount: "₹85,11,534.22" },
  { isBold: true, label: "Net Loss C/D", amount: "₹0.00" },

  // ===== DEBITS =====
  { isHeader: true, label: "DEBITS" },

  { isBold: true, label: "Indirect Expenses", amount: "₹18,87,717.36" },

  // ===== NET PROFIT (GREEN ROW) =====
  {
    isTotal: true,
    isNetProfit: true,
    label: "Net Profit C/D",
    amount: "₹66,23,816.86",
  },
], []);



const verticalCondensedColumnDefs = useMemo(() => [
  {
    headerName: "",
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
  // ===== CREDITS =====
  { isHeader: true, label: "CREDITS" },

  { isBold: true, label: "Closing Stock" },
  { label: "Gross Loss C/F" },

  // ===== DEBITS =====
  { isHeader: true, label: "DEBITS" },

  { isBold: true, label: "Opening Stock" },
  { isBold: true, label: "Purchase" },
  { isBold: true, label: "Direct Expenses" },
  { label: "Gross Profit C/F" },

  // ===== CREDITS =====
  { isHeader: true, label: "CREDITS" },

  { isBold: true, label: "Sales" },
  { isBold: true, label: "Direct Income" },
  { isBold: true, label: "Indirect Income" },

  { label: "» COMMISSION (Primary Account)", amount: "₹2,221.28" },
  { label: "» MISCELLANEOUS INCOME (Primary Account)", amount: "₹50,181.38" },
  { label: "» PROCEEDS (Primary Account)", amount: "₹75,51,018.78" },
  { label: "» SAVING INTEREST (Primary Account)", amount: "₹98,112.78" },
  { label: "» SHRUTI PROCEEDS (Primary Account)", amount: "₹8,10,000.00" },

  { isBold: true, label: "Net Loss C/D" },

  // ===== DEBITS =====
  { isHeader: true, label: "DEBITS" },

  { isBold: true, label: "Indirect Expenses" },

  { label: "» EXPENSES HOME" },
  { label: "»» COOK SALARY", amount: "₹20,000.00" },
  { label: "»» ENTERTAINMENT EXPENSES H", amount: "₹20,972.26" },
  { label: "»» FOOD & HOUSE GROCERIES H", amount: "₹2,35,136.32" },
  { label: "»» GRAPHIC PAD EMI", amount: "₹23,420.23" },
  { label: "»» HOME UTILITIES H", amount: "₹62,109.12" },

  { label: "» GST PAID A/C (Primary Account)" },
  { label: "» JAGTAR SINGH DVR REIMBURSEMENT (Primary Account)" },
  { label: "» Other (Primary Account)" },

  // ===== NET PROFIT =====
  {
    isNetProfit: true,
    label: "Net Profit C/D",
    amount: "₹28,33,837.92",
  },
], []);



const verticalDetailedColumnDefs = useMemo(() => [
  {
    headerName: "",
    field: "label",
    flex: 1,
    cellRenderer: (p) => {
    if (!p.value) return "";

    // ✅ Purple header rows (CREDITS / DEBITS)
    if (p.data?.isHeader) {
        return <span className="font-bold uppercase">{p.value}</span>;
    }

    // ✅ ALL main headings (Closing Stock, Sales, Indirect Income etc.)
    if (p.data?.isBold) {
        return <span className="font-bold">{p.value}</span>;
    }

    // ✅ Primary Account italic ONLY (not bold)
    if (p.value.includes("(Primary Account)")) {
        const [name] = p.value.split(" (");
        return (
        <span>
            {name} <i>(Primary Account)</i>
        </span>
        );
    }

    // ❌ ALL » and »» rows normal
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
        <span className={p.data?.isNetProfit ? "font-bold" : ""}>
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
             Profit & Loss
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
            View
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
                ? plCondensedRowData
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


          defaultColDef={defaultColDef}
          pagination={false}
          rowSelection="single"
          headerHeight={34}
          rowHeight={32}
          domLayout="autoHeight"
          onCellDoubleClicked={onCellDoubleClicked}
          animateRows

         getRowStyle={(params) => {

              if (params.data?.isHeader) {
                    return {
                    background: "#eef0ff",   // purple like image
                    fontWeight: "700",
                    };
                }

                if (params.data?.isNetProfit) {
                    return {
                    background: "#eaffea",   // light green
                    fontWeight: "700",
                    };
                }

                if (params.data?.isSpacer) {
                    return {
                        background: "#eef0ff",
                        height: "26px",
                    };
                    }


                if (params.data?.isTotal) {
                    return {
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
             Balance Sheet
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
