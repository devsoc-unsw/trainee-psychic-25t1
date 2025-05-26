'use client';

import { useEffect, useState, useRef } from "react";
import './styles.css';
  
const GAME_ID = 5;

export default function ClickerGame() {
  const [clicks, setClicks] = useState(0);
  const [clickTimestamps, setClickTimestamps] = useState([]);
  const [cps, setCps] = useState(0);
  const [upgrades, setUpgrades] = useState([]);
  const [unlockedUpgrades, setUnlockedUpgrades] = useState([]);
  const [clickStrength, setClickStrength] = useState(1);
  const [clickUpgradeCost, setClickUpgradeCost] = useState(20);
  const [isShaking, setIsShaking] = useState(false);
  const [showPokemon, setShowPokemon] = useState(false);
  const [showFrog, setShowFrog] = useState(false);
  const [showNyan, setShowNyan] = useState(false);
  const [audioWaves, setAudioWaves] = useState(false);
  const [shake, setShake] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);
  const audioRef = useRef(null);

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
        setClickTimestamps(prev => [...prev, Date.now()]);
      }, intervalMs);

      return () => clearInterval(interval);
    }, [enabled, intervalMs]);
  };

  const purchaseClickUpgrade = () => {
    setClicks(prev => {
      const cost = clickUpgradeCost;
      console.log(`clicks: ${prev}`);
      console.log(`cost: ${cost}`);
      
      if (prev >= cost) {
        setClickStrength(prevStrength => prevStrength + 1);
        setClickUpgradeCost(Math.ceil(cost * 3));
        
        setUpgrades(prevUpgrades => prevUpgrades.filter(u => u.label !== 'upgrade click'));
        
        return prev - cost;
      }
      return prev;
    });
  };
  
  useAutoclicker(showPokemon, 5000);
  useAutoclicker(showFrog, 3000);
  useAutoclicker(showNyan, 1000);
  useAutoclicker(audioWaves, 200);
  useAutoclicker(shake, 100);

  // manages audio for waves
  useEffect(() => {
    if (audioWaves && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio play was blocked by the browser:", err);
        });
      }
    }
  }, [audioWaves]);

  // manages clicks per second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const oneSecondAgo = now - 1000;

      const recentClicks = clickTimestamps.filter(prev => prev > oneSecondAgo);
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
        description: 'Increases click strength by 2', 
        onClick: purchaseClickUpgrade, 
        img: "/images/click.png" 
      };
      setUpgrades(prev => [...prev, upgrade]);
    }
    
    if (clicks >= 100 && !unlockedUpgrades.includes('nyan cat')) {
      registerUpgrade('nyan cat', 100, 'surprise! (+1 click per second)', () => purchaseUpgrade(100, setShowNyan, 'nyan cat'), "/images/nyancat.jpg");
    }

    if (clicks >= 250 && !unlockedUpgrades.includes('waves')) {
      registerUpgrade('waves', 250, 'just chill... (+5 clicks per second)', () => purchaseUpgrade(250, setAudioWaves, 'waves'), "/images/waves.jpg");
    }

    if (clicks >= 500 && !unlockedUpgrades.includes('shake')) {
      registerUpgrade('shake', 500, 'something big is coming... (+10 clicks per second)', () => purchaseUpgrade(500, setShake, 'shake'), "/images/shake.jpg");
    }

    if (clicks >= 1000 && !gameOver) {
      setGameOver(true);
      setEndTime(Date.now);
    }

  }, [clicks, clickUpgradeCost]);
  
  const handleClick = () => {
    if (gameOver) return;
    setClicks(prev => prev + clickStrength);
    setClickTimestamps(prev => [...prev, Date.now()]);

    if (shake) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
    }
  };
  
  return (
    <div className="flex flex-col justify-center items-center h-full relative">
      <button className={`btn btn-xl transition-all ${isShaking ? "animate-shake" : ""} ${showNyan ? 'rainbow-text' : ''}`} onClick={handleClick}>Click me!</button>
      <h1 className="mt-3 font-bold">{clicks} clicks</h1>
      <h1 className="mt-3 font-bold">Clicks per second: {cps}</h1>
      <h2 className="mt-2 text-sm">Click Strength: {clickStrength}</h2>

      <div className="mt-5 flex gap-5">
        {upgrades.map((upgrade, index) => (
          <div key={index} className="relative group">
            <button 
              className="btn btn-xl btn-square flex justify-center items-center p-1"
              onClick={upgrade.onClick}
            >
              <img src={upgrade.img} alt={upgrade.label} className="object-contain"/>              
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
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/385.gif" 
            alt="Pokemon" 
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

      <audio ref={audioRef} src="/audio/ocean-waves-250310.mp3" loop preload="auto" style={{display: "none"}}/>

      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white z-50">
          <h1 className="text-4xl font-bold mb-4">🎉 Game Over 🎉</h1>
          <p className="text-lg">
            You reached 10,000 clicks in {((endTime - startTime) / 1000).toFixed(1)} seconds!
          </p>
        </div>
      )}
    </div>
  );
}