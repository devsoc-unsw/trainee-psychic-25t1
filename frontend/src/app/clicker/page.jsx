"use client";

import { useContext } from "react";
import { AuthContext } from "@/components/AuthContext";
import Navbar from "../Navbar";
import LeaderboardModal from "../Leaderboard";
import ClickerGame from "./clickergame";

export default function Clicker() {
  const { auth } = useContext(AuthContext);

  // Check logged in
  if (auth.loading) {
    return (
      <div>
        <Navbar />
      </div>
    );
  }

  // Display clickerGame if logged in
  return (
    <div>
      <Navbar />
      <LeaderboardModal />
      {auth.isAuthenticated ? (
        <>
          <div className="h-[calc(100vh-64px)]">
            <ClickerGame />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-70px)]">
          <h1 className="text-2xl font-semibold">Please log in to continue.</h1>
        </div>
      )}
    </div>
  );
}
