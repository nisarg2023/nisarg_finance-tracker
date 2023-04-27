import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const MonthYear = [
  "Jan 2023",
  "Feb 2023",
  "Mar 2023",
  "Arp 2023",
  "May 2023",
  "Jun 2023",
  "Jul 2023",
  "Aug 2023",
  "Sep 2023",
  "Oct 2023",
  "Nov 2023",
  "Des 2023",
];

export const TransactionType = [
  "Transaction Type",
  "Home Expense",
  "Personal Expense",
  "Income",
];

export const FromAccount = [
  "Personal Account",
  "Real Living",
  "My Dream Home",
  "Full Circle",
  "Core Realtors",
  "Big Block",
];

export const ToAccount = [
  "Personal Account",
  "Real Living",
  "My Dream Home",
  "Full Circle",
  "Core Realtors",
  "Big Block",
];

export default function AddTransaction() {
  const initialFormValues = {
    id: "",
    TransactionDate: "",
    MonthYear: "",
    TransactionType: "",
    FromAccount: "",
    ToAccount: "",
    Amount: "",
    Receipt: "",
    ReceiptBase64: "",
    Notes: "",
  };
  const initialFormErr = {
    TransactionDate: "*",
    MonthYear: "*",
    TransactionType: "*",
    FromAccount: "*",
    ToAccount: "*",
    Amount: "*",
    Receipt: "*",
    Notes: "*",
  };

  const [formValue, setFormValue] = useState(initialFormValues);
  const [formErr, setFormErr] = useState(initialFormErr);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("data")?
     (JSON.parse(localStorage.getItem("data")).length + 1):
     (1)

    console.log(id);

    setFormValue((prev) => {
      return { ...prev, id: id };
    });
  }, []);

  const isEmpty = (input) => {
    if (input.value.trim() === "") {
      setFormErr((prev) => {
        return { ...prev, [input.name]: "this field is required" };
      });
      return true;
    } else {
      setFormErr((prev) => {
        return { ...prev, [input.name]: "" };
      });
      return false;
    }
  };

  const handelFile = (File, e) => {
    if (
      !(
        File[0].type === "image/png" ||
        File[0].type === "image/jpg" ||
        File[0].type === "image/jpeg"
      ) ||
      File[0].size > 1000000
    ) {
      setFormErr((prev) => {
        return {
          ...prev,
          Receipt:
            "receipt upload size should not exceed 1 MB, allow only .png .jpg .jpeg ",
        };
      });
    } else {
      setFormErr((prev) => {
        return { ...prev, Receipt: "" };
      });
    }

    //================================================================

    var file = File[0];
    var reader = new FileReader();

    reader.onload = function () {
      let base64String = reader.result;

      setFormValue((prev) => {
        return { ...prev, ReceiptBase64: base64String };
      });
      //console.log(base64String);
    };
    reader.readAsDataURL(file);

    //================================================================
  };
  const handelOnSubmit = (e) => {
    e.preventDefault();
    console.table(formValue);
    let isFormValid = true;

    Object.entries(formErr).forEach((x) => {
      if (x[1] === "*") {
        setFormErr((prev) => {
          return { ...prev, [x[0]]: "this field is required" };
        });
      }
      isFormValid = x[1] === "" && isFormValid;
    });

    if (isFormValid) {
      if (formValue.FromAccount === formValue.ToAccount) {
        setFormErr((prev) => {
          return {
            ...prev,
            ToAccount:
              "value of from account and to account is must be diffrent",
          };
        });
        isFormValid = false;
      }

      if (formValue.Amount <= 0) {
        setFormErr((prev) => {
          return { ...prev, Amount: "The amount should be greater than zero" };
        });
        isFormValid = false;
      }

      if (formValue.Notes.length > 250) {
        setFormErr((prev) => {
          return {
            ...prev,
            Notes: "notes should not cross 250 characters in length",
          };
        });
        isFormValid = false;
      }
    }

    if (isFormValid) {
      let localData = JSON.parse(localStorage.getItem("data"));
      if (localData) {
        let data = [...localData, formValue];
        localStorage.setItem("data", JSON.stringify(data));
      } else {
        localStorage.setItem("data", JSON.stringify([formValue]));
      }

      // alert("Transaction is added successfully");

      navigate("/alltransactions");
    } else {
      alert("some things went wrong");
    }
  };

  return (
    <div>
      <form
        onSubmit={async (e) => {
          handelOnSubmit(e);
        }}
      >
        <div className="formContainer">
          <div className="input_div">
            <div className="left_div">
              <label htmlFor="TransactionDate:">Transaction Date:</label>
            </div>
            <div className="right_div">
              <input
                type="date"
                name="TransactionDate"
                value={formValue.TransactionDate}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    TransactionDate: e.target.value,
                  });
                  isEmpty(e.target);
                }}
              />
              <span>{formErr.TransactionDate}</span>
            </div>
          </div>

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="MonthYear">Month Year</label>
            </div>
            <div className="right_div">
              <select
                name="MonthYear"
                value={formValue.MonthYear}
                onChange={(e) => {
                  setFormValue({ ...formValue, MonthYear: e.target.value });
                  isEmpty(e.target);
                }}
              >
                <option value="" desable selectde hidden>
                  select
                </option>
                {MonthYear.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>{" "}
              <span>{formErr.MonthYear}</span>
            </div>
          </div>

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="TransactionType">Transaction Type :</label>
            </div>

            <div className="right_div">
              <select
                name="TransactionType"
                value={formValue.TransactionType}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    TransactionType: e.target.value,
                  });
                  isEmpty(e.target);
                }}
              >
                <option value="" desable selectde hidden>
                  select
                </option>
                {TransactionType.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
              <span>{formErr.TransactionType}</span>
            </div>
          </div>

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="FromAccount">FromAccount</label>
            </div>

            <div className="right_div">
              <select
                name="FromAccount"
                value={formValue.FromAccount}
                onChange={(e) => {
                  setFormValue({ ...formValue, FromAccount: e.target.value });
                  isEmpty(e.target);
                }}
              >
                <option value="" desable selectde hidden>
                  select
                </option>
                {FromAccount.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
              <span>{formErr.FromAccount}</span>
            </div>
          </div>

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="ToAccount">To Account</label>
            </div>

            <div className="right_div">
              <select
                name="ToAccount"
                value={formValue.ToAccount}
                onChange={(e) => {
                  setFormValue({ ...formValue, ToAccount: e.target.value });
                  isEmpty(e.target);
                }}
              >
                <option value="" desable selectde hidden>
                  select
                </option>
                {ToAccount.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
              <span>{formErr.ToAccount}</span>
            </div>
          </div>

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="Amount">Amount : </label>
            </div>

            <div className="right_div">
              <input
                type="number"
                name="Amount"
                value={formValue.Amount}
                onChange={(e) => {
                  setFormValue({ ...formValue, Amount: e.target.value });
                  isEmpty(e.target);
                }}
              />
              <span>{formErr.Amount}</span>
            </div>
          </div>

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="Receipt : ">Receipt : </label>
            </div>

            <div className="right_div">
              <input
                type="file"
                name="Receipt"
                value={formValue.Receipt}
                onChange={(e) => {
                  setFormValue({ ...formValue, Receipt: e.target.value });
                  handelFile(e.target.files);
                }}
              />
              <span>{formErr.Receipt}</span>
            </div>
          </div>

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="Notes">Notes</label>
            </div>
            <div className="right_div">
              <textarea
                name="Notes"
                id=""
                cols="20"
                rows="3"
                value={formValue.Notes}
                onChange={(e) => {
                  setFormValue({ ...formValue, Notes: e.target.value });
                  isEmpty(e.target);
                }}
              ></textarea>
              <span>{formErr.Notes}</span>
            </div>
          </div>

          <div>
            <input type="submit" value="submit" />
          </div>
        </div>
      </form>

      <Link to="/alltransactions">All Transaction </Link>
    </div>
  );
}

// const Input = (props) => {

//   let inputField = <input type="text" />;
//   switch (props.type) {
//     case "textarea": {
//       inputField = <textarea name="" id="" cols="15" rows="3"></textarea>;
//       break;
//     }
//     case "select": {
//       inputField = (
//         <select name={props.name}>
//           {props.option.map((value) => {
//             return (
//               <option name={value} value={value}>
//                 {value}
//               </option>
//             );
//           })}
//         </select>
//       );
//       break;
//     }
//     default: {
//       inputField = <input type={props.type} placeholder={props.placeholder} />;
//     }
//   }

//   return (
//     <div>
//       <label htmlFor="">{props.label}</label>
//       {inputField}
//       <span></span>
//     </div>
//   );
// };
