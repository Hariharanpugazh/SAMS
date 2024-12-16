import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import QRCodePage from './pages/QRCode';
import AdminDashboard from './pages/AdminDashboard';

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

                    {/* Student Dashboard */}
                    <Route 
                        path="/studentdashboard" 
                        element={isAuthenticated() ? <StudentDashboard /> : <Navigate to="/login" />} 
                    />

                    {/* Admin Dashboard */}
                    <Route
  path="/admindashboard"
  element={<AdminDashboard />}
/>
<Route
  path="/studentdashboard"
  element={<StudentDashboard />}
/>

                    {/* QR Code Page */}
                    <Route path="/qrcode" element={<QRCodePage />} />

                    {/* Default Route */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
