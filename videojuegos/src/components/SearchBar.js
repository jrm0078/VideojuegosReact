import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Busca tu juego favorito..."
          className="flex-1 px-4 py-3 rounded bg-secondary text-white placeholder-gray-500 border border-accent focus:border-highlight focus:outline-none transition"
        />
        <button
          type="submit"
          className="bg-highlight hover:bg-red-600 text-white px-6 py-3 rounded font-bold transition"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
