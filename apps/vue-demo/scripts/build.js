import { context } from 'esbuild';
import vue from 'esbuild-plugin-vue-next';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url),
dirname = path.dirname(filename),
rootDir = path.resolve(dirname, '..'),
outdir = path.resolve(rootDir, 'dist'),
isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: [path.resolve(rootDir, 'src', 'main.ts')],
  bundle: true,
  outdir: outdir,
  format: 'esm',
  minify: !isWatch,
  sourcemap: isWatch ? 'inline' : true,
  plugins: [ vue() ],
};

const runBuild = async () => {
  await fs.rm(outdir, { recursive: true, force: true });
  await fs.mkdir(outdir, { recursive: true });
  await fs.cp(path.resolve(rootDir, 'public'), outdir, { recursive: true });
  await fs.copyFile(path.resolve(rootDir, 'src', 'App.css'), path.resolve(outdir, 'App.css'));

  const ctx = await context(buildOptions);

  if (isWatch) {
    await ctx.watch();
    await ctx.serve({
      servedir: outdir,
      port: 8008,
    });
    console.log('Development server started at http://localhost:8008');
  } else {
    await ctx.rebuild();
    console.log('Build complete!');
    await ctx.dispose();
  }
};

runBuild();
