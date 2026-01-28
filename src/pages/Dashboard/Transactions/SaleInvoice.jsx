import React, { useState } from "react";
import SaleInvoiceItemsGrid from "../../../components/SaleInvoiceItemsGrid.jsx";



/* Material Icon */
const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

/* Tooltip Icon Button */
const IconBtn = ({ icon, tooltip }) => {
  return (
    <div className="relative group">
      <button type="button" className="hover:opacity-70 transition">
        <Icon name={icon} className="text-[28px] text-black" />
      </button>

      <div
        className="
          absolute left-1/2 -translate-x-1/2 -top-10
          bg-black text-white text-[12px] px-3 py-1 rounded-md
          opacity-0 group-hover:opacity-100
          pointer-events-none whitespace-nowrap
          transition duration-200
        "
      >
        {tooltip}
        <div
          className="
            absolute left-1/2 -translate-x-1/2 top-full
            w-0 h-0
            border-l-[6px] border-l-transparent
            border-r-[6px] border-r-transparent
            border-t-[6px] border-t-black
          "
        />
      </div>
    </div>
  );
};

/* REAL Select (same look like screenshot) */
const SelectBox = ({ value, setValue, options }) => {
  return (
    <div className="w-[190px]">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="
          h-[44px] w-full bg-white
          border border-[#cfd6e4] rounded-md
          px-4 text-[14px] font-semibold text-[#111827]
          shadow-sm outline-none
        "
      >
        {options.map((op, i) => (
          <option key={i} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
};

const CheckItem = ({ label }) => (
  <label className="flex items-center gap-1  font-bold text-tiny text-[#525b75]">
    <input
      type="checkbox"
      className="h-[18px] w-[18px] accent-[#1aa10a]"
    />
    {label}
  </label>
);

const FieldBox = ({ label, children, labelW = "min-w-[100px]" }) => {
  return (
    <div className="bg-white border border-[#cfd6e4] rounded-md shadow-sm overflow-hidden  ">
      <div className="flex items-center">
        <div
          className={`${labelW} bg-[#f3f6fb] border-r border-[#cfd6e4] px-5 py-2 text-tiny font-bold text-[#31374a]`}
        >
          <span>{label}</span>
        </div>
        <div className="flex-1 px-4 ">{children}</div>
      </div>
    </div>
  );
};

const SelectLook = ({ value }) => {
  return (
    <div className="flex items-center justify-between text-tiny">
      <span className="text-tiny font-bold text-[#31374a] truncate">{value}</span>
      <span className="material-symbols-outlined  text-gray-500">
        keyboard_arrow_down
      </span>
    </div>
  );
};

const InputLook = ({ value = "" }) => {
  return (
    <input
      readOnly
      value={value}
      className="w-full  bg-transparent outline-none text-tiny font-bold text-[#31374a]"
    />
  );
};

const MiniHash = () => (
  <button
    type="button"
    className=" w-[56px] rounded-md bg-[#1aa10a] text-white font-extrabold shadow-sm"
  >
    #
  </button>
);


const SaleInvoice = () => {
  const [openAddOn, setOpenAddOn] = useState(false);

  // ✅ Select values
  const [itemMode, setItemMode] = useState("With Item");
  const [currency, setCurrency] = useState("Rupee (₹)");
  const [voucherNo, setVoucherNo] = useState("147886");
  const [billNo, setBillNo] = useState("");
  const [reverseCharges, setReverseCharges] = useState("No");
  const [series, setSeries] = useState("Main");
  const [date, setDate] = useState("24-01-2026");


  

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <div className="bg-[#f6f7f9] px-10 py-4">
        <div className="flex items-start justify-between">
          {/* LEFT SIDE */}
          <div>
            <h1 className="text-[30px] font-extrabold text-[#141824]">
              Sale Invoice
            </h1>

            <div className="mt-3 flex items-center">
              <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden shadow-sm">

                {/* With Item */}
                <select
                  value={itemMode}
                  onChange={(e) => setItemMode(e.target.value)}
                  className=" w-[140px] px-5 py-2 text-tiny font-bold text-[#31374a] outline-none bg-white border-r border-[#cfd6e4]"
                >
                  <option>With Item</option>
                  <option>Without Item</option>
                </select>

                {/* Rupee */}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-[140px] px-5 py-2 text-tiny font-bold text-[#31374a] outline-none bg-white border-r border-[#cfd6e4]"
                >
                  <option>Rupee (₹)</option>
                  <option>Rupee (₹)</option>
                  <option>Rupee (₹)</option>
                  <option>Rupee (₹)</option>
                  <option>Rupee (₹)</option>
                  <option>Rupee (₹)</option>
                  <option>Rupee (₹)</option>
                  <option>Rupee (₹)</option>
                  <option>Rupee (₹)</option>
                  <option>Rupee (₹)</option>
                  <option>Rupee (₹)</option>
                  <option>Rupee (₹)</option>
                </select>

                {/* # */}
                <button
                  type="button"
                  className=" px-5 py-2 text-tiny w-[45px] bg-[#1aa10a] text-white font-extrabold"
                >
                  #
                </button>

              </div>
            </div>
                 {/* CHECKBOXES */}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-4 text-tiny text-[#525b75]">
              <CheckItem label="Bill By Bill" />
              <CheckItem label="Item Batch" />
              <CheckItem label="Project Reporting" />
              <CheckItem label="Tax Inclusive" />
              <CheckItem label="Negative Stock" />
              <CheckItem label="Memorandum" />
              <CheckItem label="GENERATE E-INVOICE" />
              <CheckItem label="GENERATE E-WAY" />
            </div>

             {/* ===== TOP FORM ROW (Sales Type + EWB Supply + EWB TXN) ===== */}
            <div className="mt-5 bg-white border border-[#cfd6e4] rounded-md shadow-sm p-3">
              <div className="grid grid-cols-12 gap-4">
                {/* Sales Type */}
                <div className="col-span-4 text-tiny">
                  <FieldBox label="Sales Type:">
                    <select
                      defaultValue="Sales With Stock Outward"
                      className="w-full bg-transparent outline-none text-tiny font-bold text-[#31374a] py-2"
                    >
                      <option>Sales With Stock Outward</option>
                     
                    </select>

                  </FieldBox>
                </div>

                {/* EWB Supply Type + # */}
       
                <div className="col-span-4">
                  <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden shadow-sm">
                    
                    {/* Label */}
                    <div className="bg-[#f3f6fb] border-r border-[#cfd6e4] px-1 py-2 flex items-center text-tiny font-bold text-[#31374a]">
                      EWB Supply Type:
                    </div>

                    {/* Select */}
                    <div className="flex-1 px-2 h-full ">
                     
                       <select
                          defaultValue="SUPPLY (REGULAR)"
                          className="flex-1 px-1 py-2 bg-transparent outline-none text-tiny font-bold text-[#31374a] w-28"
                        >
                          <option>SUPPLY (REGULAR)</option>
                          <option>EXPORT - WITH PAYMENT</option>
                          <option>EXPORT - WITHOUT PAYMENT</option>
                          <option>SEZ - WITH PAYMENT</option>
                          <option>SEZ - WITHOUT PAYMENT</option>
                          <option>JOB WORK</option>
                          <option>OTHERS</option>
                        </select>
                      
                    </div>

                    {/* # */}
                    <button
                      type="button"
                      className="w-[50px] py-2 bg-[#1aa10a] text-white font-extrabold text-tiny"
                    >
                      #
                    </button>
                  </div>
                </div>


                {/* EWB TXN Type + # */}
 
                <div className="col-span-4">
                  <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden shadow-sm ">
                    
                    {/* Label */}
                    <div className="bg-[#f3f6fb] border-r border-[#cfd6e4] px-1 py-2 flex items-center text-tiny font-bold text-[#31374a]">
                      EWB TXN Type:
                    </div>

                    {/* Select */}
                    <div className="flex-1 px-1 h-full w-28">
                      <select
                        defaultValue="REGULAR"
                        className="flex-1 px-1 py-2 bg-transparent outline-none text-tiny font-bold text-[#31374a]"
                      >
                        <option>REGULAR</option>
                        <option>BILL TO - SHIP TO</option>
                        <option>BILL FROM - DISPATCH FROM</option>
                      </select>
                    </div>

                    {/* # */}
                    <button
                      type="button"
                      className="w-[50px] py-2  bg-[#1aa10a] text-white font-extrabold text-tiny"
                    >
                      #
                    </button>
                  </div>
                </div>


                </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-end gap-4 pt-1">
            {/* ICONS */}
            <div className="flex items-center gap-4">
              <IconBtn icon="refresh" tooltip="Refresh" />
              <IconBtn icon="visibility" tooltip="View" />
              <IconBtn icon="offline_bolt" tooltip="Power Q" />
              <IconBtn icon="print" tooltip="Print" />
              <IconBtn icon="download" tooltip="Download" />
              <IconBtn icon="share" tooltip="Share" />
            </div>

            {/* ADD ON + BACK */}
            <div className="flex items-center gap-3 relative">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenAddOn(!openAddOn)}
                  className=" px-3 py-2 rounded-md bg-[#1aa10a] text-white font-extrabold flex items-center gap-1 text-tiny"
                >
                  Add On
                  <Icon
                    name="keyboard_arrow_down"
                    className="text-[20px] text-white"
                  />
                </button>

                {openAddOn && (
                  <div className="absolute right-0 mt-2 w-[180px] bg-white border border-[#cfd6e4] rounded-md shadow-lg overflow-hidden z-50">
                    <button
                      type="button"
                      className="w-full text-left px-5 py-4 text-tiny font-semibold text-gray-700 hover:bg-gray-100"
                    >
                      Apply Tax
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="px-4 py-2 text-tiny rounded-md border border-[#1aa10a] text-[#1aa10a] font-extrabold bg-white"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        <div>
    
            {/* ===== SECOND ROW (Voucher / Bill / Reverse / Series / Date) ===== */}
            <div className="mt-3  bg-white border border-[#cfd6e4] rounded-md shadow-sm p-3">
              <div className="grid grid-cols-12 gap-4">

                {/* Voucher No */}
                <div className="col-span-2">
                  <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden shadow-sm">
                    <div className="bg-[#f3f6fb] border-r border-[#cfd6e4] px-5 py-2 flex items-center text-tiny font-bold text-[#31374a] min-w-[80px]">
                      Voucher No:
                    </div>

                    <div className="flex-1 px-3 ">
                      <input
                        value={voucherNo}
                        onChange={(e) => setVoucherNo(e.target.value)}
                        className="w-full bg-transparent outline-none text-tiny font-bold text-[#31374a]"
                      />
                    </div>
                  </div>
                </div>

                {/* Bill No */}
                <div className="col-span-2">
                  <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden shadow-sm">
                    <div className="bg-[#f3f6fb] border-r border-[#cfd6e4] px-5 py-2 flex items-center text-tiny font-bold text-[#31374a] min-w-[80px]">
                      Bill No:
                    </div>

                    <div className="flex-1 px-3 ">
                      <input
                        value={billNo}
                        onChange={(e) => setBillNo(e.target.value)}
                        className="w-full bg-transparent outline-none text-tiny font-bold text-[#31374a]"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>

                {/* Reverse Charges */}
                <div className="col-span-2">
                  <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden shadow-sm">
                    <div className="bg-[#f3f6fb] border-r border-[#cfd6e4] px-5 py-2 flex items-center text-tiny font-bold text-[#31374a] min-w-[80px]">
                      Reverse Charges:
                    </div>

                    <div className="flex-1 px-3 ">
                      <select
                        value={reverseCharges}
                        onChange={(e) => setReverseCharges(e.target.value)}
                        className="w-full bg-transparent outline-none text-tiny font-bold text-[#31374a]"
                      >
                        <option>No</option>
                        <option>Yes</option>
                        <option>ECO</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Series */}
                <div className="col-span-3">
                  <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden shadow-sm">
                    <div className="bg-[#f3f6fb] border-r border-[#cfd6e4] px-5 py-2 flex items-center text-tiny font-bold text-[#31374a] min-w-[80px]">
                      Series:
                    </div>

                    <div className="flex-1 px-3 ">
                      <select
                        value={series}
                        onChange={(e) => setSeries(e.target.value)}
                        className="w-full bg-transparent outline-none text-tiny font-bold text-[#31374a]"
                      >
                        <option>Main</option>
                        <option>Alt</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-3">
                  <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden shadow-sm">
                    <div className="bg-[#f3f6fb] border-r border-[#cfd6e4] px-5 py-2 flex items-center text-tiny font-bold text-[#31374a] min-w-[80px]">
                      Date:
                    </div>

                    <div className="flex-1 px-3 ">
                      <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-transparent outline-none text-tiny font-bold text-[#31374a]"
                      />
                    </div>

                    {/* Calendar icon */}
                    <button
                      type="button"
                      className="w-[56px] py-2 flex items-center justify-center border-l border-[#cfd6e4] bg-white"
                    >
                      <span className="material-symbols-outlined text-[22px] text-[#111827]">
                        calendar_month
                      </span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* ===== 2nd ROW (Party + POS + MC + Ecommerce Operator) ===== */}
            <div className="mt-3  bg-white border border-[#cfd6e4] rounded-md shadow-sm p-3">
              <div className="grid grid-cols-12 gap-4">

                {/* Party */}
                <div className="col-span-3">
                  <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden shadow-sm">
                    <div className="bg-[#f3f6fb] border-r border-[#cfd6e4] px-5 py-2 flex items-center text-tiny font-bold text-[#31374a] min-w-[80px]">
                      Party:
                    </div>

                    <input
                      type="text"
                      placeholder=""
                      className="flex-1 px-3 py-2 bg-transparent outline-none text-tiny font-bold text-[#31374a]"
                    />
                  </div>
                </div>

                {/* POS */}
                <div className="col-span-3">
                  <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden shadow-sm">
                    <div className="bg-[#f3f6fb] border-r border-[#cfd6e4] px-5 py-2 flex items-center text-tiny font-bold text-[#31374a] min-w-[80px]">
                      POS:
                    </div>

                    <select
                      defaultValue="Choose"
                      className="flex-1 px-3 py-2 bg-transparent outline-none text-tiny font-bold text-[#31374a]"
                    >
                      <option>Choose</option>
                      <option>Delhi</option>
                      <option>Mumbai</option>
                    </select>
                  </div>
                </div>

                {/* MC */}
                <div className="col-span-3">
                  <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden shadow-sm">
                    <div className="bg-[#f3f6fb] border-r border-[#cfd6e4] px-5 py-2 flex items-center text-tiny font-bold text-[#31374a] min-w-[80px]">
                      MC:
                    </div>

                    <select
                      defaultValue="Main"
                      className="flex-1 px-3 py-2 bg-transparent outline-none text-tiny font-bold text-[#31374a]"
                    >
                      <option>Main</option>
                      <option>Branch</option>
                    </select>
                  </div>
                </div>

                {/* Ecommerce Operator */}
                <div className="col-span-3">
                  <div className="flex items-center bg-white border border-[#cfd6e4] rounded-md overflow-hidden shadow-sm">
                    <div className="bg-[#f3f6fb] border-r border-[#cfd6e4] px-5 py-2 flex items-center text-tiny font-bold text-[#31374a] min-w-[150px]">
                      Ecommerce Operator:
                    </div>

                    <select
                      defaultValue="Not Applicable"
                      className="flex-1 px-3 py-2 bg-transparent outline-none text-tiny font-bold text-[#31374a]"
                    >
                      <option>Not Applicable</option>
                      <option>Amazon</option>
                      <option>Flipkart</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-3  bg-white border border-[#cfd6e4] rounded-md shadow-sm p-3">
              <div className="bg-white border border-[#cfd6e4] rounded-md shadow-sm overflow-hidden">
                <div className="flex items-stretch">
                  {/* Label */}
                  <div className="min-w-[100px] bg-[#f3f6fb] border-r border-[#cfd6e4] px-5 py-2 text-tiny font-bold text-[#31374a] flex items-center">
                    Narration:
                  </div>

                  {/* Textarea */}
                  <div className="flex-1 px-4 py-1 focus-within:ring-2 focus-within:ring-[#3b82f6]">
                    <textarea
                      rows={2}
                      className="w-full bg-transparent outline-none focus:outline-none text-tiny font-bold text-[#31374a] resize-none"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3  overflow-hidden">
              <SaleInvoiceItemsGrid />
            </div>



        </div>

      </div>
    </div>
  );
};

export default SaleInvoice;
