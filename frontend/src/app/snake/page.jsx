'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Constants
const BOARDBACKGROUND = 'white';
const SNAKECOLOR = 'lightgreen';
const SNAKEBORDER = 'black';
const FOODCOLOR = 'red';
const UNITSIZE = 25;
const GAME_SPEED = 100;
const GAME_ID = 2;

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
  const runningRef = useRef(running);
  const velocityRef = useRef(velocity);
  const foodRef = useRef(food);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);

  const gameWidth = 500;
  const gameHeight = 500;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    if (canvasRef.current) canvasRef.current.focus();
    gameStart();
  }, []);

  useEffect(() => {
    if (running) {
      nextTick();
    }
  }, [running]);

  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    clearBoard();
    drawFood();
    drawSnake();
    if (!runningRef.current && (score > 0 || snake.length > 0 )) {
      displayGameOver();
      uploadGameScore(score);
    }
  }, [snake, food, running, score]);

  function gameStart() {
    setRunning(false);
    setScore(0);
    setVelocity([UNITSIZE, 0]);
    setSnake([
      { x: UNITSIZE * 4, y: 0 }, { x: UNITSIZE * 3, y: 0 },
      { x: UNITSIZE * 2, y: 0 }, { x: UNITSIZE, y: 0 },
      { x: 0, y: 0 }
    ]);
    createFood();
    setRunning(true);
    if (canvasRef.current) canvasRef.current.focus();
  }

  function nextTick() {
    if (runningRef.current) {
      setTimeout(() => {
        moveSnake(); 
        if (runningRef.current) {
          nextTick();
        }
      }, GAME_SPEED);
    }
  }

  function clearBoard() {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.fillStyle = BOARDBACKGROUND;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
  }

  function createFood() {
    function randomFoodCoordinate(maxDimension) {
      const numSlots = maxDimension / UNITSIZE;
      return Math.floor(Math.random() * numSlots) * UNITSIZE;
    }
    const foodX = randomFoodCoordinate(gameWidth);
    const foodY = randomFoodCoordinate(gameHeight);
    setFood([foodX, foodY]);
  }

  function moveSnake() {
    if (!runningRef.current) return; 

    setSnake(prevSnake => {
      if (prevSnake.length === 0) {
        if (runningRef.current) setRunning(false);
        return [];
      }

      const currentActualVelocity = velocityRef.current;
      const currentActualFood = foodRef.current; 

      const currentHead = prevSnake[0];
      const newHead = {
        x: currentHead.x + currentActualVelocity[0],
        y: currentHead.y + currentActualVelocity[1]
      };

      if (newHead.x < 0 || newHead.x >= gameWidth || newHead.y < 0 || newHead.y >= gameHeight) {
        setRunning(false);
        return prevSnake;
      }

      const ateFoodProvisionalForSelfCollision = (newHead.x === currentActualFood[0] && newHead.y === currentActualFood[1]);
      for (let i = 0; i < prevSnake.length; i++) {
        if (!ateFoodProvisionalForSelfCollision && i === prevSnake.length - 1) {
          continue;
        }
        if (newHead.x === prevSnake[i].x && newHead.y === prevSnake[i].y) {
          setRunning(false);
          return prevSnake;
        }
      }

      let newSnakeArray = [newHead, ...prevSnake];
      const ateFood = (newHead.x === currentActualFood[0] && newHead.y === currentActualFood[1]);

      if (ateFood) {
        setScore(s => s + 1);
        createFood();
      } else {
        newSnakeArray = newSnakeArray.slice(0, -1);
      }
      return newSnakeArray;
    });
  }

  function changeDirection(event) {
    const keyPressed = event.key;

    const KEY_UP = 'w'; const ARROW_UP = 'ArrowUp';
    const KEY_LEFT = 'a'; const ARROW_LEFT = 'ArrowLeft';
    const KEY_DOWN = 's'; const ARROW_DOWN = 'ArrowDown';
    const KEY_RIGHT = 'd'; const ARROW_RIGHT = 'ArrowRight';

    const currentVel = velocityRef.current;
    const goingUp = (currentVel[1] === -UNITSIZE);
    const goingDown = (currentVel[1] === UNITSIZE);
    const goingRight = (currentVel[0] === UNITSIZE);
    const goingLeft = (currentVel[0] === -UNITSIZE);

    let newVelocity = currentVel;

    switch (true) {
    case ((keyPressed === KEY_LEFT || keyPressed === ARROW_LEFT) && !goingRight):
      newVelocity = [-UNITSIZE, 0]; break;
    case ((keyPressed === KEY_UP || keyPressed === ARROW_UP) && !goingDown):
      newVelocity = [0, -UNITSIZE]; break;
    case ((keyPressed === KEY_RIGHT || keyPressed === ARROW_RIGHT) && !goingLeft):
      newVelocity = [UNITSIZE, 0]; break;
    case ((keyPressed === KEY_DOWN || keyPressed === ARROW_DOWN) && !goingUp):
      newVelocity = [0, UNITSIZE]; break;
    default: return;
    }
    setVelocity(newVelocity);
  }


  function displayGameOver() {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.font = "50px 'MV Boli', cursive";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
  }

  async function uploadGameScore(score) {
    if (score > 0) {
      try {
        await axios.post(
          'http://localhost:8000/scores/upload',
          { game_id: GAME_ID, score },
          { withCredentials: true }
        );
      } catch(error) {
        console.error("Failed to upload score: ", error)
      }
    } 
  }

  return (
    <div className="text-center">
      <canvas
        ref={canvasRef}
        width={gameWidth}
        height={gameHeight}
        className="border-solid border-black border-[3px] mx-auto block"
        tabIndex={0}
        onKeyDown={changeDirection}
      />
      <div className="text-[100px] font-['Permanent_Marker',_cursive]">{score}</div>
      <button
        id="resetBtn"
        onClick={gameStart}
        className="btn btn-neutral"
      >
        Reset
      </button>
    </div>
  );

  ////////////////////////////////
  /// Drawing Functions
  ////////////////////////////////

  function drawFood() {
    const ctx = ctxRef.current;
    if (!ctx || !food) return;
    const [foodX, foodY] = food;

    const centerX = foodX + (UNITSIZE / 2);
    const centerY = foodY + (UNITSIZE / 2);
    const radius = UNITSIZE / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = FOODCOLOR;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(centerX - 4, centerY - 4, radius / 3, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.globalAlpha = 0.3;
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius);
    ctx.lineTo(centerX, centerY - radius - 5);
    ctx.strokeStyle = 'brown';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  function drawSnake() {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.fillStyle = SNAKECOLOR;
    ctx.strokeStyle = SNAKEBORDER;
    snake.forEach(snakePart => {
      ctx.fillRect(snakePart.x, snakePart.y, UNITSIZE, UNITSIZE);
      ctx.strokeRect(snakePart.x, snakePart.y, UNITSIZE, UNITSIZE);
    });
  }
}