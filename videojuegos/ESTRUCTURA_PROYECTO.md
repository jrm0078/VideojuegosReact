# 📂 Estructura de Archivos - GameVerse

## Estructura del Proyecto (Sin node_modules)

```
videojuegos/
│
├── 📁 public/                          # Archivos públicos
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
├── 📁 src/                             # Código fuente
│   │
│   ├── 🎨 components/                  # Componentes reutilizables (7 archivos)
│   │   ├── Header.js                  # Barra de navegación
│   │   ├── Footer.js                  # Pie de página
│   │   ├── GameCard.js                # Tarjeta de juego
│   │   ├── Carousel.js                # Carrusel de juegos
│   │   ├── SearchBar.js               # Buscador
│   │   ├── LoadingSpinner.js          # Indicador de carga
│   │   └── ErrorMessage.js            # Mensajes de error
│   │
│   ├── 📄 pages/                       # Páginas principales (4 archivos)
│   │   ├── HomePage.js                # Página de inicio
│   │   ├── GamesPage.js               # Galería de juegos
│   │   ├── GameDetailPage.js          # Detalle del juego
│   │   └── FavoritesPage.js           # Página de favoritos
│   │
│   ├── 🔧 services/                    # Servicios (1 archivo)
│   │   └── gameService.js             # Conexión con API RAWG
│   │
│   ├── App.js                         # Componente principal con rutas
│   ├── App.css                        # Estilos de la app (vacío, Tailwind maneja)
│   ├── App.test.js                    # Tests de la app
│   ├── index.js                       # Punto de entrada
│   ├── index.css                      # Estilos globales + Tailwind
│   ├── reportWebVitals.js            # Metrics de rendimiento
│   └── setupTests.js                 # Configuración de tests
│
├── 📦 node_modules/                    # Dependencias instaladas
│
├── 🔧 Configuración
│   ├── package.json                   # Dependencias y scripts
│   ├── package-lock.json             # Lock de versiones
│   ├── tailwind.config.js            # Configuración de Tailwind CSS
│   ├── postcss.config.js             # Configuración de PostCSS
│   ├── .env.example                  # Ejemplo de variables de entorno
│   ├── .env.local.example            # Ejemplo completo de .env
│   ├── .gitignore                    # Archivos ignorados por Git
│   └── README.md                     # Documentación principal
│
├── 📚 Documentación
│   ├── GUIA_INSTALACION.md           # Cómo instalar y configurar
│   ├── GUIA_DESPLIEGUE.md            # Cómo desplegar en producción
│   ├── MEJORAS_FUTURAS.md            # Sugerencias de mejora
│   ├── PRUEBAS_MANUALES.md           # Checklist de pruebas
│   └── RESUMEN_PROYECTO.md           # Este archivo
│
└── 📊 Otros
    ├── ESTRUCTURA_ARCHIVOS.txt        # (Este archivo actual)
    └── public/index.html              # Archivo HTML principal
```

## Descripción de Archivos Principales

### Componentes (src/components/)

| Archivo | Líneas | Descripción |
|---------|--------|-------------|
| **Header.js** | ~35 | Barra de navegación con logo y links |
| **Footer.js** | ~40 | Pie de página con información |
| **GameCard.js** | ~50 | Tarjeta visual de un juego |
| **Carousel.js** | ~65 | Carrusel responsivo de juegos |
| **SearchBar.js** | ~25 | Formulario de búsqueda |
| **LoadingSpinner.js** | ~20 | Animación de carga |
| **ErrorMessage.js** | ~10 | Mostrador de errores |

**Total: ~245 líneas**

### Páginas (src/pages/)

| Archivo | Líneas | Descripción |
|---------|--------|-------------|
| **HomePage.js** | ~130 | Página inicial con hero y carrusel |
| **GamesPage.js** | ~110 | Galería con búsqueda y paginación |
| **GameDetailPage.js** | ~250 | Información detallada del juego |
| **FavoritesPage.js** | ~65 | Lista de favoritos |

**Total: ~555 líneas**

### Servicios (src/services/)

| Archivo | Líneas | Descripción |
|---------|--------|-------------|
| **gameService.js** | ~80 | Funciones para llamar la API RAWG |

**Total: ~80 líneas**

### Configuración

| Archivo | Tamaño | Descripción |
|---------|--------|-------------|
| **App.js** | ~60 líneas | Router y gestión de favoritos |
| **index.js** | ~10 líneas | Punto de entrada |
| **index.css** | ~50 líneas | Estilos globales |
| **tailwind.config.js** | ~20 líneas | Config de Tailwind |
| **postcss.config.js** | ~6 líneas | Config de PostCSS |
| **package.json** | ~40 líneas | Dependencias |

**Total: ~186 líneas**

## Estadísticas del Proyecto

| Métrica | Cantidad |
|---------|----------|
| **Archivos de código** | 19 |
| **Componentes React** | 7 |
| **Páginas** | 4 |
| **Servicios** | 1 |
| **Documentos MD** | 5 |
| **Líneas de código (aprox)** | 2,500+ |
| **Dependencias principales** | 5 |
| **Dependencias dev** | 3 |

## Dependencias Principales

```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router-dom": "^7.13.0",
  "tailwindcss": "^4.1.18",
  "autoprefixer": "^10.4.23",
  "postcss": "^8.5.6"
}
```

## Archivos de Configuración Incluidos

### 🔐 .env

```env
REACT_APP_RAWG_API_KEY=YOUR_API_KEY_HERE
```

### 📋 tailwind.config.js

- Colores personalizados (primary, secondary, accent, highlight)
- Fuentes personalizadas
- Extensiones de tema

### 🎨 index.css

- Directivas de Tailwind (@tailwind)
- Reset de estilos
- Scroll suave
- Scrollbar personalizado

### 📦 package.json Scripts

```bash
npm start      # Inicia servidor de desarrollo
npm build      # Construye para producción
npm test       # Ejecuta tests
npm eject      # Configurable (no reversible)
```

## Tamaño Estimado del Proyecto

- **Código fuente**: ~150 KB
- **node_modules**: ~800 MB (solo en desarrollo)
- **Build de producción**: ~200 KB (minificado + gzip)

## Compilación y Despliegue

### Desarrollo
```bash
npm start
→ http://localhost:3000
```

### Producción
```bash
npm run build
→ Carpeta build/ lista para desplegar
```

## Estructura de Rutas

```
/                     → HomePage
/games                → GamesPage
/game/:gameId         → GameDetailPage
/favorites            → FavoritesPage
```

## Flujo de Datos

```
App.js (estado global)
  ├── localStorage (persistencia)
  │
  ├── Header
  ├── [Router + Pages]
  │   ├── HomePage
  │   ├── GamesPage
  │   ├── GameDetailPage
  │   └── FavoritesPage
  │
  └── Footer
```

## Componentes por Página

### HomePage
- Header
- Hero Section
- Características
- Carousel (usa GameCard)
- CTA
- Footer

### GamesPage
- Header
- SearchBar
- Grid de GameCards
- Paginación
- Footer

### GameDetailPage
- Header
- Galería de imágenes
- Información detallada
- Footer

### FavoritesPage
- Header
- Grid de GameCards (favoritos)
- Mensaje si vacío
- Footer

## API Endpoints Usados

```
GET /games                          → Lista de juegos
GET /games?search=query             → Búsqueda
GET /games/{id}                     → Detalle de juego
GET /games/{id}/screenshots         → Capturas
GET /genres                         → Géneros
GET /games?genres={id}              → Juegos por género
```

## Características por Página

| Característica | HomePage | GamesPage | DetailPage | FavoritesPage |
|---|---|---|---|---|
| Carrusel | ✅ | ❌ | ❌ | ❌ |
| Búsqueda | ❌ | ✅ | ❌ | ❌ |
| Paginación | ❌ | ✅ | ❌ | ❌ |
| Favoritos | ✅ | ✅ | ✅ | ✅ |
| Detalle | ❌ | ❌ | ✅ | ❌ |
| Capturas | ❌ | ❌ | ✅ | ❌ |

---

**Última actualización**: Enero 2026
**Versión**: 1.0.0
**Estado**: ✅ Completo
