import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import { useState } from "react";
import defaultLogo from "../assets/default_logo.png";
import LogoUploadModal from "./LogoUploadModal";
import noteIcon from "../assets/stickynote.jpg";
import calculatorIcon from "../assets/calculator_img.jpg";
import calendarIcon from "../assets/calender.jpg";




const DashboardLayout = () => {



const [logo, setLogo] = useState(defaultLogo);
const [logoModalOpen, setLogoModalOpen] = useState(false);

const [activeTool, setActiveTool] = useState(null);
const [activeNoteTab, setActiveNoteTab] = useState("company");


const [collapsed, setCollapsed] = useState(false);
const [openSections, setOpenSections] = useState({
  office: true,
  cred: true,
});

const toggleSection = (key) => {
  setOpenSections(prev => ({
    ...prev,
    [key]: !prev[key],
  }));
};




  return (
    <div className="h-screen flex flex-col bg-[#f4f6f9]">

      {/* DASHBOARD HEADER */}
      <DashboardHeader />

      <div className="flex flex-1 overflow-hidden">

        {/* DASHBOARD ASIDE */}
        <aside
          className={`
            ${collapsed ? "w-16" : "w-64"}
            bg-white border-r transition-all duration-300
            flex flex-col
          `}
        >

          <div className="flex-1 overflow-y-auto text-[#1f2a44]">

            {/* MY OFFICE TOOL */}
            <div>
              <button
                onClick={() => toggleSection("office")}
                className="w-full flex items-center justify-between px-4 py-2 font-semibold mt-4 border-b"
              >
                <div className="flex items-center gap-3 text-[#555] text-[15px] font-bold ">
                  <span className="material-symbols-outlined">devices_other</span>
                  {!collapsed && "My Office Tool"}
                </div>
                {!collapsed && <span className="material-symbols-outlined">expand_more</span>}
              </button>

              {openSections.office && !collapsed && (

                <div className="px-8 pb-2 text-sm space-y-2">
                  <div className="border-b py-1 px-0">Calender</div>
                  <div className="border-b py-1 px-0">Sticky Notes</div>
                  <div className="border-b py-1 px-0">Calculator</div>
                </div>
              )}
            </div>

            {/* MY CREDENTIALS */}
            <div >
              <button
                onClick={() => toggleSection("cred")}
                className="w-full flex items-center justify-between px-4 py-3 font-semibold border-b"
              >
                <div className="flex items-center gap-3  text-[#555] text-[15px] font-bold">
                  <span className="material-symbols-outlined">stack_star</span>
                  {!collapsed && "My Credentials"}
                </div>
                {!collapsed && <span className="material-symbols-outlined">expand_more</span>}
              </button>

              {openSections.cred && !collapsed && (

                <div className="px-8 pb-2 text-sm space-y-1">
                  <div className="border-b py-1 px-0">All Credentials</div>
                  <div className="border-b py-1 px-0">GST Cred.</div>
                  <div className="border-b py-1 px-0">TRACES Cred.</div>
                  <div className="border-b py-1 px-0">Income Tax Cred.</div>
                </div>
              )}
            </div>

            {/* SIMPLE LINKS */}
            <div className="px-4 py-2 flex items-center gap-3  text-[#555] text-[15px] font-bold border-b">
              <span className="material-symbols-outlined">folder_copy</span>
              {!collapsed && "My Documents"}
            </div>

            <div className="px-4 py-2 flex items-center gap-3 text-[#555] text-[15px] font-bold border-b">
              <span className="material-symbols-outlined">perm_phone_msg</span>
              {!collapsed && "Contacts"}
            </div>
           {/* SIDEBAR LOGO */}
            <div className="flex justify-center py-4 ">
              <img
                src={logo}
                alt="Company Logo"
                onClick={() => setLogoModalOpen(true)}
                className="
                  w-[80px] h-[80px]
                  rounded-full
                  object-cover
                  cursor-pointer
                  border
                  hover:shadow-md
                "
              />
            </div>

          </div>
          


            <button
              onClick={() => setCollapsed(prev => !prev)}
              className="border-t px-4 py-3 flex items-center gap-3 text-sm font-semibold"
            >
              <span className="material-symbols-outlined">
                {collapsed ? "chevron_right" : "chevron_left"}
              </span>
              {!collapsed && "Collapsed View"}
            </button>


          {logoModalOpen && (
            <LogoUploadModal
              logo={logo}
              setLogo={setLogo}
              onClose={() => setLogoModalOpen(false)}
            />
          )}


        </aside>

        {/* DASHBOARD MAIN */}
        <main className="flex-1 overflow-y-auto ">
           <div className="w-full bg-primary px-8 py-1 flex items-center gap-3">

              {/* Command Line Box */}
              <div className="flex items-center bg-white rounded-md px-3 py-1 w-[310px] ">
                <input
                  type="text"
                  placeholder="Command Line"
                  className="flex-1 outline-none text-tiny text-[#525B75] placeholder:text-[#8b93a7] placeholder:font-bold  "
                />

                {/* Help Icon */}
                <span className="material-symbols-outlined text-[30px]">
                  
                 contact_support
                </span>
              </div>

              {/* Plus Button */}
              <button
                className="h-9 w-9 bg-white rounded-md flex items-center justify-center
                          text-lg font-bold text-black mx-4"
              >
                +
              </button>

              {/* Remaining Green Space */}
              <div className="flex-1"></div>
            </div>
          <Outlet />
        </main>


        {/* RIGHT SIDE QUICK ICONS */}
        <div className="fixed right-2 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">

         <button
            onClick={() => setActiveTool("calendar")}
            className="w-10 h-10 bg-white border rounded-md flex items-center justify-center shadow border-primary"
          >
             <img
                src={calendarIcon}
                alt="Calendar"
                className="w-6 h-6 object-contain"
              />
          </button>
          
          <button
            onClick={() => setActiveTool("notes")}
            className="w-10 h-10 bg-white border rounded-md flex items-center justify-center shadow border-primary"
          >
            <img
                src={noteIcon}
                alt="Notes"
                className="w-6 h-6 object-contain"
              />
          </button>

          <button
            onClick={() => setActiveTool("calculator")}
            className="w-10 h-10 bg-white border rounded-md flex items-center justify-center shadow border-primary"
          >
              <img
                  src={calculatorIcon}
                  alt="Calculator"
                  className="w-6 h-6 object-contain"
                />
          </button>

        </div>


      </div>


    {activeTool === "notes" && (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

        <div className="w-[800px] h-[305px] bg-white rounded-xl border-2 border-primary overflow-hidden">

          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-[26px] font-extrabold text-[#141824]">Sticky Notes</h2>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveNoteTab("company")}
                className={`px-5 py-1 rounded-full text-sm font-medium
                  ${activeNoteTab === "company"
                    ? "border-2 border-primary text-black"
                    : "bg-gray-100 text-gray-700"
                  }`}
              >
                Company Notes
              </button>

              <button
                onClick={() => setActiveNoteTab("my")}
                className={`px-5 py-1 rounded-full text-sm font-medium
                  ${activeNoteTab === "my"
                    ? "border-2 border-primary text-black"
                    : "bg-gray-100 text-gray-700"
                  }`}
              >
                My Notes
              </button>

              <button
                onClick={() => setActiveTool(null)}
                className="text-2xl ml-3 text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="flex ">

            {/* LEFT PANEL */}
            <div className="w-[280px] border-r px-5 py-4">

              <div className="bg-gray-100 [border-radius:0_0_0_30px/45px] px-3 py-2 text-[#8a94ad] mb-6 font-bold">
                New Note
              </div>

              <div className="flex items-center gap-3 mb-6 cursor-pointer">
                <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center text-xl text-black">
                  +
                </div>
              </div>

              <div className="italic text-sm cursor-pointer text-black">
                Show More
              </div>
            </div>

            {/* RIGHT NOTE AREA */}
            <div className="flex-1 p-6 relative">

              <div className="relative w-full h-[161px] bg-[#f7f7f7] [border-radius:0_0_0_30px/45px] p-6">

                {/* PAPER FOLD */}
               

                <p className="text-primary mt-20">Great.</p>
              </div>

              <div className="absolute -bottom-1 right-8 w-6 h-6 rounded-full border  border-black flex items-center justify-center text-xl">
                ✓
              </div>

            </div>
          </div>
        </div>
      </div>
    )}

    {activeTool === "calculator" && (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

        <div className="w-[420px] bg-white rounded-xl border-2 border-primary shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-3 border-b">
            <h2 className="text-lg font-bold text-[#141824]">Calculator</h2>
            <button
              onClick={() => setActiveTool(null)}
              className="text-xl text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* DISPLAY */}
          <div className="px-5 py-3">
            <input
              type="text"
              value="0"
              readOnly
              className="w-full h-12 border rounded-md text-right px-3 text-lg font-semibold outline-none"
            />
          </div>

          {/* KEYPAD */}
          <div className="grid grid-cols-4 gap-3 px-5 pb-5 text-black font-bold">

            <button className="col-span-1 bg-blue-100 rounded-md py-2 font-bold">C</button>
            <button className="bg-[#d8f1d1] rounded-md py-2">√</button>
            <button className="bg-[#d8f1d1] rounded-md py-2">x²</button>
            <button className="bg-[#d8f1d1] rounded-md py-2">÷</button>

            <button className="bg-[#d8f1d1] rounded-md py-2">7</button>
            <button className="bg-[#d8f1d1]  rounded-md py-2">8</button>
            <button className="bg-[#d8f1d1]  rounded-md py-2">9</button>
            <button className="bg-[#ace29e] rounded-md py-2">×</button>

            <button className="bg-[#d8f1d1]  rounded-md py-2">4</button>
            <button className="bg-[#d8f1d1]  rounded-md py-2">5</button>
            <button className="bg-[#d8f1d1]  rounded-md py-2">6</button>
            <button className="bg-[#ace29e] rounded-md py-2">−</button>

            <button className="bg-[#d8f1d1]  rounded-md py-2">1</button>
            <button className="bg-[#d8f1d1]  rounded-md py-2">2</button>
            <button className="bg-[#d8f1d1]  rounded-md py-2">3</button>
            <button className="bg-[#ace29e] rounded-md py-2">+</button>

            <button className="bg-[#d8f1d1]  rounded-md py-2">±</button>
            <button className="bg-[#d8f1d1]  rounded-md py-2">0</button>
            <button className="bg-[#d8f1d1]  rounded-md py-2">.</button>
            <button className="bg-primary text-white rounded-md py-2 font-bold">=</button>

          </div>
        </div>
      </div>
    )}






      {/* DASHBOARD FOOTER */}
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
