"use client";
import React from "react";
import Quiz from "./quiz";
import locations from "./locations.json";
import Navbar from "../Navbar";
import LeaderboardModal from "../Leaderboard";

// shuffle(locations
export default function QuizPage() {
  return (
    <>
      <Navbar />
      <LeaderboardModal />
      <Quiz locations={locations} />
    </>
  );
}
