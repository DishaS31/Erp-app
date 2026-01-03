import React from "react";

const AddCompany = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-extrabold mb-6">Add A Company</h1>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* COMPANY DETAILS */}
        <section className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="font-bold mb-4 text-lg">Company Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-semibold">Company Name</label>
              <input className="w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-semibold">Print Name</label>
              <input className="w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-semibold">Short Name</label>
              <input className="w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-semibold">Fy. Year</label>

              <div className="flex gap-2">
                <input
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue="01-04-2025"
                />
                <input
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue="31-03-2026"
                />
              </div>
            </div>

          </div>
        </section>

        {/* GST INFO */}
        <section className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="font-bold mb-4 text-lg">GST Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">PAN</label>
              <input className="w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-semibold">Comp. W/A No</label>
              <input className="w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-semibold">CIN</label>
              <input className="w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-semibold">Industry</label>
              <input className="w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-semibold">Comp. Email</label>
              <input className="w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-semibold">Nature of Work</label>
              <input className="w-full border rounded-md px-3 py-2" />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Comp. Tel</label>
              <input className="w-full border rounded-md px-3 py-2" />
            </div>
          </div>
        </section>

        {/* GENERAL INFO */}
        <section className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="font-bold mb-4 text-lg">General Info</h2>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-semibold">Industry Type</label>
              <input className="w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-semibold">Nature of Work</label>
              <input className="w-full border rounded-md px-3 py-2" />
            </div>
          </div>
        </section>

        {/* AUDITOR DETAILS */}
        <section className="bg-white p-5 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg">Auditor Details</h2>
            <button className="px-3 py-1 text-xs bg-gray-900 text-white rounded-md">
              + Add more
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="First Name" className="border rounded-md px-3 py-2" />
            <input placeholder="Last Name" className="border rounded-md px-3 py-2" />
            <input placeholder="Email" className="border rounded-md px-3 py-2" />
            <input placeholder="W/A No" className="border rounded-md px-3 py-2" />
            <input placeholder="Mobile" className="border rounded-md px-3 py-2" />
          </div>
        </section>

        {/* RO ADDRESS */}
        <section className="bg-white p-5 rounded-xl shadow-sm border">
          <h2 className="font-bold text-lg mb-3">Ro. Address</h2>

          <div className="grid grid-cols-1 gap-3">
            <input placeholder="Address line 1" className="border rounded-md px-3 py-2" />
            <input placeholder="Address line 2" className="border rounded-md px-3 py-2" />

            <div className="flex gap-2">
              <select className="border rounded-md px-3 py-2 w-full">
                <option>India</option>
              </select>

              <select className="border rounded-md px-3 py-2 w-full">
                <option>Andaman & Nicobar</option>
              </select>
            </div>

            <div className="flex gap-2">
              <input placeholder="City" className="border rounded-md px-3 py-2 w-full" />
              <input placeholder="Pin code" className="border rounded-md px-3 py-2 w-full" />
            </div>
          </div>
        </section>

        {/* ACCOUNTANT DETAILS */}
        <section className="bg-white p-5 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg">Accountant Details</h2>
            <button className="px-3 py-1 text-xs bg-gray-900 text-white rounded-md">
              + Add more
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="First Name" className="border rounded-md px-3 py-2" />
            <input placeholder="Last Name" className="border rounded-md px-3 py-2" />
            <input placeholder="Email" className="border rounded-md px-3 py-2" />
            <input placeholder="W/A No" className="border rounded-md px-3 py-2" />
            <input placeholder="Mobile" className="border rounded-md px-3 py-2" />
          </div>
        </section>

      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-4 mt-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md font-bold">
          SAVE
        </button>

        <button className="px-6 py-2 bg-gray-900 text-white rounded-md font-bold">
          QUIT
        </button>
      </div>
    </div>
  );
};

export default AddCompany;
