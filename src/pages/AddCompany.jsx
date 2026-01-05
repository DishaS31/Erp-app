import React from "react";

const AddCompany = () => {
  return (
    <div className="p-6   pt-0 min-h-screen text-[#141824] font-sans">

      <h1 className="text-2xl font-extrabold mb-6">Add A Company</h1>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[#31374a]">

        {/* COMPANY DETAILS */}
      <section className="bg-white p-5 rounded-xl border border-[#cbd0dd] focus-input">

        <div className="space-y-4">

          {/* Company Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="font-medium text-sm col-span-1">
              Company Name
            </label>

            <input
              className="col-span-3 border rounded-md px-3 py-2 border-[#cbd0dd] focus-input"
            />
          </div>

          {/* Print Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="font-medium text-sm col-span-1">
              Print Name
            </label>

            <input
              className="col-span-3 border rounded-md px-3 py-2 border-[#cbd0dd] focus-input"
            />
          </div>

          {/* Short Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="font-medium text-sm col-span-1">
              Short Name
            </label>

            <input
              className="col-span-3 border rounded-md px-3 py-2 border-[#cbd0dd] focus-input"
            />
          </div>

          {/* Fy Year */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="font-medium text-sm col-span-1">
              Fy. Year
            </label>

            <div className="col-span-3 flex gap-2">
              <input
                className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input placeholder:text-[12px]"
                defaultValue="01-04-2025"
              />
              <input
                className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input placeholder:text-[12px]"
                defaultValue="31-03-2026"
              />
            </div>
          </div>

        </div>

      </section>

        {/* GST INFO */}
        <section className="bg-white p-5 rounded-xl shadow-sm border border-[#cbd0dd] focus-input">
          <h2 className="font-bold mb-4 text-[16px]">GST Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">PAN</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Comp. W/A No</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">CIN</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Industry</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Comp. Email</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Nature of Work</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className="md:col-span-2 flex gap-1">
              <label className="text-sm font-semibold w-16">Comp. Tel</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>
          </div>
        </section>

        {/* GENERAL INFO */}
        <section className="bg-white p-5 rounded-xl shadow-sm border">
              <h2 className="font-bold mb-4 text-[16px]">General Info</h2>

            <div className="space-y-4">

            
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="font-medium text-sm col-span-1">
                    Industry Type
                    </label>

                    <input
                      className="col-span-3 border rounded-md px-3 py-2 border-[#cbd0dd] focus-input"
                    />
                  </div>

              
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="font-medium text-sm col-span-1">
                    Nature of Work
                    </label>

                    <input
                      className="col-span-3 border rounded-md px-3 py-2 border-[#cbd0dd] focus-input"
                    />
                  </div>
            </div>
        </section>

        {/* AUDITOR DETAILS */}
       <section className="bg-white p-5 rounded-xl shadow-sm border border-[#cbd0dd] focus-input">
            <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-[16px]">Auditor Details</h2>
            <button className="px-3 py-1 text-xs bg-gray-900 text-white rounded-md">
              + Add more
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">First Name</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Last Name</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Email</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">W/A No</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Mobile</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">MRN</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>
            
             <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Frn Name</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Frn No</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>
           
          </div>
        </section>

        {/* RO ADDRESS */}
      <section className="bg-white p-5 rounded-xl shadow-sm border border-[#cbd0dd] focus-input">
            <h2 className="font-bold text-[16px] mb-2">Ro. Address</h2>
          
       

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="md:col-span-2 flex gap-1">
              <label className="text-sm font-semibold w-28">Address line 1</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className="md:col-span-2 flex gap-1">
              <label className="text-sm font-semibold  w-28">Address line 2</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-40">Country</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-40">State</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-40">City</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-40">PIN</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>
            
             
           
          </div>
        </section>

        {/* ACCOUNTANT DETAILS */}
        <section className="bg-white p-5 rounded-xl shadow-sm border border-[#cbd0dd] focus-input">
            <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-[16px]">Accountant Details</h2>
            <button className="px-3 py-1 text-xs bg-gray-900 text-white rounded-md">
              + Add more
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">First Name</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Last Name</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Email</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">W/A No</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Mobile</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

           
           
          </div>
        </section>

         {/* (**New Section**) Shareholder Details */}
        <section className="bg-white p-5 rounded-xl shadow-sm border border-[#cbd0dd] focus-input">
            <div className=" mb-2">
            <h2 className="font-bold text-[16px]"> <span className="text-primary text-tiny">(**New Section**)</span> Shareholder Details</h2>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">First Name</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Last Name</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Email</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">W/A No</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Mobile</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

           
           
          </div>
        </section>

         {/* (**New Section**) Owner Details */}
        <section className="bg-white p-5 rounded-xl shadow-sm border border-[#cbd0dd] focus-input">
            <div className="mb-2">
            <h2 className="font-bold text-[16px]"> <span className="text-primary text-tiny">(**New Section**)</span> Owner Details</h2>
           
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">First Name</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Last Name</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Email</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">W/A No</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

            <div className=" flex gap-1">
              <label className="text-sm font-semibold w-20">Mobile</label>
              <input className="w-full border rounded-md px-3 py-2 border-[#cbd0dd] focus-input" />
            </div>

           
           
          </div>
        </section>

      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-4 mt-6">
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-md font-bold text-tiny ">
          SAVE
        </button>

        <button className="px-6 py-2.5 bg-gray-900 text-white rounded-md font-bold text-tiny">
          QUIT
        </button>
      </div>
    </div>
  );
};

export default AddCompany;
