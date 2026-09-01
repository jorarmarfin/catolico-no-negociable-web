/** Envoltorio genérico de respuesta de la API Laravel (recurso único). */
export interface ApiResponse<T> {
  data: T;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

/** Envoltorio de respuesta paginada (colecciones Laravel). */
export interface ApiCollection<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}

export interface ApiErrorBody {
  message: string;
  errors?: Record<string, string[]>;
}
