"use client";

import { motion } from "framer-motion";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";
import { COLORS } from "@/lib/colors";

export function QueueGroupDiagram() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(3, 2500);

  // Derive messageCount and targetSub from step
  const messageCount = step + 1;
  const targetSub = step % 3;

  return (
    <div className="border border-border rounded-lg p-6 bg-surface" {...containerProps}>
      <div className="flex items-center justify-between gap-4">
        {/* Publisher */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-lg bg-terminal-bg border border-border flex items-center justify-center text-xs">
            PUB
          </div>
          <span className="text-xs text-gray-500">Publisher</span>
        </div>

        {/* NATS Server */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <motion.div
            key={messageCount}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-2 py-1 bg-accent-green text-black text-xs rounded mb-2"
          >
            msg #{messageCount}
          </motion.div>

          <div className="w-20 h-20 rounded-full bg-terminal-bg border-2 border-accent-green flex items-center justify-center">
            <span className="text-accent-green text-xs font-bold">NATS</span>
          </div>
        </div>

        {/* Queue Group */}
        <div className="border border-dashed border-accent-yellow rounded-lg p-3">
          <div className="text-xs text-accent-yellow mb-2 text-center">
            queue: workers
          </div>
          <div className="flex flex-col gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  borderColor: targetSub === i ? COLORS.green : COLORS.border,
                  scale: targetSub === i ? 1.05 : 1,
                }}
                className="w-14 h-10 rounded bg-terminal-bg border flex items-center justify-center text-xs"
              >
                W{i + 1}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm min-h-10 text-gray-500">
        Each message goes to exactly one worker in the queue group
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
