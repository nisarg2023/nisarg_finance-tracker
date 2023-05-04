import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ToAccount,
  FromAccount,
  TransactionType,
  MonthYear,
} from "../AddTransaction/AddTransaction";
import Tables from "./components/Tables";

export default function AllTransactions() {

    const navigate = useNavigate();
  let localData = JSON.parse(localStorage.getItem("data"));
  
  const [data, setData] = useState(localData);

  const [orderBy, setOrderBy] = useState([]);
  const [tableTitle, setTablrTitle] = useState(null);

  const handelOrderBy = (e) => {
    console.log(e.target.value);

    const a = [];
    setTablrTitle(e.target.value)
    switch (e.target.value) {
      case "MonthYear": {
        MonthYear.map((transection) => {
          return data && a.push(
             data.filter((val) => {
              return val[e.target.value] === transection;
            })
          );
        });

        break;
      }
      case "TransactionType": {
        TransactionType.map((transection) => {
          return (
            data &&
            a.push(
              data.filter((val) => {
                return val[e.target.value] === transection;
              })
            )
          );
        });

        break;
      }

      case "ToAccount": {
        ToAccount.map((transection) => {
          return (
            data &&
            a.push(
              data.filter((val) => {
                return val[e.target.value] === transection;
              })
            )
          );
        });

        break;
      }

      case "FromAccount": {
        FromAccount.map((transection) => {
          return (
            data &&
            a.push(
              data.filter((val) => {
                return val[e.target.value] === transection;
              })
            )
          );
        });

        break;
      }
      default: {
        a.push(data)
      }
    }
    
    setOrderBy([...a.filter((ele) => ele.length !== 0)]);
  };


  

  return (
    <>
      <div>
        <Link to="/addtransaction">Add new Transection</Link>

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
            localStorage.removeItem("isUserLoggedIn");
            localStorage.removeItem("currentLoginuser");
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
