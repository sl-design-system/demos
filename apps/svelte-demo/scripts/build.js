import esbuild from 'esbuild';
import sveltePlugin from 'esbuild-svelte';
import sveltePreprocess from 'svelte-preprocess';
import * as sass from 'sass';
import path from 'node:path';
import fs from 'fs/promises';

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  plugins: [
    sveltePlugin({
      compilerOptions: {
        css: 'injected',
      },
      preprocess: sveltePreprocess({
        scss: {},
        typescript: true,
      }),
    }),
  ],
  logLevel: 'info',
  sourcemap: 'inline',
  resolveExtensions: ['.ts', '.js', '.svelte', '.css'],
};

const compileAppStylesheet = async () => {
  const inputPath = 'src/app.scss';
  const source = await fs.readFile(inputPath, 'utf-8');
  const sourceDir = path.dirname(inputPath);
  let importedCss = '';
  let scssWithoutCssImports = '';

  for (const line of source.split(/\r?\n/)) {
    const importMatch = line.trim().match(/^@import\s+url\(['"](.*\.css)['"]\);$/);

    if (importMatch) {
      const importPath = importMatch[1];
      const resolvedPath = path.resolve(sourceDir, importPath);
      const importedSource = await fs.readFile(resolvedPath, 'utf-8');
      importedCss += importedSource + '\n';
    } else {
      scssWithoutCssImports += line + '\n';
    }
  }

  const compiledStylesheet = sass.compileString(scssWithoutCssImports, {
    style: 'expanded',
  });

  return importedCss + compiledStylesheet.css;
};

const copyStaticFiles = async () => {
  try {
    await fs.mkdir('dist', { recursive: true });
    await fs.copyFile('src/index.html', 'dist/index.html');
    const compiledStylesheet = await compileAppStylesheet();
    await fs.writeFile('dist/main.css', compiledStylesheet, 'utf-8');
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
