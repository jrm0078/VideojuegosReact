import { Link } from 'react-router-dom';

export default function GameCard({ game, onFavorite, isFavorite }) {
  return (
    <Link to={`/game/${game.id}`}>
      <div className="bg-secondary rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 shadow-lg h-full flex flex-col">
        {/* Imagen */}
        <div className="relative overflow-hidden h-48">
          <img
            src={game.background_image || '/placeholder.jpg'}
            alt={game.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x169?text=No+Image';
            }}
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-3 py-1 rounded">
            <span className="text-yellow-400 font-bold">{game.rating ? game.rating.toFixed(1) : 'N/A'}</span>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-highlight">
            {game.name}
          </h3>

          {/* Géneros */}
          <div className="mb-3 flex-1">
            <div className="flex flex-wrap gap-1 mb-2">
              {game.genres?.slice(0, 2).map((genre) => (
                <span key={genre.id} className="text-xs bg-accent px-2 py-1 rounded text-gray-200">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Plataformas */}
          {game.platforms && game.platforms.length > 0 && (
            <p className="text-xs text-gray-400 mb-3">
              {game.platforms.slice(0, 2).map(p => p.platform.name).join(', ')}
              {game.platforms.length > 2 && '...'}
            </p>
          )}

          {/* Botón Favorito */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onFavorite(game);
            }}
            className={`mt-auto py-2 px-4 rounded font-bold transition ${
              isFavorite
                ? 'bg-highlight text-white'
                : 'bg-accent hover:bg-highlight text-white'
            }`}
          >
            {isFavorite ? '❤️ Favorito' : '🤍 Añadir'}
          </button>
        </div>
      </div>
    </Link>
  );
}
