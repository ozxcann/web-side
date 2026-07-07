/**
 * Shared animation helpers for scroll-driven scenes.
 */

export function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Maps a value from [inStart, inEnd] to [0, 1], clamped, then eased.
 * Useful for splitting a 0..1 scroll progress into overlapping phases.
 */
export function phase(value: number, inStart: number, inEnd: number): number {
  return easeInOutCubic(clamp01((value - inStart) / (inEnd - inStart)));
}
