import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getGameDetail, getGameScreenshots } from '../services/gameService';

export default function GameDetailPage({ onFavorite, favorites }) {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const isFavorite = favorites.some(fav => fav.id === parseInt(gameId));

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        setLoading(true);
        const gameData = await getGameDetail(gameId);
        setGame(gameData);
        
        // Obtener capturas
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
      <div className="min-h-screen bg-primary py-12 px-4">
        <div className="container mx-auto">
          <ErrorMessage message={error} />
          <Link to="/games" className="text-highlight hover:underline">
            ← Volver a juegos
          </Link>
        </div>
      </div>
    );
  }

  const displayImage = selectedImage < screenshots.length 
    ? screenshots[selectedImage].image 
    : game.background_image;

  return (
    <div className="min-h-screen bg-primary py-12 px-4">
      <div className="container mx-auto">
        {/* Botón Volver */}
        <Link
          to="/games"
          className="inline-block text-highlight hover:underline mb-8 font-bold"
        >
          ← Volver a juegos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Imágenes */}
          <div className="lg:col-span-2">
            {/* Imagen principal */}
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={displayImage || 'https://via.placeholder.com/600x400'}
                alt={game.name}
                className="w-full h-auto object-cover rounded"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                }}
              />
            </div>

            {/* Miniaturas de capturas */}
            {screenshots.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Capturas de pantalla</h3>
                <div className="grid grid-cols-4 gap-4">
                  <button
                    onClick={() => setSelectedImage(-1)}
                    className={`rounded overflow-hidden border-2 transition ${
                      selectedImage === -1 ? 'border-highlight' : 'border-accent'
                    }`}
                  >
                    <img
                      src={game.background_image}
                      alt="Portada"
                      className="w-full h-24 object-cover"
                    />
                  </button>
                  {screenshots.slice(0, 4).map((screenshot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`rounded overflow-hidden border-2 transition ${
                        selectedImage === idx ? 'border-highlight' : 'border-accent'
                      }`}
                    >
                      <img
                        src={screenshot.image}
                        alt={`Screenshot ${idx + 1}`}
                        className="w-full h-24 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200x150';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Información lateral */}
          <div className="bg-secondary p-8 rounded-lg h-fit">
            <h1 className="text-3xl font-bold text-white mb-4">{game.name}</h1>

            {/* Rating */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-yellow-400">
                  {game.rating ? game.rating.toFixed(1) : 'N/A'}
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.round(game.rating) ? 'text-yellow-400 text-lg' : 'text-gray-500 text-lg'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-sm">Basado en {game.ratings_count} valoraciones</p>
            </div>

            {/* Botón Favorito */}
            <button
              onClick={() => onFavorite(game)}
              className={`w-full py-3 rounded font-bold text-lg mb-6 transition ${
                isFavorite
                  ? 'bg-highlight text-white hover:bg-red-600'
                  : 'bg-accent text-white hover:bg-highlight'
              }`}
            >
              {isFavorite ? '❤️ Quitar de favoritos' : '🤍 Añadir a favoritos'}
            </button>

            {/* Información general */}
            {game.released && (
              <div className="mb-4">
                <p className="text-gray-400 text-sm">Fecha de lanzamiento</p>
                <p className="text-white font-bold">{new Date(game.released).toLocaleDateString('es-ES')}</p>
              </div>
            )}

            {game.playtime && (
              <div className="mb-4">
                <p className="text-gray-400 text-sm">Tiempo promedio de juego</p>
                <p className="text-white font-bold">{game.playtime} horas</p>
              </div>
            )}

            {/* Géneros */}
            {game.genres && game.genres.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Géneros</p>
                <div className="flex flex-wrap gap-2">
                  {game.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-accent px-3 py-1 rounded text-sm text-white"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Plataformas */}
            {game.platforms && game.platforms.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Plataformas</p>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map((platform) => (
                    <span
                      key={platform.platform.id}
                      className="bg-primary px-3 py-1 rounded text-sm text-gray-300 border border-accent"
                    >
                      {platform.platform.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Desarrolladores */}
            {game.developers && game.developers.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Desarrolladores</p>
                <p className="text-white font-bold">
                  {game.developers.map(d => d.name).join(', ')}
                </p>
              </div>
            )}

            {/* Publicadores */}
            {game.publishers && game.publishers.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Publicadores</p>
                <p className="text-white font-bold">
                  {game.publishers.map(p => p.name).join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Descripción */}
        {game.description || game.description_raw && (
          <div className="mt-12 bg-secondary p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Descripción</h2>
            <p className="text-gray-300 leading-relaxed">
              {game.description_raw || game.description || 'No hay descripción disponible'}
            </p>
          </div>
        )}

        {/* Información adicional */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {game.metacritic && (
            <div className="bg-secondary p-6 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">Puntuación Metacritic</p>
              <p className="text-3xl font-bold text-yellow-400">{game.metacritic}</p>
            </div>
          )}

          {game.tba && (
            <div className="bg-secondary p-6 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">Estado</p>
              <p className="text-white font-bold">Por anunciar fecha</p>
            </div>
          )}

          {game.updated && (
            <div className="bg-secondary p-6 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">Última actualización</p>
              <p className="text-white font-bold">
                {new Date(game.updated).toLocaleDateString('es-ES')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
