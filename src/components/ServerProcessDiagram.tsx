"use client";

import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

interface ClientMessage {
  text: string;
  appearsAt: number;
  direction: "out" | "in";
}

interface ClientConfig {
  name: string;
  appearsAt: number;
  messages?: ClientMessage[];
}

function ServerPanel({
  step,
  label,
  labelColor,
  processName,
  port,
  clients,
}: {
  step: number;
  label: string;
  labelColor: string;
  processName: string;
  port: string;
  clients: ClientConfig[];
}) {
  return (
    <div
      className="border rounded-lg p-4 bg-terminal-bg min-h-[280px]"
      style={{ borderColor: `${labelColor}30` }}
    >
      <div className="text-xs font-medium mb-4" style={{ color: labelColor }}>
        {label}
      </div>

      {/* Server process box */}
      <div className="flex flex-col items-center mb-6">
        <motion.div
          animate={{
            borderColor: step >= 1 ? labelColor : COLORS.border,
          }}
          transition={{ duration: 0.4 }}
          className="w-28 h-20 rounded-lg bg-surface border-2 flex flex-col items-center justify-center"
        >
          <motion.span
            animate={{ color: step >= 1 ? labelColor : COLORS.textQuaternary }}
            className="text-xs font-mono font-medium"
          >
            {processName}
          </motion.span>
          <AnimatePresence>
            {step >= 1 && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs font-mono mt-1"
                style={{ color: labelColor }}
              >
                {port}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Clients */}
      <div className="space-y-3">
        {clients.map((client) => (
          <div key={client.name} className="flex items-center gap-2 h-10">
            <AnimatePresence>
              {step >= client.appearsAt && (
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-20 h-9 rounded border border-border bg-surface flex items-center justify-center text-xs text-gray-200">
                    {client.name}
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "1.5rem" }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                    className="h-px"
                    style={{ backgroundColor: labelColor }}
                  />
                  <span
                    className="text-xs font-mono"
                    style={{ color: labelColor }}
                  >
                    TCP
                  </span>

                  {/* Per-client message animation */}
                  {client.messages && (
                    <div className="relative w-28 h-6 ml-1">
                      <AnimatePresence mode="wait">
                        {client.messages.map(
                          (msg) =>
                            step === msg.appearsAt && (
                              <motion.div
                                key={msg.text}
                                initial={{
                                  x: msg.direction === "out" ? -12 : 12,
                                  opacity: 0,
                                }}
                                animate={{
                                  x: 0,
                                  opacity: 1,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute px-2 py-0.5 text-black text-xs font-mono rounded whitespace-nowrap top-1/2 -translate-y-1/2"
                                style={{ backgroundColor: labelColor }}
                              >
                                {msg.text}
                              </motion.div>
                            )
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Final glow */}
      <AnimatePresence>
        {step === 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-center text-xs"
            style={{ color: labelColor }}
          >
            Listening and routing &#x2713;
          </motion.div>
        )}
      </AnimatePresence>
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
  } = useDiagramPlayback(7);

  return (
    <div
      className="border border-border rounded-lg p-6 bg-surface"
      {...containerProps}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HTTP Server */}
        <ServerPanel
          step={step}
          label="HTTP SERVER"
          labelColor={COLORS.blue}
          processName="nginx"
          port=":80"
          clients={[
            {
              name: "Browser",
              appearsAt: 2,
              messages: [
                { text: "GET /api", appearsAt: 4, direction: "out" },
                { text: "200 OK", appearsAt: 5, direction: "in" },
              ],
            },
            { name: "Mobile App", appearsAt: 3 },
          ]}
        />

        {/* NATS Server */}
        <ServerPanel
          step={step}
          label="NATS SERVER"
          labelColor={COLORS.green}
          processName="nats-server"
          port=":4222"
          clients={[
            {
              name: "Publisher",
              appearsAt: 2,
              messages: [
                { text: "PUB orders.new", appearsAt: 4, direction: "out" },
              ],
            },
            {
              name: "Subscriber",
              appearsAt: 3,
              messages: [
                { text: "MSG orders.new", appearsAt: 5, direction: "in" },
              ],
            },
          ]}
        />
      </div>

      {/* Status text */}
      <div className="mt-4 text-center text-sm">
        {step === 0 && (
          <span className="text-gray-200">
            Two server processes starting up...
          </span>
        )}
        {step === 1 && (
          <span className="text-gray-200">
            Each binds to a TCP port and listens...
          </span>
        )}
        {step === 2 && (
          <span className="text-gray-200">
            Clients connect via TCP...
          </span>
        )}
        {step === 3 && (
          <span className="text-gray-200">
            Multiple clients can connect at once...
          </span>
        )}
        {step === 4 && (
          <span className="text-gray-200">
            Clients send messages over the connection...
          </span>
        )}
        {step === 5 && (
          <span className="text-gray-200">
            The server routes the message...
          </span>
        )}
        {step === 6 && (
          <span className="text-accent-green">
            Same concept. Process on TCP. That&apos;s it.
          </span>
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
