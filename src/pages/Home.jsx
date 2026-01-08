import { NavLink, Outlet, useLocation } from "react-router-dom";

const Home = () => {
  const { pathname } = useLocation();

  const isAll = pathname.includes("/all");
  const isMy = pathname.includes("/my");
  const isShared = pathname.includes("/shared");
  const isAdd = pathname.includes("/add");

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

            <button className="btn px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow">
              Edit Company
            </button>

            <button className="btn px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow">
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
