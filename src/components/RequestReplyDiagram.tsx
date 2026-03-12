"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

export function RequestReplyDiagram() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(5, 2500);

  return (
    <div className="border border-border rounded-lg p-6 bg-surface" {...containerProps}>
      <div className="flex items-center justify-between gap-4">
        {/* Requester */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{
              borderColor: step === 0 || step === 4 ? COLORS.green : COLORS.border,
            }}
            className="w-16 h-16 rounded-lg bg-terminal-bg border flex items-center justify-center text-xs"
          >
            REQ
          </motion.div>
          <span className="text-xs text-gray-500">Requester</span>
          <div className="text-xs text-accent-yellow h-4">
            {step === 0 && "inbox: _INBOX.abc"}
          </div>
        </div>

        {/* NATS Server */}
        <div className="flex-1 flex flex-col items-center gap-2 relative">
          {/* Request arrow */}
          <div className="h-6 flex items-center justify-center w-full">
            {step === 1 && (
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 40, opacity: 1 }}
                className="px-2 py-1 bg-accent-green text-black text-xs rounded"
              >
                request
              </motion.div>
            )}
          </div>

          <div className="w-20 h-20 rounded-full bg-terminal-bg border-2 border-accent-green flex items-center justify-center">
            <span className="text-accent-green text-xs font-bold">NATS</span>
          </div>

          {/* Reply arrow */}
          <div className="h-6 flex items-center justify-center w-full">
            {step === 3 && (
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: -40, opacity: 1 }}
                className="px-2 py-1 bg-accent-yellow text-black text-xs rounded"
              >
                reply
              </motion.div>
            )}
          </div>
        </div>

        {/* Responder */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{
              borderColor: step === 2 ? COLORS.green : COLORS.border,
            }}
            className="w-16 h-16 rounded-lg bg-terminal-bg border flex items-center justify-center text-xs"
          >
            RESP
          </motion.div>
          <span className="text-xs text-gray-500">Responder</span>
          <div className="text-xs text-gray-500 h-4">
            {step === 2 && "processing..."}
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        {step === 0 && "Requester creates unique inbox (_INBOX.abc)"}
        {step === 1 && "Request sent with reply-to: _INBOX.abc"}
        {step === 2 && "Responder receives request, processes..."}
        {step === 3 && "Reply sent to _INBOX.abc"}
        {step === 4 && "Requester receives response"}
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
