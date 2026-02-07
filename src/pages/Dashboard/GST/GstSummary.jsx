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
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

const IconBtn = ({ icon, tooltip }) => (
  <div className="relative group">
    <button className="p-1">
      <Icon name={icon} className="text-[30px] text-black" />
    </button>
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white
      text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100">
      {tooltip}
    </div>
  </div>
);

const formatINR = (v) =>
  v === null || v === undefined
    ? "₹0.00"
    : `₹${Number(v).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;


const isEmptyRow = (data) =>
  !data || !data.particulars;



export default function GstSummary() {
  const gridRef = useRef(null);
  const navigate = useNavigate();

  const [fixedGrid, setFixedGrid] = useState(false);
  const [view, setView] = useState("Tax Summary");
  const [subView, setSubView] = useState("Condensed");
  const [openVoucher, setOpenVoucher] = useState(false);


  /* ===== GRID DATA ===== */
  const rowData = useMemo(
    () => [
      {
        particulars: "OUTPUT TAX",
        invoice: 480.76,
        taxable: 476,
        igst: 4.76,
        cgst: 0,
        sgst: 0,
        cess: 0,
        total: 4.76,
        highlight: true,
      },
      {
        particulars: "OUTPUT TAX (CR. NOTE)",
        invoice: 0,
        taxable: 0,
        igst: 0,
        cgst: 0,
        sgst: 0,
        cess: 0,
        total: 0,
      },
      {
        particulars: "TOTAL OUTPUT TAX",
        invoice: 480.76,
        taxable: 476,
        igst: 4.76,
        cgst: 0,
        sgst: 0,
        cess: 0,
        total: 4.76,
        isTotal: true,
      },
      {},
      {
        particulars: "INPUT TAX",
        invoice: 2548.8,
        taxable: 2532,
        igst: 14.4,
        cgst: 0,
        sgst: 0,
        cess: 2.4,
        total: 16.8,
      },
      {
        particulars: "INPUT TAX (DR. NOTE)",
        invoice: 5320,
        taxable: 5320,
        igst: 0,
        cgst: 0,
        sgst: 0,
        cess: 0,
        total: 0,
      },
      {
        particulars: "TOTAL INPUT TAX",
        invoice: 7868.8,
        taxable: 7852,
        igst: 14.4,
        cgst: 0,
        sgst: 0,
        cess: 2.4,
        total: 16.8,
        isTotal: true,
      },
      {},
      {
        particulars: "NET GST",
        invoice: -7388.04,
        taxable: -7376,
        igst: -9.64,
        cgst: 0,
        sgst: 0,
        cess: -2.4,
        total: -12.04,
        net: true,
      },
    ],
    []
  );

  const detailedRowData = useMemo(() => [
  // ===== OUTPUT TAX =====
  {
    particulars: "OUTPUT TAX",
    invoice: 480.76,
    taxable: 476,
    igst: 4.76,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 4.76,
    highlight: true,
  },
  {
    particulars: "» GST @ 1% (Composition)",
    invoice: 480.76,
    taxable: 476,
    igst: 4.76,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 4.76,
    isChild: true,
  },
  {
    particulars: "OUTPUT TAX (CR. NOTE)",
    invoice: 0,
    taxable: 0,
    igst: 0,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 0,
  },
  {
    particulars: "TOTAL OUTPUT TAX",
    invoice: 480.76,
    taxable: 476,
    igst: 4.76,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 4.76,
    isTotal: true,
  },

  {},

  // ===== INPUT TAX =====
  {
    particulars: "INPUT TAX",
    invoice: 2548.8,
    taxable: 2532,
    igst: 14.4,
    cgst: 0,
    sgst: 0,
    cess: 2.4,
    total: 16.8,
  },
  {
    particulars: "» GST @ 0%",
    invoice: 2412.0,
    taxable: 2412.0,
    igst: 0,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 0,
    isChild: true,
  },
  {
    particulars: "» GST @ 12% (Composition) + Cess @ 2%",
    invoice: 136.8,
    taxable: 120.0,
    igst: 14.4,
    cgst: 0,
    sgst: 0,
    cess: 2.4,
    total: 16.8,
    isChild: true,
  },

  {
    particulars: "INPUT TAX (DR. NOTE)",
    invoice: 5320,
    taxable: 5320,
    igst: 0,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 0,
  },
  {
    particulars: "» GST @ 0%",
    invoice: 5320,
    taxable: 5320,
    igst: 0,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 0,
    isChild: true,
  },

  {},

  // ===== NET GST =====
  {
    particulars: "NET GST",
    invoice: 480.76,
    taxable: 476,
    igst: 4.76,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 4.76,
    net: true,
  },
], []);

const hsnCondensedRowData = useMemo(() => [
  {
    particulars: "CHAPTER 12",
    invoice: 353.5,
    taxable: 350.0,
    igst: 3.5,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 3.5,
    highlight: true,
  },
  {
    particulars: "CHAPTER 99",
    invoice: 127.26,
    taxable: 126.0,
    igst: 1.26,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 1.26,
  },
  {
    particulars: "TOTAL OUTWARD SUPPLY (HSN-WISE)",
    invoice: 480.76,
    taxable: 476.0,
    igst: 4.76,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 4.76,
    isTotal: true,
  },

  {},

  {
    particulars: "CHAPTER 99",
    invoice: 1200.0,
    taxable: 1200.0,
    igst: 0,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 0,
  },
  {
    particulars: "NA",
    invoice: 6668.8,
    taxable: 6652.0,
    igst: 14.4,
    cgst: 0,
    sgst: 0,
    cess: 2.4,
    total: 16.8,
  },
  {
    particulars: "TOTAL INWARD SUPPLY (HSN-WISE)",
    invoice: 7868.8,
    taxable: 7852.0,
    igst: 14.4,
    cgst: 0,
    sgst: 0,
    cess: 2.4,
    total: 16.8,
    isTotal: true,
  },
], []);


const hsnDetailedRowData = useMemo(() => [
  // ===== OUTWARD =====
  {
    particulars: "CHAPTER 12",
    isChapter: true,
  },
  {
    particulars: "126598",
    invoice: 353.5,
    taxable: 350,
    igst: 3.5,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 3.5,
    isChild: true,
  },

  {
    particulars: "CHAPTER 99",
    isChapter: true,
  },
  {
    particulars: "998211",
    invoice: 127.26,
    taxable: 126,
    igst: 1.26,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 1.26,
    isChild: true,
  },

  {
    particulars: "TOTAL OUTWARD SUPPLY (HSN-WISE)",
    invoice: 480.76,
    taxable: 476,
    igst: 4.76,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 4.76,
    isTotal: true,
  },

  {},

  // ===== INWARD =====
  {
    particulars: "CHAPTER 99",
    isChapter: true,
  },
  {
    particulars: "998211",
    invoice: 1200,
    taxable: 1200,
    igst: 0,
    cgst: 0,
    sgst: 0,
    cess: 0,
    total: 0,
    isChild: true,
  },

  {
    particulars: "NA",
    isChapter: true,
  },
  {
    particulars: "NA",
    invoice: 6668.8,
    taxable: 6652,
    igst: 14.4,
    cgst: 0,
    sgst: 0,
    cess: 2.4,
    total: 16.8,
    isChild: true,
  },

 
], []);


  const columnDefs = useMemo(
    () => [
    {
  headerName: "PARTICULARS",
  field: "particulars",
  flex: 1,
  cellRenderer: (p) => {
    const isChild = p.data?.isChild;
    const isTotal = p.data?.isTotal;
    const isChapter = p.data?.isChapter;
    const isNet = p.data?.net;
    const isSection =
      p.value === "OUTPUT TAX" ||
      p.value === "INPUT TAX";

    return (
      <span
        className={`
          ${isChild ? " text-[#374151] font-normal" : ""}
          ${isChapter ? "font-semibold pl-0" : ""}
          ${isSection ? "font-semibold" : ""}
          ${isTotal || isNet ? "font-bold" : ""}
        `}
      >
        {p.value}
      </span>
    );
  },
  
},
      { headerName: "INVOICE VALUE", field: "invoice", width: 150, cellRenderer: (p) => {
        if (isEmptyRow(p.data)) return "";
        return <span className="float-right">{formatINR(p.value)}</span>;
        }, },
         { headerName: "TAXABLE VALUE", field: "taxable", width: 150, cellRenderer: (p) => {
        if (isEmptyRow(p.data)) return "";
        return <span className="float-right">{formatINR(p.value)}</span>;
        },},
            { headerName: "IGST", field: "igst", width: 120, cellRenderer: (p) => {
        if (isEmptyRow(p.data)) return "";
        return <span className="float-right">{formatINR(p.value)}</span>;
        }, },
            { headerName: "CGST", field: "cgst", width: 120, cellRenderer: (p) => {
        if (isEmptyRow(p.data)) return "";
        return <span className="float-right">{formatINR(p.value)}</span>;
        }, },
            { headerName: "SGST", field: "sgst", width: 120, cellRenderer: (p) => {
        if (isEmptyRow(p.data)) return "";
        return <span className="float-right">{formatINR(p.value)}</span>;
        }, },
            { headerName: "CESS", field: "cess", width: 120, cellRenderer: (p) => {
        if (isEmptyRow(p.data)) return "";
        return <span className="float-right">{formatINR(p.value)}</span>;
        }, },
      {
        headerName: "TOTAL TAX",
        field: "total",
        width: 140,
        cellRenderer: (p) => {
            if (isEmptyRow(p.data)) return "";

            return (
                <span
                className={`
                    float-right
                    ${p.data?.isTotal || p.data?.net ? "font-bold" : "font-normal"}
                `}
                >
                {formatINR(p.value)}
                </span>
            );
            },
        },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">

    {/* ================= HEADER ================= */}
<div className="mb-4">

  {/* ===== ROW 1 : TITLE + ICONS ===== */}
  <div className="flex justify-between items-start">
    {/* LEFT */}
    <div>
      <h1 className="text-[28px] font-extrabold text-black">
        GSTR Summary Report
      </h1>
    </div>

    {/* RIGHT : ICONS ONLY */}
    <div className="flex items-center gap-2">
      <IconBtn icon="refresh" tooltip="Refresh" />
      <IconBtn icon="offline_bolt" tooltip="Power Q" />
      <IconBtn icon="print" tooltip="Print" />
      <IconBtn icon="download" tooltip="Download" />
      <IconBtn icon="share" tooltip="Share" />
    </div>
  </div>

  {/* ===== ROW 2 : FIXED GRID + VIEW CONTROLS ===== */}
  <div className="flex justify-between items-center mt-3">

    {/* LEFT */}
    <div>
      <label className="flex items-center gap-2 text-[14px]">
        <input
          type="checkbox"
          checked={fixedGrid}
          onChange={(e) => setFixedGrid(e.target.checked)}
          className="accent-primary"
        />
        Fixed Grid
      </label>

      <div className="italic text-[15px] mt-1">
        For: <b>Apr, 2025</b> To <b>Mar, 2026</b>
      </div>
    </div>

    {/* RIGHT : VIEW / SUB VIEW / ACTIONS */}
    <div className="flex items-center gap-3">

      {/* VIEW */}
      <div className="flex items-center h-[38px] border border-[#cfd6e4] rounded-md bg-white overflow-hidden">
        <div className="px-4 bg-[#f3f6fb] border-r font-bold text-[13px] py-2">
          View
        </div>
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="h-full px-4 text-[13px] font-semibold outline-none"
        >
          <option>Tax Summary</option>
           <option>HSN Summary</option>
        </select>
      </div>

      {/* SUB VIEW */}
      <div className="flex items-center h-[38px] border border-[#cfd6e4] rounded-md bg-white overflow-hidden">
        <div className="px-4 bg-[#f3f6fb] border-r font-bold text-[13px] py-2">
          Sub View
        </div>
        <select
          value={subView}
          onChange={(e) => setSubView(e.target.value)}
          className="h-full px-4 text-[13px] font-semibold outline-none"
        >
          <option>Condensed</option>
          <option>Detailed</option>
        </select>
      </div>

     <div className="relative">
        <button
            onClick={() => setOpenVoucher((p) => !p)}
            className="
            h-[38px] px-5
            bg-primary
            text-white
            font-bold text-[13px]
            rounded-md
            flex items-center gap-2
            "
        >
            Voucher Series
            <Icon name="expand_more" className="text-[18px]" />
        </button>

        {openVoucher && (
            <div
            className="
                absolute right-0 mt-2 w-[220px]
                bg-white border rounded-md shadow-lg
                text-[14px] z-50
            "
            >
            <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setOpenVoucher(false)}
            >
                Action
            </div>
            <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setOpenVoucher(false)}
            >
                Another action
            </div>
            <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setOpenVoucher(false)}
            >
                Something else here
            </div>
            </div>
        )}
    </div>


      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="
          h-[38px] px-5
          border border-primary
          text-primary
          font-bold text-[13px]
          rounded-md
        "
      >
        Back
      </button>

    </div>
  </div>
</div>


      {/* FILTER BAR */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white border rounded-t-md text-[13px]">
        <span className="font-semibold">Filter:</span>
        <input className="h-[30px] px-3 border rounded-md w-[220px]" placeholder="Enter your keyword" />
      </div>

      {/* GRID */}
      <div className="bg-white border border-t-0 rounded-b-md overflow-hidden">
        <div className="ag-theme-alpine daybook-grid balance-grid"  style={{
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
            rowData={   view === "HSN Summary"
            ? subView === "Detailed"
            ? hsnDetailedRowData
            : hsnCondensedRowData
            : subView === "Detailed"
            ? detailedRowData
            : rowData}
            columnDefs={columnDefs}
            domLayout="autoHeight"
            rowSelection="single"
            headerHeight={34}
            rowHeight={32}
            suppressPaginationPanel
            getRowStyle={(p) => {
              if (p.data?.net) return { background: "#e6f0f7", fontWeight: "700" };
              if (p.data?.isTotal) return { fontWeight: "700" };
              return null;
            }}
          />
        </div>

       {/* ===== PAGINATION  ===== */}
        <div className="flex items-center justify-between px-4 py-2 border-t bg-white text-[13px]">

        {/* LEFT CONTROLS */}
        <div className="flex items-center gap-2 text-gray-700">

            <button className="text-[18px] px-2 opacity-60 hover:opacity-100">«</button>
            <button className="text-[18px] px-2 opacity-60 hover:opacity-100">‹</button>

            <span>Page</span>

            <input
            value={1}
            readOnly
            className="w-[42px] h-[26px] border rounded text-center font-semibold"
            />

            <span>of 2</span>

            <button className="text-[18px] px-2 opacity-60 hover:opacity-100">›</button>
            <button className="text-[18px] px-2 opacity-60 hover:opacity-100">»</button>

            <select className="ml-2 h-[26px] border rounded px-2 font-semibold">
            <option>10</option>
            <option>20</option>
            <option>50</option>
            </select>

        </div>

        {/* RIGHT INFO */}
        <div className="text-gray-600">
            Displaying <b>1</b> to <b>10</b> of <b>12</b> items.
        </div>
        </div>

      </div>
    </div>
  );
}
