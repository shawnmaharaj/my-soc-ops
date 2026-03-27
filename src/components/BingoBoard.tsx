import type { BingoSquareData } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) {
  return (
    <div className="relative">
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-xl gradient-tri p-1" style={{ margin: -4 }}></div>
      
      {/* Board container */}
      <div className="grid grid-cols-5 gap-2 w-full max-w-md mx-auto aspect-square p-4 rounded-xl bg-white relative z-10 pattern-stripes">
        {board.map((square) => (
          <BingoSquare
            key={square.id}
            square={square}
            isWinning={winningSquareIds.has(square.id)}
            onClick={() => onSquareClick(square.id)}
          />
        ))}
      </div>
    </div>
  );
}
