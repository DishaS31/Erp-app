import React, { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ITEM_MASTER = Array.from({ length: 150000 }).map((_, i) => ({
  name: `Item ${i + 1}`,
}));


ModuleRegistry.registerModules([AllCommunityModule]);

const ItemNameEditor = React.forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value || "");
  const [list, setList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedValueRef = useRef(props.value || "");

  useEffect(() => {
    console.log(">>> ItemNameEditor MOUNT", {
      valueProp: props.value,
      rowIndex: props.node?.rowIndex,
      colId: props.column?.getColId?.(),
      hasApi: !!props.api,
      nodeData: props.node?.data,
    });

    return () => {
      console.log(">>> ItemNameEditor UNMOUNT", {
        rowIndex: props.node?.rowIndex,
      });
    };
  }, []);


  const onChange = (e) => {
    const v = e.target.value;
    setValue(v);
    selectedValueRef.current = v;

    if (v.length >= 1) {
      setList(
        ITEM_MASTER
          .filter(item =>
            item.name.toLowerCase().startsWith(v.toLowerCase())
          )
          .slice(0, 50)
      );
      setActiveIndex(0);
    } else {
      setList([]);
    }
  };

  React.useImperativeHandle(ref, () => ({
    getValue() {
      return selectedValueRef.current;
    },
  }));

  return (
    <div className="relative">
      <input
        autoFocus
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (!list.length) return;

          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex(i => Math.min(i + 1, list.length - 1));
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex(i => Math.max(i - 1, 0));
          }

          if (e.key === "Enter") {
            e.preventDefault();
            const selected = list[activeIndex].name;
            selectedValueRef.current = selected;
            setValue(selected);
            setList([]);
            props.stopEditing(false); // ✅ THIS IS THE KEY
          }
        }}
        className="w-full h-[30px] px-2 border outline-none"
      />

      {list.length > 0 && (
        <div className="fixed z-50 bg-white border w-56 max-h-[200px] overflow-auto">
          {list.map((item, idx) => (
            <div
              key={idx}
              className={`px-2 py-1 cursor-pointer ${
                idx === activeIndex ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
             onMouseDown={(e) => {
              e.preventDefault(); // ✅ THIS IS THE FIX
              selectedValueRef.current = item.name;
              setValue(item.name);
              setList([]);
              props.stopEditing(false);
            }}

            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});




export default function SaleInvoiceItemsGrid() {
  const gridRef = useRef(null);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // ================= BILL SUNDRY PAGINATION STATE =================
const [billPage, setBillPage] = useState(1);
const [billPerPage, setBillPerPage] = useState(10);

const billTotalCount = 50; // demo 
const billTotalPages = Math.max(1, Math.ceil(billTotalCount / billPerPage));

const billStart =
billTotalCount === 0 ? 0 : (billPage - 1) * billPerPage + 1;
const billEnd = Math.min(billPage * billPerPage, billTotalCount);


  const totalCount = 500; // demo
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

  const start = totalCount === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, totalCount);

const [rowData, setRowData] = useState(() =>
  Array.from({ length: perPage }).map(() => ({
    item_name: "",
    quantity: "",
    short_narration: "",
    unit: "",
    price: "",
    amount: "",
  }))
);



const billGridRef = useRef(null);

const billRowData = useMemo(() => {
  return Array.from({ length: 10 }).map(() => ({
    bill_name: "",
    amount: "",
  }));
}, []);

const billColumnDefs = useMemo(() => [
  {
    headerName: "",
    width: 45,
    valueGetter: (p) => p.node.rowIndex + 1,
    pinned: "left",
  },
  {
    headerName: "BILL SUNDRY",
    field: "bill_name",
    flex: 1,
    minWidth: 250,
  },
  {
    headerName: "AMOUNT (₹)",
    field: "amount",
    flex: 1,
    minWidth: 180,
  },
], []);


  const columnDefs = useMemo(() => {
    return [
      {
        headerName: "",
        width: 45,
        pinned: "left",
        valueGetter: (params) => params.node.rowIndex + 1,
        sortable: false,
        filter: false,
        resizable: false,
      },
      { headerName: "ITEM NAME", field: "item_name", flex: 1.2, minWidth: 220, editable: true, cellEditor: ItemNameEditor,  onCellValueChanged: (params) => {
    console.log("SAVED VALUE 👉", params.newValue);
  } },
      { headerName: "QUANTITY", field: "quantity", flex: 1, minWidth: 160 },
      {
        headerName: "SHORT NARRATION",
        field: "short_narration",
        flex: 1.2,
        minWidth: 220,
      },
      { headerName: "UNIT", field: "unit", flex: 1, minWidth: 160 },
      { headerName: "PRICE", field: "price", flex: 1, minWidth: 180 },
      { headerName: "AMOUNT(₹)", field: "amount", flex: 1, minWidth: 180 },
    ];
  }, []);

  const defaultColDef = useMemo(
    () => ({
      sortable: false,
      resizable: true,
      filter: false,
    }),
    []
  );

  // ✅ pinned bottom Total row (blue)
  const pinnedBottomRowData = useMemo(() => {
    return [
      {
        item_name: "Total",
        quantity: 0,
        short_narration: "",
        unit: "",
        price: "",
        amount: "",
      },
    ];
  }, []);

  // ✅ BILL SUNDRY pinned bottom Total row
const billPinnedBottomRowData = useMemo(() => {
  return [
    {
      bill_name: "Total",
      amount: "₹ 0.00",
    },
  ];
}, []);


  return (
    
   <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-md shadow-sm ">
          {/* GRID */}
          <div
            className="sale-items-grid ag-theme-alpine"
            style={{
              width: "100%",
              height: "auto",
              "--ag-font-family":
                '"Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
              "--ag-font-size": "13px",
              "--ag-border-color": "#e5e7eb",
              "--ag-selected-row-background-color":
              "rgb(var(--color-primary) / 0.12)",
            }}
          >
            <AgGridReact
              ref={gridRef}
              theme="legacy"
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              stopEditingWhenCellsLoseFocus={false}

              pagination={false}
              headerHeight={36}
              rowHeight={34}
              domLayout="autoHeight"
              suppressCellFocus={false}
              rowSelection="single"
              suppressRowClickSelection={false}
              pinnedBottomRowData={pinnedBottomRowData}
              getRowClass={(params) => {
                if (params.node.rowIndex === 0) return "first-row-green";
                return "";
              }}
            />
          </div>

          {/* ✅ Bottom pagination bar EXACT like image */}
          <div className="flex items-center gap-4 px-3 py-2 border-t border-gray-200 text-[14px] text-gray-800">
            {/* left arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="text-gray-400 text-[20px] disabled:opacity-40"
                disabled={page <= 1}
                onClick={() => setPage(1)}
              >
                «
              </button>

              <button
                type="button"
                className="text-gray-400 text-[20px] disabled:opacity-40"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ‹
              </button>

              <span className="text-gray-700">Page</span>

              <input
                type="text"
                value={page}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (!Number.isNaN(val) && val >= 1) setPage(Math.min(val, totalPages));
                }}
                className="w-[42px] h-[28px] border border-gray-300 rounded text-center outline-none"
              />

              <span className="text-gray-700">of {totalPages}</span>

              <button
                type="button"
                className="text-black text-[20px] disabled:opacity-40"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                ›
              </button>

              <button
                type="button"
                className="text-black text-[20px] disabled:opacity-40"
                disabled={page >= totalPages}
                onClick={() => setPage(totalPages)}
              >
                »
              </button>
            </div>

            {/* records per page */}
            <div className="flex items-center gap-2">
              <span>Records per page:</span>
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className="h-[28px] border border-gray-300 rounded px-2 outline-none"
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* displaying */}
            <div className="flex-1 text-right text-gray-700">
              Displaying {start} to {end} of {totalCount} items.
            </div>
          </div>

        </div>
         
           {/* GAP */}
         <div className="h-2" />

        {/* ================= BILL SUNDRY SECTION ================= */}
        <div className="grid grid-cols-12 gap-4">

          {/* LEFT : BILL SUNDRY GRID */}
          <div className="col-span-8 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
           

            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">

              {/* HEADER */}
              <div className="text-center font-bold py-2 border-b">
                Bill Sundry
              </div>

              {/* GRID */}
                <div
                  className="ag-theme-alpine bill-sundry-grid"
                  style={{
                    width: "100%",
                    height: "auto",
                    "--ag-font-family":
                      '"Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
                    "--ag-font-size": "13px",
                    "--ag-border-color": "#e5e7eb",
                   "--ag-selected-row-background-color": "rgb(var(--color-primary) / 0.12)",
                     
                  }}
                >

                <AgGridReact
                  ref={billGridRef}
                  theme="legacy"
                  rowData={billRowData}
                  columnDefs={billColumnDefs}
                  defaultColDef={{
                    sortable: false,
                    resizable: true,
                    filter: false,
                  }}
                  pagination={false}
                  domLayout="autoHeight"
                  rowHeight={34}
                  headerHeight={36}
                  pinnedBottomRowData={billPinnedBottomRowData}
                  rowSelection="single"
                 getRowClass={(params) => {
                    if (params.node.isSelected()) return "bill-row-selected";
                    return "";
                  }}

                />
              </div>

              
                        {/* BILL SUNDRY PAGINATION */}
              <div className="flex items-center gap-4 px-3 py-2 border-t text-[14px]">

                <div className="flex items-center gap-2">
                  <button onClick={() => setBillPage(1)}>«</button>
                  <button onClick={() => setBillPage(p => Math.max(1, p - 1))}>‹</button>

                  <span>Page</span>
                  <input
                    className="w-[40px] border text-center"
                    value={billPage}
                    onChange={(e) =>
                      setBillPage(
                        Math.min(Number(e.target.value), billTotalPages)
                      )
                    }
                  />
                  <span>of {billTotalPages}</span>

                  <button onClick={() => setBillPage(p => Math.min(billTotalPages, p + 1))}>›</button>
                  <button onClick={() => setBillPage(billTotalPages)}>»</button>
                </div>

                <div className="flex items-center gap-2">
                  <span>Records per page:</span>
                  <select
                    value={billPerPage}
                    onChange={(e) => {
                      setBillPerPage(Number(e.target.value));
                      setBillPage(1);
                    }}
                  >
                    {[10, 25, 50].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 text-right">
                  Displaying {billStart} to {billEnd} of {billTotalCount} items.
                </div>
              </div>


            </div>

          </div>

          {/* RIGHT : SUMMARY */}
          <div className="col-span-4 bg-white border border-gray-200 rounded-md shadow-sm p-4 text-[#31374a]">
            <div className="flex justify-between mb-3">
              <span className="font-bold">Value Of Service</span>
              <span>₹ 0.00</span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="font-bold">Bill Sundry</span>
              <span>₹ 0.00</span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="font-bold">Total Supply Value</span>
              <span>₹ 0.00</span>
            </div>

            <div className="flex justify-between  border-t pt-2">
              <span className="font-bold">Total Invoice Value</span>
              <span>₹ 0.00</span>
            </div>
          </div>

        </div>
        {/* ================= BILL SUNDRY ACTION BUTTONS ================= */}
        <div className="flex justify-center gap-6 py-8">

          <button
            type="button"
            className="min-w-[140px] px-8 py-3
                      rounded-md text-white font-extrabold text-[14px]
                      bg-primary hover:opacity-90 transition"
          >
            SAVE
          </button>

          <button
            type="button"
            className="min-w-[180px] px-8 py-3
                      rounded-md text-white font-extrabold text-[14px]
                      bg-primary hover:opacity-90 transition"
          >
            SAVE AS DRAFT
          </button>

          <button
            type="button"
            className="min-w-[200px] px-8 py-3
                      rounded-md text-white font-extrabold text-[14px]
                      bg-primary hover:opacity-90 transition"
          >
            TAXABLE SUMMARY
          </button>

          <button
            type="button"
            className="min-w-[120px] px-8 py-3
                      rounded-md text-white font-extrabold text-[14px]
                      bg-[#2f3545] hover:bg-[#1f2433] transition"
          >
            QUIT
          </button>

        </div>


   </div>

   
    
  );
}
