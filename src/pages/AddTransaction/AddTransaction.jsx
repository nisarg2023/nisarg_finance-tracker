import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function AddTransaction() {
  const initialFormValues = {
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
    
    if (!(File[0].type === "image/png" ||
    File[0].type === "image/jpg" ||
    File[0].type === "image/jpeg")||File[0].size > 1000000) {
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
    console.log(formValue);
    let isFormValid = true;
  
    Object.entries(formErr).forEach((x) => {
      console.log(x)
      if(x[1] ==="*")
      {
        setFormErr((prev)=>{return {...prev,[x[0]]:"this field is required"}})
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

      alert("Transaction is added successfully");
    } else {
      alert("some things went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handelOnSubmit(e)}>
        <div>
          <label htmlFor="TransactionDate:">Transaction Date:</label>
          <input
            type="date"
            name="TransactionDate"
            value={formValue.TransactionDate}
            onChange={(e) => {
              setFormValue({ ...formValue, TransactionDate: e.target.value });
              isEmpty(e.target);
            }}
          />
          <span>{formErr.TransactionDate}</span>
        </div>

        <div>
          <label htmlFor="MonthYear">Month Year</label>
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
            <option value="Jan 2023">Jan 2023</option>
            <option value="Feb 2023">Feb 2023</option>
            <option value="Mar 2023">Mar 2023</option>
            <option value="Arp 2023">Arp 2023</option>
            <option value="May 2023">May 2023</option>
            <option value="Jun 2023">Jun 2023</option>
            <option value="Jul 2023">Jul 2023</option>
            <option value="Aug 2023">Aug 2023</option>
            <option value="Sep 2023">Sep 2023</option>
            <option value="Oct 2023">Oct 2023</option>
            <option value="Nov 2023">Nov 2023</option>
            <option value="Des 2023">Des 2023</option>
          </select>{" "}
          <span>{formErr.MonthYear}</span>
        </div>

        <div>
          <label htmlFor="TransactionType">Transaction Type :</label>
          <select
            name="TransactionType"
            value={formValue.TransactionType}
            onChange={(e) => {
              setFormValue({ ...formValue, TransactionType: e.target.value });
              isEmpty(e.target);
            }}
          >
            <option value="" desable selectde hidden>
              select
            </option>
            <option value="Home Expense">Home Expense</option>
            <option value="Personal Expense">Personal Expense</option>
            <option value="Income">Income</option>
          </select>
          <span>{formErr.TransactionType}</span>
        </div>

        <div>
          <label htmlFor="FromAccount">FromAccount</label>
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
            <option value="Personal Account">Personal Account</option>
            <option value="Real Living">Real Living</option>
            <option value="My Dream Home">My Dream Home</option>
            <option value="Full Circle">Full Circle</option>
            <option value="Core Realtors">Core Realtors</option>
            <option value="Big Block">Big Block</option>
          </select>
          <span>{formErr.FromAccount}</span>
        </div>

        <div>
          <label htmlFor="ToAccount">To Account</label>
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
            <option value="Personal Account">Personal Account</option>
            <option value="Real Living">Real Living</option>
            <option value="My Dream Home">My Dream Home</option>
            <option value="Full Circle">Full Circle</option>
            <option value="Core Realtors">Core Realtors</option>
            <option value="Big Block">Big Block</option>
          </select>
          <span>{formErr.ToAccount}</span>
        </div>

        <div>
          <label htmlFor="Amount">Amount : </label>
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

        <div>
          <label htmlFor="Receipt : ">Receipt : </label>
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

        <div>
          <label htmlFor="Notes">Notes</label>
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

        <div>
          <input type="submit" value="submit" />
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





