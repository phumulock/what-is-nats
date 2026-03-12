"use client";

import { motion } from "framer-motion";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";
import { COLORS } from "@/lib/colors";

export function NoRespondersDiagram() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(4, 2500);

  return (
    <div className="border border-border rounded-lg p-4 md:p-6 bg-surface" {...containerProps}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        {/* Requester */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{
              borderColor:
                step === 0
                  ? COLORS.green
                  : step === 3
                    ? COLORS.red
                    : COLORS.border,
            }}
            className="w-16 h-16 rounded-lg bg-terminal-bg border flex items-center justify-center text-xs"
          >
            REQ
          </motion.div>
          <span className="text-xs text-gray-500">Requester</span>
        </div>

        {/* Mobile: vertical request arrow */}
        <div className="flex md:hidden items-center justify-center w-8 h-10 relative">
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border" />
          {step === 1 && (
            <motion.div
              key={`req-v-${step}`}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 20, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 z-10"
            >
              <div className="px-2 py-0.5 bg-accent-green text-black text-[10px] rounded">
                request
              </div>
            </motion.div>
          )}
        </div>

        {/* Desktop: horizontal arrows + NATS */}
        <div className="hidden md:flex flex-1 flex-col items-center gap-2 relative">
          <div className="h-6 flex items-center justify-center w-full">
            {step === 1 && (
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="px-2 py-1 bg-accent-green text-black text-xs rounded"
              >
                request
              </motion.div>
            )}
          </div>

          <motion.div
            animate={{
              borderColor: step === 2 ? COLORS.red : COLORS.green,
            }}
            className="w-20 h-20 rounded-full bg-terminal-bg border-2 flex items-center justify-center"
          >
            <span
              className="text-xs font-bold"
              style={{ color: step === 2 ? "var(--accent-red)" : "var(--accent-green)" }}
            >
              NATS
            </span>
          </motion.div>

          <div className="h-6 flex items-center justify-center w-full">
            <motion.div
              animate={{ scale: step === 2 ? 1 : 0.5, opacity: step === 2 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="px-2 py-1 bg-accent-red text-white text-xs rounded font-medium"
              style={{ pointerEvents: step === 2 ? "auto" : "none" }}
            >
              no responders
            </motion.div>
          </div>
        </div>

        {/* Mobile: NATS circle */}
        <div className="flex md:hidden flex-col items-center gap-2">
          <motion.div
            animate={{
              borderColor: step === 2 ? COLORS.red : COLORS.green,
            }}
            className="w-20 h-20 rounded-full bg-terminal-bg border-2 flex items-center justify-center"
          >
            <span
              className="text-xs font-bold"
              style={{ color: step === 2 ? "var(--accent-red)" : "var(--accent-green)" }}
            >
              NATS
            </span>
          </motion.div>
          <motion.div
            animate={{ scale: step === 2 ? 1 : 0.5, opacity: step === 2 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="px-2 py-1 bg-accent-red text-white text-xs rounded font-medium"
            style={{ pointerEvents: step === 2 ? "auto" : "none" }}
          >
            no responders
          </motion.div>
        </div>

        {/* Mobile: vertical arrow to empty slot */}
        <div className="flex md:hidden items-center justify-center w-8 h-6 relative">
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border" />
        </div>

        {/* Empty responder slot */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{
              borderColor: COLORS.border,
              opacity: step >= 1 ? 0.3 : 0.5,
            }}
            className="w-16 h-16 rounded-lg bg-terminal-bg border border-dashed flex items-center justify-center text-xs text-gray-600"
          >
            ???
          </motion.div>
          <span className="text-xs text-gray-600">No subscribers</span>
        </div>
      </div>

      <div className="mt-6 text-center text-sm min-h-10 text-gray-500">
        {step === 0 && "Requester sends a request to a subject"}
        {step === 1 && "NATS checks for subscribers on that subject..."}
        {step === 2 && "No one is listening — NATS responds immediately"}
        {step === 3 && "Requester gets instant feedback, no timeout wait"}
      </div>

      <DiagramControls
        step={step}
        totalSteps={totalSteps}
        isPlaying={isPlaying}
        onPlay={play}
        onPause={pause}
        onNext={next}
        onPrev={prev}
      />
    </div>
  );
}
