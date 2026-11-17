// Renders the on-screen preview (garment + stamp) to a PNG blob.
//
// The math is split in two parts so it can be reasoned about (and tested)
// without a DOM:
//   - computeExportLayout: pure function, takes measured boxes, returns rects.
//   - exportDesignImage:   loads the images and paints those rects.
//
// WYSIWYG contract: the canvas is a uniformly scaled copy of the stage (the
// garment <img> box). Every rect is computed in stage CSS pixels and then
// multiplied by ONE scale factor, so proportions and placement match what is
// on screen regardless of the export resolution.

import { stampHeightFraction } from "./designGeometry.js";

const MAX_CANVAS_SIDE = 4096;

/** Largest rect with the given aspect that fits ("contain") in a box. */
export function containRect(boxWidth, boxHeight, contentAspect) {
  const boxAspect = boxWidth / boxHeight;
  if (contentAspect > boxAspect) {
    const height = boxWidth / contentAspect;
    return { x: 0, y: (boxHeight - height) / 2, width: boxWidth, height };
  }
  const width = boxHeight * contentAspect;
  return { x: (boxWidth - width) / 2, y: 0, width, height: boxHeight };
}

/**
 * @param {object} p
 * @param {number} p.stageWidth      CSS px width of the box the stamp is positioned against
 * @param {number} p.stageHeight     CSS px height of that same box
 * @param {number} p.garmentWidth    natural width of the garment image
 * @param {number} p.garmentHeight   natural height of the garment image
 * @param {{x:number,y:number,w:number}} p.transform stamp, as fractions of the stage
 * @param {number} p.designAspect    natural width / height of the uploaded design
 * @param {number} [p.pixelRatio]    minimum output scale (device pixel ratio)
 */
export function computeExportLayout({
  stageWidth,
  stageHeight,
  garmentWidth,
  garmentHeight,
  transform,
  designAspect,
  pixelRatio = 1,
}) {
  const garmentAspect = garmentWidth / garmentHeight;
  const garmentOnStage = containRect(stageWidth, stageHeight, garmentAspect);

  // Export scale: bring the garment photo back to its native resolution (never
  // below the device pixel ratio or 2x), but cap the canvas to a safe size.
  const nativeScale = garmentWidth / garmentOnStage.width;
  let scale = Math.max(nativeScale, pixelRatio, 2);
  const maxScale = MAX_CANVAS_SIDE / Math.max(stageWidth, stageHeight);
  scale = Math.min(scale, maxScale);

  const canvasWidth = Math.round(stageWidth * scale);
  const canvasHeight = Math.round(stageHeight * scale);

  // Stamp box on the stage in CSS px (same formula the CSS layout uses).
  const stampWidth = transform.w * stageWidth;
  const stampHeight =
    stampHeightFraction(transform.w, designAspect, stageWidth, stageHeight) *
    stageHeight;
  const stampX = transform.x * stageWidth;
  const stampY = transform.y * stageHeight;
  // Same "contain" fit the on-screen stamp uses (a no-op while the box keeps
  // the image aspect, but it keeps both paths identical by construction).
  const fit = containRect(stampWidth, stampHeight, designAspect);

  const scaled = (r) => ({
    x: r.x * scale,
    y: r.y * scale,
    width: r.width * scale,
    height: r.height * scale,
  });

  return {
    scale,
    canvasWidth,
    canvasHeight,
    garment: scaled(garmentOnStage),
    design: scaled({
      x: stampX + fit.x,
      y: stampY + fit.y,
      width: fit.width,
      height: fit.height,
    }),
  };
}

function loadImage(src, crossOrigin) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (crossOrigin) img.crossOrigin = crossOrigin;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image for export."));
    img.src = src;
  });
}

/**
 * @param {object} p
 * @param {HTMLElement} p.stageEl        element whose box the stamp is positioned in
 * @param {string} p.garmentSrc          URL of the garment image currently displayed
 * @param {string} p.designSrc           object URL of the uploaded design
 * @param {{x:number,y:number,w:number}} p.transform
 * @returns {Promise<Blob>} PNG blob
 */
export async function exportDesignImage({ stageEl, garmentSrc, designSrc, transform }) {
  // clientWidth/Height ignore CSS transforms: they are the layout box, which is
  // exactly the box the percentage-based stamp is laid out against.
  const stageWidth = stageEl.clientWidth;
  const stageHeight = stageEl.clientHeight;
  if (!stageWidth || !stageHeight) throw new Error("Preview has no size yet.");

  const [garment, design] = await Promise.all([
    loadImage(garmentSrc, "anonymous"),
    loadImage(designSrc),
  ]);

  const layout = computeExportLayout({
    stageWidth,
    stageHeight,
    garmentWidth: garment.naturalWidth,
    garmentHeight: garment.naturalHeight,
    transform,
    designAspect: design.naturalWidth / design.naturalHeight,
    pixelRatio: window.devicePixelRatio || 1,
  });

  const canvas = document.createElement("canvas");
  canvas.width = layout.canvasWidth;
  canvas.height = layout.canvasHeight;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const g = layout.garment;
  ctx.drawImage(garment, g.x, g.y, g.width, g.height);
  const d = layout.design;
  ctx.drawImage(design, d.x, d.y, d.width, d.height);

  return new Promise((resolve, reject) => {
    // toBlob throws a SecurityError synchronously if the canvas is tainted.
    try {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Canvas export failed."))),
        "image/png"
      );
    } catch (err) {
      reject(err);
    }
  });
}
