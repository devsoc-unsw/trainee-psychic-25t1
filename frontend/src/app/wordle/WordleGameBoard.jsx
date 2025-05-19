"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Guess from "./Guess";
import GameHandler from "./GameHandler";
export default function WorldeGameBoard() {
  const words = [
    {
      text: "wordle",
      className: "text-6xl font-bold uppercase",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]  ">
      <TypewriterEffectSmooth words={words} />
      <br/>
      <Guess guess={"Guess"}/>
      <GameHandler />
    </div>
  );
}
