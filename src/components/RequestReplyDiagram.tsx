"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

export function RequestReplyDiagram() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(5);

  return (
    <div className="border border-border rounded-lg p-4 md:p-6 bg-surface" {...containerProps}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
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

        {/* Mobile: vertical request arrow */}
        <div className="flex md:hidden items-center justify-center w-8 h-10 relative">
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border" />
          {step === 1 && (
            <motion.div
              key={`req-v-${step}`}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 20, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 z-10"
            >
              <div className="px-2 py-0.5 bg-accent-green text-black text-[10px] rounded">
                request
              </div>
            </motion.div>
          )}
        </div>

        {/* Desktop: horizontal arrows + NATS */}
        <div className="hidden md:flex flex-1 flex-col items-center gap-2 relative">
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
            <span className="text-accent-green text-xs font-bold">Nats</span>
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

        {/* Mobile: NATS circle */}
        <div className="flex md:hidden flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-terminal-bg border-2 border-accent-green flex items-center justify-center">
            <span className="text-accent-green text-xs font-bold">Nats</span>
          </div>
        </div>

        {/* Mobile: vertical reply arrow */}
        <div className="flex md:hidden items-center justify-center w-8 h-10 relative">
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border" />
          {step === 3 && (
            <motion.div
              key={`reply-v-${step}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 z-10"
            >
              <div className="px-2 py-0.5 bg-accent-yellow text-black text-[10px] rounded">
                reply
              </div>
            </motion.div>
          )}
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

      <div className="mt-6 text-center text-sm min-h-10 text-gray-500">
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
