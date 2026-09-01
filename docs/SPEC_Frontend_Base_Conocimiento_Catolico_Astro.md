# SPEC Frontend — Base de Conocimiento Católico

## 1. Objetivo

Construir el frontend público de una **Base de Conocimiento Católico** orientada a catequesis, apologética, doctrina, Biblia, liturgia, moral, historia de la Iglesia, Padres de la Iglesia, videos y recursos formativos.

El frontend será desarrollado con **Astro** y consumirá exclusivamente la API REST pública del backend Laravel definido previamente.

La plataforma debe priorizar:

- velocidad de carga;
- SEO;
- lectura cómoda;
- estructura temática clara;
- navegación sencilla;
- crecimiento progresivo del contenido;
- compatibilidad móvil;
- posibilidad de reutilizar el mismo backend en una futura app Flutter.

---

## 2. Stack tecnológico

### Framework principal

- Astro
- TypeScript

### Estilos

- Tailwind CSS

### Renderizado

Preferencia inicial:

- páginas públicas generadas con SSR o renderizado híbrido según convenga;
- páginas de contenido altamente cacheables;
- contenido dinámico obtenido desde la API Laravel.

### Infraestructura recomendada

Opciones:

- Cloudflare Pages;
- Vercel;
- servidor propio con Node.js;
- Docker + Nginx.

La selección final dependerá del esquema de despliegue elegido para el backend.

---

## 3. Principio de arquitectura

El frontend **no será la fuente de verdad del contenido**.

La fuente de contenido será:

```text
Laravel + Filament + PostgreSQL
            ↓
          API REST
            ↓
          Astro
            ↓
       Sitio público
```

Astro será únicamente responsable de:

- presentación;
- navegación;
- SEO;
- interacción;
- búsqueda pública;
- renderizado del contenido obtenido desde la API.

---

## 4. Dominios sugeridos

Ejemplo:

```text
fe.luisitomayta.com
```

Frontend Astro.

Backend:

```text
api.fe.luisitomayta.com
```

Panel privado:

```text
admin.fe.luisitomayta.com
```

---

## 5. Estructura general del sitio

```text
/
├── catequesis/
├── apologetica/
├── biblia/
├── doctrina/
├── liturgia/
├── moral/
├── historia/
├── padres-de-la-iglesia/
├── videos/
├── recursos/
├── temas/
├── series/
├── buscar/
└── acerca-de/
```

Esta estructura debe poder cambiar o ampliarse según las categorías configuradas en el backend.

---

## 6. Página de inicio

Ruta:

```text
/
```

Debe presentar la plataforma como una **biblioteca de formación católica**, no como un blog tradicional.

### Secciones sugeridas

1. Hero principal.
2. Buscador destacado.
3. Categorías principales.
4. Temas recomendados.
5. Últimos artículos.
6. Apologética destacada.
7. Videos recientes.
8. Series o colecciones.
9. Recursos recomendados.
10. CTA para explorar la biblioteca.

### Hero sugerido

Título conceptual:

> Aprende, comprende y profundiza tu fe.

Subtítulo:

> Catequesis, apologética, Biblia, doctrina y formación católica organizada para encontrar respuestas claras y confiables.

---

## 7. Navegación principal

El header debe incluir inicialmente:

```text
Inicio
Catequesis
Apologética
Biblia
Doctrina
Temas
Videos
Buscar
```

En móvil debe usarse navegación colapsable.

El menú no debe volverse demasiado grande aunque aumente el número de categorías.

Las categorías secundarias podrán mostrarse dentro de:

```text
Más
```

o en una página general:

```text
/explorar
```

---

## 8. Categorías

Cada categoría tendrá una landing propia.

Ejemplo:

```text
/apologetica
```

La página debe mostrar:

- nombre;
- descripción;
- imagen opcional;
- temas relacionados;
- artículos destacados;
- últimos artículos;
- filtros opcionales;
- paginación.

Ejemplo:

```text
Apologética

Defiende y comprende la fe católica mediante argumentos
bíblicos, históricos y doctrinales.
```

---

## 9. Temas

Los temas serán una entidad central de navegación.

Ejemplos:

```text
Eucaristía
María
Bautismo
Trinidad
Purgatorio
Confesión
Justificación
Iglesia
Papado
Sacramentos
```

Ruta:

```text
/temas/eucaristia
```

La landing temática debe poder agrupar contenido de distintas categorías.

Ejemplo:

```text
EUCARISTÍA

Catequesis
- ¿Qué es la Eucaristía?
- La misa paso a paso

Apologética
- ¿Es solo un símbolo?
- ¿Qué significa Juan 6?

Biblia
- Juan 6
- 1 Corintios 10
- 1 Corintios 11

Padres de la Iglesia
- Ignacio de Antioquía
- Justino Mártir

Videos
- La presencia real de Cristo
```

Esto convierte el sitio en una base de conocimiento y evita que funcione únicamente como una sucesión cronológica de artículos.

---

## 10. Página de artículo

Ruta sugerida:

```text
/{categoria}/{slug}
```

Ejemplo:

```text
/apologetica/por-que-los-catolicos-bautizan-ninos
```

### Elementos

- breadcrumb;
- categoría;
- título;
- resumen;
- autor;
- fecha de publicación;
- fecha de actualización;
- tiempo estimado de lectura;
- contenido;
- tabla de contenidos;
- fuentes;
- temas;
- etiquetas;
- artículos relacionados;
- navegación anterior/siguiente opcional;
- botones para compartir.

---

## 11. Diseño de lectura

El contenido debe tener ancho limitado para facilitar la lectura.

Recomendación aproximada:

```text
720px – 820px
```

para el cuerpo principal.

La tipografía debe priorizar legibilidad sobre efectos visuales.

Debe existir jerarquía clara para:

```text
H1
H2
H3
H4
blockquote
listas
tablas
citas bíblicas
referencias doctrinales
```

---

## 12. Componentes especiales de contenido

Crear componentes visuales reutilizables para contenido doctrinal.

### Cita bíblica

Ejemplo conceptual:

```text
Juan 6,51

«Yo soy el pan vivo bajado del cielo...»
```

### Catecismo

```text
Catecismo de la Iglesia Católica
CIC 1374
```

### Padre de la Iglesia

```text
San Ignacio de Antioquía
Carta a los Esmirniotas 7
```

### Documento del Magisterio

```text
Concilio de Trento
Sesión XIII
```

### Nota apologética

Caja destacada para responder objeciones frecuentes.

### Idea clave

Caja corta para destacar una enseñanza central.

---

## 13. Tabla de contenidos

Los artículos largos deben generar automáticamente una tabla de contenidos a partir de:

```text
H2
H3
```

En escritorio podrá mostrarse lateralmente.

En móvil:

```text
Contenido del artículo
[ desplegable ]
```

---

## 14. Breadcrumbs

Ejemplo:

```text
Inicio
>
Apologética
>
Bautismo
>
¿Por qué los católicos bautizan niños?
```

Los breadcrumbs son importantes tanto para navegación como para SEO.

---

## 15. Buscador

Ruta:

```text
/buscar
```

Input principal:

```text
¿Qué deseas aprender?
```

El frontend enviará consultas a la API Laravel.

Ejemplo:

```text
GET /api/v1/search?q=eucaristia
```

Los resultados deberán agruparse o identificarse por tipo:

```text
Artículos
Temas
Videos
Recursos
```

---

## 16. Autocompletado

Fase posterior.

Cuando el usuario escriba:

```text
euc
```

podrán aparecer:

```text
Eucaristía
Presencia real
Juan 6 y la Eucaristía
¿Qué es la transubstanciación?
```

Debe aplicarse debounce para evitar consultas innecesarias.

---

## 17. Página global de exploración

Ruta:

```text
/explorar
```

Permitirá descubrir contenido mediante:

- categorías;
- temas;
- series;
- nivel;
- tipo;
- contenido reciente.

---

## 18. Videos

Ruta:

```text
/videos
```

Los videos se administrarán desde Laravel/Filament.

No almacenar archivos de video en el proyecto Astro.

Preferencia:

- YouTube;
- Vimeo;
- otra plataforma externa configurable.

Cada video podrá tener:

- título;
- descripción;
- miniatura;
- plataforma;
- URL;
- duración;
- categoría;
- temas relacionados;
- fecha.

---

## 19. Página de video

Ruta:

```text
/videos/{slug}
```

Debe mostrar:

- reproductor;
- título;
- descripción;
- temas;
- recursos relacionados;
- artículos relacionados.

---

## 20. Series

Ejemplos:

```text
Los sacramentos
Introducción a la Biblia
Defendiendo la fe
Padres de la Iglesia
Las herejías cristológicas
```

Ruta:

```text
/series/{slug}
```

Debe mostrar contenido ordenado.

Ejemplo:

```text
Serie: Los Sacramentos

1. Introducción
2. Bautismo
3. Confirmación
4. Eucaristía
5. Reconciliación
6. Unción de los enfermos
7. Orden sacerdotal
8. Matrimonio
```

---

## 21. Recursos

Ruta:

```text
/recursos
```

Podrá contener:

- PDFs;
- fichas;
- guías;
- infografías;
- material de catequesis;
- enlaces externos.

Cada recurso debe incluir:

- título;
- descripción;
- tipo;
- archivo o URL;
- categoría;
- tema;
- imagen opcional.

---

## 22. Consumo de API

Crear una capa centralizada:

```text
src/lib/api/
```

Ejemplo:

```text
src/lib/api/
├── client.ts
├── articles.ts
├── categories.ts
├── topics.ts
├── series.ts
├── videos.ts
├── resources.ts
└── search.ts
```

Evitar consumir directamente `fetch()` desde decenas de componentes.

---

## 23. Cliente API

Ejemplo conceptual:

```ts
const API_URL = import.meta.env.PUBLIC_API_URL;

export async function apiFetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}
```

---

## 24. Variables de entorno

```env
PUBLIC_API_URL=https://api.fe.luisitomayta.com/api/v1
PUBLIC_SITE_URL=https://fe.luisitomayta.com
```

No escribir URLs directamente en componentes.

---

## 25. Tipado

Crear tipos TypeScript que reflejen los recursos de Laravel.

Ejemplo:

```ts
export interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    published_at: string;
    updated_at: string;
    category: Category;
    topics: Topic[];
    tags: Tag[];
}
```

---

## 26. Adaptadores

La respuesta de la API no debe acoplar completamente la interfaz visual.

Usar adaptadores cuando sea necesario.

Ejemplo:

```text
Laravel API
     ↓
ArticleDto
     ↓
ArticleModel
     ↓
Componentes Astro
```

Esto permitirá modificar campos del backend sin romper decenas de componentes.

---

## 27. Estructura del proyecto Astro

Propuesta:

```text
src/
├── components/
│   ├── article/
│   ├── category/
│   ├── topic/
│   ├── video/
│   ├── search/
│   ├── navigation/
│   ├── seo/
│   └── ui/
│
├── layouts/
│   ├── BaseLayout.astro
│   ├── ArticleLayout.astro
│   └── LandingLayout.astro
│
├── lib/
│   ├── api/
│   ├── utils/
│   └── seo/
│
├── pages/
│   ├── index.astro
│   ├── catequesis/
│   ├── apologetica/
│   ├── biblia/
│   ├── doctrina/
│   ├── temas/
│   ├── series/
│   ├── videos/
│   ├── recursos/
│   └── buscar/
│
├── styles/
│   └── global.css
│
└── types/
    ├── article.ts
    ├── category.ts
    ├── topic.ts
    └── api.ts
```

---

## 28. Componentes principales

### Navegación

```text
Header
MobileMenu
Footer
Breadcrumbs
```

### Contenido

```text
ArticleCard
ArticleList
ArticleGrid
ArticleHeader
ArticleBody
ArticleSources
RelatedArticles
TableOfContents
```

### Temas

```text
TopicCard
TopicGrid
TopicHeader
TopicSections
```

### Categorías

```text
CategoryCard
CategoryHero
CategoryArticles
```

### Videos

```text
VideoCard
VideoPlayer
VideoGrid
```

### UI

```text
Button
Badge
SearchInput
Pagination
EmptyState
Skeleton
Alert
```

---

## 29. SEO

SEO es una prioridad central.

Cada artículo debe generar:

```text
<title>
<meta name="description">
canonical
Open Graph
Twitter Card
```

Además:

```text
og:title
og:description
og:image
og:type
```

---

## 30. URLs amigables

Evitar:

```text
/article?id=754
```

Usar:

```text
/apologetica/presencia-real-de-cristo
```

---

## 31. Canonical URL

Todos los contenidos públicos deben incluir:

```html
<link rel="canonical" ...>
```

para evitar duplicaciones.

---

## 32. Sitemap

Generar automáticamente:

```text
/sitemap.xml
```

Debe incluir:

- artículos publicados;
- categorías;
- temas;
- series;
- videos;
- páginas institucionales.

---

## 33. Robots

Generar:

```text
/robots.txt
```

Permitir indexación del contenido público.

Excluir rutas técnicas si existiesen.

---

## 34. Datos estructurados

Usar JSON-LD.

### Artículos

```text
Article
```

o:

```text
BlogPosting
```

según corresponda.

### Breadcrumbs

```text
BreadcrumbList
```

### Videos

```text
VideoObject
```

### Organización

```text
Organization
```

---

## 35. Open Graph

Cada publicación debe tener una imagen social.

Fase inicial:

- imagen destacada.

Fase posterior:

- generación automática de imágenes OG.

Ruta posible:

```text
/og/{slug}.png
```

---

## 36. Rendimiento

Objetivo:

```text
Lighthouse Performance > 90
```

Prioridades:

- mínimo JavaScript;
- imágenes optimizadas;
- lazy loading;
- caching;
- CSS reducido;
- fuentes optimizadas.

---

## 37. Imágenes

Usar el sistema de imágenes de Astro cuando sea posible.

Formatos recomendados:

```text
AVIF
WebP
```

Mantener fallback cuando corresponda.

Cada imagen debe tener:

```text
alt
width
height
```

---

## 38. Diseño responsive

Breakpoints principales:

```text
mobile
tablet
desktop
wide
```

Debe diseñarse mobile-first.

---

## 39. Accesibilidad

Objetivo mínimo:

```text
WCAG 2.1 AA
```

Considerar:

- contraste;
- navegación por teclado;
- focus visible;
- labels;
- alt de imágenes;
- jerarquía correcta de encabezados;
- tamaño de texto legible.

---

## 40. Tema visual

La identidad debe transmitir:

- claridad;
- serenidad;
- confianza;
- formación;
- tradición sin parecer antigua;
- modernidad sin perder identidad católica.

Evitar diseño excesivamente ornamental.

La lectura debe ser protagonista.

---

## 41. Modo oscuro

No es requisito de V1.

Puede añadirse después mediante:

```text
data-theme
```

o estrategia equivalente.

---

## 42. Paginación

Las listas de artículos deben consumir paginación del backend.

Ejemplo:

```text
?page=2
```

No cargar todos los artículos de una categoría a la vez.

---

## 43. Estados vacíos

Ejemplo:

```text
Todavía no hay contenidos publicados sobre este tema.
```

No mostrar errores técnicos al usuario.

---

## 44. Manejo de errores

Crear:

```text
404
500
```

### 404

Texto sugerido:

```text
No encontramos este contenido.
```

Opciones:

- volver al inicio;
- buscar;
- explorar temas.

---

## 45. Cache

Los contenidos publicados cambian con poca frecuencia.

Aprovechar:

```text
CDN cache
HTTP cache
Astro cache
```

según la infraestructura seleccionada.

---

## 46. Revalidación

Cuando el backend publique o actualice un artículo, el frontend deberá reflejarlo sin necesitar un despliegue manual completo.

Opciones:

### Opción A

SSR.

### Opción B

ISR/revalidación.

### Opción C

Webhook del backend hacia el sistema de deploy.

La implementación concreta se decidirá según el hosting.

---

## 47. Analítica

V1 puede integrar una solución simple.

Opciones:

- Google Analytics;
- Plausible;
- Umami.

Eventos útiles:

```text
article_view
search
video_play
resource_download
share
```

---

## 48. Compartir contenido

Botones opcionales:

- WhatsApp;
- Facebook;
- X;
- copiar enlace.

WhatsApp debe tener prioridad por el contexto de uso esperado.

---

## 49. Newsletter

No requerida para V1.

Dejar espacio arquitectónico para añadir:

```text
/newsletter
```

o un formulario integrado más adelante.

---

## 50. Comentarios

No implementar comentarios en V1.

Evita:

- moderación;
- spam;
- cuentas;
- complejidad innecesaria.

---

## 51. Usuarios

No habrá login público en V1.

Todo el contenido será público.

El único login estará en el backend Filament.

---

## 52. Favoritos

No implementar en V1.

Puede añadirse cuando existan cuentas de usuario.

---

## 53. Progreso de aprendizaje

No implementar en V1.

Se reserva para una futura plataforma formativa.

---

## 54. API esperada

El frontend debe asumir endpoints similares a:

```text
GET /api/v1/articles
GET /api/v1/articles/{slug}

GET /api/v1/categories
GET /api/v1/categories/{slug}

GET /api/v1/topics
GET /api/v1/topics/{slug}

GET /api/v1/series
GET /api/v1/series/{slug}

GET /api/v1/videos
GET /api/v1/videos/{slug}

GET /api/v1/resources

GET /api/v1/search?q=
```

Los nombres finales deberán coincidir con el SPEC del backend.

---

## 55. Respuesta esperada de artículo

Ejemplo:

```json
{
  "data": {
    "id": 1,
    "title": "¿Por qué los católicos bautizan niños?",
    "slug": "por-que-los-catolicos-bautizan-ninos",
    "excerpt": "Una explicación bíblica e histórica...",
    "content": "<p>...</p>",
    "published_at": "2026-09-01T10:00:00-05:00",
    "updated_at": "2026-09-01T10:00:00-05:00",
    "category": {
      "name": "Apologética",
      "slug": "apologetica"
    },
    "topics": [],
    "tags": [],
    "sources": []
  }
}
```

---

## 56. Seguridad del frontend

El frontend no debe contener:

- credenciales Laravel;
- tokens privados;
- claves de administración;
- contraseñas;
- secretos de infraestructura.

La API pública de lectura no debería requerir credenciales del navegador.

---

## 57. CORS

Laravel debe permitir solicitudes desde:

```text
https://fe.luisitomayta.com
```

y dominios autorizados de desarrollo.

---

## 58. Desarrollo local

Frontend:

```text
http://localhost:4321
```

Backend:

```text
http://localhost:8000
```

Variable:

```env
PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## 59. Estrategia Git

Repositorio recomendado independiente:

```text
catholic-knowledge-frontend
```

o nombre equivalente.

Branches:

```text
main
develop
feature/*
fix/*
```

Para un proyecto personal puede simplificarse a:

```text
main
feature/*
```

---

## 60. Calidad de código

Usar:

- TypeScript estricto;
- ESLint;
- Prettier;
- componentes pequeños;
- nombres semánticos;
- funciones API reutilizables.

---

## 61. Testing

### V1

Pruebas mínimas:

- rutas principales;
- consumo API;
- página de artículo;
- búsqueda;
- 404;
- responsive.

### Futuro

- Playwright;
- Vitest.

---

## 62. Página Acerca de

Ruta:

```text
/acerca-de
```

Debe explicar:

- propósito de la plataforma;
- enfoque formativo;
- autor o responsable;
- naturaleza del contenido;
- criterios editoriales.

---

## 63. Aviso editorial

Debe existir un texto visible o página que explique que el contenido tiene finalidad:

- catequética;
- educativa;
- apologética.

Y que no sustituye el magisterio oficial ni el acompañamiento pastoral cuando corresponda.

---

## 64. Fuentes oficiales

Cuando el backend proporcione enlaces a documentos oficiales, el frontend debe distinguir visualmente fuentes como:

```text
Vatican.va
Catecismo
Biblia
Concilios
Documentos pontificios
```

---

## 65. V1 — Alcance obligatorio

La primera versión debe incluir:

- Home.
- Categorías.
- Temas.
- Listado de artículos.
- Página individual de artículo.
- Buscador.
- Videos.
- Series.
- Recursos.
- SEO.
- Sitemap.
- Robots.
- Responsive.
- Consumo API Laravel.
- Manejo de errores.
- Breadcrumbs.
- Artículos relacionados.

---

## 66. Fuera de alcance V1

No implementar todavía:

- usuarios públicos;
- comentarios;
- foros;
- cursos;
- progreso;
- favoritos;
- pagos;
- suscripciones;
- chat IA;
- RAG;
- gamificación;
- notificaciones push;
- panel editorial frontend;
- edición de contenido desde Astro.

---

## 67. Evolución futura

### V2

- mejor buscador;
- Meilisearch;
- filtros avanzados;
- newsletter;
- imágenes OG automáticas;
- contenido relacionado mejorado.

### V3

- app Flutter;
- favoritos;
- historial;
- lectura offline.

### V4

- asistente catequético con IA;
- RAG sobre contenido revisado;
- respuestas fundamentadas;
- referencias automáticas.

### V5

- rutas de aprendizaje;
- cursos;
- evaluaciones;
- progreso.

---

## 68. Arquitectura futura

```text
                  PostgreSQL
                      │
                 Laravel API
                  /    |    \
                 /     |     \
              Astro  Flutter   IA/RAG
               Web     App     Assistant
```

Una sola base de conocimiento alimentará todas las plataformas.

---

## 69. Principio de diseño

La plataforma debe sentirse como:

> una biblioteca católica digital organizada por conocimiento.

No como:

> un blog cronológico de publicaciones.

Por ello la navegación principal debe priorizar:

```text
categorías
temas
series
búsqueda
relaciones entre contenidos
```

antes que:

```text
fecha de publicación
```

---

## 70. Criterios de aceptación

La V1 se considerará lista cuando:

- Astro consume correctamente la API Laravel;
- todas las páginas principales son responsive;
- los artículos publicados pueden abrirse mediante slug;
- categorías y temas funcionan como páginas de navegación;
- el buscador devuelve resultados;
- artículos muestran fuentes y contenidos relacionados;
- existe sitemap;
- existe robots.txt;
- cada artículo tiene metadata SEO;
- las páginas tienen canonical;
- Lighthouse tiene métricas satisfactorias;
- no existen secretos expuestos;
- el sitio puede desplegarse independientemente del backend.

---

## 71. Resultado esperado

Al finalizar la V1 se debe disponer de:

```text
Backend:
Laravel + Filament + PostgreSQL

Frontend:
Astro + Tailwind + TypeScript

Contenido:
administrado únicamente desde Filament

Consumo:
API REST pública

Usuarios:
solo lectores anónimos

Administración:
un único administrador

Evolución:
Flutter + IA + RAG
```

La arquitectura debe permitir crecer progresivamente sin reconstruir el sistema desde cero.
