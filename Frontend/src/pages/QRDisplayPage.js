import React from 'react';
import { useLocation } from 'react-router-dom';

const QRDisplayPage = () => {
  const location = useLocation();
  const { qrCode, expiry } = location.state || {};
  const className = sessionStorage.getItem('className') || 'N/A'; // Retrieve from sessionStorage
  const generatedLocation = 'Classroom'; // Static location name

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-black text-white animate-fadeIn">
      <h2 className="text-4xl font-bold mb-6 animate-slideInDown">
        Generated QR Code
      </h2>
      {qrCode ? (
        <>
          <div className="p-6 bg-purple-900 rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fadeInUp">
            <img
              src={`data:image/png;base64,${qrCode}`}
              alt="QR Code"
              className="w-64 h-64 mb-4 mx-auto shadow-2xl rounded-lg"
            />
          </div>

          <div className="text-lg text-center p-6 bg-purple-800 rounded-lg shadow-lg mt-6 animate-fadeInUp">
            <p className="mb-2">
              <strong className="text-gray-300">Class Name:</strong> {className}
            </p>
            <p className="mb-2">
              <strong className="text-gray-300">Generated Location:</strong>{' '}
              {generatedLocation}
            </p>
            <p className="mb-2">
              <strong className="text-gray-300">Expires At:</strong>{' '}
              {new Date(expiry).toLocaleString()}
            </p>
            <p>
              <strong className="text-gray-300">Generated On:</strong>{' '}
              {new Date().toLocaleString()}
            </p>
          </div>
        </>
      ) : (
        <p className="text-red-500 text-xl font-semibold animate-pulse">
          No QR Code available. Please generate one.
        </p>
      )}
    </div>
  );
};

export default QRDisplayPage;
