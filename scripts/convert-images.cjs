/**
 * One-off image optimizer: converts local raster assets to WebP.
 *
 * Only touches locally-bundled images. Product photos live on Cloudinary
 * and are already served optimized, so they are intentionally excluded.
 *
 * Usage: node scripts/convert-images.cjs
 */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");

// maxWidth is a cap; images smaller than it are not upscaled.
const targets = [
  // Hero + category art: large display, quality 80 is plenty for photos.
  { file: "src/assets/personalizar.png", maxWidth: 1920, quality: 80 },
  { file: "src/assets/images/categoria-mujer.jpg", maxWidth: 1200, quality: 80 },
  { file: "src/assets/images/categoria-hombre.jpg", maxWidth: 1200, quality: 80 },
  { file: "src/assets/images/categoria-ninos.jpg", maxWidth: 1200, quality: 80 },
  // Logos: small on screen, keep transparency, cap for retina.
  { file: "src/assets/meraquilogo.png", maxWidth: 500, quality: 90 },
  { file: "public/logoMF.png", maxWidth: 400, quality: 90 },
  // Customize fallback photo.
  { file: "public/images/camiseta-hombre-blanco-frente.jpg", maxWidth: 1200, quality: 80 },
];

const fmt = (n) => (n / 1024).toFixed(0) + " KB";

(async () => {
  let before = 0;
  let after = 0;

  for (const { file, maxWidth, quality } of targets) {
    const abs = path.join(root, file);
    if (!fs.existsSync(abs)) {
      console.warn(`SKIP (missing): ${file}`);
      continue;
    }

    const out = abs.replace(/\.(png|jpe?g)$/i, ".webp");
    const inSize = fs.statSync(abs).size;

    const image = sharp(abs);
    const meta = await image.metadata();
    if (meta.width && meta.width > maxWidth) {
      image.resize({ width: maxWidth });
    }

    await image.webp({ quality }).toFile(out);

    const outSize = fs.statSync(out).size;
    before += inSize;
    after += outSize;

    const saved = (100 - (outSize / inSize) * 100).toFixed(0);
    console.log(
      `${file}\n  ${fmt(inSize)} -> ${fmt(outSize)}  (-${saved}%)`
    );

    // Remove the original once the WebP is written.
    fs.unlinkSync(abs);
  }

  console.log(
    `\nTOTAL: ${fmt(before)} -> ${fmt(after)}  (-${(
      100 -
      (after / before) * 100
    ).toFixed(0)}%)`
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
