"use client";

import React from "react";
import words from "./words.json";
import common from "./common.json";

export default function GameHandler({
  version,
  setCorrectWord,
  correctWord,
  setGuessCurr,
  guessCurr,
  setGuesses,
  guesses,
  setAlert,
  setAlertShow,
  winState,
  setWinState,
  setPopupShow,
  setButtonShow,
}) {
  // New Game: set new word
  React.useEffect(() => {
    if (winState === "play") {
      getWord();
    }
  }, [winState]);

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
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [guessCurr, winState, guesses]);

  // Update current guess
  const checkValidUpdate = (c) => {
    if (winState !== "play") {
      return;
    }
    setGuessCurr((prev) => (prev.length < 5 ? prev + c : prev));
    setAlertShow(false);
  };

  // Handle backspace
  const checkValidBackspace = () => {
    if (winState !== "play") {
      return;
    }
    setGuessCurr((prev) => (prev.length > 0 ? prev.slice(0, -1) : prev));
    setAlertShow(false);
  };

  // Handle enter
  const checkValidEnter = () => {
    if (winState !== "play") {
      return;
    }
    if (guessCurr.length !== 5) {
      setAlert("Not enough letters");
      setAlertShow(true);
      return;
    }
    if (!words.includes(guessCurr)) {
      setAlert("Not in word list");
      setAlertShow(true);
      return;
    }
    setGuesses((prev) => [...prev, guessCurr]);
    setGuessCurr("");
    setAlertShow(false);
    if (guessCurr === correctWord) {
      setWinState("win");
      setTimeout(() => {
        setPopupShow(true);
        setButtonShow(true);
      }, 1800);
    } else if (guesses.length === 5) {
      setWinState("lose");
      setTimeout(() => {
        setPopupShow(true);
        setButtonShow(true);
      }, 1800);
    }
  };

  // Retrieve word from database
  const getWord = () => {
    if (version === "hardle") {
      setCorrectWord(words[Math.trunc(Math.random() * words.length)]);
    } else {
      setCorrectWord(common[Math.trunc(Math.random() * common.length)]);
    }
  };

  return <></>;
}
