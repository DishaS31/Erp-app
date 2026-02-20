import React from "react";
import { useNavigate } from "react-router-dom";

export default function EWay() {
  const navigate = useNavigate();

  const months = [
    "APR", "JUL", "OCT", "JAN",
    "MAY", "AUG", "NOV", "FEB",
    "JUN", "SEP", "DEC", "MAR",
  ];

  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-[28px] font-extrabold text-black">
          E-WAY
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="border border-primary text-primary px-5 py-1 rounded-md font-bold hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

      {/* CENTER CARD */}
      <div className="flex justify-center">
        <div className="w-[820px] bg-white rounded-[14px] shadow-xl px-10 py-8">

          {/* MONTH GRID */}
          <div className="grid grid-cols-4 gap-4 text-[14px] font-bold text-black">

            {months.map((m) => (
            <button
                key={m}
                onClick={() =>
                navigate("/company/dashboard/gst/e-way-summary", {
                    state: { period: m },
                })
                }
                className="h-[45px] bg-[#d8f1d1] hover:bg-[#a9cfa0] rounded-md transition"
            >
                {m}
            </button>
            ))}


            {quarters.map((q) => (
            <button
                key={q}
                onClick={() =>
                navigate("/company/dashboard/gst/e-way-summary", {
                    state: { period: q },
                })
                }
                className="h-[45px] bg-[#ace29e] hover:bg-[#97c98b] rounded-md transition"
            >
                {q}
            </button>
            ))}


            <button
            onClick={() =>
                navigate("/company/dashboard/gst/e-way-summary", {
                state: { period: "H1" },
                })
            }
            className="h-[45px] bg-[#c0dbf5] hover:bg-[#a5bcd4] rounded-md transition"
            >
            H1
            </button>


            <button className="h-[45px] bg-[#c0dbf5] hover:bg-[#a5bcd4] rounded-md transition">
              H2
            </button>

          </div>
        </div>
      </div>

    </div>
  );
}
