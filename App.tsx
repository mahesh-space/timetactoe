
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Board from './components/Board';
import { IconClock, IconRefresh, IconSettings, IconTrophy, IconInstagram } from './components/Icon';
import { CellState, Player, WinState, GameSettings } from './types';
import { WINNING_PATTERNS, DEFAULT_DURATION_SECONDS } from './constants';
import { soundManager } from './utils/SoundManager';

const App: React.FC = () => {
  // --- State ---
  const [cells, setCells] = useState<CellState[]>(
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      player: null,
      expiresAt: null,
      duration: DEFAULT_DURATION_SECONDS * 1000
    }))
  );
  
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winState, setWinState] = useState<WinState>({ winner: null, winningIndices: null });
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [showSettings, setShowSettings] = useState(false);
  
  const [settings, setSettings] = useState<GameSettings>({
    turnDuration: DEFAULT_DURATION_SECONDS,
    chaosMode: false,
  });

  const animationFrameRef = useRef<number>();

  // --- Game Loop ---
  useEffect(() => {
    const loop = () => {
      const now = Date.now();
      setCurrentTime(now);

      setCells((prevCells) => {
        let hasChanges = false;
        
        const nextCells = prevCells.map((cell) => {
          if (cell.player && cell.expiresAt && now > cell.expiresAt) {
            hasChanges = true;
            return { ...cell, player: null, expiresAt: null };
          }
          return cell;
        });

        if (hasChanges) {
            soundManager.playExpire();
            if (winState.winner === null) {
                return nextCells;
            }
        }
        
        return hasChanges ? nextCells : prevCells;
      });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [winState.winner]);

  // --- Win Detection ---
  const checkWin = useCallback((currentCells: CellState[]) => {
    for (const pattern of WINNING_PATTERNS) {
      const [a, b, c] = pattern;
      const cellA = currentCells[a];
      const cellB = currentCells[b];
      const cellC = currentCells[c];

      if (
        cellA.player &&
        cellA.player === cellB.player &&
        cellA.player === cellC.player
      ) {
        return { winner: cellA.player, winningIndices: pattern };
      }
    }
    return null;
  }, []);

  useEffect(() => {
    if (winState.winner) return;

    const result = checkWin(cells);
    if (result) {
      setWinState(result);
      soundManager.playWin();
    }
  }, [cells, checkWin, winState.winner]);

  // --- Handlers ---
  const handleCellClick = (id: number) => {
    if (winState.winner) return;
    if (cells[id].player) return;

    soundManager.playPlace();

    setCells((prev) => {
      if (prev[id].player) return prev;

      const newCells = [...prev];
      const now = Date.now();
      
      newCells[id] = {
        ...newCells[id],
        player: currentPlayer,
        expiresAt: now + (settings.turnDuration * 1000),
        duration: settings.turnDuration * 1000
      };
      
      return newCells;
    });

    if (!settings.chaosMode) {
        setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
    }
  };

  const handleRestart = () => {
    setCells(Array.from({ length: 9 }, (_, i) => ({
      id: i,
      player: null,
      expiresAt: null,
      duration: settings.turnDuration * 1000
    })));
    setWinState({ winner: null, winningIndices: null });
    setCurrentPlayer('X');
    soundManager.playPlace();
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setSettings(prev => ({ ...prev, turnDuration: val }));
  };

  const getStatusText = () => {
    if (winState.winner) {
      return (
        <span className="flex items-center gap-3 text-white animate-fade-in">
          <IconTrophy className="w-5 h-5 text-yellow-300" />
          <span className="tracking-widest font-light">{winState.winner} VICTORIOUS</span>
        </span>
      );
    }
    if (settings.chaosMode) {
        return <span className="text-purple-300 font-light tracking-[0.2em] text-sm uppercase animate-pulse">Chaos Mode Active</span>;
    }
    return (
      <span className={`font-light tracking-[0.2em] text-sm uppercase transition-colors duration-500 ${currentPlayer === 'X' ? 'text-game-neonX' : 'text-game-neonO'}`}>
        Player {currentPlayer}'s Turn
      </span>
    );
  };

  return (
    <div className="relative min-h-screen bg-game-bg flex flex-col items-center justify-center p-6 sm:p-8 font-sans">
      <div className="bg-noise"></div>
      
      {/* Dynamic Backlights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-75"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md flex flex-col gap-8 animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between px-1">
            <div className="flex flex-col">
              <h1 className="text-4xl font-thin tracking-wide text-white shimmer-text">
                TimeTacToe
              </h1>
              <div className="flex items-center gap-2 mt-2">
                 <div className="h-[1px] w-8 bg-white/20"></div>
                 <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">Quantum Edition</span>
              </div>
            </div>

            <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${showSettings ? 'bg-white text-black rotate-45' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
                <IconSettings className="w-5 h-5" />
            </button>
        </div>

        {/* Settings Panel */}
        <div className={`overflow-hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${showSettings ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="liquid-glass p-6 rounded-[24px] mb-2 space-y-6">
             <div className="space-y-4">
                 <div className="flex justify-between items-end">
                     <span className="text-xs font-bold tracking-widest text-white/50 uppercase">Entropy (Time)</span>
                     <span className="text-lg font-light text-white">{settings.turnDuration}s</span>
                 </div>
                 <input 
                  type="range" 
                  min="2" 
                  max="10" 
                  value={settings.turnDuration} 
                  onChange={handleDurationChange}
                  className="w-full"
                 />
             </div>
             
             <div className="flex items-center justify-between pt-2 border-t border-white/5">
                 <span className="text-xs font-bold tracking-widest text-white/50 uppercase">Chaos Mode</span>
                 <button 
                  onClick={() => setSettings(s => ({...s, chaosMode: !s.chaosMode}))}
                  className={`ios-toggle relative w-12 h-7 rounded-full transition-colors duration-300 ${settings.chaosMode ? 'bg-purple-500' : 'bg-white/10'}`}
                 >
                     <span className={`ios-toggle-thumb absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${settings.chaosMode ? 'translate-x-5' : 'translate-x-0'}`} />
                 </button>
             </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex justify-center h-8 items-center">
            {getStatusText()}
        </div>

        {/* Board */}
        <Board 
            cells={cells} 
            onCellClick={handleCellClick} 
            currentTime={currentTime}
            winningIndices={winState.winningIndices}
            gameEnded={!!winState.winner}
        />

        {/* Footer Actions */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleRestart}
            className="group relative px-8 py-4 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-full group-hover:bg-white/10 transition-colors"></div>
            <div className="relative flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-white/80 group-hover:text-white uppercase">
                <IconRefresh className="w-4 h-4" />
                <span>Initialize</span>
            </div>
          </button>
        </div>

        {/* Credit */}
        <div className="flex justify-center pt-8 pb-4">
          <div className="liquid-glass px-6 py-3 rounded-full animate-fade-in flex items-center gap-3">
            <p className="text-xs font-light tracking-wide text-white/60">
              Crafted with <span className="text-red-400 animate-pulse">♥</span> by <span className="text-white/80 font-medium">MG Jiwana</span>
            </p>
            <a 
              href="https://www.instagram.com/mgjiwana.dev?igsh=MXR5aTJpam5ueGhzcg==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white/90 transition-colors duration-300 hover:scale-110 transform"
            >
              <IconInstagram className="w-4 h-4" />
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default App;
