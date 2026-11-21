# 🌍 Viajes Mundo — Agencia de Viajes (REST + GraphQL Mock)

> **Asignatura:** Desarrollo Frontend II (PFY2202)  
> **Evaluación:** Evaluación Sumativa — Semana 5 (*Integrando nuestro frontend con backend*)  
> **Institución:** Duoc UC  
> **Demo en Vivo (GitHub Pages):** [https://AbdulKSR20.github.io/agencia-viajes-frontend/](https://AbdulKSR20.github.io/agencia-viajes-frontend/)

---

## 📋 Descripción del Proyecto

Aplicación web frontend para una agencia de viajes desarrollada con **React 19**, **React Router**, **Apollo Client v4**, **Tailwind CSS v4** y **MSW (Mock Service Worker) v3**. Permite explorar destinos turísticos obtenidos desde una **API REST Mock** y consultar vuelos y hoteles detallados (fechas, precios, disponibilidad e imágenes) mediante una **API GraphQL Mock**.

---

## ✨ Funcionalidades e Integración Backend Mock

### 1. API REST Mock (`GET /api/destinos`)
- Implementada con **MSW** (`src/mocks/handler.js`) y consumida a través de `src/services/destinosApi.js`.
- Entrega el catálogo de destinos (`id`, `nombre`, `pais`, `descripcion`, `imagen`, `actividades`).
- Manejo completo de estados de carga (`EstadoCarga`), errores `404` / `500` y fallos de conectividad (`TypeError`), con `AbortController` en `useEffect`.

### 2. API GraphQL Mock (`POST /graphql`)
- Operación `ObtenerOpcionesDestino($destinoId: ID!, $simularError: String)` definida en `src/graphql/operaciones.js` e interceptada mediante `graphql.link(GRAPHQL_ENDPOINT)` de `msw/graphql`.
- Consumida en `DetalleDestino.jsx` con el hook `useQuery` de `@apollo/client/react`.
- Devuelve vuelos (aerolínea, origen, fechas, precio, disponibilidad) y hoteles (nombre, estrellas, precio por noche, disponibilidad e imagen).
- Incluye controles en interfaz para simular respuestas de error `404` y `500` (con diferenciación UX: el `404` no muestra botón *Reintentar*, mientras el `500` sí permite recuperación).

### 3. Navegación SPA y Despliegue Seguro en GitHub Pages
- Configurada con `HashRouter` (`react-router`) para evitar errores `404` al recargar rutas dinámicas como `/#/destino/1` en GitHub Pages.
- MSW permanece habilitado en producción (`gh-pages`) usando `import.meta.env.BASE_URL` para resolver `mockServiceWorker.js` y el `scope` del Service Worker, protegido con `try / catch` para evitar pantalla en blanco si un navegador restringe Service Workers.

---

## 📁 Estructura del Proyecto

```text
agencia-viajes/
├── public/
│   └── mockServiceWorker.js      # Service Worker de MSW v3
├── src/
│   ├── components/               # Componentes UI reutilizables
│   │   ├── AlertaError.jsx       # Banner accesible de errores (role="alert")
│   │   ├── DestinoCard.jsx       # Tarjeta de destino con actividades y enlace
│   │   ├── EstadoCarga.jsx       # Indicador visual de carga (role="status")
│   │   ├── Footer.jsx            # Pie de página centrado
│   │   ├── Header.jsx            # Barra de navegación con NavLink activo
│   │   ├── HotelCard.jsx         # Tarjeta de hotel con imagen, estrellas y precio
│   │   └── VueloCard.jsx         # Tarjeta de vuelo con fechas y disponibilidad
│   ├── data/
│   │   ├── destinos.json         # Catálogo base para la API REST
│   │   └── opcionesViaje.json    # Vuelos y hoteles para la API GraphQL
│   ├── graphql/
│   │   ├── client.js             # Configuración de ApolloClient v4 + InMemoryCache
│   │   ├── endpoint.js           # Endpoints dinámicos con import.meta.env.BASE_URL
│   │   └── operaciones.js        # Query GraphQL OBTENER_OPCIONES_DESTINO
│   ├── mocks/
│   │   ├── browser.js            # setupWorker(...handlers)
│   │   └── handler.js            # Handlers REST (http.get) + GraphQL (msw/graphql)
│   ├── pages/
│   │   ├── Destinos.jsx          # Listado de destinos (REST) + pruebas 404/500
│   │   ├── DetalleDestino.jsx    # Vuelos y hoteles por destino (GraphQL)
│   │   ├── Inicio.jsx            # Portada con destinos destacados
│   │   └── PaginaNoEncontrada.jsx# Vista 404 comodín (*)
│   ├── services/
│   │   └── destinosApi.js        # Cliente fetch REST con manejo de errores
│   ├── App.jsx                   # Estado global de destinos y enrutamiento
│   ├── index.css                 # Importación de Tailwind CSS v4
│   └── main.jsx                  # Inicialización asíncrona de MSW + ApolloProvider + HashRouter
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Instalación, Ejecución y Despliegue

```bash
# 1. Clonar el repositorio
git clone https://github.com/AbdulKSR20/agencia-viajes-frontend.git
cd agencia-viajes-frontend

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev

# 4. Compilar para producción
npm run build

# 5. Ejecutar análisis estático (linter)
npm run lint

# 6. Publicar en GitHub Pages
npm run deploy
```

---

## 🌐 Pruebas de Compatibilidad en Navegadores (Criterio 8)

Se verificó el funcionamiento completo de la aplicación (navegación SPA, carga REST, consulta GraphQL con Apollo Client + MSW, simulación de errores `404`/`500`, recarga en rutas dinámicas y diseño responsivo en escritorio y móvil) en los siguientes navegadores:

| Navegador | Motor | Carga REST (`/api/destinos`) | Consulta GraphQL (`vuelos` y `hoteles`) | Manejo de Errores (404/500) | Diseño Responsivo | Estado |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Brave** | Chromium | ✅ Correcta | ✅ Correcta (imágenes y precios visibles) | ✅ Alertas y recuperación OK | ✅ Móvil / Tablet / Desktop | ✅ Aprobado |
| **Mozilla Firefox** | Gecko | ✅ Correcta | ✅ Correcta (Service Worker MSW activo) | ✅ Alertas y recuperación OK | ✅ Móvil / Tablet / Desktop | ✅ Aprobado |
| **Microsoft Edge** | Chromium | ✅ Correcta | ✅ Correcta | ✅ Alertas y recuperación OK | ✅ Móvil / Tablet / Desktop | ✅ Aprobado |

---

## 📊 Matriz de Cumplimiento — Rúbrica Sumativa (100 Puntos)

| Criterio | Puntaje | Implementación | Estado |
| :--- | :---: | :--- | :---: |
| **1. Interfaz gráfica y diseño responsivo** | 15 pts | Diseño limpio con Tailwind CSS v4 adaptable a móvil, tablet y escritorio. | ✅ Completado |
| **2. API REST Mock** | 15 pts | `GET /api/destinos` en MSW + `destinosApi.js` con listado y manejo de errores. | ✅ Completado |
| **3. API GraphQL Mock** | 15 pts | `ObtenerOpcionesDestino` con Apollo Client v4 + `msw/graphql` para vuelos y hoteles. | ✅ Completado |
| **4. Navegación con React Router** | 10 pts | Rutas `/`, `/destinos`, `/destino/:id` y `*` con `HashRouter`. | ✅ Completado |
| **5. Modularidad y reutilización** | 10 pts | Componentes dedicados (`Header`, `Footer`, `DestinoCard`, `VueloCard`, `HotelCard`, `EstadoCarga`, `AlertaError`). | ✅ Completado |
| **6. Manejo de estado (`useState` / `useEffect`)** | 10 pts | Sincronización de carga/errores, `AbortController` y `useQuery`. | ✅ Completado |
| **7. Publicación en GitHub y `gh-pages`** | 10 pts | Repositorio organizado, `README.md` detallado y sitio operativo en GitHub Pages. | ✅ Completado |
| **8. Pruebas en distintos navegadores** | 15 pts | Compatibilidad validada y documentada en Brave, Firefox y Edge. | ✅ Completado |

---

## 👨‍💻 Autor

- **Abdul** — Desarrollo Frontend II (PFY2202), Duoc UC.
