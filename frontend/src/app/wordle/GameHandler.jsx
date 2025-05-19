"use client"

import React from 'react'
import words from './words.json'

function GameHandler({setCorrectWord, setGuessCurr}) {
  const [game, setGame] = React.useState(0);

  // New Game: set new word
  React.useEffect(() => {
    getWord();
  }, [game])

  // Mount keyboard listener
  React.useEffect(() => {
    const handleKeydown = (event) => {
      if (/^[a-zA-Z]$/.test(event.key)) {
        checkValidUpdate(event.key);
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    }
  }, [])

  // Logic check keyboard input, then update guessCurr
  const checkValidUpdate = (c) => {
    setGuessCurr(prev => prev.length < 5 ? prev + c : prev);
  }

  // Retrieve word from database
  const getWord = () => {
    setCorrectWord(words[Math.trunc(Math.random() * words.length)]);
  }

  return (
    <></>
  )
}

export default GameHandler