import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
    // Helper function to check if the user is authenticated
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return token !== null;
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    {/* Login Page */}
                    <Route path="/login" element={<Login />} />

                    {/* Register Page */}
                    <Route path="/register" element={<Register />} />

                    {/* Default Route: Redirect to Login if not authenticated */}
                    <Route 
                        path="*" 
                        element={isAuthenticated() ? <Navigate to="/login" /> : <Navigate to="/login" />} 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
