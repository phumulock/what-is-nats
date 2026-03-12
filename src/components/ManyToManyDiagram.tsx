"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";
import { COLORS } from "@/lib/colors";

const PUBLISHERS = [
  { name: "Order API", color: COLORS.green },
  { name: "User API", color: COLORS.blue },
  { name: "Payment API", color: COLORS.yellow },
];

const SUBSCRIBERS = [
  { name: "Processor", color: COLORS.green, subs: "orders.*" },
  { name: "Analytics", color: COLORS.blue, subs: "orders.*, users.*" },
  { name: "Notifications", color: COLORS.yellow, subs: "payments.*" },
];

const AUDIT_SUB = { name: "Audit Log", color: COLORS.purple, subs: ">" };

// Which publisher is active per step, what subject they publish, and which subs light up
const STEP_CONFIG: Record<number, { pub: number; subject: string; activeSubs: number[] }> = {
  1: { pub: 0, subject: "orders.created", activeSubs: [0, 1] },
  2: { pub: 1, subject: "users.updated", activeSubs: [1] },
  3: { pub: 2, subject: "payments.confirmed", activeSubs: [2] },
};

export function ManyToManyDiagram() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(5, 2500);

  const config = STEP_CONFIG[step];
  const activePubIdx = config?.pub ?? -1;
  const activeSubs = config?.activeSubs ?? [];
  const showAuditLog = step >= 4;
  // At step 4, audit log just joined — show all subs receiving via ">" wildcard
  const auditReceiving = step === 4;

  const allSubs = showAuditLog ? [...SUBSCRIBERS, AUDIT_SUB] : SUBSCRIBERS;

  return (
    <div className="border border-border rounded-lg p-6 bg-surface min-h-80" {...containerProps}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
        {/* Publishers */}
        <div className="space-y-3 shrink-0">
          <div className="text-xs text-gray-500 mb-2">PUBLISHERS</div>
          {PUBLISHERS.map((pub, i) => (
            <motion.div
              key={pub.name}
              animate={{
                borderColor: activePubIdx === i ? pub.color : COLORS.border,
                boxShadow: activePubIdx === i ? `0 0 12px ${pub.color}40` : "0 0 0px transparent",
              }}
              transition={{ duration: 0.3 }}
              className="w-28 h-12 border rounded flex items-center justify-center text-xs bg-terminal-bg"
            >
              {pub.name}
            </motion.div>
          ))}
        </div>

        {/* Message flow + NATS hub */}
        <div className="flex flex-col items-center gap-2">
          {/* Incoming message pill */}
          <div className="relative w-20 h-8">
            <AnimatePresence mode="wait">
              {config && (
                <motion.div
                  key={`msg-in-${step}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 12, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-1/2 -translate-y-1/2"
                >
                  <div
                    className="px-2 py-1 text-black text-xs rounded font-bold whitespace-nowrap"
                    style={{ backgroundColor: PUBLISHERS[config.pub].color }}
                  >
                    {config.subject}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* NATS circle */}
          <motion.div
            animate={{
              boxShadow: config
                ? "0 0 16px rgba(74, 222, 128, 0.3)"
                : "0 0 0px transparent",
            }}
            transition={{ duration: 0.3 }}
            className="w-20 h-20 rounded-full border-2 border-accent-green flex items-center justify-center bg-accent-green/10"
          >
            <span className="text-accent-green text-sm font-bold">NATS</span>
          </motion.div>

          {/* Outgoing message pills */}
          <div className="relative w-20 h-8">
            <AnimatePresence mode="wait">
              {config && (
                <motion.div
                  key={`msg-out-${step}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1/2 -translate-y-1/2 flex gap-1"
                >
                  {activeSubs.map((subIdx) => (
                    <motion.div
                      key={subIdx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: subIdx * 0.1 }}
                      className="px-1.5 py-0.5 text-black rounded font-bold"
                      style={{ fontSize: "0.6rem", backgroundColor: SUBSCRIBERS[subIdx].color }}
                    >
                      MSG
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Subscribers */}
        <div className="space-y-3 shrink-0">
          <div className="text-xs text-gray-500 mb-2">SUBSCRIBERS</div>
          {SUBSCRIBERS.map((sub, i) => {
            const receiving = activeSubs.includes(i) || (auditReceiving && i < 3);
            return (
              <motion.div
                key={sub.name}
                animate={{
                  borderColor: receiving ? sub.color : COLORS.border,
                  boxShadow: receiving ? `0 0 12px ${sub.color}40` : "0 0 0px transparent",
                }}
                transition={{ duration: 0.3 }}
                className="w-28 h-12 border rounded flex flex-col items-center justify-center bg-terminal-bg"
              >
                <span className="text-xs">{sub.name}</span>
                <span className="text-gray-500" style={{ fontSize: "0.6rem" }}>
                  {sub.subs}
                </span>
              </motion.div>
            );
          })}

          {/* Audit Log — appears at step 4 */}
          <AnimatePresence>
            {showAuditLog && (
              <motion.div
                initial={{ opacity: 0, x: 20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 48 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.4 }}
                className="w-28 border rounded flex flex-col items-center justify-center bg-terminal-bg overflow-hidden"
                style={{
                  borderColor: AUDIT_SUB.color,
                  boxShadow: `0 0 12px ${AUDIT_SUB.color}40`,
                }}
              >
                <span className="text-xs" style={{ color: AUDIT_SUB.color }}>{AUDIT_SUB.name}</span>
                <span className="text-gray-500" style={{ fontSize: "0.6rem" }}>
                  {AUDIT_SUB.subs} (everything)
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Status text */}
      <div className="mt-4 text-center text-sm text-gray-500 min-h-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && "3 publishers, 3 subscribers — each with different subject subscriptions"}
            {step === 1 && (
              <span>
                <span style={{ color: COLORS.green }}>Order API</span> → <code className="text-accent-green">orders.created</code> → <span style={{ color: COLORS.green }}>Processor</span> + <span style={{ color: COLORS.blue }}>Analytics</span> both match
              </span>
            )}
            {step === 2 && (
              <span>
                <span style={{ color: COLORS.blue }}>User API</span> → <code className="text-accent-blue">users.updated</code> → only <span style={{ color: COLORS.blue }}>Analytics</span> subscribes to <code>users.*</code>
              </span>
            )}
            {step === 3 && (
              <span>
                <span style={{ color: COLORS.yellow }}>Payment API</span> → <code className="text-accent-yellow">payments.confirmed</code> → only <span style={{ color: COLORS.yellow }}>Notifications</span> matches
              </span>
            )}
            {step === 4 && (
              <span>
                <span style={{ color: AUDIT_SUB.color }}>Audit Log</span> subscribes to <code style={{ color: AUDIT_SUB.color }}>&gt;</code> — gets everything, zero publisher changes
              </span>
            )}
          </motion.div>
        </AnimatePresence>
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
