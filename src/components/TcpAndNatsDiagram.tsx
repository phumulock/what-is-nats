"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

const TCP_PROVIDES = [
  { label: "Retransmission", desc: "Resends lost packets automatically", color: COLORS.green },
  { label: "Congestion Control", desc: "Adjusts flow to avoid overload", color: COLORS.blue },
  { label: "Ordered Delivery", desc: "Packets arrive in sequence", color: COLORS.purple },
];

const PROBLEMS_AND_SOLUTIONS = [
  {
    problem: "Head-of-Line Blocking",
    problemDetail: "One lost packet stalls everything behind it",
    solution: "Disconnects slow consumers instead of stalling",
    problemColor: COLORS.red,
    solutionColor: COLORS.green,
  },
  {
    problem: "Unpredictable Buffering",
    problemDetail: "Kernel buffers can balloon, adding latency spikes",
    solution: "Application-level write buffers with controlled flush",
    problemColor: COLORS.orange,
    solutionColor: COLORS.green,
  },
  {
    problem: "Slow Failure Detection",
    problemDetail: "TCP keepalives take minutes to detect dead peers",
    solution: "Ping/pong liveness checks detect failures in seconds",
    problemColor: COLORS.yellow,
    solutionColor: COLORS.green,
  },
];

// Phase 1 (steps 0-3): TCP foundation + what TCP provides
// Phase 2 (steps 4-12): "at scale" problems + NATS solutions + summary
const TOTAL_STEPS = 13;

const pageSwap = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export function TcpAndNatsDiagram() {
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

  const inPhase2 = step >= 4;

  return (
    <div
      className="border border-border rounded-lg p-4 md:p-6 bg-surface"
      {...containerProps}
    >
      {/* Swappable content area */}
      <LayoutGroup>
      <motion.div layout transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}>
      <AnimatePresence mode="popLayout">
        {!inPhase2 ? (
          <motion.div key="tcp" layout {...pageSwap}>
            {/* Phase 1: TCP Foundation */}
            <div className="text-center mb-3">
              <span className="text-xs font-mono text-gray-200 border border-border rounded-full px-3 py-1">
                TCP &mdash; The Foundation
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-3">
              {TCP_PROVIDES.map((item, i) => (
                <motion.div
                  key={item.label}
                  animate={{
                    opacity: step >= i + 1 ? 1 : 0,
                    y: step >= i + 1 ? 0 : 10,
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 text-center p-3 rounded-lg border"
                  style={{
                    borderColor: step >= i + 1 ? `${item.color}40` : COLORS.border,
                    backgroundColor: step >= i + 1 ? `${item.color}08` : "transparent",
                  }}
                >
                  <div className="text-xs font-medium" style={{ color: item.color }}>
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-200 mt-1">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="problems" layout {...pageSwap}>
            {/* Phase 2: At scale — problems & NATS solutions */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent-red/40" />
              <span className="text-xs text-accent-red font-mono whitespace-nowrap">
                at millions of msg/sec
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent-red/40" />
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-3">
              {PROBLEMS_AND_SOLUTIONS.map((item, i) => {
                const visible = step >= i + 5;
                const solved = step >= i + 9;

                return (
                  <motion.div
                    key={item.problem}
                    animate={{
                      opacity: visible ? 1 : 0,
                      y: visible ? 0 : 10,
                    }}
                    transition={{ duration: 0.4 }}
                    className="flex-1 rounded-lg border p-3"
                    style={{
                      borderColor: solved
                        ? `${item.solutionColor}30`
                        : visible
                          ? `${item.problemColor}30`
                          : COLORS.border,
                      backgroundColor: solved
                        ? `${item.solutionColor}06`
                        : `${item.problemColor}06`,
                    }}
                  >
                    {/* Badge */}
                    <div
                      className="inline-block text-xs font-mono px-2 py-0.5 rounded border mb-1"
                      style={{
                        color: solved ? item.solutionColor : item.problemColor,
                        borderColor: solved ? `${item.solutionColor}50` : `${item.problemColor}50`,
                      }}
                    >
                      {solved ? "NATS" : "TCP"}
                    </div>
                    {/* Title — always visible */}
                    <div
                      className="text-sm font-medium"
                      style={{ color: solved ? item.solutionColor : item.problemColor }}
                    >
                      {item.problem}
                    </div>
                    {/* Detail swaps: problem detail → solution */}
                    <AnimatePresence mode="wait">
                      {solved ? (
                        <motion.p
                          key="solution"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-xs mt-1"
                          style={{ color: item.solutionColor }}
                        >
                          {item.solution}
                        </motion.p>
                      ) : (
                        <motion.p
                          key="problem"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-xs text-gray-200 mt-1"
                        >
                          {item.problemDetail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
      </LayoutGroup>

      {/* Status text */}
      <div className="mt-3 text-center text-sm min-h-10">
        {step === 0 && (
          <span className="text-gray-200">TCP was built for reliable communication...</span>
        )}
        {step >= 1 && step <= 3 && (
          <span className="text-gray-200">The kernel handles retransmission, congestion, and ordering...</span>
        )}
        {step === 4 && (
          <span className="text-accent-red">But at high throughput, these features become liabilities...</span>
        )}
        {step === 5 && (
          <span className="text-accent-red">One lost packet blocks everything behind it...</span>
        )}
        {step === 6 && (
          <span className="text-accent-orange">Kernel buffers grow unpredictably under load...</span>
        )}
        {step === 7 && (
          <span className="text-accent-yellow">TCP keepalives take minutes&mdash;too slow for real-time...</span>
        )}
        {step === 8 && (
          <span className="text-accent-green">NATS doesn&apos;t fight TCP&mdash;it builds on top...</span>
        )}
        {step === 9 && (
          <span className="text-accent-green">Slow consumers get cut off, not buffered...</span>
        )}
        {step === 10 && (
          <span className="text-accent-green">Application-level buffers replace unpredictable kernel behavior...</span>
        )}
        {step === 11 && (
          <span className="text-accent-green">Ping/pong detects failures in seconds, not minutes...</span>
        )}
        {step === 12 && (
          <span className="text-accent-green">Pragmatic engineering&mdash;keep what works, replace what doesn&apos;t.</span>
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
