"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

export function ClusterRoutingDiagram() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(5, 2500);

  return (
    <div className="border border-border rounded-lg p-6 bg-surface" {...containerProps}>
      <div className="flex justify-between items-start gap-2">
        {/* Region A - Tokyo */}
        <div className="flex-1 min-w-0">
          <div className="text-xs text-gray-500 text-center mb-2">TOKYO</div>
          <div className="border border-border rounded-lg p-3 bg-terminal-bg">
            {/* Publisher */}
            <motion.div
              animate={{
                borderColor: step === 0 ? COLORS.green : COLORS.border,
              }}
              className="border rounded px-2 py-1 text-xs text-center mb-2"
            >
              Publisher
            </motion.div>
            {/* Server */}
            <motion.div
              animate={{
                borderColor: step === 1 ? COLORS.green : COLORS.yellow,
                backgroundColor: step === 1 ? COLORS.green + "20" : "rgba(0,0,0,0)",
              }}
              className="border-2 border-accent-yellow rounded-lg p-2 text-center"
            >
              <div className="text-xs text-accent-yellow">nats-1</div>
            </motion.div>
          </div>
        </div>

        {/* Route connection */}
        <div className="flex flex-col items-center justify-center pt-8">
          <div className="text-xs text-gray-500 mb-1">route</div>
          <div className="relative w-10 md:w-16 h-8">
            <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-border" />
            {step === 2 && (
              <motion.div
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 40, opacity: 1 }}
                className="absolute top-1/2 -translate-y-1/2 left-0"
              >
                <div className="w-3 h-3 rounded-full bg-accent-green" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Region B - London */}
        <div className="flex-1 min-w-0">
          <div className="text-xs text-gray-500 text-center mb-2">LONDON</div>
          <div className="border border-border rounded-lg p-3 bg-terminal-bg">
            {/* Server */}
            <motion.div
              animate={{
                borderColor: step === 3 ? COLORS.green : COLORS.yellow,
                backgroundColor: step === 3 ? COLORS.green + "20" : "rgba(0,0,0,0)",
              }}
              className="border-2 border-accent-yellow rounded-lg p-2 text-center mb-2"
            >
              <div className="text-xs text-accent-yellow">nats-2</div>
            </motion.div>
            {/* Subscriber */}
            <motion.div
              animate={{
                borderColor: step === 4 ? COLORS.green : COLORS.border,
                backgroundColor: step === 4 ? COLORS.green + "20" : "rgba(0,0,0,0)",
              }}
              className="border rounded px-2 py-1 text-xs text-center"
            >
              Subscriber
            </motion.div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 text-center text-sm text-gray-500">
        {step === 0 && "Publisher sends message in Tokyo..."}
        {step === 1 && "Local server receives message..."}
        {step === 2 && "Message routes to London cluster..."}
        {step === 3 && "London server receives message..."}
        {step === 4 && "Subscriber receives message"}
      </div>

      {/* Key insight */}
      <div className="mt-4 pt-4 border-t border-border text-xs text-center">
        <span className="text-gray-500">The publisher doesn&apos;t know </span>
        <span className="text-white">where</span>
        <span className="text-gray-500"> subscribers are</span>
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
