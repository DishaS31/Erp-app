import React, { useState } from "react";
import { Link } from "react-router-dom";


import logo from "../assets/logo.png";
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


const MEGA_MENU_DATA = {
  masters: [
    {
      title: "COMPANY",
      icon: "home_work",
      items: ["Accounts", "Voucher Series", "Bill Sundry", "Tax Category"],
    },
    {
      title: "STOCK",
      icon: "shelves",
      items: ["Items", "Material Centre"],
    },
     {
      title: "REPORTING",
      icon: "summarize",
      items: ["Cost Centre", "Project", "Bill By Bill", "Sub Ledger"],
    },
     {
      title: "UTILITY",
      icon: "tune",
      items: ["Bulk Updation"],
    },
  ],

  transactions: [
    {
      title: "SALES",
      icon: "shopping_cart_checkout",
      items: ["Sale Invoice", "Credit Note"],
    },
    {
      title: "PURCHASE",
      icon: "local_mall",
      items: ["Purchase Invoice", "Debit Note"],
    },
     {
      title: "BANKING",
      icon: "local_mall",
      items: ["Payments", "Receipts", "Contra", "Journal", "Memorandum"],
    },
      {
      title: "ITEMS",
      icon: "autorenew",
      items: ["Physical Verification", "Stock Journal"],
    },
     {
      title: "APPROVALS",
      icon: "autorenew",
      items: ["Txn Approval"],
    },
  ],

  gst: [
    {
      title: " PERIODIC",
      icon: "query_stats",
      items: ["Outward Supplies (R1/ CMP08)", "GST Summary", "Inward Supplies (2A/2B)"],
    },
      {
      title: " E-Way / E-Invoice ",
      icon: "pending_actions",
      items: ["Manage E-Way ",  "Manage E-Invoice"],
    },
  ],

  tds: [
    {
      title: "IT TDS/TCS",
      icon: "insights",
      items: ["Form 24Q (Salary)", "Form 26Q (Other than salary )" , "Form 27Q (Non Resident)", "Form 27EQ (TCS)"],
    },
     {
      title: " GST TDS / TCS ",
      icon: "insights",
      items: ["GSTR-7", "GSTR-8" ],
    },
  ],

  reports: [
    {
      title: "Accounts",
      icon: "content_paste_search",
      items: ["Account Ledger", "Account Summary", "Bills Management"],
    },
     {
      title: "STOCK",
      icon: "box_add",
      items: ["Stock Ledger", "Stock Summary", "Inventory Status", "Other Inventory Reports"],
    },
     {
      title: " BOOKS",
      icon: "book",
      items: ["Day Book", "Cost Centre"],
    },
     {
      title: "FINAL ACCOUNT",
      icon: "add_chart",
      items: ["Balance Sheet", "Profit & Loss Accounts","Trial Balance", "Project Reporting"],
    },
     {
      title: "UTILITIES",
      icon: "calculate",
      items: [],
    },
  ],

  register: [
  {
    title: "OUTWARD",
    icon: "difference",
    items: ["Sales Register", "Sales Return Register"],
  },
  {
    title: "VOUCHER",
    icon: "confirmation_number",
    items: [
      "Payment Register",
      "Receipt Register",
      "Contra Register",
      "Journal Register",
      "Other Acc. Register",
    ],
  },
  {
    title: "INWARDS",
    icon: "add_chart",
    items: ["Purchase Register", "Purchase Return Register"],
  },
],

};




const DashboardHeader = () => {

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
  label: "Masters",
  key: "masters",
  megaMenu: true,
    },
    {
      label: "Transactions",
      key: "transactions",
      megaMenu: true,
    },
    {
      label: "GST",
      key: "gst",
      megaMenu: true,
    },
    {
      label: "TDS / TCS",
      key: "tds",
      megaMenu: true,
    },
    
    {
      label: "Register",
      key: "register",
      megaMenu: true,
    },


    {
      label: "Reports",
      key: "reports",
      megaMenu: true,
    },

  ];

  const actionBtns = [
    { icon: "device_reset", panel: "reset" },
    { icon: "settings_suggest", panel: "settings_suggest" },
    { icon: "notifications", panel: "notifications" },
    { icon: "question_exchange", panel: "question_exchange" },
  ];

  const [activePanel, setActivePanel] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState(null);
  const [openFY, setOpenFY] = useState(false);
const [openBranch, setOpenBranch] = useState(false);



  



  return (
    <header className="w-full bg-white border border-[#cbd0dd] shadow-sm px-6 sticky top-0 z-50">
      <div className="flex items-center justify-between h-16">

        {/* LEFT LOGO */}
        <div className="flex items-center gap-3">
          {/* Drawer Icon */}
          <span
            className="material-symbols-outlined cursor-pointer text-[#31374a] "
            onClick={() => setIsDrawerOpen(true)}
          >
            lists
          </span>

          {/* Logo */}
          <img src={logo} alt="Aicountly" className="h-16" />
        </div>


        {/* CENTER NAV */}
        <nav className="flex items-center gap-2 text-tiny font-bold text-secondary">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">

              {/* HOME */}
              {item.iconType === "image" && (
                <Link to={item.path}>
                  <img src={item.icon} className="h-5 cursor-pointer" />
                </Link>
              )}

              {/* NORMAL LINKS */}
              {item.label && !item.megaMenu && (
                <Link
                  to={item.path}
                  className="px-2 py-1 hover:bg-primary hover:text-white transition"
                >
                  {item.label}
                </Link>
              )}

              {/* MASTERS MEGA MENU */}
              {item.megaMenu && (
                <>
                 <div
                   
                    className="relative"
                  >
                    <span   onClick={() =>
                        setOpenMegaMenu(openMegaMenu === item.key ? null : item.key)
                      }
                     className={`
                                  px-3 py-1 cursor-pointer transition
                                  ${
                                    openMegaMenu === item.key
                                      ? "bg-primary text-white"
                                      : "text-secondary"
                                  }
                                `}>
                     {item.label}
                    </span>
                  </div>

                {openMegaMenu === item.key && (
                  <div
                    className="fixed left-0 top-[50px] w-screen bg-white border-t-4 border-primary shadow-md z-40"
                    onClick={() => setOpenMegaMenu(null)}
                  >
                    <div className="max-w-[1400px] mx-auto px-5 py-8">
                      <div className="grid grid-cols-5 gap-12 text-sm">

                        {MEGA_MENU_DATA[item.key]?.map((section, i) => (
                          <div key={i}>
                            <div className="font-extrabold mb-1 flex items-center gap-2 text-tiny text-[#525b75]">
                              <span className="material-symbols-outlined">
                                {section.icon}
                              </span>
                              <span className="border-b-2 border-b-[#e3e3e3]">
                                {section.title}
                              </span>
                            </div>

                            <ul className="space-y-2 text-tiny text-[#525b75]">
                              {section.items.map((label, j) => {


                                  if (
                                    item.key === "masters" &&
                                    section.title === "COMPANY" &&
                                    label === "Accounts"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/masters/accounts"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Accounts
                                        </Link>
                                      </li>
                                    );
                                  }
                                  
                                  if (
                                    item.key === "masters" &&
                                    section.title === "STOCK" &&
                                    label === "Items"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/masters/items"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Items
                                        </Link>
                                      </li>
                                    );
                                  }
                                  

                                  if (
                                    item.key === "masters" &&
                                    section.title === "STOCK" &&
                                    label === "Material Centre"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/masters/material-centres"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Material Centre
                                        </Link>
                                      </li>
                                    );
                                  }
                                 

                                  if (
                                    item.key === "masters" &&
                                    section.title === "COMPANY" &&
                                    label === "Voucher Series"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/masters/voucher-series"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Voucher Series
                                        </Link>
                                      </li>
                                    );
                                  }

                                  if (
                                    item.key === "masters" &&
                                    section.title === "COMPANY" &&
                                    label === "Bill Sundry"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/masters/bill-sundry"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Bill Sundry
                                        </Link>
                                      </li>
                                    );
                                  }

                                  if (
                                    item.key === "masters" &&
                                    section.title === "COMPANY" &&
                                    label === "Tax Category"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/masters/tax-category"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Tax Category
                                        </Link>
                                      </li>
                                    );
                                  }

                                  
                                  if (
                                    item.key === "masters" &&
                                    section.title === "REPORTING" &&
                                    label === "Cost Centre"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/masters/cost-centre"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Cost Centre
                                        </Link>
                                      </li>
                                    );
                                  }


                                  if (
                                    item.key === "masters" &&
                                    section.title === "REPORTING" &&
                                    label === "Project"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/masters/projects"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Project
                                        </Link>
                                      </li>
                                    );
                                  }


                                  if (
                                    item.key === "masters" &&
                                    section.title === "REPORTING" &&
                                    label === "Bill By Bill"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/masters/bill-by-bill"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Bill By Bill
                                        </Link>
                                      </li>
                                    );
                                  }


                                  // ✅ SALES REGISTER LINK
                                  if (
                                    item.key === "register" &&
                                    section.title === "OUTWARD" &&
                                    label === "Sales Register"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/register/sales-register"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Sales Register
                                        </Link>
                                      </li>
                                    );
                                  }


                                  // ✅ PURCHASE REGISTER LINK
                                  if (
                                    item.key === "register" &&
                                    section.title === "INWARDS" &&
                                    label === "Purchase Register"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/register/purchase-register"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Purchase Register
                                        </Link>
                                      </li>
                                    );
                                  }

                                  // ✅ SALES RETURN REGISTER LINK
                                if (
                                  item.key === "register" &&
                                  section.title === "OUTWARD" &&
                                  label === "Sales Return Register"
                                ) {
                                  return (
                                    <li key={j}>
                                      <Link
                                        to="/company/dashboard/register/sales-return-register"
                                        className="hover:text-primary font-bold"
                                        onClick={() => setOpenMegaMenu(null)}
                                      >
                                        Sales Return Register
                                      </Link>
                                    </li>
                                  );
                                }

                                // ✅ PURCHASE RETURN REGISTER LINK
                              if (
                                item.key === "register" &&
                                section.title === "INWARDS" &&
                                label === "Purchase Return Register"
                              ) {
                                return (
                                  <li key={j}>
                                    <Link
                                      to="/company/dashboard/register/purchase-return-register"
                                      className="hover:text-primary font-bold"
                                      onClick={() => setOpenMegaMenu(null)}
                                    >
                                      Purchase Return Register
                                    </Link>
                                  </li>
                                );
                              }

                              // ✅ PAYMENT REGISTER LINK
                                if (
                                  item.key === "register" &&
                                  section.title === "VOUCHER" &&
                                  label === "Payment Register"
                                ) {
                                  return (
                                    <li key={j}>
                                      <Link
                                        to="/company/dashboard/register/payment-register"
                                        className="hover:text-primary font-bold"
                                        onClick={() => setOpenMegaMenu(null)}
                                      >
                                        Payment Register
                                      </Link>
                                    </li>
                                  );
                                }

                                // ✅ RECEIPT REGISTER LINK
                                  if (
                                    item.key === "register" &&
                                    section.title === "VOUCHER" &&
                                    label === "Receipt Register"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/register/receipt-register"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Receipt Register
                                        </Link>
                                      </li>
                                    );
                                  }

                                  // ✅ CONTRA REGISTER
                                  if (
                                    item.key === "register" &&
                                    section.title === "VOUCHER" &&
                                    label === "Contra Register"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/register/contra-register"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Contra Register
                                        </Link>
                                      </li>
                                    );
                                  }

                                  // ✅ JOURNAL REGISTER
                                  if (
                                    item.key === "register" &&
                                    section.title === "VOUCHER" &&
                                    label === "Journal Register"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/register/journal-register"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Journal Register
                                        </Link>
                                      </li>
                                    );
                                  }

                                  // ✅ OTHER ACC REGISTER
                                  if (
                                    item.key === "register" &&
                                    section.title === "VOUCHER" &&
                                    label === "Other Acc. Register"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/register/other-acc-register"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Other Acc. Register
                                        </Link>
                                      </li>
                                    );
                                  }




                                  if (
                                    item.key === "masters" &&
                                    section.title === "REPORTING" &&
                                    label === "Sub Ledger"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/masters/sub-ledger"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Sub Ledger
                                        </Link>
                                      </li>
                                    );
                                  }
                                

                                  if (
                                    item.key === "masters" &&
                                    section.title === "UTILITY" &&
                                    label === "Bulk Updation"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/masters/bulk-updation"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          Bulk Updation
                                        </Link>
                                      </li>
                                    );
                                  }



                                  if (
                                    item.key === "transactions" &&
                                    section.title === "SALES" &&
                                    label === "Sale Invoice"
                                  ) {
                                    return (
                                      <li key={j}>
                                        <Link
                                          to="/company/dashboard/transactions/sale-invoice"
                                          className="hover:text-primary font-bold"
                                          onClick={() => setOpenMegaMenu(null)}
                                        >
                                          {label}
                                        </Link>
                                      </li>
                                    );
                                  }

                                  if (
                                      item.key === "transactions" &&
                                      section.title === "BANKING" &&
                                      label === "Payments"
                                    ) {
                                      return (
                                        <li key={j}>
                                          <Link
                                            to="/company/dashboard/transactions/payments"
                                            className="hover:text-primary font-bold"
                                            onClick={() => setOpenMegaMenu(null)}
                                          >
                                            Payments
                                          </Link>
                                        </li>
                                      );
                                    }

                                    if (
                                      item.key === "transactions" &&
                                      section.title === "BANKING" &&
                                      label === "Receipts"
                                    ) {
                                      return (
                                        <li key={j}>
                                          <Link
                                            to="/company/dashboard/transactions/receipts"
                                            className="hover:text-primary font-bold"
                                            onClick={() => setOpenMegaMenu(null)}
                                          >
                                            Receipts
                                          </Link>
                                        </li>
                                      );
                                    }

                                    if (
                                      item.key === "transactions" &&
                                      section.title === "BANKING" &&
                                      label === "Contra"
                                    ) {
                                      return (
                                        <li key={j}>
                                          <Link
                                            to="/company/dashboard/transactions/contra"
                                            className="hover:text-primary font-bold"
                                            onClick={() => setOpenMegaMenu(null)}
                                          >
                                            Contra
                                          </Link>
                                        </li>
                                      );
                                    }

                                    if (
                                      item.key === "transactions" &&
                                      section.title === "BANKING" &&
                                      label === "Journal"
                                    ) {
                                      return (
                                        <li key={j}>
                                          <Link
                                            to="/company/dashboard/transactions/journal"
                                            className="hover:text-primary font-bold"
                                            onClick={() => setOpenMegaMenu(null)}
                                          >
                                            Journal
                                          </Link>
                                        </li>
                                      );
                                    }
                                    
                                    if (
                                      item.key === "transactions" &&
                                      section.title === "BANKING" &&
                                      label === "Memorandum"
                                    ) {
                                      return (
                                        <li key={j}>
                                          <Link
                                            to="/company/dashboard/transactions/memorandum"
                                            className="hover:text-primary font-bold"
                                            onClick={() => setOpenMegaMenu(null)}
                                          >
                                            Memorandum
                                          </Link>
                                        </li>
                                      );
                                    }



                                   // ✅ INVENTORY STATUS
                                      if (
                                        item.key === "reports" &&
                                        section.title === "STOCK" &&
                                        label === "Inventory Status"
                                      ) {
                                        return (
                                          <li key={j}>
                                            <Link
                                              to="/company/dashboard/reports/inventory-status"
                                              className="hover:text-primary font-bold"
                                              onClick={() => setOpenMegaMenu(null)}
                                            >
                                              {label}
                                            </Link>
                                          </li>
                                        );
                                      }

                                      // ✅ DAY BOOK
                                      if (
                                        item.key === "reports" &&
                                        section.title === " BOOKS" &&
                                        label === "Day Book"
                                      ) {
                                        return (
                                          <li key={j}>
                                            <Link
                                              to="/company/dashboard/reports/day-book"
                                              className="hover:text-primary font-bold"
                                              onClick={() => setOpenMegaMenu(null)}
                                            >
                                              {label}
                                            </Link>
                                          </li>
                                        );
                                      }

                                      if (
                                        item.key === "reports" &&
                                        section.title === "FINAL ACCOUNT" &&
                                        label === "Balance Sheet"
                                      ) {
                                        return (
                                          <li key={j}>
                                            <Link
                                              to="/company/dashboard/reports/balance-sheet"
                                              className="hover:text-primary font-bold"
                                              onClick={() => setOpenMegaMenu(null)}
                                            >
                                              Balance Sheet
                                            </Link>
                                          </li>
                                        );
                                      }

                                      if (
                                        item.key === "reports" &&
                                        section.title === "FINAL ACCOUNT" &&
                                        label === "Profit & Loss Accounts"
                                      ) {
                                        return (
                                          <li key={j}>
                                            <Link
                                              to="/company/dashboard/reports/profit-loss"
                                              className="hover:text-primary font-bold"
                                              onClick={() => setOpenMegaMenu(null)}
                                            >
                                              Profit & Loss Accounts
                                            </Link>
                                          </li>
                                        );
                                      }

                                      if (
                                          item.key === "reports" &&
                                          section.title === "FINAL ACCOUNT" &&
                                          label === "Trial Balance"
                                        ) {
                                          return (
                                            <li key={j}>
                                              <Link
                                                to="/company/dashboard/reports/trial-balance"
                                                className="hover:text-primary font-bold"
                                                onClick={() => setOpenMegaMenu(null)}
                                              >
                                                Trial Balance
                                              </Link>
                                            </li>
                                          );
                                        }

                                        if (
                                            item.key === "reports" &&
                                            section.title === "Accounts" &&
                                            label === "Account Ledger"
                                          ) {
                                            return (
                                              <li key={j}>
                                                <Link
                                                  to="/company/dashboard/reports/account-ledger"
                                                  className="hover:text-primary font-bold"
                                                  onClick={() => setOpenMegaMenu(null)}
                                                >
                                                  Account Ledger
                                                </Link>
                                              </li>
                                            );
                                          }

                                          // ✅ STOCK LEDGER
                                        if (
                                          item.key === "reports" &&
                                          section.title === "STOCK" &&
                                          label === "Stock Ledger"
                                        ) {
                                          return (
                                            <li key={j}>
                                              <Link
                                                to="/company/dashboard/reports/stock-ledger"
                                                className="hover:text-primary font-bold"
                                                onClick={() => setOpenMegaMenu(null)}
                                              >
                                                Stock Ledger
                                              </Link>
                                            </li>
                                          );
                                        }
                                        
                                        // ✅ GST SUMMARY
                                      if (
                                        item.key === "gst" &&
                                        section.title === " PERIODIC" &&
                                        label === "GST Summary"
                                      ) {
                                        return (
                                          <li key={j}>
                                            <Link
                                              to="/company/dashboard/gst/gst-summary"
                                              className="hover:text-primary font-bold"
                                              onClick={() => setOpenMegaMenu(null)}
                                            >
                                              GST Summary
                                            </Link>
                                          </li>
                                        );
                                      }

                                      // ✅ ACCOUNT SUMMARY
                                      if (
                                        item.key === "reports" &&
                                        section.title === "Accounts" &&
                                        label === "Account Summary"
                                      ) {
                                        return (
                                          <li key={j}>
                                            <Link
                                              to="/company/dashboard/reports/account-summary"
                                              className="hover:text-primary font-bold"
                                              onClick={() => setOpenMegaMenu(null)}
                                            >
                                              Account Summary
                                            </Link>
                                          </li>
                                        );
                                      }

                                      // ✅ STOCK SUMMARY
                                      if (
                                        item.key === "reports" &&
                                        section.title === "STOCK" &&
                                        label === "Stock Summary"
                                      ) {
                                        return (
                                          <li key={j}>
                                            <Link
                                              to="/company/dashboard/reports/stock-summary"
                                              className="hover:text-primary font-bold"
                                              onClick={() => setOpenMegaMenu(null)}
                                            >
                                              Stock Summary
                                            </Link>
                                          </li>
                                        );
                                      }




                                  return <li key={j}>{label}</li>;
                                })}

                            </ul>
                          </div>
                        ))}

                      </div>
                    </div>
                  </div>
                 )}

                </>
              )}
            </div>
          ))}
        </nav>

    
    {/* RIGHT PANEL */}
 <div className="flex items-center gap-6" >
    <div className="flex flex-col items-end  min-w-[220px]">

        {/* ICON ROW */}
        <div className="flex items-center gap-4">
          {actionBtns.map((btn, index) => (
            <span
              key={index}
              className="material-symbols-outlined cursor-pointer"
              onClick={() =>
                setActivePanel(activePanel === btn.panel ? null : btn.panel)
              }
            >
              {btn.icon}
            </span>
          ))}
        </div>


        {/* USER NAME ROW (SEPARATE LINE) */}
        <div
          className="flex items-center gap-1 mt-1 pr-1 cursor-pointer
                    text-tiny font-bold"
          onClick={() =>
                    setActivePanel(activePanel === "user_menu" ? null : "user_menu")
                  }
        >
          <span className="whitespace-nowrap italic">
            Hsush (25-26 | HO)
          </span>

          <span className="material-symbols-outlined ">
            expand_more
          </span>
        </div>
    </div>
      {/* USER AVATAR */}
    <div>   
      <img
          src={userAvatar}
          alt="User"
          className="h-10 w-10 rounded-full cursor-pointer"
          onClick={() => setActivePanel("profile")}
        />
    </div>

  </div>

      {activePanel && (
      <div
        className="fixed inset-0 z-30"
        onClick={() => setActivePanel(null)}
      />
    )}


    {activePanel && (
          <div className="fixed right-0 top-16 w-96 h-[calc(100vh-64px)] bg-white border-l shadow-lg z-40 border-[#cbd0dd]">
            <div className="p-5 overflow-y-auto h-full">

           

              {/* RESET PANEL */}
              {activePanel === "reset" && (
                <>
                  <div className="font-extrabold text-tiny  text-black">
                    Recent Activities
                  </div>

                  <input
                    type="text"
                    placeholder="Search Settings"
                    className="w-full border rounded-md px-3 py-2  mb-5 text-tiny font-semibold outline-none border-[#cbd0dd]"
                  />
                  <span className="text-tiny text-[#3874ff] font-bold">View More</span>

                </>
              )}

              {/* SETTINGS PANEL */}
              {activePanel === "settings_suggest" && (
                <>
                  {/* HEADER */}


                  {/* ================= THEME COLOR ================= */}
                  <div className="mb-10 border-b pb-5">
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
                  <div className="mb-10 border-b pb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-tiny font-bold text-black">
                        Font Size
                      </span>

                      <div className="inline-flex border rounded overflow-hidden border-primary">
                        <button
                          onClick={() =>
                            document.documentElement.style.setProperty("--font-base", "12.8px")
                          }
                          className="px-4 py-1 bg-primary text-white text-tiny font-bold  border-primary"
                        >
                          A
                        </button>

                        <button
                          onClick={() =>
                            document.documentElement.style.setProperty("--font-base", "14px")
                          }
                          className="px-4 py-1 border-l text-primary font-bold text-tiny border-primary"
                        >
                          A+
                        </button>

                        <button
                          onClick={() =>
                            document.documentElement.style.setProperty("--font-base", "15.5px")
                          }
                          className="px-4 py-1 border-l text-primary font-bold text-tiny border-primary"
                        >
                          A++
                        </button>
                      </div>
                    </div>
                  </div>

                 
                  <div className="mt-4">
                    <button className="w-full border rounded-md py-2 text-primary font-extrabold hover:bg-primary hover:text-white border-primary transition text-tiny">
                      View All
                    </button>
                  </div>


                </>
              )}
              
               {/* noti PANEL */}
              {activePanel === "notifications" && (
                  <div className="h-[90%] flex flex-col">

                    {/* HEADER */}
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <span className="text-base font-bold text-black">
                        Notifications
                      </span>

                      <button className="text-tiny font-semibold text-primary hover:underline">
                        Mark all as read
                      </button>
                    </div>

                    {/* EMPTY BODY */}
                    <div className="flex-1 bg-white"></div>

                    {/* FOOTER */}
                    <div className="border-t py-3 text-center">
                      <span className="text-[12px] font-extrabold text-[#141824]">
                        Notification history
                      </span>
                    </div>

                  </div>
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

                {activePanel === "user_menu" && (
                  <div className="h-full overflow-y-auto text-[#525B75]">

                    {/* HEADER */}
                    <div className="text-center py-3 ">
                      <div className="text-tiny font-bold text-black">Hsush</div>
                      <div className="text-tiny font-semibold text-black">
                        GSTIN: 123, Branch: HO, Comp ID: 7
                      </div>
                    </div>

                    <div className="px-4 py-3 font-bold text-black text-tiny">
                      My Company Profile
                    </div>

                    {/* Company Master */}
                    <div className="flex items-center gap-3 px-4 py-1 border-dashed border-b border-[#ccc] cursor-pointer text-tiny text-[#3e465b]">
                      <span className="material-symbols-outlined">store</span>
                      <span className="font-bold ">Company Master</span>
                    </div>

                    {/* Change Financial Year */}
                    <div
                      className="flex items-center justify-between px-4 py-1 pt-3  border-dashed border-b border-[#ccc] cursor-pointer text-tiny text-[#3e465b]"
                      onClick={() => setOpenFY(!openFY)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined">edit_calendar</span>
                        <span className="font-bold">Change Financial Year</span>
                      </div>
                      <span
                        className={`material-symbols-outlined transition-transform duration-300
                          ${openFY ? "rotate-180" : ""}
                        `}
                      >
                        expand_more
                      </span>
                    </div>

                    {/* FY DROPDOWN (SMOOTH) */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out
                        ${openFY ? "max-h-32" : "max-h-0"}
                      `}
                    >
                      <div className="flex justify-between items-center px-2 py-0 bg-[#cbd0dd]  text-[#3e465b] text-tiny font-extrabold">
                        <span>2025 - 26 (01 Apr, 2025 - 31 Mar, 2026)</span>
                        <span className="text-primary text-xl">★</span>
                      </div>

                      <div className="px-6 py-1 border-dashed border-b border-[#ccc] cursor-pointer text-[#3e465b] text-tiny font-bold">
                        Add New FY
                      </div>
                    </div>

                    {/* Rewrite Books */}
                    <div className="flex items-center gap-3 px-4  py-1 pt-3 border-dashed border-b border-[#ccc] cursor-pointer text-tiny text-[#3e465b]">
                      <span className="material-symbols-outlined">source_notes</span>
                      <span className="font-semibold">Rewrite Books</span>
                    </div>

                    {/* Company Access */}
                    <div className="flex items-center gap-3 px-4 py-1 pt-3 border-dashed border-b border-[#ccc] cursor-pointer text-tiny text-[#3e465b]">
                      <span className="material-symbols-outlined">history</span>
                      <span className="font-semibold">Company Access</span>
                    </div>

                    {/* Offices & Branches */}
                    <div
                      className="flex items-center justify-between px-4 py-1 pt-3 border-dashed border-b border-[#ccc] cursor-pointer text-tiny text-[#3e465b]"
                      onClick={() => setOpenBranch(!openBranch)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined">apartment</span>
                        <span className="font-semibold">Offices & Branches</span>
                      </div>
                      <span
                        className={`material-symbols-outlined transition-transform duration-300
                          ${openBranch ? "rotate-180" : ""}
                        `}
                      >
                        expand_more
                      </span>
                    </div>

                    {/* BRANCH DROPDOWN (SMOOTH) */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out
                        ${openBranch ? "max-h-16" : "max-h-0"}
                      `}
                    >
                      <div className="flex justify-between items-center px-2 py-0 bg-[#cbd0dd]  text-[#3e465b] text-tiny font-extrabold">
                        <span>HO (HO)</span>
                        <span className="text-primary text-xl">★</span>
                      </div>
                    </div>

                    {/* Close Company */}
                    <div className="flex items-center gap-3 px-4 py-1 pt-3 border-dashed border-b border-[#ccc] cursor-pointer text-tiny text-[#3e465b]">
                      <span className="material-symbols-outlined">room_preferences</span>
                      <span className="font-semibold">Close Company</span>
                    </div>

                  </div>
                )}


              {activePanel === "profile" && (
                <>
                  {/* TOP — Avatar + Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={userAvatar}
                      alt="User"
                      className="h-14 w-14 rounded-full border"
                    />

                    <div className="text-xs text-gray-700 space-y-1">
                      <div><span className="font-bold">User ID:</span> 7886</div>
                      <div><span className="font-bold">Org. ID:</span> 60020948365</div>
                      <div>
                        <span className="font-bold">Email:</span> dishas.5911@gmail.com
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold">Phone:</span>
                        <button className="px-2 py-[2px] bg-blue-500 text-white rounded text-[10px]">
                          Update
                        </button>
                      </div>
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
                    className="w-full border rounded-md px-3 py-2 text-xs font-semibold outline-none border-[#cbd0dd] mb-4"
                  />

                  {/* COMPANY LIST */}
                  <div className="space-y-4 text-[14px] text-[#3E465B] border-b pb-40 border-[#cbd0dd]">

                    <div className=' border-b border-dashed border-gray-300'>
                      <div className="font-extrabold">HSUSH</div>
                      <div className="font-bold text-[12px]">Organization: erp0000348</div>
                    </div>

                    {/* <div className=' border-b border-dashed border-gray-300'>
                      <div className="font-bold">RAHUL B GUPTA & CO.</div>
                      <div className="text-gray-500">Organization: erp0000103</div>
                    </div>

                    <div className=' border-b border-dashed border-gray-300'>
                      <div className="font-bold">KAPIL ENTERPRISES</div>
                      <div className="text-gray-500">Organization: erp0000139</div>
                    </div> */}
                  </div>

                  {/* ADD COMPANY */}
                  <div className="mt-6 text-tiny font-bold cursor-pointer text-[#141824] border-b pb-6 border-[#cbd0dd]">
                    + Add another company
                  </div>

                  {/* SIGN OUT */}
                  <div className="mt-6 text-center text-tiny font-bold cursor-pointer text-black">
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
          </div>
     )}



      </div>
      {/* LEFT DRAWER */}
    
        <>
          {/* Overlay */}
          <div
              className={`
                fixed  bg-black/30 z-40 top-16 left-0 right-0 bottom-0 
                transition-opacity duration-300
                ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
              `}
            onClick={() => setIsDrawerOpen(false)}
          />

         {/* Drawer */}
          <div   className={`
              fixed top-16 left-0 h-full w-[28.625rem] bg-white z-50
              shadow-lg border-r border-[#cbd0dd]
              transform transition-transform duration-300 ease-out
              ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
          `}>

            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-t border-t-[#cbd0dd]">
              <span className="text-base font-extrabold text-[#141824] ">
                Apps
              </span>

              <span
                className="material-symbols-outlined cursor-pointer text-gray-600 font-extrabold text-3xl"
                onClick={() => setIsDrawerOpen(false)}
              >
                close
              </span>
            </div>

            {/* Menu */}
            <div className="py-4">

              {/* ITEM */}
              <div className="flex items-center justify-between px-4 py-2
                              cursor-pointer hover:bg-gray-50 border-b">
                <span className="text-base text-[#31374a] font-bold">Community</span>
                <span className="material-symbols-outlined text-blue-500 text-xl font-bold">
                  add
                </span>
              </div>

              <div className="flex items-center justify-between px-4 py-2
                              cursor-pointer hover:bg-gray-50 border-b">
                <span className="text-base text-[#31374a] font-bold">Contacts</span>
                <span className="material-symbols-outlined text-blue-500 text-xl font-bold">
                  add
                </span>
              </div>

              <div className="flex items-center justify-between px-4 py-2
                              cursor-pointer hover:bg-gray-50">
                <span className="text-base text-[#31374a] font-bold">My Account</span>
                <span className="material-symbols-outlined text-blue-500 text-xl font-bold">
                  add
                </span>
              </div>

            </div>
          </div>

        </>
   

    </header>

    
  );
};

export default DashboardHeader;
