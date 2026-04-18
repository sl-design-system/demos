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
    const esbuildServer = await ctx.serve({ servedir: outdir, port: 10009 });

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
      .listen(8009);

    console.log('Development server started at http://localhost:8009');
  } else {
    await ctx.rebuild();
    console.log('Build complete!');
    await ctx.dispose();
  }
};

runBuild();
