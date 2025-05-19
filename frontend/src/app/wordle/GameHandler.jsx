"use client"

import React from 'react'
import words from './words.json'

function GameHandler({setCorrectWord}) {
  const [game, setGame] = React.useState(0);

  // New Game: set new word
  React.useEffect(() => {
    getWord();
  }, [game])

  // Mount keyboard listener
  React.useEffect(() => {
    const handleKeydown = (event) => {
      alert(event.key);
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    }
  }, [])

  // Retrieve word from database
  const getWord = () => {
    setCorrectWord(words[Math.trunc(Math.random() * words.length)]);
  }

  return (
    <></>
  )
}

export default GameHandler