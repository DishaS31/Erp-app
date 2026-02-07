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
import PaymentVoucher from "./pages/Dashboard/Transactions/PaymentVoucher";
import ReceiptVoucher from "./pages/Dashboard/Transactions/ReceiptVoucher";
import ContraVoucher from "./pages/Dashboard/Transactions/ContraVoucher";
import JournalVoucher from"./pages/Dashboard/Transactions/JournalVoucher";
import MemorandumVoucher from "./pages/Dashboard/Transactions/MemorandumVoucher";
import InventoryStatus from "./pages/Dashboard/Reports/InventoryStatus";
import DayBook from "./pages/Dashboard/Reports/DayBook";
import BalanceSheet from "./pages/Dashboard/Reports/BalanceSheet";
import ProfitLoss from "./pages/Dashboard/Reports/ProfitLoss";
import TrialBalance from "./pages/Dashboard/Reports/TrialBalance";
import AccountGroupList from "./pages/Dashboard/Reports/AccountGroupList";
import AccountLedger from "./pages/Dashboard/Reports/AccountLedger";
import StockLedger from "./pages/Dashboard/Reports/StockLedger";
import GstSummary from "./pages/Dashboard/GST/GstSummary";




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
        <Route path="transactions/payments"  element={<PaymentVoucher />}/>
        <Route path="transactions/receipts" element={<ReceiptVoucher />} />
        <Route path="transactions/contra" element={<ContraVoucher />} />
        <Route path="transactions/journal" element={<JournalVoucher />}/>
        <Route path="transactions/memorandum" element={<MemorandumVoucher />} />
        <Route path="reports/inventory-status" element={<InventoryStatus />} />
        <Route path="reports/day-book" element={<DayBook />} />
        <Route path="reports/balance-sheet" element={<BalanceSheet />} />
        <Route path="reports/profit-loss" element={<ProfitLoss />} />
        <Route path="reports/trial-balance" element={<TrialBalance />} />
        <Route path="reports/account-ledger" element={<AccountLedger />} />
        <Route path="reports/stock-ledger"element={<StockLedger />}/>
        <Route path="reports/account-group-list" element={<AccountGroupList />} />
        <Route path="gst/gst-summary" element={<GstSummary />}/>


      </Route>

    </Routes>
  );
};

export default App;
