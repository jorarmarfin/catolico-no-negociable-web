import { apiFetch } from './client';
import type { ApiResponse } from '../../types/api';
import type { Series, SeriesSummary } from '../../types/series';

/** "todas las series activas" — lista completa, sin paginar. */
export function listSeries() {
  return apiFetch<ApiResponse<SeriesSummary[]>>('/series');
}

export function getSeriesBySlug(slug: string) {
  return apiFetch<ApiResponse<Series>>(`/series/${slug}`);
}
