"use client";

import { motion } from "framer-motion";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

interface KVEntry {
  key: string;
  value: string;
  revision: number;
  visible: boolean;
}

export function KVStoreDemo() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(4, 2500);

  // All 4 entries always rendered; visibility controlled per step
  const entries: KVEntry[] = [
    { key: "user.123.name", value: '"Alice"', revision: 1, visible: true },
    {
      key: "user.123.status",
      value: step >= 1 ? '"away"' : '"online"',
      revision: step >= 1 ? 2 : 1,
      visible: true,
    },
    { key: "config.theme", value: '"dark"', revision: 3, visible: true },
    { key: "user.123.location", value: '"NYC"', revision: 1, visible: step >= 3 },
  ];

  let lastUpdate: string | null;
  if (step === 1) {
    lastUpdate = "user.123.status → 'away'";
  } else if (step === 3) {
    lastUpdate = "user.123.location created";
  } else {
    lastUpdate = null;
  }

  const watchers = ["user.123.>"];

  return (
    <div className="border border-border rounded-lg overflow-hidden" {...containerProps}>
      <div className="flex flex-col md:flex-row border-b border-border">
        {/* KV Bucket */}
        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-border">
          <div className="text-xs text-gray-500 mb-3">KV BUCKET: users</div>
          <div className="space-y-2">
            {entries.map((entry) => (
              <motion.div
                key={entry.key}
                animate={{ opacity: entry.visible ? 1 : 0 }}
                className={`flex items-center justify-between text-xs p-2 rounded ${
                  lastUpdate?.startsWith(entry.key)
                    ? "bg-accent-green/20 border border-accent-green"
                    : "bg-terminal-bg"
                }`}
              >
                <code className="text-accent-blue">{entry.key}</code>
                <div className="flex items-center gap-2">
                  <code className="text-accent-green">{entry.value}</code>
                  <span className="text-gray-600">r{entry.revision}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Watcher */}
        <div className="w-full md:w-40 p-4 bg-surface">
          <div className="text-xs text-gray-500 mb-3">WATCHING</div>
          {watchers.map((w) => (
            <div
              key={w}
              className="text-xs px-2 py-1 bg-accent-yellow/20 border border-accent-yellow rounded mb-2"
            >
              <code className="text-accent-yellow">{w}</code>
            </div>
          ))}

          {/* Update notification — always rendered for static height */}
          <motion.div
            animate={{ opacity: lastUpdate ? 1 : 0 }}
            className="mt-4 text-xs"
          >
            <div className="text-gray-500 mb-1">UPDATE:</div>
            <div className="text-accent-green text-xs break-all">
              {lastUpdate || "\u00A0"}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Status */}
      <div className="p-3 pt-6 text-center text-sm min-h-10 text-gray-500">
        {step === 0 && "KV store with 3 keys..."}
        {step === 1 && (
          <span className="text-accent-green">
            Value updated → watcher notified instantly
          </span>
        )}
        {step === 2 && "Watching for changes on user.123.>..."}
        {step === 3 && (
          <span className="text-accent-green">
            New key created → watcher notified
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
