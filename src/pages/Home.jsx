import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { apiFetch } from "../services/apiFetch";
import { useEffect } from "react";



const Home = () => {
  const { pathname } = useLocation();

  const isAll = pathname.includes("/all");
  const isMy = pathname.includes("/my");
  const isShared = pathname.includes("/shared");
  const isAdd = pathname.includes("/add");
  const navigate = useNavigate();

    useEffect(() => {
    localStorage.removeItem("selected_company_id");
  }, [pathname]);

  // const isDashboard = pathname.match(/\/company\/(all|my|shared)\/\w+/);

  const isDashboard = pathname.includes("/dashboard");

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

            // ✅ 1)  check: company select 
            if (!id || id === "null" || id === "undefined" || id.trim() === "") {
              alert("Please select a company first!");
              return;
            }

            // ✅ 2) Confirm popup
            const ok = window.confirm("Are you sure you want to delete this company?");
            if (!ok) return;

            try {
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

                // refresh grid
                window.location.reload();
              } else {
                alert(res?.message || "Delete failed ❌");
              }
            } catch (err) {
              console.error("DELETE ERROR ❌", err);
              alert(err?.message || "Delete failed ❌");
            }
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
      </div>


      {/* 🔹 CONTENT */}
      <div className="px-10 pb-6">
        <Outlet />
      </div>
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

export default Home;
