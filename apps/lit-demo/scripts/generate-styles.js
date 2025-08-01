import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

const filename = fileURLToPath(import.meta.url),
    dirname = path.dirname(filename),
    srcDir = path.resolve(dirname, '..', 'src');

// Find all .scss files in a directory
const findScssFiles = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    file = path.resolve(dir, file);

    const stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(findScssFiles(file));
    } else if (file.endsWith('.scss')) {
      results.push(file);
    }
  });

  return results;
}

// Process each .scss file found
const scssFiles = findScssFiles(srcDir);

scssFiles.forEach(inputPath => {
  const name = path.basename(inputPath, '.scss'),
      containingDir = path.dirname(inputPath),
      tsPath = path.join(containingDir, `${name}.scss.ts`);

  if (fs.existsSync(tsPath)) {
    fs.unlinkSync(tsPath);
  }

  // Inline any CSS imports at the top of the SCSS source
  const scssSource = fs.readFileSync(inputPath, 'utf-8');
  let importsCss = '';
  let scssSourceWithoutCssImports = '';

  scssSource.split(/\r?\n/).forEach(line => {
    const importCssMatch = line.trim().match(/^@import\s+['\"](.*\.css)['\"];$/);

    if (importCssMatch) {
      const importPath = importCssMatch[1];
      let cssFilePath;

      if (importPath.startsWith('.') || importPath.startsWith('/')) {
        cssFilePath = path.resolve(path.dirname(inputPath), importPath);
      } else {
        cssFilePath = path.resolve(dirname, '..', 'node_modules', importPath);
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
  const jsPath = path.join(containingDir, `${name}.scss.js`);
  const jsContent = `import { css } from 'lit';

export default css\`
${css}
\`;`;
  fs.writeFileSync(jsPath, jsContent, 'utf-8');
  console.log(`Generated ${path.relative(srcDir, jsPath)}`);
});
