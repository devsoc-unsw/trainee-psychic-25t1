'use client';

import { useState, useEffect } from "react";
import Popup from "./Popup";

const NUM_ROWS = 8;
const NUM_COLS = 8;

const NUM_MINES = 10;

export default function MineSweeperPage() {
  const [gameRunning, setGameRunning] = useState(true);
  
  function createBoard() {
    // if (!gameRunning) return;

    const myArray = [];

    for (let i = 0; i < NUM_ROWS; i++) {
      myArray[i] = [];
      for (let j = 0; j < NUM_COLS; j++) {
        myArray[i][j] = {
          'bomb': false,
          'revealed': false,
          'i': i,
          'j': j,
          'numMines': 0}; 
      }
    }

    const max = NUM_ROWS;

    const mines = new Set();

    function getMineCoords() {

      while (mines.size < NUM_MINES) {
        const x = Math.floor(Math.random() * max);
        const y = Math.floor(Math.random() * max);
        const coords = [x,y];
        
        mines.add(coords);
      }
    }

    getMineCoords();

    for (const coords of mines) {
      const [x, y] = coords;
      myArray[x][y] = {'bomb': true, 'revealed': false, 'flagged': false}; 
    }

    return myArray;
  }

  function displayBoard(board, clickTile , flagMine) {
  const theBoard = [];

  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_ROWS; j++) {
      const uniqueKey = `${i}-${j}`;
      const cellId = `cell-${i}-${j}`;

      const cur = board[i][j];

      ///////////////////////////////////////////
      /// Styling changes
      ///////////////////////////////////////////

      const isLightTile = (i + j) % 2 === 0;

      const flagged = (
        <div
          key={uniqueKey}
          id={cellId}
          onContextMenu={(event) => flagMine(i, j, event)}
          className="w-10 h-10 flex items-center justify-center text-white bg-red-600 border border-red-700 select-none cursor-pointer"
        >
          x
        </div>
      );

      const explodedMine = (
        <div
          key={uniqueKey}
          id={cellId}
          className="w-10 h-10 flex items-center justify-center bg-[#cc9494] border-[#000000] border select-none"
        >
          <img src="/images/bomb.png" alt="Mine" className="w-6 h-6" />
        </div>
      );

      const noMines = (
        <div
          key={uniqueKey}
          id={cellId}
          onContextMenu={(event) => flagMine(i, j, event)}
          onClick={() => clickTile(i, j)}
          className={`w-10 h-10 flex items-center justify-center border select-none cursor-pointer ${
            isLightTile
              ? "bg-[#fedfbf] border-[#967f69]"
              : "bg-[#e8d0b8] border-[#967f69]"
          }`}
        />
      );

      const nearbyMines = (
        <div
          key={uniqueKey}
          id={cellId}
          onContextMenu={(event) => flagMine(i, j, event)}
          onClick={() => clickTile(i, j)}
          className={`w-10 h-10 flex items-center justify-center font-bold border select-none cursor-pointer ${
            isLightTile
              ? "bg-[#fedfbf] border-[#967f69]"
              : "bg-[#e8d0b8] border-[#967f69]"
          }`}
        >
          {cur.numMines}
        </div>
      );

      const defaultTile = (
        <div
          key={uniqueKey}
          id={cellId}
          onContextMenu={(event) => flagMine(i, j, event)}
          onClick={() => clickTile(i, j)}
          className={`w-10 h-10 flex items-center justify-center border select-none cursor-pointer hover:brightness-110 ${
            isLightTile
              ? "bg-blue-300 border-blue-500"
              : "bg-blue-400 border-blue-600"
          }`}
        />
      );

      //////////////////////////////

      // this is what the player will see
      function gameMode() {
        if (cur.flagged) {
          theBoard.push(flagged);
        } else {
          if (cur.revealed) {
            if (cur.bomb) {
              theBoard.push(explodedMine);
            } else {
              if (cur.numMines === 0) {
                theBoard.push(noMines);
              } else {
                theBoard.push(nearbyMines);
              }
            }
          } else {
            theBoard.push(defaultTile);
          }
        }
      }
      gameMode();

      // for debugging, liek when you want to see where the mines
      // are placed on the map
      function debugMode() {
        // check if its flagged
        if (cur.flagged) {
          theBoard.push(<div key={uniqueKey} id={cellId} onContextMenu={(event) => flagMine(i, j, event)} className="btn btn-dash btn-error"></div>);
        } 
        else {
          if (cur.bomb) {
            if (cur.revealed) {
              theBoard.push(<div key={uniqueKey} onContextMenu={(event) => flagMine(i, j, event)} onClick={() => clickTile(i, j)} id={cellId} className="btn btn-success">MINE</div>);
            } else {                
              theBoard.push(<div key={uniqueKey} onContextMenu={(event) => flagMine(i, j, event)} onClick={() => clickTile(i, j)} id={cellId} className="btn btn-error">MINE</div>);
            }
          } else {
            if (cur.revealed) {
              theBoard.push(<div key={uniqueKey} id={cellId} onClick={() => clickTile(i, j)} className="btn btn-warning">{board[i][j].numMines}</div>);
            }
            else {
              theBoard.push(<div key={uniqueKey} id={cellId} onContextMenu={(event) => flagMine(i, j, event)} onClick={() => clickTile(i, j)} className="btn btn-soft btn-success">{board[i][j].numMines}</div>);
            }
          }
        } 
      }
    }
  }
  return theBoard;
}

  const [board, setBoard] = useState(createBoard());
  const [firstMoveMade, setFirstMoveMade] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [numFlags, setNumFlags] = useState(NUM_MINES);
  const [popup, setPopup] = useState(false);


  function clickTile(row, col) {
    if (!gameRunning) return;

    const newBoard = JSON.parse(JSON.stringify(board)); 

    function countAdjacentMines(i, j) {
      let numMines = 0;
      if (i > 0 && newBoard[i - 1][j].bomb === true) {
        numMines++;
      } 
      // check j > 0
      if (j > 0 && newBoard[i][j - 1].bomb === true) {
        numMines++;
      } 
      // check that its not within the maxbound
      if (i < NUM_ROWS - 1 && newBoard[i + 1][j].bomb === true) {
        numMines++;
      } 
      // check y coord is not within the max bound.
      if (j < NUM_COLS - 1 && newBoard[i][j + 1].bomb === true) {
        numMines++;
      }

      // check diagonals
      // top left diagonal
      if (i > 0 && j > 0 && newBoard[i-1][j-1].bomb === true) {
        numMines++;
      }

      // top right diagonal
      if (i < NUM_COLS - 1 && j > 0 && newBoard[i+1][j-1].bomb === true) {
        numMines++;
      }

      // bottom left diagonal
      if (i > 0 && j < NUM_COLS - 1 && newBoard[i-1][j+1].bomb === true) {
        numMines++;
      }

      // bottom right diagonal
      if (i < NUM_COLS - 1 && j < NUM_COLS - 1 && newBoard[i+1][j+1].bomb === true) {
        numMines++;
      }
      return numMines;
    }

    for (let i = 0; i < NUM_ROWS; i++) {
      for (let j = 0; j < NUM_ROWS; j++) {
        newBoard[i][j].numMines = countAdjacentMines(i, j);
      }
    }

    setBoard(newBoard);

    function relocateMine(board, r, c) {
      while (true) {
        const x = Math.floor(Math.random() * NUM_ROWS);
        const y = Math.floor(Math.random() * NUM_COLS);

        if (!board[x][y].bomb) {
          board[x][y].bomb = true;
          break;
        }
      }
      board[r][c].bomb = false;
      return board;
    }

    if (newBoard[row][col].bomb === true) {
      let bombBoard;
      if (!firstMoveMade) {
        bombBoard = relocateMine(newBoard, row, col);
        setFirstMoveMade(true);
      } else { 
        bombBoard = revealMines(board);
        setGameRunning(false);
        setGameOver(true);
        setPopup(true);
      }
      setBoard(bombBoard);
      return;
    }
    const queue = [];

    if (newBoard[row][col].numMines === 0) {
      queue.push(newBoard[row][col]);
    } else {
      newBoard[row][col].revealed = true;
      setBoard(newBoard);
    }

    function addNeighbours(r, c, queue) {
      if (r > 0 && newBoard[r-1][c].numMines === 0 && !newBoard[r-1][c].revealed) {
        queue.push(newBoard[r-1][c]);
      }

      if (r < NUM_COLS - 1 && newBoard[r+1][c].numMines === 0 && !newBoard[r+1][c].revealed) {
        queue.push(newBoard[r+1][c]);
      }

      if (c > 0 && newBoard[r][c - 1].numMines === 0 && !newBoard[r][c - 1].revealed) {
        queue.push(newBoard[r][c - 1]);
      }

      if (c < NUM_COLS - 1 && newBoard[r][c + 1].numMines === 0 && !newBoard[r][c + 1].revealed) {
        queue.push(newBoard[r][c + 1]);
      }
    }

    const newlyReviewedTiles = [];

    while (queue.length > 0) {
      const element = queue.shift();
      
      element.revealed = true;
      newlyReviewedTiles.push(element);

      const x = element.i;
      const y = element.j;

      addNeighbours(x, y, queue);
    }
    
    function reviewNeighbours(r, c) {
      if (r > 0 && !newBoard[r-1][c].revealed) {
        newBoard[r-1][c].revealed = true;
      }

      if (r < NUM_COLS - 1 && !newBoard[r+1][c].revealed) {
        newBoard[r+1][c].revealed = true;
      }

      if (c > 0 && !newBoard[r][c - 1].revealed) {
        newBoard[r][c - 1].revealed = true;
      }

      if (c < NUM_COLS - 1 && !newBoard[r][c + 1].revealed) {
        newBoard[r][c + 1].revealed = true;
      }

      if (c > 0 && r > 0 && !newBoard[r - 1][c - 1].revealed) {
        newBoard[r - 1][c - 1].revealed = true;
      }

      if (r < NUM_COLS - 1 && c > 0 && !newBoard[r + 1][c - 1].revealed) {
        newBoard[r + 1][c - 1].revealed = true;
      }

      if (r > 0 && c < NUM_COLS - 1 && !newBoard[r - 1][c + 1].revealed) {
        newBoard[r - 1][c + 1].revealed = true;
      }

      if (r < NUM_COLS - 1 && c < NUM_COLS - 1 && !newBoard[r + 1][c + 1].revealed) {
        newBoard[r + 1][c + 1].revealed = true;
      }
    }

    while (newlyReviewedTiles.length > 0) {

      // ok, get the element
      const element = newlyReviewedTiles.shift();
      element.revealed = true;
      
      const x = element.i;
      const y = element.j;

      reviewNeighbours(x,y);
    }

    if (!firstMoveMade) {
      setFirstMoveMade(true);
    }

    setBoard(newBoard);
  }

  function flagMine(row, col, event) {
    if (!gameRunning) return;
    event.preventDefault();
    if (!firstMoveMade) return;


    const newBoard = JSON.parse(JSON.stringify(board));
    // if its flagged when u get a flag back
    if (newBoard[row][col].flagged) {
      setNumFlags(prev => prev + 1);
    }
    else {
      if (numFlags === 0) return;
      setNumFlags(prev => prev - 1);
    }


    newBoard[row][col].flagged = !newBoard[row][col].flagged;

    setBoard(newBoard);

  };

  const boardUI = displayBoard(board, clickTile, flagMine);

  function revealMines(board) {
    for (let i = 0; i < NUM_ROWS; i++) {
      for (let j = 0; j < NUM_COLS; j++) {
        if (board[i][j].bomb) {
          board[i][j].revealed = true;
        }
      }
    }
    return board;
  }

  useEffect(() => {
    if (!gameRunning) return;
    const cellsWithNoAdjacentMines = board.flat().filter(cell => cell.bomb === false);
  
    const allRevealed = cellsWithNoAdjacentMines.every(cell => cell.revealed);
  
    if (allRevealed) {
      // reveal mines here
      setBoard(revealMines(board));
      setGameRunning(false);
      setGameWin(true);
      setPopup(true);
    }
  }, [board]);

  function playAgain() {

    setGameRunning(true);
    setFirstMoveMade(false);
    setGameOver(false);
    setGameWin(false);
    setPopup(false);

    setBoard(createBoard());
  }


  return (
    <div className="flex flex-col items-center justify-between h-[55vh]">
      <div className="grid grid-cols-8 w-fit mx-auto mt-10">
        {boardUI}
      </div>
      {popup && !gameRunning && (gameOver || gameWin) && <Popup gameOver={gameOver} close={() => setPopup(false)}/>}
      <button onClick={playAgain} className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
        Restart
      </button>
    </div>
  );
}