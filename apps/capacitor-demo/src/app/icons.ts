import { Icon } from '@sl-design-system/icon';

/** A 24 × 24 icon drawn with strokes in the icon colour (and optionally filled). */
function strokeIcon(
  body: string,
  { filled = false, width = 1.8 } = {},
): {
  svg: string;
} {
  const fill = filled ? 'var(--sl-icon-fill-default)' : 'none';
  return {
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="${fill}" stroke="var(--sl-icon-fill-default)" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`,
  };
}

const GRID =
  '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"></rect><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"></rect><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"></rect><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"></rect>';

const STAR =
  '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"></path>';

const SLIDER_LINES = '<path d="M4 7h9M19 7h1M4 17h3M13 17h7"></path>';
const SLIDER_KNOBS =
  '<circle cx="16" cy="7" r="2.5"></circle><circle cx="10" cy="17" r="2.5"></circle>';

/**
 * Tab bar icons, drawn as in the design canvas: an outline version, and a
 * filled one (`-filled`) for the selected tab, the way iOS and Android mark
 * the current tab. The theme has no matching set (and no filled star).
 */
export function registerAppIcons(): void {
  Icon.register({
    'demo-grid': strokeIcon(GRID),
    'demo-grid-filled': strokeIcon(GRID, { filled: true }),
    'demo-star': strokeIcon(STAR),
    'demo-star-filled': strokeIcon(STAR, { filled: true }),
    'demo-sliders': strokeIcon(SLIDER_LINES + SLIDER_KNOBS),
    // Only the knobs fill; the lines get a little heavier to match.
    'demo-sliders-filled': {
      svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g stroke="var(--sl-icon-fill-default)" stroke-width="2.2" stroke-linecap="round"><g fill="none">${SLIDER_LINES}</g><g fill="var(--sl-icon-fill-default)">${SLIDER_KNOBS}</g></g></svg>`,
    },
  });
}
