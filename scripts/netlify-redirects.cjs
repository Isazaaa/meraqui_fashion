const fs = require('fs');
const path = require('path');

// Crear archivo de redirects
const redirectContent = '/* /index.html 200\n';
const redirectsPath = path.join(process.cwd(), 'dist', '_redirects');

fs.mkdirSync(path.dirname(redirectsPath), { recursive: true });
fs.writeFileSync(redirectsPath, redirectContent, 'utf8');
console.log('✅ dist/_redirects creado en:', redirectsPath);

// Copiar archivo _headers si existe
const headersSource = path.join(process.cwd(), 'public', '_headers');
const headersTarget = path.join(process.cwd(), 'dist', '_headers');

if (fs.existsSync(headersSource)) {
  fs.copyFileSync(headersSource, headersTarget);
  console.log('✅ dist/_headers copiado desde public/_headers');
}
