import type { ArticleSummary } from '../../types/article';

function isArticleSummary(value: unknown): value is ArticleSummary {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.slug === 'string' &&
    typeof item.title === 'string' &&
    typeof item.section === 'object' &&
    item.section !== null &&
    typeof (item.section as Record<string, unknown>).slug === 'string'
  );
}

/**
 * El backend a veces devuelve relaciones embebidas (p.ej. `related`) sin
 * resolver correctamente (un AnonymousResourceCollection de Laravel sin
 * serializar en vez de un array de artículos). En vez de reventar la página
 * completa (SPEC §43/44: nunca mostrar errores técnicos), se filtra a los
 * elementos con la forma esperada y se descarta el resto en silencio.
 */
export function toArticleSummaryArray(value: unknown): ArticleSummary[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isArticleSummary);
}
