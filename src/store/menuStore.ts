import { create } from 'zustand';

interface MenuState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Estado del menú móvil colapsable (SPEC §7). Vive en un store compartido
 * porque el botón de apertura (Header) y el panel (MobileMenu) son islands
 * React separadas dentro del mismo BaseLayout.
 */
export const useMenuStore = create<MenuState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen }))
}));
