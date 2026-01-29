import { Routes, Route, Navigate } from "react-router-dom";

// NORMAL APP
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AllCompanies from "./pages/AllCompanies";
import MyCompany from "./pages/MyCompany";
import SharedCompanies from "./pages/SharedCompanies";
import AddCompany from "./pages/AddCompany";
import EditCompany from "./pages/EditCompany";
import RecycleBin from "./pages/RecycleBin";
import CompanyAccess from "./pages/CompanyAccess";




// DASHBOARD
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import SaleInvoice from "./pages/Dashboard/Transactions/SaleInvoice";
import InventoryStatus from "./pages/Dashboard/Reports/InventoryStatus";



const App = () => {
  return (
    <Routes>

      {/* 🔹 NORMAL APP LAYOUT */}
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/company/all" />} />

        <Route path="company" element={<Home />}>
          <Route path="all" element={<AllCompanies />} />
          <Route path="all/add" element={<AddCompany />} />

          <Route path="my" element={<MyCompany />} />
          <Route path="my/add" element={<AddCompany />} />
           <Route path="edit/:id" element={<EditCompany />} />

          <Route path="shared" element={<SharedCompanies />} />
          <Route path="recycle-bin" element={<RecycleBin />} />
          <Route path="access" element={<CompanyAccess />} />

        </Route>
      </Route>

      {/* 🔥 DASHBOARD LAYOUT (COMPLETELY SEPARATE) */}
      <Route path="company/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions/sale-invoice" element={<SaleInvoice />} />
         <Route path="reports/inventory-status" element={<InventoryStatus />} />
      </Route>

    </Routes>
  );
};

export default App;
