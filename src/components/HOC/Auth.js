import React from 'react'



const withAuth = (ProtectedRouteComponent) => {
    
    
    return function EnhancedAuth(props) {
        let isUserLogin = false
        const data = JSON.parse(localStorage.getItem('isUserLoggedIn'))
        
        if (data != null) {
            isUserLogin = true            
        }
    
        return <ProtectedRouteComponent  {...props} isUserLogin={isUserLogin} />
    }
     
}
export default withAuth
  