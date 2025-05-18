"use client"
import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Quiz(props) {
    const [showShape, setShowShape] = React.useState(false)
    const [coords, setCoords] = React.useState({undefined, undefined});

    const [locationIndex, setLocationIndex] = React.useState(0);
    const locations = props.location

    function getCoords(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setShowShape(true)
        setCoords({x, y})
    }
    
    function updateIndex() {
        if (locationIndex < 4) {
            setLocationIndex(prevIndex => prevIndex + 1)
            setShowShape(false)
        } else {
            console.log("game over!")
        }
    }


    return (
            <div className="flex h-1/2 w-6/7 mx-auto">
                <div onClick={getCoords}>
                        <TransformWrapper>
                            <TransformComponent>
                                <img src="/images/kensomap.gif" alt="Kensomap" className="w-full h-full object-fill" />
                                        {showShape && <div className="bg-red-500 w-5 h-5 absolute" style={{ left: `${coords.x}px`, top: `${coords.y}px`, transform: 'translate(-50%, -50%)' }}>.</div>}
                            </TransformComponent>
                    </TransformWrapper>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex flex-col">
                    <div className='w-[450px] h-[460px]'>
                        <img className='w-full h-full object-cover' src={locations[locationIndex]}></img>
                    </div>
                    <div className='flex flex-col mx-auto mt-4'>
                        {showShape && <button onClick={updateIndex} className="btn btn-primary w-1/2 mb-5">Lock in</button>}
                        <p>Score: 0 | High Score: 0</p>
                    </div>
                </div>
            </div>
    )
}