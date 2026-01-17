import React from "react";

/* Material Icon */
const Icon = ({ name }) => (
  <span className="material-symbols-outlined text-[22px] text-black">
    {name}
  </span>
);

const SaleInvoice = () => {
  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      
      {/* ===== HEADER ===== */}
      <div className="bg-[#f6f7f9] px-6 py-4">
        <div className="flex items-center justify-between">

          {/* LEFT */}
          <h1 className="text-[25px] font-extrabold text-[#141824]">
            Sale Invoice
          </h1>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-5">
            <button className="hover:opacity-70">
              <Icon name="refresh" />
            </button>
            <button className="hover:opacity-70">
              <Icon name="visibility" />
            </button>
            <button className="hover:opacity-70">
              <Icon name="bolt" />
            </button>
            <button className="hover:opacity-70">
              <Icon name="print" />
            </button>
            <button className="hover:opacity-70">
              <Icon name="download" />
            </button>
            <button className="hover:opacity-70">
              <Icon name="share" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SaleInvoice;
