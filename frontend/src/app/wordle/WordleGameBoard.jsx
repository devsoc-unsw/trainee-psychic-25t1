"use client";

import React from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Guess from "./Guess";
import GameHandler from "./GameHandler";
import Alert from "./Alert";

export default function WorldeGameBoard() {
  const [correctWord, setCorrectWord] = React.useState(null);
  const [guesses, setGuesses] = React.useState([]);
  const [guessCurr, setGuessCurr] = React.useState("");
  const [alert, setAlert] = React.useState("");
  const [alertShow, setAlertShow] = React.useState("");

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
   * <Alert>: Alert Display
   */
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]  ">
      <TypewriterEffect words={words} />
      <br/>
      {new Array(6).fill("").map((_, i) => {
        const temp = 
          i === guesses.length ? guessCurr :
          i < guesses.length ? guesses[i] :
          "";

        return (
          <div key={i}>
            <Guess correctWord={correctWord} guess={temp} display={i < guesses.length ? true : false}/>
          </div>
        )
      })}
      <GameHandler setCorrectWord={setCorrectWord} setGuessCurr={setGuessCurr} guessCurr={guessCurr} setGuesses={setGuesses} setAlert={setAlert} setAlertShow={setAlertShow}/>
      {"correct word: " + correctWord}

      <div className={`fixed bottom-10 transition-opacity duration-500 ${alertShow ? 'opacity-100' : 'opacity-0'}`}>
        <Alert message={alert} />
      </div>
    </div>
  );
}
