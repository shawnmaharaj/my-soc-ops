import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-neutral)' }}>
      {/* Header */}
      <header className="flex items-center justify-between p-4 text-white" style={{ backgroundColor: 'var(--color-secondary)' }}>
        <button
          onClick={onReset}
          className="text-sm px-3 py-1.5 rounded transition-all duration-150 hover:bg-white/20 active:bg-white/30"
        >
          ← Back
        </button>
        <h1 className="font-bold text-xl" style={{ color: 'var(--color-accent)' }}>Soc Ops</h1>
        <div className="w-16"></div>
      </header>

      {/* Gradient divider */}
      <div className="h-1 gradient-secondary-accent"></div>

      {/* Instructions */}
      <p className="text-center text-gray-700 text-sm py-3 px-4">
        Tap a square when you find someone who matches it.
      </p>

      {/* Bingo indicator */}
      {hasBingo && (
        <div className="text-white text-center py-3 font-bold text-sm" style={{ backgroundColor: 'var(--color-accent)' }}>
          🎉 BINGO! You got a line!
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-4">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
