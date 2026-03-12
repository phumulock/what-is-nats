"use client";

import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

const DEFAULT_ALT_COLORS: Record<string, string> = {
  Kafka: COLORS.orange,
  RabbitMQ: COLORS.purple,
  MQTT: COLORS.pink,
  "Redis Pub/Sub": COLORS.red,
  Redis: COLORS.red,
};

interface Comparison {
  category: string;
  nats: string;
  others: { name: string; detail: string }[];
}

const DEFAULT_STATUS_TEXTS = [
  { text: "Wire Protocol — simplicity you can telnet to", color: COLORS.green },
  { text: "Subjects — no admin overhead", color: COLORS.blue },
  { text: "Pub/Sub — built in, not bolted on", color: COLORS.yellow },
  { text: "Req/Reply — RPC over an async transport", color: COLORS.pink },
  { text: "Queue Groups — instant work distribution", color: COLORS.purple },
  { text: "Back-Pressure — protect the fast path", color: COLORS.red },
  { text: "Clustering — self-organizing, multi-region", color: COLORS.cyan },
  { text: "Security & Auth — multi-tenancy without bolt-ons", color: COLORS.purpleLight },
];

export function ComparisonByTopicDiagram({
  comparisons,
  natsLabel = "NATS",
  statusTexts = DEFAULT_STATUS_TEXTS,
  altColors = DEFAULT_ALT_COLORS,
}: {
  comparisons: Comparison[];
  natsLabel?: string;
  statusTexts?: { text: string; color: string }[];
  altColors?: Record<string, string>;
}) {
  function getAltColor(name: string): string {
    return altColors[name] ?? "#888";
  }
  const TOTAL_STEPS = comparisons.length;

  const {
    step,
    isPlaying,
    play,
    pause,
    next,
    prev,
    goTo,
    totalSteps,
    containerProps,
  } = useDiagramPlayback(TOTAL_STEPS, 2500);

  const activeComparison = comparisons[step];

  return (
    <div
      className="border border-border rounded-lg bg-surface overflow-hidden"
      {...containerProps}
    >
      {/* Category tabs */}
      <div className="flex border-b border-border">
        {comparisons.map((comp, i) => (
          <button
            key={comp.category}
            onClick={() => goTo(i)}
            className={`flex-1 px-2 py-2.5 text-[11px] font-mono transition-colors cursor-pointer ${
              step === i
                ? "bg-accent-green/15 text-accent-green border-b-2 border-accent-green"
                : "bg-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            {comp.category}
          </button>
        ))}
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeComparison && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* NATS approach card */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-lg border border-accent-green/40 bg-accent-green/5 p-4 mb-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-accent-green/60 text-accent-green">
                    {natsLabel}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                    {activeComparison.category}
                  </span>
                </div>
                <p className="text-sm text-white leading-relaxed">
                  {activeComparison.nats}
                </p>
              </motion.div>

              {/* Alternative cards */}
              <div className="space-y-2">
                {activeComparison.others.map((alt, i) => {
                  const color = getAltColor(alt.name);
                  return (
                    <motion.div
                      key={alt.name}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (i + 1) * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg border"
                      style={{
                        borderColor: `${color}40`,
                        backgroundColor: `${color}08`,
                      }}
                    >
                      <div className="shrink-0">
                        <div
                          className="text-[10px] font-mono px-2 py-0.5 rounded border"
                          style={{ color, borderColor: `${color}60` }}
                        >
                          {alt.name}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed min-w-0 flex-1">
                        {alt.detail}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status text */}
        <div className="mt-4 text-center text-sm min-h-5">
          {statusTexts[step] && (
            <motion.span
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ color: statusTexts[step].color }}
            >
              {statusTexts[step].text}
            </motion.span>
          )}
        </div>
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
