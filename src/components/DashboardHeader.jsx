import { useState } from "react";
import logo from "../assets/logo.png";
import userAvatar from "../assets/user.jpg";

const DashboardHeader = () => {
  const [openTopMenu, setOpenTopMenu] = useState(null); // masters | transactions | gst...
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      {/* ================= TOP WHITE BAR ================= */}
      <header
        className="w-full bg-white border-b shadow-sm sticky top-0 z-50"
        onMouseLeave={() => setOpenTopMenu(null)}
      >
        <div className="h-14 flex items-center px-4 gap-4">

          {/* 3 BAR MENU */}
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={() => setOpenDrawer(true)}
          >
            menu
          </span>

          {/* LOGO */}
          <img src={logo} className="h-10" />

          {/* HOME */}
          <span className="material-symbols-outlined cursor-pointer">
            home
          </span>

          {/* TOP NAV */}
          <nav className="flex gap-6 font-bold text-sm text-secondary">
            {["masters", "transactions", "gst", "tds", "reports"].map((key) => (
              <span
                key={key}
                className={`cursor-pointer ${
                  openTopMenu === key ? "text-primary" : ""
                }`}
                onMouseEnter={() => setOpenTopMenu(key)}
                onClick={() => setOpenTopMenu(key)}
              >
                {key.toUpperCase()}
              </span>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="ml-auto flex items-center gap-4">
            <span className="material-symbols-outlined">history</span>
            <span className="material-symbols-outlined">settings</span>
            <span className="material-symbols-outlined">notifications</span>

            {/* PROFILE */}
            <img
              src={userAvatar}
              className="h-9 w-9 rounded-full cursor-pointer"
              onClick={() => setOpenProfile(!openProfile)}
            />
          </div>
        </div>
      </header>

      {/* ================= GREEN COMMAND LINE ================= */}
      <div className="bg-primary h-12 flex items-center px-4 gap-4">
        <input
          placeholder="Command Line"
          className="w-[420px] h-9 rounded-md px-3 outline-none"
        />
        <button className="bg-white w-10 h-10 rounded-md font-bold">+</button>
      </div>

      {/* ================= TOP DROPDOWN PANEL ================= */}
      {openTopMenu === "masters" && (
        <div className="absolute left-0 right-0 top-[110px] bg-white border-b z-40">
          <div className="grid grid-cols-4 gap-10 px-8 py-6 text-sm">
            <div>
              <h4 className="font-bold mb-2">COMPANY</h4>
              <p>Accounts</p>
              <p>Voucher Series</p>
              <p>Bill Sundry</p>
              <p>Tax Category</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">STOCK</h4>
              <p>Items</p>
              <p>Material Centre</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">REPORTING</h4>
              <p>Cost Centre</p>
              <p>Project</p>
              <p>Bill By Bill</p>
              <p>Sub Ledger</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">UTILITY</h4>
              <p>Bulk Updation</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= LEFT DRAWER (3 BAR) ================= */}
      {openDrawer && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpenDrawer(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[420px] bg-white p-6">
            <div className="flex justify-between mb-6">
              <h3 className="font-bold text-lg">Apps</h3>
              <span
                className="cursor-pointer text-xl"
                onClick={() => setOpenDrawer(false)}
              >
                ✕
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span>Community</span>
                <span className="text-primary">+</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Contacts</span>
                <span className="text-primary">+</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>My Account</span>
                <span className="text-primary">+</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PROFILE DROPDOWN ================= */}
      {openProfile && (
        <div className="fixed right-4 top-[120px] w-72 bg-white border shadow-lg z-50 p-4 text-sm">
          <div className="font-bold mb-2">Hshush</div>
          <div className="text-xs mb-3">
            GSTIN: 123<br />
            Branch: HO<br />
            Comp ID: 7
          </div>

          <div className="space-y-2">
            <div>Company Master</div>
            <div>Change Financial Year</div>
            <div>Rewrite Books</div>
            <div>Company Access</div>
            <div>Offices & Branches</div>
            <div className="text-red-600">Close Company</div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHeader;
