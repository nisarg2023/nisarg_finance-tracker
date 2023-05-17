import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

export const AddTransactionYupReactFormHook = ({
  localFormValue,
  index,
  isUpdate,
}) => {
  const initialFormValues = localFormValue || {
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

  const [id, setId] = useState(0);

  const schema = yup.object({
    TransactionDate: yup.string().required("TransactionDate is required"),
    MonthYear: yup.string().required("select Month year"),
    TransactionType: yup.string().required("select transection type"),
    FromAccount: yup.string().required("select from account"),
    ToAccount: yup
      .string()
      .required("select to account")
      .notOneOf([yup.ref("FromAccount")], ({ value }) =>
        value === ""
          ? "select to account"
          : "from account and to account must be different"
      ),

    Amount: yup
      .string()
      .required("Enter Amount")
      .min("0", "amount in more then zero"),
    Receipt: yup
      .mixed()
      .test(
        "required",
        "You need to provide a file",
        (value) => {
          if (!removeImage) {
            return true;
          }
          
          return value && value.length !== 0
      }
      )

      .test("fileSize", "The file is too large", (value) => {

        if (!removeImage) {
          return true;
        }
        
          return value.length !== 0 && value[0].size < 1024 * 1024 * 1;
      
      })
      .test(
        "type",
        "Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc",
        (value) => {

          if (!removeImage) {
            return true;
          }
          return (
            value &&
            value.length !== 0 &&
            (value[0].type === "image/jpeg" || value[0].type === "image/png")
          );
        }
      ),
    Notes: yup.string().required("Enter some notes"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormValues,
  });

  const [removeImage, setRemoveImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!isUpdate) {
      let id;
      if (localStorage.getItem("data")) {
        let data = JSON.parse(localStorage.getItem("data"));
        id = data[data.length - 1].id + 1;
        setId(id);
      } else {
        id = 1;
        setId(id);
      }
    } else {
      setId(initialFormValues.id);
    }
  }, []);


  const handelFile = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handelRemoveImage = () => {
    setRemoveImage(true);
  };

  const onSubmit = async (value) => {
    console.log("================================")
    const localdata = JSON.parse(localStorage.getItem("data")) ||[];
    console.log(JSON.parse(localStorage.getItem("data")));
    if (isUpdate) {
      if (removeImage) {
        localdata[index] = {
          ...value,
          ReceiptBase64: await handelFile(value.Receipt[0]),
          id,
        };
      } else {
        localdata[index] = {
          ...value,
          ReceiptBase64: initialFormValues.ReceiptBase64,
          id,
        };
      }

      localStorage.setItem("data", JSON.stringify([...localdata]));
    } 
    else {
      value = {
        ...value,
        ReceiptBase64: await handelFile(value.Receipt[0]),
        id,
      };
      delete value.Receipt;
      localStorage.setItem("data", JSON.stringify([...localdata, value]));
    }

    navigate("/");
  };

  return (
    <div>
      {console.table(errors)}
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <div className="formContainer">
          <div className="input_div">
            <div className="left_div">
              <label htmlFor="TransactionDate:">Transaction Date:</label>
            </div>
            <div className="right_div">
              <input
                type="date"
                name="TransactionDate"
                {...register("TransactionDate")}
              />
              <span>{errors.TransactionDate?.message}</span>
            </div>
          </div>

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="MonthYear">Month Year</label>
            </div>
            <div className="right_div">
              <select name="MonthYear" {...register("MonthYear")}>
                <option value="" desable selectde hidden>
                  select
                </option>
                {MonthYear.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>{" "}
              <span>{errors.MonthYear?.message}</span>
            </div>
          </div>

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="TransactionType">Transaction Type :</label>
            </div>

            <div className="right_div">
              <select name="TransactionType" {...register("TransactionType")}>
                <option value="" desable selectde hidden>
                  select
                </option>
                {TransactionType.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
              <span>{errors.TransactionType?.message}</span>
            </div>
          </div>

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="FromAccount">FromAccount</label>
            </div>

            <div className="right_div">
              <select name="FromAccount" {...register("FromAccount")}>
                <option value="" desable selectde hidden>
                  select
                </option>
                {FromAccount.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
              <span>{errors.FromAccount?.message}</span>
            </div>
          </div>

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="ToAccount">To Account</label>
            </div>

            <div className="right_div">
              <select name="ToAccount" {...register("ToAccount")}>
                <option value="" desable selectde hidden>
                  select
                </option>
                {ToAccount.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
              <span>{errors.ToAccount?.message}</span>
            </div>
          </div>

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="Amount">Amount : </label>
            </div>

            <div className="right_div">
              <input type="number" name="Amount" {...register("Amount")} />
              <span>{errors.Amount?.message}</span>
            </div>
          </div>

          {!isUpdate && (
            <div className="input_div">
              <div className="left_div">
                <label htmlFor="Receipt : ">Receipt : </label>
              </div>

              <div className="right_div">
                <input type="file" name="Receipt" {...register("Receipt")} />
                <span>{errors.Receipt?.message}</span>
              </div>
            </div>
          )}

          {isUpdate && (
            <div className="input_div">
              <div className="left_div">
                <label htmlFor="Receipt : ">Receipt : </label>
              </div>

              <div className="right_div">
                {removeImage ? (
                  <>
                    <input
                      type="file"
                      name="Receipt"
                      {...register("Receipt")}
                    />
                    <span>{errors.Receipt?.message}</span>
                  </>
                ) : (
                  <>
                    <img
                      style={{ width: "200px" }}
                      src={initialFormValues.ReceiptBase64}
                      alt="..."
                    />

                    <input
                      type="button"
                      value="remove"
                      onClick={() => handelRemoveImage()}
                    />
                  </>
                )}
              </div>
            </div>
          )}

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
                {...register("Notes")}
              ></textarea>
              <span>{errors.Notes?.message}</span>
            </div>
          </div>

          <div>
            <input type="submit" value="submit" />
          </div>
        </div>
      </form>

      <Link to="/">All Transaction </Link>
    </div>
  );
};
