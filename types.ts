export type Player = 'X' | 'O';

export interface CellState {
  id: number;
  player: Player | null;
  expiresAt: number | null; // Timestamp in ms
  duration: number; // Total duration for this specific move
}

export interface GameSettings {
  turnDuration: number; // in seconds
  chaosMode: boolean; // if true, no turn order
}

export type WinState = {
  winner: Player | null;
  winningIndices: number[] | null;
};
