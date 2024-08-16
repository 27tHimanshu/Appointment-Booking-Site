import React from 'react'
import { Navigate } from 'react-router-dom'


const ProtectedRoutes = ( {children}) => {
    console.log('ProtectedRoute rendered');
    if(localStorage.getItem('token')){
        return children;
    }
    else{
        return <Navigate to='/login' />
    }
}

export default ProtectedRoutes
