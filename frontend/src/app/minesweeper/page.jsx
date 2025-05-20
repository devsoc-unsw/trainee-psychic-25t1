'use client';


function createBoard() {
  const rows = 10;
  const cols = 10;

  const myArray = [];
  

  for (let i = 0; i < rows; i++) {
    myArray[i] = [];
    for (let j = 0; j < cols; j++) {
      myArray[i][j] = 0; 
    }
  }

  const max = 10;

  const mines = new Set();

  function getMineCoords() {

    while (mines.size < 10) {
      const x = Math.floor(Math.random() * max);
      const y = Math.floor(Math.random() * max);
      const coords = [x,y];
        
      mines.add(coords);
    }
  }

  getMineCoords();

  for (const coords of mines) {
    const [x, y] = coords;
    myArray[x][y] = 1;
  }

  // debugging
  // console.log(myArray);
  return myArray;
}

function displayBoard(board) {
  const theBoard = [];

  function checkAdjacent(i, j) {
    let numMines = 0;
    // check i > 0
    if (i > 0 && board[i - 1][j] === 1) {
      numMines++;
    } 
    // check j > 0
    if (j > 0 && board[i][j - 1] === 1) {
      numMines++;
    } 
    // check that its not within the maxbound
    if (i < 9 && board[i + 1][j] === 1) {
      numMines++;
    } 
    // check y coord is not within the max bound.
    if (j < 9 && board[i][j + 1] === 1) {
      numMines++;
    }

    // check diagonals
    // top left diagonal
    if (i > 0 && j > 0 && board[i-1][j-1] === 1) {
      numMines++;
    }

    // top right diagonal
    if (i < 9 && j > 0 && board[i+1][j-1] === 1) {
      numMines++;
    }

    // bottom left diagonal
    if (i > 0 && j < 9 && board[i-1][j+1] === 1) {
      numMines++;
    }

    // bottom right diagonal
    if (i < 9 && j < 9 && board[i+1][j+1] === 1) {
      numMines++;
    }

    return numMines;
  }
  
  function handleClick(event) {
    const buttonElement = event.target;

    const buttonText = buttonElement.textContent;
    console.log(buttonText);
    const clickedId = event.currentTarget.id;
    console.log(`Button with ID: ${clickedId} was clicked.`);
  }

  
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const uniqueKey = `${i}-${j}`;
      const cellId = `cell-${i}-${j}`;
      if (board[i][j] === 1) {
        theBoard.push(<div key={uniqueKey} id={cellId} className="btn btn-warning">MINE</div>);
      } else {
        theBoard.push(<div key={uniqueKey} id={cellId} onClick={handleClick} className="btn btn-success">{checkAdjacent(i, j)}</div>);
      }
    }
  }

  return theBoard;
}


export default function MineSweeperPage() {

  const board = createBoard();
  // console.log(board);
  const theBoard = displayBoard(board);

  return (
    <>
      <div
        className="grid grid-cols-10 w-1/2 h-1/2 mx-auto"
      >
        {theBoard}
      </div>
    </>
  );
}