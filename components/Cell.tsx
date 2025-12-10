import React from 'react';
import { CellState } from '../types';
import TimerRing from './TimerRing';

interface CellProps {
  cell: CellState;
  onClick: (id: number) => void;
  currentTime: number;
  isWinningCell: boolean;
  disabled: boolean;
}

const Cell: React.FC<CellProps> = ({ cell, onClick, currentTime, isWinningCell, disabled }) => {
  const { player, expiresAt, duration } = cell;
  
  let percentage = 0;
  let isExpiring = false;

  if (expiresAt && player) {
    const remaining = Math.max(0, expiresAt - currentTime);
    percentage = (remaining / duration) * 100;
    
    if (remaining < 1500 && remaining > 0) {
      isExpiring = true;
    }
  }

  const isX = player === 'X';
  const playerColor = isX ? 'text-game-neonX shadow-glow-x' : 'text-game-neonO shadow-glow-o';
  const ringColor = isX ? 'text-game-neonX' : 'text-game-neonO';
  
  // Apple-style Squircle glass
  let baseClasses = "relative w-24 h-24 sm:w-28 sm:h-28 rounded-[28px] flex items-center justify-center transition-all duration-300 overflow-hidden";
  
  // Default Empty State (Subtle indent)
  if (!player && !disabled) {
    baseClasses += " glass-card cursor-pointer hover:bg-white/10 active:scale-95";
  } else if (player) {
    // Filled State (Deep glass look)
    baseClasses += " bg-white/[0.03] backdrop-blur-xl border border-white/10 cursor-default";
  } else {
    // Disabled empty
    baseClasses += " opacity-50 cursor-default border border-white/5";
  }

  // Winning State
  if (isWinningCell) {
    baseClasses += isX 
      ? " !bg-game-neonX/20 !border-game-neonX/50 shadow-[0_0_50px_rgba(50,173,230,0.3)]" 
      : " !bg-game-neonO/20 !border-game-neonO/50 shadow-[0_0_50px_rgba(255,45,85,0.3)]";
  }

  const contentClass = player ? "animate-pop" : "";
  const expiringClass = isExpiring ? "animate-pulse opacity-60 blur-[1px]" : "";

  return (
    <button
      onClick={() => onClick(cell.id)}
      disabled={disabled || (!!player && !isWinningCell)}
      className={baseClasses}
    >
      {/* Timer Ring */}
      {player && !isWinningCell && (
        <TimerRing percentage={percentage} color={ringColor} />
      )}

      {/* Player Mark - Neon styling */}
      <span className={`text-5xl sm:text-6xl font-light z-10 ${isX ? 'text-game-neonX' : 'text-game-neonO'} ${contentClass} ${expiringClass} drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`}>
        {player}
      </span>
      
      {/* Internal Gloss Reflection (Top) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none rounded-t-[28px]"></div>
    </button>
  );
};

export default React.memo(Cell);