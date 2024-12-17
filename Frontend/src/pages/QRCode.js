import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QRDetailsPage = () => {
  const [className, setClassName] = useState('');
  const [expiryMinutes, setExpiryMinutes] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const navigate = useNavigate();

  // Fetch user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleConfirm = async () => {
    const payload = {
      class_name: className,
      geolocation: {
        latitude: latitude,
        longitude: longitude,
      },
      expiry_minutes: parseInt(expiryMinutes, 10),
    };

    const response = await fetch('http://127.0.0.1:8000/api/accounts/api/generate_qr/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      sessionStorage.setItem('className', className);
      navigate('/qr-display', {
        state: { qrCode: data.qr_code, expiry: data.expiry },
      });
    } else {
      alert('Failed to generate QR Code');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 to-black text-white animate-fadeIn">
      <div className="bg-purple-900 p-8 rounded-lg shadow-lg w-96 animate-slideInUp">
        <h2 className="text-3xl font-bold mb-6 text-center text-white-400">QR Code Details</h2>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Class Name:</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Enter Class Name"
            className="w-full p-2 rounded-full bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-transform transform hover:scale-105"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Latitude:</label>
          <div className="w-full p-2 rounded-full bg-purple-700 text-white">
            {latitude || 'Fetching...'}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Longitude:</label>
          <div className="w-full p-2 rounded-full bg-purple-700 text-white">
            {longitude || 'Fetching...'}
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Expiry Time (minutes):</label>
          <input
            type="number"
            value={expiryMinutes}
            onChange={(e) => setExpiryMinutes(e.target.value)}
            placeholder="Enter Expiry Time"
            className="w-full p-2 rounded-full bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-transform transform hover:scale-105"
          />
        </div>

        <button
          onClick={handleConfirm}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-110 hover:from-pink-600 hover:to-pink-800"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default QRDetailsPage;
