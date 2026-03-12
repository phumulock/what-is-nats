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

const TCP_PROBLEMS = [
  {
    problem: "Head-of-Line Blocking",
    detail: "One lost packet stalls everything behind it",
    color: COLORS.red,
  },
  {
    problem: "Unpredictable Buffering",
    detail: "Kernel buffers can balloon, adding latency spikes",
    color: COLORS.orange,
  },
  {
    problem: "Slow Failure Detection",
    detail: "TCP keepalives take minutes to detect dead peers",
    color: COLORS.yellow,
  },
];

// Steps:
// 0: TCP foundation title
// 1-3: TCP provides items appear
// 4: "But at scale..." divider
// 5-7: Problem items appear
// 8: Final summary
const TOTAL_STEPS = 9;

export function TcpDiagram() {
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
        <span className="text-xs font-mono text-gray-500 border border-border rounded-full px-3 py-1">
          TCP &mdash; The Foundation
        </span>
      </motion.div>

      {/* What TCP provides */}
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {TCP_PROVIDES.map((item, i) => (
          <motion.div
            key={item.label}
            animate={{
              opacity: step >= i + 1 ? 1 : 0,
              y: step >= i + 1 ? 0 : 10,
            }}
            transition={{ duration: 0.4 }}
            className="text-center p-3 rounded-lg border"
            style={{
              borderColor: step >= i + 1 ? `${item.color}40` : COLORS.border,
              backgroundColor: step >= i + 1 ? `${item.color}08` : "transparent",
            }}
          >
            <div className="text-xs font-medium" style={{ color: item.color }}>
              {item.label}
            </div>
            <div className="text-[10px] text-gray-600 mt-1">{item.desc}</div>
          </motion.div>
        ))}
      </div>

      {/* "But at scale..." divider */}
      <motion.div
        animate={{ opacity: step >= 4 ? 1 : 0, scaleX: step >= 4 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="my-6 flex items-center gap-3"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent-red/40" />
        <span className="text-xs text-accent-red font-mono whitespace-nowrap">
          at millions of msg/sec
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent-red/40" />
      </motion.div>

      {/* Problems at scale */}
      <div className="space-y-3">
        {TCP_PROBLEMS.map((item, i) => (
          <motion.div
            key={item.problem}
            animate={{
              opacity: step >= i + 5 ? 1 : 0,
              x: step >= i + 5 ? 0 : -16,
            }}
            transition={{ duration: 0.4 }}
            className="rounded-lg border overflow-hidden"
            style={{ borderColor: `${item.color}30` }}
          >
            <div
              className="flex items-start gap-3 p-3"
              style={{ backgroundColor: `${item.color}06` }}
            >
              <div
                className="flex-shrink-0 text-[10px] font-mono px-2 py-0.5 rounded border mt-0.5"
                style={{ color: item.color, borderColor: `${item.color}50` }}
              >
                PROBLEM
              </div>
              <div className="min-w-0">
                <span className="text-sm font-medium" style={{ color: item.color }}>
                  {item.problem}
                </span>
                <p className="text-[11px] text-gray-600 mt-0.5">{item.detail}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Final summary */}
      <motion.div
        animate={{ opacity: step >= 8 ? 1 : 0 }}
        className="mt-6 p-4 border border-accent-red/20 rounded-lg bg-accent-red/5 text-center"
      >
        <p className="text-sm text-gray-300">
          Reliable. Ordered. But not built for millions of messages per second.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          These aren&apos;t bugs&mdash;they&apos;re trade-offs from a protocol designed
          before high-throughput messaging existed.
        </p>
      </motion.div>

      {/* Status text */}
      <div className="mt-4 text-center text-sm min-h-[20px]">
        {step === 0 && (
          <span className="text-gray-500">TCP was built for reliable communication...</span>
        )}
        {step >= 1 && step <= 3 && (
          <span className="text-gray-500">The kernel handles retransmission, congestion, and ordering...</span>
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
          <span className="text-gray-300">A solid foundation&mdash;but messaging needs more.</span>
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
