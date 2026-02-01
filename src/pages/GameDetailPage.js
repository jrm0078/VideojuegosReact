import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getGameDetail, getGameScreenshots } from '../services/gameService';

export default function GameDetailPage({ onFavorite, favorites }) {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const isFavorite = favorites.some((fav) => fav.id === parseInt(gameId));

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        setLoading(true);
        const gameData = await getGameDetail(gameId);
        setGame(gameData);
        const screenshotsData = await getGameScreenshots(gameId);
        setScreenshots(screenshotsData);
        setError(null);
      } catch (err) {
        setError('No se pudo cargar la información del juego.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGameDetail();
  }, [gameId]);

  if (loading) return <LoadingSpinner />;

  if (error || !game) {
    return (
      <div className="min-h-screen relative" style={{ background: '#1A1A1D' }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-14">
          <ErrorMessage message={error} />
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-300 mt-4"
            style={{ color: '#A64D79' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#A64D79')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Volver a juegos
          </Link>
        </div>
      </div>
    );
  }

  const displayImage =
    (selectedImage < screenshots.length
      ? screenshots[selectedImage].image
      : game.background_image) || 'https://via.placeholder.com/600x400';

  return (
    <div className="min-h-screen relative" style={{ background: '#1A1A1D' }}>

      {/* Orbs de fondo fijos */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute"
          style={{
            width: '500px',
            height: '500px',
            top: '-140px',
            left: '-120px',
            background: 'radial-gradient(circle, rgba(106,30,85,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '400px',
            height: '400px',
            bottom: '-80px',
            right: '-100px',
            background: 'radial-gradient(circle, rgba(166,77,121,0.12) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">

        {/* Volver */}
        <Link
          to="/games"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors duration-300"
          style={{ color: '#A64D79' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#A64D79')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Volver a juegos
        </Link>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Columna izquierda: imágenes */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Imagen principal */}
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                border: '1px solid rgba(166,77,121,0.15)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src={displayImage}
                alt={game.name}
                className="w-full h-auto object-cover"
                style={{ display: 'block' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                }}
              />
              {/* Gradiente inferior sobre imagen principal */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(26,26,29,0.7) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Miniaturas */}
            {screenshots.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-0.5 h-4 rounded-full" style={{ background: 'linear-gradient(180deg, #A64D79, #6A1E55)' }} />
                  <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'rgba(212,197,208,0.7)', letterSpacing: '0.1em' }}>
                    Capturas de pantalla
                  </h3>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {/* Portada como primera miniatura */}
                  <button
                    onClick={() => setSelectedImage(-1)}
                    className="relative rounded-lg overflow-hidden transition-all duration-300"
                    style={{
                      border: selectedImage === -1
                        ? '2px solid #A64D79'
                        : '2px solid rgba(166,77,121,0.15)',
                      boxShadow: selectedImage === -1
                        ? '0 0 12px rgba(166,77,121,0.35)'
                        : 'none',
                    }}
                  >
                    <img src={game.background_image} alt="Portada" className="w-full object-cover" style={{ height: '72px' }} />
                  </button>

                  {screenshots.slice(0, 4).map((screenshot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className="relative rounded-lg overflow-hidden transition-all duration-300"
                      style={{
                        border: selectedImage === idx
                          ? '2px solid #A64D79'
                          : '2px solid rgba(166,77,121,0.15)',
                        boxShadow: selectedImage === idx
                          ? '0 0 12px rgba(166,77,121,0.35)'
                          : 'none',
                      }}
                    >
                      <img
                        src={screenshot.image}
                        alt={`Screenshot ${idx + 1}`}
                        className="w-full object-cover"
                        style={{ height: '72px' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200x150';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Descripción */}
            {(game.description || game.description_raw) && (
              <div
                className="rounded-xl p-6 mt-2"
                style={{
                  background: 'linear-gradient(145deg, rgba(26,26,29,0.9) 0%, rgba(59,28,50,0.7) 100%)',
                  border: '1px solid rgba(166,77,121,0.15)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-0.5 h-4 rounded-full" style={{ background: 'linear-gradient(180deg, #A64D79, #6A1E55)' }} />
                  <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'rgba(212,197,208,0.7)', letterSpacing: '0.1em' }}>
                    Descripción
                  </h2>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(212,197,208,0.65)' }}>
                  {game.description_raw || game.description || 'No hay descripción disponible'}
                </p>
              </div>
            )}
          </div>

          {/* Columna derecha: info del juego */}
          <div className="flex flex-col gap-4">

            {/* Título y rating */}
            <div
              className="rounded-xl p-6"
              style={{
                background: 'linear-gradient(145deg, rgba(26,26,29,0.95) 0%, rgba(59,28,50,0.8) 100%)',
                border: '1px solid rgba(166,77,121,0.15)',
              }}
            >
              <h1
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
              >
                {game.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="text-3xl font-bold"
                  style={{ color: '#A64D79', fontFamily: "'Georgia', serif" }}
                >
                  {game.rating ? game.rating.toFixed(1) : 'N/A'}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill={i < Math.round(game.rating) ? '#A64D79' : 'rgba(166,77,121,0.2)'}
                    >
                      <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 10l.6-3.2L1.2 4.5l3.3-.5z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-xs" style={{ color: 'rgba(212,197,208,0.4)' }}>
                Basado en {game.ratings_count} valoraciones
              </p>
            </div>

            {/* Botón favorito */}
            <button
              onClick={() => onFavorite(game)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300"
              style={{
                background: isFavorite
                  ? 'linear-gradient(135deg, #6A1E55, #A64D79)'
                  : 'rgba(166,77,121,0.1)',
                border: isFavorite ? 'none' : '1px solid rgba(166,77,121,0.3)',
                boxShadow: isFavorite ? '0 2px 12px rgba(166,77,121,0.4)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isFavorite) {
                  e.currentTarget.style.background = 'rgba(166,77,121,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(166,77,121,0.5)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(166,77,121,0.55)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isFavorite) {
                  e.currentTarget.style.background = 'rgba(166,77,121,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(166,77,121,0.3)';
                } else {
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(166,77,121,0.4)';
                }
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill={isFavorite ? '#fff' : 'none'}
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            </button>

            {/* Datos del juego */}
            <div
              className="rounded-xl p-5 flex flex-col gap-5"
              style={{
                background: 'linear-gradient(145deg, rgba(26,26,29,0.95) 0%, rgba(59,28,50,0.8) 100%)',
                border: '1px solid rgba(166,77,121,0.15)',
              }}
            >
              {/* Fecha */}
              {game.released && (
                <div>
                  <p className="text-xs mb-1" style={{ color: 'rgba(212,197,208,0.4)' }}>Fecha de lanzamiento</p>
                  <p className="text-sm font-semibold text-white">{new Date(game.released).toLocaleDateString('es-ES')}</p>
                </div>
              )}

              {/* Playtime */}
              {game.playtime && (
                <div>
                  <p className="text-xs mb-1" style={{ color: 'rgba(212,197,208,0.4)' }}>Tiempo promedio</p>
                  <p className="text-sm font-semibold text-white">{game.playtime} horas</p>
                </div>
              )}

              {/* Géneros */}
              {game.genres && game.genres.length > 0 && (
                <div>
                  <p className="text-xs mb-2" style={{ color: 'rgba(212,197,208,0.4)' }}>Géneros</p>
                  <div className="flex flex-wrap gap-1.5">
                    {game.genres.map((genre) => (
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
                </div>
              )}

              {/* Plataformas */}
              {game.platforms && game.platforms.length > 0 && (
                <div>
                  <p className="text-xs mb-2" style={{ color: 'rgba(212,197,208,0.4)' }}>Plataformas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {game.platforms.map((platform) => (
                      <span
                        key={platform.platform.id}
                        className="text-xs px-2.5 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(26,26,29,0.8)',
                          border: '1px solid rgba(166,77,121,0.2)',
                          color: 'rgba(212,197,208,0.7)',
                        }}
                      >
                        {platform.platform.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Desarrolladores */}
              {game.developers && game.developers.length > 0 && (
                <div>
                  <p className="text-xs mb-1" style={{ color: 'rgba(212,197,208,0.4)' }}>Desarrolladores</p>
                  <p className="text-sm font-semibold text-white">{game.developers.map((d) => d.name).join(', ')}</p>
                </div>
              )}

              {/* Publicadores */}
              {game.publishers && game.publishers.length > 0 && (
                <div>
                  <p className="text-xs mb-1" style={{ color: 'rgba(212,197,208,0.4)' }}>Publicadores</p>
                  <p className="text-sm font-semibold text-white">{game.publishers.map((p) => p.name).join(', ')}</p>
                </div>
              )}
            </div>

            {/* Cards adicionales: Metacritic / Estado / Actualización */}
            <div className="flex flex-col gap-3">
              {game.metacritic && (
                <div
                  className="rounded-xl px-5 py-4 flex items-center justify-between"
                  style={{
                    background: 'linear-gradient(145deg, rgba(26,26,29,0.95) 0%, rgba(59,28,50,0.8) 100%)',
                    border: '1px solid rgba(166,77,121,0.15)',
                  }}
                >
                  <p className="text-xs" style={{ color: 'rgba(212,197,208,0.4)' }}>Metacritic</p>
                  <p className="text-xl font-bold" style={{ color: '#A64D79', fontFamily: "'Georgia', serif" }}>{game.metacritic}</p>
                </div>
              )}

              {game.tba && (
                <div
                  className="rounded-xl px-5 py-4 flex items-center justify-between"
                  style={{
                    background: 'linear-gradient(145deg, rgba(26,26,29,0.95) 0%, rgba(59,28,50,0.8) 100%)',
                    border: '1px solid rgba(166,77,121,0.15)',
                  }}
                >
                  <p className="text-xs" style={{ color: 'rgba(212,197,208,0.4)' }}>Estado</p>
                  <p className="text-sm font-semibold text-white">Por anunciar</p>
                </div>
              )}

              {game.updated && (
                <div
                  className="rounded-xl px-5 py-4 flex items-center justify-between"
                  style={{
                    background: 'linear-gradient(145deg, rgba(26,26,29,0.95) 0%, rgba(59,28,50,0.8) 100%)',
                    border: '1px solid rgba(166,77,121,0.15)',
                  }}
                >
                  <p className="text-xs" style={{ color: 'rgba(212,197,208,0.4)' }}>Última actualización</p>
                  <p className="text-sm font-semibold text-white">{new Date(game.updated).toLocaleDateString('es-ES')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
