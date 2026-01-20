import { useState } from "react";
import CompaniesAgGrid from "../components/CompaniesAgGrid";

export default function SharedCompanies() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <CompaniesAgGrid
      filter="shared"
      onSelectCompany={(row) => {
        setSelectedCompany(row);
        console.log("Selected Company (SHARED) ✅", row);
        console.log("Selected Company ID ✅", row?.comp_id);
      }}
    />
  );
}
