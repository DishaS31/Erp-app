import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";

const DashboardLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-[#f4f6f9]">

      {/* DASHBOARD HEADER */}
      <DashboardHeader />

      <div className="flex flex-1 overflow-hidden">

        {/* DASHBOARD ASIDE */}
        <aside className="w-64 bg-white border-r">
          Dashboard Sidebar
        </aside>

        {/* DASHBOARD MAIN */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

      {/* DASHBOARD FOOTER */}
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
