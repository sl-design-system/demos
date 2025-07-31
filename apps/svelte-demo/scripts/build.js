#!/usr/bin/env node
import esbuild from 'esbuild';
import sveltePlugin from 'esbuild-svelte';
import sveltePreprocess from 'svelte-preprocess';
import fs from 'fs/promises';
import path from 'path';

const isWatch = process.argv.includes('--watch');

// Copy the design system CSS manually
async function copyDesignSystemCSS() {
  try {
    const cssSource = path.resolve('../../../node_modules/@sl-design-system/sanoma-learning/light.css');
    const cssDestination = path.resolve('dist/design-system.css');
    await fs.copyFile(cssSource, cssDestination);
    console.log('Design system CSS copied successfully');
  } catch (err) {
    console.error('Error copying design system CSS:', err);
    // Don't exit - continue with build even if CSS copy fails
  }
}

const buildOptions = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  plugins: [
    sveltePlugin({
      preprocess: sveltePreprocess(),
    }),
  ],
  logLevel: 'info',
  sourcemap: 'inline', // Use inline sourcemaps for better debugging
  resolveExtensions: ['.ts', '.js', '.svelte', '.css'],
};

async function copyStaticFiles() {
  try {
    await fs.mkdir('dist', { recursive: true });
    await fs.copyFile('src/index.html', 'dist/index.html');
    // Copy component CSS
    await fs.copyFile('src/App.css', 'dist/App.css');
    await copyDesignSystemCSS();
  } catch (err) {
    console.error('Error copying static files:', err);
    process.exit(1);
  }
}

async function run() {
  await copyStaticFiles();
  if (isWatch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log('Watching for changes...');
  } else {
    await esbuild.build(buildOptions);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
