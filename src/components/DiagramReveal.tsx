"use client";

import { useRef, ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface DiagramRevealProps {
  children: ReactNode;
}

export function DiagramReveal({ children }: DiagramRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });

  return (
    <div className="mt-6" ref={ref}>
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
