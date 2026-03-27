import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-2 text-center border-2 rounded transition-all duration-200 select-none min-h-[64px] text-xs leading-tight font-medium';

  let stateClasses = '';
  let containerStyle: React.CSSProperties = {};

  if (square.isMarked) {
    if (isWinning) {
      stateClasses = 'pulse-golden text-white font-bold border-2';
      containerStyle = {
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
        borderColor: 'var(--color-accent)',
        animation: 'wiggle 0.3s ease-in-out'
      };
    } else {
      stateClasses = 'text-white font-bold border-2 wiggle-mark';
      containerStyle = {
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
        borderColor: 'var(--color-primary)'
      };
    }
  } else {
    stateClasses = 'bg-white border-2 text-gray-700 hover:bg-gray-50 active:bg-gray-100';
    containerStyle = {
      borderColor: 'var(--color-primary)'
    };
  }

  const freeSpaceClasses = square.isFreeSpace ? 'font-bold text-sm' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      style={containerStyle}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <div className="flex flex-col items-center gap-1 w-full">
        <span className="wrap-break-word hyphens-auto flex-1">{square.text}</span>
        {square.isMarked && (
          <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>✓</span>
        )}
      </div>
    </button>
  );
}
