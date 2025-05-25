'use client'

import { useEffect, useState } from "react";

export default function Clicker() {
  const [clicks, setClicks] = useState(0);
  const [clickTimestamps, setClickTimestamps] = useState([]);
  const [cps, setCps] = useState(0);
  const [upgrades, setUpgrades] = useState([]);
  const [unlockedUpgrades, setUnlockedUpgrades] = useState([]);
  const [clickStrength, setClickStrength] = useState(1);
  const [clickUpgradeLevel, setClickUpgradeLevel] = useState(1);
  const [clickUpgradeCost, setClickUpgradeCost] = useState(20);
  const [showPokemon, setShowPokemon] = useState(false);
  const [showFrog, setShowFrog] = useState(false);

  // helper functions
  const registerUpgrade = (label, cost, description, onClick, img) => {
    if (!unlockedUpgrades.includes(label)) {
      const upgrade = { label, cost, description, onClick, img };
      setUpgrades(prev => [...prev, upgrade]);
      setUnlockedUpgrades(prev => [...prev, label]);
    }
  };

  const purchaseUpgrade = (cost, showUpgrade, label) => {
    setClicks(prev => {
      if (prev >= cost) {
        showUpgrade(true);
        setUpgrades(prev => prev.filter(u => u.label !== label));
        return prev - cost;
      }
      return prev;
    });
  };  

  // ts is not working hell nah 
  const purchaseClickUpgrade = () => {
    const cost = clickUpgradeCost; 

    setClicks(prev => {
      if (prev >= cost) {
        setClickStrength(prev => prev + 1);
        setClickUpgradeLevel(prev => prev + 1);
        setClickUpgradeCost(Math.ceil(cost * 1.5));
        return prev - cost;
      }
      return prev;
    });
  };

  // manages pokemon upgrade
  useEffect(() => {
    if (!showPokemon) return;

    const interval = setInterval(() => {
      setClicks(prev => prev + 1);
    }, 5000);
  
    return () => clearInterval(interval); 
  }, [showPokemon]);
  
  // manages clicks per second
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
    if (clicks >= 5 && !unlockedUpgrades.includes('pokemon')) {
      registerUpgrade('pokemon', 5, '+1 click every 5 seconds', () => purchaseUpgrade(5, setShowPokemon, 'pokemon'), 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/25.png');
    }
  
    if (clicks >= 10 && !unlockedUpgrades.includes('frog')) {
      registerUpgrade('frog', 10, '+1 click every 3 seconds', () => purchaseUpgrade(10, setShowFrog, 'frog'), "/images/frogvinyl.png");
    }

    if (clicks >= 20 && !upgrades.find(u => u.label === 'upgrade click')) {
      registerUpgrade('upgrade click', clickUpgradeCost, 'Increases click strength by 1', purchaseClickUpgrade, "/images/click.png");
    }

  }, [clicks, upgrades, unlockedUpgrades]);
  
  const handleClick = () => {
    setClicks(prev => prev + clickStrength);
    setClickTimestamps(prev => [...prev, Date.now()])
  }
  
  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <button className="btn btn-xl" onClick={handleClick}>Click me!</button>
      <h1 className="mt-3 font-bold">{clicks} clicks</h1>
      <h1 className="mt-3 font-bold">Clicks per second: {cps}</h1>

      <div className="mt-5 flex gap-5">
        {upgrades.map((upgrade, index) => (
          <div key={index} className="relative group">
            <button 
              className="btn btn-xl btn-square flex justify-center items-center p-1"
              onClick={upgrade.onClick}
            >
              <img src={upgrade.img} alt={upgrade.label} className="max-w-full max-h-full object-contain"/>              
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col justify-center text-center top-full mt-2 w-30 bg-base-200 p-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <p className="text-sm"><strong>Cost:</strong> {upgrade.cost}</p>
              <p className="text-sm">{upgrade.description}</p>
            </div>

          </div>
        ))}
      </div>

      {showPokemon && (
        <div className="absolute right-15 bottom-15">
          <img 
            // can maybe change this to take in different id's
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/385.gif" 
            alt="Pikachu" 
            className="scale-200"
          />
        </div>
      )}

      {showFrog && (
        <div className="absolute left-15 bottom-15">
        <iframe 
          width="250" 
          height="140" 
          src="https://www.youtube.com/embed/aQ6eKfty_Ig?autoplay=1&mute=1&loop=1&playlist=aQ6eKfty_Ig" 
          allow="autoplay; encrypted-media" 
        ></iframe>
      </div>
      )}
    </div>
  );
}