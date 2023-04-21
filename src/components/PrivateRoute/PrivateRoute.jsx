import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../Auth/Auth'
import { routes } from '../../../routes';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        console.log('Detected user')
    }
    return !!currentUser ? children : <Navigate to={routes.homeView} />
}

export default PrivateRoute