// Pure geometry helpers for the design stamp.
//
// Coordinate system: every value is a FRACTION of the "stage", i.e. the box of
// the garment <img> that the stamp is positioned against.
//   x, y : top-left corner of the stamp, as a fraction of stage width / height
//   w    : stamp width as a fraction of stage width
// The stamp height is derived from the design aspect ratio (width / height of
// the uploaded image), so the stamp box always matches the image proportions.
//
// Because the values are fractions, the layout is resolution independent: a
// window resize keeps the stamp glued to the same spot on the garment and the
// export can reproduce it at any pixel size.

export const MIN_STAMP_PX = 20;

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

/** Stamp height as a fraction of the stage height. */
export function stampHeightFraction(w, aspect, stageWidth, stageHeight) {
  return (w * stageWidth) / (aspect * stageHeight);
}

/** Smallest width fraction: the shorter stamp side is MIN_STAMP_PX. */
function minWidthFraction(aspect, stageWidth) {
  return (MIN_STAMP_PX * Math.max(1, aspect)) / stageWidth;
}

/** Largest width fraction that keeps the stamp inside the stage from (x, y). */
function maxWidthFraction(x, y, aspect, stageWidth, stageHeight) {
  const byWidth = 1 - x;
  const byHeight = ((1 - y) * aspect * stageHeight) / stageWidth;
  return Math.min(byWidth, byHeight);
}

/** Keeps the stamp fully inside the stage and within the size limits. */
export function clampTransform(t, aspect, stageWidth, stageHeight) {
  // At most 90% of the stage on each axis.
  const maxW = Math.min(0.9, (0.9 * aspect * stageHeight) / stageWidth);
  const minW = Math.min(minWidthFraction(aspect, stageWidth), maxW);
  const w = clamp(t.w, minW, maxW);
  const h = stampHeightFraction(w, aspect, stageWidth, stageHeight);
  return {
    w,
    x: clamp(t.x, 0, Math.max(0, 1 - w)),
    y: clamp(t.y, 0, Math.max(0, 1 - h)),
  };
}

/** Centered stamp at (at most) 50% of the stage and 200px, like the old UI. */
export function getInitialTransform(aspect, stageWidth, stageHeight) {
  let widthPx = Math.min(stageWidth * 0.5, 200);
  if (widthPx / aspect > stageHeight * 0.5) {
    widthPx = Math.min(stageHeight * 0.5, 200) * aspect;
  }
  const w = widthPx / stageWidth;
  const h = stampHeightFraction(w, aspect, stageWidth, stageHeight);
  return clampTransform(
    { w, x: 0.5 - w / 2, y: 0.5 - h / 2 },
    aspect,
    stageWidth,
    stageHeight
  );
}

/** Drag: move the stamp by a pointer delta expressed in CSS pixels. */
export function moveTransform(start, dxPx, dyPx, aspect, stageWidth, stageHeight) {
  return clampTransform(
    {
      w: start.w,
      x: start.x + dxPx / stageWidth,
      y: start.y + dyPx / stageHeight,
    },
    aspect,
    stageWidth,
    stageHeight
  );
}

/**
 * Resize from the bottom-right handle keeping the aspect ratio. The top-left
 * corner stays anchored and the stamp cannot grow past the stage edges.
 */
export function resizeTransform(start, dxPx, dyPx, aspect, stageWidth, stageHeight) {
  // The axis the user moved the most drives the size.
  const deltaPx = Math.abs(dxPx) >= Math.abs(dyPx * aspect) ? dxPx : dyPx * aspect;
  const minW = minWidthFraction(aspect, stageWidth);
  const maxW = Math.max(
    minW,
    maxWidthFraction(start.x, start.y, aspect, stageWidth, stageHeight)
  );
  const w = clamp(start.w + deltaPx / stageWidth, minW, maxW);
  return { x: start.x, y: start.y, w };
}
