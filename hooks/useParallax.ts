import { useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject } from "react";

export function useParallax(ref: RefObject<HTMLElement>, distance = 200) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return { y, opacity, scrollYProgress };
}

export function useParallaxY(value: MotionValue<number>, distance = 100) {
  return useTransform(value, [0, 1], [0, distance]);
}
