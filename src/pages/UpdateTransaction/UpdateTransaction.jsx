import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../App';
import AddTransaction from '../AddTransaction/AddTransaction'
import { AddTransactionYupReactFormHook } from '../AddTransactionYupReactFormHook/AddTransactionYupReactFormHook';

export default function UpdateTransaction() {
 //const [contextLocaldata, setContextLocalData] = useContext(DataContext);
    const { id } = useParams();
    const Transections  = useSelector(state=>state.Transections)
    const data = JSON.parse( JSON.stringify(Transections)) //contextLocaldata//JSON.parse(localStorage.getItem("data"));
    
    const index = data && data.findIndex((ele) => ele.id == id);
   
    index >= 0 && delete data[0].Receipt;
    
  return (
    <div>
      {
        data && (index<0 ?(<h1>no data found</h1>):(<AddTransactionYupReactFormHook localFormValue={data[index]} index={index} isUpdate={true}/>))
      }
      
    </div>
  );
}
