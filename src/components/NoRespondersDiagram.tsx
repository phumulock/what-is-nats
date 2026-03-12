"use client";

import { motion } from "framer-motion";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";
import { COLORS } from "@/lib/colors";

export function NoRespondersDiagram() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(4, 2500);

  return (
    <div className="border border-border rounded-lg p-6 bg-surface" {...containerProps}>
      <div className="flex items-center justify-between gap-4">
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

        {/* NATS Server */}
        <div className="flex-1 flex flex-col items-center gap-2 relative">
          {/* Request arrow */}
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

          {/* No responders reply */}
          <div className="h-6 flex items-center justify-center w-full">
            {step === 2 && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-2 py-1 bg-accent-red text-white text-xs rounded font-medium"
              >
                no responders
              </motion.div>
            )}
          </div>
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

      <div className="mt-4 text-center text-sm text-gray-500">
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
