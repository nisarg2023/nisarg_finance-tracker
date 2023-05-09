import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AddTransaction from "../pages/AddTransaction/AddTransaction";
import AllTransactions from "../pages/AllTransactions/AllTransactions";
import UpdateTransaction from "../pages/UpdateTransaction/UpdateTransaction";
import ViewTransaction from "../pages/ViewTransaction/ViewTransaction";
import withAuth from "./HOC/Auth";
import { Navigate, useNavigate } from "react-router-dom";
import { AddTransactionYupReactFormHook } from "../pages/AddTransactionYupReactFormHook/AddTransactionYupReactFormHook";

function ProtectedRouteComponent(props) {
  const navigate = useNavigate();
 

  useEffect(() => {
    if (!props.isUserLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {props.isUserLogin && (
        <Routes>
          {/* <Route path="/addtransaction" element={<AddTransaction />} /> */}
          <Route
            path="/addtransaction"
            element={<AddTransactionYupReactFormHook />}
          />
          <Route path="/" element={<AllTransactions />} />
          <Route path="/view/:id" element={<ViewTransaction />} />
          <Route path="/update/:id" element={<UpdateTransaction />} />
        </Routes>
      )}
    </>
  );
}
export default withAuth(ProtectedRouteComponent);
