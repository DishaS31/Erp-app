import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AccountSummary() {
  const navigate = useNavigate();

  const [summaryType, setSummaryType] = useState("Account Summary");
  const [detail, setDetail] = useState("Ledger");
  const [account, setAccount] = useState("");

  const handleGo = () => {
    if (!account) return alert("Please select account");

    navigate("/company/dashboard/reports/account-summary/view", {
      state: {
        summaryType,
        detail,
        account,
      },
    });
  };

return (
  <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

    {/* ===== PAGE HEADER ===== */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-[26px] font-extrabold text-[#1e293b]">
        Account Summary
      </h1>

      <button
        onClick={() => navigate(-1)}
        className="
          px-5 py-2 
          border border-primary 
          text-primary 
          rounded-md 
          font-bold 
          text-[13px]
          transition
          hover:bg-primary 
          hover:text-white
        "
      >
        « Back
      </button>
    </div>

    {/* ===== CENTER CARD ===== */}
    <div className="flex justify-center">
      <div className="bg-white w-[760px] rounded-xl shadow-lg p-8">

        {/* FY TITLE */}
        <div className="text-[18px] font-extrabold text-[#1e293b] mb-6">
          Financial Year 2023 - 24
        </div>

        <div className="space-y-5">

          {/* Summary Type */}
          <div>
            <label className="block font-bold text-[14px] text-[#334155] mb-1">
              Summary Type
            </label>
            <select
              value={summaryType}
              onChange={(e) => setSummaryType(e.target.value)}
              className="
                w-full h-[44px] 
                border border-[#cbd5e1] 
                rounded-md px-4
                font-semibold
                outline-none
                focus:ring-2 focus:ring-primary
              "
            >
              <option value="Account Summary">Account Summary</option>
            </select>
          </div>

          {/* Detail */}
          <div>
            <label className="block font-bold text-[14px] text-[#334155] mb-1">
              Detail
            </label>
            <select
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="
                w-full h-[44px] 
                border border-[#cbd5e1] 
                rounded-md px-4
                font-semibold
                outline-none
                focus:ring-2 focus:ring-primary
              "
            >
              <option>Ledger</option>
              <option>Group</option>
            </select>
          </div>

          {/* Account */}
          <div>
            <label className="block font-bold text-[14px] text-[#334155] mb-1">
              Account
            </label>
            <input
              placeholder="Enter Account Name"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="
                w-full h-[44px] 
                border border-[#cbd5e1] 
                rounded-md px-4
                font-semibold
                outline-none
                focus:ring-2 focus:ring-primary
              "
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handleGo}
              className="
                bg-primary 
                text-white 
                px-8 py-2 
                rounded-md 
                font-bold 
                transition
                hover:opacity-90
                text-[13px]
              "
            >
              GO
            </button>

            <button
              onClick={() => navigate(-1)}
              className="
                bg-[#2f3542] 
                text-white 
                px-8 py-2 
                text-[13px]
                rounded-md 
                font-bold
                transition
                hover:bg-black
              "
            >
              QUIT
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
);

}
