import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { CheckUserLoginContext } from '../../App';



const withAuth = (ProtectedRouteComponent) => {
    
    
    return function EnhancedAuth(props) {
      //  const [isUserLogin, setIsUserLogin] = useContext(CheckUserLoginContext);
        const isUserLogin = useSelector(state => state.checkIsUserLogin.value)
        let islogin = false
        const data = isUserLogin //JSON.parse(localStorage.getItem('isUserLoggedIn'))
        
        if (data) {
            islogin = true            
        }
    
        return <ProtectedRouteComponent  {...props} isUserLogin={islogin} />
    }
     
}
export default withAuth
  