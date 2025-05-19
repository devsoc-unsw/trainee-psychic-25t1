"use client"

import React from 'react'
import words from './words.json'

function GameHandler({setCorrectWord}) {
  const [game, setGame] = React.useState(0);

  // New Game
  React.useEffect(() => {
    getWord();
  }, [game])

  const getWord = () => {
    setCorrectWord(words[Math.trunc(Math.random() * words.length)]);
  }
  
  return (
    <div>
    </div>
  )
}

export default GameHandler