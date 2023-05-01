import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';


const Auth = ({children}) =>{
    
    const [isUserLogin,setIsuserLogin]=useState();
    useEffect(()=>{
       setIsuserLogin(localStorage.getItem('isUserLoggedIn'));

    },[])


    return( 
     <>
         {
            isUserLogin ?(children):(<Navigate to="/login"/>)

         }
     </>)
}
    

export default Auth;    
    
  