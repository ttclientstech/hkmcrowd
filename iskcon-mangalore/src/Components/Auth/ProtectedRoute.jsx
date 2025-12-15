import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check if we have the ID saved
    const isAuthenticated = localStorage.getItem('campaignerId');

    // If no ID, kick them to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If ID exists, show the Dashboard
    return children;
};

export default ProtectedRoute;