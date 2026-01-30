# 🎮 GameVerse - Guía de Instalación y Uso

Una aplicación web moderna para explorar videojuegos usando la API RAWG.

## 📋 Requisitos Previos

- Node.js 14+ instalado
- npm (incluido con Node.js)
- Una clave API gratuita de RAWG

## 🔑 Obtener la Clave API

1. Visita [RAWG.io](https://rawg.io/)
2. Regístrate o inicia sesión en tu cuenta
3. Ve a tu perfil y busca la sección de API
4. Copia tu clave API

## ⚙️ Configuración Inicial

### 1. Agregar tu API Key

Abre el archivo `src/services/gameService.js` y reemplaza:

```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```

Con tu clave API real:

```javascript
const API_KEY = 'tu_clave_api_aqui';
```

### 2. Instalar Dependencias (si no está hecho)

```bash
cd videojuegos
npm install
```

## 🚀 Ejecutar la Aplicación

```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.js
│   ├── Footer.js
│   ├── GameCard.js
│   ├── Carousel.js
│   ├── SearchBar.js
│   ├── LoadingSpinner.js
│   └── ErrorMessage.js
├── pages/              # Páginas principales
│   ├── HomePage.js
│   ├── GamesPage.js
│   ├── GameDetailPage.js
│   └── FavoritesPage.js
├── services/           # Servicios API
│   └── gameService.js
├── App.js             # Componente principal
├── index.js           # Punto de entrada
└── index.css          # Estilos globales
```

## ✨ Características

- ✅ **Página Principal** con carrusel de juegos populares
- ✅ **Búsqueda de Juegos** con paginación
- ✅ **Información Detallada** de cada juego
- ✅ **Sistema de Favoritos** (guardado en localStorage)
- ✅ **Diseño Responsivo** (móvil, tablet, desktop)
- ✅ **Interfaz Moderna** con Tailwind CSS

## 🎯 Funcionalidades Principales

### 1. Página de Inicio (HomePage)
- Muestra un carrusel con juegos populares
- Sección de características destacadas
- CTA para explorar todos los juegos

### 2. Galería de Juegos (GamesPage)
- Listado de todos los juegos disponibles
- Búsqueda en tiempo real
- Paginación de 20 juegos por página
- Botón para añadir/quitar favoritos

### 3. Detalle del Juego (GameDetailPage)
- Información completa del juego
- Capturas de pantalla
- Géneros, plataformas, desarrolladores
- Calificaciones y puntuaciones
- Sistema de favoritos

### 4. Favoritos (FavoritesPage)
- Vista de todos los juegos marcados como favoritos
- Los favoritos se guardan en localStorage
- Los datos persisten entre sesiones

## 🔧 Tecnologías Utilizadas

- **React 19.2.4** - Framework principal
- **React Router 7.13.0** - Sistema de rutas
- **Tailwind CSS 4.1.18** - Framework de estilos
- **Fetch API** - Conexión a la API RAWG

## 🎨 Personalización de Colores

Los colores están definidos en `tailwind.config.js`:

```javascript
colors: {
  primary: '#1a1a2e',      // Fondo oscuro
  secondary: '#16213e',    // Fondo secundario
  accent: '#0f3460',       // Color de acento
  highlight: '#e94560',    // Color destacado (rojo)
}
```

Puedes cambiar estos valores para personalizar el diseño.

## 🐛 Troubleshooting

### La API no devuelve datos
- Verifica que la clave API sea correcta
- Asegúrate de tener conexión a internet
- Consulta la [documentación de RAWG API](https://rawg.io/apidocs)

### Problemas con Tailwind CSS
- Ejecuta `npm install` nuevamente
- Limpia la carpeta `node_modules` y reinstala: `rm -rf node_modules && npm install`

### Puerto 3000 ocupado
- Cambia el puerto: `PORT=3001 npm start`

## 📦 Build para Producción

```bash
npm run build
```

Esto creará una carpeta `build/` lista para desplegar.

## 📝 Notas Importantes

- Los favoritos se guardan en el localStorage del navegador
- Sin conexión a internet, la API no funcionará
- La API RAWG tiene límites de rate limiting (respeta los límites)
- Las imágenes pueden tomar tiempo en cargar según tu conexión

## 🚀 Futuras Mejoras

- [ ] Sistema de usuarios con autenticación
- [ ] Guardar favoritos en base de datos
- [ ] Filtrado avanzado por géneros
- [ ] Reviews y comentarios de usuarios
- [ ] Listado de juegos por plataforma
- [ ] Modo oscuro/claro

## 📄 Licencia

Este proyecto es educativo y utiliza la API pública de RAWG.

---

¡Disfruta explorando videojuegos! 🎮
