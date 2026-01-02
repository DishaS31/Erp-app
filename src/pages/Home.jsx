import React, { useState } from "react";
import { Link } from "react-router-dom";
import banner from "../assets/asideimage.jpeg";
const Home = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex min-h-fit bg-bg">
      {/* LEFT BANNER */}
      <aside className="w-[253px] border-r bg-white flex-shrink-0 h-[84vh]">
        <img
          src={banner}
          alt="ERP Banner"
          className="w-full h-full  no-repeat bg-contain"
        />
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1">
        {/* TABS */}
    <div className="flex items-end gap-1 bg-primary px-8">

      {[
        { key: "all", label: "All Companies" },
        { key: "my", label: "My Company" },
        { key: "shared", label: "Shared With Me" },
      ].map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-[16px] py-[14px] text-tiny font-extrabold transition rounded-t-[0.3rem]
            ${
              activeTab === tab.key
                ? "bg-[#1d528c] text-white shadow"
                : "bg-white text-black shadow-sm hover:bg-gray-100"
            }`}
    >
      {tab.label}
    </button>
  ))}

</div>


        {/* TAB CONTENT */}
       <div className="rounded p-4 px-10">

      <div className="flex gap-4 flex-wrap">

        <Link to="/company/new">
          <button className="px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow hover:opacity-90">
            New Company
          </button>
        </Link>

        <Link to="/company/open">
          <button className="px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow hover:opacity-90">
            Open Company
          </button>
        </Link>

        <Link to="/company/edit">
          <button className="px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow hover:opacity-90">
            Edit Company
          </button>
        </Link>

        <Link to="/company/delete">
          <button className="px-6 py-2 text-tiny rounded-md bg-primary text-white font-bold shadow hover:opacity-90">
            Delete Company
          </button>
       </Link>

  </div>

        </div>


      </main>
    </div>
  );
};

export default Home;
