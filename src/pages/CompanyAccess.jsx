import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CompanyAccess() {
  const gridRef = useRef(null);

  // grid states
  const [rowData, setRowData] = useState([]);
  const [quickFilter, setQuickFilter] = useState("");

  // modal + drawer
  const [openModal, setOpenModal] = useState(false);

  // Drawer smooth open/close
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);

  // drawer dropdowns
  const [roleDropdownIndex, setRoleDropdownIndex] = useState(null); // Auditor ▼
  const [manageDropdownIndex, setManageDropdownIndex] = useState(null); // Manage ▼

  const modalRef = useRef(null);
  const drawerRef = useRef(null);

  // dummy data
  useEffect(() => {
    setRowData([
      { id: 1, company_name: "Renu Gupta", company_code: "AIC0000003" },
      { id: 2, company_name: "Remedial Lifesciences", company_code: "AIC0000011" },
      { id: 3, company_name: "Rahul B Gupta & Co.", company_code: "AIC0000012" },
      { id: 4, company_name: "New Company SS", company_code: "AIC0000004" },
      { id: 5, company_name: "BK PANDA", company_code: "AIC0000010" },
      { id: 6, company_name: "Bhupinder Company Demo", company_code: "AIC0000002" },
      { id: 7, company_name: "ABC", company_code: "AIC0000116" },
      { id: 8, company_name: "ABC", company_code: "AIC0000114" },
    ]);
  }, []);

  // Smooth drawer close handler
  const closeDrawerSmooth = useCallback(() => {
    if (!openDrawer) return;
    if (drawerClosing) return;

    setDrawerClosing(true);

    // animation time must match CSS (0.25s)
    setTimeout(() => {
      setOpenDrawer(false);
      setDrawerClosing(false);
      setRoleDropdownIndex(null);
      setManageDropdownIndex(null);
    }, 250);
  }, [openDrawer, drawerClosing]);

  // outside click close (modal + dropdowns)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // modal close
      if (openModal && modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenModal(false);
      }

      // dropdown close
      if (roleDropdownIndex !== null) setRoleDropdownIndex(null);
      if (manageDropdownIndex !== null) setManageDropdownIndex(null);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openModal, roleDropdownIndex, manageDropdownIndex]);

  // ESC close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenModal(false);
        closeDrawerSmooth();
        setRoleDropdownIndex(null);
        setManageDropdownIndex(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeDrawerSmooth]);

  const defaultColDef = useMemo(
    () => ({
      sortable: false,
      resizable: true,
      filter: false,
    }),
    []
  );

  const columnDefs = useMemo(() => {
    return [
      {
        headerName: "",
        width: 40,
        pinned: "left",
        valueGetter: (params) => params.node.rowIndex + 1,
        sortable: false,
        filter: false,
        resizable: false,
      },
      {
        headerName: "COMPANY NAME",
        field: "company_name",
        flex: 1.6,
        minWidth: 280,
      },
      {
        headerName: "COMPANY CODE",
        field: "company_code",
        flex: 1,
        minWidth: 220,
      },
      {
        headerName: "MANAGE",
        field: "manage",
        width: 200,
        sortable: false,
        filter: false,
        cellRenderer: () => {
          return (
            <div className="flex items-center gap-4 text-gray-600">
              {/* LEFT ICON = MODAL */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(true);
                }}
                className="hover:text-black"
                title="Open Modal"
              >
                <span class="material-symbols-outlined font-extrabold">
                    add_task
                </span>
              </button>

              {/* RIGHT ICON = DRAWER */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDrawer(true);
                  setDrawerClosing(false);
                }}
                className="hover:text-black"
                title="Open Drawer"
              >
                <span className="material-symbols-outlined font-extrabold">
                  manage_accounts
                </span>
              </button>
            </div>
          );
        },
      },
    ];
  }, []);

  const handleQuickFilter = (val) => {
    setQuickFilter(val);
    gridRef.current?.api?.setGridOption?.("quickFilterText", val);
    gridRef.current?.api?.setQuickFilter?.(val);
  };

  const onGridReady = useCallback(() => {
    gridRef.current?.api?.setDomLayout?.("normal");
    gridRef.current?.api?.sizeColumnsToFit?.();
    if (quickFilter) handleQuickFilter(quickFilter);
  }, [quickFilter]);

  return (
    <div className="p-0">
      <h1 className="text-2xl font-extrabold text-black mb-4">Company Access</h1>

      {/* Grid Container */}
      <div
        className="bg-white border border-gray-200 shadow-sm overflow-hidden font-sans"
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
        </div>

        {/* AG GRID */}
        <div
          className="ag-theme-alpine"
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
            onGridReady={onGridReady}
          />
        </div>

        {/* Bottom pagination (UI only) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-2 text-sm text-gray-800">
          <div className="flex items-center gap-2 text-[16px]">
            <button
              type="button"
              className="w-8 h-8 border border-gray-300 rounded bg-white opacity-40"
            >
              «
            </button>
            <button
              type="button"
              className="w-8 h-8 border border-gray-300 rounded bg-white opacity-40"
            >
              ‹
            </button>

            <span>Page</span>
            <input
              type="number"
              value={1}
              readOnly
              className="w-12 h-8 px-2 text-center border border-gray-300 rounded"
            />
            <span>of 1</span>

            <button
              type="button"
              className="w-8 h-8 border border-gray-300 rounded bg-white opacity-40"
            >
              ›
            </button>
            <button
              type="button"
              className="w-8 h-8 border border-gray-300 rounded bg-white opacity-40"
            >
              »
            </button>

            <span className="ml-3">Records per page:</span>
            <select className="h-8 px-2 border border-gray-300 rounded">
              <option>10</option>
            </select>
          </div>

          <div className="text-[16px]">
            Displaying 1 to {rowData.length} of {rowData.length} items.
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {openModal && (
        <div
          className="fixed inset-0 z-[999] flex items-start justify-center bg-black/40
          animate-[overlayFade_0.18s_ease-out]"
        >
          <div
            ref={modalRef}
            className="mt-20 w-[500px] bg-white rounded-md shadow-lg overflow-hidden
            animate-[modalDrop_0.22s_ease-out] "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-xl font-bold text-[#3e465b]">Company Access</h2>
              <button
                onClick={() => setOpenModal(false)}
                className="text-gray-500 hover:text-black text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <div className="bg-[#f3f4fb] px-4 py-2 font-bold text-black rounded-sm">
                Search
              </div>

              <div className="flex items-center border border-gray-300 mt-2 rounded-md">
                <input
                  placeholder="Enter Email/ Mobile/ Contact Group"
                  className="flex-1 px-4 py-2 outline-none text-[14px] "
                />
                <button className="bg-primary text-white px-6 py-2 font-bold rounded-tr-md rounded-br-md">
                  Go
                </button>
              </div>

              <div className="bg-[#f3f4fb] px-4 py-2 font-bold text-black mt-4">
                Share with People
              </div>

              {/* <div className="mt-3">
                <button className="border border-gray-300 px-4 py-2 rounded-sm text-[14px] font-semibold">
                  Choose Profile ▼
                </button>

                <p className="text-[13px] text-gray-500 mt-2">
                  Only people with this access can open file
                </p>
              </div> */}

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setOpenModal(false)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold text-tiny"
                >
                  DONE
                </button>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes overlayFade {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes modalDrop {
              from { opacity: 0; transform: translateY(-22px); }
              to   { opacity: 1; transform: translateY(0px); }
            }
          `}</style>
        </div>
      )}

      {/* ================= DRAWER ================= */}
      {openDrawer && (
        <div
          className={`fixed left-0 right-0 top-16 h-[calc(100vh-64px)] z-[999]
          bg-black/30 ${drawerClosing ? "animate-[overlayOut_0.25s_ease-out]" : "animate-[overlayFade_0.18s_ease-out]"}`}
          onClick={closeDrawerSmooth}
        >
          <div
            ref={drawerRef}
            className={`fixed right-0 top-16 h-[calc(100vh-64px)] w-[450px] bg-white shadow-2xl border-t border-[#cbd0dd]
            ${drawerClosing ? "animate-[drawerOut_0.25s_ease-in]" : "animate-[drawerSlide_0.25s_ease-out]"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="text-base font-bold text-black">Manage Access</h2>
              <button
                onClick={closeDrawerSmooth}
                className="text-gray-500 hover:text-black text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto h-[calc(100%-72px)]">
              <div className="border rounded-md overflow-visible bg-white">
                {[
                  { name: "rahulg1961@gmail.com", role: "Auditor", initials: "" },
                  { name: "Bhupinder Singh Mahey", role: "Auditor", initials: "BM" },
                  { name: "KARAN SHARMA", role: "Auditor", initials: "KS" },
                  { name: "Bhupinder Singh Mahey(Owner)", role: "Auditor", initials: "BM" },
                ].map((u, i) => (
                  <div
                    key={i}
                    className="relative flex  justify-between px-4 py-4 border-b last:border-b-0 items-start"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                        {u.initials || "●"}
                      </div>

                      <div>
                        <div className="text-[15px] text-gray-700 font-semibold">
                          {u.name}
                        </div>

                        {/* Role dropdown */}
                        <div className="relative inline-block mt-0.5">
                          <button
                            type="button"
                            className="text-[16px] font-bold text-black  underline-offset-4 flex items-center gap-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRoleDropdownIndex((prev) => (prev === i ? null : i));
                              setManageDropdownIndex(null);
                            }}
                          >
                            {u.role}
                            <span className="text-[12px] text-gray-700">▼</span>
                          </button>

                          {roleDropdownIndex === i && (
                            <div
                              className="absolute left-0 top-7 w-[180px] bg-white border border-gray-200 shadow-md rounded-md z-50 overflow-hidden"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                className="w-full text-left px-4 py-3 text-[14px] hover:bg-gray-50"
                                onClick={() => setRoleDropdownIndex(null)}
                              >
                                Auditor
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Manage dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        className="text-gray-600 font-semibold  underline-offset-4 flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setManageDropdownIndex((prev) => (prev === i ? null : i));
                          setRoleDropdownIndex(null);
                        }}
                      >
                        Manage <span className="text-[12px]">▼</span>
                      </button>

                      {manageDropdownIndex === i && (
                        <div
                          className="absolute right-0 top-7 w-[170px] bg-white border border-gray-200 shadow-md rounded-md z-50 overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="w-full text-left px-4 py-3 text-[14px] hover:bg-gray-50 text-gray-700"
                            onClick={() => {
                              setManageDropdownIndex(null);
                              alert("Remove clicked");
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-6 border border-primary text-primary px-8 py-2 rounded-md font-bold text-tiny">
                Settings
              </button>
            </div>
          </div>

          <style>{`
            @keyframes drawerSlide {
              from { transform: translateX(100%); }
              to   { transform: translateX(0%); }
            }
            @keyframes drawerOut {
              from { transform: translateX(0%); }
              to   { transform: translateX(100%); }
            }
            @keyframes overlayOut {
              from { opacity: 1; }
              to   { opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
