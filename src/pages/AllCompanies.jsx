import { Link } from "react-router-dom";

const AllCompanies = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="mb-3 font-semibold">All Companies Table</p>

      <Link
        to="/company/dashboard"
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default AllCompanies;
