import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCostCentre() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Edit Cost Centre
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="h-[34px] px-5 border border-primary text-primary font-semibold rounded-md text-sm bg-white hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

      {/* FORM SECTION */}
      <div className="grid grid-cols-2 gap-6">

        {/* LEFT CARD */}
        <div className="bg-white p-6 rounded-lg border border-[#d9dee7] space-y-5">

          {["Name", "Alias", "Print", "Under"].map((label) => (
            <div key={label} className="grid grid-cols-[120px_1fr] items-center">
              <label className="text-[14px] font-semibold">
                {label}
              </label>
              <input
                className="h-[36px] border border-[#cfd6e4] rounded-md px-3 text-[14px]"
              />
            </div>
          ))}
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white p-6 rounded-lg border border-[#d9dee7] space-y-5">
          <h2 className="font-bold text-[16px]">Payment Info</h2>

          {["OP. Bal", "P.Y. Bal"].map((label) => (
            <div key={label} className="grid grid-cols-[100px_1fr_120px] items-center gap-4">
              <label className="text-[14px] font-semibold">{label}</label>

              <input
                defaultValue="0.00"
                className="h-[36px] border border-[#cfd6e4] rounded-md px-3 text-[14px]"
              />

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name={label} />
                  Cr.
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name={label} defaultChecked />
                  Dr.
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-8">
        <button className="px-8 h-[36px] bg-primary text-white font-bold rounded-md text-sm">
          UPDATE
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-8 h-[36px] bg-[#2f3747] text-white font-bold rounded-md text-sm"
        >
          QUIT
        </button>
      </div>
    </div>
  );
}
