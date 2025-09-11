const fs = require('fs');
const path = require('path');

const redirectContent = '/* /index.html 200\n';
const outPath = path.join(process.cwd(), 'dist', '_redirects');

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, redirectContent, 'utf8');
console.log('✅ dist/_redirects creado en:', outPath);
