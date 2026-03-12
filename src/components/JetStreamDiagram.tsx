"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";
import { COLORS } from "@/lib/colors";

// --- Slide metadata ---

type CursorKind = "cursor-start" | "cursor-advance" | "cursor-complete";

interface CursorSlide {
  kind: CursorKind;
  status: string;
  statusColor: string;
}

const SLIDES: CursorSlide[] = [
  {
    kind: "cursor-start",
    status: "Consumer tracks position with a cursor.",
    statusColor: "text-gray-500",
  },
  {
    kind: "cursor-advance",
    status: "As messages are acknowledged, the cursor advances.",
    statusColor: "text-accent-green",
  },
  {
    kind: "cursor-complete",
    status: "Each consumer is independent — add more without interference.",
    statusColor: "text-accent-blue",
  },
];

// --- SVG cursor triangle (points upward) ---

function CursorTriangle({ color }: { color: string }) {
  return (
    <motion.svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      animate={{ y: [-2, 0] }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <polygon points="6,0 12,8 0,8" fill={color} />
    </motion.svg>
  );
}

// --- Cursor View ---

function CursorView({ kind }: { kind: CursorKind }) {
  const messages = [1, 2, 3, 4, 5, 6, 7, 8];

  const c1Pos =
    kind === "cursor-start" ? 2 : kind === "cursor-advance" ? 5 : 7;
  const showC2 = kind === "cursor-complete";

  return (
    <>
      {/* Stream container */}
      <div className="mb-4">
        <div
          className="rounded-lg p-3"
          style={{
            border: `1px dashed ${COLORS.green}`,
            backgroundColor: `${COLORS.green}08`,
          }}
        >
          <div
            className="text-xs mb-2 font-mono tracking-widest"
            style={{ color: COLORS.green }}
          >
            STREAM: orders
          </div>
          <div className="flex gap-1 overflow-x-auto p-1">
            {messages.map((msg, i) => {
              const isC2Processed = showC2 && i < 3;
              const isC1Processed = showC2 ? i >= 3 && i < c1Pos : i < c1Pos;
              const isProcessed = isC1Processed || isC2Processed;
              const isActive = i === c1Pos || (showC2 && i === 3);

              let borderColor: string = COLORS.border;
              let bgColor: string = COLORS.surface;

              if (isC2Processed) {
                bgColor = `${COLORS.blue}15`;
                borderColor = COLORS.blue;
              } else if (isC1Processed) {
                bgColor = `${COLORS.green}15`;
                borderColor = COLORS.green;
              } else if (i === c1Pos) {
                borderColor = COLORS.green;
              }

              return (
                <motion.div
                  key={i}
                  animate={{
                    backgroundColor: bgColor,
                    borderColor,
                    scale: isActive ? 1.05 : 1,
                    boxShadow: isActive
                      ? `0 0 8px ${i === c1Pos ? COLORS.green : COLORS.blue}40`
                      : "0 0 0px rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 rounded border flex flex-col items-center justify-center flex-shrink-0"
                >
                  <span
                    className="text-[10px]"
                    style={{
                      color: isProcessed ? "#666" : "#999",
                    }}
                  >
                    #{msg}
                  </span>
                  {isProcessed && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                        delay: i * 0.06,
                      }}
                      className="text-xs"
                      style={{
                        color: isC2Processed ? COLORS.blue : COLORS.green,
                      }}
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
            <div className="w-12 h-12 rounded border border-dashed border-border flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
              ...
            </div>
          </div>

          {/* Cursor arrows inside stream container */}
          <div className="relative h-5 mt-1 ml-1">
            <motion.div
              animate={{ x: c1Pos * 52 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute flex flex-col items-center w-12"
            >
              <CursorTriangle color={COLORS.green} />
              <span className="text-[9px] font-bold" style={{ color: COLORS.green }}>C1</span>
            </motion.div>

            <AnimatePresence>
              {showC2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, x: 3 * 52 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: 0.2,
                  }}
                  className="absolute flex flex-col items-center w-12"
                >
                  <CursorTriangle color={COLORS.blue} />
                  <span className="text-[9px] font-bold" style={{ color: COLORS.blue }}>C2</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Consumer boxes below */}
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: kind === "cursor-advance" ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 0.4 }}
          className="w-16 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0"
          style={{
            border: `1.5px solid ${COLORS.green}`,
            backgroundColor: `${COLORS.green}12`,
          }}
        >
          <span className="text-xs font-bold" style={{ color: COLORS.green }}>C1</span>
          <span className="text-[10px] text-gray-500">pos: {c1Pos + 1}</span>
        </motion.div>

        <AnimatePresence>
          {showC2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="w-16 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0"
              style={{
                border: `1.5px solid ${COLORS.blue}`,
                backgroundColor: `${COLORS.blue}12`,
              }}
            >
              <span className="text-xs font-bold" style={{ color: COLORS.blue }}>C2</span>
              <span className="text-[10px] text-gray-500">pos: 4</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: `${COLORS.green}30` }}
          />
          <span>processed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm border"
            style={{ borderColor: COLORS.border, backgroundColor: COLORS.surface }}
          />
          <span>pending</span>
        </div>
      </div>
    </>
  );
}

// --- Main component ---

export function JetStreamDiagram() {
  const {
    step,
    isPlaying,
    play,
    pause,
    next,
    prev,
    totalSteps,
    containerProps,
  } = useDiagramPlayback(SLIDES.length, 3000);

  const slide = SLIDES[step];

  return (
    <div
      className="border border-border rounded-lg p-6 bg-surface min-h-[400px]"
      {...containerProps}
    >
      <CursorView kind={slide.kind} />

      {/* Status text */}
      <div className="mt-4 text-center text-sm h-6">
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
