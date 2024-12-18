import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SubmitDetails = () => {
  const location = useLocation();
  const { qrData } = location.state || {};
  const [registerNumber, setRegisterNumber] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const [latitude, longitude] = qrData.split(',');
    const currentLocation = { latitude: 12.9716, longitude: 77.5946 }; // Dummy current location for testing

    const distance = calculateDistance(
      latitude,
      longitude,
      currentLocation.latitude,
      currentLocation.longitude
    );

    if (distance <= 100) {
      alert('Marked as Present');
    } else {
      alert('Marked as Absent');
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Submit Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <div>
          <label className="block text-gray-400">Latitude</label>
          <input
            type="text"
            value={qrData?.split(',')[0] || ''}
            disabled
            className="w-full px-4 py-2 bg-gray-700 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-400">Longitude</label>
          <input
            type="text"
            value={qrData?.split(',')[1] || ''}
            disabled
            className="w-full px-4 py-2 bg-gray-700 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-400">Register Number</label>
          <input
            type="text"
            value={registerNumber}
            onChange={(e) => setRegisterNumber(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitDetails;
