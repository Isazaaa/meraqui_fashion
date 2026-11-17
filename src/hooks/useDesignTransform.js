import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  clampTransform,
  getInitialTransform,
  moveTransform,
  resizeTransform,
} from "../utils/designGeometry.js";

/**
 * Drag / resize logic for the design stamp.
 *
 * - Uses Pointer Events with pointer capture, so mouse, touch and pen share one
 *   code path and no document-level listeners are needed (nothing to leak).
 * - Pointer moves are coalesced with requestAnimationFrame: at most one state
 *   update per frame.
 * - The transform is stored as fractions of the stage box (see
 *   utils/designGeometry.js), so it survives window / image resizes.
 *
 * @param {React.RefObject<HTMLElement>} stageRef box the stamp is positioned in
 */
export default function useDesignTransform(stageRef) {
  const [transform, setTransform] = useState(null);
  const [aspect, setAspect] = useState(1);

  const aspectRef = useRef(1);
  const transformRef = useRef(null);
  const pendingInitRef = useRef(false);

  const commit = useCallback((next) => {
    transformRef.current = next;
    setTransform(next);
  }, []);

  // Place a freshly uploaded design (aspect = natural width / height).
  const placeDesign = useCallback(
    (designAspect) => {
      aspectRef.current = designAspect;
      setAspect(designAspect);
      const stage = stageRef.current;
      if (stage && stage.clientWidth && stage.clientHeight) {
        pendingInitRef.current = false;
        commit(getInitialTransform(designAspect, stage.clientWidth, stage.clientHeight));
      } else {
        // Stage not laid out yet: the ResizeObserver below finishes the job.
        pendingInitRef.current = true;
      }
    },
    [stageRef, commit]
  );

  const clearDesign = useCallback(() => {
    pendingInitRef.current = false;
    commit(null);
  }, [commit]);

  // Keep the stamp inside the stage when the stage changes size (window resize,
  // garment photo with a different aspect ratio, ...).
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (!width || !height) return;
      if (pendingInitRef.current) {
        pendingInitRef.current = false;
        commit(getInitialTransform(aspectRef.current, width, height));
      } else if (transformRef.current) {
        commit(clampTransform(transformRef.current, aspectRef.current, width, height));
      }
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [stageRef, commit]);

  const { stampHandlers, resizeHandlers, cancelFrame } = useMemo(() => {
    let gesture = null; // { mode, pointerId, startX, startY, start, width, height }
    let latest = null; // last pointer position, applied once per frame
    let frame = 0;

    const apply = () => {
      frame = 0;
      if (!gesture || !latest) return;
      const dx = latest.x - gesture.startX;
      const dy = latest.y - gesture.startY;
      const step = gesture.mode === "resize" ? resizeTransform : moveTransform;
      commit(step(gesture.start, dx, dy, aspectRef.current, gesture.width, gesture.height));
    };

    const begin = (mode) => (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const stage = stageRef.current;
      if (!stage || !transformRef.current) return;
      e.preventDefault();
      e.stopPropagation(); // the resize handle must not also start a drag
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      gesture = {
        mode,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        start: transformRef.current,
        width: rect.width,
        height: rect.height,
      };
      latest = null;
    };

    const move = (e) => {
      if (!gesture || e.pointerId !== gesture.pointerId) return;
      latest = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const end = (e) => {
      if (!gesture || e.pointerId !== gesture.pointerId) return;
      if (frame) {
        cancelAnimationFrame(frame);
        apply(); // flush the last pointer position
      }
      gesture = null;
      latest = null;
    };

    const shared = {
      onPointerMove: move,
      onPointerUp: end,
      onPointerCancel: end,
    };

    return {
      stampHandlers: { ...shared, onPointerDown: begin("drag") },
      resizeHandlers: { onPointerDown: begin("resize") },
      cancelFrame: () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        gesture = null;
      },
    };
  }, [stageRef, commit]);

  useEffect(() => cancelFrame, [cancelFrame]);

  return { transform, aspect, placeDesign, clearDesign, stampHandlers, resizeHandlers };
}
