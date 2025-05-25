"use client";

import React from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Guess from "./Guess";
import GameHandler from "./GameHandler";
import Alert from "./Alert";
import Popup from "./Popup";

export default function WorldeGameBoard({ version }) {
  const BLINDLE_DIFFICULTY_MOD = 6; // smaller number is harder
  const [correctWord, setCorrectWord] = React.useState(null);
  const [guesses, setGuesses] = React.useState([]);
  const [guessCurr, setGuessCurr] = React.useState("");
  const [winState, setWinState] = React.useState("play");
  const [alert, setAlert] = React.useState("");
  const [alertShow, setAlertShow] = React.useState(false);
  const [popupShow, setPopupShow] = React.useState(false);
  const [buttonShow, setButtonShow] = React.useState(false);
  const [customBoard, setCustomBoard] = React.useState(null);

  const resetData = () => {
    setGuessCurr("");
    setGuesses([]);
    setWinState("play");
    setPopupShow(true);
    setButtonShow(false);
    initBlindBoard();
    initLiedleBoard();
  };

  // blindle board init
  const initBlindBoard = () => {
    if (version !== "blindle") return;
    const temp = Array.from({ length: 6 }, () =>
      Array.from(
        { length: 5 },
        () => Math.floor(Math.random() * BLINDLE_DIFFICULTY_MOD) === 0
      )
    );
    setCustomBoard(temp);
  };
  React.useEffect(initBlindBoard, []);

  // liedle board init
  const initLiedleBoard = () => {
    if (version !== "liedle") return;
    const temp = Array.from({ length: 6 }, () => {
      const randIndex = Math.floor(Math.random() * 5);
      return Array.from({ length: 5 }, (_, i) => i === randIndex);
    });
    setCustomBoard(temp);
  };
  React.useEffect(initLiedleBoard, []);

  // Data for animated title
  const words = [
    {
      text: version,
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
    <div className="flex flex-col items-center justify-center h-[90vh]  ">
      <TypewriterEffect words={words} />
      <br />
      <br />
      {new Array(6).fill("").map((_, i) => {
        const temp =
          i === guesses.length
            ? guessCurr
            : i < guesses.length
            ? guesses[i]
            : "";
        return (
          <div key={i}>
            <Guess
              version={version}
              customRow={customBoard ? customBoard[i] : null}
              correctWord={correctWord}
              guess={temp}
              display={i < guesses.length ? true : false}
              shake={alertShow && i === guesses.length}
            />
          </div>
        );
      })}
      <GameHandler
        version={version}
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
      <div
        className={`fixed bottom-10 transition-opacity duration-500 ${
          alertShow ? "opacity-100" : "opacity-0"
        }`}
      >
        <Alert message={alert} />
      </div>
      <div
        className={`fixed bottom-10 transition-opacity duration-500 ${
          buttonShow ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={resetData}
          className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
        >
          Play Again
        </button>
      </div>
      <div
        className={`fixed bottom-10 transition-opacity duration-500 ${
          popupShow ? "opacity-100" : "opacity-0"
        }`}
      >
        <Popup
          display={popupShow}
          close={() => setPopupShow(false)}
          winState={winState}
          correctWord={correctWord}
        />
      </div>
    </div>
  );
}
