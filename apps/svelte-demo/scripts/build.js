import esbuild from 'esbuild';
import sveltePlugin from 'esbuild-svelte';
import sveltePreprocess from 'svelte-preprocess';
import fs from 'fs/promises';

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  plugins: [
    sveltePlugin({
      preprocess: sveltePreprocess({
        typescript: true,
        postcss: true,
      }),
    }),
  ],
  logLevel: 'info',
  sourcemap: 'inline',
  resolveExtensions: ['.ts', '.js', '.svelte', '.css'],
};

const copyStaticFiles = async () => {
  try {
    await fs.mkdir('dist', { recursive: true });
    await fs.copyFile('src/index.html', 'dist/index.html');
    await fs.copyFile('src/App.css', 'dist/main.css');
  } catch (err) {
    console.error('Error copying static files:', err);
    process.exit(1);
  }
};

const run = async () => {
  await copyStaticFiles();

  if (isWatch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log('Watching for changes...');
  } else {
    await esbuild.build(buildOptions);
  }
};

run().catch(e => {
  console.error(e);
  process.exit(1);
});
