"use client";

import { motion } from "framer-motion";
import { COLORS, withAlpha } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

const LIMITATIONS = [
  {
    number: "01",
    title: "Location Dependent",
    desc: "Clients must know the exact URL, host, and port.",
    requires: "Discovery",
    color: COLORS.red,
  },
  {
    number: "02",
    title: "Always 1:1",
    desc: "One client, one server, every time. Fan-out requires extra infrastructure.",
    requires: "Load Balancer",
    color: COLORS.orange,
  },
  {
    number: "03",
    title: "Sync by Default",
    desc: "Requests block until a response arrives. Both sides must be online.",
    requires: "Service Mesh",
    color: COLORS.yellow,
  },
];

const PROTOCOLS = [
  {
    name: "REST",
    layer: "Is HTTP",
    desc: "HTTP with conventions for resources and verbs. Still one request, one response.",
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
    desc: "Binary protobuf over HTTP/2 streams. Still between two endpoints.",
    color: COLORS.blue,
  },
  {
    name: "WebSockets",
    layer: "Upgrades past HTTP",
    desc: "Full-duplex TCP channel. Bidirectional, but still one client to one server.",
    color: COLORS.orange,
  },
];

// Steps:
// 0: HTTP client/server visual
// 1-3: Limitation items appear
// 4: "This is all HTTP does natively" label
// 5: Transition — "Better protocols?"
// 6-9: Protocol cards appear one by one
// 10: HTTP foundation block highlights, all connectors show
const TOTAL_STEPS = 11;

const STATUS_TEXT: { text: string; color: string }[] = [
  { text: "HTTP at its core...", color: "#d1d5db" },
  { text: "Client must know exactly where the server lives.", color: COLORS.red },
  { text: "One client, one server — every time.", color: COLORS.orange },
  { text: "Request blocks until response. Both sides must be online.", color: COLORS.yellow },
  { text: "This is all HTTP does natively.", color: "#d1d5db" },
  { text: "Better protocols don't change the model underneath...", color: "#d1d5db" },
  { text: "REST — HTTP with conventions for resources and verbs.", color: COLORS.green },
  { text: "GraphQL queries flow through a single HTTP endpoint.", color: COLORS.purple },
  { text: "gRPC uses HTTP/2 streams — still HTTP underneath.", color: COLORS.blue },
  { text: "WebSockets upgrade past HTTP — but stay point-to-point.", color: COLORS.orange },
  { text: "Different capabilities, same point-to-point model.", color: COLORS.red },
];

export function HttpLimitsDiagram() {
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
      {/* Limitation cards */}
      <div className="space-y-2">
        {LIMITATIONS.map((item, i) => (
          <motion.div
            key={item.title}
            animate={{
              opacity: step >= i + 1 ? 1 : 0,
              x: step >= i + 1 ? 0 : -20,
            }}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <span
              className="font-mono text-sm font-bold shrink-0"
              style={{ color: item.color }}
            >
              {item.number}
            </span>
            <div>
              <span className="font-medium" style={{ color: item.color }}>
                {item.title}
              </span>
              <span className="text-gray-200 text-sm">
                {" "}&mdash; {item.desc}
              </span>
              <span
                className="text-sm font-medium ml-1"
                style={{ color: item.color }}
              >
                &rarr; requires {item.requires}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Simple HTTP request/response */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mt-4">
        <motion.div
          animate={{
            borderColor: step >= 1 ? COLORS.blue : COLORS.border,
          }}
          className="w-24 h-16 rounded-lg border-2 bg-terminal-bg flex flex-col items-center justify-center"
        >
          <span className="text-xs text-gray-200">Client</span>
          <motion.span
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            className="text-xs text-gray-200 font-mono mt-0.5"
          >
            knows URL
          </motion.span>
        </motion.div>

        <div className="flex flex-col items-center gap-1 min-w-[120px] md:min-w-[160px]">
          <motion.div
            animate={{ opacity: step >= 1 ? 1 : 0, scaleX: step >= 1 ? 1 : 0 }}
            className="flex items-center gap-1 origin-left"
          >
            <div className="h-px w-20 md:w-28 bg-accent-blue" />
            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-accent-blue" />
          </motion.div>
          <motion.span
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            transition={{ delay: step >= 1 ? 0.2 : 0 }}
            className="text-xs font-mono text-accent-blue"
          >
            GET /api/data
          </motion.span>
          <motion.div
            animate={{ opacity: step >= 2 ? 1 : 0, scaleX: step >= 2 ? 1 : 0 }}
            className="flex items-center gap-1 origin-right flex-row-reverse"
          >
            <div className="h-px w-20 md:w-28 bg-accent-green" />
            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-accent-green" />
          </motion.div>
          <motion.span
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            transition={{ delay: step >= 2 ? 0.2 : 0 }}
            className="text-xs font-mono text-accent-green"
          >
            200 OK
          </motion.span>
        </div>

        <motion.div
          animate={{
            borderColor: step >= 1 ? COLORS.green : COLORS.border,
          }}
          className="w-24 h-16 rounded-lg border-2 bg-terminal-bg flex flex-col items-center justify-center"
        >
          <span className="text-xs text-gray-200">Server</span>
          <motion.span
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="text-xs text-gray-200 font-mono mt-0.5"
          >
            :443
          </motion.span>
        </motion.div>
      </div>

      {/* "This is all HTTP does natively" */}
      <motion.div
        animate={{ opacity: step >= 4 ? 1 : 0 }}
        className="text-center mt-4 mb-2"
      >
        <span className="text-xs text-gray-200 border border-border rounded-full px-3 py-1">
          This is all HTTP does natively
        </span>
      </motion.div>

      {/* Transition */}
      <motion.div
        animate={{ opacity: step >= 5 ? 1 : 0, scale: step >= 5 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="my-4 flex items-center gap-3"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent-red/40" />
        <span className="text-xs text-accent-red font-mono whitespace-nowrap">
          better protocols?
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent-red/40" />
      </motion.div>

      {/* Protocol cards */}
      <div className="space-y-2">
        {PROTOCOLS.map((proto, i) => (
          <motion.div
            key={proto.name}
            animate={{
              opacity: step >= i + 6 ? 1 : 0,
              x: step >= i + 6 ? 0 : -24,
            }}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-3 p-3 rounded-lg border"
            style={{
              borderColor: step === 10 ? withAlpha(proto.color, 0.5) : withAlpha(proto.color, 0.25),
              backgroundColor: withAlpha(proto.color, 0.03),
            }}
          >
            <div className="flex-shrink-0">
              <div
                className="text-xs font-mono px-2 py-0.5 rounded border"
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
              <p className="text-xs text-gray-200 mt-0.5">{proto.desc}</p>
            </div>
            <motion.div
              animate={{
                opacity: step === 10 ? 1 : 0,
                scale: step === 10 ? 1 : 0.5,
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
          opacity: step >= 5 ? 1 : 0,
          borderColor: step === 10 ? COLORS.red : withAlpha(COLORS.red, 0.375),
          backgroundColor: step === 10 ? withAlpha(COLORS.red, 0.082) : withAlpha(COLORS.red, 0.03),
        }}
        transition={{ duration: 0.5 }}
        className="mt-2 rounded-lg border-2 border-dashed p-4 text-center"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-mono text-accent-red tracking-wider">
            HTTP
          </span>
          <span className="text-xs text-gray-200">
            — the foundation underneath
          </span>
        </div>
        <motion.div
          animate={{ opacity: step === 10 ? 1 : 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-xs text-gray-200"
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
