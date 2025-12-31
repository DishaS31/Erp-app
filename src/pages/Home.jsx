import React, { useState } from "react";
import banner from "../assets/erp-banner.jpg";
import Footer from "../components/Footer";
const Home = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex min-h-fit bg-bg">
      {/* LEFT BANNER */}
      <aside className="w-[260px] border-r bg-white flex-shrink-0 h-[85vh]">
        <img
          src={banner}
          alt="ERP Banner"
          className="w-full h-full object-cover"
        />
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 p-6">
        {/* TABS */}
        <div className="flex border-b mb-6">
          {[
            { key: "all", label: "All Companies" },
            { key: "my", label: "My Company" },
            { key: "shared", label: "Shared With Me" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-sm font-semibold border-t-2 transition
                ${activeTab === tab.key
                  ? "border-primary text-primary bg-white"
                  : "border-transparent text-secondary hover:text-primary"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="bg-white rounded shadow-sm p-4">
          {activeTab === "all" && (
            <div>
              <h2 className="font-bold text-primary mb-2">
                All Companies
              </h2>
              <p className="text-secondary">
                Yahan sab companies ka data aayega.
              </p>
            </div>
          )}

          {activeTab === "my" && (
            <div>
              <h2 className="font-bold text-primary mb-2">
                My Company
              </h2>
              <p className="text-secondary">
                Yahan logged-in user ki company ka data aayega.
              </p>
            </div>
          )}

          {activeTab === "shared" && (
            <div>
              <h2 className="font-bold text-primary mb-2">
                Shared With Me
              </h2>
              <p className="text-secondary">
                Yahan shared companies ka data aayega.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
