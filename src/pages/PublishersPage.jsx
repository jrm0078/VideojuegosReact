import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { searchPublishers } from '../services/gameService.js';

export default function PublishersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const PAGE_SIZE = 20;

  const currentPage = Math.max(1, parseInt(searchParams.get('page')) || 1);
  const [totalPublishers, setTotalPublishers] = useState(0);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        setLoading(true);
        const data = await searchPublishers(searchTerm, currentPage);
        setPublishers(data.results || []);
        setTotalPublishers(data.count || 0);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar los publishers. Por favor, intenta de nuevo.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublishers();
  }, [searchTerm, currentPage]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSearchParams({ search: term, page: '1' });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ search: searchTerm, page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalPublishers / PAGE_SIZE);

  return (
    <div className="min-h-screen relative" style={{ background: '#1A1A1D' }}>

      {/* Orbs de fondo fijos */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute"
          style={{
            width: '440px',
            height: '440px',
            top: '-100px',
            right: '-80px',
            background: 'radial-gradient(circle, rgba(106,30,85,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '360px',
            height: '360px',
            bottom: '-60px',
            left: '-80px',
            background: 'radial-gradient(circle, rgba(166,77,121,0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-0.5 h-8 rounded-full"
                style={{ background: 'linear-gradient(180deg, #A64D79, #6A1E55)' }}
              />
              <h1
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
              >
                {searchTerm ? (
                  <>Resultados para: <span style={{ color: '#A64D79' }}>"{searchTerm}"</span></>
                ) : (
                  <>Todos los <span style={{ color: '#A64D79' }}>Publishers</span></>
                )}
              </h1>
            </div>
            <p className="text-sm pl-3.5" style={{ color: 'rgba(212,197,208,0.5)' }}>
              {totalPublishers > 0
                ? <>{totalPublishers.toLocaleString()} <span style={{ color: '#A64D79', fontWeight: 600 }}>{totalPublishers === 1 ? 'publisher' : 'publishers'}</span> disponibles</>
                : 'No se encontraron resultados'}
            </p>
          </div>

          {/* Badge total */}
          {totalPublishers > 0 && (
            <div
              className="self-start sm:self-end flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(106,30,85,0.15)',
                border: '1px solid rgba(166,77,121,0.25)',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A64D79" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: '#A64D79' }}>
                {totalPublishers.toLocaleString()} publishers
              </span>
            </div>
          )}
        </div>

        {/* Buscador */}
        <SearchBar onSearch={handleSearch} placeholder="Busca publishers..." suggestions={['Sony', 'Microsoft', 'Nintendo']} />

        {/* Contenido */}
        {error ? (
          <ErrorMessage message={error} />
        ) : loading ? (
          <LoadingSpinner />
        ) : publishers.length > 0 ? (
          <>
            {/* Lista de Publishers */}
            <div className="space-y-3 mb-14">
              {publishers.map((publisher) => (
                <Link
                  key={publisher.id}
                  to={`/publisher/${publisher.id}`}
                  className="block p-5 rounded-xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(145deg, rgba(26,26,29,0.8) 0%, rgba(59,28,50,0.6) 100%)',
                    border: '1px solid rgba(166,77,121,0.15)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(166,77,121,0.35)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(166,77,121,0.2)';
                    e.currentTarget.style.background = 'linear-gradient(145deg, rgba(26,26,29,0.9) 0%, rgba(59,28,50,0.75) 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(166,77,121,0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = 'linear-gradient(145deg, rgba(26,26,29,0.8) 0%, rgba(59,28,50,0.6) 100%)';
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className="text-lg font-semibold text-white mb-2"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        {publisher.name}
                      </h3>
                      {publisher.games_count && (
                        <p className="text-sm" style={{ color: 'rgba(212,197,208,0.6)' }}>
                          <span style={{ color: '#A64D79', fontWeight: 600 }}>{publisher.games_count}</span> juegos publicados
                        </p>
                      )}
                      {publisher.description && (
                        <p className="text-sm mt-2 line-clamp-2" style={{ color: 'rgba(212,197,208,0.5)' }}>
                          {publisher.description}
                        </p>
                      )}
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A64D79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3">

                {/* Anterior */}
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  style={{
                    background: currentPage === 1 ? 'rgba(166,77,121,0.06)' : 'rgba(166,77,121,0.12)',
                    border: '1px solid rgba(166,77,121,0.2)',
                    color: currentPage === 1 ? 'rgba(212,197,208,0.3)' : 'rgba(212,197,208,0.7)',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 1) {
                      e.currentTarget.style.background = 'rgba(166,77,121,0.22)';
                      e.currentTarget.style.borderColor = 'rgba(166,77,121,0.4)';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== 1) {
                      e.currentTarget.style.background = 'rgba(166,77,121,0.12)';
                      e.currentTarget.style.borderColor = 'rgba(166,77,121,0.2)';
                      e.currentTarget.style.color = 'rgba(212,197,208,0.7)';
                    }
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Anterior
                </button>

                {/* Dots de página */}
                <div className="flex items-center gap-1.5">
                  {(() => {
                    const pages = [];
                    const delta = 2;
                    const start = Math.max(2, currentPage - delta);
                    const end = Math.min(totalPages - 1, currentPage + delta);

                    pages.push(1);
                    if (start > 2) pages.push('...');
                    for (let i = start; i <= end; i++) pages.push(i);
                    if (end < totalPages - 1) pages.push('...');
                    if (totalPages > 1) pages.push(totalPages);

                    return pages.map((page, idx) =>
                      page === '...' ? (
                        <span key={`dots-${idx}`} className="text-xs px-1" style={{ color: 'rgba(212,197,208,0.3)' }}>
                          ···
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className="w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center justify-center"
                          style={{
                            background: currentPage === page
                              ? 'linear-gradient(135deg, #6A1E55, #A64D79)'
                              : 'rgba(166,77,121,0.08)',
                            border: currentPage === page
                              ? 'none'
                              : '1px solid rgba(166,77,121,0.18)',
                            color: currentPage === page ? '#fff' : 'rgba(212,197,208,0.6)',
                            boxShadow: currentPage === page ? '0 2px 10px rgba(166,77,121,0.35)' : 'none',
                          }}
                          onMouseEnter={(e) => {
                            if (currentPage !== page) {
                              e.currentTarget.style.background = 'rgba(166,77,121,0.18)';
                              e.currentTarget.style.color = '#fff';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentPage !== page) {
                              e.currentTarget.style.background = 'rgba(166,77,121,0.08)';
                              e.currentTarget.style.color = 'rgba(212,197,208,0.6)';
                            }
                          }}
                        >
                          {page}
                        </button>
                      )
                    );
                  })()}
                </div>

                {/* Siguiente */}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage >= totalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  style={{
                    background: currentPage >= totalPages ? 'rgba(166,77,121,0.06)' : 'rgba(166,77,121,0.12)',
                    border: '1px solid rgba(166,77,121,0.2)',
                    color: currentPage >= totalPages ? 'rgba(212,197,208,0.3)' : 'rgba(212,197,208,0.7)',
                    cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage < totalPages) {
                      e.currentTarget.style.background = 'rgba(166,77,121,0.22)';
                      e.currentTarget.style.borderColor = 'rgba(166,77,121,0.4)';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage < totalPages) {
                      e.currentTarget.style.background = 'rgba(166,77,121,0.12)';
                      e.currentTarget.style.borderColor = 'rgba(166,77,121,0.2)';
                      e.currentTarget.style.color = 'rgba(212,197,208,0.7)';
                    }
                  }}
                >
                  Siguiente
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <ErrorMessage message="No se encontraron publishers con ese criterio de búsqueda." />
        )}
      </div>
    </div>
  );
}
