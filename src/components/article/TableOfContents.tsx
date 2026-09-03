import { useEffect, useState } from 'react';
import type { TocEntry } from '../../lib/utils/toc';

interface TableOfContentsProps {
  entries: TocEntry[];
  /** 'desktop' = barra lateral fija, 'mobile' = desplegable (SPEC §13). */
  variant: 'desktop' | 'mobile';
}

/** Un h2 seguido de sus h3 hasta el próximo h2. */
interface TocGroup {
  parent: TocEntry;
  children: TocEntry[];
}

function groupEntries(entries: TocEntry[]): TocGroup[] {
  const groups: TocGroup[] = [];
  for (const entry of entries) {
    if (entry.level === 2 || groups.length === 0) {
      groups.push({ parent: entry, children: [] });
    } else {
      groups[groups.length - 1].children.push(entry);
    }
  }
  return groups;
}

export default function TableOfContents({ entries, variant }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null);
  const [isOpen, setIsOpen] = useState(false);
  const groups = groupEntries(entries);
  const [collapsedParents, setCollapsedParents] = useState<Set<string>>(
    () => new Set(groups.filter((g) => g.children.length > 0).map((g) => g.parent.id))
  );

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

  useEffect(() => {
    if (!activeId) return;
    const group = groups.find((g) => g.children.some((child) => child.id === activeId));
    if (!group) return;
    setCollapsedParents((prev) => {
      if (!prev.has(group.parent.id)) return prev;
      const next = new Set(prev);
      next.delete(group.parent.id);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  if (entries.length === 0) return null;

  const toggleParent = (id: string) => {
    setCollapsedParents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const list = (
    <ul className="space-y-1 border-l border-border pl-4">
      {groups.map(({ parent, children }) => {
        const hasChildren = children.length > 0;
        const isCollapsed = collapsedParents.has(parent.id);

        return (
          <li key={parent.id}>
            <div className="flex items-center">
              <a
                href={`#${parent.id}`}
                onClick={() => setIsOpen(false)}
                className={`block flex-1 py-1 font-sans text-sm transition-colors duration-200 ${
                  activeId === parent.id ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {parent.text}
              </a>
              {hasChildren && (
                <button
                  type="button"
                  onClick={() => toggleParent(parent.id)}
                  aria-expanded={!isCollapsed}
                  aria-label={isCollapsed ? `Mostrar subsecciones de ${parent.text}` : `Ocultar subsecciones de ${parent.text}`}
                  className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              )}
            </div>
            {hasChildren && !isCollapsed && (
              <ul className="space-y-1">
                {children.map((child) => (
                  <li key={child.id} className="ml-3">
                    <a
                      href={`#${child.id}`}
                      onClick={() => setIsOpen(false)}
                      className={`block py-1 font-sans text-sm transition-colors duration-200 ${
                        activeId === child.id ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {child.text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
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
