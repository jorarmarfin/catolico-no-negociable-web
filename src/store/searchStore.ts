import { create } from 'zustand';
import type { ApiCollection } from '../types/api';
import type { ArticleSummary } from '../types/article';

/**
 * Este store corre en el navegador (isla React), así que NO puede importar
 * src/lib/api/* directamente: ese cliente adjunta el token server-only que
 * exige el backend. En vez de eso, llama al proxy propio de Astro
 * (src/pages/api/search.ts), que sí corre en el servidor.
 */
async function searchViaProxy(query: string, page: number): Promise<ApiCollection<ArticleSummary>> {
  const url = new URL('/api/search', window.location.origin);
  url.searchParams.set('q', query);
  url.searchParams.set('page', String(page));

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Búsqueda falló: ${response.status}`);
  }

  return response.json();
}

type Status = 'idle' | 'too_short' | 'loading' | 'success' | 'error';

const MIN_QUERY_LENGTH = 2;

interface SearchState {
  query: string;
  status: Status;
  results: ApiCollection<ArticleSummary> | null;
  errorMessage: string | null;
  setQuery: (query: string) => void;
  runSearch: (query: string) => Promise<void>;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  status: 'idle',
  results: null,
  errorMessage: null,

  setQuery: (query) => set({ query }),

  runSearch: async (query) => {
    const trimmed = query.trim();

    if (!trimmed) {
      set({ query, status: 'idle', results: null, errorMessage: null });
      return;
    }

    if (trimmed.length < MIN_QUERY_LENGTH) {
      set({ query, status: 'too_short', results: null, errorMessage: null });
      return;
    }

    set({ query, status: 'loading', errorMessage: null });

    try {
      const results = await searchViaProxy(trimmed, 1);
      set({ status: 'success', results });
    } catch {
      set({
        status: 'error',
        results: null,
        errorMessage: 'No pudimos completar la búsqueda. Intenta de nuevo en unos minutos.'
      });
    }
  },

  reset: () => set({ query: '', status: 'idle', results: null, errorMessage: null })
}));
