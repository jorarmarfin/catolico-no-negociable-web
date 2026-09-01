import { ApiRequestError } from './client';

/**
 * Envuelve una llamada a la API para páginas que deben degradar a un estado
 * vacío en vez de romperse (SPEC §43/§44: nunca mostrar errores técnicos).
 * Un 404 se relanza para que la página decida devolver su propio 404.
 */
export async function safeFetch<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 404) {
      throw error;
    }

    console.error('[api] fallo al consultar el backend:', error);
    return null;
  }
}
