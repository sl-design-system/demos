import { context } from 'esbuild';
import vue from 'esbuild-plugin-vue-next';
import fs from 'node:fs/promises';
import http from 'node:http';
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
  plugins: [ vue({ templateOptions: { compilerOptions: { isCustomElement: (tag) => tag.startsWith('sl-') } } }) ],
};

const runBuild = async () => {
  await fs.rm(outdir, { recursive: true, force: true });
  await fs.mkdir(outdir, { recursive: true });
  await fs.cp(path.resolve(rootDir, 'public'), outdir, { recursive: true });
  await fs.copyFile(path.resolve(rootDir, 'src', 'app.css'), path.resolve(outdir, 'app.css'));

  const ctx = await context(buildOptions);

  if (isWatch) {
    await ctx.watch();
    const esbuildServer = await ctx.serve({ servedir: outdir, port: 10008 });

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
      .listen(8008);

    console.log('Development server started at http://localhost:8008');
  } else {
    await ctx.rebuild();
    console.log('Build complete!');
    await ctx.dispose();
  }
};

runBuild();
