export default function ErrorMessage({ message }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl px-6 py-5 mb-6"
      style={{
        background: 'linear-gradient(135deg, rgba(26,26,29,0.95) 0%, rgba(59,28,50,0.9) 100%)',
        border: '1px solid rgba(166,77,121,0.3)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(166,77,121,0.1)',
      }}
    >
      {/* Línea de acento superior */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #A64D79, transparent)' }}
      />

      {/* Orb decorativo de fondo */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '160px',
          height: '160px',
          top: '-60px',
          right: '-40px',
          background: 'radial-gradient(circle, rgba(166,77,121,0.15) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex items-start gap-4">

        {/* Icono de alerta */}
        <div
          className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
          style={{
            background: 'rgba(166,77,121,0.15)',
            border: '1px solid rgba(166,77,121,0.3)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A64D79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-1">
          <p
            className="font-semibold"
            style={{ color: '#A64D79', fontFamily: "'Georgia', serif", fontSize: '0.95rem', letterSpacing: '-0.01em' }}
          >
            Error
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(212,197,208,0.7)' }}>
            {message || 'Algo salió mal. Por favor, intenta de nuevo.'}
          </p>
        </div>
      </div>
    </div>
  );
}