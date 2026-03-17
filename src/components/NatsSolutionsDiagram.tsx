"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

const SOLUTIONS = [
  {
    problem: "Head-of-Line Blocking",
    solution: "Disconnects slow consumers instead of stalling",
    problemColor: COLORS.red,
    solutionColor: COLORS.green,
  },
  {
    problem: "Unpredictable Buffering",
    solution: "Application-level write buffers with controlled flush",
    problemColor: COLORS.orange,
    solutionColor: COLORS.green,
  },
  {
    problem: "Slow Failure Detection",
    solution: "Ping/pong liveness checks detect failures in seconds",
    problemColor: COLORS.yellow,
    solutionColor: COLORS.green,
  },
];

// Steps:
// 0: Title
// 1-3: Solutions appear one by one
// 4: Final summary
const TOTAL_STEPS = 5;

export function NatsSolutionsDiagram() {
  const {
    step,
    isPlaying,
    play,
    pause,
    next,
    prev,
    totalSteps,
    containerProps,
  } = useDiagramPlayback(TOTAL_STEPS, 2500);

  return (
    <div
      className="border border-border rounded-lg p-6 bg-surface"
      {...containerProps}
    >
      {/* Title */}
      <motion.div
        animate={{ opacity: step >= 0 ? 1 : 0 }}
        className="text-center mb-4"
      >
        <span className="text-xs font-mono text-accent-green border border-accent-green/30 rounded-full px-3 py-1">
          Nats builds on top of Tcp
        </span>
      </motion.div>

      {/* Solution cards */}
      <div className="space-y-3">
        {SOLUTIONS.map((item, i) => (
          <motion.div
            key={item.problem}
            animate={{
              opacity: step >= i + 1 ? 1 : 0,
              x: step >= i + 1 ? 0 : -16,
            }}
            transition={{ duration: 0.4 }}
            className="rounded-lg border overflow-hidden"
            style={{
              borderColor: step >= i + 1 ? `${item.solutionColor}30` : COLORS.border,
            }}
          >
            {/* TCP problem (faded reference) */}
            <div className="flex items-start gap-3 p-3 bg-terminal-bg">
              <div
                className="flex-shrink-0 text-[10px] font-mono px-2 py-0.5 rounded border mt-0.5"
                style={{
                  color: `${item.problemColor}80`,
                  borderColor: `${item.problemColor}30`,
                }}
              >
                Tcp
              </div>
              <span
                className="text-sm"
                style={{ color: `${item.problemColor}80` }}
              >
                {item.problem}
              </span>
            </div>

            {/* NATS solution (highlighted) */}
            <div
              className="flex items-start gap-3 p-3 border-t"
              style={{
                borderColor: `${item.solutionColor}20`,
                backgroundColor: `${item.solutionColor}06`,
              }}
            >
              <div
                className="flex-shrink-0 text-[10px] font-mono px-2 py-0.5 rounded border mt-0.5"
                style={{
                  color: item.solutionColor,
                  borderColor: `${item.solutionColor}50`,
                }}
              >
                Nats
              </div>
              <span className="text-sm" style={{ color: item.solutionColor }}>
                {item.solution}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Final summary */}
      <motion.div
        animate={{ opacity: step >= 4 ? 1 : 0 }}
        className="mt-6 p-4 border border-accent-green/30 rounded-lg bg-accent-green/5 text-center"
      >
        <p className="text-sm text-accent-green">
          Keep Tcp&apos;s reliability. Replace what doesn&apos;t work at scale.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Own connection management, own buffering, own failure detection.
        </p>
      </motion.div>

      {/* Status text */}
      <div className="mt-4 text-center text-sm min-h-[20px]">
        {step === 0 && (
          <span className="text-gray-500">
            Nats doesn&apos;t fight Tcp&mdash;it builds on top...
          </span>
        )}
        {step === 1 && (
          <span className="text-accent-green">
            Slow consumers get cut off, not buffered...
          </span>
        )}
        {step === 2 && (
          <span className="text-accent-green">
            Application-level buffers replace unpredictable kernel behavior...
          </span>
        )}
        {step === 3 && (
          <span className="text-accent-green">
            Ping/pong detects failures in seconds, not minutes...
          </span>
        )}
        {step === 4 && (
          <span className="text-accent-green">
            Pragmatic engineering&mdash;keep what works, replace what doesn&apos;t.
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
