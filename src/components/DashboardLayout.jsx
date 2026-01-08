import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* 🔝 DASHBOARD HEADER */}
      <DashboardHeader />

      {/* 🧱 BODY */}
      <div className="flex flex-1 min-h-0">

        {/* ⬅️ LEFT SIDEBAR (COMMON FOR ALL DASHBOARD PAGES) */}
        <aside className="w-[280px] bg-white border-r">
          <div className="h-full">
            {/* yaha later sidebar ka pura code jayega */}
            Sidebar
          </div>
        </aside>

        {/* 📄 PAGE CONTENT */}
        <main className="flex-1 overflow-auto bg-[#f6f7fb] p-6">
          <Outlet />
        </main>

      </div>

      {/* 🔽 DASHBOARD FOOTER */}
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
