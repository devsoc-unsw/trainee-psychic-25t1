'use client';

import { useContext } from 'react';
import { AuthContext } from '@/components/AuthContext';
import Navbar from './Navbar';
import LeaderboardModal from './Leaderboard';

export default function Home() {
  const { auth } = useContext(AuthContext);

  if (auth.loading) {
    return (
      <div>
        <Navbar />
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <LeaderboardModal />
      {auth.isAuthenticated ? (
        <h1>Welcome back, {auth.user.name}!</h1>
      ) : (
        <h1>Please log in to continue.</h1>
      )}
    </div>
  );
}
