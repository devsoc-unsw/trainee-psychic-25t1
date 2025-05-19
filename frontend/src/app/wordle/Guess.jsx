"use client"

export default function Guess({correctWord, guess, display}) {
  if (!correctWord) return null;
  
  return (
    <div className="grid grid-cols-5 gap-2 mb-2">
      {new Array(5).fill("").map((_, i) => {
        const colour = 
          !display ? "bg-black" :
          correctWord[i] == guess[i] ? "bg-green-600" :
          correctWord.includes(guess[i]) ? "bg-yellow-500" :
          "bg-gray-600"

        return (
          <div key={i} className={`h-16 w-16 uppercase flex items-center justify-center text-white text-lg font-bold ${colour}`}>
            {guess[i]}
          </div>
        )
      })}
    </div> 
  )
}