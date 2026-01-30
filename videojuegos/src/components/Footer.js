export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary border-t border-accent mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-highlight mb-4">GameVerse</h3>
            <p className="text-gray-400">
              Descubre y explora los mejores videojuegos de todo el mundo.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Enlaces útiles</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-highlight transition">Sobre nosotros</a></li>
              <li><a href="/" className="hover:text-highlight transition">Contacto</a></li>
              <li><a href="/" className="hover:text-highlight transition">Términos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Información</h4>
            <p className="text-gray-400 text-sm">
              Powered by <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer" className="text-highlight hover:underline">RAWG API</a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-accent pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} GameVerse. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
