import { useEffect, useState } from 'react';
import type { TocEntry } from '../../lib/utils/toc';

interface TableOfContentsProps {
  entries: TocEntry[];
  /** 'desktop' = barra lateral fija, 'mobile' = desplegable (SPEC §13). */
  variant: 'desktop' | 'mobile';
}

export default function TableOfContents({ entries, variant }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const headingElements = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        const visible = observedEntries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  const list = (
    <ul className="space-y-1 border-l border-border pl-4">
      {entries.map((entry) => (
        <li key={entry.id} className={entry.level === 3 ? 'ml-3' : ''}>
          <a
            href={`#${entry.id}`}
            onClick={() => setIsOpen(false)}
            className={`block py-1 font-sans text-sm transition-colors duration-200 ${
              activeId === entry.id ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {entry.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === 'desktop') {
    return (
      <nav aria-label="Tabla de contenidos">
        <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-secondary">Contenido del artículo</p>
        {list}
      </nav>
    );
  }

  return (
    <div className="mb-6 rounded-xl border border-border">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex min-h-11 w-full cursor-pointer items-center justify-between px-4 py-3 font-sans text-sm font-semibold text-foreground"
      >
        Contenido del artículo
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {isOpen && <div className="px-4 pb-4">{list}</div>}
    </div>
  );
}
