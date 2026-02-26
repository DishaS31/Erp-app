import React, { useMemo, useRef, useState,useEffect } from "react";
import DatePicker from "react-datepicker";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "react-datepicker/dist/react-datepicker.css";
import { apiFetch } from "../../../services/apiFetch";

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


export default function DayBook() {
  const gridRef = useRef(null);

  /* ===== DATE ===== */
  const [financialYearStart, setFinancialYearStart] = useState(2025); 
// means FY 2025-26
  const [fromDate, setFromDate] = useState(new Date("2026-02-01"));
  const [toDate, setToDate] = useState(new Date("2026-02-26"));
  const [openVoucherSeries, setOpenVoucherSeries] = useState(false);
  const [showDatePopup, setShowDatePopup] = useState(false);



  /* ===== FILTER ===== */
  const [filterText, setFilterText] = useState("");

const [rowData, setRowData] = useState([]);
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(1);
const [perPage, setPerPage] = useState(10);
const [totalRecords, setTotalRecords] = useState(0);

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

const formatDisplayDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const startRecord =
  totalRecords === 0 ? 0 : (page - 1) * perPage + 1;

const endRecord =
  totalRecords === 0
    ? 0
    : Math.min(page * perPage, totalRecords);


  /* ===== COLUMNS ===== */
  const columnDefs = useMemo(
    () => [
      { headerName: "DATE", field: "date", minWidth: 140 },
      {
        headerName: "PARTICULARS",
        field: "particulars",
        flex: 1.6,
        minWidth: 280,
      },
      {
        headerName: "VOUCHER TYPE",
        field: "voucher_type",
        minWidth: 160,
      },
      {
        headerName: "VOUCHER NO.",
        field: "voucher_no",
        minWidth: 140,
      },
      {
        headerName: "DEBIT",
        field: "debit",
        minWidth: 160,
        cellClass: "text-right",
        headerClass: "ag-right-aligned-header",
      },
      {
        headerName: "CREDIT",
        field: "credit",
        minWidth: 160,
        cellClass: "text-right",
         headerClass: "ag-right-aligned-header",
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: false,
      filter: false,
      resizable: true,
    }),
    []
  );

useEffect(() => {
  fetchDayBook();
}, [page, perPage]);

  const fetchDayBook = async () => {
  try {
    setLoading(true);

    const compId = localStorage.getItem("selected_company_id");

    const payload = {
      cmp_id: compId,
      from_date: formatDate(fromDate),
      to_date: formatDate(toDate),
      pg_curpage: page,
      pg_rpp: perPage,
    };

    const data = await apiFetch("/DayBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("DayBook API:", data);

    const fullData = data?.data || data?.rows || [];

const decodeHTML = (str) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

const formatted = fullData.map((item) => ({
  date: item.date || "-",
  particulars: item.particulars || "-",
  voucher_type: item.voucher_type || "-",
  voucher_no: item.voucher_no || "-",
  debit: item.debit ? decodeHTML(item.debit) : "",
  credit: item.credit ? decodeHTML(item.credit) : "",
}));

    setRowData(formatted);
    setTotalRecords(data?.totalRecords || 0);

  } catch (err) {
    console.error("DayBook error ❌", err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-4">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-[28px] font-extrabold text-black">Day Book</h1>
        <div className="flex items-center gap-2">
          <IconBtn icon="refresh" tooltip="Refresh" />
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


        <button
          onClick={() => {
            setPage(1);
            fetchDayBook();
          }}
          className="h-[35px] px-6 bg-primary text-white font-bold rounded-md text-tiny"
        >
          GO
        </button>

        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden h-[38px]">
            {/* LEFT LABEL */}
            <div className="px-4 bg-[#f3f6fb] h-full flex items-center border-r text-[13px] font-bold">
              View
            </div>

            {/* DROPDOWN */}
            <select className="px-4 h-full outline-none text-[13px] font-bold bg-white min-w-[140px]">
              <option>Condensed</option>
            </select>
          </div>


          <button className="h-[35px] px-4 bg-primary text-white font-bold rounded-md text-tiny">
            Add Ons
          </button>

         <div className="relative">
            <button
              type="button"
              onClick={() => setOpenVoucherSeries((p) => !p)}
              className="
                h-[35px] px-4 bg-primary text-white font-bold rounded-md text-tiny
                flex items-center gap-2
              "
            >
              Voucher Series
              <Icon name="expand_more" className="text-[18px]" />
            </button>

            {/* DROPDOWN */}
            {openVoucherSeries && (
              <div
                className="
                  absolute right-0 mt-2 w-[220px]
                  bg-white border border-[#cfd6e4]
                  rounded-md shadow-lg z-50
                "
              >
                <button
                  className="w-full text-left px-4 py-2 text-[14px]
                            hover:bg-[#f3f6fb]"
                  onClick={() => setOpenVoucherSeries(false)}
                >
                  Action
                </button>

                <button
                  className="w-full text-left px-4 py-2 text-[14px]
                            hover:bg-[#f3f6fb]"
                  onClick={() => setOpenVoucherSeries(false)}
                >
                  Another action
                </button>

                <button
                  className="w-full text-left px-4 py-2 text-[14px]
                            hover:bg-[#f3f6fb]"
                  onClick={() => setOpenVoucherSeries(false)}
                >
                  Something else here
                </button>
              </div>
            )}
          </div>


          <label className="flex items-center gap-2 font-bold text-[13px]">
            <input type="checkbox" />
            Fixed Grid
          </label>

          <button className="h-[35px] px-4 border border-primary text-primary font-bold rounded-md text-tiny">
            Back
          </button>
        </div>
      </div>

      {/* ================= FILTER ================= */}
    <div className="flex items-center gap-3 bg-white border border-b-0 rounded-t-md px-3 py-2">
        <span className="font-bold text-[13px]">Filter:</span>
        <input
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Enter your keyword"
          className="h-[32px] w-[220px] px-3 border rounded-md text-[13px]"
        />
        <select className="h-[32px] px-4 border rounded-md font-bold text-tiny">
          <option>DATE</option>
          <option>VOUCHER TYPE</option>
          <option>VOUCHER NO.</option>
        </select>
        <select className="h-[32px] px-4 border rounded-md font-bold text-tiny">
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
        className="ag-theme-alpine daybook-grid"
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
        loading={loading}
          ref={gridRef}
          theme="legacy"
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={false}
          rowSelection="single"
          headerHeight={34}
          rowHeight={36}
          domLayout="autoHeight"
          animateRows
        />

        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex items-center justify-between px-4 py-2 border-t text-[14px]">
          <div className="flex items-center gap-2">
           <button className="text-[20px] font-bold px-2 opacity-60 hover:opacity-100">
              «
            </button>
            <button className="text-[20px] font-bold px-2 opacity-60 hover:opacity-100">
              ‹
            </button>
            <span>Page</span>
              <input
                value={page}
                onChange={(e) => setPage(Number(e.target.value))}
                className="w-[40px] h-[26px] border text-center rounded"
              />
            <span>
              of {Math.ceil(totalRecords / perPage) || 1}
            </span>
           <button className="text-[20px] font-bold px-2 opacity-60 hover:opacity-100">
              ›
            </button>
            <button className="text-[20px] font-bold px-2 opacity-60 hover:opacity-100">
              »
            </button>
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>

          </div>

          <div>Displaying {startRecord} to {endRecord} of {totalRecords} items.</div>
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
                  {["APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC","JAN","FEB","MAR"]
                  .map((m, index) => {

                    // FY starts from April (month index 3)
                    const actualMonth = (index + 3) % 12;
                    const yearAdjustment = index < 9 ? financialYearStart : financialYearStart + 1;

                    return (
                      <button
                        key={m}
                        onClick={() => {
                          const start = new Date(yearAdjustment, actualMonth, 1);
                          const end = new Date(yearAdjustment, actualMonth + 1, 0);

                          setFromDate(start);
                          setToDate(end);
                        }}
                        className="h-[36px] bg-[#e2f6dc] rounded-md"
                      >
                        {m}
                      </button>
                    );
                  })}
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
                  <button
                   onClick={() => {
                      const newFY = financialYearStart - 1;
                      setFinancialYearStart(newFY);
                      setFromDate(new Date(newFY, 3, 1));      // 1 April
                      setToDate(new Date(newFY + 1, 2, 31));   // 31 March
                    }}
                    className="w-[36px] h-full border-r text-[22px]"
                  >
                    ‹
                  </button>
                  <div className="flex-1 text-center font-bold text-tiny text-black">
                    FY: {financialYearStart} - {String(financialYearStart + 1).slice(-2)}
                  </div>
                    <button
                      onClick={() => {
                        const newFY = financialYearStart + 1;
                        setFinancialYearStart(newFY);
                        setFromDate(new Date(newFY, 3, 1));
                        setToDate(new Date(newFY + 1, 2, 31));
                      }}
                      className="w-[36px] h-full border-l text-[22px]"
                    >
                      ›
                    </button>
                </div>

                <div className="flex items-center gap-3">
                  <label className="w-[55px] font-bold text-black">From</label>
                  <input
                    value={formatDisplayDate(fromDate)}
                    readOnly
                    className="flex-1 h-[36px] px-3 border rounded-md font-semibold text-tiny"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="w-[55px] font-bold text-black">To</label>
                  <input
                    value={formatDisplayDate(toDate)}
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
               onClick={() => {
                setShowDatePopup(false);
                setPage(1);
                fetchDayBook();
              }}
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
