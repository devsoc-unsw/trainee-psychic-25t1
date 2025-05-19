"use client";

import React from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Guess from "./Guess";
import GameHandler from "./GameHandler";

export default function WorldeGameBoard() {
  const [correctWord, setCorrectWord] = React.useState(null);
  const [guesses, setGuesses] = React.useState(["hstry"]); // set back to empty array
  const [guessCurr, setGuessCurr] = React.useState("");

  // Data for animated title
  const words = [
    {
      text: "wordle",
      className: "text-6xl font-bold uppercase",
    },
  ];
  
  /* 
   * Init Gameboard
   * <TypeWriterEffect>: Wordle Title
   * <Guess>: A 1x5 grid for displaying a guess
   * <GameHandler>: Handles Game Logic
   */
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]  ">
      <TypewriterEffect words={words} />
      <br/>
      {new Array(6).fill("").map((_, i) => {
        const temp = 
          i === guesses.length ? "Currn" :
          i < guesses.length ? guesses[i] :
          "";

        return (
          <Guess correctWord={correctWord} guess={temp} display={true}/>
        )
      })}
      <GameHandler setCorrectWord={setCorrectWord}/>
      {"correct word: " + correctWord}
    </div>
  );
}
