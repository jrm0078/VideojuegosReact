# 🚀 Guía de Despliegue - GameVerse

Esta guía te ayudará a desplegar la aplicación GameVerse en producción.

## 📋 Tabla de Contenidos

1. [Construir para Producción](#construir-para-producción)
2. [Desplegar en Vercel](#desplegar-en-vercel)
3. [Desplegar en Netlify](#desplegar-en-netlify)
4. [Desplegar en GitHub Pages](#desplegar-en-github-pages)
5. [Desplegar con Docker](#desplegar-con-docker)

## Construir para Producción

Primero, construye la aplicación optimizada:

```bash
npm run build
```

Esto creará una carpeta `build/` con los archivos listos para producción.

## 🌐 Desplegar en Vercel

La forma más fácil de desplegar un proyecto React.

### Opción 1: Con la CLI de Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel
```

### Opción 2: Con GitHub

1. Sube tu proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Vercel se encargará del resto automáticamente

### Variables de Entorno en Vercel

1. En el dashboard de Vercel, ve a Project Settings
2. Ve a Environment Variables
3. Añade: `REACT_APP_RAWG_API_KEY` = tu clave API

## 🎨 Desplegar en Netlify

Otra opción popular y muy sencilla.

### Opción 1: Con Git

1. Sube tu proyecto a GitHub
2. Ve a [netlify.com](https://netlify.com)
3. Conecta tu repositorio GitHub
4. Netlify detectará automáticamente que es un proyecto React
5. Configure las variables de entorno

### Opción 2: Drag & Drop

```bash
# Construir la aplicación
npm run build

# Arrastrar la carpeta 'build/' a https://app.netlify.com/drop
```

### Variables de Entorno en Netlify

1. Ve a Site settings > Build & deploy > Environment
2. Añade una nueva variable:
   - Key: `REACT_APP_RAWG_API_KEY`
   - Value: tu clave API

## 📄 Desplegar en GitHub Pages

Si deseas desplegar en GitHub Pages:

### 1. Actualiza package.json

Añade al package.json:

```json
{
  "homepage": "https://tu-usuario.github.io/videojuegos-react"
}
```

### 2. Instala gh-pages

```bash
npm install --save-dev gh-pages
```

### 3. Añade scripts en package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### 4. Despliega

```bash
npm run deploy
```

## 🐳 Desplegar con Docker

Crea un archivo `Dockerfile`:

```dockerfile
# Etapa 1: Construir
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG REACT_APP_RAWG_API_KEY
ENV REACT_APP_RAWG_API_KEY=$REACT_APP_RAWG_API_KEY

RUN npm run build

# Etapa 2: Servir
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Crea `nginx.conf`:

```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
  }
}
```

Construye e ejecuta:

```bash
docker build -t gameverse --build-arg REACT_APP_RAWG_API_KEY=tu_clave_api .
docker run -p 80:80 gameverse
```

## 🔐 Consideraciones de Seguridad

⚠️ **IMPORTANTE**: Las variables de entorno con prefijo `REACT_APP_` se incluyen en el bundle. Trata tu API key como cualquier otra credencial pública.

### Mejores Prácticas

1. **Usa un proxy backend** si necesitas mantener la API key secreta
2. **Limita el acceso de tu API key** en RAWG
3. **Monitorea el uso** de tu API key
4. **Rota las claves** regularmente

### Ejemplo de Proxy Backend (Node.js)

```javascript
// server.js
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const API_KEY = process.env.RAWG_API_KEY;

app.get('/api/games', async (req, res) => {
  const { search, page } = req.query;
  const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${search}&page=${page}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Proxy listening on port 3001'));
```

## ✅ Checklist Antes de Desplegar

- [ ] API key configurada correctamente
- [ ] Ejecutaste `npm run build` exitosamente
- [ ] No hay errores en la consola
- [ ] Probaste la aplicación en modo producción localmente
- [ ] Todos los enlaces de rutas funcionan
- [ ] Los favoritos se guardan correctamente
- [ ] Las imágenes se cargan sin problemas
- [ ] La aplicación es responsiva en móvil/tablet

## 🔍 Monitoreo Post-Despliegue

Después de desplegar:

1. Verifica que el sitio está funcionando
2. Abre DevTools y revisa los errores
3. Prueba la búsqueda de juegos
4. Verifica el sistema de favoritos
5. Comprueba el rendimiento con Lighthouse

## 📊 Métricas de Rendimiento

Optimizaciones incluidas:

- ✅ Code splitting con React Router
- ✅ Lazy loading de imágenes
- ✅ Minificación automática
- ✅ CSS purging con Tailwind

## 🆘 Troubleshooting

### El sitio dice "Not Found"

- En Vercel/Netlify, asegúrate de redirigir todas las rutas a `index.html`
- En GitHub Pages, verifica que `homepage` en package.json es correcto

### Las imágenes no cargan

- RAWG permite hotlinking, pero verifica CORS
- Considera usar `https://` en lugar de `http://`

### La API no funciona en producción

- Verifica que la variable de entorno está configurada
- Comprueba los límites de rate limiting de RAWG
- Revisa la consola del navegador para errores

## 📚 Referencias

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [RAWG API Docs](https://rawg.io/apidocs)

---

¡Tu aplicación está lista para el mundo! 🌍🎮
