# 🎮 GameVerse - Explorador de Videojuegos

Una aplicación web moderna y responsiva para explorar, buscar y descubrir videojuegos usando la API pública de RAWG.

## 🌟 Características Principales

- ✅ **Página de Inicio Atractiva** - Carrusel con juegos populares
- ✅ **Búsqueda Avanzada** - Busca entre miles de videojuegos
- ✅ **Información Detallada** - Detalles completos de cada juego
- ✅ **Sistema de Favoritos** - Guarda tus juegos favoritos (persistente)
- ✅ **Diseño Responsivo** - Funciona en móvil, tablet y desktop
- ✅ **Navegación Fluida** - Rutas rápidas con React Router
- ✅ **Estilos Modernos** - Tailwind CSS para una interfaz elegante

## 🚀 Inicio Rápido

### 1. Obtén tu API Key
- Visita [RAWG.io](https://rawg.io/)
- Regístrate y obtén tu clave API gratuita

### 2. Configura la Aplicación
```bash
# Copia el archivo de ejemplo
cp .env.example .env.local

# Edita .env.local y añade tu API key
REACT_APP_RAWG_API_KEY=tu_clave_api_aqui
```

O edita directamente `src/services/gameService.js`:
```javascript
const API_KEY = 'tu_clave_api_aqui';
```

### 3. Instala y Ejecuta
```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
src/
├── components/                # Componentes reutilizables
│   ├── Header.js             # Barra de navegación
│   ├── Footer.js             # Pie de página
│   ├── GameCard.js           # Tarjeta de juego
│   ├── Carousel.js           # Carrusel de juegos
│   ├── SearchBar.js          # Buscador
│   ├── LoadingSpinner.js     # Indicador de carga
│   └── ErrorMessage.js       # Mensajes de error
│
├── pages/                     # Páginas principales
│   ├── HomePage.js           # Página de inicio
│   ├── GamesPage.js          # Galería de juegos
│   ├── GameDetailPage.js     # Detalle del juego
│   └── FavoritesPage.js      # Juegos favoritos
│
├── services/                  # Servicios API
│   └── gameService.js        # Funciones de API RAWG
│
├── App.js                     # Componente principal y rutas
├── index.js                   # Punto de entrada
└── index.css                  # Estilos globales
```

## 🎨 Diseño y Estilo

El proyecto utiliza **Tailwind CSS** con una paleta de colores personalizada:

- **Fondo Primario**: #1a1a2e (Azul oscuro)
- **Fondo Secundario**: #16213e (Azul más claro)
- **Acento**: #0f3460 (Azul profundo)
- **Destacado**: #e94560 (Rojo vibrante)

## 🛣️ Rutas Disponibles

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Página principal con juegos populares |
| `/games` | Games | Galería completa de juegos con búsqueda |
| `/game/:gameId` | Detail | Información detallada de un juego |
| `/favorites` | Favorites | Listado de juegos marcados como favoritos |

## 🔑 API RAWG

### Endpoints Utilizados

- `GET /games` - Listado de juegos con paginación y búsqueda
- `GET /games/{id}` - Información detallada de un juego
- `GET /games/{id}/screenshots` - Capturas de pantalla
- `GET /genres` - Lista de géneros disponibles

### Límites de Rate Limiting

La API RAWG tiene límites de velocidad. Consulta la [documentación oficial](https://rawg.io/apidocs) para más detalles.

## 💾 Almacenamiento de Favoritos

Los favoritos se guardan automáticamente en `localStorage` del navegador:

```javascript
localStorage.getItem('gameFavorites')  // Obtener favoritos
localStorage.setItem('gameFavorites', JSON.stringify(games))  // Guardar
```

**Nota**: Los datos se almacenan localmente y se pierden al limpiar la caché del navegador.

## 🔧 Scripts Disponibles

```bash
# Iniciar en modo desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar tests
npm test

# Eject (una sola vez, irreversible)
npm run eject
```

## 🎯 Funcionalidades Implementadas

### ✅ Completadas
- Página de inicio con carrusel de juegos populares
- Galería de juegos con búsqueda y paginación
- Página de detalle de juego con información completa
- Sistema de favoritos con persistencia
- Diseño responsivo y moderno
- Manejo de errores y estados de carga
- Integración completa con React Router

### 🚀 Futuras Mejoras
- [ ] Filtrado por géneros
- [ ] Ordenamiento por puntuación, fecha, etc.
- [ ] Autenticación de usuarios
- [ ] Sincronización de favoritos con servidor
- [ ] Sistema de reseñas y comentarios
- [ ] Filtrado por plataforma
- [ ] Tema claro/oscuro
- [ ] Multidioma

## 📱 Responsividad

La aplicación está optimizada para:
- **Móvil** (< 640px)
- **Tablet** (640px - 1024px)
- **Desktop** (> 1024px)

## 🐛 Resolución de Problemas

### "No se cargan los juegos"
- ✓ Verifica que tu API key sea válida
- ✓ Comprueba tu conexión a internet
- ✓ Revisa la consola del navegador (F12) para errores

### "Puerto 3000 ya está en uso"
```bash
PORT=3001 npm start  # Usar puerto alternativo
```

### "Tailwind CSS no funciona"
```bash
npm install              # Reinstalar dependencias
npm start                # Recompilar
```

## 📦 Dependencias Principales

- **react** (^19.2.4) - Framework UI
- **react-dom** (^19.2.4) - Renderizado del DOM
- **react-router-dom** (^7.13.0) - Enrutamiento
- **tailwindcss** (^4.1.18) - Framework de estilos
- **autoprefixer** (^10.4.23) - Prefijos CSS

## 📄 Licencia

Este proyecto es educativo y utiliza la API pública de RAWG bajo sus términos de servicio.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de:
- Reportar bugs
- Sugerir nuevas características
- Enviar pull requests

## 📞 Contacto y Soporte

Para más información sobre la API RAWG, visita: [RAWG.io](https://rawg.io/)

---

**¡Disfruta explorando el mundo de los videojuegos!** 🎮✨


### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
