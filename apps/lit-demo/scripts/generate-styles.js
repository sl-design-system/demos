#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

// Determine working directory and files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '..', 'src', 'app');

// Process each .scss file in src/app
fs.readdirSync(srcDir).forEach(file => {
  if (file.endsWith('.scss')) {
    const name = path.basename(file, '.scss');
    const inputPath = path.join(srcDir, file);
    const tsPath = path.join(srcDir, `${name}.scss.ts`);

    if (fs.existsSync(tsPath)) {
      fs.unlinkSync(tsPath);
    }

    // Compile SCSS to CSS
    const result = sass.compile(inputPath, { style: 'expanded', sourceMap: true });
    // Inline any CSS imports at the top of the SCSS source
    const scssSource = fs.readFileSync(inputPath, 'utf-8');
    let importsCss = '';
    let scssSourceWithoutCssImports = '';
    scssSource.split(/\r?\n/).forEach(line => {
      const m = line.trim().match(/^@import\s+['\"](.*\.css)['\"];$/);
      if (m) {
        const importPath = m[1];
        let cssFilePath;
        if (importPath.startsWith('.') || importPath.startsWith('/')) {
          cssFilePath = path.resolve(path.dirname(inputPath), importPath);
        } else {
          cssFilePath = path.resolve(__dirname, '..', 'node_modules', importPath);
        }
        if (fs.existsSync(cssFilePath)) {
          importsCss += fs.readFileSync(cssFilePath, 'utf-8').replaceAll(':root', ':host') + '\n';
        }
      } else {
        scssSourceWithoutCssImports += line + '\n';
      }
    });
    const css = importsCss + sass.compileString(scssSourceWithoutCssImports, { style: 'expanded', sourceMap: true }).css;

    // Write JS module exporting a Lit css literal
    const jsPath = path.join(srcDir, `${name}.scss.js`);
    const jsContent = `import { css } from 'lit';

export default css\`
${css}
\`;`;
    fs.writeFileSync(jsPath, jsContent, 'utf-8');

    // Write TS wrapper re-exporting the JS module
    // const tsContent = `import styles from './${name}.scss.js';
// export default styles;
// `;
    // fs.writeFileSync(tsPath, tsContent, 'utf-8');
    console.log(`Generated ${name}.scss.js`);
  }
});

