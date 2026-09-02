import type { APIRoute } from 'astro';
import { likeArticle } from '../../../../lib/api/articles';
import { ApiRequestError } from '../../../../lib/api/client';

/**
 * Proxy server-side hacia POST /articles/{slug}/like. El botón de "me gusta"
 * corre en el navegador (isla React) y el backend exige el token de servicio
 * (CATOLICO_API_TOKEN), que nunca debe llegar al bundle del cliente.
 */
export const POST: APIRoute = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response(JSON.stringify({ message: 'Falta el slug del artículo.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const data = await likeArticle(slug);
    return new Response(JSON.stringify({ data }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const status = error instanceof ApiRequestError ? error.status : 500;
    return new Response(JSON.stringify({ message: 'No se pudo registrar el like.' }), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
