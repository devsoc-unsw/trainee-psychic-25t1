"use client"

import Navbar from "./Navbar";
import { useEffect, useState } from 'react';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    // somehow check if logged in
  }, [])

  return (
    <div>
      <Navbar/>
      <h1>Home</h1>
    </div>
  );
}
