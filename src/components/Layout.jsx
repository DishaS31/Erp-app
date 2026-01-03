import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import banner from "../assets/asideimage.jpeg";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="flex bg-bg">
        {/* ASIDE - COMMON */}
        <aside className="w-[253px] border-r bg-white flex-shrink-0">
          <img
            src={banner}
            alt="ERP Banner"
            className="w-full h-full object-contain bg-cover bg-center bg-no-repeat"
          />
        </aside>

        {/* PAGE CONTENT */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
