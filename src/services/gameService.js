// Reemplaza esto con tu propia API key de RAWG
// Obtén la tuya en: https://rawg.io/
// O configura REACT_APP_RAWG_API_KEY en tu archivo .env
const API_KEY = process.env.REACT_APP_RAWG_API_KEY || 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.rawg.io/api';

// Obtener listado de juegos con paginación
export const getGames = async (page = 1, pageSize = 20, search = '') => {
  try {
    let url = `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la solicitud');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    throw error;
  }
};

// Obtener juegos populares (mejor clasificados)
export const getPopularGames = async (pageSize = 10) => {
  try {
    const url = `${BASE_URL}/games?key=${API_KEY}&page_size=${pageSize}&ordering=-rating`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la solicitud');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener juegos populares:', error);
    throw error;
  }
};

// Obtener detalles de un juego específico
export const getGameDetail = async (gameId) => {
  try {
    const url = `${BASE_URL}/games/${gameId}?key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la solicitud');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener detalle del juego:', error);
    throw error;
  }
};

// Obtener capturas de pantalla del juego
export const getGameScreenshots = async (gameId) => {
  try {
    const url = `${BASE_URL}/games/${gameId}/screenshots?key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la solicitud');
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error al obtener capturas:', error);
    return [];
  }
};

// Obtener géneros disponibles
export const getGenres = async () => {
  try {
    const url = `${BASE_URL}/genres?key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la solicitud');
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error al obtener géneros:', error);
    return [];
  }
};

// Buscar juegos por géneros
export const getGamesByGenre = async (genreId, page = 1) => {
  try {
    const url = `${BASE_URL}/games?key=${API_KEY}&genres=${genreId}&page=${page}&page_size=20`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la solicitud');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener juegos por género:', error);
    throw error;
  }
};

const gameService = {
  getGames,
  getPopularGames,
  getGameDetail,
  getGameScreenshots,
  getGenres,
  getGamesByGenre,
};

export default gameService;
