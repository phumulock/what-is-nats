"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface DiagramRevealProps {
  children: ReactNode;
  label?: string;
}

export function DiagramReveal({
  children,
  label = "See More",
}: DiagramRevealProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });

  useEffect(() => {
    if (!isInView && open) {
      setOpen(false);
    }
  }, [isInView, open]);

  return (
    <div ref={ref} className="mt-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full border border-green-800 rounded-lg px-4 py-3 text-sm text-green-400 hover:text-white hover:bg-green-900/30 hover:border-green-500 transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        {open ? "Hide diagram" : label}
        <span
          className="inline-block transition-transform duration-200"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▸
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
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
