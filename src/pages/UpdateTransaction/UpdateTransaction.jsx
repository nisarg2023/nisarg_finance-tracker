import React from 'react'
import { useParams } from 'react-router-dom';
import AddTransaction from '../AddTransaction/AddTransaction'
import { AddTransactionYupReactFormHook } from '../AddTransactionYupReactFormHook/AddTransactionYupReactFormHook';

export default function UpdateTransaction() {
    const { id } = useParams();
    const data = JSON.parse(localStorage.getItem("data"));
    const index = data && data.findIndex((ele) => ele.id == id);
    delete data[index].Receipt;
    
  return (
    <div>
      {
        data && (index<0 ?(<h1>no data found</h1>):(<AddTransactionYupReactFormHook localFormValue={data[index]} index={index} isUpdate={true}/>))
      }
      
    </div>
  );
}
