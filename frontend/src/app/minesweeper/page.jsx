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

  console.log(myArray);

}



export default function MineSweeperPage() {

  createBoard();

  return (
    <>
      <h1>Mine sweeper</h1>
    </>
  );
}