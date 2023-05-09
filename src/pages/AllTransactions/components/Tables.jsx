import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../App";
import "./style.css";

export default function Tables({ local_Data, tableTitle }) {
  
  const RECORD_PER_PAGE = 5;
  const TOTAL_NUMBER_OF_PAGES = Math.ceil(local_Data.length / RECORD_PER_PAGE);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(0);
  const [sort, setSort] = useState({ key: null, sortDirection: "asc" });
  const [contextLocaldata,setContextLocalData] =  useContext(DataContext); 

  useEffect(() => {
    const tempData = local_Data;
    setData(tempData);
    setSearchData(tempData)
  }, [local_Data]);

  const handelClickOnPageNumbe = (current) => {
    if (!(current < 0 || current > TOTAL_NUMBER_OF_PAGES - 1)) {
 
      setCurrentPageNo(current);
    }
    
  };

  const hanelSort = (field, type = "string") => {
    const cloneData = [...data];
    setCurrentPageNo(0)
    switch (type) {
      case "string": {
        if (!(sort.key == field) || sort.sortDirection === "asc") {
          cloneData.sort((a, b) => {
            if (a[field][0] < b[field][0]) return -1;
            if (a[field][0] > b[field[0]]) return 1;
            return 0;
          });

          setData(cloneData);
          setSort({ key: field, sortDirection: "desc" });
        } else if (sort.sortDirection === "desc") {
          cloneData.sort((a, b) => {
            if (a[field][0] > b[field][0]) return -1;
            if (a[field][0] < b[field[0]]) return 1;
            return 0;
          });
          setData(cloneData);
          setSort({ key: field, sortDirection: null });
        } else {
          // setData(currentPageData);
          setData(searchData);

          setSort({ key: field, sortDirection: "asc" });
        }

        break;
      }
      case "number": {
        if (!(sort.key == field) || sort.sortDirection === "asc") {
          cloneData.sort((a, b) => {
            return a[field] - b[field];
          });

          setData(cloneData);
          setSort({ key: field, sortDirection: "desc" });
        } else if (sort.sortDirection === "desc") {
          cloneData.sort((a, b) => {
            return b[field] - a[field];
          });
          setData(cloneData);
          setSort({ key: field, sortDirection: null });
        } else {
        
          setData(searchData);
          setSort({ key: field, sortDirection: "asc" });
        }
        break;
      }
      case "date": {
        if (!(sort.key == field) || sort.sortDirection === "asc") {
          cloneData.sort((a, b) => {
            return new Date(a[field]) - new Date(b[field]);
          });

          setData(cloneData);
          setSort({ key: field, sortDirection: "desc" });
        } else if (sort.sortDirection === "desc") {
          cloneData.sort((a, b) => {
            return new Date(b[field]) - new Date(a[field]);
          });
          setData(cloneData);
          setSort({ key: field, sortDirection: null });
        } else {
       
          setData(searchData);
          setSort({ key: field, sortDirection: "asc" });
        }
        break;
      }
      default: {
        break;
      }
    }

  };

  const handelSearch = (event) => {
    let tempdata = [...local_Data];
    setCurrentPageNo(0);
    const newData = tempdata.filter((e) => {
      let a = Object.values(e);
      a.splice(8, 1);
      a.splice(0, 1);

      a = a.filter((ex) => {
        return ex.toUpperCase().includes(event.target.value.toUpperCase());
      });

      return a.length !== 0 && e;
    });
    setSearchData(newData);
    setData(newData);
  };

  const deleteTransection = (id) => {
    const cloneLocalData = [...data];
    const index = cloneLocalData.findIndex((e) => e.id === id);
    cloneLocalData.splice(index, 1);
    setData(cloneLocalData);

    const cloneContextData = contextLocaldata;
    const cloneIndex = cloneContextData.findIndex((e) => e.id === id);
    cloneContextData.splice(cloneIndex, 1);
    setContextLocalData(cloneContextData);
  };

  return (
    <>
      <h3>{data.length !== 0 && data[0][tableTitle]}</h3>{" "}
      <input type="text" onChange={(e) => handelSearch(e)} />
      <div className="table">
        <div className="row">
          <div
            className="col th"
            onClick={() => {
              hanelSort("TransactionDate", "date");
            }}
          >
            Transaction Date
          </div>
          <div
            className="col th"
            onClick={() => {
              hanelSort("MonthYear", "date");
            }}
          >
            Month Year
          </div>
          <div
            className="col th"
            onClick={() => {
              hanelSort("TransactionType");
            }}
          >
            Transaction Type
          </div>
          <div
            className="col th"
            onClick={() => {
              hanelSort("FromAccount");
            }}
          >
            From Account
          </div>
          <div
            className="col th"
            onClick={() => {
              hanelSort("ToAccount");
            }}
          >
            To Account
          </div>
          <div
            className="col th"
            onClick={() => {
              hanelSort("Amount", "number");
            }}
          >
            Amount
          </div>
          <div className="col th ">Receipt</div>
          <div
            className="col th"
            onClick={() => {
              hanelSort("Notes");
            }}
          >
            Notes
          </div>
          <div className="col th">Action</div>
          <div className="col th">Update</div>
          <div className="col th">Delete </div>
        </div>

        {data.length !== 0 &&
          data
            .slice(
              RECORD_PER_PAGE * currentPageNo,
              RECORD_PER_PAGE * currentPageNo + RECORD_PER_PAGE
            )
            .map((transection, index) => {
              return (
                <div className="row" key={index}>
                  <div
                    className={index % 2 == 0 ? "col td_odd" : "col td_even"}
                  >
                    {transection.TransactionDate}
                  </div>
                  <div
                    className={index % 2 == 0 ? "col td_odd" : "col td_even"}
                  >
                    {transection.MonthYear}
                  </div>
                  <div
                    className={index % 2 == 0 ? "col td_odd" : "col td_even"}
                  >
                    {transection.TransactionType}
                  </div>
                  <div
                    className={index % 2 == 0 ? "col td_odd" : "col td_even"}
                  >
                    {transection.FromAccount}
                  </div>
                  <div
                    className={index % 2 == 0 ? "col td_odd" : "col td_even"}
                  >
                    {transection.ToAccount}{" "}
                  </div>
                  <div
                    className={index % 2 == 0 ? "col td_odd" : "col td_even"}
                  >
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "INR",
                    }).format(transection.Amount)}
                  </div>
                  <div
                    className={index % 2 == 0 ? "col td_odd" : "col td_even"}
                  >
                    {" "}
                    <img
                      src={transection.ReceiptBase64}
                      style={{ width: "80px" }}
                      alt=""
                    />{" "}
                  </div>
                  <div
                    className={index % 2 == 0 ? "col td_odd" : "col td_even"}
                  >
                    {transection.Notes}
                  </div>
                  <div
                    className={index % 2 == 0 ? "col td_odd" : "col td_even"}
                  >
                    <Link to={`/view/${transection.id}`}>view</Link>
                  </div>

                  <div
                    className={index % 2 == 0 ? "col td_odd" : "col td_even"}
                  >
                    <Link to={`/update/${transection.id}`}>update</Link>
                  </div>

                  <div
                    className={index % 2 == 0 ? "col td_odd" : "col td_even"}
                  >
                    <button onClick={() => deleteTransection(transection.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
      <button onClick={() => handelClickOnPageNumbe(currentPageNo - 1)}>
        {"<<<<"}
      </button>
      {Array(Math.ceil(data.length / RECORD_PER_PAGE))
        .fill(0)
        .map((_, index) => {
          return (
            <div style={{ display: "inline" }} key={index}>
              <button
                style={{
                  background: currentPageNo == index ? "#00FFCA" : "#A6D0DD",
                  padding: "8px",
                  margin: "8px",
                  // border: 1px  currentPageNo == index ? "#A6D0DD" : "#00FFCA",
                  border: `2px solid ${
                    currentPageNo == index ? "#A6D0DD" : "#00FFCA"
                  }`,
                }}
                onClick={() => handelClickOnPageNumbe(index)}
              >
                {index + 1}
              </button>
            </div>
          );
        })}
      <button onClick={() => handelClickOnPageNumbe(currentPageNo + 1)}>
        {">>>>"}
      </button>
    </>
  );
}
