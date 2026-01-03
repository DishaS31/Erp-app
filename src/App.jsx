import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AllCompanies from "./pages/AllCompanies";
import MyCompany from "./pages/MyCompany"
import SharedCompanies from "./pages/SharedCompanies";
import AddCompany from "./pages/AddCompany";

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

          <Route path="shared" element={<SharedCompanies />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
