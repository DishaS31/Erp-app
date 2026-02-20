import React from "react";
import { useNavigate } from "react-router-dom";

export default function OutwardSupplies() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f6fa]">

      {/* ================= HEADER ================= */}
      <div className="px-10 pt-6 pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-[28px] font-extrabold text-black">
            Outward Supplies (R1/ CMP08)
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="border border-primary text-primary px-5 py-2 rounded-md font-bold hover:bg-primary hover:text-white transition text-[14px]"
          >
           &lt; &lt; Back
          </button>
        </div>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="flex justify-center mt-8">
        <div className="w-[850px] bg-white rounded-[16px] shadow-xl px-10 py-8">

          <div className="flex gap-10">

            {/* ================= LEFT SIDE ================= */}
            <div className="w-[55%]">

              <div className="grid grid-cols-4 gap-3 text-[13px] font-bold text-black">
                {[
                  "APR","JUL","OCT","JAN",
                  "MAY","AUG","NOV","FEB",
                  "JUN","SEP","DEC","MAR"
                ].map(m => (
                  <button
                    key={m}
                    className="h-[38px] bg-[#cfe9c8] hover:bg-[#b9dcb2] rounded-md transition"
                  >
                    {m}
                  </button>
                ))}

                {["Q1","Q2","Q3","Q4"].map(q => (
                  <button
                    key={q}
                    className="h-[42px] bg-[#a9d89a] hover:bg-[#95cc85] rounded-md transition"
                  >
                    {q}
                  </button>
                ))}

                <button className="h-[42px] bg-[#c8d8ea] rounded-md">H1</button>
                <button className="h-[42px] bg-[#c8d8ea] rounded-md">H2</button>
              </div>

              <div className="mt-5 flex items-center gap-3 text-[14px] font-bold">
                <input type="checkbox" className="w-[16px] h-[16px]" />
                <span>TILL PERIOD</span>
              </div>

            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="w-[45%] space-y-5">

              {/* FY BAR */}
              <div className="flex items-center h-[42px]">
                <button className="w-[42px] h-full border rounded-l-md bg-[#eef2f6] text-[22px]">
                  ‹
                </button>

                <div className="flex-1 h-full border-t border-b flex items-center justify-center font-extrabold text-[14px] bg-[#eef2f6]">
                  FY: 2025 - 26
                </div>

                <button className="w-[42px] h-full border rounded-r-md bg-[#eef2f6] text-[22px]">
                  ›
                </button>
              </div>

              {/* FROM */}
              <div className="flex items-center gap-4">
                <label className="w-[60px] font-bold text-black">
                  From
                </label>
                <input
                  value="01-04-2025"
                  readOnly
                  className="flex-1 h-[42px] px-4 border rounded-md font-semibold text-[14px]"
                />
              </div>

              {/* TO */}
              <div className="flex items-center gap-4">
                <label className="w-[60px] font-bold text-black">
                  To
                </label>
                <input
                  value="30-04-2025"
                  readOnly
                  className="flex-1 h-[42px] px-4 border rounded-md font-semibold text-[14px]"
                />
              </div>

              {/* TILL DATE BUTTON */}
              <div className="flex justify-end">
                <button className="h-[42px] px-6 border rounded-md font-bold bg-[#eef2f6] text-[14px]">
                  TILL DATE
                </button>
              </div>

            </div>
          </div>

          {/* ================= GO BUTTON ================= */}
          <div className="mt-8">
            <button
            onClick={() => navigate("/company/dashboard/gst/gstr1-report")}
            className="w-full h-[50px] bg-primary text-white font-extrabold rounded-md"
            >
            GO
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}
