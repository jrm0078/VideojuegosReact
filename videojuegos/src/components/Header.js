import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ background: 'linear-gradient(135deg, #1A1A1D 0%, #3B1C32 60%, #6A1E55 100%)' }} className="sticky top-0 z-50">
      {/* Subtle top accent line */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #A64D79, transparent)' }} />

      <nav className="relative max-w-6xl mx-auto px-6 py-0">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #6A1E55, #A64D79)', boxShadow: '0 0 12px rgba(166,77,121,0.4)' }}
              >
                <span className="text-white text-lg">◈</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white hidden sm:block" style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}>
              Youw<span style={{ color: '#A64D79' }}>Verse</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {[
              { to: '/', label: 'Inicio' },
              { to: '/games', label: 'Todos los juegos' },
              { to: '/favorites', label: 'Favoritos' },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="relative px-4 py-2 text-sm font-medium transition-all duration-300 group"
                  style={{ color: '#d4c5d0' }}
                  onMouseEnter={(e) => (e.target.style.color = '#fff')}
                  onMouseLeave={(e) => (e.target.style.color = '#d4c5d0')}
                >
                  {item.label}
                  {/* Animated underline */}
                  <span
                    className="absolute left-4 right-4 bottom-0 h-px transition-all duration-300 scale-x-0 group-hover:scale-x-100"
                    style={{ background: 'linear-gradient(90deg, #6A1E55, #A64D79)', transformOrigin: 'center' }}
                  />
                </Link>
              </li>
            ))}

            {/* CTA */}
            <li className="ml-3">
              <Link
                to="/favorites"
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #6A1E55, #A64D79)',
                  boxShadow: '0 2px 10px rgba(166,77,121,0.3)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 18px rgba(166,77,121,0.55)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 10px rgba(166,77,121,0.3)')}
              >
                <span style={{ fontSize: '13px' }}>♥</span> Mis Favoritos
              </Link>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          >
            <span
              className="block h-0.5 w-5 rounded-full transition-all duration-300"
              style={{ background: '#A64D79', transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }}
            />
            <span
              className="block h-0.5 w-5 rounded-full transition-all duration-300"
              style={{ background: '#A64D79', opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-0.5 w-5 rounded-full transition-all duration-300"
              style={{ background: '#A64D79', transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: menuOpen ? '240px' : '0', opacity: menuOpen ? 1 : 0 }}
      >
        <div className="px-6 pb-5 pt-2 flex flex-col gap-1" style={{ borderTop: '1px solid rgba(166,77,121,0.2)' }}>
          {[
            { to: '/', label: 'Inicio' },
            { to: '/games', label: 'Todos los juegos' },
            { to: '/favorites', label: '♥  Mis Favoritos' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{ color: '#d4c5d0', background: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(166,77,121,0.12)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#d4c5d0';
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
