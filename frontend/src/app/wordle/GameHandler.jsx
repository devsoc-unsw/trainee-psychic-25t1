"use client"

import React from 'react'
import words from './words.json'

export default function GameHandler({setCorrectWord, setGuessCurr, guessCurr, setGuesses, setAlert, setAlertShow}) {
  const [game, setGame] = React.useState(0);

  // New Game: set new word
  React.useEffect(() => {
    getWord();
  }, [game])

  // Mount keyboard listener
  React.useEffect(() => {
    const handleKeydown = (event) => {
      const key = event.key;
      if (/^[a-zA-Z]$/.test(key)) {
        checkValidUpdate(key);
      }
      if (key === "Backspace") {
        checkValidBackspace();
      }
      if (key === "Enter") {
        checkValidEnter();
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    }
  }, [guessCurr])

  // Update current guess
  const checkValidUpdate = (c) => {
    setGuessCurr(prev => prev.length < 5 ? prev + c : prev);
    setAlertShow(false);
  }

  // Handle backspace
  const checkValidBackspace = () => {
    setGuessCurr(prev => prev.length > 0 ? prev.slice(0, -1) : prev);
    setAlertShow(false);
  }

  // Handle enter
  const checkValidEnter = () => {
    // ADD extra conditions (win | lose | real word | word length)
    if (guessCurr.length != 5) {
      setAlert("Not enough letters");
      setAlertShow(true);
      return;
    }
    if (!words.includes(guessCurr)) {
      setAlert("Not in word list");
      setAlertShow(true);
      return;
    }
    setGuesses(prev => [...prev, guessCurr]);
    setGuessCurr("");
    setAlertShow(false);
  }

  // Retrieve word from database
  const getWord = () => {
    setCorrectWord(words[Math.trunc(Math.random() * words.length)]);
  }

  return (
    <></>
  )
}