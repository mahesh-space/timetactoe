import React from 'react';
import Cell from './Cell';
import { CellState } from '../types';

interface BoardProps {
  cells: CellState[];
  onCellClick: (id: number) => void;
  currentTime: number;
  winningIndices: number[] | null;
  gameEnded: boolean;
}

const Board: React.FC<BoardProps> = ({ cells, onCellClick, currentTime, winningIndices, gameEnded }) => {
  return (
    <div className="liquid-glass p-6 rounded-[40px] grid grid-cols-3 gap-4 sm:gap-5 shadow-2xl shadow-black/50">
      {cells.map((cell) => (
        <Cell
          key={cell.id}
          cell={cell}
          onClick={onCellClick}
          currentTime={currentTime}
          isWinningCell={winningIndices?.includes(cell.id) ?? false}
          disabled={gameEnded}
        />
      ))}
    </div>
  );
};

export default Board;