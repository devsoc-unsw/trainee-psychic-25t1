
"use client"
import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useMousePosition from "./useMousePosition";
export default function QuizPage() {
    const {x,y} = useMousePosition();
    
    const [showShape, setShowShape] = React.useState(false)
    const [coords, setCoords] = React.useState({x, y});

    function getCoords() {
        setShowShape(true)
        setCoords({x, y})
    }

    return (
        <div className="h-full">
            <h1>Hello World</h1>
            <div onClick={getCoords}>
                <TransformWrapper>
                    <TransformComponent>
                        <div className="h-1/2 w-auto">
                            <img src="/images/kensomap.gif" alt="Kensomap" className="w-full h-full object-contain" />
                        </div>
                        {showShape && <div className="bg-red-500 w-5 h-5 absolute" style={{ left: `${coords.x}px`, top: `${coords.y}px` }}>.</div>}
                    </TransformComponent>
                </TransformWrapper>
            </div>

        </div>
    )

}