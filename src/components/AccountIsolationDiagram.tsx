"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

export function AccountIsolationDiagram() {
  const {
    step,
    isPlaying,
    play,
    pause,
    next,
    prev,
    totalSteps,
    containerProps,
  } = useDiagramPlayback(5, 2500);

  const showBridge = step >= 3;
  const showBridgeMessage = step >= 4;

  return (
    <div
      className="border border-border rounded-lg overflow-hidden bg-surface"
      {...containerProps}
    >
      <div className="p-6">
        {/* Main layout: Account A | NATS Server | Account B */}
        <div className="flex items-stretch gap-3">
          {/* Account A */}
          <div
            className={`flex-1 rounded-lg border p-4 transition-colors duration-500 ${
              step === 1 || step === 4
                ? "border-accent-green bg-accent-green/5"
                : "border-border bg-terminal-bg"
            }`}
          >
            <div className="text-xs text-accent-green font-bold mb-3">
              ACCOUNT A
            </div>

            {/* Client */}
            <motion.div
              animate={{
                borderColor:
                  step === 1 || step === 4 ? COLORS.green : COLORS.border,
              }}
              className="w-full rounded border bg-surface p-2 flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded bg-accent-green/20 flex items-center justify-center text-[10px] text-accent-green">
                C
              </div>
              <span className="text-xs text-gray-400">Order Service</span>
            </motion.div>

            {/* Message within Account A */}
            <div className="relative h-8 flex items-center justify-center mt-2">
              <motion.div
                animate={{
                  opacity: step === 1 || step === 4 ? 1 : 0,
                  y: step === 1 || step === 4 ? 0 : -4,
                }}
                transition={{ duration: 0.3 }}
                className="px-2 py-0.5 bg-accent-green text-black text-[10px] rounded font-mono"
              >
                orders.new
              </motion.div>
            </div>

            {/* Subscriber in Account A */}
            <motion.div
              animate={{
                borderColor:
                  step === 1 || step === 4 ? COLORS.green : COLORS.border,
              }}
              className="w-full rounded border bg-surface p-2 flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded bg-accent-green/20 flex items-center justify-center text-[10px] text-accent-green">
                S
              </div>
              <span className="text-xs text-gray-400">Processor</span>
            </motion.div>
          </div>

          {/* NATS Server (center) */}
          <div className="flex flex-col items-center justify-center gap-2 px-2">
            <div className="w-14 h-14 rounded-full border-2 border-accent-green bg-terminal-bg flex items-center justify-center">
              <span className="text-accent-green text-[10px] font-bold">
                NATS
              </span>
            </div>

            {/* Bridge arrow */}
            <motion.div
              animate={{
                opacity: showBridge ? 1 : 0,
                scale: showBridge ? 1 : 0.8,
              }}
              className="flex flex-col items-center gap-0.5"
            >
              <div className="text-[9px] text-accent-yellow font-mono">
                export
              </div>
              <div className="text-accent-yellow text-xs">&#8596;</div>
              <div className="text-[9px] text-accent-yellow font-mono">
                import
              </div>
            </motion.div>
          </div>

          {/* Account B */}
          <div
            className={`flex-1 rounded-lg border p-4 transition-colors duration-500 ${
              step === 4
                ? "border-accent-blue bg-accent-blue/5"
                : step === 2
                  ? "border-red-500/40 bg-red-500/5"
                  : "border-border bg-terminal-bg"
            }`}
          >
            <div className="text-xs text-accent-blue font-bold mb-3">
              ACCOUNT B
            </div>

            {/* Client in Account B */}
            <motion.div
              animate={{
                borderColor: step === 4 ? COLORS.blue : COLORS.border,
              }}
              className="w-full rounded border bg-surface p-2 flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded bg-accent-blue/20 flex items-center justify-center text-[10px] text-accent-blue">
                C
              </div>
              <span className="text-xs text-gray-400">Billing</span>
            </motion.div>

            {/* Message blocked / bridged indicator */}
            <div className="relative h-8 flex items-center justify-center mt-2">
              <motion.div
                animate={{
                  opacity: step === 2 ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="px-2 py-0.5 bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] rounded"
              >
                blocked
              </motion.div>
              <motion.div
                animate={{
                  opacity: showBridgeMessage ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute px-2 py-0.5 bg-accent-yellow/20 border border-accent-yellow text-accent-yellow text-[10px] rounded font-mono"
              >
                orders.new
              </motion.div>
            </div>

            {/* Subscriber in Account B */}
            <motion.div
              animate={{
                borderColor: step === 4 ? COLORS.blue : COLORS.border,
              }}
              className="w-full rounded border bg-surface p-2 flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded bg-accent-blue/20 flex items-center justify-center text-[10px] text-accent-blue">
                S
              </div>
              <span className="text-xs text-gray-400">Analytics</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="px-6 pb-2 text-center text-sm min-h-[2.5rem] flex items-center justify-center">
        {step === 0 && (
          <span className="text-gray-500">
            Two accounts on the same NATS server...
          </span>
        )}
        {step === 1 && (
          <span className="text-accent-green">
            Account A publishes to orders.new — delivered within Account A
          </span>
        )}
        {step === 2 && (
          <span className="text-red-400">
            Account B can&apos;t see Account A&apos;s messages
          </span>
        )}
        {step === 3 && (
          <span className="text-accent-yellow">
            Account A exports orders.&gt; to Account B...
          </span>
        )}
        {step === 4 && (
          <span className="text-accent-green">
            Shared subjects flow through explicit exports/imports
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
