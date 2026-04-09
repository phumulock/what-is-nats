"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
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

// Phase 1 (steps 0-4): Client/Server + limitations
// Phase 2 (steps 5-10): "better protocols?" + protocol cards + HTTP foundation
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

const pageSwap = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

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

  const inPhase2 = step >= 5;

  return (
    <div
      className="border border-border rounded-lg p-4 md:p-6 bg-surface"
      {...containerProps}
    >
      {/* Client/Server visual — always visible */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-4">
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

      {/* Swappable content area */}
      <LayoutGroup>
      <motion.div layout transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}>
      <AnimatePresence mode="popLayout">
        {!inPhase2 ? (
          <motion.div key="limitations" layout {...pageSwap}>
            {/* Phase 1: Limitation cards */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-3">
              {LIMITATIONS.map((item, i) => (
                <motion.div
                  key={item.title}
                  animate={{
                    opacity: step >= i + 1 ? 1 : 0,
                    y: step >= i + 1 ? 0 : 10,
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 p-3 rounded-lg border"
                  style={{
                    borderColor: step >= i + 1 ? `${item.color}40` : COLORS.border,
                    backgroundColor: step >= i + 1 ? `${item.color}08` : "transparent",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-mono text-xs font-bold shrink-0"
                      style={{ color: item.color }}
                    >
                      {item.number}
                    </span>
                    <span className="text-sm font-medium" style={{ color: item.color }}>
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-gray-200">{item.desc}</p>
                  <p className="text-xs font-medium mt-1" style={{ color: item.color }}>
                    &rarr; {item.requires}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* "This is all HTTP does natively" */}
            <motion.div
              animate={{ opacity: step >= 4 ? 1 : 0 }}
              className="text-center mt-3"
            >
              <span className="text-xs text-gray-200 border border-border rounded-full px-3 py-1">
                This is all HTTP does natively
              </span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div key="protocols" layout {...pageSwap}>
            {/* Phase 2: Protocol cards */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent-red/40" />
              <span className="text-xs text-accent-red font-mono whitespace-nowrap">
                better protocols?
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent-red/40" />
            </div>

            {/* Mobile: compact rows */}
            <div className="flex flex-col gap-1.5 md:hidden">
              {PROTOCOLS.map((proto, i) => (
                <motion.div
                  key={proto.name}
                  animate={{
                    opacity: step >= i + 6 ? 1 : 0,
                    x: step >= i + 6 ? 0 : -12,
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex items-baseline gap-2 px-2 py-1.5 rounded-lg"
                  style={{
                    backgroundColor: step === 10 ? withAlpha(proto.color, 0.06) : "transparent",
                  }}
                >
                  <div
                    className="text-xs font-mono px-1.5 py-0.5 rounded border shrink-0"
                    style={{ color: proto.color, borderColor: withAlpha(proto.color, 0.375) }}
                  >
                    {proto.name}
                  </div>
                  <span className="text-xs text-gray-200">
                    <span style={{ color: proto.color }}>{proto.layer}</span>
                    {" — "}{proto.desc.split(".")[0]}.
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Desktop: 2x2 grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-2">
              {PROTOCOLS.map((proto, i) => (
                <motion.div
                  key={proto.name}
                  animate={{
                    opacity: step >= i + 6 ? 1 : 0,
                    y: step >= i + 6 ? 0 : 10,
                  }}
                  transition={{ duration: 0.4 }}
                  className="p-3 rounded-lg border"
                  style={{
                    borderColor: step === 10 ? withAlpha(proto.color, 0.5) : withAlpha(proto.color, 0.25),
                    backgroundColor: withAlpha(proto.color, 0.03),
                  }}
                >
                  <div
                    className="inline-block text-xs font-mono px-2 py-0.5 rounded border mb-1"
                    style={{ color: proto.color, borderColor: withAlpha(proto.color, 0.375) }}
                  >
                    {proto.name}
                  </div>
                  <div className="text-sm font-medium" style={{ color: proto.color }}>
                    {proto.layer}
                  </div>
                  <p className="text-xs text-gray-200 mt-0.5">{proto.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* HTTP foundation */}
            <motion.div
              animate={{
                borderColor: step === 10 ? COLORS.red : withAlpha(COLORS.red, 0.375),
                backgroundColor: step === 10 ? withAlpha(COLORS.red, 0.082) : withAlpha(COLORS.red, 0.03),
              }}
              transition={{ duration: 0.5 }}
              className="mt-2 rounded-lg border-2 border-dashed p-3 text-center"
            >
              <span className="text-xs font-mono text-accent-red tracking-wider">HTTP</span>
              <span className="text-xs text-gray-200"> — same point-to-point model underneath</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
      </LayoutGroup>

      {/* Status text */}
      <div className="mt-3 text-center text-sm min-h-[20px]">
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
