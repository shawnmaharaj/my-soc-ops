interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="gradient-tri rounded-xl p-8 max-w-xs w-full text-center relative overflow-hidden">
        {/* Inner content with white background and padding */}
        <div className="bg-white rounded-lg p-8 relative z-10">
          <div className="reveal-item reveal-1 text-6xl mb-4">🎉</div>
          <h2 className="reveal-item reveal-2 text-3xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>BINGO!</h2>
          <p className="reveal-item reveal-3 text-gray-700 mb-6">You completed a line!</p>
          
          <button
            onClick={onDismiss}
            className="w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95"
            style={{ backgroundColor: 'var(--color-primary)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
          >
            Keep Playing
          </button>
        </div>
      </div>
    </div>
  );
}
