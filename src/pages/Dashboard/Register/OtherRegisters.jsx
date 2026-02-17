import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/* ===== ICON ===== */
const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`}>
    {name}
  </span>
);

export default function OtherRegisters() {
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [fromDate, setFromDate] = useState(new Date("2026-02-01"));
  const [toDate, setToDate] = useState(new Date("2026-02-16"));

const handleGo = () => {
  if (!type) {
    alert("Please select register type");
    return;
  }

  if (type === "memorandum") {
    navigate("/company/dashboard/register/memorandum-register");
  }
  if (type === "optional") {
    navigate("/company/dashboard/register/optional-register");
  }
  if (type === "system") {
    navigate("/company/dashboard/register/system-journal-register");
  }
};


  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Other Acc. Registers
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="border border-primary text-primary px-4 py-2 rounded-md font-bold text-[13px]"
        >
          &lt;&lt; Back
        </button>
      </div>

      {/* CENTER CARD */}
      <div className="flex justify-center">
        <div className="bg-white w-[920px] rounded-xl shadow-xl overflow-hidden">

          {/* REGISTER TYPE */}
          <div className="p-6 border-b">
            <label className="text-[14px] font-bold text-gray-700">
              Register Type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full mt-2 h-[46px] border rounded-lg px-4 font-semibold text-[15px] outline-none focus:ring-2 focus:ring-[#c7d7ff]"
            >
             <option value="">Choose Type</option>
              <option value="memorandum">Memorandum Register</option>
              <option value="optional">Optional Register</option>
              <option value="system">System Journal Register</option>
            </select>
          </div>

          {/* BODY SECTION */}
          <div className="p-6">

            <div className="flex gap-6">

              {/* LEFT SIDE */}
              <div className="w-[55%]">

                <div className="grid grid-cols-4 gap-3 text-[13px] font-bold">
                  {["APR","JUL","OCT","JAN",
                    "MAY","AUG","NOV","FEB",
                    "JUN","SEP","DEC","MAR"].map(m => (
                    <button key={m} className="h-[38px] bg-[#e2f6dc] rounded-md">
                      {m}
                    </button>
                  ))}

                  {["Q1","Q2","Q3","Q4"].map(q => (
                    <button key={q} className="h-[38px] bg-[#bfeab1] rounded-md">
                      {q}
                    </button>
                  ))}

                  <button className="h-[38px] bg-[#d6e8fa] rounded-md">H1</button>
                  <button className="h-[38px] bg-[#d6e8fa] rounded-md">H2</button>
                </div>

                <div className="mt-4 flex items-center gap-2 font-bold text-[13px]">
                  <input type="checkbox" />
                  <span>TILL PERIOD</span>
                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="w-[45%] space-y-4">

                <div className="flex items-center h-[40px] border rounded-md bg-[#eff2f6]">
                  <button className="w-[40px] h-full border-r text-[22px]">‹</button>
                  <div className="flex-1 text-center font-bold text-[14px]">
                    FY: 2025 - 26
                  </div>
                  <button className="w-[40px] h-full border-l text-[22px]">›</button>
                </div>

                <div className="flex items-center gap-3">
                  <label className="w-[60px] font-bold text-[14px]">From</label>
                  <DatePicker
                    selected={fromDate}
                    onChange={setFromDate}
                    dateFormat="dd-MM-yyyy"
                    className="flex-1 h-[40px] border rounded-md px-3 font-semibold text-[14px] w-80"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="w-[60px] font-bold text-[14px]">To</label>
                  <DatePicker
                    selected={toDate}
                    onChange={setToDate}
                    dateFormat="dd-MM-yyyy"
                    className="flex-1 h-[40px] border rounded-md px-3 font-semibold text-[14px] w-80"
                  />
                </div>

                <div className="flex justify-end">
                  <button className="h-[36px] px-5 border rounded-md font-bold bg-[#eff2f6] text-[13px]">
                    TILL DATE
                  </button>
                </div>

              </div>

            </div>

            {/* GO BUTTON */}
            <button
              onClick={handleGo}
              className="mt-8 w-full h-[48px] bg-[#22a300] text-white text-[18px] font-extrabold rounded-md"
            >
              GO
            </button>

          </div>
        </div>
      </div>

    </div>
  );
}
