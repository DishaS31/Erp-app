import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StockSummary() {
  const navigate = useNavigate();

  const [summaryType] = useState("Stock Summary");
  const [subType, setSubType] = useState("Stock Item");
  const [stockItem, setStockItem] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);

const stockItems = [
  "Ball Pen",
  "Ditem",
  "FRAMED PICTURE",
  "P.S PLASTIC STRIPS V200",
  "Test Item",
];


  const handleGo = () => {
    if (!stockItem) return alert("Please select stock item");

    navigate("/company/dashboard/reports/stock-summary/view", {
      state: { summaryType, subType, stockItem },
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-8">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Stock Summary
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="h-[34px] px-6 border border-primary text-primary font-bold rounded-md text-[13px] hover:bg-primary hover:text-white transition"
        >
          Back
        </button>
      </div>

      {/* ===== CARD ===== */}
      <div className="flex justify-center">
        <div className="bg-white w-[720px] rounded-xl shadow-lg px-12 py-10">

          {/* Financial Year */}
          <div className="text-[16px] font-bold mb-8">
            Financial Year -
          </div>

          <div className="space-y-6">

            {/* Summary Type */}
            <div>
              <label className="block text-[14px] font-semibold mb-2">
                Summary Type
              </label>

              <select
                value={summaryType}
                className="w-full h-[44px] border border-[#cbd0dd] rounded-md px-4 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Stock Summary</option>
              </select>
            </div>

            {/* Sub Type */}
            <div>
              <label className="block text-[14px] font-semibold mb-2">
                Sub Type
              </label>

              <select
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className="w-full h-[44px] border border-[#cbd0dd] rounded-md px-4 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Stock Item</option>
                <option>Stock Group</option>
              </select>
            </div>

            {/* Stock Item */}
            <div>
            <label className="block text-[14px] font-semibold mb-2">
                Stock Item
            </label>

            <div className="flex gap-4 relative">
                
                {/* LEFT INPUT */}
                <div className="flex-1 relative">
                <input
                    value={stockItem}
                    onFocus={() => setShowDropdown(true)}
                    onChange={(e) => setStockItem(e.target.value)}
                    className="w-full h-[44px] border border-[#cbd0dd] rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {showDropdown && (
                    <div className="absolute top-[46px] left-0 w-full bg-white border border-[#cbd0dd] shadow-md rounded-md z-50">
                    {stockItems.map((item, index) => (
                        <div
                        key={index}
                        onClick={() => {
                            setStockItem(item);
                            setShowDropdown(false);
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                        >
                        {item}
                        </div>
                    ))}
                    </div>
                )}
                </div>

                {/* RIGHT INPUT */}
                <input
                value="All Units"
                disabled
                className="flex-1 h-[44px] border border-[#cbd0dd] rounded-md px-4 bg-[#f3f4f6]"
                />
            </div>
            </div>


            {/* Buttons */}
            <div className="flex justify-center gap-5 pt-6">
              <button
                onClick={handleGo}
                className="bg-primary hover:bg-green-700 text-white px-10 py-2 rounded-md font-bold text-[13px]"
              >
                GO
              </button>

              <button
                onClick={() => navigate(-1)}
                className="bg-[#2f3542] hover:opacity-90 text-white px-10 py-2 rounded-md font-bold text-[13px]"
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
