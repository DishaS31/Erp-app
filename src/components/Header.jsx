import React from 'react'
import { Link } from "react-router";

import logo from "../assets/logo.png"
import homeIcon from "../assets/home.png";
import userAvatar from "../assets/user.jpg";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import icon5 from "../assets/icon5.png";
import icon6 from "../assets/icon6.png";
import icon7 from "../assets/e-sahayak-slogo.png";
import { setTheme } from "../utils/theme";
import { useEffect, useState } from "react";
import { apiFetch } from "../services/apiFetch";
import { clearSession } from "../services/sessionStore";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";




const Header = () => {

  const [businessId, setBusinessId] = useState(null);
  const [activePanel, setActivePanel] = useState(null);
  const [activities, setActivities] = useState([]);
  const [actLoading, setActLoading] = useState(false);
  const [actError, setActError] = useState("");
  const [actSearch, setActSearch] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [companies, setCompanies] = useState([]);
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [companiesError, setCompaniesError] = useState("");
  const [companySearch, setCompanySearch] = useState("");


 const navigate = useNavigate();
 const { pathname } = useLocation();

  

  useEffect(() => {
  async function loadBusinessId() {
    try {
      const data = await apiFetch(
        "https://erp.aicountly.com/api/businessid"
      );

    
     setBusinessId(data.data);


    } catch (error) {
      console.error("Business ID API failed ❌", error);
    }
  }

  loadBusinessId();
}, []);


const loadActivities = async () => {
  try {
    setActLoading(true);
    setActError("");

    const cmpId = 3; // abhi fixed (baad me dynamic karna)
    const url = `https://erp.aicountly.com/api/companies/activities?cmp_id=${cmpId}&page=1&per_page=5`;

    const data = await apiFetch(url, { method: "GET" });

    const list = data?.data || [];

  const mapped = list.map((x) => ({
  text: x?.erp_activity_log || "Activity",
  date: x?.erp_activity_date_time || "",
}));

    setActivities(mapped);

    console.log("Activities API ✅", data);
  } catch (e) {
    setActError(e?.message || "Activities API Error");
    setActivities([]);
  } finally {
    setActLoading(false);
  }
};

const loadUserProfile = async () => {
  try {
    setProfileLoading(true);
    setProfileError("");

    const data = await apiFetch("https://erp.aicountly.com/api/userprofile");

  
   const profile = data?.data ?? null;
    setUserProfile(profile);
    


    console.log("User Profile API ✅", data);
  } catch (e) {
    setProfileError(e?.message || "User Profile API Error");
    setUserProfile(null);
  } finally {
    setProfileLoading(false);
  }
  
};

const loadCompanies = async () => {
  try {
    setCompaniesLoading(true);
    setCompaniesError("");

    const url = `https://erp.aicountly.com/api/companies?filter=all&page=1&per_page=50`;
    const data = await apiFetch(url, { method: "GET" });

    const list = Array.isArray(data)
      ? data
      : data?.data || data?.companies || [];

    const mapped = list.map((c, idx) => ({
      id: c?.comp_id ?? c?.comp_code ?? idx,
      company_name: c?.company_name || c?.name || "-",
      company_code: c?.comp_code || c?.company_code || c?.code || "-",
    }));

    setCompanies(mapped);
    console.log("Companies for Profile Panel ✅", data);
  } catch (e) {
    setCompaniesError(e?.message || "Companies API Error");
    setCompanies([]);
  } finally {
    setCompaniesLoading(false);
  }
};



useEffect(() => {
  if (activePanel === "reset") {
    loadActivities();
  }

  if (activePanel === "profile") {
    loadUserProfile();
    loadCompanies(); 
  }
}, [activePanel]);



const handleLogout = async () => {
  try {
    // 1) Logout API call
    const res = await apiFetch("https://erp.aicountly.com/api/logout", {
      method: "POST",
    });

    console.log("Logout API Response ✅", res);
  } catch (err) {
    console.log("Logout API failed ❌", err);
  } finally {
    // 2) frontend token clear
    clearSession();

    // 3) panel close (optional)
    setActivePanel(null);

    // 4) redirect
    window.location.href = "https://my.aicountly.com/";
  }
};



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
      path: "https://my.aicountly.com/admin/people_sharing/logs",
    },
    {
      label: "Contacts",
      type: "external",
      path: "https://contacts.aicountly.com/",
    },
  ];


  const actionBtns = [
    { icon: "device_reset", panel: "reset" },
    { icon: "settings_suggest", panel: "settings_suggest" },
    { icon: "question_exchange", panel: "question_exchange" },
  ];


 
 

  return (
    <header className="w-full bg-white  border border-[#cbd0dd] shadow-sm px-6 sticky top-0 left-0 right-0">
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
            <span className="italic">
              Business ID: {businessId ?? "N/A"}
            </span>
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
          src={userProfile?.dpurl ? userProfile.dpurl : userAvatar}
          alt="User"
          className="h-10 w-10 rounded-full cursor-pointer object-cover"
          onClick={() =>
          setActivePanel(activePanel === "profile" ? null : "profile")
          }
        />

        </div>

        {activePanel && createPortal (
          <div className="fixed right-0 top-16 w-96 h-[calc(100vh-64px)] bg-white border-l shadow-lg z-40 border-[#cbd0dd]">
            <div className="p-5 overflow-y-auto h-full">

              {/* BUSINESS PANEL */}
              {activePanel === "business" && (
                <>
                 <div className="font-extrabold text-tiny mb-4 text-black">
                  My Business ID: {businessId ?? "N/A"}
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
                  <div className="font-extrabold text-tiny mb-3 text-black">
                    Recent Activities
                  </div>

                  {/* Search */}
                  <input
                    type="text"
                    value={actSearch}
                    onChange={(e) => setActSearch(e.target.value)}
                    placeholder="Search Settings"
                    className="w-full border rounded-md px-3 py-2 text-tiny font-semibold outline-none border-[#cbd0dd]"
                  />

                  {/* Loading / Error */}
                  {actLoading && (
                    <p className="text-tiny text-gray-500 mt-3">Loading...</p>
                  )}

                  {actError && (
                    <p className="text-tiny text-red-600 mt-3">{actError}</p>
                  )}

                  {/* Activities List */}
                  <div className="mt-3  rounded-md overflow-hidden bg-white">
                    {!actLoading &&
                      activities
                        ?.filter((a) =>
                          a?.text?.toLowerCase().includes(actSearch.toLowerCase())
                        )
                        .map((a, i) => (
                          <div
                            key={i}
                            className="px-3 py-3 border-b  border-dashed border-[#ccc]"
                          >
                            <p className="text-tiny font-bold text-[#3e465b] leading-5">
                              {a.text}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-1">
                              {a.date}
                            </p>
                          </div>
                        ))}

                    {!actLoading && activities?.length === 0 && (
                      <p className="text-tiny text-gray-500 p-3">
                        No recent activities
                      </p>
                    )}
                  </div>
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
               
               {activePanel === "question_exchange" && (
                  <>
                    

                    <div className="grid grid-cols-3 ">

                      {/* County Learning */}
                      <a
                        href="#"
                        className="flex flex-col items-center gap-2  rounded-md w-full 
                        hover:bg-[#eef2ff] transition border border-transparent
                        hover:border-[#d1d7ff]"
                      >
                        <img src={icon2} className="h-20" />
                        <span className="text-tiny font-semibold text-secondary">
                          County Learning
                        </span>
                      </a>

                      {/* E-sahayak */}
                      <a
                        href="#"
                         className="flex flex-col items-center gap-2  rounded-md w-full 
                        hover:bg-[#eef2ff] transition border border-transparent
                        hover:border-[#d1d7ff]"
                      >
                        <img src={icon7} className="h-20" />
                        <span className="text-tiny font-semibold text-secondary">
                          E-sahayak
                        </span>
                      </a>

                      {/* Help Desk — opens Modal */}
                      <button
                        onClick={() => setShowHelpModal(true)}
                         className="flex flex-col items-center gap-2 rounded-md w-full 
                        hover:bg-[#eef2ff] transition border border-transparent
                        hover:border-[#d1d7ff]"
                      >
                        <img src={icon1} className="h-20" />
                        <span className="text-tiny font-semibold text-secondary">
                          Help Desk
                        </span>
                      </button>

                      {/* Support */}
                      <a
                        href="#"
                        className="flex flex-col items-center gap-2  rounded-md w-full 
                        hover:bg-[#eef2ff] transition border border-transparent
                        hover:border-[#d1d7ff]"
                      >
                        <img src={icon3} className="h-20" />
                        <span className="text-tiny font-semibold text-secondary">
                          Support
                        </span>
                      </a>

                      {/* Aicountly Tour */}
                      <a
                        href="#"
                        className="flex flex-col items-center gap-2  rounded-md w-full 
                        hover:bg-[#eef2ff] transition border border-transparent
                        hover:border-[#d1d7ff]"
                      >
                        <img src={icon4} className="h-20" />
                        <span className="text-tiny font-semibold text-secondary">
                          Aicountly Tour
                        </span>
                      </a>

                      {/* Keyboard Shortcuts */}
                      <a
                        href="#"
                         className="flex flex-col items-center gap-2  rounded-md w-full 
                        hover:bg-[#eef2ff] transition border border-transparent
                        hover:border-[#d1d7ff]"
                      >
                        <img src={icon5} className="h-20" />
                        <span className="text-tiny font-semibold text-secondary text-center">
                          Keyboard Shortcuts
                        </span>
                      </a>

                      {/* Forums */}
                      <a
                        href="#"
                        className="flex flex-col items-center gap-2  rounded-md w-full 
                        hover:bg-[#eef2ff] transition border border-transparent
                        hover:border-[#d1d7ff]"
                      >
                        <img src={icon6} className="h-20" />
                        <span className="text-tiny font-semibold text-secondary">
                          Forums
                        </span>
                      </a>
                    </div>
                  </>
               )}

              {activePanel === "profile" && (
                <>
                  {/* TOP — Avatar + Info */}
                  <div className="flex items-center gap-4 mb-4 justify-around">
                    <img
                      src={userProfile?.dpurl ? userProfile.dpurl : userAvatar}
                      alt="User"
                      className="h-12 w-12 rounded-full cursor-pointer object-cover"
                      onClick={() =>
                        setActivePanel(activePanel === "profile" ? null : "profile")
                      }
                    />


                    <div className="text-xs text-gray-700 space-y-1">
                    {profileLoading && (
                        <p className="text-xs text-gray-500">Loading profile...</p>
                      )}

                      {profileError && (
                        <p className="text-xs text-red-600">{profileError}</p>
                      )}

                     {userProfile && (
                        <div className="text-tiny text-[#31374a] space-y-1 font-bold">
                          <div>
                            <span className="font-bold">User ID:</span>{" "}
                            {userProfile?.uuid ?? "N/A"}
                          </div>

                          <div>
                            <span className="font-bold">Name:</span>{" "}
                            {(userProfile?.user_firstname || "") + " " + (userProfile?.user_lastname || "")}
                          </div>

                          <div>
                            <span className="font-bold">Email:</span>{" "}
                            {userProfile?.user_regdemail ?? "N/A"}
                          </div>

                          <div>
                            <span className="font-bold">Phone:</span>{" "}
                            {userProfile?.user_regdmobile ?? "N/A"}
                          </div>
                        </div>
                      )}



                      {/* <div className="flex items-center gap-2">
                        <span className="font-bold">Phone:</span>
                        <button className="px-2 py-[2px] bg-blue-500 text-white rounded text-[10px]">
                          Update
                        </button>
                      </div> */}
                    </div>
                  </div>

                  {/* MANAGE ACCOUNT */}
                  <button className="w-full border border-primary text-primary rounded-md py-2 text-xs font-bold hover:bg-primary hover:text-white transition mb-3">
                    Manage My Aicountly Account
                  </button>

                  {/* SEARCH */}
                <input
                  type="text"
                  placeholder="Search"
                  value={companySearch}
                  onChange={(e) => setCompanySearch(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-xs font-semibold outline-none border-[#cbd0dd] mb-4"
                />


                 
                {/* COMPANY LIST */}
                <div className="space-y-2 text-[14px] text-[#3e465b]">

                  {companiesLoading && (
                    <p className="text-xs text-gray-500">Loading companies...</p>
                  )}

                  {companiesError && (
                    <p className="text-xs text-red-600">{companiesError}</p>
                  )}

                  {!companiesLoading &&
                    !companiesError &&
                    companies
                      ?.filter((c) => {
                        const q = companySearch.toLowerCase().trim();
                        if (!q) return true;
                        return (
                          (c?.company_name || "").toLowerCase().includes(q) ||
                          (c?.company_code || "").toLowerCase().includes(q)
                        );
                      })
                      .map((c) => (
                        <div
                          key={c.id}
                          className="border-b border-dashed border-gray-300 pb-2"
                        >
                          <div className="font-bold">{c.company_name}</div>
                          <div className="font-semibold text-tiny">
                            Organization: {c.company_code}
                          </div>
                        </div>
                      ))}

                  {!companiesLoading &&
                    !companiesError &&
                    companies?.length === 0 && (
                      <p className="text-xs text-gray-500">No companies found</p>
                    )}
                </div>


                  {/* ADD COMPANY */}
                  <div
                    className="mt-6 text-tiny font-semibold cursor-pointer text-black"
                    onClick={() => {
                      setActivePanel(null);
                      navigate("/company/all/add");
                    }}
                  >
                    + Add another company
                  </div>


                  {/* SIGN OUT */}
                 <div
                  className="mt-6 text-center text-tiny font-bold cursor-pointer text-black"
                  onClick={handleLogout}
                >
                  Sign out
                </div>


                  {/* FOOTER */}
                  <div className="mt-4 text-center text-tiny text-black space-x-3">
                    <span>Privacy policy</span>
                    <span>•</span>
                    <span>Terms</span>
                    <span>•</span>
                    <span>Cookies</span>
                  </div>
                </>
              )}


            </div>
          </div>,
          document.body
         )}

      </div>
    </header>
  );
}

export default Header
