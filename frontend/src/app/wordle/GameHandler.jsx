"use client"

import React from 'react'
import words from './words.json'

function GameHandler({}) {
  const [word, setWord] = React.useState(null);
  const [game, setGame] = React.useState(0);

  // New Game
  React.useEffect(() => {
    getWord();
  }, [game])

  const getWord = () => {
    setWord(words[Math.trunc(Math.random() * words.length)]);
  }
  
  return (
    <div>
      {word}
    </div>
  )
}

export default GameHandler