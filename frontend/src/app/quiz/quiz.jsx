'use client';

import { useEffect } from 'react'; // useState is removed
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// These are for the DEFAULT Leaflet icon
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrlfromLeaflet from 'leaflet/dist/images/marker-icon.png'; // Renamed to avoid conflict
import shadowUrlfromLeaflet from 'leaflet/dist/images/marker-shadow.png'; // Renamed

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Removed unused imports

export default function Quiz({ locations }) {
  const unswCoordinates = [-33.9173, 151.2313];
  // const [icon, setIcon] = useState(null); // REMOVE THIS

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

  // REMOVE THIS useEffect for custom icon if using the default
  // useEffect(() => {
  //   // const L = require('leaflet'); // Already imported
  //   setIcon(L.icon({ iconUrl: "/images/marker-icon.png" }));
  // }, []);

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
          // icon={icon} // REMOVE THIS if using default
        >
          {/* Remove explicit position from Popup if it's a child of Marker */}
          <Popup>
            <div>
              <h2>{"Name: " + location.name}</h2>
              {/* For debugging: */}
              <p>Coords: {location.coords[0]}, {location.coords[1]}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}