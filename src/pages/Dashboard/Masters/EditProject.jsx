import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    alias: "",
    printName: "",
    group: "",
    liabilityOp: "",
    liabilityType: "Dr",
    liabilityPy: "",
    liabilityPyType: "Dr",
    assetOp: "",
    assetType: "Dr",
    assetPy: "",
    assetPyType: "Dr",
  });

  // 🔹 Dummy Prefill (Replace with API later)
  useEffect(() => {
    if (id) {
      setForm({
        name: "Sample Project",
        alias: "SP01",
        printName: "Sample Project Pvt Ltd",
        group: "Main Group",
        liabilityOp: "1000",
        liabilityType: "Dr",
        liabilityPy: "500",
        liabilityPyType: "Cr",
        assetOp: "2000",
        assetType: "Dr",
        assetPy: "800",
        assetPyType: "Dr",
      });
    }
  }, [id]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-10 py-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[28px] font-extrabold text-black">
          Edit Project
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="h-[36px] px-4 border border-primary text-primary
                     font-bold rounded-md bg-white
                     hover:bg-primary hover:text-white transition"
        >
          « Back
        </button>
      </div>

      <div className="max-w-[1050px] mx-auto">

        {/* ================= GENERAL INFO ================= */}
        <div className="bg-white border border-[#d6d9e0] rounded-lg p-8 mb-8">

          <div className="grid grid-cols-[160px_1fr] gap-y-6 gap-x-8">

            <label className="font-semibold self-center">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="h-[40px] px-4 border border-[#d6d9e0] rounded-md outline-none focus:border-primary"
            />

            <label className="font-semibold self-center">Alias</label>
            <input
              value={form.alias}
              onChange={(e) => handleChange("alias", e.target.value)}
              className="h-[40px] px-4 border border-[#d6d9e0] rounded-md outline-none focus:border-primary"
            />

            <label className="font-semibold self-center">Print Name</label>
            <input
              value={form.printName}
              onChange={(e) => handleChange("printName", e.target.value)}
              className="h-[40px] px-4 border border-[#d6d9e0] rounded-md outline-none focus:border-primary"
            />

            <label className="font-semibold self-center">Group</label>
            <select
              value={form.group}
              onChange={(e) => handleChange("group", e.target.value)}
              className="h-[40px] px-4 border border-[#d6d9e0] rounded-md outline-none focus:border-primary"
            >
              <option>Main Group</option>
              <option>Secondary Group</option>
            </select>

          </div>
        </div>

        {/* ================= LIABILITY + ASSETS ================= */}
        <div className="bg-white border border-[#d6d9e0] rounded-lg p-8">

          <div className="grid grid-cols-2 gap-12">

            {/* LIABILITY */}
            <div>
              <h3 className="text-[18px] font-bold mb-6">Liability</h3>

              <div className="mb-5">
                <label className="block mb-2">Op. Balance</label>
                <div className="flex">
                  <input
                    value={form.liabilityOp}
                    onChange={(e) => handleChange("liabilityOp", e.target.value)}
                    className="flex-1 h-[38px] px-4 border border-[#d6d9e0] rounded-l-md outline-none"
                  />
                  <div className="flex items-center gap-4 px-4 border border-l-0 border-[#d6d9e0] h-[38px] rounded-r-md bg-[#f8f9fb]">
                    <label>
                      <input
                        type="radio"
                        checked={form.liabilityType === "Cr"}
                        onChange={() => handleChange("liabilityType", "Cr")}
                      />{" "}
                      Cr.
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={form.liabilityType === "Dr"}
                        onChange={() => handleChange("liabilityType", "Dr")}
                      />{" "}
                      Dr.
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2">Py. Balance</label>
                <div className="flex">
                  <input
                    value={form.liabilityPy}
                    onChange={(e) => handleChange("liabilityPy", e.target.value)}
                    className="flex-1 h-[38px] px-4 border border-[#d6d9e0] rounded-l-md outline-none"
                  />
                  <div className="flex items-center gap-4 px-4 border border-l-0 border-[#d6d9e0] h-[38px] rounded-r-md bg-[#f8f9fb]">
                    <label>
                      <input
                        type="radio"
                        checked={form.liabilityPyType === "Cr"}
                        onChange={() => handleChange("liabilityPyType", "Cr")}
                      />{" "}
                      Cr.
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={form.liabilityPyType === "Dr"}
                        onChange={() => handleChange("liabilityPyType", "Dr")}
                      />{" "}
                      Dr.
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* ASSETS */}
            <div>
              <h3 className="text-[18px] font-bold mb-6">Assets</h3>

              <div className="mb-5">
                <label className="block mb-2">Op. Balance</label>
                <div className="flex">
                  <input
                    value={form.assetOp}
                    onChange={(e) => handleChange("assetOp", e.target.value)}
                    className="flex-1 h-[38px] px-4 border border-[#d6d9e0] rounded-l-md outline-none"
                  />
                  <div className="flex items-center gap-4 px-4 border border-l-0 border-[#d6d9e0] h-[38px] rounded-r-md bg-[#f8f9fb]">
                    <label>
                      <input
                        type="radio"
                        checked={form.assetType === "Cr"}
                        onChange={() => handleChange("assetType", "Cr")}
                      />{" "}
                      Cr.
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={form.assetType === "Dr"}
                        onChange={() => handleChange("assetType", "Dr")}
                      />{" "}
                      Dr.
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2">Py. Balance</label>
                <div className="flex">
                  <input
                    value={form.assetPy}
                    onChange={(e) => handleChange("assetPy", e.target.value)}
                    className="flex-1 h-[38px] px-4 border border-[#d6d9e0] rounded-l-md outline-none"
                  />
                  <div className="flex items-center gap-4 px-4 border border-l-0 border-[#d6d9e0] h-[38px] rounded-r-md bg-[#f8f9fb]">
                    <label>
                      <input
                        type="radio"
                        checked={form.assetPyType === "Cr"}
                        onChange={() => handleChange("assetPyType", "Cr")}
                      />{" "}
                      Cr.
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={form.assetPyType === "Dr"}
                        onChange={() => handleChange("assetPyType", "Dr")}
                      />{" "}
                      Dr.
                    </label>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex justify-center gap-6 mt-10">
            <button className="h-[38px] px-8 bg-primary text-white font-bold rounded-md">
              UPDATE
            </button>

            <button
              onClick={() => navigate(-1)}
              className="h-[38px] px-8 bg-[#2d3748] text-white font-bold rounded-md"
            >
              QUIT
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
