import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { apiFetch } from "../services/apiFetch";
import { useNavigate } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CompaniesAgGrid({ filter = "all", onSelectCompany })
 {
  const gridRef = useRef(null);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [rowData, setRowData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quickFilter, setQuickFilter] = useState("");
  const [error, setError] = useState("");

 const columnDefs = useMemo(() => {
  // ✅ RECYCLE BIN COLUMNS 
  if (filter === "recycle") {
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
        headerName: "COMPANY CODE",
        field: "company_code",
        flex: 1,
        minWidth: 180,
      },
      {
        headerName: "COMPANY NAME",
        field: "company_name",
        flex: 1.5,
        minWidth: 260,
      },
      {
        headerName: "FIN. YEAR(S)",
        field: "fin_year",
        flex: 1.2,
        minWidth: 240,
      },
      {
        headerName: "DELETION DATE",
        field: "deletion_date",
        flex: 1.2,
        minWidth: 220,
      },
    ];
  }

  // ✅ NORMAL COMPANIES COLUMNS
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
      headerName: "COMPANY CODE",
      field: "company_code",
      flex: 1,
      minWidth: 180,
    },
    {
      headerName: "COMPANY NAME",
      field: "company_name",
      flex: 1.5,
      minWidth: 260,
    },
    {
      headerName: "COMPANY SHORT NAME",
      field: "company_short_name",
      flex: 1.2,
      minWidth: 260,
    },
    {
      headerName: "FIN. YEAR(S)",
      field: "fin_year",
      flex: 1.2,
      minWidth: 240,
    },
  ];
}, [filter]);


  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: false, // global quick filter only
    }),
    []
  );

  const getRowId = useCallback(
    (params) => params.data?.__local_row_id,
    []
  );

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const url = `/companies?filter=${filter}&page=${page}&per_page=${perPage}`;
      const data = await apiFetch(url, { method: "GET" });

      const list = Array.isArray(data)
        ? data
        : data?.data || data?.companies || [];
        console.log("RECYCLE FIRST ROW ✅", list?.[0]);
        console.log("RECYCLE BIN OBJECT ✅", list?.[0]?.recycle_bin);


    const mapped = list.map((c, idx) => ({
      __local_row_id: `${page}-${perPage}-${c?.comp_id ?? c?.comp_code ?? idx}`,

      comp_id: c?.comp_id,   // ✅ IMPORTANT for edit
      comp_code: c?.comp_code,

      company_code: c?.comp_code || c?.company_code || c?.code || "-",
      company_name: c?.company_name || c?.name || "-",
      company_short_name:
        c?.comp_short_name || c?.company_short_name || c?.short_name || "-",
      fin_year: c?.finyear || c?.fin_year || "-",

      // ✅ only used in recycle bin
     deletion_date: c?.recycle_bin?.recycle_date || "-",


      email: c?.email,
      phone: c?.phone,
      status: c?.comp_status ?? c?.status,
    }));



      setRowData(mapped);

      const total =
        data?.total ??
        data?.meta?.total ??
        data?.pagination?.total ??
        mapped.length;
      setTotalCount(typeof total === "number" ? total : mapped.length);

      // eslint-disable-next-line no-console
      console.log("Companies API Response ✅", data);
    } catch (e) {
      setError(e?.message || "API Error");
      setRowData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [filter, page, perPage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const totalPages = Math.max(
    1,
    Math.ceil((totalCount || 0) / (perPage || 1)) || 1
  );
  const start = rowData.length === 0 ? 0 : (page - 1) * perPage + 1;
  const end = (page - 1) * perPage + rowData.length;

  const handleQuickFilter = (val) => {
    setQuickFilter(val);
    gridRef.current?.api?.setGridOption?.("quickFilterText", val);
    gridRef.current?.api?.setQuickFilter?.(val);
  };

  const onGridReady = () => {
    gridRef.current?.api?.setDomLayout?.("normal");
    gridRef.current?.api?.sizeColumnsToFit?.();
    if (quickFilter) handleQuickFilter(quickFilter);
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden font-sans "
      style={{ padding: "10px 8px 8px 8px" }}
    >
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3 px-1 pb-2">
        <span className="text-sm font-semibold text-gray-800">Filter:</span>
        <input
          value={quickFilter}
          onChange={(e) => handleQuickFilter(e.target.value)}
          placeholder="Enter your keyword"
          className="h-8 w-56 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
      
        {loading && <span className="text-sm text-gray-700">Loading...</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>

      {/* Grid */}
      <div
        className="ag-theme-alpine companies-grid"
        style={{
          width: "100%",
          height: "auto",
          "--ag-foreground-color": "#1f2937",
          "--ag-header-background-color": "#f3f4fb",
          "--ag-header-foreground-color": "#111827",
          "--ag-background-color": "#ffffff",
          "--ag-border-color": "#e5e7eb",
          "--ag-row-hover-color": "#f5f5f5",
          "--ag-font-size": "13px",
          "--ag-font-family":
            '"Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
            "--ag-selected-row-background-color": "rgb(var(--color-primary) / 0.12)",

        }}
      >
        <AgGridReact
          ref={gridRef}
          theme="legacy"                 // prevents Theming API + CSS conflict
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowId={getRowId}
          pagination={false}
          rowSelection="single"
          headerHeight={34}
          rowHeight={32}
          animateRows
          suppressDragLeaveHidesColumns
          suppressNoRowsOverlay
           domLayout="autoHeight"
          onGridReady={onGridReady}
          onSelectionChanged={() => {
          const selected = gridRef.current?.api?.getSelectedRows?.()?.[0] || null;

            if (selected?.comp_id) {
              localStorage.setItem("selected_company_id", String(selected.comp_id));
            } else {
              localStorage.removeItem("selected_company_id");
            }

            onSelectCompany?.(selected);
          }}
          onRowDoubleClicked={(params) => {
            const selected = params.data;
            if (!selected?.comp_id) return;

            localStorage.setItem("selected_company_id", String(selected.comp_id));
            navigate("/company/dashboard");
          }}

        />
      </div>

      {/* Bottom pagination bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-2 text-sm text-gray-800">
        <div className="flex items-center gap-2 text-[16px]">
          <button
            type="button"
            className="w-8 h-8 border border-gray-300 rounded bg-white disabled:opacity-50"
            onClick={() => setPage(1)}
            disabled={page <= 1}
            aria-label="First page"
          >
            «
          </button>
          <button
            type="button"
            className="w-8 h-8 border border-gray-300 rounded bg-white disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            ‹
          </button>

          <span>Page</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={page}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (!Number.isNaN(val) && val >= 1) {
                setPage(Math.min(val, totalPages));
              }
            }}
            className="w-12 h-8 px-2 text-center border border-gray-300 rounded"
          />
          <span>of {totalPages}</span>

          <button
            type="button"
            className="w-8 h-8 border border-gray-300 rounded bg-white disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            aria-label="Next page"
          >
            ›
          </button>
          <button
            type="button"
            className="w-8 h-8 border border-gray-300 rounded bg-white disabled:opacity-50"
            onClick={() => setPage(totalPages)}
            disabled={page >= totalPages}
            aria-label="Last page"
          >
            »
          </button>

          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="h-8 px-2 border border-gray-300 rounded"
          >
            {[5, 10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="text-[16px]">
          Displaying {start} to {end} of {totalCount} items.
        </div>
      </div>
    </div>
  );
}