"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Guess from "./Guess";
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
      <Guess guess={"Guess"}/>
    </div>
  );
}
