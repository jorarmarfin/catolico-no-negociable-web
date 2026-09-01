# Católico No Negociable

Frontend (Astro + React + Tailwind) de la Base de Conocimiento Católica. Renderiza en modo SSR consumiendo el backend Laravel — el contenido vive en la API y cambia sin necesidad de rebuild.

## Stack

- [Astro](https://astro.build) 7 (`output: 'server'`, adaptador `@astrojs/node` standalone)
- React 19 para islas interactivas
- Tailwind CSS 4
- Zustand para estado de cliente (menú, búsqueda)
- TypeScript

## Estructura del proyecto

```text
/
├── public/
├── src/
│   ├── assets/          # imágenes estáticas del sitio
│   ├── components/      # componentes Astro/React por dominio (article, home, search, ...)
│   ├── layouts/         # BaseLayout, ArticleLayout, LandingLayout
│   ├── lib/
│   │   ├── api/         # cliente de la API Laravel (server-only)
│   │   ├── seo/
│   │   └── utils/
│   ├── pages/            # rutas del sitio (incluye endpoints como sitemap.xml, robots.txt)
│   ├── store/            # stores de Zustand
│   ├── styles/           # global.css (Tailwind)
│   └── types/            # tipos compartidos de la API
└── package.json
```

## Requisitos

- Node >= 22.12.0
- Yarn (Corepack)

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores:

| Variable | Contexto | Descripción |
| :-- | :-- | :-- |
| `PUBLIC_API_URL` | cliente | Base URL de la API del backend Laravel |
| `PUBLIC_SITE_URL` | cliente | URL pública del sitio (usada por Astro y SEO) |
| `CATOLICO_API_TOKEN` | servidor (secreto) | Token de acceso a la API (ability `api:read`). Nunca debe usarse con prefijo `PUBLIC_*` ni importarse desde un componente `client:*` |

## Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando | Acción |
| :-- | :-- |
| `yarn install` | Instala las dependencias |
| `yarn dev` | Inicia el servidor de desarrollo en `localhost:4321` |
| `yarn build` | Compila el proyecto a `./dist/` |
| `yarn preview` | Sirve el build de producción localmente |
| `yarn astro check` | Chequeo de tipos de Astro |

Para desarrollo con el servidor en segundo plano:

```sh
astro dev --background
astro dev status
astro dev logs
astro dev stop
```

## Documentación

- [Astro Docs](https://docs.astro.build)
- [Rutas y páginas dinámicas](https://docs.astro.build/en/guides/routing/)
- [Componentes Astro](https://docs.astro.build/en/basics/astro-components/)
- [Componentes de framework (React)](https://docs.astro.build/en/guides/framework-components/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Estilos y Tailwind](https://docs.astro.build/en/guides/styling/)
- [Internacionalización](https://docs.astro.build/en/guides/internationalization/)
