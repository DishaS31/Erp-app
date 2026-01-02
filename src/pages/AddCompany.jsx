const Addcompany = () => {
  return (
     <div className="bg-white p-6 rounded shadow max-w-4xl">
      <h2 className="text-lg font-bold mb-4">Add Company</h2>

      <div className="grid grid-cols-2 gap-4">
        <input className="input" placeholder="Company Name" />
        <input className="input" placeholder="Print Name" />
        <input className="input" placeholder="Short Name" />
        <input className="input" placeholder="FY Year" />
      </div>

      <button className="mt-4 btn">Save Company</button>
    </div>
  );
};

export default Addcompany;
