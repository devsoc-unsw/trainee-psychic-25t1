'use client';

import { useContext } from 'react';
import { AuthContext } from '@/components/AuthContext';
import Navbar from '../Navbar';
import LeaderboardModal from '../Leaderboard';
import MineSweeperPage from './minesweeperGame';

export default function Minesweeper() {
  const { auth } = useContext(AuthContext);

  // Check logged in
  if (auth.loading) {
    return (
      <div>
        <Navbar />
      </div>
    );
  }

  // Display minesweeper if logged in
  return (
    <div>
      <Navbar />
      <LeaderboardModal />
      {auth.isAuthenticated ? (
        <>  
          <br /><br /><br />
          <MineSweeperPage />
        </>
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <h1 className="text-2xl font-semibold">Please log in to continue.</h1>
        </div>
      )}
    </div>
  );
} 