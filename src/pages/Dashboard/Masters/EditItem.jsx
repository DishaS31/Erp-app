import React from "react";
import { useNavigate } from "react-router-dom";

export default function EditItem() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Edit Stock Item
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="h-[34px] px-4 border border-primary text-primary font-bold rounded-md text-sm bg-white hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

      {/* ================= TOP SECTION ================= */}
      <div className="grid grid-cols-2 gap-6 text-black">

        {/* LEFT SIDE */}
        <div className="bg-white border rounded-lg p-6">

          <SectionTitle title="Item Description" />

          <FormRow label="Item Name" required defaultValue="Sample Item" />
          <FormRow label="Item Sku" defaultValue="SKU001" />
          <FormRow label="Item UPC" defaultValue="UPC001" />
          <FormRow label="Alias Name" required defaultValue="Sample Alias" />
          <FormRow label="Print Name" required defaultValue="Sample Print" />
          <FormRow label="Sales Account" required defaultValue="Sales A/c" />
          <FormRow label="Purchase Account" required defaultValue="Purchase A/c" />

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white border rounded-lg p-6">

          <SectionTitle title="Unit Details" />

          {/* Column Headers */}
          <div className="grid grid-cols-[2fr_80px_1fr] mb-2 text-sm font-semibold">
            <div>Unit</div>
            <div className="text-center">Op. Qty</div>
            <div></div>
          </div>

          {[1,2,3,4,5].map((_, i) => (
            <div key={i} className="grid grid-cols-[2fr_80px_1fr] gap-3 items-center mb-3">
              <input
                defaultValue="PCS"
                className="h-[34px] border rounded-md px-3 text-sm"
              />
              <div className="text-center text-sm">0</div>
              <div className="flex gap-2">
                <button className="px-3 h-[32px] border rounded-md text-xs border-black font-bold">
                  MC Qty Wise
                </button>
                <button className="px-3 h-[32px] border border-red-500 text-red-500 rounded-md text-xs font-bold">
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="text-center text-sm mt-2">
            Previous 1 2 3 4 5 Next
          </div>
        </div>
      </div>

      {/* ================= MIDDLE SECTION ================= */}
      <div className="grid grid-cols-2 gap-6 mt-6 text-black">

        {/* ITEM MAPPING */}
        <div className="bg-white border rounded-lg p-6">
          <SectionTitle title="Item Mapping" />

          <FormRow label="Item Group" required defaultValue="Main" />
          <FormRow label="Item Category" required defaultValue="General" />
          <FormRow label="Default Unit" required defaultValue="PCS" />
        </div>

        {/* GST DETAILS */}
        <div className="bg-white border rounded-lg p-6">
          <SectionTitle title="GST Details" />

          <FormRow label="Tax Category" required defaultValue="GST 18%" />
          <FormRow label="HSN" defaultValue="1234" />
        </div>
      </div>

      {/* PRICE INFO */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div></div>
        <div className="bg-white border rounded-lg p-6">
          <SectionTitle title="Item Price Info" />
          <FormRow label="MRP" defaultValue="100" />
        </div>
      </div>

      {/* OTHER DESCRIPTION */}
      <div className="bg-white border rounded-lg p-6 mt-6">
        <SectionTitle title="Other Description" />

        <div className="grid grid-cols-2 gap-x-10 gap-y-4">

          <FormRow label="Sale Discount" defaultValue="5%" />
          <FormRow label="Purchase Discount" defaultValue="3%" />

          <FormRow label="Specify Sale Discount Structure" />
          <FormRow label="Specify Pur. dis Structure" />

          <FormRow label="Set Critical level" defaultValue="10" />
          <FormRow label="Specify Contract" />

          <FormRow label="Serial No wise Details" />
          <FormRow label="Parameterized Details" />

          <FormRow label="MRP Wise Details" />
          <FormRow label="Batch Wise Details" />

        </div>
      </div>

      {/* SAVE / QUIT */}
      <div className="flex justify-center gap-6 mt-8">
        <button className="px-8 h-[38px] bg-primary text-white font-bold rounded-md text-sm">
          UPDATE
        </button>
        <button className="px-8 h-[38px] bg-gray-700 text-white font-bold rounded-md text-sm">
          QUIT
        </button>
      </div>

    </div>
  );
}


/* ===== SECTION TITLE ===== */
const SectionTitle = ({ title }) => (
  <h2 className="font-bold text-[15px] mb-4">{title}</h2>
);

/* ===== PERFECT LABEL + INPUT ALIGNMENT ===== */
const FormRow = ({ label, required, defaultValue }) => (
  <div className="grid grid-cols-[180px_1fr] items-center mb-3">
    <label className="text-sm font-semibold">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      defaultValue={defaultValue}
      className="h-[34px] border rounded-md px-3 text-sm"
    />
  </div>
);
