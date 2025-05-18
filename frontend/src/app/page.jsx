"use client"

import Navbar from "./Navbar";
import LeaderboardModal from "./Leaderboard";
import GameCarousel from "./GameCarousel";
import { useEffect, useState } from 'react';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    // somehow check if logged in
  }, [])

  return (
    <div>
      <Navbar />
      <LeaderboardModal />
      {/* <h1>Home</h1> */}
      <GameCarousel />
    </div>
  );
}
