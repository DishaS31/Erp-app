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
import Accounts from "./pages/Dashboard/Masters/Accounts";
import AccountGroups from "./pages/Dashboard/Masters/AccountGroups";
import Items from "./pages/Dashboard/Masters/Items";
import ItemGroups from "./pages/Dashboard/Masters/ItemGroups";
import Units from "./pages/Dashboard/Masters/Units";
import StockCategory from "./pages/Dashboard/Masters/StockCategory";
import MaterialCentres from "./pages/Dashboard/Masters/MaterialCentres";
import MaterialCentreGroups from "./pages/Dashboard/Masters/MaterialCentreGroups";
import AddMaterialCentre from "./pages/Dashboard/Masters/AddMaterialCentre";
import EditMaterialCentre from "./pages/Dashboard/Masters/EditMaterialCentre";
import AddMaterialCentreGroup from "./pages/Dashboard/Masters/AddMaterialCentreGroup";
import EditMaterialCentreGroup from "./pages/Dashboard/Masters/EditMaterialCentreGroup";
import AddStockCategory from "./pages/Dashboard/Masters/AddStockCategory";
import EditStockCategory from "./pages/Dashboard/Masters/EditStockCategory";
import AddUnit from "./pages/Dashboard/Masters/AddUnit";
import EditUnit from "./pages/Dashboard/Masters/EditUnit";
import AddItemGroup from "./pages/Dashboard/Masters/AddItemGroup";
import EditItemGroup from "./pages/Dashboard/Masters/EditItemGroup";
import AddItem from "./pages/Dashboard/Masters/AddItem";
import EditItem from "./pages/Dashboard/Masters/EditItem";
import AddAccountGroup from "./pages/Dashboard/Masters/AddAccountGroup";
import EditAccountGroup from "./pages/Dashboard/Masters/EditAccountGroup";
import AddAccount from "./pages/Dashboard/Masters/AddAccount";
import EditAccount from "./pages/Dashboard/Masters/EditAccount";
import VoucherSeries from "./pages/Dashboard/Masters/VoucherSeries";
import AddVoucherSeries from "./pages/Dashboard/Masters/AddVoucherSeries";
import EditVoucherSeries from "./pages/Dashboard/Masters/EditVoucherSeries";
import BillSundry from "./pages/Dashboard/Masters/BillSundry";
import AddBillSundry from "./pages/Dashboard/Masters/AddBillSundry";
import EditBillSundry from "./pages/Dashboard/Masters/EditBillSundry";
import TaxCategory from "./pages/Dashboard/Masters/TaxCategory";
import AddTaxCategory from "./pages/Dashboard/Masters/AddTaxCategory";
import EditTaxCategory from "./pages/Dashboard/Masters/EditTaxCategory";
import CostCentre from "./pages/Dashboard/Masters/CostCentre";
import AddCostCentre from "./pages/Dashboard/Masters/AddCostCentre";
import EditCostCentre from "./pages/Dashboard/Masters/EditCostCentre";
import CostCentreGroups from "./pages/Dashboard/Masters/CostCentreGroups";
import AddCostCentreGroup from "./pages/Dashboard/Masters/AddCostCentreGroup";
import EditCostCentreGroup from "./pages/Dashboard/Masters/EditCostCentreGroup";
import Projects from "./pages/Dashboard/Masters/Projects";
import AddProject from "./pages/Dashboard/Masters/AddProject";
import EditProject from "./pages/Dashboard/Masters/EditProject";
import ProjectGroups from "./pages/Dashboard/Masters/ProjectGroups";
import AddProjectGroup from "./pages/Dashboard/Masters/AddProjectGroup";
import EditProjectGroup from "./pages/Dashboard/Masters/EditProjectGroup";
import BillByBill from "./pages/Dashboard/Masters/BillByBill";
import SubLedger from "./pages/Dashboard/Masters/SubLedger";
import BulkUpdation from "./pages/Dashboard/Masters/BulkUpdation";
import SalesRegister from "./pages/Dashboard/Register/SalesRegister";
import PurchaseRegister from "./pages/Dashboard/Register/PurchaseRegister";
import SalesReturnRegister from "./pages/Dashboard/Register/SalesReturnRegister";
import PurchaseReturnRegister from "./pages/Dashboard/Register/PurchaseReturnRegister";
import PaymentRegister from "./pages/Dashboard/Register/PaymentRegister";
import ReceiptRegister from "./pages/Dashboard/Register/ReceiptRegister";
import ContraRegister from "./pages/Dashboard/Register/ContraRegister";
import JournalRegister from "./pages/Dashboard/Register/JournalRegister";
import OtherRegisters from "./pages/Dashboard/Register/OtherRegisters";
import MemorandumRegister from "./pages/Dashboard/Register/MemorandumRegister";
import OptionalRegister from "./pages/Dashboard/Register/OptionalRegister";
import SystemJournalRegister from "./pages/Dashboard/Register/SystemJournalRegister";
import AccountSummary from "./pages/Dashboard/Reports/AccountSummary";
import AccountSummaryView from "./pages/Dashboard/Reports/AccountSummaryView";
import StockSummary from "./pages/Dashboard/Reports/StockSummary";
import StockSummaryView from "./pages/Dashboard/Reports/StockSummaryView";







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
        <Route path="masters/accounts" element={<Accounts />} />
        <Route path="masters/account-groups" element={<AccountGroups />}/>
        <Route path="masters/items" element={<Items />}/>
        <Route path="masters/item-groups" element={<ItemGroups />}/>
        <Route path="masters/units" element={<Units />} />
        <Route path="masters/stock-category" element={<StockCategory />}/>
        <Route path="masters/material-centres"  element={<MaterialCentres />}/>
        <Route path="masters/material-centre-groups"  element={<MaterialCentreGroups />}/>
        <Route path="masters/add-material-centre"  element={<AddMaterialCentre />}/>
        <Route path="masters/material-centres/edit" element={<EditMaterialCentre />} />
        <Route path="masters/add-material-centre-group" element={<AddMaterialCentreGroup />}/>
        <Route path="masters/material-centre-groups/edit/:id" element={<EditMaterialCentreGroup />}/>
        <Route path="masters/add-stock-category"  element={<AddStockCategory />}/>
        <Route path="masters/stock-category/edit/:id"  element={<EditStockCategory />}/>
        <Route path="masters/units/add" element={<AddUnit />}/>
        <Route path="masters/units/edit/:id" element={<EditUnit />}/>
        <Route path="masters/item-groups/add"  element={<AddItemGroup />}/>
        <Route path="masters/item-groups/edit" element={<EditItemGroup />}/>
        <Route path="masters/items/add" element={<AddItem />} />
        <Route path="masters/items/edit/:id" element={<EditItem />}/>
        <Route path="masters/account-groups/add" element={<AddAccountGroup />} />
        <Route path="masters/account-groups/edit/:id" element={<EditAccountGroup />} />
        <Route path="masters/accounts/add" element={<AddAccount />} />
        <Route path="masters/accounts/edit/:id" element={<EditAccount />} />
        <Route path="masters/voucher-series" element={<VoucherSeries />} />
        <Route path="masters/voucher-series/add" element={<AddVoucherSeries />} />
        <Route path="masters/voucher-series/edit/:id" element={<EditVoucherSeries />}/>
        <Route path="masters/bill-sundry" element={<BillSundry />}/>
        <Route path="masters/bill-sundry/add" element={<AddBillSundry />} />
        <Route path="masters/bill-sundry/edit" element={<EditBillSundry />} />
        <Route path="masters/tax-category" element={<TaxCategory />} />
        <Route path="masters/tax-category/add" element={<AddTaxCategory />} />
        <Route path="masters/tax-category/edit/:id" element={<EditTaxCategory />} />
        <Route path="masters/cost-centre" element={<CostCentre />} />
        <Route path="masters/cost-centre/add" element={<AddCostCentre />} />
        <Route path="masters/cost-centre/edit" element={<EditCostCentre />} />
        <Route path="masters/cost-centre-groups" element={<CostCentreGroups />} />
        <Route path="masters/cost-centre-groups/add" element={<AddCostCentreGroup />}/>
        <Route path="masters/cost-centre-groups/edit" element={<EditCostCentreGroup />} />
        <Route path="masters/projects" element={<Projects />} />
        <Route path="masters/projects/add" element={<AddProject />} />
        <Route path="masters/projects/edit/:id" element={<EditProject />} />
        <Route path="masters/project-groups" element={<ProjectGroups />}/>
        <Route path="masters/project-groups/add"  element={<AddProjectGroup />}/>
        <Route path="masters/project-groups/edit/:id" element={<EditProjectGroup />}/>
        <Route path="masters/bill-by-bill" element={<BillByBill />} />
        <Route path="masters/sub-ledger" element={<SubLedger />}/>
        <Route path="masters/bulk-updation" element={<BulkUpdation />}/>
        <Route path="register/sales-register"  element={<SalesRegister />}/>
        <Route path="register/purchase-register" element={<PurchaseRegister />}/>
        <Route path="register/sales-return-register"  element={<SalesReturnRegister />}/>
        <Route path="register/purchase-return-register"  element={<PurchaseReturnRegister />}/>
        <Route path="register/payment-register"  element={<PaymentRegister />}/>
        <Route path="register/receipt-register" element={<ReceiptRegister />}/>
        <Route path="register/contra-register" element={<ContraRegister />} />
        <Route path="register/journal-register" element={<JournalRegister />} />
        <Route path="register/other-acc-register" element={<OtherRegisters />}/>
        <Route path="register/memorandum-register"  element={<MemorandumRegister />}/>
        <Route path="register/optional-register" element={<OptionalRegister />} />
        <Route path="register/system-journal-register" element={<SystemJournalRegister />} />
        <Route path="reports/account-summary" element={<AccountSummary />} />
        <Route path="reports/account-summary/view" element={<AccountSummaryView />} />
        <Route path="reports/stock-summary" element={<StockSummary />} />
        <Route path="reports/stock-summary/view" element={<StockSummaryView />} />






        

      </Route>

    </Routes>
  );
};

export default App;
