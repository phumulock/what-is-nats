"use client";

import { motion } from "framer-motion";
import { COLORS, withAlpha } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

const PROTOCOLS = [
  {
    name: "REST",
    layer: "Is HTTP",
    desc: "HTTP with conventions for resources and verbs. The most common API style, but still one request, one response.",
    color: COLORS.green,
  },
  {
    name: "GraphQL",
    layer: "Served over HTTP",
    desc: "Flexible queries through a single HTTP endpoint. Subscriptions bolt on WebSockets.",
    color: COLORS.purple,
  },
  {
    name: "gRPC",
    layer: "Built on HTTP/2",
    desc: "Binary protobuf over HTTP/2 streams. Supports streaming, but each stream is still between two endpoints.",
    color: COLORS.blue,
  },
  {
    name: "WebSockets",
    layer: "Upgrades past HTTP",
    desc: "Upgrades past HTTP to a full-duplex TCP channel. Bidirectional, but still one client talking to one server.",
    color: COLORS.orange,
  },
];

const STATUS_TEXT: { text: string; color: string }[] = [
  { text: "HTTP \u2014 the protocol everything else is built on", color: COLORS.red },
  { text: "REST \u2014 HTTP with conventions for resources and verbs", color: COLORS.green },
  { text: "GraphQL queries flow through a single HTTP endpoint", color: COLORS.purple },
  { text: "gRPC uses HTTP/2 streams \u2014 still HTTP underneath", color: COLORS.blue },
  { text: "WebSockets upgrade past HTTP \u2014 but stay point-to-point", color: COLORS.orange },
  { text: "Different capabilities, same point-to-point model", color: COLORS.red },
];

// Steps:
// 0: HTTP base block
// 1-4: Protocol cards appear one by one
// 5: All connectors highlight, base pulses
const TOTAL_STEPS = 6;

export function StillHttpDiagram() {
  const {
    step,
    isPlaying,
    play,
    pause,
    next,
    prev,
    totalSteps,
    containerProps,
  } = useDiagramPlayback(TOTAL_STEPS, 2500);

  return (
    <div
      className="border border-border rounded-lg p-4 md:p-6 bg-surface"
      {...containerProps}
    >
      {/* Protocol cards stack */}
      <div className="space-y-2 mb-4">
        {PROTOCOLS.map((proto, i) => (
          <motion.div
            key={proto.name}
            animate={{
              opacity: step >= i + 1 ? 1 : 0,
              x: step >= i + 1 ? 0 : -24,
            }}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-3 p-3 rounded-lg border"
            style={{
              borderColor: step === 5 ? withAlpha(proto.color, 0.5) : withAlpha(proto.color, 0.25),
              backgroundColor: withAlpha(proto.color, 0.03),
            }}
          >
            <div className="flex-shrink-0">
              <div
                className="text-[10px] font-mono px-2 py-0.5 rounded border"
                style={{ color: proto.color, borderColor: withAlpha(proto.color, 0.375) }}
              >
                {proto.name}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium" style={{ color: proto.color }}>
                  {proto.layer}
                </span>
              </div>
              <p className="text-[11px] text-gray-600 mt-0.5">{proto.desc}</p>
            </div>
            {/* Connector indicator */}
            <motion.div
              animate={{
                opacity: step === 5 ? 1 : 0,
                scale: step === 5 ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 self-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M8 2 L8 14 M4 10 L8 14 L12 10"
                  stroke={proto.color}
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* HTTP foundation block */}
      <motion.div
        animate={{
          borderColor: step === 5 ? COLORS.red : step >= 0 ? withAlpha(COLORS.red, 0.375) : COLORS.border,
          backgroundColor: step === 5 ? withAlpha(COLORS.red, 0.082) : withAlpha(COLORS.red, 0.03),
        }}
        transition={{ duration: 0.5 }}
        className="rounded-lg border-2 border-dashed p-4 text-center"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-mono text-accent-red tracking-wider">
            HTTP
          </span>
          <motion.span
            animate={{ opacity: step >= 0 ? 1 : 0 }}
            className="text-[11px] text-gray-600"
          >
            — the foundation underneath
          </motion.span>
        </div>
        <motion.div
          animate={{ opacity: step === 5 ? 1 : 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-[10px] text-gray-600"
        >
          request/reply · point-to-point · location-dependent · one-to-one
        </motion.div>
      </motion.div>

      {/* Status text */}
      <div className="mt-4 text-center text-sm min-h-[20px]">
        {STATUS_TEXT[step] && (
          <motion.span
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ color: STATUS_TEXT[step].color }}
          >
            {STATUS_TEXT[step].text}
          </motion.span>
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
