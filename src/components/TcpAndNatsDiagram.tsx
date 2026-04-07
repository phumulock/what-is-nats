"use client";

import { motion } from "framer-motion";
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

// Steps:
// 0: TCP foundation title
// 1-3: TCP provides items appear
// 4: "But at scale..." divider
// 5-7: Problem items appear (with problem detail)
// 8: Transition — "NATS builds on top of TCP"
// 9-11: NATS solutions reveal on each problem card
// 12: Final summary
const TOTAL_STEPS = 13;

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

  return (
    <div
      className="border border-border rounded-lg p-6 bg-surface"
      {...containerProps}
    >
      {/* TCP Foundation */}
      <motion.div
        animate={{ opacity: step >= 0 ? 1 : 0 }}
        className="text-center mb-4"
      >
        <span className="text-xs font-mono text-gray-200 border border-border rounded-full px-3 py-1">
          TCP &mdash; The Foundation
        </span>
      </motion.div>

      {/* TCP provides */}
      <div className="flex flex-col md:flex-row md:gap-3 gap-2 mb-4">
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

      {/* "But at scale..." divider */}
      <motion.div
        animate={{ opacity: step >= 4 ? 1 : 0, scale: step >= 4 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="my-4 flex items-center gap-3"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent-red/40" />
        <span className="text-xs text-accent-red font-mono whitespace-nowrap">
          at millions of msg/sec
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent-red/40" />
      </motion.div>

      {/* Problem + Solution cards */}
      <div className="space-y-3">
        {PROBLEMS_AND_SOLUTIONS.map((item, i) => (
          <motion.div
            key={item.problem}
            animate={{
              opacity: step >= i + 5 ? 1 : 0,
              x: step >= i + 5 ? 0 : -16,
            }}
            transition={{ duration: 0.4 }}
            className="rounded-lg border overflow-hidden"
            style={{
              borderColor:
                step >= i + 9
                  ? `${item.solutionColor}30`
                  : step >= i + 5
                    ? `${item.problemColor}30`
                    : COLORS.border,
            }}
          >
            {/* TCP problem */}
            <div
              className="flex items-start gap-3 p-3"
              style={{ backgroundColor: `${item.problemColor}06` }}
            >
              <div
                className="flex-shrink-0 text-xs font-mono px-2 py-0.5 rounded border mt-0.5"
                style={{
                  color: step >= i + 9 ? `${item.problemColor}80` : item.problemColor,
                  borderColor: `${item.problemColor}${step >= i + 9 ? "30" : "50"}`,
                }}
              >
                {step >= i + 9 ? "TCP" : "PROBLEM"}
              </div>
              <div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: step >= i + 9 ? `${item.problemColor}80` : item.problemColor,
                  }}
                >
                  {item.problem}
                </span>
                {step < i + 9 && (
                  <p className="text-xs text-gray-200 mt-1">{item.problemDetail}</p>
                )}
              </div>
            </div>

            {/* NATS solution */}
            <motion.div
              animate={{
                opacity: step >= i + 9 ? 1 : 0,
                height: step >= i + 9 ? "auto" : 0,
              }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div
                className="flex items-start gap-3 p-3 border-t"
                style={{
                  borderColor: `${item.solutionColor}20`,
                  backgroundColor: `${item.solutionColor}06`,
                }}
              >
                <div
                  className="flex-shrink-0 text-xs font-mono px-2 py-0.5 rounded border mt-0.5"
                  style={{
                    color: item.solutionColor,
                    borderColor: `${item.solutionColor}50`,
                  }}
                >
                  NATS
                </div>
                <span className="text-sm" style={{ color: item.solutionColor }}>
                  {item.solution}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* NATS transition badge */}
      <motion.div
        animate={{ opacity: step >= 8 ? 1 : 0, scale: step >= 8 ? 1 : 0.9 }}
        transition={{ duration: 0.4 }}
        className="text-center my-4"
      >
        <span className="text-xs font-mono text-accent-green border border-accent-green/30 rounded-full px-3 py-1">
          NATS builds on top of TCP
        </span>
      </motion.div>

      {/* Final summary */}
      <motion.div
        animate={{ opacity: step >= 12 ? 1 : 0 }}
        className="p-4 border border-accent-green/30 rounded-lg bg-accent-green/5 text-center"
      >
        <p className="text-sm text-accent-green">
          Keep TCP&apos;s reliability. Replace what doesn&apos;t work at scale.
        </p>
        <p className="text-xs text-gray-200 mt-1">
          Own connection management, own buffering, own failure detection.
        </p>
      </motion.div>

      {/* Status text */}
      <div className="mt-4 text-center text-sm min-h-10">
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
