import { useState, useEffect } from 'react';
import GameCard from './GameCard';

export default function Carousel({ games, onFavorite, favorites }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Ajusta items por pantalla
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

  if (!games || games.length === 0) return null;

  const maxIndex = Math.ceil(games.length / itemsPerView) - 1;

  const goToPrevious = () => setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  const goToNext = () => setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1));

  return (
    <section
      className="relative rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #1A1A1D 0%, #3B1C32 50%, #1A1A1D 100%)' }}
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: '320px',
            height: '320px',
            top: '-80px',
            right: '-60px',
            background: 'radial-gradient(circle, rgba(106,30,85,0.35) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '240px',
            height: '240px',
            bottom: '-60px',
            left: '10%',
            background: 'radial-gradient(circle, rgba(166,77,121,0.2) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      <div className="relative z-10 p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-7">
          <div className="flex items-center gap-3">
            <div className="w-0.5 h-7 rounded-full" style={{ background: 'linear-gradient(180deg, #A64D79, #6A1E55)' }} />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}>
              Juegos <span style={{ color: '#A64D79' }}>Destacados</span>
            </h2>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium mr-2" style={{ color: 'rgba(166,77,121,0.8)' }}>
              {currentIndex + 1} / {maxIndex + 1}
            </span>

            <button onClick={goToPrevious} className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: 'rgba(166,77,121,0.12)', border: '1px solid rgba(166,77,121,0.25)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#A64D79' }}>
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button onClick={goToNext} className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #6A1E55, #A64D79)', boxShadow: '0 2px 10px rgba(166,77,121,0.35)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" color="#fff">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {games.map((game) => (
              <div
                key={game.id}
                className="px-2"
                style={{ flex: `0 0 ${100 / itemsPerView}%` }} // Cada card ocupa el espacio correcto
              >
                <GameCard
                  game={game}
                  onFavorite={onFavorite}
                  isFavorite={favorites.some(fav => fav.id === game.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentIndex ? '24px' : '8px',
                height: '3px',
                background: i === currentIndex ? 'linear-gradient(90deg, #6A1E55, #A64D79)' : 'rgba(166,77,121,0.25)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
