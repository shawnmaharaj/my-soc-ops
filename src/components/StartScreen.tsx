interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 pattern-stripes" style={{ backgroundColor: 'var(--color-neutral)' }}>
      <div className="text-center max-w-sm">
        <h1 className="text-5xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>Soc Ops</h1>
        <p className="text-xl mb-8 font-semibold" style={{ color: 'var(--color-secondary)' }}>Social Bingo</p>
        
        <div className="bg-white rounded-xl p-8 mb-8 border-4 gradient-primary-secondary" style={{ borderColor: 'transparent', backgroundClip: 'padding-box', border: '4px solid' }}>
          <div className="absolute inset-0 rounded-xl gradient-primary-secondary" style={{ zIndex: -1, top: -4, left: -4, right: -4, bottom: -4 }}></div>
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-bold text-lg mb-3" style={{ color: 'var(--color-primary)' }}>How to play</h2>
            <ul className="text-left text-gray-700 text-sm space-y-2">
              <li>• Find people who match the questions</li>
              <li>• Tap a square when you find a match</li>
              <li>• Get 5 in a row to win!</li>
            </ul>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 text-white hover:shadow-lg active:scale-95"
          style={{ backgroundColor: 'var(--color-primary)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
