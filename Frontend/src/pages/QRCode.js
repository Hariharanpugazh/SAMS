import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodePage = () => {
  // Define the latitude and longitude of the college or company
  const latitude = 12.971598; // Example: Replace with your actual latitude
  const longitude = 77.594566; // Example: Replace with your actual longitude
  const qrData = `Latitude: ${latitude}, Longitude: ${longitude}`; // Data to encode in the QR code

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-black">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl transform hover:scale-105 transition-all duration-500">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 animate-fadeInDown">
          College QR Code
        </h2>
        <p className="text-lg text-gray-300 text-center mb-4">
          Scan this QR code to get the location details.
        </p>

        {/* QR Code Display */}
        <div className="flex justify-center">
          <QRCodeCanvas
            value={qrData}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            level="Q"
            className="shadow-lg rounded-lg"
          />
        </div>

        {/* Latitude and Longitude Display */}
        <div className="mt-4 text-center text-gray-300">
          <p><strong>Latitude:</strong> {latitude}</p>
          <p><strong>Longitude:</strong> {longitude}</p>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
