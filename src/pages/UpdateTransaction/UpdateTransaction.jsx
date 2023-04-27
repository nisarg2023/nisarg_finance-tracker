import React from 'react'
import { useParams } from 'react-router-dom';
import AddTransaction from '../AddTransaction/AddTransaction'

export default function UpdateTransaction() {
    const { id } = useParams();
    const data = JSON.parse(localStorage.getItem("data"));
    const index = data.findIndex((ele) => ele.id == id);
    console.log(index)
    console.table(data[index]);
  return (
    <div>
      <AddTransaction localFormValue={data[index]} index={index} isUpdate={true}/>
    </div>
  );
}
