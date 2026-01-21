import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { apiFetch } from "../services/apiFetch";
import { useEffect, useState } from "react";



const Home = () => {
  const { pathname } = useLocation();
  
  const isRecycle = pathname.includes("/recycle-bin");

  const isAll = pathname.includes("/all");
  const isMy = pathname.includes("/my");
  const isShared = pathname.includes("/shared");
  const isAdd = pathname.includes("/add");
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);

  const [showPermanentPopup, setShowPermanentPopup] = useState(false);
  const [permanentLoading, setPermanentLoading] = useState(false);



    useEffect(() => {
    localStorage.removeItem("selected_company_id");
  }, [pathname]);

  // const isDashboard = pathname.match(/\/company\/(all|my|shared)\/\w+/);

  const isDashboard = pathname.includes("/dashboard");

 // ✅  DELETE

  const handleConfirmDelete = async () => {
  const id = localStorage.getItem("selected_company_id");

  // ✅ 1)  check: company select 
  if (!id || id === "null" || id === "undefined" || id.trim() === "") {
    alert("Please select a company first!");
    setShowDeletePopup(false);
    return;
  }

  try {
    setDeleteLoading(true);

    // ✅ 3) API hit
    const res = await apiFetch(
      `https://erp.aicountly.com/api/companies/delete/${id}`,
      { method: "DELETE" }
    );

    console.log("DELETE RESPONSE ✅", res);

    // ✅ 4) Success handle
    if (res?.success == 1 || res?.success === "1") {
      alert("Company deleted successfully ✅");

      // selected id remove
      localStorage.removeItem("selected_company_id");

      // popup close
      setShowDeletePopup(false);

      // refresh grid
      window.location.reload();
    } else {
      alert(res?.message || "Delete failed ❌");
    }
  } catch (err) {
    console.error("DELETE ERROR ❌", err);
    alert(err?.message || "Delete failed ❌");
  } finally {
    setDeleteLoading(false);
  }
};

// ✅ RESTORE

const handleConfirmRestore = async () => {
  const id = localStorage.getItem("selected_company_id");

  if (!id || id === "null" || id === "undefined" || id.trim() === "") {
    alert("Please select a company first!");
    setShowRestorePopup(false);
    return;
  }

  try {
    setRestoreLoading(true);

    // ✅ RESTORE API 
      const res = await apiFetch(
     `https://erp.aicountly.com/api/companies/${id}/restore`,
      { method: "POST" }
    );


    console.log("RESTORE RESPONSE ✅", res);

    if (res?.success == 1 || res?.success === "1") {
      alert("Company restored successfully ✅");

      localStorage.removeItem("selected_company_id");
      setShowRestorePopup(false);

      window.location.reload();
    } else {
      alert(res?.message || "Restore failed ❌");
    }
  } catch (err) {
    console.error("RESTORE ERROR ❌", err);
    alert(err?.message || "Restore failed ❌");
  } finally {
    setRestoreLoading(false);
  }
};

 // ✅ PERMANENT DELETE

const handleConfirmPermanentDelete = async () => {
  const id = localStorage.getItem("selected_company_id");

  if (!id || id === "null" || id === "undefined" || id.trim() === "") {
    alert("Please select a company first!");
    setShowPermanentPopup(false);
    return;
  }

  try {
    setPermanentLoading(true);

    // ✅ PERMANENT DELETE API 
    const res = await apiFetch(
 `https://erp.aicountly.com/api/companies/${id}/destroy`,
  { method: "DELETE" }
);


    console.log("PERMANENT DELETE RESPONSE ✅", res);

    if (res?.success == 1 || res?.success === "1") {
      alert("Company deleted permanently ✅");

      localStorage.removeItem("selected_company_id");
      setShowPermanentPopup(false);

      window.location.reload();
    } else {
      alert(res?.message || "Permanent delete failed ❌");
    }
  } catch (err) {
    console.error("PERMANENT DELETE ERROR ❌", err);
    alert(err?.message || "Permanent delete failed ❌");
  } finally {
    setPermanentLoading(false);
  }
};



  return (
    <>
      {/* 🔹 TABS */}
      <div className="flex items-end gap-1 bg-primary px-8">
        <Tab to="/company/all" label="All Companies" />
        <Tab to="/company/my" label="My Company" />
        <Tab to="/company/shared" label="Shared With Me" />

      </div>

      {/* 🔹 ACTION BUTTONS (TAB BASED) */}
      <div className="px-10 py-4 flex gap-4 flex-wrap">
        {/* 🔹 ALL & MY COMPANY (SAME BUTTONS) */}
        {(isAll || isMy) && !isAdd && !isDashboard && (
          <>
            <NavLink
              to={`${pathname}/add`}
              className="btn px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow"
            >
              New Company
            </NavLink>

            <button className="btn px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow">
              Open Company
            </button>

            <button
                className="btn px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow"
                onClick={() => {
                  const id = localStorage.getItem("selected_company_id");
                  if (!id) {
                    alert("Please select a company first!");
                    return;
                  }
                  navigate(`/company/edit/${id}`);
                }}
              >
                Edit Company
              </button>


            <button
              className="btn px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow"
              onClick={async () => {
                const id = localStorage.getItem("selected_company_id");

                // ✅ 1) check: company select 
                if (!id || id === "null" || id === "undefined" || id.trim() === "") {
                  alert("Please select a company first!");
                  return;
                }

                // ✅ 2) Confirm popup (NEW)
                setShowDeletePopup(true);
              }}
            >
              Delete Company
            </button>


          </>
        )}

        {/* 🔹 SHARED WITH ME (DIFFERENT BUTTONS) */}
        {isShared && (
          <>
            <button className="btn px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow">
              Remove Access
            </button>

            <button className="btn px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow">
              Open Company
            </button>
          </>
        )}

        {isRecycle && (
            <>
              <button
                className="btn px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow"
                onClick={() => {
                  const id = localStorage.getItem("selected_company_id");
                  if (!id || id === "null" || id === "undefined" || id.trim() === "") {
                    alert("Please select a company first!");
                    return;
                  }
                  setShowRestorePopup(true);
                }}
              >
                Restore Company
              </button>

              <button
                className="btn px-6 py-2 text-tiny rounded-md bg-red-600 text-white font-bold shadow"
                onClick={() => {
                  const id = localStorage.getItem("selected_company_id");
                  if (!id || id === "null" || id === "undefined" || id.trim() === "") {
                    alert("Please select a company first!");
                    return;
                  }
                  setShowPermanentPopup(true);
                }}
              >
                Delete Permanently
              </button>
            </>
         )}


        <button
          className="btn px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow"
          onClick={() => navigate("/company/dashboard")}
        >
          Go Dashboard
        </button>

      </div>


      {/* 🔹 CONTENT */}
      <div className="px-10 pb-6">
        <Outlet />
      </div>

      <DeleteConfirmPopup
        open={showDeletePopup}
        loading={deleteLoading}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={handleConfirmDelete}
      />

      <RestoreConfirmPopup
        open={showRestorePopup}
        loading={restoreLoading}
        onClose={() => setShowRestorePopup(false)}
        onConfirm={handleConfirmRestore}
      />

      <PermanentDeletePopup
        open={showPermanentPopup}
        loading={permanentLoading}
        onClose={() => setShowPermanentPopup(false)}
        onConfirm={handleConfirmPermanentDelete}
      />


    </>
  );
};

const Tab = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-4 py-3 text-tiny font-extrabold rounded-t-md ${isActive ? "bg-[#1d528c] text-white" : "bg-white text-black"
      }`
    }
  >
    {label}
  </NavLink>
);

const DeleteConfirmPopup = ({ open, onClose, onConfirm, loading }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={loading ? undefined : onClose}
      />

      {/* Modal */}
      <div className="relative w-[560px] max-w-[92%] rounded-lg bg-white shadow-2xl">
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-red-300">
            <span className="text-5xl font-bold text-red-400">×</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-700">Are you sure?</h2>

          <p className="mt-3 text-gray-500">
            Company will be moved to recycle bin and can only be <br />
            restored with in 30 days
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              className="rounded-md bg-green-700 px-6 py-2 text-sm font-bold text-white shadow hover:bg-green-800 disabled:opacity-60"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete entire company!"}
            </button>

            <button
              className="rounded-md border border-red-500 px-6 py-2 text-sm font-bold text-red-500 shadow hover:bg-red-50 disabled:opacity-60"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RestoreConfirmPopup = ({ open, onClose, onConfirm, loading }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={loading ? undefined : onClose}
      />

      <div className="relative w-[560px] max-w-[92%] rounded-lg bg-white shadow-2xl">
        <div className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-green-300">
            <span className="text-5xl font-bold text-primary">✓</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-700">
            Restore Company?
          </h2>

          <p className="mt-3 text-gray-500">
            This company will be restored back to your company list.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              className="rounded-md bg-green-700 px-6 py-2 text-sm font-bold text-white shadow hover:bg-green-800 disabled:opacity-60"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? "Restoring..." : "Restore Company"}
            </button>

            <button
              className="rounded-md border border-red-500 px-6 py-2 text-sm font-bold text-red-500 shadow hover:bg-red-50 disabled:opacity-60"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PermanentDeletePopup = ({ open, onClose, onConfirm, loading }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={loading ? undefined : onClose}
      />

      <div className="relative w-[560px] max-w-[92%] rounded-lg bg-white shadow-2xl">
        <div className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-red-300">
            <span className="text-5xl font-bold text-red-400">×</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-700">
            Delete Permanently?
          </h2>

          <p className="mt-3 text-gray-500">
            This will permanently delete the company and cannot be undone.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              className="rounded-md bg-red-600 px-6 py-2 text-sm font-bold text-white shadow hover:bg-red-700 disabled:opacity-60"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Permanently"}
            </button>

            <button
              className="rounded-md border border-red-500 px-6 py-2 text-sm font-bold text-red-500 shadow hover:bg-red-50 disabled:opacity-60"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Home;
