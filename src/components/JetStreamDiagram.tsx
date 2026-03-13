"use client";

import { motion } from "framer-motion";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";
import { COLORS } from "@/lib/colors";

// --- Slide metadata ---

interface CursorSlide {
  c1Pos: number;
  c2Pos: number | null;
  status: string;
  statusColor: string;
}

const SLIDES: CursorSlide[] = [
  { c1Pos: 0, c2Pos: null, status: "Consumer tracks position with a cursor.", statusColor: "text-gray-500" },
  { c1Pos: 1, c2Pos: null, status: "As messages are acknowledged, the cursor advances.", statusColor: "text-accent-green" },
  { c1Pos: 2, c2Pos: null, status: "As messages are acknowledged, the cursor advances.", statusColor: "text-accent-green" },
  { c1Pos: 2, c2Pos: 0, status: "Each consumer is independent — add more without interference.", statusColor: "text-accent-blue" },
  { c1Pos: 3, c2Pos: 1, status: "Both consumers advance independently, at their own pace.", statusColor: "text-accent-blue" },
  { c1Pos: 4, c2Pos: 2, status: "Both consumers advance independently, at their own pace.", statusColor: "text-accent-blue" },
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

const TOTAL_SLOTS = 6; // 5 messages + 1 "..."

function CursorView({ c1Pos, c2Pos }: { c1Pos: number; c2Pos: number | null }) {
  const messages = [1, 2, 3, 4, 5];

  const showC2 = c2Pos !== null;

  // Percentage-based positioning: each slot is 1/TOTAL_SLOTS of the row
  const slotPct = 100 / TOTAL_SLOTS;
  const c1Left = `${c1Pos * slotPct}%`;
  const c2Left = c2Pos !== null ? `${c2Pos * slotPct}%` : "0%";
  const cursorWidth = `${slotPct}%`;

  return (
    <>
      {/* Stream container */}
      <div className="mb-4">
        <div
          className="rounded-lg p-3 max-w-md mx-auto"
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
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${TOTAL_SLOTS}, 1fr)` }}
          >
            {messages.map((msg, i) => {
              const isC2Processed = showC2 && c2Pos !== null && i < c2Pos;
              const isC1Processed = showC2 && c2Pos !== null ? i >= c2Pos && i < c1Pos : i < c1Pos;
              const isProcessed = isC1Processed || isC2Processed;
              const isActive = i === c1Pos || (showC2 && c2Pos !== null && i === c2Pos);

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
                  className="aspect-square rounded border flex flex-col items-center justify-center max-h-16"
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
            <div className="aspect-square rounded border border-dashed border-border flex items-center justify-center text-xs text-gray-500 max-h-16">
              ...
            </div>
          </div>

          {/* Cursor arrows inside stream container */}
          <div className="relative h-5 mt-3 ml-1">
            <div
              className="absolute flex flex-col items-center transition-[left] duration-300 ease-out"
              style={{ width: cursorWidth, left: c1Left }}
            >
              <CursorTriangle color={COLORS.green} />
              <span className="text-[9px] font-bold" style={{ color: COLORS.green }}>C1</span>
            </div>

            <div
              className="absolute flex flex-col items-center transition-[left,opacity] duration-300 ease-out"
              style={{
                width: cursorWidth,
                left: c2Left,
                opacity: showC2 ? 1 : 0,
                pointerEvents: showC2 ? "auto" : "none",
              }}
            >
              <CursorTriangle color={COLORS.blue} />
              <span className="text-[9px] font-bold" style={{ color: COLORS.blue }}>C2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Consumer boxes below */}
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: c1Pos > 0 && !showC2 ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 0.4 }}
          className="w-16 h-12 rounded-lg flex flex-col items-center justify-center shrink-0"
          style={{
            border: `1.5px solid ${COLORS.green}`,
            backgroundColor: `${COLORS.green}12`,
          }}
        >
          <span className="text-xs font-bold" style={{ color: COLORS.green }}>C1</span>
          <span className="text-[10px] text-gray-500">pos: {c1Pos + 1}</span>
        </motion.div>

        <motion.div
          animate={{ opacity: showC2 ? 1 : 0, scale: showC2 ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          className="w-16 h-12 rounded-lg flex flex-col items-center justify-center shrink-0"
          style={{
            border: `1.5px solid ${COLORS.blue}`,
            backgroundColor: `${COLORS.blue}12`,
            pointerEvents: showC2 ? "auto" : "none",
          }}
        >
          <span className="text-xs font-bold" style={{ color: COLORS.blue }}>C2</span>
          <span className="text-[10px] text-gray-500">pos: {c2Pos !== null ? c2Pos + 1 : 0}</span>
        </motion.div>
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
      className="border border-border rounded-lg p-6 bg-surface min-h-100"
      {...containerProps}
    >
      <CursorView c1Pos={slide.c1Pos} c2Pos={slide.c2Pos} />

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
