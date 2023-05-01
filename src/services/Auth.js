import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Login from '../pages/Login/Login';


const Auth = ({children}) =>{
    const navigate = useNavigate();
    const [isUserLogin, setIsuserLogin] = useState(false);
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('isUserLoggedIn'))
        if (data == null) {
            navigate("/login");
        }
        else {
            setIsuserLogin(true);
        }
    },[])


    return( 
     <>


            {isUserLogin ? (children) : <></>}


     </>)
}
    

export default Auth;    
    
  