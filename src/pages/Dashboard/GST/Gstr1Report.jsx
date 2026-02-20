import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

const formatINR = (v) =>
  `₹${Number(v || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

/* ===== ICON ===== */
const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

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

export default function Gstr1Report() {
  const gridRef = useRef(null);
  const navigate = useNavigate();

  const [fixedGrid, setFixedGrid] = useState(false);
  const [view, setView] = useState("View");
  const [subView, setSubView] = useState("Condensed");
   const [openVoucher, setOpenVoucher] = useState(false);

  /* ================= GRID DATA ================= */
  const rowData = useMemo(() => [
    { table: "4A", name: "B2B REGULAR", records: 0, invoice: 0, taxable: 0, igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
    { table: "4B", name: "B2B REVERSE CHARGE", records: 0, invoice: 0, taxable: 0, igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
    { table: "5", name: "B2CL (LARGE)", records: 0, invoice: 0, taxable: 0, igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
    { table: "6A", name: "EXPORTS", records: 0, invoice: 0, taxable: 0, igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
    { table: "6B", name: "SUPPLIES MADE TO SEZ UNIT", records: 0, invoice: 0, taxable: 0, igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
    { table: "7", name: "B2CS", records: 0, invoice: 0, taxable: 0, igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
    { table: "8", name: "NIL RATED, EXEMPTED AND NON GST", records: 12, invoice: 1982211, taxable: 1982211, igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
    { table: "9B", name: "CREDIT NOTES", records: 0, invoice: 0, taxable: 0, igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
    { table: "TOTAL", name: "",  invoice: 1982211, taxable: 1982211, igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0, isTotal: true },
  ], []);

  const columnDefs = useMemo(() => [
    { headerName: "TABLE NO", field: "table", width: 110 },
    { headerName: "TABLE NAME", field: "name", flex: 1 },
    { headerName: "NO. OF RECORDS", field: "records", width: 150 },
    { headerName: "INVOICE VALUE", field: "invoice", width: 150, cellRenderer: (p) => <span className="float-right">{formatINR(p.value)}</span> },
    { headerName: "TAXABLE VALUE", field: "taxable", width: 150, cellRenderer: (p) => <span className="float-right">{formatINR(p.value)}</span> },
    { headerName: "IGST", field: "igst", width: 120, cellRenderer: (p) => <span className="float-right">{formatINR(p.value)}</span> },
    { headerName: "CGST", field: "cgst", width: 120, cellRenderer: (p) => <span className="float-right">{formatINR(p.value)}</span> },
    { headerName: "SGST", field: "sgst", width: 120, cellRenderer: (p) => <span className="float-right">{formatINR(p.value)}</span> },
    { headerName: "CESS", field: "cess", width: 120, cellRenderer: (p) => <span className="float-right">{formatINR(p.value)}</span> },
    { headerName: "TOTAL TAX", field: "total", width: 140, cellRenderer: (p) => <span className="float-right">{formatINR(p.value)}</span> },
  ], []);

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* ================= HEADER ================= */}
      <div className="mb-6">

        {/* Row 1 */}
        <div className="flex justify-between items-start">
          <h1 className="text-[25px] font-extrabold text-black">GSTR1 Report</h1>

          <div className="flex items-center gap-3">
            <IconBtn icon="refresh" tooltip="Refresh" />
            <IconBtn icon="offline_bolt" tooltip="Power Q" />
            <IconBtn icon="print" tooltip="Print" />
            <IconBtn icon="download" tooltip="Download" />
            <IconBtn icon="share" tooltip="Share" />


          </div>
        </div>

        {/* Row 2 */}
        <div className="flex justify-between items-center mt-3">

          <div>
            <label className="flex items-center gap-2 text-[14px]">
              <input
                type="checkbox"
                checked={fixedGrid}
                onChange={(e) => setFixedGrid(e.target.checked)}
              />
              Fixed Grid
            </label>

            <div className="italic mt-1 text-[15px]">
              For: <b>01 Apr, 2025</b> To <b>31 Mar, 2026</b>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <div className="flex border rounded-md overflow-hidden text-[13px]">
              <div className="px-4 bg-[#f3f6fb] font-bold py-2 border-r">View</div>
              <select
                value={subView}
                onChange={(e) => setSubView(e.target.value)}
                className="px-4 outline-none"
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

             <button
              onClick={() => navigate(-1)}
              className=" border border-primary text-primary px-4 py-2 rounded-md font-bold text-[13px] hover:bg-primary hover:text-white"
            >
              Back
            </button>

          </div>
        </div>
      </div>

      {/* ================= FILTER ================= */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white border rounded-t-md text-[13px]">
        <span className="font-semibold">Filter:</span>
        <input className="h-[30px] px-3 border rounded-md w-[240px]" placeholder="Enter your keyword" />
      </div>

      {/* ================= GRID ================= */}
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
            rowData={rowData}
            columnDefs={columnDefs}
             theme="legacy"
            domLayout="autoHeight"
            rowSelection="single"
            headerHeight={34}
            rowHeight={32}
            pagination={true}
            paginationPageSize={10}
            suppressPaginationPanel={true}
            getRowStyle={(p) =>
              p.data?.isTotal
                ? { fontWeight: "bold", background: "#e6f0f7" }
                : null
            }
          />
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex items-center justify-between px-4 py-2 border-t bg-white text-[13px]">

        {/* LEFT SIDE CONTROLS */}
        <div className="flex items-center gap-2 text-gray-700">

            {/* First */}
            <button
            onClick={() => gridRef.current.api.paginationGoToFirstPage()}
            className="text-[18px] px-2 opacity-60 hover:opacity-100"
            >
            «
            </button>

            {/* Previous */}
            <button
            onClick={() => gridRef.current.api.paginationGoToPreviousPage()}
            className="text-[18px] px-2 opacity-60 hover:opacity-100"
            >
            ‹
            </button>

            <span>Page</span>

            {/* Current Page Input */}
            <input
            value={gridRef.current?.api
                ? gridRef.current.api.paginationGetCurrentPage() + 1
                : 1}
            readOnly
            className="w-[42px] h-[26px] border rounded text-center font-semibold"
            />

            <span>
            of{" "}
            {gridRef.current?.api
                ? gridRef.current.api.paginationGetTotalPages()
                : 1}
            </span>

            {/* Next */}
            <button
            onClick={() => gridRef.current.api.paginationGoToNextPage()}
            className="text-[18px] px-2 opacity-60 hover:opacity-100"
            >
            ›
            </button>

            {/* Last */}
            <button
            onClick={() => gridRef.current.api.paginationGoToLastPage()}
            className="text-[18px] px-2 opacity-60 hover:opacity-100"
            >
            »
            </button>

            {/* Page Size */}
            <select
            className="ml-3 h-[26px] border rounded px-2 font-semibold"
            onChange={(e) =>
                gridRef.current.api.paginationSetPageSize(Number(e.target.value))
            }
            >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            </select>

        </div>

        {/* RIGHT SIDE INFO */}
        <div className="text-gray-600">
            Displaying{" "}
            <b>
            {gridRef.current?.api
                ? gridRef.current.api.paginationGetCurrentPage() * 10 + 1
                : 1}
            </b>{" "}
            to{" "}
            <b>
            {gridRef.current?.api
                ? Math.min(
                    (gridRef.current.api.paginationGetCurrentPage() + 1) * 10,
                    gridRef.current.api.getDisplayedRowCount()
                )
                : 10}
            </b>{" "}
            of{" "}
            <b>
            {gridRef.current?.api
                ? gridRef.current.api.getDisplayedRowCount()
                : rowData.length}
            </b>{" "}
            items.
        </div>

        </div>

      </div>

      {/* ================= PREVIEW BUTTON ================= */}
      <div className="flex justify-center mt-10">
        <button
        onClick={() => navigate("/company/dashboard/gst/gstr1-preview")}
        className="bg-primary text-white px-8 py-3 rounded-md font-bold text-[14px]"
        >
        PREVIEW GSTR-1
        </button>

      </div>

    </div>
  );
}
