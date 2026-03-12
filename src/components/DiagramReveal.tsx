"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DiagramRevealProps {
  children: ReactNode;
}

export function DiagramReveal({ children }: DiagramRevealProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full border border-green-800 rounded-lg px-4 py-3 text-sm text-green-400 hover:text-white hover:bg-green-900/30 hover:border-green-500 transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        {open ? "Hide diagram" : "Show diagram"}
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
