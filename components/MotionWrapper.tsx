"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { ReactNode } from "react";

interface MotionWrapperProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  lowPerformanceFallback?: ReactNode;
}

interface MotionSectionProps extends Omit<HTMLMotionProps<"section">, "children"> {
  children: ReactNode;
  lowPerformanceFallback?: ReactNode;
}

interface MotionSpanProps extends Omit<HTMLMotionProps<"span">, "children"> {
  children: ReactNode;
  lowPerformanceFallback?: ReactNode;
}

/**
 * Performance-aware motion wrapper
 * - LOW: No animations (instant render) or custom fallback
 * - MEDIUM: Fast animations (50% duration)
 * - HIGH: Full animations
 */
export function MotionDiv({ children, lowPerformanceFallback, ...props }: MotionWrapperProps) {
  const { level } = useDevicePerformance();

  // For LOW performance, disable animations
  if (level === "LOW") {
    if (lowPerformanceFallback) {
      return <>{lowPerformanceFallback}</>;
    }
    // Render as regular div without animations
    return <div className={props.className}>{children}</div>;
  }

  // For MEDIUM, reduce animation duration
  if (level === "MEDIUM" && props.transition) {
    const modifiedTransition = {
      ...props.transition,
      duration: typeof props.transition.duration === "number"
        ? props.transition.duration * 0.5
        : undefined,
    };
    return (
      <motion.div {...props} transition={modifiedTransition}>
        {children}
      </motion.div>
    );
  }

  // For HIGH, render normally
  return <motion.div {...props}>{children}</motion.div>;
}

export function MotionSection({ children, lowPerformanceFallback, ...props }: MotionSectionProps) {
  const { level } = useDevicePerformance();

  if (level === "LOW") {
    if (lowPerformanceFallback) {
      return <>{lowPerformanceFallback}</>;
    }
    return <section className={props.className}>{children}</section>;
  }

  if (level === "MEDIUM" && props.transition) {
    const modifiedTransition = {
      ...props.transition,
      duration: typeof props.transition.duration === "number"
        ? props.transition.duration * 0.5
        : undefined,
    };
    return (
      <motion.section {...props} transition={modifiedTransition}>
        {children}
      </motion.section>
    );
  }

  return <motion.section {...props}>{children}</motion.section>;
}

export function MotionSpan({ children, lowPerformanceFallback, ...props }: MotionSpanProps) {
  const { level } = useDevicePerformance();

  if (level === "LOW") {
    if (lowPerformanceFallback) {
      return <>{lowPerformanceFallback}</>;
    }
    return <span className={props.className}>{children}</span>;
  }

  if (level === "MEDIUM" && props.transition) {
    const modifiedTransition = {
      ...props.transition,
      duration: typeof props.transition.duration === "number"
        ? props.transition.duration * 0.5
        : undefined,
    };
    return (
      <motion.span {...props} transition={modifiedTransition}>
        {children}
      </motion.span>
    );
  }

  return <motion.span {...props}>{children}</motion.span>;
}
