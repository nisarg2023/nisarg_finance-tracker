import React from 'react'
import { useParams } from 'react-router-dom'
import './style.css'

export default function ViewTransaction() {
    const {id} = useParams()
    const data = JSON.parse(localStorage.getItem("data"))
    const [transection] = data.filter(ele => ele.id==id)
   
    console.table(transection)

  return (
    <>
    {transection ?(<div className="container">
        <div className="image">
          <img src={transection.ReceiptBase64} alt="" />
        </div>
        <div className="detail">
          <div>
            <label htmlFor="">TransactionDate:-</label>
            <p>{transection.TransactionDate}</p>
          </div>

          <div>
            <label htmlFor="">MonthYear:-</label>
            <p>{transection.MonthYear}</p>
          </div>

          <div>
            <label htmlFor="">TransactionType:-</label>
            <p>{transection.TransactionType}</p>
          </div>

          <div>
            <label htmlFor="">FromAccount:-</label>
            <p>{transection.FromAccount}</p>
          </div>

          <div>
            <label htmlFor="">Amount:-</label>
            <p>{transection.Amount}</p>
          </div>

          <div>
            <label htmlFor="">Notes:-</label>
            <p>{transection.Notes}</p>
          </div>
        </div>
      </div>
    ):(<div className="container"> 404</div>)}
    </>
  );
}
