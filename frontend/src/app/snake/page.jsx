'use client';
import Image from 'next/image'

/* import { useContext } from 'react';
import { AuthContext } from '@/components/AuthContext';
import Navbar from '../Navbar';
import LeaderboardModal from '../Leaderboard';
import SnakeGame from './snakeGame';

export default function Snake() {
  const { auth } = useContext(AuthContext);

  // Check logged in
  if (auth.loading) {
    return (
      <div>
        <Navbar />
      </div>
    );
  }

  // Display snakeGame if logged in
  return (
    <div>
      <Navbar />
      <LeaderboardModal />
      {auth.isAuthenticated ? (
        <>  
          <SnakeGame />
        </>
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <h1 className="text-2xl font-semibold">Please log in to continue.</h1>
        </div>
      )}
    </div>
  );
} */

// import headImg from "@/app/snake/assets/snake-head.png";
import headImg from "../../../public/images/snake/snake-head.png";

export default function TestImage() {
  return (
    <div>
      <h1>Test Snake Head</h1>
      <Image src={headImg} alt="Snake Head" />
    </div>
  );
}