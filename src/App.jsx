import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AllCompanies from "./pages/AllCompanies";
import MyCompany from "./pages/MyCompany"
import SharedCompanies from "./pages/SharedCompanies";
import AddCompany from "./pages/AddCompany";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/company/all" />} />

        <Route path="company" element={<Home />}>
          <Route path="all" element={<AllCompanies />} />
          <Route path="all/add" element={<AddCompany />} />

          <Route path="my" element={<MyCompany />} />
          <Route path="my/add" element={<AddCompany />} />

          {/* 🔥 DASHBOARD (DYNAMIC)
          <Route path="all/:companyId" element={<Dashboard />} />
          <Route path="my/:companyId" element={<Dashboard />} />
          <Route path="shared/:companyId" element={<Dashboard />} /> */}

           {/* 🔥 STATIC DASHBOARD */}

          <Route path="shared" element={<SharedCompanies />} />
          
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
            </Route>

        </Route>
        

      </Route>
    </Routes>
  );
};

export default App;
