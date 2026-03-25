import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'


const ProtectedRoute = ({children}) => {
  const { token } = React.useContext(AuthContext)
  const location = useLocation()

  if (!token) {
    toast.error('unauthorized access please login again')

    return (<Navigate to="/" state={{ from: location }} replace />);
  }

  return children;
}

export default ProtectedRoute