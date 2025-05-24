'use client';

import { useEffect, useState } from 'react'; 
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrlfromLeaflet from 'leaflet/dist/images/marker-icon.png'; 
import shadowUrlfromLeaflet from 'leaflet/dist/images/marker-shadow.png';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'; 

export default function Quiz({ locations }) {
  const unswCoordinates = [-33.9173, 151.2313];
 
  const [selectedPos, setSelectedPos] = useState(null);
  
  function MapEvents() {
    useMapEvents({
      click(e) {
        setSelectedPos(e.latlng);
      },
    });
    return null;
  }

  useEffect(() => {
    // THIS SETS UP THE DEFAULT LEAFLET ICON GLOBALLY
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: iconRetinaUrl.src,
      iconUrl: iconUrlfromLeaflet.src,       // Use the imported one
      shadowUrl: shadowUrlfromLeaflet.src,   // Use the imported one
    });
  }, []);

  if (!Array.isArray(locations)) {
    console.warn("Quiz component: 'locations' prop is not an array or is undefined.");
    locations = [];
  }

  return (
    <MapContainer center={unswCoordinates} zoom={16} minZoom={16} maxZoom={18} zoomDelta={0.2} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map(location => (
        <Marker
          key={location.name}
          position={location.coords}
        >
          <Popup>
            <div>
              <h2>{"Name: " + location.name}</h2>
              <p>Coords: {location.coords[0]}, {location.coords[1]}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      {selectedPos && <Marker position={selectedPos} />}
      <MapEvents/>
    </MapContainer>
  );
}