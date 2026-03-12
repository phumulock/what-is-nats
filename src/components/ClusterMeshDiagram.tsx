"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";
import { useDiagramPlayback } from "./useDiagramPlayback";
import { DiagramControls } from "./DiagramControls";

// Triangle layout — pixel positions within a 280×160 viewBox
const NODES = [
  { id: "nats-1", cx: 140, cy: 24 },
  { id: "nats-2", cx: 44, cy: 136 },
  { id: "nats-3", cx: 236, cy: 136 },
];

const ROUTES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
];

export function ClusterMeshDiagram() {
  const { step, isPlaying, play, pause, next, prev, totalSteps, containerProps } =
    useDiagramPlayback(6, 2500);

  const serverActive = (i: number) => {
    if (i === 0) return step >= 1;
    if (i === 1 || i === 2) return step >= 3;
    return false;
  };

  const serverHighlight = (i: number) => {
    if (i === 0) return step === 1;
    if (i === 1 || i === 2) return step === 3;
    return false;
  };

  return (
    <div className="border border-border rounded-lg p-5 bg-surface" {...containerProps}>
      <div className="flex items-center gap-3">
        {/* Publisher */}
        <div className="flex flex-col items-center shrink-0 w-16">
          <motion.div
            animate={{
              borderColor: step === 0 ? COLORS.green : COLORS.border,
              backgroundColor: step === 0 ? `${COLORS.green}10` : "rgba(0,0,0,0)",
            }}
            className="border rounded-lg px-2 py-1.5 text-center"
          >
            <div className="text-[10px] text-gray-400">Publisher</div>
          </motion.div>
          <motion.div
            animate={{ backgroundColor: step === 0 ? COLORS.green : COLORS.borderLight }}
            className="h-px w-8 mt-1"
          />
        </div>

        {/* Cluster */}
        <div className="flex-1">
          <div className="border border-dashed border-accent-green/25 rounded-lg bg-[#0f0f0f] p-3">
            <div className="text-[9px] text-accent-green/50 text-center mb-1 tracking-widest font-mono">
              CLUSTER
            </div>
            {/* SVG mesh */}
            <svg viewBox="0 0 280 160" className="w-full" style={{ maxHeight: 160 }}>
              {/* Route lines */}
              {ROUTES.map(([from, to], i) => {
                const active = step === 2 && from === 0;
                return (
                  <motion.line
                    key={i}
                    x1={NODES[from].cx}
                    y1={NODES[from].cy}
                    x2={NODES[to].cx}
                    y2={NODES[to].cy}
                    strokeDasharray="4 4"
                    animate={{
                      stroke: active ? COLORS.green : step >= 3 ? COLORS.green : COLORS.border,
                      strokeWidth: active ? 2 : 1,
                      strokeOpacity: step >= 3 ? 0.4 : active ? 1 : 0.6,
                    }}
                  />
                );
              })}
              {/* Message dots traveling routes */}
              {step === 2 &&
                ROUTES.filter(([from]) => from === 0).map(([from, to], i) => (
                  <motion.circle
                    key={`dot-${to}`}
                    r={5}
                    fill={COLORS.green}
                    initial={{
                      cx: NODES[from].cx,
                      cy: NODES[from].cy,
                      opacity: 0,
                    }}
                    animate={{
                      cx: NODES[to].cx,
                      cy: NODES[to].cy,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
                  />
                ))}
              {/* Server nodes */}
              {NODES.map((node, i) => (
                <g key={node.id}>
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r={20}
                    fill={COLORS.terminalBg}
                    animate={{
                      stroke: serverHighlight(i) ? COLORS.green : COLORS.yellow,
                      strokeWidth: serverHighlight(i) ? 2.5 : 1.5,
                      fill: serverHighlight(i) ? `${COLORS.green}12` : COLORS.terminalBg,
                    }}
                  />
                  <text
                    x={node.cx}
                    y={node.cy + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={serverActive(i) ? COLORS.yellow : COLORS.textQuaternary}
                    fontSize={10}
                    fontFamily="monospace"
                  >
                    {node.id}
                  </text>
                </g>
              ))}
              {/* "route" labels on lines */}
              <text x={80} y={72} fill="var(--text-tertiary)" fontSize={8} fontFamily="monospace" transform="rotate(-40, 80, 72)">
                route
              </text>
              <text x={200} y={72} fill="var(--text-tertiary)" fontSize={8} fontFamily="monospace" transform="rotate(40, 200, 72)">
                route
              </text>
              <text x={140} y={152} fill="var(--text-tertiary)" fontSize={8} fontFamily="monospace" textAnchor="middle">
                route
              </text>
            </svg>
          </div>
        </div>

        {/* Subscribers */}
        <div className="flex flex-col items-center gap-3 shrink-0 w-16">
          {["Sub A", "Sub B"].map((sub) => (
            <div key={sub} className="flex items-center">
              <motion.div
                animate={{ backgroundColor: step === 4 ? COLORS.green : COLORS.borderLight }}
                className="h-px w-8 mr-1"
              />
              <motion.div
                animate={{
                  borderColor: step >= 4 ? COLORS.blue : COLORS.border,
                  backgroundColor: step === 5 ? `${COLORS.blue}10` : "rgba(0,0,0,0)",
                }}
                className="border rounded-lg px-2 py-1.5 text-center"
              >
                <div className="text-[10px] text-gray-400">{sub}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 text-center text-sm text-gray-500 h-5">
        {step === 0 && "Publisher sends message to nats-1..."}
        {step === 1 && "nats-1 receives the message..."}
        {step === 2 && "Routes propagate to nats-2 and nats-3..."}
        {step === 3 && "All servers have the message..."}
        {step === 4 && "Subscribers receive from their connected server..."}
        {step === 5 && "Delivered — regardless of which server subscribers chose"}
      </div>

      {/* Insight */}
      <div className="mt-3 pt-3 border-t border-border text-xs text-center">
        <span className="text-gray-500">Core routing is symmetric — </span>
        <span className="text-white">JetStream uses Raft to elect a leader per stream for consistency</span>
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
