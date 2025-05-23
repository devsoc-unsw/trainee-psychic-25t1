'use client';

import { useState, useEffect } from "react";

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

        // this is what the player will see
        function gameMode() {
          if (cur.flagged) {
            theBoard.push(<div key={uniqueKey} id={cellId} onContextMenu={(event) => flagMine(i, j, event)} className="btn btn-dash btn-error"></div>);
          } 
          else {
            if (cur.revealed) {
              if (cur.bomb) {
                theBoard.push(<div key={uniqueKey} id={cellId} className="btn btn-error">MINE</div>);
              }
              else {
                if (cur.numMines === 0) {
                  theBoard.push(<div key={uniqueKey} id={cellId} onContextMenu={(event) => flagMine(i, j, event)} onClick={() => clickTile(i, j)} className="btn btn-soft btn-success"></div>);
                } else {
                  theBoard.push(<div key={uniqueKey} id={cellId} onContextMenu={(event) => flagMine(i, j, event)} onClick={() => clickTile(i, j)} className="btn btn-warning">{board[i][j].numMines}</div>);
                }
              }

            } else {
              theBoard.push(<div key={uniqueKey} id={cellId} onContextMenu={(event) => flagMine(i, j, event)} onClick={() => clickTile(i, j)} className="btn btn-info"></div>);
            }
          }
        }

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

        debugMode();
      }
    }

    return theBoard;
  }


  const [board, setBoard] = useState(createBoard());
  const [firstMoveMade, setFirstMoveMade] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [numFlags, setNumFlags] = useState(NUM_MINES);


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
    }
  }, [board]);

  function playAgain() {

    setGameRunning(true);
    setFirstMoveMade(false);
    setGameOver(false);
    setGameWin(false);

    setBoard(createBoard());
  }


  return (
    <>
      <h1>Minesweeper</h1>
      <div
        className="grid grid-cols-8 w-1/2 h-1/2 mx-auto"
      >
        {boardUI}
      </div>

      {!gameRunning && gameOver && <h1>Game over!</h1>}
      {!gameRunning && gameWin && <h1>GG!</h1>}
      {!gameRunning && (gameOver || gameWin) && <button onClick={playAgain}>Play Again</button>}
    </>
  );
}