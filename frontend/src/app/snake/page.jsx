'use client';

import { useState, useEffect, useRef } from 'react';

// Constants
const BOARDBACKGROUND = 'white';
const SNAKECOLOR = 'lightgreen'; 
const SNAKEBORDER = 'black';
const FOODCOLOR = 'red';
const UNITSIZE = 25;

export default function SnakeGame() {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [food, setFood] = useState([0, 0]);
  const [velocity, setVelocity] = useState([UNITSIZE, 0]);
  const [snake, setSnake] = useState([ 
    { x: UNITSIZE * 4, y: 0 },
    { x: UNITSIZE * 3, y: 0 },
    { x: UNITSIZE * 2, y: 0 },
    { x: UNITSIZE, y: 0 },
    { x: 0, y: 0 }
  ]);


  const canvasRef = useRef(null);
  const ctxRef = useRef(null); 

  // Game dimensions
  const gameWidth = 500;
  const gameHeight = 500;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; 
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx; 

    ctx.fillStyle = BOARDBACKGROUND;
    ctx.fillRect(0, 0, gameWidth, gameHeight);

    const newFoodPosition = createFood();

    drawFood(newFoodPosition);

  }, []); 


  function createFood() {
    function getRandomGridCoordinate(boardDimension) {
      const numSlots = boardDimension / UNITSIZE;
      const randomIndex = Math.floor(Math.random() * numSlots);
      return randomIndex * UNITSIZE;
    }

    const foodX = getRandomGridCoordinate(gameWidth);
    const foodY = getRandomGridCoordinate(gameHeight);

    setFood([foodX, foodY]); 
    return [foodX, foodY];  
  }


  function drawFood(positionToDraw) {
    const ctx = ctxRef.current;
    if (!ctx) return; 

    let x, y;
    if (positionToDraw) {
      [x, y] = positionToDraw; 
    } else {
      [x, y] = food; 
    }

    ctx.fillStyle = FOODCOLOR;
    ctx.strokeStyle = SNAKEBORDER; 
    ctx.fillRect(x, y, UNITSIZE, UNITSIZE);
    ctx.strokeRect(x, y, UNITSIZE, UNITSIZE);
  }

  function changeDirection(e) {
    console.log('Key pressed:', e.key);
  }

  return (
    <div className="text-center">
      <canvas
        ref={canvasRef}
        width={gameWidth}
        height={gameHeight}
        className="border border-black mx-auto block" 
        tabIndex={0} 
        onKeyDown={changeDirection} 
      />
      <div className="text-8xl">{score}</div>
      <button
        onClick={() => {
          setScore(0);
        }}
        className="text-2xl btn btn-primary w-[100px] h-[50px]"
      >
        Reset
      </button>
    </div>
  );
}