"use client";

import { useEffect, useState } from "react";

export type PerformanceLevel = "LOW" | "MEDIUM" | "HIGH";

interface DevicePerformance {
  level: PerformanceLevel;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

/**
 * Hook to detect device performance level
 * Returns LOW/MEDIUM/HIGH based on:
 * - CPU cores
 * - Device memory
 * - Mobile detection
 * - User preferences (prefers-reduced-motion)
 */
export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    level: "MEDIUM",
    isMobile: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    // Check if reduced motion is preferred
    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Detect mobile / touch-first devices with coarse pointers.
    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    // Get hardware info (if available)
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    // @ts-expect-error - deviceMemory is not standard but supported in Chrome
    const deviceMemory = navigator.deviceMemory || 4;

    interface EffectiveConnection {
      effectiveType?: string;
      saveData?: boolean;
    }
    const connection =
      (navigator as unknown as { connection?: EffectiveConnection; mozConnection?: EffectiveConnection; webkitConnection?: EffectiveConnection }).connection ||
      (navigator as unknown as { connection?: EffectiveConnection; mozConnection?: EffectiveConnection; webkitConnection?: EffectiveConnection }).mozConnection ||
      (navigator as unknown as { connection?: EffectiveConnection; mozConnection?: EffectiveConnection; webkitConnection?: EffectiveConnection }).webkitConnection;
    const effectiveType = connection?.effectiveType;
    const saveData = connection?.saveData ?? false;

    // Calculate performance level
    let level: PerformanceLevel = "HIGH";

    if (prefersReducedMotion || saveData || effectiveType === "slow-2g" || effectiveType === "2g") {
      // User explicitly wants reduced motion or has a very slow connection.
      level = "LOW";
    } else if (isMobile) {
      // Mobile devices: check specs.
      if (hardwareConcurrency <= 4 || deviceMemory < 4) {
        level = "LOW";
      } else {
        level = "MEDIUM";
      }
    } else {
      // Desktop: check CPU and RAM.
      if (hardwareConcurrency < 4 || deviceMemory < 4) {
        level = "LOW";
      } else if (hardwareConcurrency < 8 || deviceMemory < 8) {
        level = "MEDIUM";
      } else {
        level = "HIGH";
      }
    }

    setPerformance({
      level,
      isMobile,
      prefersReducedMotion,
    });
  }, []);

  return performance;
}
