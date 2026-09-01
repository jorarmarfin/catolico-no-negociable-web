import { apiFetch } from './client';
import type { ApiCollection } from '../../types/api';
import type { ArticleSummary } from '../../types/article';

/**
 * Busca en title/excerpt/content de artículos publicados. El backend exige
 * `q` con mínimo 2 caracteres y aplica throttle:search (30/min) además del
 * throttle:api general — validar el mínimo también en el cliente evita
 * peticiones que sabemos que van a fallar.
 */
export function search(query: string, page = 1) {
  return apiFetch<ApiCollection<ArticleSummary>>('/search', { q: query, page });
}
