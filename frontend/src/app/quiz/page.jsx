
"use client"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function QuizPage() {

    return (
        <div className="h-full">
            <h1>Hello World</h1>
            <TransformWrapper>
                <TransformComponent>
                    <div className="h-1/2 w-auto">
                        <img src="/images/kensomap.gif" alt="Kensomap" className="w-full h-full object-contain" />
                    </div>
                </TransformComponent>
            </TransformWrapper>
           
        </div>
    )

}