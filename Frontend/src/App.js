import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import QRCodePage from './pages/QRCode';
import QRDisplayPage from './pages/QRDisplayPage';
import ValidateQRPage from "./pages/ValidateQRPage";
import AddStudents from './pages/AddStudent';
import QRCodeScanner from './pages/QRCodeScanner';
import MarkAttendance from './pages/MarkAttendance';

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();
  const state = location.state;

  // If state.role does not match, redirect to login
  if (!state || state.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login and Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard */}
        <Route path="/admindashboard"element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}/>
        <Route path="/addstudents" element={<AddStudents />} /> 

        {/* Student Dashboard */}
        <Route path="/studentdashboard"element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>}/>
        <Route path="/validate" element={<ValidateQRPage />} />
        <Route path="/qrcodescanner" element={<QRCodeScanner />} />
        <Route path="/markattendance" element={<MarkAttendance />} />
        
        {/* QR Code Page */}
        <Route path="/qrcode" element={<QRCodePage />} />
        <Route path="/qr-display" element={<QRDisplayPage />} />
        
        {/* Default Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
