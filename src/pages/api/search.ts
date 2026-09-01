import type { APIRoute } from 'astro';
import { search } from '../../lib/api/search';
import { ApiRequestError } from '../../lib/api/client';

/**
 * Proxy server-side hacia GET /search del backend. Necesario porque el
 * buscador en vivo corre en el navegador (isla React) y el backend ahora
 * exige el token de servicio (CATOLICO_API_TOKEN) — un secreto que nunca
 * debe llegar al bundle del cliente. El navegador solo habla con esta ruta,
 * que sí corre en el servidor y adjunta el token.
 */
export const GET: APIRoute = async ({ url }) => {
  const q = url.searchParams.get('q') ?? '';
  const page = Number(url.searchParams.get('page') ?? '1');

  try {
    const results = await search(q, page);
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const status = error instanceof ApiRequestError ? error.status : 500;
    return new Response(JSON.stringify({ message: 'No se pudo completar la búsqueda.' }), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
