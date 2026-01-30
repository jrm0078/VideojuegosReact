import { useState, useEffect } from 'react';
import GameCard from './GameCard';

export default function Carousel({ games, onFavorite, favorites }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else if (window.innerWidth < 1536) setItemsPerView(3);
      else setItemsPerView(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, games.length - itemsPerView) : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= games.length - itemsPerView ? 0 : prevIndex + 1
    );
  };

  if (!games || games.length === 0) return null;

  return (
    <div className="relative bg-gradient-to-r from-secondary to-primary p-8 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Juegos Destacados</h2>
        <div className="flex gap-2">
          <button
            onClick={goToPrevious}
            className="bg-accent hover:bg-highlight text-white p-2 rounded transition"
            aria-label="Previous games"
          >
            ←
          </button>
          <button
            onClick={goToNext}
            className="bg-accent hover:bg-highlight text-white p-2 rounded transition"
            aria-label="Next games"
          >
            →
          </button>
        </div>
      </div>

      {/* Carrusel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 gap-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            width: `${(games.length / itemsPerView) * 100}%`,
          }}
        >
          {games.map((game) => (
            <div key={game.id} style={{ flex: `0 0 calc(100% / ${itemsPerView})` }}>
              <GameCard 
                game={game}
                onFavorite={onFavorite}
                isFavorite={favorites.some(fav => fav.id === game.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
