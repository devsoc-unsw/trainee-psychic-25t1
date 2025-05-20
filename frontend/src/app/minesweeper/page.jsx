'use client';

import { useState } from "react";

const NUM_ROWS = 8;
const NUM_COLS = 8;

function createBoard() {

  const myArray = [];
  

  for (let i = 0; i < NUM_ROWS; i++) {
    myArray[i] = [];
    for (let j = 0; j < NUM_COLS; j++) {
      myArray[i][j] = {
        'value': 0,
        'revealed': false,
        'i': i,
        'j': j,
        'numMines': 0}; 
    }
  }

  const max = NUM_ROWS;

  const mines = new Set();

  function getMineCoords() {

    while (mines.size < NUM_ROWS) {
      const x = Math.floor(Math.random() * max);
      const y = Math.floor(Math.random() * max);
      const coords = [x,y];
        
      mines.add(coords);
    }
  }

  getMineCoords();

  for (const coords of mines) {
    const [x, y] = coords;
    myArray[x][y] = {'value': 1, 'revealed': false}; 
  }

  function countAdjacentMines(i, j) {
    let numMines = 0;
    if (i > 0 && myArray[i - 1][j].value === 1) {
      numMines++;
    } 
    // check j > 0
    if (j > 0 && myArray[i][j - 1].value === 1) {
      numMines++;
    } 
    // check that its not within the maxbound
    if (i < NUM_ROWS - 1 && myArray[i + 1][j].value === 1) {
      numMines++;
    } 
    // check y coord is not within the max bound.
    if (j < NUM_COLS - 1 && myArray[i][j + 1].value === 1) {
      numMines++;
    }

    // check diagonals
    // top left diagonal
    if (i > 0 && j > 0 && myArray[i-1][j-1].value === 1) {
      numMines++;
    }

    // top right diagonal
    if (i < NUM_COLS - 1 && j > 0 && myArray[i+1][j-1].value === 1) {
      numMines++;
    }

    // bottom left diagonal
    if (i > 0 && j < NUM_COLS - 1 && myArray[i-1][j+1].value === 1) {
      numMines++;
    }

    // bottom right diagonal
    if (i < NUM_COLS - 1 && j < NUM_COLS - 1 && myArray[i+1][j+1].value === 1) {
      numMines++;
    }
    return numMines;
  }

  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_ROWS; j++) {
      myArray[i][j].numMines = countAdjacentMines(i, j);
    }
  }
  // debugging
  // console.log(myArray);
  return myArray;
}

function displayBoard(board, handleClick) {
  const theBoard = [];

 
  
  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_ROWS; j++) {
      const uniqueKey = `${i}-${j}`;
      const cellId = `cell-${i}-${j}`;
      
      const cur = board[i][j];

      // mines
      if (cur.value === 1) {
        theBoard.push(<div key={uniqueKey} id={cellId} className="btn btn-error">MINE</div>);
      } 
      // non-mines
      else {
        if (cur.revealed) {
          if (cur.numMines === 0) {
            theBoard.push(<div key={uniqueKey} id={cellId} onClick={() => handleClick(i, j)} className="btn btn-soft btn-success">{board[i][j].numMines}</div>);
          } else {
            theBoard.push(<div key={uniqueKey} id={cellId} onClick={() => handleClick(i, j)} className="btn btn-warning">{board[i][j].numMines}</div>);
          }
        } else {
          theBoard.push(<div key={uniqueKey} id={cellId} onClick={() => handleClick(i, j)} className="btn btn-success">{board[i][j].numMines}</div>);
        }
      }
    }
  }

  return theBoard;
}


export default function MineSweeperPage() {

  const [board, setBoard] = useState(createBoard());

  function handleClick(row, col) {
    const newBoard = JSON.parse(JSON.stringify(board)); 

    const queue = [];

    // console.log("supp");
    if (newBoard[row][col].numMines === 0) {
      // console.log("hi");
      queue.push(newBoard[row][col]);
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

    setBoard(newBoard);
  }

  const boardUI = displayBoard(board, handleClick);

  return (
    <>
      <h1>Minesweeper</h1>
      <div
        className="grid grid-cols-8 w-1/2 h-1/2 mx-auto"
      >
        {boardUI}
      </div>
    </>
  );
}