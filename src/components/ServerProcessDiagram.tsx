"use client";

import { motion, AnimatePresence } from "framer-motion";
import { COLORS, withAlpha } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

// Steps:
// 0: Empty server boxes
// 1: Ports light up
// 2: First clients connect
// 3: Second clients connect
// 4: Outbound messages
// 5: Inbound/response messages
// 6: Final "same concept"
const TOTAL_STEPS = 7;

function ServerColumn({
  step,
  label,
  color,
  process,
  port,
  clients,
}: {
  step: number;
  label: string;
  color: string;
  process: string;
  port: string;
  clients: { name: string; appearsAt: number; msgs?: { text: string; at: number; dir: "out" | "in" }[] }[];
}) {
  return (
    <div className="flex-1 min-w-0">
      {/* Server process */}
      <motion.div
        animate={{
          borderColor: step >= 1 ? color : COLORS.border,
          boxShadow: step >= 1 ? `0 0 12px ${withAlpha(color, 0.15)}` : "none",
        }}
        transition={{ duration: 0.4 }}
        className="rounded-lg border-2 bg-terminal-bg p-3 text-center"
      >
        <div className="text-xs font-mono font-medium" style={{ color: step >= 1 ? color : COLORS.textQuaternary }}>
          {process}
        </div>
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <span className="text-xs font-mono" style={{ color }}>{port}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Label */}
      <div className="text-center mt-1.5 mb-2">
        <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: withAlpha(color, 0.6) }}>
          {label}
        </span>
      </div>

      {/* Clients */}
      <div className="space-y-1.5">
        {clients.map((client) => (
          <AnimatePresence key={client.name}>
            {step >= client.appearsAt && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5"
              >
                <div className="text-xs text-gray-200 bg-surface border border-border rounded px-2 py-1 shrink-0">
                  {client.name}
                </div>
                <div className="h-px flex-1" style={{ backgroundColor: withAlpha(color, 0.3) }} />
                <span className="text-[10px] font-mono shrink-0" style={{ color: withAlpha(color, 0.5) }}>TCP</span>

                {/* Messages */}
                {client.msgs?.map((msg) => (
                  <AnimatePresence key={msg.text}>
                    {step === msg.at && (
                      <motion.span
                        initial={{ opacity: 0, x: msg.dir === "out" ? -8 : 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0"
                        style={{ backgroundColor: withAlpha(color, 0.15), color }}
                      >
                        {msg.text}
                      </motion.span>
                    )}
                  </AnimatePresence>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}

export function ServerProcessDiagram() {
  const {
    step,
    isPlaying,
    play,
    pause,
    next,
    prev,
    totalSteps,
    containerProps,
  } = useDiagramPlayback(TOTAL_STEPS);

  return (
    <div
      className="border border-border rounded-lg p-4 md:p-6 bg-surface"
      {...containerProps}
    >
      <div className="flex gap-3 md:gap-6">
        <ServerColumn
          step={step}
          label="HTTP Server"
          color={COLORS.blue}
          process="nginx"
          port=":80"
          clients={[
            { name: "Browser", appearsAt: 2, msgs: [
              { text: "GET /api", at: 4, dir: "out" },
              { text: "200 OK", at: 5, dir: "in" },
            ]},
            { name: "Mobile", appearsAt: 3 },
          ]}
        />

        {/* Equals divider */}
        <div className="flex flex-col items-center justify-start pt-5">
          <motion.span
            animate={{ opacity: step >= 1 ? 1 : 0.2 }}
            className="text-lg font-mono text-gray-200"
          >
            ≈
          </motion.span>
        </div>

        <ServerColumn
          step={step}
          label="NATS Server"
          color={COLORS.green}
          process="nats-server"
          port=":4222"
          clients={[
            { name: "Publisher", appearsAt: 2, msgs: [
              { text: "PUB orders.new", at: 4, dir: "out" },
            ]},
            { name: "Subscriber", appearsAt: 3, msgs: [
              { text: "MSG orders.new", at: 5, dir: "in" },
            ]},
          ]}
        />
      </div>

      {/* Status text */}
      <div className="mt-3 text-center text-sm min-h-5">
        {step === 0 && <span className="text-gray-200">Two server processes...</span>}
        {step === 1 && <span className="text-gray-200">Each binds to a TCP port and listens.</span>}
        {step === 2 && <span className="text-gray-200">Clients connect via TCP.</span>}
        {step === 3 && <span className="text-gray-200">Multiple clients can connect.</span>}
        {step === 4 && <span className="text-gray-200">Messages sent over the connection.</span>}
        {step === 5 && <span className="text-gray-200">The server routes the response.</span>}
        {step === 6 && <span className="text-accent-green">Same concept. Process on TCP. That&apos;s it.</span>}
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
