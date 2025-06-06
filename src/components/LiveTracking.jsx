'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for missing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const center = {
  lat: -3.745,
  lng: -38.523,
};

const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);

  useEffect(() => {
    if (!navigator?.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return;
    }

    const updatePosition = (position) => {
      const { latitude, longitude } = position.coords;
      console.log("Updated position:", latitude, longitude);
      setCurrentPosition({ lat: latitude, lng: longitude });
    };

    const handleError = (error) => {
      console.log("Geolocation error:", error.message, error);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
        default:
          console.log("An unknown error occurred.");
          break;
      }
    };

    navigator.geolocation.getCurrentPosition(updatePosition, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });

    const watchId = navigator.geolocation.watchPosition(updatePosition, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <MapContainer center={currentPosition} zoom={15} scrollWheelZoom style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={currentPosition} />
        <RecenterMap position={currentPosition} />
      </MapContainer>
    </div>
  );
};

export default LiveTracking;

