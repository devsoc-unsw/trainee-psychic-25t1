"use client";

import React from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Guess from "./Guess";
import GameHandler from "./GameHandler";

export default function WorldeGameBoard() {
  const [correctWord, setCorrectWord] = React.useState(null);

  const words = [
    {
      text: "wordle",
      className: "text-6xl font-bold uppercase",
    },
  ];
  
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]  ">
      <TypewriterEffect words={words} />
      <br/>
      <Guess correctWord={correctWord} guess={"guess"} display={true}/>
      <Guess correctWord={correctWord} guess={"guess"} display={true}/>
      <Guess correctWord={correctWord} guess={"guess"} display={true}/>
      <Guess correctWord={correctWord} guess={"guess"} display={true}/>
      <Guess correctWord={correctWord} guess={"guess"} display={true}/>
      <Guess correctWord={correctWord} guess={"guess"} display={true}/>
      <GameHandler setCorrectWord={setCorrectWord}/>
      {"correct word: " + correctWord}
    </div>
  );
}
