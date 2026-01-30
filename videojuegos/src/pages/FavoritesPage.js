import GameCard from '../components/GameCard';
import { Link } from 'react-router-dom';

export default function FavoritesPage({ favorites, onFavorite }) {
  return (
    <div className="min-h-screen bg-primary py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Mis Juegos Favoritos</h1>
        <p className="text-gray-400 mb-12">
          Total de favoritos: <span className="text-highlight font-bold">{favorites.length}</span>
        </p>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              No tienes favoritos aún
            </h2>
            <p className="text-gray-400 mb-8">
              Explora nuestros juegos y añade tus favoritos.
            </p>
            <Link
              to="/games"
              className="inline-block bg-highlight hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold transition"
            >
              Explorar Juegos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
