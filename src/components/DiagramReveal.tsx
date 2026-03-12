"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface DiagramRevealProps {
  children: ReactNode;
}

export function DiagramReveal({ children }: DiagramRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });

  return (
    <div className="mt-6" ref={ref}>
      <motion.div
        animate={{ opacity: isInView ? 1 : 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="pt-4">{children}</div>
      </motion.div>
    </div>
  );
}
