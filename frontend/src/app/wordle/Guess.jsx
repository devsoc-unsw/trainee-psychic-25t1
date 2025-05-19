"use client"

export default function Guess({guess}) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {new Array(5).fill("").map((_, i) => {
        return (
          <div className="h-16 w-16 bg-black uppercase flex items-center justify-center text-white ">
            {guess[i]}
          </div>
        )
      })}
    </div>
  )
}
