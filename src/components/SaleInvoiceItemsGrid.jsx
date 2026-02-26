import React, { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ITEM_MASTER = Array.from({ length: 150000 }).map((_, i) => ({
  id: i + 1,              // 🔥 IMPORTANT (ID)
  name: `Item ${i + 1}`,  // display
}));




ModuleRegistry.registerModules([AllCommunityModule]);

const ItemNameEditor = React.forwardRef((props, ref) => {
  const selectedItemRef = useRef(null);
  const listRef = useRef([]);
  const activeIndexRef = useRef(0);
  
  const [value, setValue] = useState(props.value?.name || "");
  const [list, setList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

useEffect(() => {
  // 🔥 RESET every time editor opens
  selectedItemRef.current = null;

  // ✅ If editing started by typing, capture the first key
  const firstKey =
    props.eventKey &&
    props.eventKey.length === 1 && // only normal characters
    !props.eventKey.ctrlKey &&
    !props.eventKey.metaKey &&
    !props.eventKey.altKey
      ? props.eventKey
      : "";

  if (props.value?.id) {
    // If there is an existing value AND user started by typing, start from that key (Excel-like replace)
    // If you want "append" behavior instead, use: `${props.value.name}${firstKey}`
    const initial = firstKey ? firstKey : props.value.name;

    setValue(initial);
    console.log("✅ INIT - Editor with value:", props.value, "| firstKey:", firstKey);

    // Optional: open dropdown immediately if firstKey present
    if (initial.length >= 1) {
      const filteredItems = ITEM_MASTER.filter((item) =>
        item.name.toLowerCase().includes(initial.toLowerCase())
      ).slice(0, 50);

      setList(filteredItems);
      setActiveIndex(0);
    }
  } else {
    const initial = firstKey; // 🔥 this is the main fix for fresh cells
    setValue(initial);
    console.log("🆕 INIT - Fresh editor | firstKey:", firstKey);

    // Optional: open dropdown immediately if firstKey present
    if (initial.length >= 1) {
      const filteredItems = ITEM_MASTER.filter((item) =>
        item.name.toLowerCase().includes(initial.toLowerCase())
      ).slice(0, 50);

      setList(filteredItems);
      setActiveIndex(0);
    }
  }

  return () => {
    if (selectedItemRef.current) {
      console.log("💾 UNMOUNT - Saving:", selectedItemRef.current);
      props.node.setDataValue("item", selectedItemRef.current);
    }
  };
}, []);


  // 🔥 Sync refs whenever state changes
  useEffect(() => {
    listRef.current = list;
    console.log("📝 Synced listRef with", list.length, "items");
  }, [list]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const onChange = (e) => {
    const v = e.target.value;
    setValue(v);

    if (v.length >= 1) {
      const filteredItems = ITEM_MASTER.filter(item =>
        item.name.toLowerCase().includes(v.toLowerCase())
      ).slice(0, 50);

      setList(filteredItems);
      console.log("🔍 Typing:", v, "| Found:", filteredItems.length, "matches");
      setActiveIndex(0);
    } else {
      setList([]);
      setActiveIndex(0);
    }
  };

  React.useImperativeHandle(ref, () => ({
    getValue() {
      console.log("getValue() - returning:", selectedItemRef.current);
      return selectedItemRef.current;
    },
    isCancelBeforeStart() {
      return false;
    },
    isCancelAfterEnd() {
      return false;
    }
  }));

  const selectItem = (item) => {
    console.log("✅ SELECTED ITEM:", {
      id: item.id,
      name: item.name,
    });

    selectedItemRef.current = item;
    setValue(item.name);
    setList([]);
    listRef.current = [];
    
    // 🔥 CRITICAL: Update grid cell BEFORE stopping editing
    props.node.setDataValue("item", item);
    console.log("📊 Grid cell updated immediately");

    // Trigger onCellValueChanged by stopping edit
    props.stopEditing(true);
    
    // ✅ Trigger navigation from editor context after edit stops
    if (props.context?.navigateToNextCell) {
      setTimeout(() => {
        props.context.navigateToNextCell(props.node.rowIndex, "item");
      }, 100);
    }
  };

const handleBlur = () => {
  console.log(
    "📌 Input blurred | activeIndexRef:",
    activeIndexRef.current,
    "| listRef.length:",
    listRef.current.length
  );

  if (listRef.current.length > 0) {
    const selectedItem = listRef.current[activeIndexRef.current];
    if (selectedItem) {
      console.log("🔄 Selecting on blur:", selectedItem.name);
      selectItem(selectedItem);
      return;
    }
  }

  props.stopEditing(false);
};


  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        autoFocus
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          console.log("⌨️ Key:", e.key, "| listRef.length:", listRef.current.length, "| activeIdx:", activeIndexRef.current);

          if (e.key === "Escape") {
            e.preventDefault();
            console.log("🔴 Escape - closing");
            props.stopEditing(false);
            return;
          }

          if (listRef.current.length === 0) {
            console.log("⚠️ No items in dropdown");
            return;
          }

          if (e.key === "ArrowDown") {
            e.preventDefault();
            activeIndexRef.current = Math.min(activeIndexRef.current + 1, listRef.current.length - 1);
            setActiveIndex(activeIndexRef.current);
            console.log("⬇️ Arrow Down → idx:", activeIndexRef.current);
            return;
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();
            activeIndexRef.current = Math.max(activeIndexRef.current - 1, 0);
            setActiveIndex(activeIndexRef.current);
            console.log("⬆️ Arrow Up → idx:", activeIndexRef.current);
            return;
          }

          if (e.key === "Enter") {
            e.preventDefault();
            const selected = listRef.current[activeIndexRef.current];
            console.log("🟢 Enter | idx:", activeIndexRef.current, "| item:", selected?.name);
            if (selected) {
              selectItem(selected);
            } else {
              console.warn("❌ No item at index");
            }
            return;
          }
        }}
        placeholder="Type to search..."
        className="w-full h-[30px] px-2 border border-gray-400 outline-none focus:border-blue-500"
      />

      {list.length > 0 && (
        <div className="fixed z-50 bg-white border-2 border-gray-300 w-56 max-h-[200px] overflow-auto shadow-xl rounded">
          <div className="text-xs text-gray-500 px-2 py-1 border-b bg-gray-50">
            {list.length} items found
          </div>
          {list.map((item, idx) => (
            <div
              key={`${item.id}`}
              className={`px-2 py-2 cursor-pointer transition font-medium ${
                idx === activeIndex
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900 hover:bg-blue-100"
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                console.log("🖱️ Clicked:", item.name);
                selectItem(item);
              }}
              onMouseEnter={() => {
                setActiveIndex(idx);
                activeIndexRef.current = idx;
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
  const lastFocusedCellRef = useRef(null); // Track which cell had first Enter
  const saveBtnRef = useRef(null);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // ================= GRID NAVIGATION LOGIC =================
  const editableColumns = ["item", "quantity", "short_narration", "unit", "price", "amount"];

  const navigateToNextCell = (rowIndex, currentColId) => {
    const currentColIndex = editableColumns.indexOf(currentColId);
    if (currentColIndex === -1) return;

    let nextColId;
    let nextRowIndex = rowIndex;

    if (currentColIndex < editableColumns.length - 1) {
      // Move to next column in same row
      nextColId = editableColumns[currentColIndex + 1];
    } else {
      // Move to first editable column in next row
      nextRowIndex = rowIndex + 1;
      nextColId = editableColumns[0];
    }

    const totalRows = gridRef.current?.api?.getDisplayedRowCount();
    if (!totalRows || nextRowIndex >= totalRows) return;

    // Set the focused cell ID so next Enter knows this cell was just focused
    lastFocusedCellRef.current = `${nextRowIndex}-${nextColId}`;
    
    // Small delay to ensure grid is ready
    setTimeout(() => {
      gridRef.current?.api?.setFocusedCell(nextRowIndex, nextColId);
    }, 50);
  };

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


const suppressKeyboardEvent = (params) => {
  const { event, api, node, column } = params;

  if (event.key !== "Enter") return false;

  const isEditing = api.getEditingCells().length > 0;

  // ✅ STEP 1: If NOT editing → allow default edit start
  if (!isEditing) {
    return false; // let ag-Grid start editing
  }

  // From here we are in EDIT MODE
  event.preventDefault();

  // stop editing first
  api.stopEditing();

  const editableCols = columnDefs.filter((c) => c.editable);
  const colIndex = editableCols.findIndex(
    (c) => c.field === column.getColId()
  );

  const field = column.getColId();
  const rowData = node.data || {};

  let isEmpty = false;

  if (field === "item") {
    isEmpty = !rowData.item || !rowData.item.name;
  } else {
    isEmpty =
      rowData[field] === "" ||
      rowData[field] === null ||
      rowData[field] === undefined;
  }

  // ✅ EMPTY → BILL GRID
  if (isEmpty) {
    billGridRef.current?.api?.setFocusedCell(0, "bill_name");
    return true;
  }

  // ✅ FILLED → NEXT CELL
  const nextCol = editableCols[colIndex + 1];

  if (nextCol) {
    api.setFocusedCell(node.rowIndex, nextCol.field);
    return true;
  }

  const nextRow = node.rowIndex + 1;
  if (api.getDisplayedRowAtIndex(nextRow)) {
    api.setFocusedCell(nextRow, editableCols[0].field);
  }

  return true;
};



const suppressBillKeyboardEvent = (params) => {
  const { event, api, node, column } = params;

  if (event.key !== "Enter") return false;

  const isEditing = api.getEditingCells().length > 0;

  // ✅ Not editing → allow default edit start
  if (!isEditing) {
    return false;
  }

  event.preventDefault();

  api.stopEditing();

  const billEditableCols = ["bill_name", "amount"];
  const colIndex = billEditableCols.indexOf(column.getColId());

  const field = column.getColId();
  const rowData = node.data || {};

  const isEmpty =
    rowData[field] === "" ||
    rowData[field] === null ||
    rowData[field] === undefined;

  // EMPTY → SAVE BUTTON
  if (isEmpty) {
    setTimeout(() => {
      saveBtnRef.current?.focus();
    }, 0);
    return true;
  }

  // FILLED → NEXT CELL
  const nextCol = billEditableCols[colIndex + 1];

  if (nextCol) {
    api.setFocusedCell(node.rowIndex, nextCol);
    return true;
  }

  const nextRow = node.rowIndex + 1;
  if (api.getDisplayedRowAtIndex(nextRow)) {
    api.setFocusedCell(nextRow, billEditableCols[0]);
  }

  return true;
};

// 🔥 DELETE LOGIC HELPERS
const editableFields = [
  "item",
  "quantity",
  "short_narration",
  "unit",
  "price",
  "amount",
];

const isRowEmpty = (row) => {
  return editableFields.every((f) => {
    if (f === "item") {
      return !row.item || !row.item.name;
    }
    return row[f] === "" || row[f] == null;
  });
};

const handleCellKeyDown = (params) => {
  const { event, api, node, column } = params;

  // ❌ pinned Total row
  if (node.rowPinned) return;

  // ❌ editor 
  if (api.getEditingCells().length > 0) return;

  const key = event.key.toLowerCase();
  const field = column.getColId();

  // ===============================
  // 🔥 CTRL + D  → FORCE ROW DELETE
  // ===============================
  if (event.ctrlKey && key === "d") {
    event.preventDefault();

    setRowData((prev) =>
      prev.filter((_, idx) => idx !== node.rowIndex)
    );

    return;
  }

  // ===============================
  // DELETE / BACKSPACE
  // ===============================
  if (key !== "delete" && key !== "backspace") return;

  event.preventDefault();

  // ✅ ROW EMPTY → ROW DELETE
  if (isRowEmpty(node.data)) {
    setRowData((prev) =>
      prev.filter((_, idx) => idx !== node.rowIndex)
    );
    return;
  }

  // ❌ ROW NOT EMPTY → ONLY CELL CLEAR
  if (editableFields.includes(field)) {
    if (field === "item") {
      node.setDataValue("item", null);
      node.setDataValue("item_id", null);
      node.setDataValue("item_name", "");
    } else {
      node.setDataValue(field, "");
    }
  }
};


const handleBillCellKeyDown = (params) => {
  const { event, api, node, column } = params;

  if (node.rowPinned) return;
  if (api.getEditingCells().length > 0) return;

  const key = event.key.toLowerCase();
  const field = column.getColId();

  // 🔥 CTRL + D → FORCE ROW DELETE
  if (event.ctrlKey && key === "d") {
    event.preventDefault();

    setBillRowData((prev) =>
      prev.filter((_, idx) => idx !== node.rowIndex)
    );
    return;
  }

  // DELETE / BACKSPACE
  if (key !== "delete" && key !== "backspace") return;
  event.preventDefault();

  const row = node.data;
  const isEmpty =
    (!row.bill_name || row.bill_name === "") &&
    (!row.amount || row.amount === "");

  // ✅ row empty → delete row
  if (isEmpty) {
    setBillRowData((prev) =>
      prev.filter((_, idx) => idx !== node.rowIndex)
    );
    return;
  }

  // ❌ row not empty → clear only cell
  node.setDataValue(field, "");
};




const billGridRef = useRef(null);

const [billRowData, setBillRowData] = useState(() =>
  Array.from({ length: 10 }).map(() => ({
    bill_name: "",
    amount: "",
  }))
);



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
     editable: true,
  },
  {
    headerName: "AMOUNT (₹)",
    field: "amount",
    flex: 1,
    minWidth: 180,
     editable: true,
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
      {
        headerName: "ITEM NAME",
        field: "item",                
        editable: true,
        cellEditor: ItemNameEditor,

        valueFormatter: (p) => p.value?.name || "",

        onCellValueChanged: (params) => {
          const item = params.newValue;
          if (!item) return;

          params.data.item_id = item.id;
          params.data.item_name = item.name;

          console.log("✅ FINAL ROW DATA", params.data);
        },
      },
      { headerName: "QUANTITY", field: "quantity", flex: 1, minWidth: 160, editable: true },
      {
        headerName: "SHORT NARRATION",
        field: "short_narration",
        flex: 1.2,
        minWidth: 220,
        editable: true,
      },
      { headerName: "UNIT", field: "unit", flex: 1, minWidth: 160, editable: true },
      { headerName: "PRICE", field: "price", flex: 1, minWidth: 180, editable: true },
      { headerName: "AMOUNT(₹)", field: "amount", flex: 1, minWidth: 180, editable: true, },
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
         item: { name: "Total" }, // 🔥 SAME STRUCTURE
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
               defaultColDef={{
                ...defaultColDef,
                suppressKeyboardEvent,
              }}
              context={{ navigateToNextCell }}
              stopEditingWhenCellsLoseFocus={false}
              onCellKeyDown={handleCellKeyDown}  
              suppressClickEdit={true}
              singleClickEdit={false}  
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
                    suppressKeyboardEvent: suppressBillKeyboardEvent,
                  }}
                  suppressClickEdit={true} 
                  onCellKeyDown={handleBillCellKeyDown} 
                  singleClickEdit={false} 
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
           ref={saveBtnRef}
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
