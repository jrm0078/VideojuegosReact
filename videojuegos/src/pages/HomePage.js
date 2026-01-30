import { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularGames } from '../services/gameService';
import { Link } from 'react-router-dom';

export default function HomePage({ onFavorite, favorites }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const data = await getPopularGames(20);
        setGames(data.results || []);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar los juegos. Por favor, verifica tu API key.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Bienvenido a <span className="text-highlight">GameVerse</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explora miles de videojuegos, descubre nuevos títulos y encuentra tus juegos favoritos en una plataforma única.
          </p>
          <Link
            to="/games"
            className="inline-block bg-highlight hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition"
          >
            Explorar Juegos
          </Link>
        </div>
      </section>

      {/* Características */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            ¿Por qué GameVerse?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Característica 1 */}
            <div className="bg-primary p-8 rounded-lg border border-accent hover:border-highlight transition">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-3">Búsqueda Potente</h3>
              <p className="text-gray-400">
                Busca entre miles de videojuegos con nuestro potente buscador. Encuentra exactamente lo que buscas en segundos.
              </p>
            </div>

            {/* Característica 2 */}
            <div className="bg-primary p-8 rounded-lg border border-accent hover:border-highlight transition">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-white mb-3">Información Detallada</h3>
              <p className="text-gray-400">
                Accede a detalles completos: géneros, plataformas, fechas de lanzamiento y puntuaciones de cada juego.
              </p>
            </div>

            {/* Característica 3 */}
            <div className="bg-primary p-8 rounded-lg border border-accent hover:border-highlight transition">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-white mb-3">Guarda Favoritos</h3>
              <p className="text-gray-400">
                Marca tus juegos favoritos y accede a ellos rápidamente. Crea tu colección personal de títulos imprescindibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carrusel de juegos */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {error ? (
            <ErrorMessage message={error} />
          ) : loading ? (
            <LoadingSpinner />
          ) : games.length > 0 ? (
            <Carousel 
              games={games}
              onFavorite={onFavorite}
              favorites={favorites}
            />
          ) : (
            <ErrorMessage message="No se encontraron juegos" />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-accent">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para descubrir tu próximo juego favorito?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Navega a través de nuestra colección completa y encuentra exactamente lo que buscas.
          </p>
          <Link
            to="/games"
            className="inline-block bg-highlight hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition"
          >
            Ir a Galería Completa
          </Link>
        </div>
      </section>
    </div>
  );
}
