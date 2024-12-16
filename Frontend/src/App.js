import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import QRCodePage from './pages/QRCode';

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

                    {/* Studenet */}
                    <Route path="/studentdashboard" element={<StudentDashboard />} />
                    <Route path="/qrcode" element={<QRCodePage />} />

                    {/* Teacher */}

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
