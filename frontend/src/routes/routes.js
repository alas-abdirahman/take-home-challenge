import React from "react";
import { Route, Routes } from "react-router-dom";
import BeneficiaryList from "../pages/beneficiaries/beneficiaryList";

const BeneficiaryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BeneficiaryList />} />
      {/* <Route path="/beneficiaries/new" element={<BeneficiaryForm />} /> */}
      {/* <Route path="/beneficiaries/:id" element={<BeneficiaryDetails />} /> */}
    </Routes>
  );
};

export default BeneficiaryRoutes;