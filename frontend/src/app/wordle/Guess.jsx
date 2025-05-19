"use client"

import "./styles.css"

// Tile Component
function Tile({ letter, colour, flip, index, shake }) {
  const delayFlip = `${index * 0.2}s`;
  const delayShake = `${index * 0.1}s`;

  return (
    <div
      className={`tile-container ${flip ? "flip" : ""} ${shake ? "shake" : ""}`}
      style={{ animationDelay: delayShake }}
    >
      <div className="tile front bg-black text-white" style={{ animationDelay: delayFlip }}>
        {letter}
      </div>

      <div className={`tile back ${colour} text-white`} style={{ animationDelay: delayFlip }}>
        {letter}
      </div>
    </div>
  );
}



// Prints 5 tiles which can each contain a letter
export default function Guess({correctWord, guess, display, shake}) {
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
          <Tile key={i} letter={guess[i]} colour={colour} flip={display} index={i} shake={shake}/>
        )
      })}
    </div> 
  )
}