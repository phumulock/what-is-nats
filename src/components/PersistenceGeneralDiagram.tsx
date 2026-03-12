"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

const SCENARIOS = [
  {
    label: "HAPPY PATH",
    labelColor: "text-accent-green",
    status: "Producer sends → Broker holds in memory → Consumer receives.",
    statusColor: "text-gray-500",
    producerActive: true,
    brokerState: "ok" as const,
    consumerState: "online" as const,
    msgState: "delivered" as const,
  },
  {
    label: "CONSUMER GOES DOWN",
    labelColor: "text-accent-yellow",
    status: "Consumer crashes. Messages have nowhere to go.",
    statusColor: "text-accent-yellow",
    producerActive: true,
    brokerState: "ok" as const,
    consumerState: "offline" as const,
    msgState: "stuck" as const,
  },
  {
    label: "MESSAGES PILE UP",
    labelColor: "text-accent-yellow",
    status: "Broker buffers grow. Memory fills. Now what?",
    statusColor: "text-accent-yellow",
    producerActive: true,
    brokerState: "pressure" as const,
    consumerState: "offline" as const,
    msgState: "piling" as const,
  },
  {
    label: "BROKER CRASHES",
    labelColor: "text-accent-red",
    status: "Broker restarts. In-memory messages? Gone.",
    statusColor: "text-accent-red",
    producerActive: false,
    brokerState: "crash" as const,
    consumerState: "offline" as const,
    msgState: "lost" as const,
  },
  {
    label: "THE FUNDAMENTAL TRADEOFF",
    labelColor: "text-accent-blue",
    status: "Write to disk before acknowledging? Safe, but slower.",
    statusColor: "text-accent-blue",
    producerActive: true,
    brokerState: "disk" as const,
    consumerState: "offline" as const,
    msgState: "persisted" as const,
  },
  {
    label: "REPLICATE FOR SAFETY",
    labelColor: "text-accent-blue",
    status: "Copy to multiple nodes? Even safer, even more overhead.",
    statusColor: "text-accent-blue",
    producerActive: true,
    brokerState: "replicated" as const,
    consumerState: "offline" as const,
    msgState: "replicated" as const,
  },
];

function BufferSlots({
  count,
  color,
  flash,
}: {
  count: number;
  color: string;
  flash?: boolean;
}) {
  return (
    <div className="flex gap-0.5 justify-center">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            backgroundColor: i < count ? color : "rgba(51,51,51,0.5)",
            scale: flash && i < count ? [1, 1.15, 1] : 1,
          }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          className="w-3 h-3 rounded-sm"
        />
      ))}
    </div>
  );
}

export function PersistenceGeneralDiagram() {
  const {
    step,
    isPlaying,
    play,
    pause,
    next,
    prev,
    totalSteps,
    containerProps,
  } = useDiagramPlayback(SCENARIOS.length, 2500);

  const s = SCENARIOS[step];

  const brokerBorder =
    s.brokerState === "crash"
      ? COLORS.red
      : s.brokerState === "pressure"
        ? COLORS.yellow
        : s.brokerState === "disk" || s.brokerState === "replicated"
          ? COLORS.blue
          : COLORS.green;

  const consumerBorder =
    s.consumerState === "online" ? COLORS.green : COLORS.red;

  const bufferCount =
    s.msgState === "piling"
      ? 4
      : s.msgState === "stuck"
        ? 2
        : s.msgState === "delivered"
          ? 1
          : s.msgState === "persisted" || s.msgState === "replicated"
            ? 2
            : 0;

  const bufferColor =
    s.msgState === "lost"
      ? "rgba(51,51,51,0.5)"
      : s.msgState === "piling"
        ? COLORS.yellow
        : s.msgState === "persisted" || s.msgState === "replicated"
          ? COLORS.blue
          : COLORS.green;

  return (
    <div
      className="border border-border rounded-lg p-6 bg-surface"
      {...containerProps}
    >
      {/* Phase label */}
      <div className="mb-4 text-center h-5">
        <motion.span
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs font-bold tracking-widest ${s.labelColor}`}
        >
          {s.label}
        </motion.span>
      </div>

      {/* Main row: Producer — Broker — Consumer */}
      <div className="flex items-start justify-between gap-4">
        {/* Producer */}
        <div className="flex flex-col items-center gap-2 w-20">
          <motion.div
            animate={{ opacity: s.producerActive ? 1 : 0.4 }}
            className="w-16 h-16 rounded-lg bg-terminal-bg border border-accent-green flex items-center justify-center text-xs text-accent-green"
          >
            Producer
          </motion.div>
        </div>

        {/* Arrow: Producer → Broker */}
        <div className="flex-1 flex flex-col items-center justify-center pt-5">
          <div className="relative w-full h-8">
            {/* Message animation */}
            {(s.msgState === "delivered" ||
              s.msgState === "stuck" ||
              s.msgState === "piling" ||
              s.msgState === "persisted" ||
              s.msgState === "replicated") && (
              <motion.div
                key={`msg-left-${step}`}
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: "100%", opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              >
                <div
                  className={`px-2 py-0.5 text-black text-[10px] rounded ${
                    s.msgState === "persisted" || s.msgState === "replicated"
                      ? "bg-accent-blue"
                      : s.msgState === "piling"
                        ? "bg-accent-yellow"
                        : "bg-accent-green"
                  }`}
                >
                  msg
                </div>
              </motion.div>
            )}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
          </div>
        </div>

        {/* Broker */}
        <div className="flex flex-col items-center gap-2 w-24">
          <motion.div
            animate={{ borderColor: brokerBorder }}
            className="relative w-20 h-16 rounded-lg bg-terminal-bg border-2 flex flex-col items-center justify-center gap-1"
          >
            <span className="text-xs text-gray-400">Broker</span>
            <BufferSlots
              count={bufferCount}
              color={bufferColor}
              flash={s.msgState === "piling"}
            />
            {/* Crash X */}
            {s.brokerState === "crash" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-red flex items-center justify-center text-white text-xs font-bold"
              >
                ✕
              </motion.div>
            )}
            {/* Disk icon */}
            {s.brokerState === "disk" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-accent-blue bg-surface px-1 border border-accent-blue rounded"
              >
                disk
              </motion.div>
            )}
            {/* Replicated icon */}
            {s.brokerState === "replicated" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-accent-blue bg-surface px-1 border border-accent-blue rounded whitespace-nowrap"
              >
                disk × 3
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Arrow: Broker → Consumer */}
        <div className="flex-1 flex flex-col items-center justify-center pt-5">
          <div className="relative w-full h-8">
            {s.msgState === "delivered" && (
              <motion.div
                key={`msg-right-${step}`}
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: "80%", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              >
                <div className="px-2 py-0.5 bg-accent-green text-black text-[10px] rounded">
                  msg
                </div>
              </motion.div>
            )}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
          </div>
        </div>

        {/* Consumer */}
        <div className="flex flex-col items-center gap-2 w-20">
          <motion.div
            animate={{
              borderColor: consumerBorder,
              opacity: s.consumerState === "online" ? 1 : 0.4,
            }}
            className="w-16 h-16 rounded-lg bg-terminal-bg border flex items-center justify-center text-xs"
            style={{ color: consumerBorder }}
          >
            Consumer
          </motion.div>
          <span
            className={`text-xs ${
              s.consumerState === "online"
                ? "text-accent-green"
                : "text-accent-red"
            }`}
          >
            {s.consumerState === "online" ? "online" : "offline"}
          </span>
        </div>
      </div>

      {/* Status text */}
      <div className="mt-6 text-center text-sm h-6">
        <motion.span
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={s.statusColor}
        >
          {s.status}
        </motion.span>
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
