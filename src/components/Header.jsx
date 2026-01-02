import React from 'react'
import { Link } from "react-router";

import logo from "../assets/logo.png"
import homeIcon from "../assets/home.png";
import userAvatar from "../assets/user.jpg";
import { setTheme } from "../utils/theme";
import { useState } from "react";

const Header = () => {

  const themes = [
    { key: "red", color: "#dd0026" },
    { key: "orange", color: "#ec7b2d" },
    { key: "sky_blue", color: "#2fa1da" },
    { key: "purple", color: "#d97cf8" },
    { key: "yellow", color: "#d3b000" },
    { key: "lime", color: "#a2c42e" },
    { key: "teal", color: "#5bbbb1" },
    { key: "blue", color: "#3874ff" },

  ];

  const navItems = [
    {
      iconType: "image",
      icon: homeIcon,
      type: "internal",
      path: "/",
    },
    {
      label: "Company",
      type: "internal",
      children: [
        { label: "Company Access", path: "/company/access" },
        { label: "Recycle Bin", path: "/company/recycle-bin" },
      ],
    },
    {
      label: "Manage Users",
      type: "external",
      path: "https://winixindia.in/",
    },
    {
      label: "Contacts",
      type: "external",
      path: "https://tailwindcss.com/",
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
    <header className="w-full bg-white  border border-[#cbd0dd] shadow-sm px-6">
      <div className="flex items-center justify-between h-16 px-2">

        {/* LEFT - LOGO */}
        <div className="flex items-center">
          <img src={logo} alt="Aicountly" className="h-16" />
        </div>

        {/* CENTER - NAV ITEMS */}
        <nav className="flex items-center gap-2 text-tiny font-bold text-secondary">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative group flex items-center gap-2"
            >
              {/* HOME ICON (internal) */}
              {item.iconType === "image" && item.type === "internal" && (
                <Link to={item.path}>
                  <img src={item.icon} alt="Home" className="cursor-pointer" />
                </Link>
              )}

              {/* LABEL */}
              {item.label && !item.children && (
                item.type === "internal" ? (
                  <Link
                    to={item.path}
                    className="hover:bg-primary hover:text-white py-1 px-2 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-primary hover:text-white py-1 px-2 transition-all duration-200"
                  >
                    {item.label}
                  </a>
                )
              )}

              {/* 🔽 COMPANY DROPDOWN (INTERNAL ROUTES ONLY) */}
              {item.children && (
                <>
                  <span className="hover:bg-primary hover:text-white py-1 px-2 transition-all duration-200 cursor-pointer">
                    {item.label}
                  </span>

                  <div
                    className="absolute top-full left-0 mt-2 w-44 bg-white rounded-md shadow-md
                     opacity-0 invisible group-hover:opacity-100 group-hover:visible
                     transition-all duration-200 z-50 py-2 border border-[#cbd0dd]"
                  >
                    {item.children.map((child, i) => (
                      <Link
                        key={i}
                        to={child.path}
                        className="block px-4 py-2 text-secondary hover:underline hover:text-secondary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>


        {/* RIGHT - ACTIONS */}
        <div className="flex items-center gap-4 text-secondary">

          {/* Business ID */}
          <div className="relative flex items-center gap-1 text-tiny font-bold cursor-pointer" onClick={() => setActivePanel(activePanel === "business" ? null : "business")}>
            <span className='italic'>Business ID: N/A</span>
            <span className="material-symbols-outlined ">
              expand_more
            </span>

            {/* BUSINESS PANEL — RIGHT SIDE DRAWER */}

          </div>

          {/* Action Buttons (Material Symbols) */}
          {actionBtns.map((btn, index) => (
            <span
              key={index}
              className="material-symbols-outlined cursor-pointer transition"
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
          <div className="fixed right-0 top-16 w-96 h-[calc(100vh-64px)] bg-white border-l shadow-lg z-40 border-[#cbd0dd]">
            <div className="p-5 overflow-y-auto h-full">

              {/* BUSINESS PANEL */}
              {activePanel === "business" && (
                <>
                  <div className="font-extrabold text-tiny mb-4 text-black">
                    My Business ID: N/A
                  </div>

                  <button className="w-full border border-primary text-primary rounded-md py-2 text-tiny font-bold hover:bg-primary hover:text-white transition">
                    Manage Business Account
                  </button>

                  <div className="mt-3">
                    <a
                      href="#"
                      className="block text-tiny text-blue-600 text-center hover:underline font-semibold"
                    >
                      View All Licence
                    </a>
                  </div>
                </>
              )}

              {/* RESET PANEL */}
              {activePanel === "reset" && (
                <>
                  <div className="font-extrabold text-tiny mb-2 text-black">
                    Recent Activities
                  </div>

                  <input
                    type="text"
                    placeholder="Search Settings"
                    className="w-full border rounded-md px-3 py-2 text-tiny font-semibold outline-none border-[#cbd0dd]"
                  />
                </>
              )}

              {/* SETTINGS PANEL */}
              {activePanel === "settings_suggest" && (
                <>
                  {/* HEADER */}


                  {/* ================= THEME COLOR ================= */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-tiny font-bold text-black">
                        Theme Color
                      </span>
                      <span
                        className="text-tiny text-secondary underline cursor-pointer font-extrabold"
                        onClick={() => setTheme("default")}
                      >
                        Default
                      </span>

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
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-tiny font-bold text-black">
                        Font Family
                      </span>

                      <select
                        onChange={(e) => setFontFamily(e.target.value)}
                        className="border rounded-md px-3 py-2 text-tiny font-semibold outline-none border-[#cbd0dd] w-40"
                        defaultValue={localStorage.getItem("font") || "Nunito, sans-serif"}
                      >
                        <option value="Nunito, sans-serif">Nunito</option>
                        <option value="Noto Sans, sans-serif">Noto Sans</option>
                        <option value="Poppins, sans-serif">Poppins</option>
                      </select>
                    </div>
                  </div>

                  {/* ================= FONT SIZE ================= */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-tiny font-bold text-black">
                        Font Size
                      </span>

                      <div className="inline-flex border rounded overflow-hidden">
                        <button
                          onClick={() =>
                            document.documentElement.style.setProperty("--font-base", "12.8px")
                          }
                          className="px-4 py-2 bg-primary text-white text-tiny font-bold"
                        >
                          A
                        </button>

                        <button
                          onClick={() =>
                            document.documentElement.style.setProperty("--font-base", "14px")
                          }
                          className="px-4 py-2 border-l text-primary font-bold"
                        >
                          A+
                        </button>

                        <button
                          onClick={() =>
                            document.documentElement.style.setProperty("--font-base", "15.5px")
                          }
                          className="px-4 py-2 border-l text-primary font-bold"
                        >
                          A+
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ================= NOTIFICATION ================= */}
                  <div className="mb-6 border-t pt-4">
                    <div className="text-tiny font-bold text-black mb-3">
                      Notification
                    </div>

                    {[
                      "Missed Activity Email",
                      "Show Preview Message",
                      "Desktop Notification",
                      "Sound Notification",
                    ].map((label, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 mb-3 cursor-pointer select-none"
                      >
                        {/* real input (hidden) */}
                        <input
                          type="checkbox"
                          className="hidden peer"
                        />

                        {/* switch */}
                        <div className="w-9 h-5 rounded-full bg-gray-300 peer-checked:bg-primary relative transition">
                          <div className="w-4 h-4 bg-white rounded-full absolute top-[2px] left-[2px] transition peer-checked:translate-x-4"></div>
                        </div>

                        {/* label text */}
                        <span className="text-secondary text-tiny">{label}</span>
                      </label>
                    ))}

                  </div>


                  {/* ================= DISPLAY & SOUND ================= */}
                  <div className="mb-6 border-t pt-4">
                    <div className="text-tiny font-bold text-black mb-3">
                      Display & Sound
                    </div>

                    {/* Notification Sound */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-secondary text-tiny">Notification Sound</span>
                      <select className="border rounded-md px-3 py-2 text-tiny w-40">
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    </div>

                    {/* Audio Device */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-secondary text-tiny">Audio Device</span>
                      <select className="border rounded-md px-3 py-2 text-tiny w-40">
                        <option>Size 25</option>
                        <option>Size 30</option>
                      </select>
                    </div>

                    {/* Speaker */}
                    <div className="flex items-center justify-between">
                      <span className="text-secondary text-tiny">Speaker</span>
                      <select className="border rounded-md px-3 py-2 text-tiny w-40">
                        <option>Size 25</option>
                        <option>Size 30</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="w-full border rounded-md py-2 text-primary font-bold hover:bg-primary hover:text-white transition text-tiny">
                      View All
                    </button>
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
