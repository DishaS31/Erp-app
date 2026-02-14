import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAccountGroup() {
  const navigate = useNavigate();
  const { id } = useParams(); // get ID from URL

  return (
    <div className="min-h-screen  px-10 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Edit A Group
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="h-[34px] px-4 border border-primary text-primary font-semibold rounded-md text-sm bg-white hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

      {/* FORM CARD */}
      <div className=" p-8 w-[650px]">

        <FormRow label="Name" required defaultValue="Capital Account" />
        <FormRow label="Alias" required defaultValue="Capital Account" />

        {/* PRIMARY RADIO */}
        <div className="grid grid-cols-[180px_1fr] items-center mb-4">
          <label className="text-[14px] font-semibold text-black">
            Primary <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center gap-8 text-[14px] font-semibold">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="primary"
                className="w-[14px] h-[14px]"
                defaultChecked
              />
              Yes
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="primary"
                className="w-[14px] h-[14px]"
              />
              No
            </label>
          </div>
        </div>

        <FormRow label="Under" defaultValue="" />

        {/* SAVE / QUIT */}
        <div className="flex gap-4 mt-6 justify-center">
          <button className="px-6 h-[36px] bg-primary text-white font-bold rounded-md text-sm">
            UPDATE
          </button>

          <button
            onClick={() => navigate(-1)}
            className="px-6 h-[36px] bg-[#2d3748] text-white font-bold rounded-md text-sm"
          >
            QUIT
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== REUSABLE FORM ROW ===== */
const FormRow = ({ label, required, defaultValue }) => (
  <div className="grid grid-cols-[180px_1fr] items-center mb-4">
    <label className="text-[14px] font-semibold text-black">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    <input
      defaultValue={defaultValue}
      className="h-[34px] border border-[#d1d5db] rounded-md px-3 text-[14px] focus:outline-none focus:ring-1 focus:ring-primary"
      type="text"
    />
  </div>
);
