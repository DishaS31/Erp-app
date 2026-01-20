import { useState } from "react";
import CompaniesAgGrid from "../components/CompaniesAgGrid";

export default function MyCompany() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <CompaniesAgGrid
      filter="mine"
      onSelectCompany={(row) => {
        setSelectedCompany(row);
        console.log("Selected Company (MY) ✅", row);
        console.log("Selected Company ID ✅", row?.comp_id);
      }}
    />
  );
}
