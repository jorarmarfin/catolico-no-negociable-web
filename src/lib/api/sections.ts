import { apiFetch } from './client';
import type { ApiCollection, ApiResponse } from '../../types/api';
import type { ArticleSummary } from '../../types/article';
import type { Section } from '../../types/taxonomy';

const SECTIONS_CACHE_TTL_MS = 60_000;
let sectionsCache: { data: ApiResponse<Section[]>; expiresAt: number } | null = null;

/**
 * "todas las secciones activas" — lista completa, sin paginar. Se pide en cada
 * request para Header y Footer, así que se cachea un minuto en memoria del
 * proceso para no duplicar la llamada al backend en cada página (SPEC §45).
 */
export function listSections() {
  if (sectionsCache && sectionsCache.expiresAt > Date.now()) {
    return Promise.resolve(sectionsCache.data);
  }

  return apiFetch<ApiResponse<Section[]>>('/sections').then((data) => {
    sectionsCache = { data, expiresAt: Date.now() + SECTIONS_CACHE_TTL_MS };
    return data;
  });
}

export function listSectionArticles(slug: string, page = 1) {
  return apiFetch<ApiCollection<ArticleSummary>>(`/sections/${slug}/articles`, { page });
}
