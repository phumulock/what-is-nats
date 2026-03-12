"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

const CHUNKS = ["Chunk 1", "Chunk 2", "Chunk 3", "Chunk 4"];

export function ObjectStoreDemo() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(4, 2500);

  // step 0: file shown, ready to store
  // step 1: file splits into chunks
  // step 2: chunks stored in JetStream stream
  // step 3: reader reassembles chunks back into file

  return (
    <div className="border border-border rounded-lg overflow-hidden" {...containerProps}>
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Source file */}
          <div className="flex flex-col items-center gap-2 min-w-[80px]">
            <div className="text-xs text-gray-500 mb-1">FILE</div>
            <motion.div
              animate={{
                opacity: step <= 2 ? 1 : 0.4,
                scale: step === 0 ? 1 : 0.9,
              }}
              className="w-16 h-20 rounded border-2 border-accent-blue bg-accent-blue/10 flex flex-col items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-accent-blue mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span className="text-[10px] text-accent-blue">model.bin</span>
              <span className="text-[10px] text-gray-600">1.2 GB</span>
            </motion.div>
          </div>

          {/* Arrow / split indicator */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{ opacity: step >= 1 ? 1 : 0.3 }}
              className="text-gray-500 text-lg"
            >
              {step <= 2 ? "→" : "←"}
            </motion.div>
            <motion.span
              animate={{ opacity: step >= 1 ? 1 : 0 }}
              className="text-[10px] text-gray-600"
            >
              {step <= 2 ? "chunk" : "reassemble"}
            </motion.span>
          </div>

          {/* Chunks / JetStream stream */}
          <div className="flex-1 max-w-[240px]">
            <div className="text-xs text-gray-500 mb-1 text-center">
              JETSTREAM STREAM
            </div>
            <div className="border border-border rounded bg-surface p-2 space-y-1.5">
              {CHUNKS.map((chunk, i) => (
                <motion.div
                  key={chunk}
                  animate={{
                    opacity: step >= 1 ? 1 : 0.2,
                    x: step >= 1 ? 0 : -10,
                    backgroundColor:
                      step === 3
                        ? "rgba(74, 222, 128, 0.15)"
                        : step >= 2
                          ? "rgba(96, 165, 250, 0.15)"
                          : COLORS.terminalBg,
                    borderColor:
                      step === 3
                        ? COLORS.green
                        : step >= 2
                          ? COLORS.blue
                          : COLORS.border,
                  }}
                  transition={{ delay: step >= 1 ? i * 0.1 : 0 }}
                  className="flex items-center justify-between text-xs p-1.5 rounded border"
                >
                  <span className="text-gray-400">{chunk}</span>
                  <span className="text-gray-600 text-[10px]">
                    seq {i + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{ opacity: step >= 3 ? 1 : 0.3 }}
              className="text-gray-500 text-lg"
            >
              →
            </motion.div>
            <motion.span
              animate={{ opacity: step >= 3 ? 1 : 0 }}
              className="text-[10px] text-gray-600"
            >
              read
            </motion.span>
          </div>

          {/* Reassembled file */}
          <div className="flex flex-col items-center gap-2 min-w-[80px]">
            <div className="text-xs text-gray-500 mb-1">READER</div>
            <motion.div
              animate={{
                opacity: step === 3 ? 1 : 0.3,
                scale: step === 3 ? 1 : 0.9,
                borderColor: step === 3 ? COLORS.green : COLORS.border,
              }}
              className="w-16 h-20 rounded border-2 bg-accent-green/5 flex flex-col items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-accent-green mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ opacity: step === 3 ? 1 : 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span className="text-[10px] text-accent-green" style={{ opacity: step === 3 ? 1 : 0.3 }}>
                model.bin
              </span>
              <span className="text-[10px] text-gray-600" style={{ opacity: step === 3 ? 1 : 0.3 }}>
                1.2 GB
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="p-3 text-center text-sm text-gray-500 border-t border-border">
        {step === 0 && "Large file ready to store..."}
        {step === 1 && (
          <span className="text-accent-blue">
            File split into 4 chunks automatically
          </span>
        )}
        {step === 2 && (
          <span className="text-accent-blue">
            Chunks stored & replicated in JetStream
          </span>
        )}
        {step === 3 && (
          <span className="text-accent-green">
            Reader fetches chunks → reassembled into original file
          </span>
        )}
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
