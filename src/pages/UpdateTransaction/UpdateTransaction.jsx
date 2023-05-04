import React from 'react'
import { useParams } from 'react-router-dom';
import AddTransaction from '../AddTransaction/AddTransaction'

export default function UpdateTransaction() {
    const { id } = useParams();
    const data = JSON.parse(localStorage.getItem("data"));
    const index = data && data.findIndex((ele) => ele.id == id);
    
  return (
    <div>
      {
        data && (index<0 ?(<h1>no data found</h1>):(<AddTransaction localFormValue={data[index]} index={index} isUpdate={true}/>))
      }
      
    </div>
  );
}
