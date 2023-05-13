import React, {  useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CheckUserLoginContext, DataContext } from "../../App";
import {
  ToAccount,
  FromAccount,
  TransactionType,
  MonthYear,
} from "../../utils/constants";
import Tables from "./components/Tables";

export default function AllTransactions() {

    //const [contextLocaldata,setContextLocalData] = useContext(DataContext)
    const [isUserLogin, setIsUserLogin] = useContext(CheckUserLoginContext);
    const navigate = useNavigate();
    const Transections = useSelector((state) => state.Transections);
    
  let localData = Transections;
  //contextLocaldata 
  //JSON.parse(localStorage.getItem("data"));
  
  const [data, setData] = useState(localData);

  const [orderBy, setOrderBy] = useState([]);
  const [tableTitle, setTablrTitle] = useState(null);

const helperOrderBy = (Arr, field) => {
  const a = [];

  Arr.map((transection) => {
    return (
      data &&
      a.push(
        data.filter((val) => {
          return val[field] === transection;
        })
      )
    );
  });

  return a;
};

  const handelOrderBy = (e) => {
  

    const a = [];
    setTablrTitle(e.target.value);
   
    switch (e.target.value) {
      case "MonthYear": {
       a.push( ...helperOrderBy(MonthYear, e.target.value))
      
        break;
      }
      case "TransactionType": {
         a.push(...helperOrderBy(TransactionType, e.target.value));
        break;
      }

      case "ToAccount": {
         a.push(...helperOrderBy(ToAccount, e.target.value));
        break;
      }

      case "FromAccount": {
         a.push(...helperOrderBy(FromAccount, e.target.value));
    
        break;
      }
      default: {
        a.push(data);
      }
    }
    
    setOrderBy([...a.filter((ele) => ele.length !== 0)]);
  };


  

  return (
    <>
      <div>
        <Link to="/addtransaction">Add new Transection</Link>
        {/* <Link to="/login">Login</Link> */}

        <select
          name="orderBy"
          id=""
          onChange={(e) => {
            handelOrderBy(e);
          }}
        >
          <option value="" disabled hidden>
            select{" "}
          </option>
          <option value="none">none </option>
          <option value="MonthYear">Month Year </option>
          <option value="TransactionType">Transaction Type </option>
          <option value="FromAccount">From Account </option>
          <option value="ToAccount">To Account</option>
        </select>

        <button
          onClick={() => {
            setIsUserLogin(false);
            //localStorage.removeItem("isUserLoggedIn");
            //localStorage.removeItem("currentLoginuser");
            navigate("/login");
          }}
        >
          Log Out
        </button>

        {localData && orderBy.length === 0 ? (
          <div>
            <Tables local_Data={data} tableTitle={tableTitle} />
          </div>
        ) : (
          orderBy.map((value, index) => {
            return (
              <div key={index}>
                <Tables local_Data={value} tableTitle={tableTitle} />

                <hr />
                <hr />
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
