/**
 * Renders the source images for the app icon and splash screen from the SLDS
 * logo mark (assets/sl-logo-mark.svg), in the layout @capacitor/assets expects
 * for its "custom" mode. Run through `yarn assets`, which then lets
 * `capacitor-assets generate` produce every iOS and Android size from them.
 *
 *   icon-only.png        iOS icon: full-bleed blue with the S (iOS rounds it)
 *   icon-foreground.png  Android adaptive icon: the S, inside the safe zone
 *   icon-background.png  Android adaptive icon: plain blue
 *   splash.png           light splash: the mark centred on the page colour
 *   splash-dark.png      dark splash: the same on the dark page colour
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'),
  assets = path.join(root, 'assets');

/** Page background colours of the Sanoma Learning theme (light and dark). */
const PAGE_LIGHT = '#ffffff',
  PAGE_DARK = '#222222';

const mark = await readFile(path.join(assets, 'sl-logo-mark.svg'), 'utf8');

// The mark is two paths on a 32 × 32 grid: the rounded square, then the S.
const [square, letter] = [...mark.matchAll(/<path [^>]*\/>/g)].map(
  ([element]) => element,
);
const squareFill = /fill="([^"]+)"/.exec(square)?.[1];
if (!square || !letter || !squareFill) {
  throw new Error('Expected two paths with fills in assets/sl-logo-mark.svg');
}

/** A square SVG of `size` px drawing `body` on the mark's 32 × 32 grid. */
const svg = (size, body, background) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
    ${background ? `<rect width="32" height="32" fill="${background}"/>` : ''}
    ${body}
  </svg>`;

/** Scales `body` around the centre of the 32 × 32 grid. */
const scaled = (scale, body) =>
  `<g transform="translate(16 16) scale(${scale}) translate(-16 -16)">${body}</g>`;

const images = {
  // Same proportions as the logo; iOS applies its own rounded mask.
  'icon-only.png': svg(1024, letter, squareFill),
  // Same proportions too: capacitor-assets insets the adaptive icon layers by
  // 16.7%, which maps this image onto the 72 dp visible part of the canvas.
  'icon-foreground.png': svg(1024, letter),
  'icon-background.png': svg(1024, '', squareFill),
  // The full mark at 15% of the splash width (about 130 pt on an iPhone).
  'splash.png': svg(2732, scaled(0.15, square + letter), PAGE_LIGHT),
  'splash-dark.png': svg(2732, scaled(0.15, square + letter), PAGE_DARK),
};

for (const [file, source] of Object.entries(images)) {
  let image = sharp(Buffer.from(source));
  // Only the Android foreground layer is transparent; the App Store rejects
  // icons with an alpha channel, so flatten everything else.
  if (file !== 'icon-foreground.png') {
    image = image.flatten();
  }
  await image.png().toFile(path.join(assets, file));
  console.log(`assets/${file}`);
}
