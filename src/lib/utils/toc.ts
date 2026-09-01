export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * El contenido llega como HTML plano desde Filament (SPEC §55). Para la tabla
 * de contenidos (§13) necesitamos ids estables en cada H2/H3, así que se
 * inyectan aquí antes de renderizar con `set:html`.
 */
export function extractTocAndAnnotateContent(html: string): { html: string; toc: TocEntry[] } {
  const toc: TocEntry[] = [];
  const seen = new Map<string, number>();

  const annotated = html.replace(
    /<h([23])([^>]*)>(.*?)<\/h\1>/gi,
    (match, levelStr: string, attrs: string, inner: string) => {
      const level = Number(levelStr) as 2 | 3;
      const text = inner.replace(/<[^>]+>/g, '').trim();
      if (!text) return match;

      let id = slugifyHeading(text);
      const count = seen.get(id) ?? 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count}`;

      toc.push({ id, text, level });

      const hasId = /\sid=/.test(attrs);
      const newAttrs = hasId ? attrs : `${attrs} id="${id}"`;
      return `<h${level}${newAttrs}>${inner}</h${level}>`;
    }
  );

  return { html: annotated, toc };
}
