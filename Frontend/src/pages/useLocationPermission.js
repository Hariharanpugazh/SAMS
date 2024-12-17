import { useState, useEffect } from 'react';

const useLocationPermission = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [permissionState, setPermissionState] = useState('prompt');
  const [error, setError] = useState(null);

  // Check location permission status
  const checkPermission = async () => {
    if (navigator.permissions) {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      setPermissionState(result.state);

      result.onchange = () => {
        setPermissionState(result.state);
        if (result.state === 'granted') fetchLocation();
      };
    } else {
      console.warn('Permissions API not supported in this browser.');
    }
  };

  // Fetch the user's location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          });
        },
        (err) => {
          setError('Unable to fetch location. Please allow location access.');
          console.error(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return { location, permissionState, error, fetchLocation };
};

export default useLocationPermission;
