// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
    const { user } = useAuth();

    // If the user is logged in, render the child routes/components (Outlet)
    // Otherwise, redirect them to the /login path
    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;