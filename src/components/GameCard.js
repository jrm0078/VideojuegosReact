import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function GameCard({ game, onFavorite, isFavorite }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/game/${game.id}`}
      className="block h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300"
        style={{
          background: '#1A1A1D',
          border: '1px solid rgba(166,77,121,0.15)',
          boxShadow: hovered
            ? '0 12px 32px rgba(0,0,0,0.45), 0 0 20px rgba(166,77,121,0.2)'
            : '0 4px 12px rgba(0,0,0,0.3)',
          transform: hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        }}
      >
        {/* Imagen */}
        <div className="relative overflow-hidden" style={{ height: '180px' }}>
          <img
            src={game.background_image || '/placeholder.jpg'}
            alt={game.name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x169?text=No+Image';
            }}
          />

          {/* Overlay gradiente inferior sobre la imagen */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, #1A1A1D 0%, rgba(26,26,29,0.4) 50%, transparent 100%)',
            }}
          />

          {/* Rating badge */}
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(26,26,29,0.75)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(166,77,121,0.25)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="#A64D79">
              <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 10l.6-3.2L1.2 4.5l3.3-.5z" />
            </svg>
            <span className="text-xs font-bold" style={{ color: '#f0d6e8' }}>
              {game.rating ? game.rating.toFixed(1) : 'N/A'}
            </span>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-4 flex-1 flex flex-col" style={{ background: '#1A1A1D' }}>

          {/* Título */}
          <h3
            className="font-bold mb-2.5 line-clamp-2 transition-colors duration-300"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: '1rem',
              color: hovered ? '#A64D79' : '#fff',
              letterSpacing: '-0.01em',
            }}
          >
            {game.name}
          </h3>

          {/* Géneros */}
          <div className="flex flex-wrap gap-1.5 mb-2 flex-1">
            {game.genres?.slice(0, 2).map((genre) => (
              <span
                key={genre.id}
                className="text-xs px-2.5 py-0.5 rounded-full"
                style={{
                  background: 'rgba(106,30,85,0.2)',
                  border: '1px solid rgba(166,77,121,0.25)',
                  color: '#d4c5d0',
                }}
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Plataformas */}
          {game.platforms && game.platforms.length > 0 && (
            <p className="text-xs mb-3" style={{ color: 'rgba(212,197,208,0.5)' }}>
              {game.platforms.slice(0, 2).map((p) => p.platform.name).join(' · ')}
              {game.platforms.length > 2 && ' · ...'}
            </p>
          )}

          {/* Botón Favorito */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onFavorite(game);
            }}
            className="mt-auto w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300"
            style={{
              background: isFavorite
                ? 'linear-gradient(135deg, #6A1E55, #A64D79)'
                : 'rgba(166,77,121,0.1)',
              border: isFavorite
                ? 'none'
                : '1px solid rgba(166,77,121,0.3)',
              color: '#fff',
              boxShadow: isFavorite ? '0 2px 12px rgba(166,77,121,0.4)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (!isFavorite) {
                e.currentTarget.style.background = 'rgba(166,77,121,0.2)';
                e.currentTarget.style.borderColor = 'rgba(166,77,121,0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isFavorite) {
                e.currentTarget.style.background = 'rgba(166,77,121,0.1)';
                e.currentTarget.style.borderColor = 'rgba(166,77,121,0.3)';
              }
            }}
          >
            {/* Icono corazón SVG */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={isFavorite ? '#fff' : 'none'}
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300"
              style={{ transform: isFavorite ? 'scale(1.2)' : 'scale(1)' }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {isFavorite ? 'Favorito' : 'Añadir'}
          </button>
        </div>
      </div>
    </Link>
  );
}