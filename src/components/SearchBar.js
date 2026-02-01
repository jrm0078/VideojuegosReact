import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-8">
      <div
        className="relative flex items-center rounded-xl overflow-hidden transition-all duration-300"
        style={{
          background: '#1A1A1D',
          border: focused ? '1px solid rgba(166,77,121,0.5)' : '1px solid rgba(166,77,121,0.15)',
          boxShadow: focused
            ? '0 0 0 3px rgba(166,77,121,0.1), 0 4px 16px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.25)',
        }}
      >
        {/* Icono de búsqueda */}
        <div className="flex-shrink-0 pl-4 flex items-center justify-center" style={{ color: focused ? '#A64D79' : 'rgba(166,77,121,0.4)' }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-300"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Busca tu juego favorito..."
          className="flex-1 px-4 py-3.5 bg-transparent text-white text-sm outline-none"
          style={{
            color: '#fff',
            fontFamily: "'Georgia', serif",
            letterSpacing: '-0.01em',
          }}
        />

        {/* Botón buscar */}
        <button
          type="submit"
          className="flex-shrink-0 m-1.5 flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #6A1E55, #A64D79)',
            boxShadow: '0 2px 10px rgba(166,77,121,0.35)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(166,77,121,0.55)';
            e.currentTarget.style.transform = 'scale(1.03)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(166,77,121,0.35)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Buscar
        </button>
      </div>

      {/* Placeholder sutil debajo */}
      <div className="flex items-center gap-2 mt-3 px-1">
        <span className="text-xs" style={{ color: 'rgba(212,197,208,0.3)' }}>
          Prueba con:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {['The Witcher 3', 'Elden Ring', 'Hades'].map((sugg) => (
            <button
              key={sugg}
              type="button"
              onClick={() => {
                setSearchTerm(sugg);
                onSearch(sugg);
              }}
              className="text-xs px-2.5 py-0.5 rounded-full transition-all duration-300"
              style={{
                background: 'rgba(106,30,85,0.15)',
                border: '1px solid rgba(166,77,121,0.2)',
                color: 'rgba(212,197,208,0.5)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(106,30,85,0.28)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'rgba(166,77,121,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(106,30,85,0.15)';
                e.currentTarget.style.color = 'rgba(212,197,208,0.5)';
                e.currentTarget.style.borderColor = 'rgba(166,77,121,0.2)';
              }}
            >
              {sugg}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
