import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView({ doctors, userLocation }) {
  // Default to NYC if no user location is provided
  const center = userLocation ? [userLocation.lat, userLocation.lon] : [40.7128, -74.0060];

  return (
    <div className="w-full h-full min-h-[400px] rounded-[1.75rem] overflow-hidden border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] z-0">
      <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lon]}>
            <Popup>
              <strong>You are here</strong>
            </Popup>
          </Marker>
        )}
        {doctors.map(doc => (
          <Marker key={doc.id} position={[doc.location_lat, doc.location_lon]}>
            <Popup>
              <div className="text-center">
                <strong className="block text-slate-800">Dr. {doc.name}</strong>
                <span className="text-xs text-slate-500">{doc.specialization}</span><br />
                <span className="text-xs font-medium">${doc.consultation_fee} / session</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
