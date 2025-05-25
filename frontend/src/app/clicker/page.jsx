'use client'

import { useEffect, useState, useRef } from "react";

export default function Clicker() {
  const [clicks, setClicks] = useState(0);
  const [clickTimestamps, setClickTimestamps] = useState([]);
  const [cps, setCps] = useState(0);
  const [upgrades, setUpgrades] = useState([]);
  const [unlockedUpgrades, setUnlockedUpgrades] = useState([]);
  const clickStrength = useRef(1);
  const [clickUpgradeLevel, setClickUpgradeLevel] = useState(1);
  const [clickUpgradeCost, setClickUpgradeCost] = useState(20);
  const [showPokemon, setShowPokemon] = useState(false);
  const [showFrog, setShowFrog] = useState(false);
  const [showNyan, setShowNyan] = useState(false);

  // helper functions
  const registerUpgrade = (label, cost, description, onClick, img) => {
    if (!unlockedUpgrades.includes(label) && !upgrades.find(u => u.label === label)) {
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

  const useAutoclicker = (enabled, intervalMs) => {
    useEffect(() => {
      if (!enabled) return;

      const interval = setInterval(() => {
        setClicks(prev => prev + 1);
      }, intervalMs);

    }, [enabled, intervalMs])
  }

  // ts is not working hell nah 
  const purchaseClickUpgrade = () => {
    const cost = clickUpgradeCost; 
  
    console.log(`clicks: ${clicks}`);
    console.log(cost);
  
    if (clicks >= cost) {
      clickStrength.current += 1;
      setClicks(prev => prev - cost);
    }
  };
  

  useAutoclicker(showPokemon, 5000);
  useAutoclicker(showFrog, 3000);
  useAutoclicker(showNyan, 1000);

  // manages nyan cat upgrade 

  
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
      const upgrade = { 
        label: 'upgrade click', 
        cost: clickUpgradeCost, 
        description: 'Increases click strength by 1', 
        onClick: purchaseClickUpgrade, 
        img: "/images/click.png" 
      };
      setUpgrades(prev => [...prev, upgrade]);
    }
    
    if (clicks >= 100 && !unlockedUpgrades.includes('nyan cat')) {
      registerUpgrade('nyan cat', 100, 'surprise', () => purchaseUpgrade(100, setShowNyan, 'nyan cat'), "/images/nyancat.png")
    }

  }, [clicks, clickUpgradeCost]);
  
  const handleClick = () => {
    setClicks(prev => prev + clickStrength.current);
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

      {showNyan && (
        <div className="absolute top-15 left-15">
          <iframe 
            width="250" 
            height="140" 
            src="https://www.youtube.com/embed/2yJgwwDcgV8?autoplay=1&mute=1&loop=1&playlist=2yJgwwDcgV8" 
            allow="autoplay; encrypted-media" 
          ></iframe>
        </div>
      )}
    </div>
  );
}