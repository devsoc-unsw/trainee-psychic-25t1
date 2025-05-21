'use client'

import { useEffect, useState } from "react";

export default function Clicker() {
  const [clicks, setClicks] = useState(0);
  const [clickTimestamps, setClickTimestamps] = useState([]);
  const [cps, setCps] = useState(0);
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const oneSecondAgo = now - 1000;

      const recentClicks = clickTimestamps.filter(prev => prev > oneSecondAgo)
      setClickTimestamps(recentClicks);
      setCps(recentClicks.length);
    }, 100);

    return () => clearInterval(interval);
  }, [clickTimestamps]);

  // check for when clicks change
  // when clicks increase past a certain amt - add in a certain upgrade
  useEffect(() => {
    if (clicks === 5) {
      setUpgrades(prev => [...prev, 
        {label: 'pokemon', onClick: setPokemon}
      ])
    }

    if (clicks === 10) {
      setUpgrades(prev => [...prev, 
        {label: 'beep boop', onClick: setBeep}
      ])
    }

  }, [clicks]);

  const setPokemon = () => {

  }

  const setBeep = () => {
    
  }


  const handleClick = () => {
    setClicks(prev => prev + 1);
    setClickTimestamps(prev => [...prev, Date.now()])
  }
  
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button className="btn btn-xl" onClick={handleClick}>Click me!</button>
      <h1 className="mt-3 font-bold">{clicks} clicks</h1>
      <h1 className="mt-3 font-bold">Clicks per second: {cps}</h1>

      <div className="mt-5 flex gap-5">
        {upgrades.map((upgrade, index) => (
          <button 
            key={index} 
            className="btn btn-xl font-sm btn-square"
            onClick={upgrade.onClick}
          >
            {upgrade.label}
          </button>
        ))}
      </div>
    </div>
  );
}