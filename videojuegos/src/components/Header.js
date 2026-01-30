import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-primary border-b-2 border-accent sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-highlight">🎮</div>
          <h1 className="text-2xl font-bold text-white hidden sm:block">GameVerse</h1>
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-white hover:text-highlight transition">
            Inicio
          </Link>
          <Link to="/games" className="text-white hover:text-highlight transition">
            Todos los juegos
          </Link>
          <Link to="/favorites" className="text-white hover:text-highlight transition">
            ❤️ Favoritos
          </Link>
        </div>
      </nav>
    </header>
  );
}
