'use client';

import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

export default function Quiz(props) {

  const {locations} = props;
  const unswCoordinates = [-33.9173, 151.2313];

  const [icon, setIcon] = useState(null);
  // Player's guess marker position
  const [markerPosition, setMarkerPosition] = useState(unswCoordinates);

  // State for the correct answer marker
  const [answerMarkerPosition, setAnswerMarkerPosition] = useState(null); 
  const [showAnswerMarker, setShowAnswerMarker] = useState(false); 

  const [showShape, setShowShape] = useState(false); 
  const [locationIndex, setLocationIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerReveal, setAnswerReveal ] = useState(false);

  useEffect(() => {
    const L = require('leaflet');
    setIcon(L.icon({ iconUrl: "/images/marker-icon.png" }));
  }, []);


  const handleMarkerDragEnd = (e) => {
    const marker = e.target;
    const newPosition = marker.getLatLng();
    setMarkerPosition([newPosition.lat, newPosition.lng]);
    setShowShape(true); 
    setShowAnswerMarker(false); 
    setAnswerMarkerPosition(null);
  };

  // Called by "Lock in & Next" button - advances the quiz
  function updateIndex() {
    if (locations && locationIndex < locations.length - 1) {
      setLocationIndex(prevIndex => prevIndex + 1);
      setShowShape(false); 
      setShowAnswerMarker(false); 
      setAnswerMarkerPosition(null); 
    } else {
      console.log("Game over or no more locations!");
      setShowShape(false); 
      setShowAnswerMarker(false);
    }
  }


  function startNextRound() {
    setAnswerReveal(false);
    updateIndex();
  }

  // Called by a "Reveal Location" button - shows the correct answer marker
  function revealTrueLocation() { // Renamed to avoid confusion
    if (!locations || !locations[locationIndex]) {
      console.error("Locations data is not available.");
      return;
    }
    const currentLoc = locations[locationIndex];

    if (currentLoc && typeof currentLoc.x === 'number' && typeof currentLoc.y === 'number') {
      if (answerReveal) return;

      setAnswerMarkerPosition([currentLoc.x, currentLoc.y]);
      setShowAnswerMarker(true);
      setAnswerReveal(true);
    } else {
      console.error("Could not find coordinates for location index:", locationIndex, "or data is malformed.");
    }
  }

  function MyComponent() {
    useMapEvents({
      click: (e) => {

        if (answerReveal) return;
        
        const { lat, lng } = e.latlng;
        console.log(`Player guessed at: Latitude: ${lat}, Longitude: ${lng}`);
        setMarkerPosition([lat, lng]); 
        setShowShape(true); 
        setShowAnswerMarker(false); 
        setAnswerMarkerPosition(null); 
      },
    });
    return null;
  }

  if (!icon) {
    return <div>Loading map resources...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <MapContainer center={unswCoordinates} zoom={16} minZoom={16} maxZoom={18} zoomDelta={0.2} className="w-full h-[500px]">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {markerPosition && (
          <Marker
            draggable={true}
            eventHandlers={{dragend: handleMarkerDragEnd}}
            icon={icon}
            position={markerPosition}
          />
        )}

        {showAnswerMarker && answerMarkerPosition && (
          <Marker
            icon={icon} 
            position={answerMarkerPosition}
            draggable={false}
          />
        )}
        <MyComponent />
      </MapContainer>
      <div className="divider divider-horizontal"></div>
      <div className="flex flex-col">
        <div className="mb-4">
          {(locations && locations[locationIndex]) ? (
            <img
              className='w-[800px] h-[500px] object-cover mx-auto'
              src={locations[locationIndex].img}
              alt={`Location ${locationIndex + 1}`}
            />
          ) : (
            <div className='w-[400px] h-[300px] flex items-center justify-center bg-gray-200 text-gray-500 mx-auto'>
              <p>No image to display or end of quiz.</p>
            </div>
          )}
        </div>
        <div className='flex flex-col items-center mx-auto mt-4'>
          {locations && locations.length > 0 && !showAnswerMarker &&
            <button onClick={revealTrueLocation} className="btn btn-secondary w-1/2 mb-5">Lock In</button>
          }
          {
            answerReveal &&
            <button onClick={startNextRound} className="btn btn-primary w-full mb-5">Start next round</button>
          }
          <p>Score: {score} | High Score: 0</p>
        </div>
      </div>
    </div>
  );
}