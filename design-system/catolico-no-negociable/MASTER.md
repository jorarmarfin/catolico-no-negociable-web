# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Catolico No Negociable
**Generated:** 2026-09-01 10:00:49
**Category:** Knowledge Base/Documentation

---

## Global Rules

> **Nota de curación:** el `--design-system` automático propuso "Exaggerated Minimalism" +
> paleta gris/azul genérica (fit para FAQ/docs). Se sustituyó manualmente por una dirección
> **Editorial Grid** con paleta litúrgica. Actualizada el 2026-09-01 para alinearse con el
> logo oficial (`favicon.png`, muestreado por color): navy `#002447` + dorado `#E3A93A`.

### Color Palette

| Role | Hex | CSS Variable | Uso |
|------|-----|--------------|-----|
| Primary | `#0B2447` | `--color-primary` | Navy del logo — headers, nav activa, enlaces |
| On Primary | `#FFFFFF` | `--color-primary-foreground` | Texto sobre primary |
| Secondary | `#4A5A72` | `--color-secondary` | Navy desaturado — texto secundario, íconos |
| Accent/CTA | `#996616` | `--color-accent` | Dorado del logo oscurecido a AA (4.76:1 en bg) — CTAs, citas, énfasis |
| On Accent | `#FFFFFF` | `--color-accent-foreground` | Texto sobre accent |
| Background | `#FDFBF6` | `--color-background` | Fondo cálido tipo papel |
| Foreground | `#17233A` | `--color-foreground` | Texto principal (familia navy) |
| Muted | `#F3EDE2` | `--color-muted` | Fondos de tarjetas, secciones alternas |
| Muted Foreground | `#6B6455` | `--color-muted-foreground` | Texto secundario, metadatos |
| Border | `#E7DFCF` | `--color-border` | Bordes, separadores |
| Destructive | `#B3261E` | `--color-destructive` | Errores |
| Ring | `#0B2447` | `--color-ring` | Focus ring |

**Color Notes:** Paleta muestreada por color directamente del logo (navy `#002447`, dorado
`#E3A93A`, crema `#FCF3E5`). El dorado del logo es demasiado claro para texto (2.1:1 sobre
blanco), así que `--color-accent` usa una versión oscurecida del mismo tono (`#996616`,
4.76:1) — el dorado claro original sigue apareciendo vía opacidad (`bg-accent/10`,
`border-accent/40`) en blockquotes, badges y notas apologéticas. Todos los pares texto/fondo
verificados ≥4.5:1 (WCAG AA). Reservado para futuro modo oscuro (§41 SPEC, no requerido en
V1): invertir a `#0F1A2C` bg / `#E8E6DC` fg manteniendo navy+dorado.

### Typography

- **Heading Font:** Newsreader (serif editorial, optimizado para lectura larga — títulos, citas bíblicas, blockquotes)
- **Body Font:** Inter (sans neutro, alta legibilidad en pantalla, excelente soporte Tailwind)
- **Mood:** editorial, confiable, formativo, sereno, legible
- **Google Fonts:** [Newsreader + Inter](https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=Inter:wght@400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=Inter:wght@400;500;600;700&display=swap');
```

**Tailwind:** `fontFamily: { serif: ['Newsreader', 'serif'], sans: ['Inter', 'sans-serif'] }`
Cuerpo de artículo en `font-serif`, UI/nav/badges en `font-sans`.

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #2563EB;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #475569;
  border: 2px solid #475569;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #475569;
  outline: none;
  box-shadow: 0 0 0 3px #47556920;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Editorial Grid / Magazine (curado, reemplaza sugerencia automática)

**Keywords:** grid editorial, tipografía jerárquica, pull quotes, drop caps opcionales en artículos largos, ancho de lectura limitado (720–820px por SPEC §11), whitespace generoso pero no excesivo

**Best For:** Contenido de formación de largo aliento, bases de conocimiento, bibliotecas digitales

**Key Effects:** jerarquía H1–H4 marcada, blockquotes con borde izquierdo dorado para citas bíblicas/magisteriales, sin animaciones decorativas — solo transiciones funcionales 150–300ms

### Page Pattern (Home — biblioteca, no blog cronológico, SPEC §69)

**Pattern Name:** Knowledge Library Landing

- **Objetivo:** posicionar la plataforma como biblioteca de formación, priorizar categorías/temas/series/búsqueda sobre fecha de publicación
- **CTA Placement:** buscador destacado en hero + CTA "Explorar la biblioteca"
- **Section Order (SPEC §6):** 1. Hero + buscador, 2. Categorías principales, 3. Temas recomendados, 4. Últimos artículos, 5. Apologética destacada, 6. Videos recientes, 7. Series/colecciones, 8. Recursos, 9. CTA final

---

## Anti-Patterns (Do NOT Use)

- ❌ Poor navigation
- ❌ No search

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
