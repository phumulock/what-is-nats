"use client";

import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

// --- Temporal slides (prepended) ---

type Phase = "publishing" | "offline" | "reconnect" | "replay";

const TEMPORAL_SLIDES: {
  phase: Phase;
  status: string;
  statusColor: string;
}[] = [
  {
    phase: "publishing",
    status: "Publisher and consumer in sync...",
    statusColor: "text-gray-500",
  },
  {
    phase: "offline",
    status: "Consumer goes offline. Messages keep arriving.",
    statusColor: "text-accent-yellow",
  },
  {
    phase: "reconnect",
    status: "Consumer reconnects. JetStream knows where it left off.",
    statusColor: "text-accent-blue",
  },
  {
    phase: "replay",
    status: "Missed messages replayed automatically. No data loss.",
    statusColor: "text-accent-green",
  },
];

// --- Durability tiers ---

const TIERS = [
  {
    label: "MEMORY",
    labelColor: "text-accent-green",
    borderColor: COLORS.green,
    slotColor: COLORS.green,
    status: "Memory — fastest, lost on restart",
    statusColor: "text-accent-green",
  },
  {
    label: "DISK",
    labelColor: "text-accent-yellow",
    borderColor: COLORS.yellow,
    slotColor: COLORS.yellow,
    status: "Disk — survives restarts",
    statusColor: "text-accent-yellow",
  },
  {
    label: "REPLICATED",
    labelColor: "text-accent-blue",
    borderColor: COLORS.blue,
    slotColor: COLORS.blue,
    status: "Replicated — survives machine failure",
    statusColor: "text-accent-blue",
  },
];

// --- Temporal Decoupling View ---

function TemporalDecouplingView({ phase }: { phase: Phase }) {
  const subscriberOnline =
    phase === "publishing" || phase === "reconnect" || phase === "replay";
  const allMessages = [1, 2, 3, 4, 5, 6];
  const visibleMessageCount = phase === "publishing" ? 3 : 6;
  const visibleReceivedCount = phase === "replay" ? 6 : 3;
  const replayPosition =
    phase === "replay" ? 6 : phase === "reconnect" ? 3 : 0;

  return (
    <>
      <div className="flex justify-between items-start gap-4">
        {/* Publisher */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-lg bg-terminal-bg border border-accent-green flex items-center justify-center text-xs">
            PUB
          </div>
          <span className="text-xs text-gray-500">Publisher</span>
          <span className="text-xs text-accent-green">
            {phase === "offline" ? "still sending..." : ""}
          </span>
        </div>

        {/* JetStream */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-xs text-gray-500 mb-2">JETSTREAM STREAM</div>
          <div className="flex gap-1 overflow-hidden">
            {allMessages.map((msg, i) => (
              <motion.div
                key={msg}
                animate={{ opacity: i < visibleMessageCount ? 1 : 0 }}
                className={`w-8 h-8 rounded border flex items-center justify-center text-xs ${
                  i < replayPosition && phase === "replay"
                    ? "border-accent-green bg-accent-green/20"
                    : "border-accent-blue"
                }`}
              >
                {msg}
              </motion.div>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {visibleMessageCount} messages persisted
          </div>
        </div>

        {/* Subscriber */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{
              borderColor: subscriberOnline ? COLORS.green : COLORS.red,
              opacity: subscriberOnline ? 1 : 0.5,
            }}
            className="w-16 h-16 rounded-lg bg-terminal-bg border flex items-center justify-center text-xs"
          >
            SUB
          </motion.div>
          <span className="text-xs text-gray-500">Consumer</span>
          <span
            className={`text-xs ${
              subscriberOnline ? "text-accent-green" : "text-accent-red"
            }`}
          >
            {subscriberOnline ? "online" : "offline"}
          </span>
        </div>
      </div>

      {/* Received messages */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-xs text-gray-500 mb-2">CONSUMER RECEIVED:</div>
        <div className="flex gap-1">
          {allMessages.map((msg, i) => (
            <motion.div
              key={msg}
              animate={{ opacity: i < visibleReceivedCount ? 1 : 0 }}
              className="w-8 h-8 rounded border border-accent-green bg-accent-green/10 flex items-center justify-center text-xs text-accent-green"
            >
              {msg}
            </motion.div>
          ))}
          <motion.span
            animate={{ opacity: phase === "replay" ? 1 : 0 }}
            className="text-xs text-accent-green ml-2 self-center"
          >
            &larr; caught up!
          </motion.span>
        </div>
      </div>
    </>
  );
}

// --- Durability components ---

function SingleBroker({
  borderColor,
  slotColor,
  showDisk,
  size = "normal",
}: {
  borderColor: string;
  slotColor: string;
  showDisk?: boolean;
  size?: "normal" | "small";
}) {
  const isSmall = size === "small";
  return (
    <motion.div
      animate={{ borderColor }}
      className={`relative ${isSmall ? "w-14 h-12" : "w-20 h-16"} rounded-lg bg-terminal-bg border-2 flex flex-col items-center justify-center gap-1`}
    >
      <span
        className={`${isSmall ? "text-[10px]" : "text-xs"} text-gray-400`}
      >
        {isSmall ? "Node" : "Broker"}
      </span>
      <div className="flex gap-0.5 justify-center">
        {Array.from({ length: isSmall ? 3 : 4 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor:
                i < 2 ? slotColor : "rgba(51,51,51,0.5)",
            }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className={`${isSmall ? "w-2 h-2" : "w-3 h-3"} rounded-sm`}
          />
        ))}
      </div>
      {showDisk && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] bg-surface px-1 border rounded"
          style={{ color: borderColor, borderColor }}
        >
          disk
        </motion.div>
      )}
    </motion.div>
  );
}

function DurabilityView({ step }: { step: number }) {
  const tier = TIERS[step];

  return (
    <>
      {/* Tier label */}
      <div className="mb-4 text-center h-5">
        <motion.span
          key={step}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs font-bold tracking-widest ${tier.labelColor}`}
        >
          {tier.label}
        </motion.span>
      </div>

      {/* Main row: Producer — Broker(s) — Consumer */}
      <div className="flex items-start justify-between gap-4">
        {/* Producer */}
        <div className="flex flex-col items-center gap-2 w-20">
          <div className="w-16 h-16 rounded-lg bg-terminal-bg border border-accent-green flex items-center justify-center text-xs text-accent-green">
            Producer
          </div>
        </div>

        {/* Arrow: Producer → Broker */}
        <div className="flex-1 flex flex-col items-center justify-center pt-5">
          <div className="relative w-full h-8">
            <motion.div
              key={`msg-left-${step}`}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: "100%", opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            >
              <div
                className="px-2 py-0.5 text-black text-[10px] rounded"
                style={{ backgroundColor: tier.borderColor }}
              >
                msg
              </div>
            </motion.div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
          </div>
        </div>

        {/* Broker area */}
        <div className="flex flex-col items-center gap-2 w-48 min-h-[80px]">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {step === 2 ? (
              /* Replicated: 3 small nodes */
              <div className="flex items-center gap-1">
                <SingleBroker
                  borderColor={tier.borderColor}
                  slotColor={tier.slotColor}
                  showDisk
                  size="small"
                />
                <div className="flex flex-col gap-1">
                  <div
                    className="w-3 border-t border-dashed"
                    style={{ borderColor: tier.borderColor }}
                  />
                  <div
                    className="w-3 border-t border-dashed"
                    style={{ borderColor: tier.borderColor }}
                  />
                </div>
                <SingleBroker
                  borderColor={tier.borderColor}
                  slotColor={tier.slotColor}
                  showDisk
                  size="small"
                />
                <div className="flex flex-col gap-1">
                  <div
                    className="w-3 border-t border-dashed"
                    style={{ borderColor: tier.borderColor }}
                  />
                  <div
                    className="w-3 border-t border-dashed"
                    style={{ borderColor: tier.borderColor }}
                  />
                </div>
                <SingleBroker
                  borderColor={tier.borderColor}
                  slotColor={tier.slotColor}
                  showDisk
                  size="small"
                />
              </div>
            ) : (
              /* Memory or Disk: single broker */
              <SingleBroker
                borderColor={tier.borderColor}
                slotColor={tier.slotColor}
                showDisk={step === 1}
              />
            )}
          </motion.div>
        </div>

        {/* Arrow: Broker → Consumer */}
        <div className="flex-1 flex flex-col items-center justify-center pt-5">
          <div className="relative w-full h-8">
            <motion.div
              key={`msg-right-${step}`}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: "80%", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            >
              <div
                className="px-2 py-0.5 text-black text-[10px] rounded"
                style={{ backgroundColor: tier.borderColor }}
              >
                msg
              </div>
            </motion.div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
          </div>
        </div>

        {/* Consumer */}
        <div className="flex flex-col items-center gap-2 w-20">
          <div className="w-16 h-16 rounded-lg bg-terminal-bg border border-accent-green flex items-center justify-center text-xs text-accent-green">
            Consumer
          </div>
        </div>
      </div>

      {/* Status text */}
      <div className="mt-6 text-center text-sm h-6">
        <motion.span
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={tier.statusColor}
        >
          {tier.status}
        </motion.span>
      </div>
    </>
  );
}

const TOTAL_STEPS = TEMPORAL_SLIDES.length + TIERS.length; // 4 + 3 = 7

export function DurabilitySpectrumDiagram() {
  const {
    step,
    isPlaying,
    play,
    pause,
    next,
    prev,
    totalSteps,
    containerProps,
  } = useDiagramPlayback(TOTAL_STEPS, 3000);

  const isTemporal = step < TEMPORAL_SLIDES.length;

  return (
    <div
      className="border border-border rounded-lg p-6 bg-surface min-h-[360px]"
      {...containerProps}
    >
      <AnimatePresence mode="wait">
        {isTemporal ? (
          <motion.div
            key="temporal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TemporalDecouplingView phase={TEMPORAL_SLIDES[step].phase} />
          </motion.div>
        ) : (
          <motion.div
            key="durability"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DurabilityView step={step - TEMPORAL_SLIDES.length} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status text for temporal slides (DurabilityView has its own) */}
      {isTemporal && (
        <div className="mt-4 text-center text-sm h-6">
          <motion.span
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={TEMPORAL_SLIDES[step].statusColor}
          >
            {TEMPORAL_SLIDES[step].status}
          </motion.span>
        </div>
      )}

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
