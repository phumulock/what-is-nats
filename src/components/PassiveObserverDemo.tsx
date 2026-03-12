"use client";

import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

export function PassiveObserverDemo() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(5, 3000);

  const loggerOnline = step <= 1 || step === 4;
  const dashboardReceiving = step === 1 || step === 3 || step === 4;
  const loggerReceiving = step === 1 || step === 4;
  const messageLost = step === 3;

  const tempValue = step === 1 ? "72°F" : step === 3 ? "73°F" : step === 4 ? "74°F" : null;
  const sensorActive = tempValue !== null;

  return (
    <div className="border border-border rounded-lg p-6 bg-surface" {...containerProps}>
      <div className="flex items-start justify-between gap-4">
        {/* Publisher: Sensor */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <motion.div
            animate={{
              borderColor: sensorActive ? COLORS.green : COLORS.border,
              boxShadow: sensorActive ? `0 0 12px ${COLORS.green}40` : "0 0 0px transparent",
            }}
            className="w-16 h-16 rounded-lg bg-terminal-bg border flex items-center justify-center text-xs"
          >
            Sensor
          </motion.div>
          <span className="text-xs text-gray-500">Publisher</span>
        </div>

        {/* Center: message lanes + NATS */}
        <div className="flex-1 flex flex-col items-center gap-2">
          {/* Incoming message lane */}
          <div className="relative w-full h-8">
            <AnimatePresence mode="wait">
              {tempValue && (
                <motion.div
                  key={`msg-in-${step}`}
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: "40%", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                >
                  <div className="px-2 py-1 bg-accent-green text-black text-xs rounded whitespace-nowrap">
                    temp: {tempValue}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* NATS server + ghosted labels */}
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: sensorActive
                  ? "0 0 16px rgba(74, 222, 128, 0.3)"
                  : "0 0 0px transparent",
              }}
              className="w-20 h-20 rounded-full bg-terminal-bg border-2 border-accent-green flex items-center justify-center"
            >
              <span className="text-accent-green text-xs font-bold">NATS</span>
            </motion.div>

            {/* Ghosted "No ACK" label */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  className="absolute -left-16 top-1 text-xs border border-dashed rounded px-1.5 py-0.5 line-through"
                  style={{ borderColor: COLORS.red, color: COLORS.red }}
                >
                  No ACK
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ghosted "No disk" label */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  className="absolute -left-16 top-7 text-xs border border-dashed rounded px-1.5 py-0.5 line-through"
                  style={{ borderColor: COLORS.red, color: COLORS.red }}
                >
                  No disk
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Outgoing message lanes */}
          <div className="relative w-full h-8">
            <AnimatePresence mode="wait">
              {/* Message delivered to active subscribers */}
              {(step === 1 || step === 3 || step === 4) && (
                <motion.div
                  key={`msg-out-${step}`}
                  initial={{ opacity: 0, x: "30%" }}
                  animate={{ opacity: 1, x: "70%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                >
                  <div className="px-1.5 py-0.5 bg-accent-green text-black rounded font-bold" style={{ fontSize: "0.6rem" }}>
                    MSG
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lost message fading out (step 3 — Logger offline) */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0.6, x: "30%" }}
                animate={{ opacity: 0, x: "55%" }}
                transition={{ duration: 1.5 }}
                className="absolute left-0 top-0"
              >
                <div className="px-1.5 py-0.5 bg-accent-yellow text-black rounded font-bold" style={{ fontSize: "0.6rem" }}>
                  LOST
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Subscribers */}
        <div className="flex flex-col gap-3 shrink-0">
          {/* Dashboard */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{
                borderColor: dashboardReceiving ? COLORS.green : COLORS.border,
                boxShadow: dashboardReceiving ? `0 0 12px ${COLORS.green}40` : "0 0 0px transparent",
              }}
              className="w-20 h-12 rounded-lg bg-terminal-bg border flex items-center justify-center text-xs"
            >
              Dashboard
            </motion.div>
            <span className="text-xs text-accent-green">online</span>
          </div>

          {/* Logger */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{
                borderColor: loggerReceiving
                  ? COLORS.green
                  : loggerOnline
                    ? COLORS.border
                    : COLORS.red,
                opacity: loggerOnline ? 1 : 0.4,
                borderStyle: loggerOnline ? "solid" : "dashed",
              }}
              transition={{ duration: 0.3 }}
              className="w-20 h-12 rounded-lg bg-terminal-bg border flex items-center justify-center text-xs"
              style={{ borderStyle: loggerOnline ? "solid" : "dashed" }}
            >
              Logger
            </motion.div>
            <motion.span
              animate={{ color: loggerOnline ? COLORS.green : COLORS.red }}
              className="text-xs"
            >
              {loggerOnline ? "online" : "offline"}
            </motion.span>
          </div>

          {/* "No replay" notice at step 4 */}
          <AnimatePresence>
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="text-center text-xs border border-dashed rounded px-2 py-1"
                style={{ borderColor: COLORS.yellow, color: COLORS.yellow }}
              >
                No replay, no backlog
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Status text */}
      <div className="mt-4 text-center text-sm min-h-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <span className="text-gray-500">
                Sensor, Dashboard, Logger — all connected to NATS
              </span>
            )}
            {step === 1 && (
              <span className="text-accent-green">
                temp: 72°F → both subscribers receive instantly
              </span>
            )}
            {step === 2 && (
              <span className="text-accent-red">
                Logger goes offline...
              </span>
            )}
            {step === 3 && (
              <span className="text-accent-yellow">
                temp: 73°F → Dashboard gets it. Logger misses it — message gone.
              </span>
            )}
            {step === 4 && (
              <span>
                <span className="text-accent-green">Logger reconnects.</span>{" "}
                <span className="text-gray-500">temp: 74°F delivered to both — but 73°F is gone forever</span>
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Key insight */}
      <div className="mt-4 pt-4 border-t border-border text-xs text-center">
        <span className="text-gray-500">Messages live in memory. Miss it and it&apos;s gone</span>
        <span className="text-white"> — that&apos;s the point.</span>
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
