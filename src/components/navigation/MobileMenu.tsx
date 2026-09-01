import { useEffect } from 'react';
import { useMenuStore } from '../../store/menuStore';
import type { Section } from '../../types/taxonomy';

interface MobileMenuProps {
  sections: Section[];
}

export default function MobileMenu({ sections }: MobileMenuProps) {
  const isOpen = useMenuStore((state) => state.isOpen);
  const toggle = useMenuStore((state) => state.toggle);
  const close = useMenuStore((state) => state.close);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    ...sections.map((section) => ({ href: `/${section.slug}`, label: section.name })),
    { href: '/temas', label: 'Temas' },
    { href: '/series', label: 'Series' },
    { href: '/explorar', label: 'Explorar más' }
  ];

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-foreground transition-colors duration-200 hover:bg-muted md:hidden"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden="true">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          id="mobile-menu-panel"
          className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background px-4 pb-8 pt-4 shadow-lg md:hidden"
        >
          <nav aria-label="Navegación principal (móvil)">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={close}
                    className="block min-h-11 rounded-lg px-3 py-3 font-sans text-base font-medium text-foreground transition-colors duration-200 hover:bg-muted"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
