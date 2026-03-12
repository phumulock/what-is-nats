"use client";

import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

// --- Slide metadata ---

type SlideKind = "limits" | "interest" | "workqueue";

interface SlideMeta {
  kind: SlideKind;
  status: string;
  statusColor: string;
  accentColor: string;
}

const SLIDES: SlideMeta[] = [
  {
    kind: "limits",
    status: "Limits — oldest messages discarded when the cap is hit",
    statusColor: "text-accent-green",
    accentColor: COLORS.green,
  },
  {
    kind: "interest",
    status: "Interest — kept until all consumers have seen them",
    statusColor: "text-accent-yellow",
    accentColor: COLORS.yellow,
  },
  {
    kind: "workqueue",
    status: "Work-queue — deleted immediately on ack",
    statusColor: "text-accent-blue",
    accentColor: COLORS.blue,
  },
];

// --- Retention policy animations ---

function LimitsAnimation({ accentColor }: { accentColor: string }) {
  const messages = [
    { id: "M2", fading: false },
    { id: "M3", fading: false },
    { id: "M4", fading: false },
    { id: "M5", fading: false },
    { id: "M6", fading: false },
    { id: "M7", fading: false },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        {/* M1 fading out on the left */}
        <motion.div
          initial={{ opacity: 1, x: 0, scale: 1 }}
          animate={{ opacity: 0, x: -20, scale: 0.8 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="w-8 h-8 rounded border flex items-center justify-center text-xs"
          style={{ borderColor: accentColor, color: accentColor }}
        >
          M1
        </motion.div>
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: i === 5 ? 0 : 1, x: i === 5 ? 20 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i === 5 ? 1.0 : 0 }}
            className="w-8 h-8 rounded border flex items-center justify-center text-xs"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            {msg.id}
          </motion.div>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-2">max: 6 messages</div>
    </div>
  );
}

function InterestAnimation({ accentColor }: { accentColor: string }) {
  const messages = ["M1", "M2", "M3", "M4"];

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        {messages.map((msg, i) => (
          <motion.div
            key={msg}
            animate={i === 0 ? { opacity: 0, scale: 0.8 } : { opacity: 1 }}
            transition={i === 0 ? { duration: 0.5, delay: 2.2 } : {}}
            className="w-8 h-8 rounded border flex items-center justify-center text-xs"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            {msg}
          </motion.div>
        ))}
      </div>

      {/* Consumers */}
      <div className="flex gap-8 mt-4">
        {["C1", "C2"].map((consumer, ci) => (
          <div key={consumer} className="flex items-center gap-2">
            <div
              className="w-10 h-8 rounded border bg-terminal-bg flex items-center justify-center text-xs"
              style={{ borderColor: accentColor }}
            >
              {consumer}
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: ci === 0 ? 0.8 : 1.5, duration: 0.3 }}
              className="text-accent-green text-sm"
            >
              ✓ M1
            </motion.span>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.3 }}
        className="text-xs text-gray-500 mt-2"
      >
        all consumers seen M1 → removed
      </motion.div>
    </div>
  );
}

function WorkQueueAnimation({ accentColor }: { accentColor: string }) {
  const messages = ["M1", "M2", "M3", "M4"];

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        {messages.map((msg, i) => (
          <motion.div
            key={msg}
            animate={i === 0 ? { opacity: 0, scale: 0.8 } : { opacity: 1 }}
            transition={i === 0 ? { duration: 0.4, delay: 1.5 } : {}}
            className="w-8 h-8 rounded border flex items-center justify-center text-xs"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            {msg}
          </motion.div>
        ))}
      </div>

      {/* Single consumer with ACK */}
      <div className="flex items-center gap-2 mt-4">
        <div
          className="w-10 h-8 rounded border bg-terminal-bg flex items-center justify-center text-xs"
          style={{ borderColor: accentColor }}
        >
          C1
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          className="text-xs font-bold"
          style={{ color: accentColor }}
        >
          ACK M1
        </motion.span>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.3 }}
        className="text-xs text-gray-500 mt-2"
      >
        ack received → M1 deleted
      </motion.div>
    </div>
  );
}

function RetentionPolicyView({ slide }: { slide: SlideMeta }) {
  const labels: Record<string, string> = {
    limits: "RETENTION: LIMITS",
    interest: "RETENTION: INTEREST",
    workqueue: "RETENTION: WORK-QUEUE",
  };

  return (
    <>
      {/* Tier label */}
      <div className="mb-4 text-center h-5">
        <motion.span
          key={slide.kind}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold tracking-widest"
          style={{ color: slide.accentColor }}
        >
          {labels[slide.kind]}
        </motion.span>
      </div>

      {/* Stream visualization */}
      <div className="flex flex-col items-center">
        <div className="text-xs text-gray-500 mb-2">STREAM</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.kind}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {slide.kind === "limits" && (
              <LimitsAnimation accentColor={slide.accentColor} />
            )}
            {slide.kind === "interest" && (
              <InterestAnimation accentColor={slide.accentColor} />
            )}
            {slide.kind === "workqueue" && (
              <WorkQueueAnimation accentColor={slide.accentColor} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

// --- Main component ---

const TOTAL_SLIDES = SLIDES.length;

export function StreamDiagram() {
  const {
    step,
    isPlaying,
    play,
    pause,
    next,
    prev,
    totalSteps,
    containerProps,
  } = useDiagramPlayback(TOTAL_SLIDES, 3000);

  const slide = SLIDES[step];

  return (
    <div
      className="border border-border rounded-lg p-6 bg-surface min-h-[320px]"
      {...containerProps}
    >
      <RetentionPolicyView slide={slide} />

      {/* Status text */}
      <div className="mt-6 text-center text-sm min-h-10">
        <motion.span
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={slide.statusColor}
        >
          {slide.status}
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

export { StreamDiagram as TemporalDecouplingDiagram };
