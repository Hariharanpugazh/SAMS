import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { QrCode } from 'react-feather';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleScanQR = () => {
    // Navigate to the QR scan page (adjust route if needed)
    alert('Navigating to Scan QR page!'); // Placeholder for actual navigation logic
    navigate('/qrcode');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-black">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl transform hover:scale-105 transition-all duration-500">
        <h2 className="text-4xl font-extrabold text-center text-white mb-6 animate-fadeInDown">Student Dashboard</h2>
        <p className="text-lg text-gray-300 text-center mb-4">
          Welcome to your dashboard! Manage your attendance here.
        </p>

        <div className="mt-6">
          <button
            onClick={handleScanQR}
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-bold rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-500 flex items-center justify-center space-x-2"
          >
            {/* <QrCode className="w-6 h-6" /> */}
            <span>Scan QR</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
