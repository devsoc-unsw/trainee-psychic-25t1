'use client'

import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // some weird error here - to do with having to dynamically load

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

export default function Quiz({locations}) {
  const unswCoordinates = [-33.9173, 151.2313];
  const bounds = [[unswCoordinates], [unswCoordinates]];
  // idt these bounds are correct - it still lets you zoom out 
  const icon = L.icon({ iconUrl: "/images/marker-icon.png" });
  const [markerPosition, setMarkerPosition] = useState(unswCoordinates);
  const [showShape, setShowShape] = useState(false);
  const [locationIndex, setLocationIndex] = useState(0);
  const [score, setScore] = useState(0);

  // need to reimplement logic for how to calculate score now that you only have
  // exact coordinates

  // bc we're using lat + lng, need to modify json file to work with this asw 
  const setCoordinates = (e) => {
    const marker = e.target;
    const newPosition = marker.getLatLng();
    setMarkerPosition([newPosition.lat, newPosition.lng]);
    console.log(newPosition)

    setShowShape(true);
  }


  function updateIndex() {
    if (locationIndex <= locations.length - 1) {
      setLocationIndex(prevIndex => prevIndex + 1);
      setShowShape(false);
    } else {
      console.log("game over!");
    }
  }

  function MyComponent() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        console.log(`Map clicked at: Latitude: ${lat}, Longitude: ${lng}`);
        // set the thing
      },
    })
    return null
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <MapContainer center={unswCoordinates} zoom={16} minZoom={16} maxZoom={18} zoomDelta={0.2} className="w-full h-[500px]">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker draggable={true} eventHandlers={{dragend: setCoordinates}} icon={icon} position={markerPosition} />
        <MyComponent />
      </MapContainer>
      <div className="divider divider-horizontal"></div>
        <div className="flex flex-col">
        <div>
          <img className='w-full h-full object-cover' src={locations[locationIndex].img}></img>
        </div>
        <div className='flex flex-col mx-auto mt-4'>
          {showShape && <button onClick={updateIndex} className="btn btn-primary w-1/2 mb-5">Lock in</button>}
          <p>Score: {score} | High Score: 0</p>
        </div>
      </div>
    </div>
  )
}