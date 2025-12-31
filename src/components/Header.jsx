import React from 'react'
import { Link } from "react-router";

import logo from "../assets/logo.png"
import homeIcon from "../assets/home.png";
import userAvatar from "../assets/user.jpg";
import { setTheme } from "../utils/theme";
import { useState } from "react";

const Header = () => {

  const themes = [
    { key: "red", color: "#DC2626" },
    { key: "orange", color: "#EA580C" },
    { key: "blue", color: "#2563EB" },
    { key: "purple", color: "#A855F7" },
    { key: "yellow", color: "#CA8A04" },
    { key: "lime", color: "#65A30D" },
    { key: "teal", color: "#14B8A6" },
    { key: "default", color: "#25B003" },
  ];

  const navItems = [
    {
      iconType: "image",
      icon: homeIcon,
      path: "",
    },
    {
      label: "Company",
      path: "",
      children: [
        { label: "Company Access", path: "" },
        { label: "Recycle Bin", path: "" },
      ],
    },
    {
      label: "Manage Users",
      path: "",
    },
    {
      label: "Contacts",
      path: "",
    },
  ];

  const actionBtns = [
    { icon: "device_reset", panel: "reset" },
    { icon: "settings_suggest", panel: "settings_suggest" },
    { icon: "question_exchange", panel: "business" },
  ];


  const [activePanel, setActivePanel] = useState(null);
  // null | "business" | "reset"

  return (
    <header className="w-full bg-white  shadow-sm px-4">
      <div className="flex items-center justify-between h-16 px-6">

        {/* LEFT - LOGO */}
        <div className="flex items-center">
          <img src={logo} alt="Aicountly" className="h-16" />
        </div>

        {/* LEFT BG PANEL */}
        {/* <div
          className="fixed left-0 top-16 w-63.25 h-[calc(100vh-64px)] bg-[#003f85] border-r z-30 align-middle"
        >
          <div
            className="w-[95%] h-full overflow-hidden align-middle m-auto"
            style={{
              backgroundImage: `url(${banner}`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
            }}
          ></div>
        </div> */}



        {/* CENTER - NAV ITEMS */}
        <nav className="flex items-center gap-4 text-[12.8px] font-bold text-secondary">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative group flex items-center gap-2 cursor-pointer"
            >
              {/* Home Icon */}
              {item.iconType === "image" && (
                <img src={item.icon} alt="Home" />
              )}

              {/* Label */}
              {item.label && (
                <span className="hover:bg-primary hover:text-white py-1 px-2 transition-all duration-200">
                  {item.label}
                </span>
              )}

              {/* 🔽 Company Dropdown */}
              {item.children && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white  rounded-md shadow-md 
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-200 z-50 py-2 border-[#cbd0dd] border">
                  {item.children.map((child, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 text-secondary hover:underline hover:text-primary cursor-pointer"
                    >
                      {child.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>


        {/* RIGHT - ACTIONS */}
        <div className="flex items-center gap-4 text-secondary">

          {/* Business ID */}
          <div className="relative flex items-center gap-1 text-[12.8px] font-bold cursor-pointer" onClick={() => setActivePanel(activePanel === "business" ? null : "business")}>
            <span className='italic'>Business ID: N/A</span>
            <span className="material-symbols-outlined text-base">
              expand_more
            </span>

            {/* BUSINESS PANEL — RIGHT SIDE DRAWER */}

          </div>

          {/* Action Buttons (Material Symbols) */}
          {actionBtns.map((btn, index) => (
            <span
              key={index}
              className="material-symbols-outlined cursor-pointer text-[20px] hover:text-primary transition"
              onClick={() =>
                setActivePanel(activePanel === btn.panel ? null : btn.panel)
              }
            >
              {btn.icon}
            </span>
          ))}


          {/* User Profile Image */}
          <img
            src={userAvatar}
            alt="User"
            className="h-10 w-10 rounded-full cursor-pointer "
          />
        </div>

        {activePanel && (
          <div className="fixed right-0 top-16 w-80 h-[calc(100vh-64px)] bg-white border-l shadow-lg z-40 border-[#cbd0dd]">
            <div className="p-5">

              {/* BUSINESS PANEL */}
              {activePanel === "business" && (
                <>
                  <div className="font-extrabold text-[12.8px] mb-4 text-black">
                    My Business ID: N/A
                  </div>

                  <button className="w-full border border-primary text-primary rounded-md py-2 text-[12.8px] font-bold hover:bg-primary hover:text-white transition">
                    Manage Business Account
                  </button>

                  <div className="mt-3">
                    <a
                      href="#"
                      className="block text-[12.8px] text-blue-600 text-center hover:underline font-semibold"
                    >
                      View All Licence
                    </a>
                  </div>
                </>
              )}

              {/* RESET PANEL */}
              {activePanel === "reset" && (
                <>
                  <div className="font-extrabold text-[12.8px] mb-2 text-black">
                    Recent Activities
                  </div>

                  <input
                    type="text"
                    placeholder="Search Settings"
                    className="w-full border rounded-md px-3 py-2 text-[12.8px] font-semibold outline-none border-[#cbd0dd]"
                  />
                </>
              )}

              {/* SETTINGS PANEL */}
              {activePanel === "settings_suggest" && (
                <>
                  {/* HEADER */}
                  <div className="font-extrabold text-[12.8px] mb-4 text-black">
                    Settings
                  </div>

                  {/* ================= THEME COLOR ================= */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12.8px] font-bold text-black">
                        Theme Color
                      </span>
                      <span className="text-[12px] text-secondary">Default</span>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {themes.map((t) => (
                        <button
                          key={t.key}
                          onClick={() => setTheme(t.key)}
                          className="h-8 rounded border border-[#cbd0dd]"
                          style={{ backgroundColor: t.color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* ================= FONT FAMILY ================= */}
                  <div className="mb-6">
                    <div className="text-[12.8px] font-bold text-black mb-2">
                      Font Family
                    </div>
                    <select
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-[12.8px] font-semibold outline-none border-[#cbd0dd]"
                      defaultValue={localStorage.getItem("font") || "Nunito, sans-serif"}
                    >
                      <option value="Nunito, sans-serif">Nunito</option>
                      <option value="Noto Sans, sans-serif">Noto Sans</option>
                      <option value="Poppins, sans-serif">Poppins</option>
                    </select>

                  </div>

                  {/* ================= FONT SIZE ================= */}
                  <div className="mb-6">
                    <div className="text-[12.8px] font-bold text-black mb-2">
                      Font Size
                    </div>

                    <div className="inline-flex border rounded overflow-hidden">
                      <button
                        onClick={() =>
                          document.documentElement.style.setProperty(
                            "--font-base",
                            "12.8px"
                          )
                        }
                        className="px-4 py-2 bg-primary text-white text-[12.8px] font-bold"
                      >
                        A
                      </button>

                      <button
                        onClick={() =>
                          document.documentElement.style.setProperty(
                            "--font-base",
                            "14px"
                          )
                        }
                        className="px-4 py-2 border-l text-primary font-bold"
                      >
                        A+
                      </button>

                      <button
                        onClick={() =>
                          document.documentElement.style.setProperty(
                            "--font-base",
                            "15.5px"
                          )
                        }
                        className="px-4 py-2 border-l text-primary font-bold"
                      >
                        A+
                      </button>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        )}

      </div>
    </header>
  );
}

export default Header
