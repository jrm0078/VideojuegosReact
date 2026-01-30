import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import GameCard from '../components/GameCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getGames } from '../services/gameService';

export default function GamesPage({ onFavorite, favorites }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalGames, setTotalGames] = useState(0);
  const PAGE_SIZE = 20;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const data = await getGames(currentPage, PAGE_SIZE, searchTerm);
        setGames(data.results || []);
        setTotalGames(data.count || 0);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar los juegos. Por favor, intenta de nuevo.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [searchTerm, currentPage]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalGames / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-primary py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            {searchTerm ? `Resultados para: "${searchTerm}"` : 'Todos los Juegos'}
          </h1>
          <p className="text-gray-400">
            Total de juegos disponibles: <span className="text-highlight font-bold">{totalGames.toLocaleString()}</span>
          </p>
        </div>

        {/* Buscador */}
        <SearchBar onSearch={handleSearch} />

        {/* Contenido */}
        {error ? (
          <ErrorMessage message={error} />
        ) : loading ? (
          <LoadingSpinner />
        ) : games.length > 0 ? (
          <>
            {/* Grid de juegos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onFavorite={onFavorite}
                  isFavorite={favorites.some(fav => fav.id === game.id)}
                />
              ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="bg-accent hover:bg-highlight disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded font-bold transition"
              >
                ← Anterior
              </button>

              <div className="flex items-center gap-2">
                <span className="text-white">
                  Página <span className="font-bold text-highlight">{currentPage}</span> de <span className="font-bold text-highlight">{totalPages}</span>
                </span>
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage >= totalPages}
                className="bg-accent hover:bg-highlight disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded font-bold transition"
              >
                Siguiente →
              </button>
            </div>
          </>
        ) : (
          <ErrorMessage message="No se encontraron juegos con ese criterio de búsqueda." />
        )}
      </div>
    </div>
  );
}
