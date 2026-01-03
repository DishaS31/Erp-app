import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import banner from "../assets/asideimage.jpeg";

const Layout = () => {
  return (
    <>
      {/* HEADER FIXED */}
      <Header />

      {/* PAGE AREA */}
      <div className="flex bg-bg h-[calc(100vh-64px)]">
        
        {/* ASIDE FIXED HEIGHT */}
        <aside className="w-[253px] border-r bg-white flex-shrink-0 h-full">
          <img
            src={banner}
            alt="ERP Banner"
            className="w-full h-full"
          />
        </aside>

        {/* MAIN — ONLY THIS SCROLLS */}
        <main className="flex-1 h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* FOOTER FIXED */}
      <Footer />
    </>
  );
};

export default Layout;
