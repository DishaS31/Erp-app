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
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

/* ===== COMMON FIELD BOX ===== */
const FieldBox = ({ label, children }) => (
  <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md h-[38px] overflow-hidden">
    <div className="px-4 bg-[#f3f6fb] border-r text-[13px] font-bold py-2">
      {label}
    </div>
    <div className="flex-1 px-3">{children}</div>
  </div>
);

/* ===== DATE FIELD ===== */
const DateFieldBox = ({ label, selected, onChange }) => {
  const pickerRef = useRef(null);

  return (
    <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md h-[38px] overflow-hidden justify-between">
      <div className="px-4 bg-[#f3f6fb] border-r text-[13px] font-bold py-2">
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
        className="px-3 border-l h-full flex items-center justify-center"
      >
        <Icon name="calendar_month" className="text-[20px]" />
      </button>
    </div>
  );
};

export default function JournalVoucher() {
  const gridRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [journalType, setJournalType] = useState("without_item");
  const [showAddOns, setShowAddOns] = useState(false);
  const addOnsRef = useRef(null);
  const topDatePickerRef = useRef(null);



  /* ================= GRID DATA ================= */
const [page, setPage] = useState(1);
const [perPage, setPerPage] = useState(10);

const totalCount = 500; // demo
const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
const start = totalCount === 0 ? 0 : (page - 1) * perPage + 1;
const end = Math.min(page * perPage, totalCount);

const rowData = useMemo(
  () =>
    Array.from({ length: perPage }, (_, i) => ({
      sr: (page - 1) * perPage + i + 1,
      drcr: "",
      account: "",
      narration: "",
      debit: "",
      credit: "",
    })),
  [page, perPage]
);


const itemCols = useMemo(() => [
  {
    headerName: "#",
    width: 60,
    valueGetter: (params) => {
      if (params.node.rowPinned === "bottom") return "";
      return params.node.rowIndex + 1;
    },
  },
  { headerName: "ITEM NAME", field: "item", flex: 1.5 },
  { headerName: "QTY", field: "qty", width: 90 },
  { headerName: "UOM", field: "uom", width: 90 },
  { headerName: "PRICE", field: "price", width: 120 },
  { headerName: "AMOUNT", field: "amount", width: 140 },
], []);


const accountCols = useMemo(() => [
  {
    headerName: "#",
    width: 60,
    valueGetter: (params) => {
      if (params.node.rowPinned === "bottom") return "";
      return params.node.rowIndex + 1;
    },
  },
  { headerName: "PARTICULARS", field: "account", flex: 1.8 },
  {
    headerName: "AMOUNT",
    field: "amount",
    width: 160,
    cellClass: "text-right",
    headerClass: "ag-right-aligned-header",
  },
], []);



  /* ================= COLUMNS ================= */


const pinnedBottomRowData = [
  {
    drcr: "Total",
    debit: "₹ 0.00",
    credit: "₹ 0.00",
  },
];


  const contraCols = useMemo(
    () => [
     {
            headerName: "#",
            width: 60,
            valueGetter: (params) => {
                if (params.node.rowPinned === "bottom") return "";
                return params.data?.sr ?? "";
            },
      },
      { headerName: "DR/CR", field: "drcr", width: 100 },
      { headerName: "ACCOUNT", field: "account", flex: 1.4 },
      { headerName: "SHORT NARRATION", field: "narration", flex: 1.8 },
      {
        headerName: "DEBIT",
        field: "debit",
        width: 160,
        cellClass: "text-right",
        headerClass: "ag-right-aligned-header",
      },
      {
        headerName: "CREDIT",
        field: "credit",
        width: 160,
        cellClass: "text-right",
        headerClass: "ag-right-aligned-header",
      },
    ],
    []
  );
  

  const defaultColDef = useMemo(
    () => ({
      editable: true,
      resizable: true,
      sortable: false,
      filter: false,
    }),
    []
  );

  React.useEffect(() => {
  const handleClickOutside = (e) => {
    if (addOnsRef.current && !addOnsRef.current.contains(e.target)) {
      setShowAddOns(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


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


  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between mb-4">
        <h1 className="text-[28px] font-extrabold text-black">Journal Voucher</h1>

        <div className="flex items-center gap-2">
            <IconBtn icon="visibility" tooltip="Preview" />
            <IconBtn icon="offline_bolt" tooltip="Power Q" />
            <IconBtn icon="print" tooltip="Print" />
            <IconBtn icon="download" tooltip="Download" />
            <IconBtn icon="share" tooltip="Share" />
        </div>

      </div>

      {/* ================= OPTIONS (FIXED) ================= */}
      <div className="mb-4">
        {/* ROW 1 */}
        <div className="flex items-center mb-3">
            <div className="flex gap-5">
            {(journalType === "with_item"
                ? [
                    "Bill By Bill",
                    "Item Batch",
                    "Cost Centre",
                    "Project Reporting",
                ]
                : [
                    "Bill By Bill",
                    "Cost Centre",
                    "Sub Ledger",
                    "Project Reporting",
                    "Optional",
                    "Reverse Jounal",
                ]
            ).map((l) => (
                <label
                key={l}
                className="flex items-center gap-2 text-tiny font-semibold text-[#525b75]"
                >
                <input type="checkbox" /> {l}
                </label>
            ))}
            </div>


          <div className="ml-auto flex gap-3">

           <div className="relative" ref={addOnsRef}>
                <button
                    onClick={() => setShowAddOns((p) => !p)}
                    className="h-[36px] px-5 bg-primary text-white font-bold rounded flex items-center gap-1 text-tiny"
                >
                    Add Ons
                    <span className="material-symbols-outlined text-[18px]">
                    arrow_drop_down
                    </span>
                </button>

                {showAddOns && (
                    <div className="absolute right-0 mt-2 w-[220px] bg-white border border-[#cfd6e4] rounded-md shadow-md z-50">
                    <button
                        className="w-full text-left px-4 py-3 text-[14px] hover:bg-[#f3f6fb]"
                        onClick={() => {
                        setShowAddOns(false);
                        // action here later
                        }}
                    >
                        « Migrate Other BO
                    </button>
                    </div>
                )}
            </div>


            <button className="h-[36px] px-6 border border-primary text-primary font-bold rounded text-tiny">
              Back
            </button>
          </div>
        </div>

        {/* ROW 2 */}
      <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden h-[36px] w-fit">

           <select
                value={journalType}
                 onChange={(e) => setJournalType(e.target.value)}
                className="
                    h-[36px] px-4 pr-10
                    outline-none
                    text-[14px] font-semibold
                    bg-white
                    border border-[#cfd6e4]
                    rounded-md mr-3 rounded-r-none
                "
                >
                <option value="without_item">Without Item</option>
                <option value="with_item">With Item</option>
            </select>

            {/* Currency dropdown */}
            <select
                className="
                h-full px-4 pr-10
                outline-none
                text-[14px] font-semibold
                bg-white
                border-none
                "
            >
                <option>Rupee (₹)</option>
            </select>

            {/* # Button */}
            <button
                className="
                h-full w-[42px]
                bg-primary text-white
                font-extrabold
                flex items-center justify-center
                "
            >
                #
            </button>
        </div>

      </div>

{/* ================= TOP FIELDS ================= */}
<div className="mb-3">
  {/* ROW 1 */}
 {/* ================= TOP ROW (FINAL ERP MATCH) ================= */}
  {journalType === "without_item" && (
    <>

    <div className="grid grid-cols-[320px_1fr_1fr] gap-4 mb-3 w-[80%]">

    {/* DATE */}
    <div className="flex items-center h-[42px] bg-white border border-[#cfd6e4] rounded-md overflow-hidden">
        <div className="w-[90px] h-full flex items-center px-4 bg-[#f3f6fb] border-r text-[13px] font-bold">
        Date:
        </div>

        <DatePicker
        ref={topDatePickerRef}
        selected={date}
        onChange={setDate}
        dateFormat="dd-MM-yyyy"
        className="flex-1 h-full px-4 outline-none text-[13px] font-bold"
        />


        <button
        type="button"
        onClick={() => topDatePickerRef.current?.setOpen(true)}
        className="h-full px-3 border-l flex items-center justify-center"
        >
        <Icon name="calendar_month" className="text-[20px] font-bold" />
        </button>

    </div>

    {/* VOUCHER SERIES */}
    <div className="flex items-center h-[42px] bg-white border border-[#cfd6e4] rounded-md overflow-hidden">
        <div className="w-[130px] h-full flex items-center px-4 bg-[#f3f6fb] border-r text-[13px] font-bold">
        Voucher Series:
        </div>

        <select
        className="flex-1 h-full px-4 outline-none text-[13px] font-bold bg-white"
        defaultValue="Main"
        >
        <option value="Main">Main</option>
        </select>
    </div>

    
        <div className="flex items-center h-[42px] bg-white border rounded-md">
        <div className="w-[120px] px-4 bg-[#f3f6fb] border-r text-[13px] font-bold h-full flex items-center">
            GST Nature:
        </div>
        <select className="flex-1 px-4 text-[13px] font-bold bg-white">
            <option>Choose</option>
        </select>
        </div>


    </div>

     {/* ROW 2 */}
    <div className="grid grid-cols-[1fr_260px] gap-4">
        {/* Narration */}
        <div className="flex items-stretch bg-white border border-[#cfd6e4] rounded-md overflow-hidden">
        <div className="px-4 bg-[#f3f6fb] border-r text-[13px] font-bold flex items-center">
            Narration
        </div>
        <textarea
            className="flex-1 px-4 py-2 outline-none resize-none text-[13px]"
        />
        </div>

        {/* Name / Balance */}
        <div className="bg-white border border-[#cfd6e4] rounded-md px-4 py-2 text-[14px]">
        <div className="font-normal">Name</div>
        <div className="mt-1">Balance</div>
        </div>
    </div>

   </>
  )}


 {/* ================= WITH ITEM  ================= */}
  {journalType === "with_item" && (
    <>
      {/* ROW 1 */}
      <div className="grid grid-cols-[260px_220px_220px_1fr_220px] gap-4 mb-3">

        <DateFieldBox
          label="Date:"
          selected={date}
          onChange={setDate}
        />

        <FieldBox label="Series:">
          <select className="w-full outline-none text-[13px] font-bold bg-white">
            <option>Main</option>
          </select>
        </FieldBox>

        <FieldBox label="Voucher No:">
          <input
            value="178380"
            disabled
            className="w-full bg-transparent outline-none text-[13px] font-bold text-gray-500"
          />
        </FieldBox>

        <FieldBox label="GST Nature:">
          <select className="w-full outline-none text-[13px] font-bold bg-white">
            <option>Choose</option>
          </select>
        </FieldBox>

        <FieldBox label="MC:">
          <select className="w-full outline-none text-[13px] font-bold bg-white ">
            <option>Main</option>
          </select>
        </FieldBox>

      </div>

      {/* ROW 2 */}
      <div className="bg-white border border-[#cfd6e4] rounded-md overflow-hidden">
        <div className="px-4 py-2 bg-[#f3f6fb] border-b text-[13px] font-bold">
          Narration:
        </div>
        <textarea
          className="w-full h-[50px] px-4 py-1 outline-none resize-none text-[13px]"
        />
      </div>
    </>
  )}

 
</div>



      {/* ================= GRID ================= */}
    {journalType === "without_item" && (
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
    
            {/* GRID */}
            <div
                className="ag-theme-alpine payment-voucher-grid"
                style={{
                    width: "100%",
                    height: "auto",
                    "--ag-foreground-color": "#333",        // ✅ text color
                    "--ag-header-background-color": "#f3f4fb",
                    "--ag-header-foreground-color": "#333",
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
               columnDefs={contraCols}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
                pagination={false}
                rowSelection="single"
                headerHeight={34}
                rowHeight={32}
                pinnedBottomRowData={pinnedBottomRowData}
                getRowClass={(params) => {
                if (params.node.rowPinned === "bottom") return "pinned-total-row";
                if (params.node.isSelected()) return "row-selected-green";
                if (params.node.rowIndex === 0) return "first-row-green";
                return "";
                }}

                />
            </div>

            {/* PAGINATION */}
            <div className="flex items-center gap-4 px-3 py-2 border-t text-[14px]">

                <div className="flex items-center gap-2">
                <button disabled={page <= 1} onClick={() => setPage(1)}>«</button>
                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>

                <span>Page</span>
                <input
                    className="w-[40px] h-[28px] border text-center"
                    value={page}
                    onChange={(e) => {
                    const v = Number(e.target.value);
                    if (!isNaN(v)) setPage(Math.min(v, totalPages));
                    }}
                />
                <span>of {totalPages}</span>

                <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
                <button disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>
                </div>

                <div className="flex items-center gap-2">
                <span>Records per page:</span>
                <select
                    value={perPage}
                    onChange={(e) => {
                    setPerPage(Number(e.target.value));
                    setPage(1);
                    }}
                >
                    {[10, 25, 50, 100].map((n) => (
                    <option key={n} value={n}>{n}</option>
                    ))}
                </select>
                </div>

                <div className="flex-1 text-right">
                Displaying {start} to {end} of {totalCount} items.
                </div>
            </div>
        </div>
    )}

    {journalType === "with_item" && (
        <>
            {/* ITEM GRIDS */}
            <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Inward Items */}
            <div className="bg-white border rounded-md overflow-hidden">
                <div className="text-center font-bold py-2">
                Inward Items
                </div>

                <div className="ag-theme-alpine payment-voucher-grid"   style={{
                    width: "100%",
                    height: "auto",
                    "--ag-foreground-color": "#333",        // ✅ text color
                    "--ag-header-background-color": "#f3f4fb",
                    "--ag-header-foreground-color": "#333",
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
                        rowData={rowData}
                        theme="legacy"
                        columnDefs={itemCols}     // 🔴 ONLY DIFFERENCE
                        defaultColDef={defaultColDef}
                        rowSelection="single"
                        domLayout="autoHeight"
                        pagination={false}
                        headerHeight={34}
                        rowHeight={32}
                        pinnedBottomRowData={[
                        {
                            item: "Total",
                            account: "Total",
                            amount: "",
                        }
                        ]}

                        getRowClass={(params) => {
                        if (params.node.rowPinned === "bottom") return "pinned-total-row";
                        if (params.node.rowIndex === 0) return "first-row-green";
                        return "";
                        }}
                    />

                    <div className="flex items-center gap-4 px-3 py-2 border-t text-[14px]">
                        <div className="flex items-center gap-2">
                            <button disabled={page <= 1} onClick={() => setPage(1)}>«</button>
                            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>

                            <span>Page</span>
                            <input
                            className="w-[40px] h-[28px] border text-center"
                            value={page}
                            onChange={(e) => {
                                const v = Number(e.target.value);
                                if (!isNaN(v)) setPage(Math.min(v, totalPages));
                            }}
                            />
                            <span>of {totalPages}</span>

                            <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
                            <button disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span>Records per page:</span>
                            <select
                            value={perPage}
                            onChange={(e) => {
                                setPerPage(Number(e.target.value));
                                setPage(1);
                            }}
                            >
                            {[10, 25, 50, 100].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                            </select>
                        </div>

                        <div className="flex-1 text-right">
                            Displaying {start} to {end} of {totalCount} items.
                        </div>
                    </div>

                </div>

            </div>

            {/* Outward Items */}
            <div className="bg-white border rounded-md overflow-hidden">
                <div className="text-center font-bold py-2">
                Outward Items
                </div>

            <div className="ag-theme-alpine payment-voucher-grid" style={{
                    width: "100%",
                    height: "auto",
                    "--ag-foreground-color": "#333",        // ✅ text color
                    "--ag-header-background-color": "#f3f4fb",
                    "--ag-header-foreground-color": "#333",
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
                    rowData={rowData}
                    theme="legacy"
                    columnDefs={itemCols}
                    defaultColDef={defaultColDef}
                    domLayout="autoHeight"
                    rowSelection="single"
                    pagination={false}
                    headerHeight={34}
                    rowHeight={32}
                    pinnedBottomRowData={[
                        {
                            item: "Total",
                            account: "Total",
                            amount: "",
                        }
                        ]}
                    getRowClass={(params) => {
                    if (params.node.rowPinned === "bottom") return "pinned-total-row";
                    if (params.node.rowIndex === 0) return "first-row-green";
                    return "";
                    }}
                />

                <div className="flex items-center gap-4 px-3 py-2 border-t text-[14px]">
                    <div className="flex items-center gap-2">
                        <button disabled={page <= 1} onClick={() => setPage(1)}>«</button>
                        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>

                        <span>Page</span>
                        <input
                        className="w-[40px] h-[28px] border text-center"
                        value={page}
                        onChange={(e) => {
                            const v = Number(e.target.value);
                            if (!isNaN(v)) setPage(Math.min(v, totalPages));
                        }}
                        />
                        <span>of {totalPages}</span>

                        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
                        <button disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>Records per page:</span>
                        <select
                        value={perPage}
                        onChange={(e) => {
                            setPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                        >
                        {[10, 25, 50, 100].map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                        </select>
                    </div>

                    <div className="flex-1 text-right">
                        Displaying {start} to {end} of {totalCount} items.
                    </div>
                </div>


                
            </div>

            </div>
            </div>

            {/* ACCOUNT GRIDS */}
            <div className="grid grid-cols-2 gap-6">
            {/* Debit */}
            <div className="bg-white border rounded-md overflow-hidden">
                <div className="text-center font-bold py-2">
                Accounts/Billsundry To Be Debited
                </div>

              <div className="ag-theme-alpine payment-voucher-grid" style={{
                    width: "100%",
                    height: "auto",
                    "--ag-foreground-color": "#333",        // ✅ text color
                    "--ag-header-background-color": "#f3f4fb",
                    "--ag-header-foreground-color": "#333",
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
                        rowData={rowData}
                        theme="legacy"
                        columnDefs={accountCols}   // 🔴 ACCOUNT COLS
                        defaultColDef={defaultColDef}
                        rowSelection="single"
                        domLayout="autoHeight"
                        pagination={false}
                        headerHeight={34}
                        rowHeight={32}
                        pinnedBottomRowData={[
                        {
                            item: "Total",
                            account: "Total",
                            amount: "",
                        }
                        ]}
                        getRowClass={(params) => {
                        if (params.node.rowPinned === "bottom") return "pinned-total-row";
                        if (params.node.rowIndex === 0) return "first-row-green";
                        return "";
                        }}
                    />

                    <div className="flex items-center gap-4 px-3 py-2 border-t text-[14px]">
                        <div className="flex items-center gap-2">
                            <button disabled={page <= 1} onClick={() => setPage(1)}>«</button>
                            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>

                            <span>Page</span>
                            <input
                            className="w-[40px] h-[28px] border text-center"
                            value={page}
                            onChange={(e) => {
                                const v = Number(e.target.value);
                                if (!isNaN(v)) setPage(Math.min(v, totalPages));
                            }}
                            />
                            <span>of {totalPages}</span>

                            <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
                            <button disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span>Records per page:</span>
                            <select
                            value={perPage}
                            onChange={(e) => {
                                setPerPage(Number(e.target.value));
                                setPage(1);
                            }}
                            >
                            {[10, 25, 50, 100].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                            </select>
                        </div>

                        <div className="flex-1 text-right">
                            Displaying {start} to {end} of {totalCount} items.
                        </div>
                    </div>

                </div>

            </div>

            {/* Credit */}
            <div className="bg-white border rounded-md overflow-hidden">
                <div className="text-center font-bold py-2">
                Accounts/Billsundry To Be Credited
                </div>

                <div className="ag-theme-alpine payment-voucher-grid" style={{
                    width: "100%",
                    height: "auto",
                    "--ag-foreground-color": "#333",        // ✅ text color
                    "--ag-header-background-color": "#f3f4fb",
                    "--ag-header-foreground-color": "#333",
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
                        rowData={rowData}
                        theme="legacy"
                        columnDefs={accountCols}
                        defaultColDef={defaultColDef}
                        rowSelection="single"
                        domLayout="autoHeight"
                        pagination={false}
                        headerHeight={34}
                        rowHeight={32}
                        pinnedBottomRowData={[
                        {
                            item: "Total",
                            account: "Total",
                            amount: "",
                        }
                        ]}
                        getRowClass={(params) => {
                        if (params.node.rowPinned === "bottom") return "pinned-total-row";
                        if (params.node.rowIndex === 0) return "first-row-green";
                        return "";
                        }}
                    />
                  
                    <div className="flex items-center gap-4 px-3 py-2 border-t text-[14px]">
                        <div className="flex items-center gap-2">
                            <button disabled={page <= 1} onClick={() => setPage(1)}>«</button>
                            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>

                            <span>Page</span>
                            <input
                            className="w-[40px] h-[28px] border text-center"
                            value={page}
                            onChange={(e) => {
                                const v = Number(e.target.value);
                                if (!isNaN(v)) setPage(Math.min(v, totalPages));
                            }}
                            />
                            <span>of {totalPages}</span>

                            <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
                            <button disabled={page >= totalPages} onClick={() => setPage(totalPages)}>»</button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span>Records per page:</span>
                            <select
                            value={perPage}
                            onChange={(e) => {
                                setPerPage(Number(e.target.value));
                                setPage(1);
                            }}
                            >
                            {[10, 25, 50, 100].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                            </select>
                        </div>

                        <div className="flex-1 text-right">
                            Displaying {start} to {end} of {totalCount} items.
                        </div>
                    </div>



                </div>

            </div>
            </div>
        </>
    )}


      {/* ================= FOOTER ================= */}
      <div className="flex justify-center gap-4 mt-6">
        <button className="px-10 py-2 bg-primary text-white font-bold rounded">
          SAVE
        </button>
        <button className="px-10 py-2 bg-primary text-white font-bold rounded">
          SAVE AS DRAFT
        </button>
        <button className="px-10 py-2 bg-[#2f3542] text-white font-bold rounded">
          QUIT
        </button>
      </div>
    </div>
  );
}
