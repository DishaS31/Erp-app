import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";


/* ===== ICON ===== */
const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`}>
    {name}
  </span>
);

export default function BillsManagementPreOpen() {

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const navigate = useNavigate();


  const [fromDate, setFromDate] = useState(new Date("2026-02-01"));
  const [toDate, setToDate] = useState(new Date("2026-02-19"));

  const [criteria, setCriteria] = useState("ACCOUNT_WISE");
    const [account, setAccount] = useState("");
    const [showAccountDD, setShowAccountDD] = useState(false);


    const accountList = [
    "Check Status Account Payable",
    "Salary Payable",
    "Test Account",
    "Under Trade Payable",
    ];


  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Bills Management Report
        </h1>

        <button className="border border-primary text-primary px-4 py-2 rounded-md font-bold text-tiny">
          &lt;&lt; Back
        </button>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="flex justify-center">
        <div className="bg-white w-[920px] rounded-xl shadow-xl p-6">

          {/* ================= CRITERIA + ACCOUNT ================= */}
          <div className="grid grid-cols-2 gap-6 mb-5">

            <div>
              <label className="text-[13px] font-bold text-gray-700">
                Criteria
              </label>

                <select
                value={criteria}
                onChange={(e) => {
                    setCriteria(e.target.value);
                    setAccount("");
                }}
                className="w-full h-[40px] border rounded-md px-3 font-semibold mt-1"
                >
                <option value="ACCOUNT_WISE">Account Wise Bill Summary</option>
                <option value="ONE_ACCOUNT">One Account</option>
                <option value="BILL_WISE">Bill Wise Statement</option>
                </select>

            </div>

            <div>
              <label className="text-[13px] font-bold text-gray-700">
                Account
              </label>

                {/* ACCOUNT FIELD DYNAMIC */}
                {criteria === "ACCOUNT_WISE" && (
                <div className="relative mt-1">
                    <input
                    type="text"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    onFocus={() => setShowAccountDD(true)}
                    className="w-full h-[40px] border rounded-md px-3 font-semibold"
                    />

                    {showAccountDD && (
                    <div className="absolute left-0 right-0 bg-white border rounded-md shadow-lg max-h-[220px] overflow-y-auto z-50">
                        {accountList
                        .filter((acc) =>
                            acc.toLowerCase().includes(account.toLowerCase())
                        )
                        .map((acc, i) => (
                            <div
                            key={i}
                            onClick={() => {
                                setAccount(acc);
                                setShowAccountDD(false);
                            }}
                            className="px-4 py-2 hover:bg-[#f3f6fb] cursor-pointer"
                            >
                            {acc}
                            </div>
                        ))}
                    </div>
                    )}
                </div>
                )}


                {criteria === "ONE_ACCOUNT" && (
                <select
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    className="w-full h-[40px] border rounded-md px-3 font-semibold mt-1"
                >
                    <option value="">Select Account</option>
                    {accountList.map((acc, i) => (
                    <option key={i} value={acc}>
                        {acc}
                    </option>
                    ))}
                </select>
                )}

                {criteria === "BILL_WISE" && (
                <input
                    type="text"
                    disabled
                    className="w-full h-[40px] border rounded-md px-3 font-semibold mt-1 bg-gray-100 cursor-not-allowed"
                />
                )}

            </div>

          </div>

          {/* ================= BILL TYPE RADIO ================= */}
          <div className="flex items-center gap-6 mb-6 font-bold text-[14px] text-black">
            <label className="flex items-center gap-2">
              <input type="radio" name="billType" defaultChecked />
              All Bills
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="billType" />
              Trade Receivable
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="billType" />
              Trade Payable
            </label>
          </div>

          <hr className="mb-6" />

          {/* ================= MONTH / PERIOD SECTION ================= */}
          <div className="flex gap-6">

            {/* LEFT MONTH GRID */}
            <div className="w-[55%]">
              <div className="grid grid-cols-4 gap-2 text-[13px] font-bold">
                {["APR","JUL","OCT","JAN",
                  "MAY","AUG","NOV","FEB",
                  "JUN","SEP","DEC","MAR"].map(m => (
                  <button key={m} className="h-[36px] bg-[#d8f1d1] rounded-md">
                    {m}
                  </button>
                ))}

                {["Q1","Q2","Q3","Q4"].map(q => (
                  <button key={q} className="h-[36px] bg-[#b8e6ac] rounded-md">
                    {q}
                  </button>
                ))}

                <button className="h-[36px] bg-[#c0dbf5] rounded-md">H1</button>
                <button className="h-[36px] bg-[#c0dbf5] rounded-md">H2</button>
              </div>

              <div className="mt-3 flex items-center gap-2 font-bold text-[13px]">
                <input type="checkbox" />
                <span>TILL PERIOD</span>
              </div>
            </div>

            {/* RIGHT DATE SECTION */}
            <div className="w-[45%] space-y-3">

              {/* FY SELECT */}
              <div className="flex items-center h-[36px] border rounded-md bg-[#eff2f6]">
                <button className="w-[36px] h-full border-r text-[22px]">‹</button>

                <div className="flex-1 text-center font-bold text-[13px]">
                  FY: 2025 - 26
                </div>

                <button className="w-[36px] h-full border-l text-[22px]">›</button>
              </div>

              {/* FROM */}
              <div className="flex items-center gap-3">
                <label className="w-[55px] font-bold text-[15px]">From</label>

                <div className="relative flex-1">
                  <DatePicker
                    ref={fromRef}
                    selected={fromDate}
                    onChange={setFromDate}
                    dateFormat="dd-MM-yyyy"
                    className="w-full h-[36px] pl-4 pr-10 border rounded-md font-semibold text-[13px]"
                  />

                  <button
                    type="button"
                    onClick={() => fromRef.current.setOpen(true)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <Icon name="calendar_month" />
                  </button>
                </div>
              </div>

              {/* TO */}
              <div className="flex items-center gap-3">
                <label className="w-[55px] font-bold text-[15px]">To</label>

                <div className="relative flex-1">
                  <DatePicker
                    ref={toRef}
                    selected={toDate}
                    onChange={setToDate}
                    dateFormat="dd-MM-yyyy"
                    className="w-full h-[36px] pl-4 pr-10 border rounded-md font-semibold text-[13px]"
                  />

                  <button
                    type="button"
                    onClick={() => toRef.current.setOpen(true)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <Icon name="calendar_month" />
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="h-[36px] px-4 border rounded-md font-bold bg-[#eff2f6] text-[13px]">
                  TILL DATE
                </button>
              </div>

            </div>
          </div>

          {/* ================= GO BUTTON ================= */}
            <button
              onClick={() => {
                  if (criteria === "ACCOUNT_WISE") {
                    navigate("/company/dashboard/reports/bills_management_accounts");
                  }

                  if (criteria === "ONE_ACCOUNT") {
                    navigate("/company/dashboard/reports/bills_management_one_account");
                  }
                  
                  if (criteria === "BILL_WISE") {
                    navigate(
                      `/company/dashboard/reports/bills_management_statement`
                    );
                  }
              }}
              className="mt-6 w-full h-[45px] bg-primary text-white rounded-md font-extrabold text-[16px]"
            >
              GO
            </button>

        </div>
      </div>
    </div>
  );
}
