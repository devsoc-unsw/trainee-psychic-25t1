'use client';

import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, Marker, useMapEvents, Polyline } from 'react-leaflet';

export default function Quiz(props) {

  const {locations} = props;
  const unswCoordinates = [-33.9173, 151.2313];

  const [icon, setIcon] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(unswCoordinates); 

  const [answerMarkerPosition, setAnswerMarkerPosition] = useState(null);
  const [showAnswerMarker, setShowAnswerMarker] = useState(false);

  const [showShape, setShowShape] = useState(false);
  const [locationIndex, setLocationIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerReveal, setAnswerReveal ] = useState(false);


  let currentPolylinePositions = [];
  if (markerPosition && locations && locations[locationIndex]) {
    const targetLocation = locations[locationIndex];
 
    if (typeof targetLocation.x === 'number' && typeof targetLocation.y === 'number') {
      currentPolylinePositions = [
        markerPosition, 
        [targetLocation.x, targetLocation.y], 
      ];
    }
  }

  useEffect(() => {
    const L = require('leaflet'); 
    setIcon(L.icon({ iconUrl: "/images/marker-icon.png" }));
  }, []);


  const handleMarkerDragEnd = (e) => {
    if (answerReveal) return;

    const marker = e.target;
    const newPosition = marker.getLatLng();
    setMarkerPosition([newPosition.lat, newPosition.lng]);
    setShowShape(true);
    setShowAnswerMarker(false);
    setAnswerMarkerPosition(null);
  };

  function updateIndex() {
    if (locations && locationIndex < locations.length - 1) {
      setLocationIndex(prevIndex => prevIndex + 1);
      setShowShape(false);
      setShowAnswerMarker(false);
      setAnswerMarkerPosition(null);
      setMarkerPosition(unswCoordinates);
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

  function revealTrueLocation() {
    if (answerReveal) return;

    if (!locations || !locations[locationIndex] || !markerPosition) {
      console.error("Locations data or player's guess is not available for reveal.");
      return;
    }
    const currentLoc = locations[locationIndex];

    if (currentLoc && typeof currentLoc.x === 'number' && typeof currentLoc.y === 'number') {
      const L = require('leaflet'); 

      // 1. Calculate Distance
      const playerLatLng = L.latLng(markerPosition[0], markerPosition[1]);
      const actualLatLng = L.latLng(currentLoc.x, currentLoc.y); 

      // distance in metres.
      const distance = playerLatLng.distanceTo(actualLatLng); 
      console.log(`Distance to target: ${distance.toFixed(0)} meters`);

      // 2. Scoring Logic (Example)
      let pointsAwarded = 0;

      // Within 50 metres, 250 metres and 1000 metres.
      const perfectDist = 50;     
      const goodDist = 250;       
      const okayDist = 1000;      

      if (distance <= perfectDist) {
        pointsAwarded = 1;
      } else if (distance <= goodDist) {
        pointsAwarded = 0.5;
      } else if (distance <= okayDist) {
        pointsAwarded = 0.2;
      }
      // else, pointsAwarded remains 0 if further than okayDist

      console.log(`Points awarded: ${pointsAwarded}`);
      setScore(prevScore => prevScore + pointsAwarded);

      // --- Original reveal logic ---
      setAnswerMarkerPosition([currentLoc.x, currentLoc.y]);
      setShowAnswerMarker(true);
      setAnswerReveal(true);
      setShowShape(false); // Hide "Lock In" button after revealing
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
            draggable={!answerReveal}
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
        {answerReveal && currentPolylinePositions.length === 2 && (
          <Polyline pathOptions={{color: 'purple', weight: 5}} positions={currentPolylinePositions} />
        )}
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
          {showShape && !answerReveal && locations && locations.length > 0 &&
            <button onClick={revealTrueLocation} className="btn btn-primary w-1/2 mb-5">Lock In</button>
          }
          {answerReveal &&
            <button onClick={startNextRound} className="btn btn-secondary w-full mb-5">Start next round</button>
          }
          {/* TODO: IMPLEMENT HIGH SCORE */}
          <p>Score: {score} | High Score: 0</p> 
        </div>
      </div>
    </div>
  );
}