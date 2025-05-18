'use client';

import { useContext } from 'react';
import { AuthContext } from '@/components/AuthContext';
import Navbar from './Navbar';
import LeaderboardModal from './Leaderboard';
import GameCarousel from './GameCarousel';

export default function Home() {
  const { auth } = useContext(AuthContext);

  if (auth.loading) {
    return (
      <div>
        <Navbar />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <LeaderboardModal />
      {auth.isAuthenticated ? (
        <GameCarousel />
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <h1 className="text-2xl font-semibold">Please log in to continue.</h1>
        </div>
      )}
    </div>
  );
}
