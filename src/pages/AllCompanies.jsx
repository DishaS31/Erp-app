import { useState } from "react";
import CompaniesAgGrid from "../components/CompaniesAgGrid";

export default function AllCompanies() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <CompaniesAgGrid
      filter="all"
      onSelectCompany={(row) => {
        setSelectedCompany(row);
        console.log("Selected Company ✅", row);
      }}
    />
  );
}
