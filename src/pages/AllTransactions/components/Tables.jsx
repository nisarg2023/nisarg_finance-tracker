import React, { useEffect, useState } from "react";

export default function Tables({ localData, tableTitle }) {
  const [sortDirection, setSortDirection] = useState(false);
  const [data, setData] = useState(localData);

  useEffect(() => {
    setData(localData);
  }, [localData]);

  const hanelSort = (field, type = "string") => {
    const cloneData = [...data];
    switch (type) {
      case "string": {
        sortDirection
          ? cloneData.sort((a, b) => {
              if (a[field][0] > b[field][0]) return -1;
              if (a[field][0] < b[field[0]]) return 1;
              return 0;
            })
          : cloneData.sort((a, b) => {
              if (a[field][0] < b[field][0]) return -1;
              if (a[field][0] > b[field[0]]) return 1;
              return 0;
            });

        setSortDirection(!sortDirection);
        break;
      }
      case "number": {
        sortDirection
          ? cloneData.sort((a, b) => {
              return b[field] - a[field];
            })
          : cloneData.sort((a, b) => {
              return a[field] - b[field];
            });
        setSortDirection(!sortDirection);
        break;
      }
      case "date": {
        sortDirection
          ? cloneData.sort((a, b) => {
              return new Date(b[field]) - new Date(a[field]);
            })
          : cloneData.sort((a, b) => {
              return new Date(a[field]) - new Date(b[field]);
            });
        setSortDirection(!sortDirection);
        break;
      }
      default: {
        break;
      }
    }

    setData(cloneData);
  };

  return (
    <>
      <h3>{data[0][tableTitle]}</h3>
      <div className="table">
        <div className="row">
          <div
            className="col"
            onClick={() => {
              hanelSort("TransactionDate", "date");
            }}
          >
            Transaction Date
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
            To Account{" "}
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

        {data.map((transection, index) => {
          return (
            <div className="row" key={index}>
              <div className="col">{transection.TransactionDate}</div>
              <div className="col">{transection.MonthYear}</div>
              <div className="col">{transection.TransactionType}</div>
              <div className="col">{transection.FromAccount}</div>
              <div className="col">{transection.ToAccount} </div>
              <div className="col">{transection.Amount}</div>
              <div className="col">
                {" "}
                <img
                  src={transection.ReceiptBase64}
                  style={{ width: "80px" }}
                  alt=""
                />{" "}
              </div>
              <div className="col">{transection.Notes}</div>
              <div className="col">view</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
