import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../../App'
import './style.css'

export default function ViewTransaction() {

    const [contextLocaldata] = useContext(DataContext);
    const {id} = useParams()
    const data = contextLocaldata; //JSON.parse(localStorage.getItem("data"));
    const [transection] =  data ? data.filter(ele => ele.id==id):[];
    
   
    

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
