import { PUBLIC_API_URL } from 'astro:env/client';
import { CATOLICO_API_TOKEN } from 'astro:env/server';
import type { ApiErrorBody } from '../../types/api';

export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

export type ApiQueryParams = Record<string, string | number | boolean | undefined>;

function buildUrl(endpoint: string, params?: ApiQueryParams): string {
  const url = new URL(`${PUBLIC_API_URL}${endpoint}`);

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

/**
 * Punto único de acceso a la API Laravel. Todo el código de páginas/componentes
 * debe pasar por aquí (o por los módulos de src/lib/api/*) en vez de usar fetch()
 * directamente (SPEC §22).
 *
 * Este módulo SOLO debe importarse desde frontmatter .astro (server) o desde
 * endpoints en src/pages/api/*.ts — nunca desde un componente `client:*`. Usa
 * el token de servicio (`CATOLICO_API_TOKEN`, secreto server-only) que ahora
 * exige el backend en todos los endpoints de /api/v1; si algún día un
 * componente cliente necesita datos en vivo, debe pedirlos a un endpoint
 * propio de Astro que llame a este cliente, nunca al backend directamente.
 */
export async function apiFetch<T>(
  endpoint: string,
  params?: ApiQueryParams,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(buildUrl(endpoint, params), {
    ...init,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${CATOLICO_API_TOKEN}`,
      ...init?.headers
    }
  });

  if (!response.ok) {
    let message = `Error de API: ${response.status}`;

    try {
      const body = (await response.json()) as ApiErrorBody;
      message = body.message ?? message;
    } catch {
      // el cuerpo no era JSON; se mantiene el mensaje genérico.
    }

    throw new ApiRequestError(response.status, message);
  }

  return (await response.json()) as T;
}
