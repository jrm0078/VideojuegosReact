import GameCard from '../components/GameCard';
import { Link } from 'react-router-dom';

export default function FavoritesPage({ favorites, onFavorite }) {
  return (
    <div className="min-h-screen relative" style={{ background: '#1A1A1D' }}>

      {/* Orbs decorativos de fondo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute"
          style={{
            width: '480px',
            height: '480px',
            top: '-120px',
            right: '-100px',
            background: 'radial-gradient(circle, rgba(106,30,85,0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '360px',
            height: '360px',
            bottom: '10%',
            left: '-100px',
            background: 'radial-gradient(circle, rgba(166,77,121,0.12) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">

        {/* Header de la página */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            {/* Línea decorativa + título */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-0.5 h-8 rounded-full"
                style={{ background: 'linear-gradient(180deg, #A64D79, #6A1E55)' }}
              />
              <h1
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
              >
                Mis Juegos <span style={{ color: '#A64D79' }}>Favoritos</span>
              </h1>
            </div>

            {/* Subtitle con contador */}
            <p className="text-sm pl-3.5" style={{ color: 'rgba(212,197,208,0.5)' }}>
              {favorites.length > 0
                ? <>Tienes <span style={{ color: '#A64D79', fontWeight: 600 }}>{favorites.length}</span> {favorites.length === 1 ? 'juego' : 'juegos'} guardados</>
                : 'Tu colección está vacía'}
            </p>
          </div>

          {/* Badge total */}
          {favorites.length > 0 && (
            <div
              className="self-start sm:self-end flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(106,30,85,0.15)',
                border: '1px solid rgba(166,77,121,0.25)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#A64D79">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: '#A64D79' }}>
                {favorites.length} {favorites.length === 1 ? 'Favorito' : 'Favoritos'}
              </span>
            </div>
          )}
        </div>

        {/* Grid de favoritos */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {favorites.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onFavorite={onFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        ) : (

          /* Estado vacío */
          <div
            className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center px-6 py-24"
            style={{
              background: 'linear-gradient(145deg, rgba(26,26,29,0.8) 0%, rgba(59,28,50,0.6) 100%)',
              border: '1px solid rgba(166,77,121,0.15)',
            }}
          >
            {/* Orb interno */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '280px',
                height: '280px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(106,30,85,0.2) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Icono central */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(106,30,85,0.25), rgba(166,77,121,0.15))',
                  border: '1px solid rgba(166,77,121,0.2)',
                  boxShadow: '0 0 40px rgba(106,30,85,0.15)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #6A1E55, #A64D79)',
                    boxShadow: '0 0 16px rgba(166,77,121,0.4)',
                  }}
                >
                  <span className="text-white" style={{ fontSize: '22px' }}>◈</span>
                </div>
              </div>

              {/* Texto */}
              <div className="flex flex-col items-center gap-2">
                <h2
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
                >
                  No tienes <span style={{ color: '#A64D79' }}>favoritos</span> aún
                </h2>
                <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'rgba(212,197,208,0.5)' }}>
                  Explora nuestro catálogo y añade los juegos que más te gusten a tu colección.
                </p>
              </div>

              {/* CTA */}
              <Link
                to="/games"
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #6A1E55, #A64D79)',
                  boxShadow: '0 2px 10px rgba(166,77,121,0.35)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(166,77,121,0.55)';
                  e.currentTarget.style.transform = 'scale(1.04)';
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
                Explorar Juegos
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
