"use client";

import { ReactNode, useRef, useEffect } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import { useSpotlight } from "./SpotlightContext";

interface RevealSectionProps {
  children: ReactNode;
  isSpotlight?: boolean;
}

export function RevealSection({ children, isSpotlight = false }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const { dimAmount, register } = useSpotlight();

  useEffect(() => {
    if (!isSpotlight || !ref.current) return;
    return register(ref.current);
  }, [isSpotlight, register]);

  const opacity = useTransform(dimAmount, [0, 1], [1, 0.1]);

  return (
    <motion.div
      className={isSpotlight ? "py-32" : undefined}
      style={isSpotlight ? undefined : { opacity }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
