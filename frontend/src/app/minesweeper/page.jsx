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
  const lol = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let buttonStyle = '';
      if (board[i][j] === 1) {
        lol.push(<div className="btn btn-warning">MINE</div>);
      } else {
        lol.push(<div className="btn btn-success">SAFE</div>);
      }
    }
  }

  return lol;
}


export default function MineSweeperPage() {

  const board = createBoard();
  console.log(board);
  const theBoard = displayBoard(board);

  return (
    <>
      <div className="grid grid-cols-10">
        {theBoard}
      </div>
    </>
  );
}