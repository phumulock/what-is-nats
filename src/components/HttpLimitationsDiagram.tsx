"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

const LIMITATIONS = [
  {
    number: "01",
    title: "Location Dependent",
    desc: "Clients must know the exact URL, host, and port. Every service needs discovery infrastructure, DNS, and load balancer configuration.",
    requires: "Discovery",
    color: COLORS.red,
    step: 1,
  },
  {
    number: "02",
    title: "Always 1:1",
    desc: "One client, one server, every time. Fan-out to multiple consumers requires additional infrastructure for every new subscriber.",
    requires: "Load Balancer",
    color: COLORS.orange,
    step: 2,
  },
  {
    number: "03",
    title: "Sync by Default",
    desc: "Requests block until a response arrives. Sender and receiver must be online simultaneously. When one component goes down, failures cascade.",
    requires: "Service Mesh",
    color: COLORS.yellow,
    step: 3,
  },
];

const STATUS_TEXT: { text: string; color: string }[] = [
  { text: "Http at its core...", color: "text-gray-500" },
  { text: "Client must know exactly where the server lives \u2192 requires Discovery.", color: "text-accent-red" },
  { text: "One client, one server\u2014every time \u2192 requires Load Balancing.", color: "text-accent-orange" },
  { text: "Request blocks until response. Both sides must be online \u2192 requires Service Mesh.", color: "text-accent-yellow" },
];

const TOTAL_STEPS = 4;

export function HttpLimitationsDiagram() {
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
      className="border border-border rounded-lg p-6 bg-surface min-h-[420px]"
      {...containerProps}
    >
      {/* Limitation cards at the top (steps 1-3) */}
      <div className="space-y-2 min-h-[140px]">
        {LIMITATIONS.map((item) => (
          <motion.div
            key={item.title}
            animate={{
              opacity: step >= item.step ? 1 : 0,
              x: step >= item.step ? 0 : -20,
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
              <span className="text-gray-500 text-sm">
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
        {/* Client */}
        <motion.div
          animate={{
            borderColor: step >= 1 ? COLORS.blue : COLORS.border,
          }}
          className="w-24 h-16 rounded-lg border-2 bg-terminal-bg flex flex-col items-center justify-center"
        >
          <span className="text-xs text-gray-400">Client</span>
          <motion.span
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            className="text-[10px] text-gray-600 font-mono mt-0.5"
          >
            knows URL
          </motion.span>
        </motion.div>

        {/* Arrow area */}
        <div className="flex flex-col items-center gap-1 min-w-[120px] md:min-w-[160px]">
          {/* Request arrow */}
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
            className="text-[10px] font-mono text-accent-blue"
          >
            GET /api/data
          </motion.span>
          {/* Response arrow */}
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
            className="text-[10px] font-mono text-accent-green"
          >
            200 OK
          </motion.span>
        </div>

        {/* Server */}
        <motion.div
          animate={{
            borderColor: step >= 1 ? COLORS.green : COLORS.border,
          }}
          className="w-24 h-16 rounded-lg border-2 bg-terminal-bg flex flex-col items-center justify-center"
        >
          <span className="text-xs text-gray-400">Server</span>
          <motion.span
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="text-[10px] text-gray-600 font-mono mt-0.5"
          >
            :443
          </motion.span>
        </motion.div>
      </div>

      {/* Native label */}
      <motion.div
        animate={{ opacity: step >= 3 ? 1 : 0 }}
        className="text-center mt-4 mb-2"
      >
        <span className="text-xs text-gray-600 border border-border rounded-full px-3 py-1">
          This is all Http does natively
        </span>
      </motion.div>

      {/* Status text */}
      <div className="mt-4 text-center text-sm min-h-[20px]">
        <span className={STATUS_TEXT[step].color}>{STATUS_TEXT[step].text}</span>
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
