import React, { useMemo, useRef, useState } from "react";
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
        <Icon name={icon}  className="text-[28px] text-black"/>
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


/* ===== CHECK ===== */
const CheckItem = ({ label }) => (
  <label className="flex items-center gap-2 text-tiny font-bold text-[#525b75]">
    <input type="checkbox" className="h-[18px] w-[18px] accent-[#1aa10a]" />
    {label}
  </label>
);

/* ===== FIELD ===== */
const FieldBox = ({ label, children, w = "min-w-[90px]" }) => (
  <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden shadow-sm">
    <div
      className={`${w} bg-[#f3f6fb] border-r border-[#cfd6e4] px-4 py-2 text-tiny font-bold`}
    >
      {label}
    </div>
    <div className="flex-1 px-3">{children}</div>
  </div>
);

export default function InventoryStatus() {


  /* ===== DATE ===== */
  const [fromDate, setFromDate] = useState(new Date("2026-01-01"));
  const [toDate, setToDate] = useState(new Date("2026-01-28"));
  const [showDatePopup, setShowDatePopup] = useState(false);
  


  /* ===== PAGINATION (UI ONLY) ===== */
  const [page] = useState(0);
  const [perPage] = useState(10);

  /* ===== FILTER STATE ===== */
const [filterText, setFilterText] = useState("");
const [filterField, setFilterField] = useState("item");
const [filterCondition, setFilterCondition] = useState("contains");
const [valuation, setValuation] = useState("valuation");
const [subView, setSubView] = useState("item_wise");


  /* ===== GRID ===== */
  const gridRef = useRef(null);
  const rowData = useMemo(() => [], []);

  /* ===== COLUMN DEFINITIONS (ERP MATCH) ===== */
  const columnDefs = useMemo(
    () => [
      {
        headerName: "Item",
        field: "item",
        flex: 2,
        
        minWidth: 140,
        headerClass: "inv-header",
      },
      {
        headerName: "Unit",
        field: "unit",
        minWidth: 240,
        headerClass: "inv-header",
      },
      {
        headerName: "AVAILABLE",
        marryChildren: true,
        headerClass: "inv-header-center",
        children: [
          {
            headerName: "CL. Qty",
            field: "cl_qty",
            minWidth: 260,
            headerClass: "inv-sub-header",
            cellClass: "text-right",
          },
          {
            headerName: "Value",
            field: "value",
            minWidth: 260,
            headerClass: "inv-sub-header",
            cellClass: "text-right",
          },
        ],
      },
      {
        headerName: "Method",
        field: "method",
        minWidth: 260,
        headerClass: "inv-header",
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: false,
      filter: false,
      resizable: false, // ERP jaisa
    }),
    []
  );

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-[28px] font-extrabold text-[#141824]">
          Stock Status (Item Wise)
        </h1>

      <div className="flex items-center gap-2">
        <IconBtn icon="refresh" tooltip="Refresh" />
        <IconBtn icon="offline_bolt" tooltip="Power Q" />
        <IconBtn icon="print" tooltip="Print" />
        <IconBtn icon="download" tooltip="Download" />
        <IconBtn icon="share" tooltip="Share" />
     </div>

      </div>

      {/* ===== DATE + OPTIONS ===== */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <FieldBox label="From">
          <DatePicker
            selected={fromDate}
            onChange={setFromDate}
            dateFormat="dd-MM-yyyy"
            className="w-full bg-transparent outline-none text-tiny font-bold"
          />
        </FieldBox>

        <FieldBox label="To">
          <DatePicker
            selected={toDate}
            onChange={setToDate}
            dateFormat="dd-MM-yyyy"
            className="w-full bg-transparent outline-none text-tiny font-bold"
          />
        </FieldBox>

        {/* DATE OPTIONS ICON */}
        <button
          onClick={() => setShowDatePopup(true)}
          className="h-[35px] w-[38px] flex items-center justify-center
                    border border-primary text-primary rounded-md bg-white"
        >
          <Icon name="date_range" className="text-[20px]" />
        </button>

        <button className="h-[35px] px-6 bg-primary text-white font-bold rounded-md text-tiny">
          GO
        </button>


        <div className="flex gap-4 ml-4 flex-wrap">
          <CheckItem label="Inwards" />
          <CheckItem label="Outwards" />
          <CheckItem label="Fixed Grid" />
          <CheckItem label="Item HSN" />
          <CheckItem label="Opening Balance" />
          <CheckItem label="Profit" />
        </div>

        <div className="ml-auto flex gap-3">
          <button className="px-4 py-2 bg-primary text-white font-extrabold rounded-md text-tiny">
            Add Ons
          </button>
          <button className="px-4 py-2 border border-primary text-primary font-extrabold rounded-md text-tiny">
            Back
          </button>
        </div>
      </div>

{/* ===== FILTER BAR (ERP EXACT) ===== */}
<div className="flex items-center gap-3 mb-4">

  {/* FILTER (JOINED LIKE VALUATION) */}
  <div className="flex items-center bg-white border border-[#cfd6e4]
                  rounded-md overflow-hidden h-[35px]">

    <div className="px-4 py-2 bg-[#f3f6fb] border-r border-[#cfd6e4]
                    text-[13px] font-semibold text-[#374151]">
      Filter
    </div>

    <input
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
      placeholder="Enter your keyword"
      className="px-3 w-[220px] h-full
                 outline-none text-[13px]
                 placeholder:text-[#9ca3af]"
    />
  </div>

  {/* ITEM */}
  <select
    value={filterField}
    onChange={(e) => setFilterField(e.target.value)}
    className="h-[35px] px-4 border border-[#cfd6e4]
               rounded-md bg-white text-[13px] font-semibold"
  >
    <option value="item">Item</option>
    <option value="unit">Unit</option>
    <option value="method">Method</option>
  </select>

  {/* CONTAINS */}
  <select
    value={filterCondition}
    onChange={(e) => setFilterCondition(e.target.value)}
    className="h-[35px] px-4 border border-[#cfd6e4]
               rounded-md bg-white text-[13px] font-semibold"
  >
    <option value="contains">Contains</option>
    <option value="equals">Equals</option>
    <option value="starts">Starts With</option>
  </select>

  {/* GO */}
  <button className="h-[35px] px-4 bg-primary
                     text-white font-extrabold rounded-md text-tiny">
    GO
  </button>

  {/* RIGHT SIDE */}
  <div className="ml-auto flex items-center gap-3">

    {/* VALUATION (ERP STYLE) */}
    <div className="flex items-center bg-white border border-[#cfd6e4]
                    rounded-md overflow-hidden h-[35px]">

    {/* LEFT LABEL */}
    <div className="px-4 py-2 bg-[#f3f6fb] border-r border-[#cfd6e4]
                    text-[13px] font-semibold text-[#374151]">
        Valuation
    </div>

    {/* DROPDOWN */}
    <select
        value={valuation}
        onChange={(e) => setValuation(e.target.value)}
        className="px-4 h-full outline-none bg-white
                text-[13px] font-semibold min-w-[120px]"
    >
        <option value="avg">AVG</option>
        <option value="fifo">FIFO</option>
        <option value="lifo">LIFO</option>
    </select>
    </div>


    <div className="flex items-center bg-white border border-[#cfd6e4]
                    rounded-md overflow-hidden h-[35px]">
      <div className="px-4 py-2 bg-[#f3f6fb] border-r border-[#cfd6e4]
                      text-[13px] font-semibold text-[#374151]">
        Sub View
      </div>
      <select
        value={subView}
        onChange={(e) => setSubView(e.target.value)}
        className="px-4 h-full outline-none text-[13px] font-semibold bg-white"
      >
        <option value="item_wise">Item Wise</option>
        <option value="group_wise">Group Wise</option>
      </select>
    </div>

  </div>
</div>




      {/* ===== GRID ===== */}
      <div className="bg-white border border-[#e5e7eb] rounded-md shadow-sm overflow-hidden">
        <div className="ag-theme-alpine inventory-status-grid"  style={{
              width: "100%",
              height: "auto",
              "--ag-font-family":
                '"Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
              "--ag-font-size": "13px",
              "--ag-border-color": "#e5e7eb",
              "--ag-selected-row-background-color":
              "rgb(var(--color-primary) / 0.12)",
            }}>
          <AgGridReact
            ref={gridRef}
             theme="legacy"
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            domLayout="autoHeight"
            headerHeight={30}
            groupHeaderHeight={25}
            rowHeight={30}
            suppressCellFocus
            suppressMovableColumns
            rowSelection="single"
            pagination={false}
          />
        </div>

      
        {/* PAGINATION (ERP LOOK) */}
        <div className="flex items-center gap-3 px-4 py-2 border-t text-[14px] text-[#374151]">
          <button className="text-gray-400 text-xl">«</button>
          <button className="text-gray-400 text-xl">‹</button>

          <span>Page</span>
          <input
            value={page}
            readOnly
            className="w-[42px] h-[28px] border rounded text-center"
          />
          <span>of 0</span>

          <button className="text-gray-400 text-xl">›</button>
          <button className="text-gray-400 text-xl">»</button>

          <select
            value={perPage}
            readOnly
            className="ml-2 h-[28px] border rounded px-2"
          >
            <option>10</option>
          </select>
        </div>
      </div>

      {/* ===== TOTAL ===== */}
      <div className="mt-4 bg-white border border-[#cfd6e4] rounded-md p-4 flex items-center gap-4">
        <span className="text-base font-extrabold">Total Valuation:</span>
        <span className="bg-[#3b6cff] text-white px-4 py-1 rounded-md text-xl font-extrabold">
          ₹ 0.00
        </span>
        <span className="text-tiny bg-black text-white px-2 py-[2px] rounded">
          AVG
        </span>
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

            {/* LEFT SIDE */}
            <div className="w-[55%]">
              <div className="grid grid-cols-4 gap-2 text-tiny font-bold text-black">

                {["APR","JUL","OCT","JAN","MAY","AUG","NOV","FEB","JUN","SEP","DEC","MAR"].map(m => (
                  <button
                    key={m}
                    className="h-[36px] bg-[#e2f6dc] rounded-md hover:bg-[#d1efc8]"
                  >
                    {m}
                  </button>
                ))}

                {["Q1","Q2","Q3","Q4"].map(q => (
                  <button
                    key={q}
                    className="h-[36px] bg-[#bfeab1] rounded-md font-bold"
                  >
                    {q}
                  </button>
                ))}

                <button className="h-[36px] bg-[#d6e8fa] rounded-md font-bold">H1</button>
                <button className="h-[36px] bg-[#d6e8fa] rounded-md font-bold">H2</button>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[13px] font-bold text-black">
                <input type="checkbox" className="h-[15px] w-[15px]" />
                <span>TILL PERIOD</span>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-[45%] space-y-3">

              {/* FY */}
              <div className="flex items-center h-[36px] border border-[#cfd6e4] rounded-md overflow-hidden bg-[#eff2f6]">
                <button className="w-[36px] h-full border-r text-[25px]">‹</button>
                <div className="flex-1 text-center text-[14px] font-bold">
                  FY: 2025 - 26
                </div>
                <button className="w-[36px] h-full border-l text-[25px]">›</button>
              </div>

              {/* FROM */}
              <div className="flex items-center gap-3">
                <label className="w-[55px] text-[16px] font-bold">From</label>
                <input
                  value="01-01-2026"
                  readOnly
                  className="flex-1 h-[36px] px-3 border border-[#cfd6e4] rounded-md text-[13px] font-semibold"
                />
              </div>

              {/* TO + TILL DATE */}
              <div className="flex items-center gap-3">
                <label className="w-[55px] text-[16px] font-bold">To</label>
                <input
                  value="31-03-2026"
                  readOnly
                  className="flex-1 h-[36px] px-3 border border-[#cfd6e4] rounded-md text-[13px] font-semibold"
                />
              
              </div>
              <div className="flex justify-end">
                  <button className="h-[36px] px-4 border border-[#cfd6e4] rounded-md text-[13px] font-bold whitespace-nowrap bg-[#eff2f6] text-black">
                  TILL DATE
                </button>
              </div>
              
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setShowDatePopup(false)}
              className="px-8 py-2 bg-[#1aa10a] text-white rounded-md text-[14px] font-bold"
            >
              GO
            </button>
            <button
              onClick={() => setShowDatePopup(false)}
              className="px-8 py-2 bg-[#2f3542] text-white rounded-md text-[14px] font-bold"
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
