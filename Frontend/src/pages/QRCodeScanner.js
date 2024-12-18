import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const QRCodeScanner = () => {
  const [qrCodeMessage, setQrCodeMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const scannerRef = useRef(null);

  useEffect(() => {
    // Function to request camera permission
    const requestCameraPermission = async () => {
      try {
        // Ask for camera access
        await navigator.mediaDevices.getUserMedia({ video: true });
        console.log('Camera permission granted');
      } catch (err) {
        console.error('Camera permission denied:', err);
        setError('Camera permission denied. Please enable camera access in your browser settings.');
        alert('Camera access is required to scan QR codes. Please enable it in your browser settings.');
        return false;
      }
      return true;
    };

    const initializeScanner = async () => {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return; // Stop if permission is denied

      // Initialize Html5QrcodeScanner
      const scanner = new Html5QrcodeScanner(
        'qr-reader', // ID of the div where scanner renders
        {
          fps: 10, // Frames per second
          qrbox: { width: 250, height: 250 }, // QR box dimensions
        },
        false // Disable verbose logs
      );

      scanner.render(
        (decodedText) => {
          // Success callback when QR Code is scanned
          setQrCodeMessage(decodedText);
          alert(`Scanned QR Code: ${decodedText}`);
          scanner.clear(); // Stop scanning
          navigate('/submit-details', { state: { qrData: decodedText } });
        },
        (errorMessage) => {
          // Optional: Log errors while scanning
          console.warn('QR Scan error:', errorMessage);
        }
      );

      // Save scanner reference for cleanup
      scannerRef.current = scanner;
    };

    initializeScanner();

    // Cleanup scanner when component unmounts
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Scan QR Code</h1>
      
      {/* QR Scanner Container */}
      <div id="qr-reader" className="w-full max-w-xs border-2 rounded-md shadow-lg"></div>

      {/* Error Message */}
      {error && (
        <p className="mt-4 text-red-500 bg-gray-800 p-4 rounded-md text-sm">
          {error}
        </p>
      )}

      {/* Display Scanned QR Code Message */}
      {qrCodeMessage && (
        <div className="mt-4 bg-gray-800 p-4 rounded-md text-sm">
          <p className="font-semibold">Scanned Data:</p>
          <p>{qrCodeMessage}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
