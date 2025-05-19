"use client"

import "./styles.css"

// Tile Component
function Tile({ letter, colour, flip, index }) {
  const delay = `${index * 0.2}s`;

  return (
    <div className={`tile-container ${flip ? "flip" : ""}`} style={{ animationDelay: delay }}>
      <div className="tile front bg-black text-white" style={{ animationDelay: delay }}>
        {letter}
      </div>

      <div className={`tile back ${colour} text-white`} style={{ animationDelay: delay }}>
        {letter}
      </div>
    </div>
  );
}


// Prints 5 tiles which can each contain a letter
export default function Guess({correctWord, guess, display}) {
  if (correctWord === null || correctWord === undefined) return null;

  return (
    <div className="grid grid-cols-5 gap-2 mb-2">
      {new Array(5).fill("").map((_, i) => {
        const colour = 
          !display ? "bg-black" :
          correctWord[i] == guess[i] ? "bg-green-600" :
          correctWord.includes(guess[i]) ? "bg-yellow-500" :
          "bg-gray-600"

        return (
          <Tile key={i} letter={guess[i]} colour={colour} flip={display} index={i}/>
        )
      })}
    </div> 
  )
}