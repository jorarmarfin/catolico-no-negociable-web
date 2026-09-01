const dateFormatter = new Intl.DateTimeFormat('es', { dateStyle: 'long' });

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

const levelLabels: Record<string, string> = {
  basic: 'Básico',
  intermediate: 'Intermedio',
  advanced: 'Avanzado'
};

export function formatLevel(level: string): string {
  return levelLabels[level] ?? level;
}

const sourceTypeLabels: Record<string, string> = {
  bible: 'Biblia',
  catechism: 'Catecismo',
  church_father: 'Padre de la Iglesia',
  magisterium: 'Magisterio',
  council: 'Concilio',
  encyclical: 'Encíclica',
  external: 'Fuente externa'
};

export function formatSourceType(type?: string | null): string | null {
  if (!type) return null;
  return sourceTypeLabels[type] ?? type;
}

export function formatDuration(seconds?: number | null): string | null {
  if (!seconds) return null;
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}:${remaining.toString().padStart(2, '0')}`;
}
