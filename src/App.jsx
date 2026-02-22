import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import GamesPage from './pages/GamesPage.jsx';
import GameDetailPage from './pages/GameDetailPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import TagsPage from './pages/TagsPage.jsx';
import PublisherDetailPage from './pages/PublisherDetailPage.jsx';
import PublishersPage from './pages/PublishersPage.jsx';

function App() {
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos del localStorage al montar el componente
  useEffect(() => {
    const savedFavorites = localStorage.getItem('gameFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      }
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('gameFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Manejar agregar/quitar de favoritos
  const handleFavorite = (game) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(fav => fav.id === game.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== game.id);
      } else {
        return [...prevFavorites, game];
      }
    });
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-primary">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onFavorite={handleFavorite} favorites={favorites} />} />
            <Route path="/games" element={<GamesPage onFavorite={handleFavorite} favorites={favorites} />} />
            <Route path="/game/:gameId" element={<GameDetailPage onFavorite={handleFavorite} favorites={favorites} />} />
            <Route path="/tag/:tagId" element={<TagsPage onFavorite={handleFavorite} favorites={favorites} />} />
            <Route path="/publisher/:publisherId" element={<PublisherDetailPage onFavorite={handleFavorite} favorites={favorites} />} />
            <Route path="/publishers" element={<PublishersPage />} />
            <Route path="/favorites" element={<FavoritesPage favorites={favorites} onFavorite={handleFavorite} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
