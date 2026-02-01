export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[400px]" style={{ background: '#1A1A1D' }}>

      {/* Orb de fondo difuso */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(106,30,85,0.25) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative flex flex-col items-center gap-6">

        {/* Spinner */}
        <div className="relative" style={{ width: '56px', height: '56px' }}>

          {/* Anillo exterior — rota con gradiente rosa */}
          <svg
            className="absolute inset-0"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            style={{ animation: 'spin 1.2s linear infinite' }}
          >
            <defs>
              <linearGradient id="spinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A64D79" />
                <stop offset="60%" stopColor="#6A1E55" />
                <stop offset="100%" stopColor="#3B1C32" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="url(#spinGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          {/* Anillo base sutil (estático) */}
          <svg className="absolute inset-0" width="56" height="56" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="rgba(166,77,121,0.12)"
              strokeWidth="3"
            />
          </svg>

          {/* Centro: icono ◈ */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #6A1E55, #A64D79)',
                boxShadow: '0 0 12px rgba(166,77,121,0.4)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              <span className="text-white" style={{ fontSize: '14px' }}>◈</span>
            </div>
          </div>
        </div>

        {/* Texto de carga */}
        <span
          className="text-sm font-medium tracking-widest uppercase"
          style={{
            color: 'rgba(212,197,208,0.5)',
            letterSpacing: '0.18em',
            animation: 'fadeText 1.8s ease-in-out infinite',
          }}
        >
          Cargando
        </span>

        {/* Dots animados */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block rounded-full"
              style={{
                width: '4px',
                height: '4px',
                background: '#A64D79',
                animation: `dotBounce 1.2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 12px rgba(166,77,121,0.4); }
          50%       { transform: scale(1.1); box-shadow: 0 0 20px rgba(166,77,121,0.6); }
        }
        @keyframes fadeText {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 0.9; }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50%      { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
