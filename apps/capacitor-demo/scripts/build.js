import { context } from 'esbuild';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url),
    dirname = path.dirname(filename),
    rootDir = path.resolve(dirname, '..'),
    outdir = path.resolve(rootDir, 'dist'),
    isWatch = process.argv.includes('--watch');

const runBuild = async () => {
  await fs.rm(outdir, { recursive: true, force: true });
  await fs.mkdir(outdir, { recursive: true });

  // Copy the theme CSS globally so elements outside shadow DOM (e.g. message-dialog) get CSS vars.
  // Both light and dark variants are shipped so the in-app theme switcher can toggle between them.
  const themeDir = path.resolve(rootDir, '../../node_modules/@sl-design-system/sanoma-learning');

  for (const variant of ['light.css', 'dark.css']) {
    const src = path.resolve(themeDir, variant);

    try {
      await fs.copyFile(src, path.resolve(outdir, variant));
    } catch {
      console.warn(`Warning: ${variant} not found in @sl-design-system/sanoma-learning; copying light.css as a fallback.`);
      await fs.copyFile(path.resolve(themeDir, 'light.css'), path.resolve(outdir, variant));
    }
  }

  // Read and transform index.html so it loads the bundled script
  const rawHtml = await fs.readFile(path.resolve(rootDir, 'index.html'), 'utf-8');
  const outHtml = rawHtml.replace(
    /<script[^>]+src=["']\.\/src\/index\.ts["'][^>]*><\/script>/,
    '<script type="module" src="./bundle.js"></script>'
  );

  await fs.writeFile(path.resolve(outdir, 'index.html'), outHtml, 'utf-8');

  const buildOptions = {
    entryPoints: [path.resolve(rootDir, 'src', 'index.ts')],
    bundle: true,
    outfile: path.resolve(outdir, 'bundle.js'),
    format: 'esm',
    minify: !isWatch,
    sourcemap: isWatch ? 'inline' : true,
  };

  const ctx = await context(buildOptions);

  if (isWatch) {
    await ctx.watch();
    const esbuildServer = await ctx.serve({ servedir: outdir, port: 10010 });

    // Proxy that falls back to index.html for unknown paths (SPA support)
    http
      .createServer((req, res) => {
        const forwardReq = http.request(
          { hostname: esbuildServer.host, port: esbuildServer.port, path: req.url, method: req.method, headers: req.headers },
          (forwardRes) => {
            if (forwardRes.statusCode === 404) {
              http.request(
                { hostname: esbuildServer.host, port: esbuildServer.port, path: '/index.html', method: req.method, headers: req.headers },
                (indexRes) => {
                  res.writeHead(indexRes.statusCode, indexRes.headers);
                  indexRes.pipe(res);
                }
              ).end();
            } else {
              res.writeHead(forwardRes.statusCode, forwardRes.headers);
              forwardRes.pipe(res);
            }
          }
        );
        req.pipe(forwardReq);
      })
      .listen(8010);

    console.log('Development server started at http://localhost:8010');
  } else {
    await ctx.rebuild();
    console.log('Build complete!');
    await ctx.dispose();
  }
};

runBuild();
