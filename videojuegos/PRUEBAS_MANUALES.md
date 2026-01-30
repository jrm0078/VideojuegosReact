# ✅ Checklist de Pruebas Manuales - GameVerse

Este documento contiene un checklist para probar manualmente todas las funcionalidades de la aplicación.

## 🔧 Preparación

- [ ] Instalar todas las dependencias con `npm install`
- [ ] Crear archivo `.env.local` con tu API key
- [ ] Ejecutar `npm start` y esperar a que se compile
- [ ] Abrir [http://localhost:3000](http://localhost:3000) en el navegador

## 📄 Pruebas de Página de Inicio (HomePage)

### Header y Navegación
- [ ] El logo "GameVerse" está visible
- [ ] Los links de navegación son clicables:
  - [ ] "Inicio" lleva a la página de inicio
  - [ ] "Todos los juegos" lleva a la galería
  - [ ] "Favoritos" lleva a la página de favoritos
- [ ] El header tiene un border/línea separadora
- [ ] El header es sticky (se mantiene arriba al scroll)

### Sección Hero
- [ ] Título principal está visible
- [ ] Descripción es clara y legible
- [ ] Botón "Explorar Juegos" es clickeable y redirige a `/games`

### Sección de Características
- [ ] Se muestran 3 características (Búsqueda, Información, Favoritos)
- [ ] Cada característica tiene un emoji, título y descripción
- [ ] Los boxes tienen bordes y hover effect

### Carrusel de Juegos
- [ ] Se cargan y muestran juegos populares
- [ ] Las imágenes de los juegos se cargan correctamente
- [ ] Se puede navegar con los botones ← y →
- [ ] Las puntuaciones se muestran en amarillo
- [ ] Los botones de favoritos funcionan
- [ ] Los géneros se muestran como tags

### CTA (Call To Action)
- [ ] Botón "Ir a Galería Completa" funciona
- [ ] Lleva a la página de juegos

### Footer
- [ ] Se muestra el pie de página
- [ ] Contiene información sobre GameVerse
- [ ] Los links funcionan
- [ ] Se muestra el año actual
- [ ] El crédito a RAWG API está visible

## 🎮 Pruebas de Página de Juegos (GamesPage)

### Carga Inicial
- [ ] La página carga juegos automáticamente
- [ ] Se muestran 20 juegos por defecto
- [ ] El spinner de carga se muestra momentáneamente
- [ ] El contador total de juegos es exacto

### SearchBar
- [ ] El buscador es funcional
- [ ] Se puede escribir en el campo de búsqueda
- [ ] Al hacer click en "Buscar", se filtra correctamente
- [ ] Los resultados de búsqueda se actualizan
- [ ] El contador total se actualiza

### Grid de Juegos
- [ ] Los juegos se muestran en una grilla
- [ ] Cada tarjeta muestra:
  - [ ] Imagen de fondo del juego
  - [ ] Nombre del juego
  - [ ] Puntuación (en amarillo)
  - [ ] Géneros (hasta 2)
  - [ ] Plataformas (hasta 2)
  - [ ] Botón de favoritos
- [ ] Las tarjetas tienen efecto hover (scale)

### Paginación
- [ ] Se muestran botones "Anterior" y "Siguiente"
- [ ] El botón "Anterior" está deshabilitado en la primera página
- [ ] El botón "Siguiente" está deshabilitado en la última página
- [ ] Al hacer click, cambia de página correctamente
- [ ] El contador de página se actualiza

### Responsividad
- [ ] En móvil (< 640px): 1 columna
- [ ] En tablet (640-1024px): 2 columnas
- [ ] En desktop (> 1024px): 3-4 columnas
- [ ] Las tarjetas se adaptan correctamente

## 🎯 Pruebas de Página de Detalle (GameDetailPage)

### Navegación
- [ ] Se puede hacer click en una tarjeta para ir al detalle
- [ ] El URL contiene el ID del juego (`/game/:id`)
- [ ] El botón "Volver a juegos" funciona y regresa a `/games`

### Información General
- [ ] Se muestra el nombre del juego prominentemente
- [ ] La imagen principal es correcta
- [ ] La puntuación se muestra con estrellas
- [ ] El número de valoraciones es exacto

### Botón de Favoritos
- [ ] Inicialmente muestra "🤍 Añadir a favoritos"
- [ ] Al hacer click, cambia a "❤️ Quitar de favoritos"
- [ ] El color cambia de accent a highlight
- [ ] El estado se mantiene al recargar

### Información Detallada
- [ ] Se muestran todos los géneros disponibles
- [ ] Se muestran todas las plataformas
- [ ] Se muestra la fecha de lanzamiento formateada
- [ ] Se muestran los desarrolladores
- [ ] Se muestran los publicadores
- [ ] Se muestra el tiempo de juego (si disponible)

### Capturas de Pantalla
- [ ] Se muestran miniaturas de capturas (hasta 4)
- [ ] Se puede hacer click para cambiar a una captura
- [ ] La imagen principal se actualiza
- [ ] La minatura activa tiene un borde destacado

### Descripción
- [ ] Se muestra la descripción completa del juego
- [ ] El texto es legible y bien formateado

### Información Adicional
- [ ] Se muestra la puntuación de Metacritic (si disponible)
- [ ] Se muestra si está "Por anunciar"
- [ ] Se muestra la fecha de última actualización

## ❤️ Pruebas de Página de Favoritos (FavoritesPage)

### Sin Favoritos
- [ ] Si no hay favoritos, se muestra un mensaje amigable
- [ ] Hay un botón "Explorar Juegos" que redirige a `/games`
- [ ] Se muestra el emoji del juego

### Con Favoritos
- [ ] Se muestran todos los juegos marcados como favoritos
- [ ] El contador de favoritos es exacto
- [ ] Las tarjetas tienen el botón rojo de "Favorito"
- [ ] Se pueden quitar favoritos desde aquí

### Persistencia
- [ ] Los favoritos se guardan en localStorage
- [ ] Tras recargar la página, los favoritos persisten
- [ ] Tras cerrar y reabrir el navegador, los favoritos se mantienen

## 🎨 Pruebas de Diseño y UX

### Colores
- [ ] El fondo es azul oscuro (#0a0e27)
- [ ] Los textos son blancos y legibles
- [ ] El color de acento (azul #0f3460) se ve bien
- [ ] El color highlight (rojo #e94560) destaca apropiadamente

### Fuentes
- [ ] Las fuentes son legibles
- [ ] Los tamaños son proporcionales
- [ ] Los títulos destacan del contenido

### Espaciado
- [ ] El padding y margin son consistentes
- [ ] Los elementos no están apretados
- [ ] El contenedor tiene un max-width apropiado

### Animaciones
- [ ] Las transiciones son suaves (no abruptas)
- [ ] Los hovers funcionan en elementos interactivos
- [ ] El spinner de carga rota suavemente

## 🔍 Pruebas de Funcionalidad API

### Conexión a API
- [ ] Los juegos se cargan de la API RAWG
- [ ] Los errores de API se manejan correctamente
- [ ] Se muestra un mensaje de error si la API falla
- [ ] El mensaje de error es amigable

### Búsqueda
- [ ] La búsqueda retorna resultados relevantes
- [ ] La búsqueda es case-insensitive
- [ ] Las búsquedas vacías retornan todos los juegos
- [ ] Si no hay resultados, se muestra un mensaje

### Carga de Imágenes
- [ ] Las imágenes de juegos se cargan correctamente
- [ ] Si una imagen falla, se muestra un placeholder
- [ ] Las imágenes no se distorsionan

## 📱 Pruebas Responsivas

### Móvil (iPhone SE - 375x667)
- [ ] Los layouts se adaptan correctamente
- [ ] El header no es demasiado grande
- [ ] El carrusel muestra 1 elemento
- [ ] La grid de juegos muestra 1 columna
- [ ] Los botones son fácilmente clickeables
- [ ] El scroll es suave

### Tablet (iPad - 768x1024)
- [ ] El layout se adapta a 2 columnas
- [ ] El carrusel muestra 2 elementos
- [ ] El contenido es legible sin zoom

### Desktop (1920x1080)
- [ ] El layout se adapta a 3-4 columnas
- [ ] El carrusel muestra 3-4 elementos
- [ ] Los elementos se distribuyen correctamente

## ⚡ Pruebas de Rendimiento

### Velocidad de Carga
- [ ] La página inicial carga en menos de 3 segundos
- [ ] La búsqueda retorna resultados rápidamente
- [ ] Los cambios de página son suave

### Memoria
- [ ] La aplicación no consume excesiva memoria
- [ ] No hay memory leaks (puedes usar DevTools)
- [ ] La paginación no acumula memoria

## 🐛 Pruebas de Edge Cases

### Búsqueda Especial
- [ ] Búsqueda con caracteres especiales
- [ ] Búsqueda con acentos (ñ, á, etc.)
- [ ] Búsqueda con números
- [ ] Búsqueda con espacios múltiples

### Navegación
- [ ] Usar botón atrás del navegador
- [ ] Entrar directamente a una URL específica
- [ ] Entrar a un juego que no existe
- [ ] Cambiar rápidamente entre páginas

### Errores
- [ ] Desconectar internet y cargar página
- [ ] Recargar página con F5 / Ctrl+R
- [ ] Limpiar localStorage y recargar

## 🔐 Pruebas de Seguridad Básicas

- [ ] No hay credenciales visibles en el código
- [ ] La API key está en variables de entorno
- [ ] No hay console.log() de datos sensibles
- [ ] No hay XSS vulnerabilities (validación de entrada)

## 📊 Checklist Final

- [ ] Todas las rutas funcionan correctamente
- [ ] La aplicación es completamente responsiva
- [ ] No hay errores en la consola (F12)
- [ ] Los favoritos persisten correctamente
- [ ] El diseño es atractivo y moderno
- [ ] La experiencia de usuario es fluida
- [ ] Los textos son claros y sin faltas
- [ ] Los botones son clickeables y responden bien
- [ ] Las imágenes se cargan correctamente
- [ ] La búsqueda funciona como se espera

## 🎉 Notas Finales

Si todos los items están checked:
✅ ¡Tu aplicación GameVerse está lista para producción!

Si hay items unchecked:
🔧 Revisa esos items y corrige los problemas encontrados

---

**Gracias por probar GameVerse a fondo** 🎮
