"use client";

import React from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Guess from "./Guess";
import GameHandler from "./GameHandler";
import Alert from "./Alert";
import Popup from "./Popup";

export default function WorldeGameBoard() {
  const [correctWord, setCorrectWord] = React.useState(null);
  const [guesses, setGuesses] = React.useState([]);
  const [guessCurr, setGuessCurr] = React.useState("");
  const [winState, setWinState] = React.useState("play");
  const [alert, setAlert] = React.useState("");
  const [alertShow, setAlertShow] = React.useState(false);
  const [popupShow, setPopupShow] = React.useState(false);
  const [buttonShow, setButtonShow] = React.useState(false);
  const [clickedToStart, setClickedToStart] = React.useState(false);

  const resetData = () => {
    setPopupShow(false);
    setGuessCurr("");
    setGuesses([]);
    setWinState("play");
    setButtonShow(false);
    setClickedToStart(false);
  }

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
   * <Popup>: Popup Display 
   */
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <TypewriterEffect words={words} />
      <br/><br/>
      {!clickedToStart && (
        <div
          className="fixed inset-0 bg-transparent z-50 cursor-pointer"
          onClick={() => setClickedToStart(true)}
        >
          <div className="flex items-center justify-center h-full">
            <span className="text-white text-lg bg-black/50 px-4 py-2 rounded-md">
              Click to start
            </span>
          </div>
        </div>
      )}

      <div className={`flex flex-col items-center justify-center ${!clickedToStart ? "invisible" : "visible"}`}> 
        {new Array(6).fill("").map((_, i) => {
          const temp = 
            i === guesses.length ? guessCurr :
            i < guesses.length ? guesses[i] :
            "";
          return (
            <div key={i}>
              <Guess correctWord={correctWord} guess={temp} display={(i < guesses.length) ? true : false} shake={alertShow && i === guesses.length}/>
            </div>
          )
        })}
        <GameHandler 
          setCorrectWord={setCorrectWord} 
          correctWord={correctWord} 
          setGuessCurr={setGuessCurr} 
          guessCurr={guessCurr} 
          setGuesses={setGuesses} 
          guesses={guesses} 
          setAlert={setAlert} 
          setAlertShow={setAlertShow} 
          winState={winState} 
          setWinState={setWinState}
          setPopupShow={setPopupShow}
          setButtonShow={setButtonShow}
        />
        {correctWord}
        <div className={`fixed bottom-10 transition-opacity duration-500 ${alertShow ? 'opacity-100' : 'opacity-0'}`}>
          <Alert message={alert} />
        </div>
        <div className={`fixed bottom-10 transition-opacity duration-500 ${buttonShow ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={resetData} className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
            Play Again
          </button>
        </div>
        <div className={`fixed bottom-10 transition-opacity duration-500 ${popupShow ? 'opacity-100' : 'opacity-0'}`}>
          <Popup display={popupShow} close={() => setPopupShow(false)} winState={winState} correctWord={correctWord} />
        </div>
      </div>
    </div>
  );
}
