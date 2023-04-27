import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Tables({ localData, tableTitle }) {
 
  const [sortDirection, setSortDirection] = useState(false);
  const [data, setData] = useState(localData);
  const [sort, setSort] = useState({ key: null, sortDirection: "asc" });

  useEffect(() => {
    setData(localData);
  }, [localData]);

  const hanelSort = (field, type = "string") => {
    const cloneData = [...data];


    

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
              setData(localData);
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
      
         setData(localData);
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
          setData(localData);
          setSort({ key: field, sortDirection: "asc" });
        }
        break;
      }
      default: {
        break;
      }
    }

   // setData(cloneData);
  };

  const handelSearch = (event) => {
  
    let tempdata   = [...localData]
    
   const newData = tempdata.filter((e)=>{
        
        let a =Object.entries(e);
        a= a.map((ez) => ez[1]);
        a.splice(8, 1);
        a.splice(0, 1);
        
        
        a = a.filter((ex) => {
          return ex.toUpperCase().includes(event.target.value.toUpperCase());
        });
        console.log(a.length)



        return  a.length!==0 && e
    })

    setData(newData)


  };

  return (
    <>
      <h3>{data.length!==0 && data[0][tableTitle]}</h3>{" "}
      <input type="text" onChange={(e) => handelSearch(e)} />
      <div className="table">
        <div className="row">
          <div
            className="col"
            onClick={() => {
              hanelSort("TransactionDate", "date");
            }}
          >
            Transaction Date{" "}
          </div>
          <div
            className="col"
            onClick={() => {
              hanelSort("MonthYear");
            }}
          >
            Month Year
          </div>
          <div
            className="col"
            onClick={() => {
              hanelSort("TransactionType");
            }}
          >
            Transaction Type
          </div>
          <div
            className="col"
            onClick={() => {
              hanelSort("FromAccount");
            }}
          >
            From Account
          </div>
          <div
            className="col"
            onClick={() => {
              hanelSort("ToAccount");
            }}
          >
            To Account
          </div>
          <div
            className="col"
            onClick={() => {
              hanelSort("Amount", "number");
            }}
          >
            Amount
          </div>
          <div className="col">Receipt</div>
          <div
            className="col"
            onClick={() => {
              hanelSort("Notes");
            }}
          >
            Notes
          </div>
          <div className="col">Action</div>
        </div>

        {data.length!==0 && data.map((transection, index) => {
          return (
            <div className="row" key={index}>
              <div className="col">{transection.TransactionDate}</div>
              <div className="col">{transection.MonthYear}</div>
              <div className="col">{transection.TransactionType}</div>
              <div className="col">{transection.FromAccount}</div>
              <div className="col">{transection.ToAccount} </div>
              <div className="col">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(transection.Amount)}
              </div>
              <div className="col">
                {" "}
                <img
                  src={transection.ReceiptBase64}
                  style={{ width: "80px" }}
                  alt=""
                />{" "}
              </div>
              <div className="col">{transection.Notes}</div>
              <div className="col">
                <Link to={`/view/${transection.id}`}>view</Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}


