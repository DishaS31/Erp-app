import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddBillSundry() {
  const navigate = useNavigate();

  const Row = ({ label, required, children }) => (
    <div className="grid grid-cols-[180px_1fr] items-center gap-4">
      <label className="text-[14px] font-semibold text-[#2d3748]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Add Bill Sundry
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="h-[36px] px-5 border border-primary text-primary font-bold rounded-md text-tiny bg-white hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

      {/* ================= TOP SECTION ================= */}
      <div className="grid grid-cols-2 gap-6">

        {/* LEFT CARD */}
        <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] space-y-5">

          <Row label="Name" required>
            <input className="h-[40px] border rounded-md px-3" />
          </Row>

          <Row label="Alias" required>
            <input className="h-[40px] border rounded-md px-3" />
          </Row>

          <Row label="Print Name" required>
            <input className="h-[40px] border rounded-md px-3" />
          </Row>

        </div>

        {/* RIGHT CARD */}
        <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] space-y-5">

          <Row label="Tax Account">
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="tax" defaultChecked />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="tax" />
                No
              </label>
            </div>
          </Row>

          <Row label="IO Types">
            <select className="h-[40px] border rounded-md px-3">
              <option>Input</option>
              <option>Output</option>
            </select>
          </Row>

          <Row label="Tax Category Types">
            <input className="h-[40px] border rounded-md px-3" />
          </Row>

          <Row label="Sub Type">
            <input className="h-[40px] border rounded-md px-3" />
          </Row>

        </div>
      </div>

      {/* ================= PRIMARY SECTION ================= */}
      <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] mt-6 space-y-5 w-1/2">

        <Row label="Primary" required>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" name="primary" defaultChecked />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="primary" />
              No
            </label>
          </div>
        </Row>

        <Row label="Parent Group">
          <select className="h-[40px] border rounded-md px-3">
            <option>Choose</option>
          </select>
        </Row>

      </div>

      {/* ================= PAY DETAILS ================= */}
      <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] mt-6 space-y-5 w-1/2">

        <h2 className="font-bold text-[16px]">Pay Details</h2>

        {["Op. Bal", "P.Y. Bal", "MEMO OP. Bal"].map((label) => (
          <Row key={label} label={label}>
            <div className="flex items-center gap-4 w-full">
              <input
                defaultValue="0.00"
                className="flex-1 h-[40px] border rounded-md px-3"
              />
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input type="radio" name={label} />
                  Cr.
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name={label} defaultChecked />
                  Dr.
                </label>
              </div>
            </div>
          </Row>
        ))}

      </div>

      {/* ================= SAVE BUTTONS ================= */}
      <div className="flex justify-center gap-6 mt-8">
        <button className="px-8 py-2 bg-primary text-white font-bold rounded-md">
          SAVE
        </button>

        <button className="px-8 py-2 bg-[#2f3747] text-white font-bold rounded-md">
          QUIT
        </button>
      </div>

    </div>
  );
}
