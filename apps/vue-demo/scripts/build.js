#!/usr/bin/env node
import { context } from 'esbuild';
import vue from 'esbuild-plugin-vue-next';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, '..');
const outdir = path.resolve(rootDir, 'dist');
const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: [path.resolve(rootDir, 'src', 'main.ts')],
  bundle: true,
  outdir: outdir,
  format: 'esm',
  minify: !isWatch,
  sourcemap: isWatch ? 'inline' : true,
  plugins: [vue()],
};

async function copyIndex() {
  // Copy index.html and update the script tag
  let indexHtml = await fs.readFile(path.resolve(rootDir, 'index.html'), 'utf-8');
  indexHtml = indexHtml
    .replace(
      '<script type="module" src="/src/main.ts"></script>',
      '<script type="module" src="./main.js"></script>'
    )
    .replace('</head>', '<link rel="stylesheet" href="./main.css">\n  </head>');
  await fs.writeFile(path.resolve(outdir, 'index.html'), indexHtml, 'utf-8');
}

(async () => {
  // Clean up the output directory
  await fs.rm(outdir, { recursive: true, force: true });
  await fs.mkdir(outdir, { recursive: true });

  const ctx = await context(buildOptions);

  if (isWatch) {
    await ctx.watch();
    await ctx.serve({
      servedir: outdir,
      port: 8008,
    });
    await copyIndex(); // Copy index after serve starts to ensure it's available
    console.log('Development server started at http://localhost:8008');
  } else {
    await ctx.rebuild();
    await copyIndex();
    console.log('Build complete!');
    await ctx.dispose();
  }
})();
