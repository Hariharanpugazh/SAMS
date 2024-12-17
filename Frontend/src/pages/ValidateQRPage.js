import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ValidatePage = () => {
    const [params] = useSearchParams();
    const [qrData, setQrData] = useState(null);

    useEffect(() => {
        const encodedData = params.get('data');
        if (encodedData) {
            const decodedData = JSON.parse(atob(encodedData));
            setQrData(decodedData);
        }
    }, [params]);

    return (
        <div>
            {qrData ? (
                <div>
                    <h2>Class Name: {qrData.class_name}</h2>
                    <p>Latitude: {qrData.geolocation.latitude}</p>
                    <p>Longitude: {qrData.geolocation.longitude}</p>
                    <p>Radius: {qrData.radius} meters</p>
                    <p>Generated On: {qrData.timestamp}</p>
                    <p>Expires At: {qrData.expiry}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ValidatePage;
