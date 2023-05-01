import React from 'react'



const withAuth = (ProtectedRouteComponent) => {
    
    function EnhancedAuth(props) {
        let isUserLogin = false
        const data = JSON.parse(localStorage.getItem('isUserLoggedIn'))
        if (data != null) {
            isUserLogin = true            
        }
        return <ProtectedRouteComponent  {...props} isUserLogin={isUserLogin} />
    }
    return EnhancedAuth
}
export default withAuth
  