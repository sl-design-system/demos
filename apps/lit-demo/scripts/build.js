import { context } from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, '..');
const outdir = path.resolve(rootDir, 'dist');
const isWatch = process.argv.includes('--watch');

(async () => {
  // Clean up the output directory
  await fs.rm(outdir, { recursive: true, force: true });
  await fs.mkdir(outdir, { recursive: true });

  const buildOptions = {
    entryPoints: [path.resolve(rootDir, 'src', 'index.ts')],
    bundle: true,
    outfile: path.resolve(outdir, 'bundle.js'),
    format: 'esm',
    minify: !isWatch,
    sourcemap: isWatch ? 'inline' : true,
  };

  // Copy index.html and update the script tag
  async function copyIndex() {
    let indexHtml = await fs.readFile(path.resolve(rootDir, 'index.html'), 'utf-8');
    indexHtml = indexHtml.replace(
      '<script type="module" src="./src/index.ts"></script>',
      '<script type="module" src="./bundle.js"></script>'
    );
    await fs.writeFile(path.resolve(outdir, 'index.html'), indexHtml, 'utf-8');
  }

  const ctx = await context(buildOptions);

  if (isWatch) {
    await ctx.watch();
    await ctx.serve({
      servedir: outdir,
      port: 8009,
    });
    await copyIndex();
    console.log('Development server started at http://localhost:8009');
  } else {
    await ctx.rebuild();
    await copyIndex();
    console.log('Build complete!');
    await ctx.dispose();
  }
})();
