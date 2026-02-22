export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Sobre nosotros', href: '/' },
    { label: 'Contacto', href: '/' },
    { label: 'Términos', href: '/' },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1A1A1D 0%, #3B1C32 100%)' }}>

      {/* Línea de acento superior — espejo del header */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(166,77,121,0.4), transparent)' }} />

      {/* Círculo decorativo de fondo */}
      <div className="absolute pointer-events-none" style={{
        width: '360px',
        height: '360px',
        bottom: '-180px',
        right: '-80px',
        background: 'radial-gradient(circle, rgba(106,30,85,0.18) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-8">

        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Columna 1: Marca */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6A1E55, #A64D79)', boxShadow: '0 0 10px rgba(166,77,121,0.35)' }}
              >
                <span className="text-white" style={{ fontSize: '14px' }}>◈</span>
              </div>
              <span className="text-lg font-bold text-white" style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}>
                Youw<span style={{ color: '#A64D79' }}>Verse</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(212,197,208,0.6)' }}>
              Descubre y explora los mejores videojuegos de todo el mundo.
            </p>
          </div>

          {/* Columna 2: enlaces útiles */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-0.5 h-4 rounded-full" style={{ background: 'linear-gradient(180deg, #A64D79, #6A1E55)' }} />
              <h4 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'rgba(212,197,208,0.7)', letterSpacing: '0.1em' }}>
                enlaces útiles
              </h4>
            </div>
            <ul className="flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 transition-all duration-300"
                    style={{ color: 'rgba(212,197,208,0.55)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(212,197,208,0.55)')}
                  >
                    <span
                      className="inline-block h-px rounded-full transition-all duration-300"
                      style={{ background: '#A64D79', width: '0px' }}
                    />
                    <span className="text-sm transition-colors duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Información */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-0.5 h-4 rounded-full" style={{ background: 'linear-gradient(180deg, #A64D79, #6A1E55)' }} />
              <h4 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'rgba(212,197,208,0.7)', letterSpacing: '0.1em' }}>
                información
              </h4>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(212,197,208,0.55)' }}>
              Datos proporcionados por{' '}
              <a
                href="https://rawg.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300"
                style={{ color: '#A64D79', borderBottom: '1px solid transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = '#A64D79')}
                onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}
              >
                RAWG API
              </a>
              .
            </p>
          </div>
        </div>

        {/* Divisor */}
        <div
          className="mb-6"
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(166,77,121,0.25), transparent)' }}
        />

        {/* Pie: copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(212,197,208,0.35)' }}>
            &copy; {currentYear} YouwVerse. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs" style={{ color: 'rgba(212,197,208,0.25)' }}>Hecho con</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#A64D79">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-xs" style={{ color: 'rgba(212,197,208,0.25)' }}>por el equipo de YouwVerse</span>
          </div>
        </div>
      </div>
    </footer>
  );
}