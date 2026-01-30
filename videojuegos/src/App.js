import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import GameDetailPage from './pages/GameDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

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
            <Route path="/favorites" element={<FavoritesPage favorites={favorites} onFavorite={handleFavorite} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
