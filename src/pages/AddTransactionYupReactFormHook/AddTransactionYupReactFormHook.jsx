import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import { FromAccount, MonthYear, ToAccount, TransactionType } from "../../utils/constants";
import { TransactionDate } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addTreanection,
  updateTransection,
} from "../../duck/TransectionsSlice";

export const AddTransactionYupReactFormHook = ({
  localFormValue,
  index,
  isUpdate,
}) => {
 // const [contextLocaldata, setContextLocalData] = useContext(DataContext);
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

  const Transections = useSelector((state) => state.Transections);
  const dispatch = useDispatch();

  const [id, setId] = useState(0);

  const schema = yup.object({
    TransactionDate,
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
      .test("required", "You need to provide a file", (value) => {
        if (!removeImage && isUpdate) {
          return true;
        }

        return value && value.length !== 0;
      })

      .test("fileSize", "The file is too large", (value) => {
        if (!removeImage && isUpdate) {
          return true;
        }

        return value.length !== 0 && value[0].size < 1024 * 1024 * 1;
      })
      .test(
        "type",
        "Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc",
        (value) => {
          if (!removeImage && isUpdate) {
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
      if (Transections.length !== 0) {
        let data = Transections; //contextLocaldata; //JSON.parse(localStorage.getItem("data"));
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
   
   // const cloneContextData = [...contextLocaldata];
    if (isUpdate) {
      if (removeImage) {
        // cloneContextData[index] = {
        //   ...value,
        //   ReceiptBase64: await handelFile(value.Receipt[0]),
        //   id,
        // };
        const ReceiptBase64= await handelFile(value.Receipt[0]);
        delete value.Receipt;
          dispatch(
            updateTransection({
              index,
              data: {
                ...value,
                ReceiptBase64,
                id,
              },
            })
          );
      } else {
        // cloneContextData[index] = {
        //   ...value,
        //   ReceiptBase64: initialFormValues.ReceiptBase64,
        //   id,
        // };

        dispatch(
          updateTransection({
            index,
            data: {
              ...value,
              ReceiptBase64: initialFormValues.ReceiptBase64,
              id,
            },
          })
        );
      }

      //localStorage.setItem("data", JSON.stringify([...cloneContextData]));
      //setContextLocalData([...cloneContextData]);
    } else {
      value = {
        ...value,
        ReceiptBase64: await handelFile(value.Receipt[0]),
        id,
      };
      delete value.Receipt;
      // localStorage.setItem(
      //   "data",
      //   JSON.stringify([...cloneContextData, value])
      // );
      dispatch(addTreanection(value));
      // setContextLocalData([...cloneContextData, value]);
    }

    navigate("/");
  };

  return (
    <div>
     
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
                <option value="" desable="true" selectde="true" hidden>
                  select
                </option>
                {MonthYear.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
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
                <option value="" desable="true" selectde="true" hidden>
                  select
                </option>
                {TransactionType.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
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
                <option value="" desable="true" selectde="true" hidden>
                  select
                </option>
                {FromAccount.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
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
                <option value="" desable="true" selectde="true" hidden>
                  select
                </option>
                {ToAccount.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
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
