import { useState, useEffect, useRef } from 'react';
import Carousel from '../components/Carousel';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularGames } from '../services/gameService';
import { Link } from 'react-router-dom';

// Componente de partículas flotantes
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 8,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.size > 2.5 ? 'rgba(166,77,121,0.5)' : 'rgba(166,77,121,0.25)',
            boxShadow: p.size > 2.5 ? '0 0 6px rgba(166,77,121,0.4)' : 'none',
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// Componente de texto animado que se revela al montarse
function RevealText({ children, delay = 0, className = '', style = {} }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

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

  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A64D79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
      title: 'Búsqueda Potente',
      description: 'Busca entre miles de videojuegos con nuestro potente buscador. Encuentra exactamente lo que buscas en segundos.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 12 12" fill="#A64D79">
          <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 10l.6-3.2L1.2 4.5l3.3-.5z" />
        </svg>
      ),
      title: 'Información Detallada',
      description: 'Accede a detalles completos: géneros, plataformas, fechas de lanzamiento y puntuaciones de cada juego.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#A64D79">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      title: 'Guarda Favoritos',
      description: 'Marca tus juegos favoritos y accede a ellos rápidamente. Crea tu colección personal de títulos imprescindibles.',
    },
  ];

  return (
    <div className="min-h-screen relative" style={{ background: '#1A1A1D' }}>

      <style>{`
        @keyframes floatParticle {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(15px, -20px) scale(1.3); }
          100% { transform: translate(-10px, 10px) scale(0.8); }
        }
        @keyframes slowZoom {
          0%   { transform: scale(1); }
          100% { transform: scale(1.12); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }
        @keyframes badgeSlide {
          0%   { opacity: 0; transform: translateY(-8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden" style={{ paddingTop: '100px', paddingBottom: '120px', minHeight: '100vh' }}>
        
        {/* Video de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[140vw] h-[140vh] -translate-x-1/2 -translate-y-1/2">
          <iframe
            title="League of Legends Gameplay"
            src="https://www.youtube.com/embed/oGnZk-_R0KQ?autoplay=1&mute=1&loop=1&playlist=oGnZk-_R0KQ&controls=0&modestbranding=1&rel=0&start=10"
            allow="autoplay; muted"
            className="w-full h-full"
            frameBorder="0"
          />
        </div>
      </div>


        {/* Capas de overlay sobre el video */}
        <div className="absolute inset-0" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,26,29,0.3) 0%, rgba(26,26,29,0.5) 40%, rgba(26,26,29,0.95) 85%, #1A1A1D 100%)' }} />

        {/* Orbs sobre el video */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute"
            style={{
              width: '500px', height: '500px',
              top: '-140px', right: '-120px',
              background: 'radial-gradient(circle, rgba(106,30,85,0.35) 0%, transparent 70%)',
              filter: 'blur(70px)',
            }}
          />
          <div
            className="absolute"
            style={{
              width: '360px', height: '360px',
              bottom: '-80px', left: '-80px',
              background: 'radial-gradient(circle, rgba(166,77,121,0.2) 0%, transparent 70%)',
              filter: 'blur(55px)',
            }}
          />
        </div>

        {/* Partículas */}
        <FloatingParticles />

        {/* Contenido hero */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">

          {/* Badge animado */}
          <RevealText delay={300}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
              style={{
                background: 'rgba(106,30,85,0.2)',
                border: '1px solid rgba(166,77,121,0.3)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6A1E55, #A64D79)' }}
              >
                <span className="text-white" style={{ fontSize: '11px' }}>◈</span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#A64D79', letterSpacing: '0.12em' }}>
                Bienvenido a YouWverse
              </span>
            </div>
          </RevealText>

          {/* Título con reveals escalonados */}
          <RevealText delay={500}>
            <h1
              className="text-4xl md:text-6xl font-bold text-white mb-2"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.03em', lineHeight: '1.15' }}
            >
              Descubre tu próximo
            </h1>
          </RevealText>

          <RevealText delay={750}>
            <h1
              className="text-4xl md:text-6xl font-bold mb-5"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.03em', lineHeight: '1.15', color: '#A64D79', animation: 'glowPulse 3s ease-in-out infinite' }}
            >
              juego favorito
            </h1>
          </RevealText>

          {/* Subtitle */}
          <RevealText delay={1000}>
            <p className="text-base md:text-lg max-w-xl leading-relaxed mb-8" style={{ color: 'rgba(212,197,208,0.6)' }}>
              Explora miles de videojuegos, descubre nuevos títulos y encuentra tus favoritos en una plataforma única.
            </p>
          </RevealText>

          {/* CTA */}
          <RevealText delay={1250}>
            <Link
              to="/games"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #6A1E55, #A64D79)',
                boxShadow: '0 4px 20px rgba(166,77,121,0.4)',
                fontSize: '0.95rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 30px rgba(166,77,121,0.6)';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(166,77,121,0.4)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Explorar Juegos
            </Link>
          </RevealText>
        </div>
      </section>

      {/* ─── Características ─── */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-3 mb-14">
            <div className="flex items-center gap-3">
              <div className="w-0.5 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, #A64D79, #6A1E55)' }} />
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}>
                ¿Por qué <span style={{ color: '#A64D79' }}>Youwverse</span>?
              </h2>
              <div className="w-0.5 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, #6A1E55, #A64D79)' }} />
            </div>
            <p className="text-sm text-center max-w-md" style={{ color: 'rgba(212,197,208,0.45)' }}>
              Todo lo que necesitas para explorar el mundo de los videojuegos en un solo lugar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="relative rounded-xl p-6 transition-all duration-300"
                style={{
                  background: 'linear-gradient(145deg, rgba(26,26,29,0.9) 0%, rgba(59,28,50,0.6) 100%)',
                  border: '1px solid rgba(166,77,121,0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(166,77,121,0.35)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3), 0 0 16px rgba(166,77,121,0.12)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(166,77,121,0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(106,30,85,0.2)',
                    border: '1px solid rgba(166,77,121,0.25)',
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.01em' }}>
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(212,197,208,0.5)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Carrusel ─── */}
      <section className="py-6 px-6">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <ErrorMessage message={error} />
          ) : loading ? (
            <LoadingSpinner />
          ) : games.length > 0 ? (
            <Carousel games={games} onFavorite={onFavorite} favorites={favorites} />
          ) : (
            <ErrorMessage message="No se encontraron juegos" />
          )}
        </div>
      </section>

      {/* ─── CTA Final ─── */}
      <section className="relative overflow-hidden py-24 px-6 mt-10">
        <div
          className="absolute pointer-events-none"
          style={{
            width: '500px', height: '500px',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(106,30,85,0.22) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{ width: '400px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(166,77,121,0.3), transparent)' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-6"
            style={{
              background: 'rgba(106,30,85,0.15)',
              border: '1px solid rgba(166,77,121,0.2)',
            }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#A64D79', letterSpacing: '0.12em' }}>
              Explorar más
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.03em', lineHeight: '1.2' }}
          >
            ¿Listo para descubrir tu próximo
          </h2>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.03em', lineHeight: '1.2', color: '#A64D79', animation: 'glowPulse 3s ease-in-out infinite' }}
          >
            juego favorito?
          </h2>

          <p className="text-sm max-w-lg leading-relaxed mb-8" style={{ color: 'rgba(212,197,208,0.5)' }}>
            Navega a través de nuestra colección completa y encuentra exactamente lo que buscas.
          </p>

          <Link
            to="/games"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #6A1E55, #A64D79)',
              boxShadow: '0 4px 20px rgba(166,77,121,0.4)',
              fontSize: '0.95rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 30px rgba(166,77,121,0.6)';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(166,77,121,0.4)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Ir a Galería Completa
          </Link>
        </div>
      </section>
    </div>
  );
}